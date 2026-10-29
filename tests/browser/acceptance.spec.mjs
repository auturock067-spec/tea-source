import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {readFile,mkdir} from 'node:fs/promises';
const sections=['','tea-library/','tea-regions/','sourcing-guide/','quality-compliance/','request-sourcing/','privacy/'];
const detail=['green','black','oolong','white','dark','jasmine'].map(t=>`tea-library/${t}/`);
const routes=[...sections,...detail];
for(const width of [320,390,768,1440]){
 test(`${width}px: 26 bilingual pages, no overflow, broken images or browser errors`,async({page})=>{
  await page.setViewportSize({width,height:900});const errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  for(const lang of ['en','zh'])for(const route of routes){
   const response=await page.goto(`/${lang}/${route}`);expect(response.status()).toBe(200);await expect(page.locator('h1')).toBeVisible();
   const overflow=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth,badImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}));
   expect(overflow.scroll,`${lang}/${route} overflows at ${width}px`).toBeLessThanOrEqual(overflow.viewport+1);expect(overflow.badImages).toEqual([]);
   await expect(page.locator('[data-language]')).toHaveAttribute('href',new RegExp(`^/${lang==='en'?'zh':'en'}/${route}`));
  }
  expect(errors).toEqual([]);await page.goto('/en/');await mkdir('evidence',{recursive:true});await page.screenshot({path:`evidence/home-${width}.png`,fullPage:true});
 });
}
test('mobile menu, escape, navigation, category preselection and same-page language switch',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/en/');
 const menu=page.getByRole('button',{name:'Menu'});await menu.click();await expect(menu).toHaveAttribute('aria-expanded','true');await page.keyboard.press('Escape');await expect(menu).toHaveAttribute('aria-expanded','false');
 await menu.click();await page.locator('#site-nav').getByRole('link',{name:'Tea library',exact:true}).click();await expect(page).toHaveURL(/\/en\/tea-library\//);
 await page.locator('[data-tea="oolong"]').click();await page.getByRole('link',{name:'Start a brief for this tea'}).click();await expect(page.locator('#tea')).toHaveValue('oolong');
 await page.locator('[data-language]').click();await expect(page).toHaveURL(/\/zh\/request-sourcing\/\?tea=oolong/);await expect(page.locator('html')).toHaveAttribute('lang','zh-CN');await expect(page.locator('#tea')).toHaveValue('oolong');
});
test('search and category filters combine, announce counts and recover from no results',async({page})=>{
 await page.goto('/en/tea-library/');await page.getByRole('searchbox').fill('Yunnan');await expect(page.locator('[data-tea]:visible')).toHaveCount(3);
 await page.getByRole('button',{name:'Black tea',exact:true}).click();await expect(page.locator('[data-tea]:visible')).toHaveCount(1);await page.getByRole('searchbox').fill('no-match-here');await expect(page.locator('#no-results')).toBeVisible();await page.getByRole('searchbox').fill('');await page.getByRole('button',{name:'All teas',exact:true}).click();await expect(page.locator('[data-tea]:visible')).toHaveCount(6);
 await page.locator('[data-language]').click();await page.getByRole('searchbox').fill('茉莉');await expect(page.locator('[data-tea]:visible')).toHaveCount(1);
});
async function fillBrief(page,lang){
 await page.locator('#tea').selectOption('green');await page.locator('#market').selectOption('US');
 await page.locator('#specifications').fill(lang==='en'?'Longjing style, spring harvest; retail loose-leaf; no substitutions without approval.':'春季龙井风格，用于散茶零售；换批前需确认。');
 await page.locator('#quantity').fill('12.5');await page.locator('#packaging').selectOption('bulk');
 await page.locator('#delivery').fill('Boston 02108; request samples before pilot; 1 kg barrier bags; delivery window to be agreed.');
 await page.locator('#quality').fill('Lot traceability and destination-specific testing plan to agree with importer.');
 await page.locator('#email').fill('buyer@example.com');await page.locator('#company').fill('Acceptance test only');await page.locator('[name=acknowledge]').check();
}
for(const lang of ['en','zh'])test(`${lang}: RFQ validation, edit, download, copy and privacy`,async({page,context})=>{
 await page.goto(`/${lang}/request-sourcing/`);const outbound=[];page.on('request',r=>{if(r.url().startsWith('http')&&(r.method()!=='GET'||new URL(r.url()).origin!==new URL(page.url()).origin))outbound.push(r.url());});
 await page.locator('#rfq-form button[type=submit]').click();await expect(page.locator('#brief-output')).toBeHidden();await expect(page.locator('#tea')).toBeFocused();
 await fillBrief(page,lang);await page.locator('#email').fill('invalid');await page.locator('#rfq-form button[type=submit]').click();await expect(page.locator('#brief-output')).toBeHidden();
 await page.locator('#email').fill('buyer@example.com');await page.locator('#quantity').fill('-1');await page.locator('#rfq-form button[type=submit]').click();await expect(page.locator('#brief-output')).toBeHidden();
 await page.locator('#quantity').fill('12.5');await page.locator('#company').fill('<img src=x onerror="alert(1)">');await page.locator('#rfq-form button[type=submit]').click();await expect(page.locator('#brief-output')).toBeVisible();expect(await page.locator('#brief-text').inputValue()).toContain('12.5 kg');expect(await page.locator('#brief-text').inputValue()).toContain('buyer@example.com');expect(await page.locator('#brief-text').inputValue()).toContain('<img src=x');await expect(page.locator('img[src="x"]')).toHaveCount(0);
 const downloadPromise=page.waitForEvent('download');await page.locator('#download-brief').click();const download=await downloadPromise;expect(download.suggestedFilename()).toBe('peng-tea-sourcing-brief.txt');const data=await readFile(await download.path(),'utf8');expect(data).toContain('12.5 kg');
 await context.grantPermissions(['clipboard-read','clipboard-write']);await page.locator('#copy-brief').click();expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('buyer@example.com');
 const cdp=await context.newCDPSession(page);await cdp.send('Page.enable');const mailRequests=[];cdp.on('Page.frameRequestedNavigation',event=>{if(event.url.startsWith('mailto:'))mailRequests.push(event.url);});await page.locator('#email-brief').click();await expect.poll(()=>mailRequests.length).toBe(1);expect(mailRequests[0]).toMatch(/^mailto:\?subject=/);expect(new URL(mailRequests[0]).pathname).toBe('');await expect(page.locator('#brief-status')).toContainText(lang==='en'?'has not sent an email':'没有发送邮件');
 await page.locator('#edit-brief').click();await page.locator('#quantity').fill('20');await page.locator('#rfq-form button[type=submit]').click();expect(await page.locator('#brief-text').inputValue()).toContain('20 kg');
 expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});expect(outbound).toEqual([]);
});
for(const lang of ['en','zh'])for(const route of ['','tea-library/','tea-regions/','sourcing-guide/','quality-compliance/','request-sourcing/','privacy/'])test(`accessible landmarks, names and contrast: ${lang}/${route||'home'}`,async({page})=>{
 await page.goto(`/${lang}/${route}`);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();expect(result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
});
test('root redirect, missing page, robots, sitemap and HTTP security headers',async({page,request})=>{
 await page.goto('/');await expect(page).toHaveURL(/\/en\//);expect((await request.get('/nonexistent-page/')).status()).toBe(404);
 const home=await request.get('/en/');expect(home.headers()['content-security-policy']).toContain("connect-src 'none'");expect(home.headers()['x-content-type-options']).toBe('nosniff');
 expect((await request.get('/sitemap.xml')).status()).toBe(200);expect(await(await request.get('/robots.txt')).text()).toContain('Sitemap:');
});
