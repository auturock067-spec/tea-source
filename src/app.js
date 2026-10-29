'use strict';
(() => {
 const en=document.body.dataset.lang==='en';
 const t=(a,b)=>en?a:b;
 const menu=document.querySelector('.menu-toggle');
 const nav=document.querySelector('#site-nav');
 menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');menu.focus();}});
 const selectedTea=new URLSearchParams(location.search).get('tea');
 if(selectedTea && /^[a-z]+$/.test(selectedTea)) {
  const language=document.querySelector('[data-language]');
  if(language) language.href+=`?tea=${encodeURIComponent(selectedTea)}`;
 }
 const search=document.querySelector('#tea-search');
 if(search) {
  const cards=[...document.querySelectorAll('[data-tea]')];
  const filters=[...document.querySelectorAll('[data-filter]')];
  let active='all';
  const filter=()=>{
   const query=search.value.trim().toLowerCase();let count=0;
   for(const card of cards){const show=(active==='all'||card.dataset.tea===active)&&card.dataset.search.includes(query);card.hidden=!show;if(show)count++;}
   document.querySelector('#result-count').textContent=t(`${count} ${count===1?'category':'categories'}`,`${count} 个品类`);
   document.querySelector('#no-results').hidden=count>0;
  };
  search.addEventListener('input',filter);
  filters.forEach(button=>button.addEventListener('click',()=>{active=button.dataset.filter;filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));filter();}));
 }
 const form=document.querySelector('#rfq-form');
 if(!form)return;
 if(selectedTea&&[...form.elements.tea.options].some(o=>o.value===selectedTea))form.elements.tea.value=selectedTea;
 const output=document.querySelector('#brief-output');
 const text=document.querySelector('#brief-text');
 const status=document.querySelector('#brief-status');
 form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  for(const field of form.querySelectorAll('textarea[required]'))if(!field.value.trim()){field.setCustomValidity(t('Please enter a useful description.','请填写有效说明。'));field.reportValidity();field.addEventListener('input',()=>field.setCustomValidity(''),{once:true});return;}
  const value=name=>form.elements[name].value.trim();
  const option=name=>form.elements[name].selectedOptions[0].textContent;
  text.value=[
   t('TEA SOURCING REQUEST / RFQ','茶叶采购需求书 / RFQ'),
   t('Prepared with '+document.body.dataset.brand+' — no submission or order created.','使用'+document.body.dataset.brand+'生成 — 未提交，未创建订单。'),'',
   `${t('Tea category','茶叶品类')}: ${option('tea')}`,
   `${t('Target market','目标市场')}: ${option('market')}`,
   `${t('Specifications & intended use','规格与用途')}: ${value('specifications')}`,
   `${t('Trial order quantity','试单采购量')}: ${value('quantity')} kg`,
   `${t('Packaging','包装')}: ${option('packaging')}`,
   `${t('Delivery & packaging requirements','交付与包装要求')}: ${value('delivery')}`,
   `${t('Quality & document requirements','质量与文件要求')}: ${value('quality')}`,
   `${t('Buyer email','采购方邮箱')}: ${value('email')}`,
   `${t('Company / project','公司 / 项目')}: ${value('company')||t('Not specified','未填写')}`,'',
   t('Please confirm: available lot and traceability; sample weight, fees and freight; MOQ per tea and pack; specifications and testing scope; itemized quotation and currency; quote validity; lead time; named Incoterms/place; import responsibilities; and the process for substitutions or non-conforming goods.','请确认：可供批次与追溯、样品重量及费用与运费、茶类及包装MOQ、规格与检测范围、分项报价及币种、报价有效期、交期、贸易术语与指定地点、进口责任，以及换批或不合格处理流程。'),'',
   t('This brief is a request for information, not a purchase commitment. Please review all requirements for the destination market.','本需求书用于询价沟通，不构成采购承诺。请核实目标市场的全部适用要求。')
  ].join('\n');
  status.textContent='';form.hidden=true;output.hidden=false;document.querySelector('#brief-title').focus();
 });
 document.querySelector('#edit-brief').addEventListener('click',()=>{output.hidden=true;form.hidden=false;form.elements.tea.focus();});
 document.querySelector('#download-brief').addEventListener('click',()=>{
  const url=URL.createObjectURL(new Blob(['\uFEFF'+text.value],{type:'text/plain;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download='peng-tea-sourcing-brief.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  status.textContent=t('Download requested. Check your browser’s downloads. Nothing was submitted.','已请求下载，请检查浏览器下载列表。没有提交询盘。');
 });
 document.querySelector('#copy-brief').addEventListener('click',async()=>{
  try {await navigator.clipboard.writeText(text.value);status.textContent=t('Copied to clipboard. Nothing was submitted.','已复制到剪贴板。没有提交询盘。');}
  catch {text.focus();text.select();status.textContent=t('Clipboard access was unavailable. The text is selected; copy it with your device’s copy command.','无法访问剪贴板。文字已选中，请使用设备的复制功能。');}
 });
 document.querySelector('#email-brief').addEventListener('click',()=>{
  const subject=t('Chinese tea sourcing request','中国茶叶采购询盘');
  const body=encodeURIComponent(text.value).length>1800?t('Please find my tea sourcing requirements in the attached brief. Download and attach the .txt file before sending.','请查看附件中的茶叶采购需求。发送前请下载并附上.txt文件。'):text.value;
  location.href=`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent=t('Email draft requested. Add a real supplier address, attach the downloaded brief if needed, and send it yourself. This website has not sent an email.','已请求打开邮件草稿。请添加真实供应商邮箱，必要时附上下载的需求书，并自行发送。本网站没有发送邮件。');
 });
})();
