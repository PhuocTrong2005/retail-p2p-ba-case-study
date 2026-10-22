import {writeFileSync,mkdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const arg=(name,fallback)=>process.argv.find(a=>a.startsWith(`--${name}=`))?.slice(name.length+3) ?? fallback;
const dir=resolve(arg('output',resolve(tmpdir(),'pr-ui-browser-results')));
mkdirSync(dir,{recursive:true});
const endpoint=arg('cdp','http://127.0.0.1:9226');
const baseUrl=arg('url','http://127.0.0.1:8080/');
const evidence=resolve(arg('evidence-dir',fileURLToPath(new URL('../evidence/',import.meta.url))));
mkdirSync(evidence,{recursive:true});
// Own a fresh page so Runtime.enable cannot replay exceptions from an earlier run.
const target=await (await fetch(`${endpoint}/json/new?about:blank`,{method:'PUT'})).json();
const ws=new WebSocket(target.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
let next=1; const pending=new Map(),events=[];
ws.onmessage=message=>{ const m=JSON.parse(message.data); if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(new Error(JSON.stringify(m.error))):p.resolve(m.result);}else events.push(m); };
function cdp(method,params={}) {const id=next++;return new Promise((resolve,reject)=>{pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});}
async function evaluate(expression){const r=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true,userGesture:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function wait(expression){for(let i=0;i<60;i++){if(await evaluate(expression))return;await sleep(100);}throw new Error('Timeout '+expression+' BODY '+await evaluate('document.body.innerText'));}
async function click(selector){await wait(`!!document.querySelector(${JSON.stringify(selector)})`);const r=await evaluate(`(()=>{const n=document.querySelector(${JSON.stringify(selector)});n.scrollIntoView({block:'center'});const r=n.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`);await cdp('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...r});await cdp('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...r});await sleep(460);}
async function fill(selector,value){await evaluate(`(()=>{const n=document.querySelector(${JSON.stringify(selector)});n.value=${JSON.stringify(value)};n.dispatchEvent(new Event('input',{bubbles:true}));})()`);}
async function select(selector,value){await evaluate(`(()=>{const n=document.querySelector(${JSON.stringify(selector)});n.value=${JSON.stringify(value)};n.dispatchEvent(new Event('input',{bubbles:true}));n.dispatchEvent(new Event('change',{bubbles:true}));})()`);await sleep(180);}
async function role(id){await select('#role',id);}
async function reset(){await evaluate(`document.querySelector('.demo').open=true`);await click('#reset');await click('#dialog-confirm');await wait(`document.querySelector('#role').value==='REQ-01' && document.querySelector('[data-screen="PR-SCR-01"]')`);}
const text=selector=>evaluate(`document.querySelector(${JSON.stringify(selector)})?.innerText`);
const clock=()=>evaluate(`document.querySelector('#clock').dateTime`);
const stamp=()=>new Date(Date.now()+7*3600000).toISOString().replace('Z','+07:00');
const report={browser:await cdp('Browser.getVersion'),started:stamp(),checks:[],screenshots:[],sequence:[],consoleErrors:[],beforeunload:{}};
report.queueReviews=[];
async function reviewQueue() {
 const before=await clock();
 for (const width of [1280,1440]) {
  await cdp('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
  const layout=await evaluate(`(()=>{
   const buttons=[...document.querySelectorAll('.queue-table button')].map(b=>{
    const r=document.createRange();r.selectNodeContents(b);const box=b.getBoundingClientRect(),td=b.closest('td').getBoundingClientRect();
    return {lines:r.getClientRects().length,height:box.height,fits:box.width<=td.width-24,whiteSpace:getComputedStyle(b).whiteSpace};
   });return {buttons,visible:document.querySelector('#app').innerText,scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth};
  })()`);
  assert.ok(layout.buttons.length>0);
  assert.ok(layout.buttons.every(b=>b.lines===1&&b.height<=48&&b.fits&&b.whiteSpace==='nowrap'),JSON.stringify(layout.buttons));
  assert.ok(layout.scroll<=layout.client);assert.ok(layout.visible.includes('Nhóm PR trong kỳ'));
  assert.doesNotMatch(layout.visible,/PR-MET-|cohort|Không xác định/i);
  assert.equal(await evaluate(`document.querySelector('.disclosure').open`),false);
  report.queueReviews.push({width,simulatedTime:await clock(),buttons:layout.buttons,at:stamp()});
  if(width===1280){const img=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});writeFileSync(`${dir}/queue-1280-${before.slice(11,13)}.png`,Buffer.from(img.data,'base64'));}
 }
 assert.equal(await clock(),before);
}
function pass(name,detail){report.checks.push({name,detail,at:stamp()});console.log('PASS',name);}
async function shot(name,scenario){await evaluate('window.scrollTo(0,0)');await evaluate('document.fonts.ready.then(()=>true)');const dims=await cdp('Page.getLayoutMetrics');const img=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width:1440,height:Math.ceil(dims.cssContentSize.height),scale:1}});writeFileSync(`${evidence}/${name}.png`,Buffer.from(img.data,'base64'));report.screenshots.push({name:`${name}.png`,scenario,at:stamp(),tool:'Chrome DevTools Protocol Page.captureScreenshot',viewport:1440,simulatedTime:await clock(),role:await evaluate(`document.querySelector('#role').value`)});}
async function metricStep(hour,count,ages,percent,context){await role('MGR-01');assert.equal(await clock(),`2026-10-10T${hour}:00:00+07:00`);assert.equal(await text('#queue-count'),`${count} PR`);assert.ok((await text('#return-rate')).startsWith(percent));const body=await text('#app');for(const age of ages)assert.ok(body.includes(age),age);assert.equal(await text('#cohort-context'),context);await reviewQueue();report.sequence.push({time:await clock(),count,ages,rate:await text('#return-rate'),context:await text('#cohort-context'),at:stamp()});}
try{
 if(arg('scope','pr')==='p2') {
  const {runP2}=await import('./p2-scenarios.mjs');
  await runP2({cdp,evaluate,wait,click,fill,select,text,clock,shot,pass,report,events,sleep,reset,dir,baseUrl});
 } else {
 await cdp('Page.enable');await cdp('Runtime.enable');await cdp('Log.enable');await cdp('Network.enable');
 await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await cdp('Page.navigate',{url:baseUrl});await wait(`document.querySelector('#results tbody tr')`);
 assert.equal(await evaluate(`document.querySelectorAll('#results tbody tr').length`),5);assert.equal(await clock(),'2026-10-10T12:00:00+07:00');
 await shot('pr-01-list','PR-SCR-01, seed ban đầu');
 await click('[data-action="new"]');await shot('pr-02-form','PR-SCR-02, biểu mẫu mới chưa lưu');
 await fill('#field-business_reason','Nhu cầu kiểm tra <img src=x onerror=alert(1)>');
 await evaluate(`document.querySelector('[data-action="save"]').click();document.querySelector('[data-action="save"]').click()`);await sleep(500);
 assert.equal(await clock(),'2026-10-10T13:00:00+07:00');
 await click('[data-action="list"]');await click('[data-action="form"][data-id="PR-NEW-1"]');
 assert.equal(await evaluate(`document.querySelector('#field-business_reason').value`),'Nhu cầu kiểm tra <img src=x onerror=alert(1)>');
 await click('[data-action="submit"]');assert.equal(await clock(),'2026-10-10T14:00:00+07:00');
 assert.equal(await evaluate('document.activeElement.id'),'errors');assert.ok((await text('#notice')).includes('Chưa kiểm tra ngân sách'));
 await shot('pr-02-submit-error','Lỗi gửi: focus tổng hợp lỗi, dữ liệu giữ lại, ngân sách chưa chạy');
 await click('#errors a');assert.equal(await evaluate('document.activeElement.id'),'field-cost_center_id');
 await select('#field-cost_center_id','CC-OPS');await fill('#field-needed_by','15/10/2026');await fill('#field-item-description','Máy quét USB');await fill('#field-item-quantity','1.5');await fill('#field-item-estimated_unit_price','0');
 await select('#budget','INSUFFICIENT');await click('[data-action="submit"]');assert.ok((await text('#notice')).startsWith('Không đủ ngân sách'));
 await select('#budget','UNAVAILABLE');await click('[data-action="submit"]');assert.ok((await text('#notice')).startsWith('Nguồn dữ liệu ngân sách không khả dụng'));
 await select('#budget','PASS');await click('[data-action="submit"]');assert.ok((await text('#app')).includes('Chờ xem xét'));assert.equal(await evaluate('document.querySelectorAll("#app img").length'),0);
 pass('M2 draft, reopen, field errors, safe rendering, all budget outcomes, valid first submit and double save guard',await clock());
 await reset();await click('[data-action="form"][data-id="PR-B"]');await fill('#field-business_reason','Làm rõ 20 vị trí, mỗi vị trí hai kẹp.');await click('[data-action="save"]');assert.ok((await text('#app')).includes('Chờ chỉnh sửa'));assert.equal(await clock(),'2026-10-10T13:00:00+07:00');
 pass('M2 save returned content keeps returned status',await clock());
 await reset();await click('[data-action="detail"][data-id="PR-C"]');await shot('pr-03-detail-c','PR-SCR-03: C vòng 2, ghi chú làm rõ tại C-3');
 assert.ok((await text('#app')).includes('lần gửi lại C-3'));pass('M1 four screens render seed and C-3 context','list/form/detail/queue');
 await reset();await metricStep('12',2,['195,00 giờ','96,00 giờ'],'25,00%','Trong nhóm: 1 PR chờ xem xét · 1 PR chờ chỉnh sửa.');await shot('pr-04-queue-12','Chuỗi chuẩn ban đầu: A/C chờ; cohort 1/1');
 await role('REQ-01');await click('[data-action="form"][data-id="PR-B"]');await select('#budget','UNAVAILABLE');await click('[data-action="submit"]');await shot('pr-02-returned-13','REQ-01 gửi lại B lúc 13:00: nguồn không khả dụng, B vẫn chờ sửa');
 await metricStep('13',2,['196,00 giờ','97,00 giờ'],'25,00%','Trong nhóm: 1 PR chờ xem xét · 1 PR chờ chỉnh sửa.');await shot('pr-04-queue-13','Chuỗi chuẩn 13:00: A196/C97; B chưa mở vòng');
 await role('REQ-01');await click('[data-action="form"][data-id="PR-B"]');await select('#budget','PASS');await click('[data-action="submit"]');
 await metricStep('14',3,['197,00 giờ','0,00 giờ','98,00 giờ'],'25,00%','Trong nhóm: 2 PR chờ xem xét · 0 PR chờ chỉnh sửa.');await shot('pr-04-queue-14','Chuỗi chuẩn 14:00: B mở vòng 2, 3 PR chờ');
 await click('[data-action="detail"][data-id="PR-A"]');await click('[data-action="return"]');await click('[data-action="return-confirm"]');assert.equal(await clock(),'2026-10-10T14:00:00+07:00');assert.ok(await text('#return-error'));
 await fill('#return-reason','Làm rõ căn cứ cần thay thiết bị tại hai quầy.');await click('[data-action="return-confirm"]');await click('[data-action="queue"]');
 await metricStep('15',2,['1,00 giờ','99,00 giờ'],'50,00%','Trong nhóm: 1 PR chờ xem xét · 1 PR chờ chỉnh sửa.');await shot('pr-04-queue-15','Chuỗi chuẩn 15:00: MGR-01 trả A, B/C chờ; tỷ lệ 50%');
 await reset();assert.equal(await clock(),'2026-10-10T12:00:00+07:00');assert.equal(await evaluate(`document.querySelector('#budget').value`),'PASS');assert.equal(await evaluate(`document.querySelectorAll('#results tbody tr').length`),5);
 pass('M3 standard sequence 12/13/14/15/reset matches all expected outputs',report.sequence);
 await role('MGR-01');await click('[data-action="detail"][data-id="PR-A"]');await click('[data-action="reject"]');await click('#dialog-cancel');assert.equal(await clock(),'2026-10-10T12:00:00+07:00');
 await click('[data-action="reject"]');await click('#dialog-confirm');assert.ok((await text('#app')).includes('Đã từ chối'));assert.equal(await evaluate(`document.querySelectorAll('[data-action="approve"],[data-action="reject"],[data-action="return"]').length`),0);
 await reset();await role('MGR-01');for(const id of ['PR-A','PR-C']){await click(`[data-action="detail"][data-id="${id}"]`);await click('[data-action="approve"]');await click('[data-action="queue"]');}
 assert.ok((await text('#app')).includes('Không có PR chờ xem xét'));pass('M3 approve/reject/cancel and empty queue',await clock());
 await reset();await fill('#search-pr','  pr-b  ');assert.equal(await evaluate(`document.querySelectorAll('#results tbody tr').length`),1);
 await fill('#search-pr','MÁY QUÉT');assert.equal(await evaluate(`document.querySelectorAll('#results tbody tr').length`),1);
 await fill('#search-pr','nothing-matches');assert.ok((await text('#results')).includes('Không tìm thấy'));await click('[data-action="clear"]');assert.equal(await evaluate(`document.querySelectorAll('#results tbody tr').length`),5);
 await click('[data-action="form"][data-id="PR-B"]');await fill('#field-business_reason','Phần sửa chưa lưu');await click('[data-action="list"]');await click('#dialog-cancel');assert.ok(await evaluate(`!!document.querySelector('#pr-form')`));
 await role('MGR-01');assert.ok(await evaluate(`document.querySelector('#confirm-dialog').open`));await click('#dialog-cancel');assert.equal(await evaluate(`document.querySelector('#role').value`),'REQ-01');
 await click('[data-action="list"]');await click('#dialog-confirm');await click('[data-action="form"][data-id="PR-B"]');assert.notEqual(await evaluate(`document.querySelector('#field-business_reason').value`),'Phần sửa chưa lưu');
 await evaluate(`document.querySelector('.demo').open=true`);await select('#budget','INSUFFICIENT');await click('#reset');await click('#dialog-cancel');assert.equal(await evaluate(`document.querySelector('#budget').value`),'INSUFFICIENT');assert.equal(await clock(),'2026-10-10T12:00:00+07:00');
 pass('M4 search, clear, dirty leave/role cancel/discard and reset cancel',await clock());
 await click('#field-business_reason');await cdp('Input.insertText',{text:'Thử cảnh báo tải lại'});
 const before=events.length; const reload=cdp('Page.reload');
 await sleep(700);const dialog=events.slice(before).find(e=>e.method==='Page.javascriptDialogOpening');
 report.beforeunload={at:stamp(),action:'Real Input click + insertText, Page.reload with dirty form',browser:report.browser.product,dialog:dialog?.params??null};
 if(dialog){assert.equal(dialog.params.type,'beforeunload');await cdp('Page.handleJavaScriptDialog',{accept:false});await reload;assert.ok(await evaluate(`!!document.querySelector('#pr-form')`));report.beforeunload.cancelObserved='Form remains after dismissal';
 const again=cdp('Page.reload');await sleep(300);await cdp('Page.handleJavaScriptDialog',{accept:true});await again;}else await reload;
 await wait(`document.querySelector('#results tbody tr')`);assert.equal(await clock(),'2026-10-10T12:00:00+07:00');assert.equal(await evaluate(`document.querySelector('#role').value`),'REQ-01');assert.equal(await evaluate(`document.querySelector('#budget').value`),'PASS');
 report.beforeunload.reloadObserved='Seed, time, default role and PASS restored';pass('M4 browser reload and beforeunload observation',report.beforeunload);
 await cdp('DOM.enable');await cdp('CSS.enable');
 const fonts=[];for(const selector of ['h1','#search-pr','#app .btn']){const {root:doc}=await cdp('DOM.getDocument');const {nodeId}=await cdp('DOM.querySelector',{nodeId:doc.nodeId,selector});fonts.push({selector,...await cdp('CSS.getPlatformFontsForNode',{nodeId})});}report.fonts=fonts;assert.ok(fonts.every(x=>x.fonts.some(f=>f.isCustomFont&&f.familyName.includes('Be Vietnam'))));
 for(const width of [1280,1440,390]){await cdp('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});for(const view of ['list','form','detail','queue']){await reset();if(view==='form')await click('[data-action="new"]');if(view==='detail')await click('[data-action="detail"][data-id="PR-C"]');if(view==='queue')await role('MGR-01');const sizes=await evaluate(`({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,zoom:devicePixelRatio})`);assert.ok(sizes.scroll<=sizes.client,JSON.stringify({width,view,sizes}));report.checks.push({name:`M5 no page overflow ${width} ${view}`,detail:sizes,at:stamp()});}}
 pass('M5 actual custom fonts, desktop1280/1440 and supplemental390','deviceScaleFactor=1; no page horizontal overflow in four screens');
 await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await reset();await click('[data-action="new"]');
 const {root:fontDoc}=await cdp('DOM.getDocument');
 const {nodeId:labelNode}=await cdp('DOM.querySelector',{nodeId:fontDoc.nodeId,selector:'#app label'});
 const medium=await cdp('CSS.getPlatformFontsForNode',{nodeId:labelNode});report.fonts.push({selector:'#app label',...medium});
 assert.ok(medium.fonts.some(f=>f.postScriptName==='BeVietnamPro-Medium'));
 const inputStyle=await evaluate(`({size:getComputedStyle(document.querySelector('#field-business_reason')).fontSize,zoom:devicePixelRatio})`);
 assert.equal(inputStyle.size,'16px');assert.equal(inputStyle.zoom,1);
 await reset();await click('[data-action="detail"][data-id="PR-D"]');assert.equal(await text('#detail-wait'),'Không áp dụng');
 // Intercept only a test copy of the seed response; source file/server data remain untouched.
 const fixture=await (await fetch(baseUrl+'data/seed.json')).json();fixture.events=[];fixture.historical_checks=[];
 await cdp('Fetch.enable',{patterns:[{urlPattern:'*data/seed.json',requestStage:'Request'}]});
 let fixtureSent=false;
 const intercept=async()=>{for(let i=0;i<100;i++){const event=events.find(e=>e.method==='Fetch.requestPaused'&&!e.handled);if(event){event.handled=true;await cdp('Fetch.fulfillRequest',{requestId:event.params.requestId,responseCode:200,responseHeaders:[{name:'Content-Type',value:'application/json'}],body:Buffer.from(JSON.stringify(fixture)).toString('base64')});fixtureSent=true;return;}await sleep(50);}throw new Error('Fixture response not intercepted');};
 const intercepted=intercept();await cdp('Page.reload');await intercepted;
 await wait(`document.querySelector('#results tbody tr')`);await role('MGR-01');
 assert.equal(fixtureSent,true);assert.ok((await text('#return-rate')).startsWith('Không có dữ liệu'));
 assert.ok(await evaluate(`document.querySelector('[role="alert"]').getBoundingClientRect().height>0 && !document.querySelector('[role="alert"]').closest('details')`));
 assert.doesNotMatch(await text('#app'),/PR-MET-/);
 await evaluate(`document.querySelector('.disclosure').open=true`);
 assert.ok((await text('#quality-current')).includes('PR-MET-01: 5'));
 await cdp('Fetch.disable');await cdp('Page.reload');await wait(`document.querySelector('#results tbody tr')`);
 pass('M1/M4 unknown/no-data fixture, visible quality warning, not-applicable detail and 16px controls','Test response copy only; real seed restored');
 }
 report.consoleErrors=events.filter(e=>e.method==='Runtime.exceptionThrown'||(e.method==='Log.entryAdded'&&e.params.entry.level==='error'));
 assert.equal(report.consoleErrors.length,0,JSON.stringify(report.consoleErrors));
 report.finished=stamp();writeFileSync(`${dir}/browser-results.json`,JSON.stringify(report,null,2));console.log('BROWSER QA PASS',report.checks.length,report.screenshots.length,JSON.stringify(report.beforeunload));
}catch(error){report.failure=String(error.stack);report.finished=stamp();writeFileSync(`${dir}/browser-results.json`,JSON.stringify(report,null,2));console.error(error);process.exitCode=1;}
ws.close();
await fetch(`${endpoint}/json/close/${target.id}`);
