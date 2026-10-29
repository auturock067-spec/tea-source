import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
async function walk(dir){const results=[];for(const item of await readdir(dir,{withFileTypes:true})){const full=path.join(dir,item.name);if(item.isDirectory())results.push(...await walk(full));else results.push(full);}return results;}
const files=await walk(root);const html=files.filter(f=>f.endsWith('.html'));
test('26 localized pages plus root and custom 404 are generated',()=>assert.equal(html.length,28));
test('all internal document, asset and fragment links resolve',async()=>{
 for(const file of html){const text=await readFile(file,'utf8');for(const match of text.matchAll(/(?:href|src)="([^"#]+)(?:#([^"]+))?"/g)){
  const href=match[1];if(!href.startsWith('/'))continue;
  const targetPath=href.split('?')[0];let target=path.join(root,targetPath);if(targetPath.endsWith('/'))target=path.join(target,'index.html');
  assert.ok(files.includes(target),`Broken link ${href} in ${file}`);
 }
 for(const match of text.matchAll(/href="#([^"]+)"/g))assert.ok(text.includes(`id="${match[1]}"`),`Broken fragment ${match[1]} in ${file}`);
 }
});
test('localized pages have unique titles, language, descriptions, canonical and alternate links',async()=>{
 const titles=new Set();for(const file of html.filter(f=>/[\\/](en|zh)[\\/]/.test(f))){const text=await readFile(file,'utf8');const title=text.match(/<title>(.*?)<\/title>/)[1];assert.ok(!titles.has(title),`Duplicate ${title}`);titles.add(title);assert.match(text,/<meta name="description" content="[^"]{20,}"/);assert.match(text,/<html lang="(en|zh-CN)"/);assert.match(text,/rel="canonical" href="https:\/\//);for(const lang of ['en','zh-Hans','x-default'])assert.ok(text.includes(`hreflang="${lang}"`));assert.equal((text.match(/<h1[ >]/g)||[]).length,1);}
});
test('RFQ has no receiving endpoint or misleading submission and all six categories',async()=>{
 const text=await readFile(path.join(root,'en/request-sourcing/index.html'),'utf8');assert.match(text,/Nothing is sent from this page/);assert.doesNotMatch(text,/<form[^>]+action=/);for(const id of ['green','black','oolong','white','dark','jasmine'])assert.ok(text.includes(`value="${id}"`));for(const name of ['market','specifications','quantity','packaging','delivery','quality','email','acknowledge'])assert.ok(text.includes(`name="${name}"`));
 const js=await readFile(path.join(root,'assets/app.js'),'utf8');assert.doesNotMatch(js,/\b(fetch|XMLHttpRequest|localStorage|sessionStorage|sendBeacon)\b/);assert.match(js,/mailto:\?subject=/);assert.doesNotMatch(js,/innerHTML/);
});
test('sitemap lists exactly 26 HTTPS localized pages and robots references it',async()=>{
 const xml=await readFile(path.join(root,'sitemap.xml'),'utf8');assert.equal((xml.match(/<loc>/g)||[]).length,26);assert.match(xml,/<loc>https:\/\//);assert.match(await readFile(path.join(root,'robots.txt'),'utf8'),/Sitemap: https:\/\//);
});
test('Cloudflare security policy blocks connections, submissions, frames and objects',async()=>{
 const headers=await readFile(path.join(root,'_headers'),'utf8');for(const rule of ["connect-src 'none'","form-action 'none'","frame-ancestors 'none'","object-src 'none'",'nosniff','Permissions-Policy','Strict-Transport-Security'])assert.ok(headers.includes(rule));
});
