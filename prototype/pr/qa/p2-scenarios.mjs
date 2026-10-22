import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';

// Scenarios reuse the existing CDP harness; no duplicate browser launcher/client.
export async function runP2(h) {
  const {cdp,evaluate,wait,click,fill,select,text,clock,shot,pass,report,events,sleep,reset,dir,baseUrl}=h;
  const choose=async id=>{
    await evaluate(`document.querySelector('.demo').open=true`);
    await select('#role',id);
    await evaluate(`document.querySelector('.demo').open=false`);
  };
  const route=async value=>{
    await evaluate(`document.querySelector('.demo').open=true`);
    await select('#finance-route',String(value));
    await evaluate(`document.querySelector('.demo').open=false`);
  };
  const expectHour=async hour=>assert.equal(await clock(),`2026-10-10T${String(hour).padStart(2,'0')}:00:00+07:00`);
  const expectBody=async value=>assert.ok((await text('#app')).includes(value),value+' missing in '+await text('#app'));
  async function layout(name) {
    for(const width of [1280,1440]) {
      await cdp('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
      const sizes=await evaluate(`({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth})`);
      assert.ok(sizes.scroll<=sizes.client,JSON.stringify({name,width,sizes}));
      const image=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
      writeFileSync(`${dir}/layout-${name}-${width}.png`,Buffer.from(image.data,'base64'));
      report.checks.push({name:`P2 layout ${name} ${width}`,detail:sizes,simulatedTime:await clock()});
    }
  }
  const record=async (name,role,expected)=>{
    report.sequence.push({name,role,expected,actual:await clock(),body:await text('#app')});pass(name,{role,time:await clock()});
  };
  await cdp('Page.enable');await cdp('Runtime.enable');await cdp('Log.enable');await cdp('Network.enable');
  await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await cdp('Page.navigate',{url:baseUrl});await wait(`document.querySelector('#results tbody tr')`);
  await expectHour(12);await layout('pr-list');

  // Full interactive path, not the approved seed shortcut.
  await click('[data-action="new"]');
  await select('#field-cost_center_id','CC-OPS');await fill('#field-needed_by','15/10/2026');
  await fill('#field-business_reason','Bổ sung máy quét cho quầy phục vụ demo P2.');
  await fill('#field-item-description','Máy quét USB — dữ liệu tổng hợp');
  await fill('#field-item-quantity','1.5');await fill('#field-item-estimated_unit_price','0');
  await click('[data-action="submit"]');await expectHour(13);await expectBody('PR-NEW-1');
  await choose('MGR-01');await click('[data-action="detail"][data-id="PR-NEW-1"]');
  await click('[data-action="approve"]');await expectHour(14);
  await choose('BUY-01');await expectBody('PR-NEW-1');await layout('po-list');
  await click('[data-action="po-create"][data-id="PR-NEW-1"]');await expectHour(15);
  await expectBody('PR-NEW-1');await expectBody('Máy quét USB');await layout('po-form');
  await shot('p2-01-linked-po-form','BUY-01 lập PO-DEMO-1 từ PR-NEW-1 vừa gửi/duyệt thật; 15:00');
  assert.equal(await evaluate(`document.querySelector('input[name="item.quantity"]')`),null);
  assert.equal(await evaluate(`document.querySelector('#po-supplier_id option[value="SUP-DEMO-02"]').disabled`),true);
  await click('[data-action="po-submit"]');await expectHour(16);
  assert.equal(await evaluate('document.activeElement.id'),'po-errors');
  await click('#po-errors a');assert.equal(await evaluate('document.activeElement.id'),'po-supplier_id');
  await select('#po-supplier_id','SUP-DEMO-01');await fill('#po-unit_price','-1');
  await click('[data-action="po-submit"]');await expectHour(17);await expectBody('Nhập giá mua hữu hạn');
  assert.equal(await evaluate(`document.querySelector('#po-unit_price').value`),'-1');
  await fill('#po-unit_price','0');
  // Dirty navigation/role cancellation preserves inputs and actor/time.
  await evaluate(`document.querySelector('.demo').open=true`);await select('#role','PM-01');
  assert.equal(await evaluate(`document.querySelector('#confirm-dialog').open`),true);
  await click('#dialog-cancel');assert.equal(await evaluate(`document.querySelector('#role').value`),'BUY-01');
  await evaluate(`document.querySelector('.demo').open=false`);await expectHour(17);
  await evaluate(`document.querySelector('[data-action="po-submit"]').click();document.querySelector('[data-action="po-submit"]')?.click()`);await sleep(500);
  await expectHour(18);await expectBody('Chờ Mua hàng duyệt');
  assert.equal(await evaluate(`document.querySelector('[data-action="po-issue"]').disabled`),true);
  await click('[data-action="po-issue"]');await expectHour(18);
  await choose('PM-01');await click('[data-action="po-detail"][data-id="PO-DEMO-1"]');
  await click('[data-action="po-approve"]');await expectHour(19);await expectBody('Đủ điều kiện phát hành');
  await choose('BUY-01');await click('[data-action="po-detail"][data-id="PO-DEMO-1"]');
  await evaluate(`document.querySelector('[data-action="po-issue"]').click();document.querySelector('[data-action="po-issue"]')?.click()`);await sleep(500);
  await expectHour(20);await expectBody('Đã phát hành (mô phỏng)');
  assert.equal(await evaluate(`document.querySelectorAll('#po-history li').length`),4);
  await layout('po-issued');await shot('p2-02-issued-live-pr','BUY-01 phát hành mô phỏng PO từ PR-NEW-1; 20:00; một sự kiện phát hành');
  await click('[data-action="po-source"]');await expectBody('Chi tiết PR-NEW-1');
  await expectBody('Bổ sung máy quét');await expectBody('MGR-01');await expectHour(20);
  assert.equal(await evaluate(`document.querySelector('#role').value`),'BUY-01');
  assert.equal(await evaluate(`document.querySelectorAll('#app .history li').length`),2);
  await layout('source-pr');await click('[data-action="source-back"]');await expectBody('Chi tiết PO-DEMO-1');await expectHour(20);
  await record('P2 full live PR -> PO -> issue -> source/back','BUY-01','20:00');

  // Independent Finance + return/resubmit scenario via the shortcut, same session architecture.
  await reset();await choose('BUY-01');await click('[data-action="po-create"][data-id="PR-D"]');await expectHour(13);
  await select('#po-supplier_id','SUP-DEMO-01');await fill('#po-unit_price','15.25');await route(true);
  await click('[data-action="po-submit"]');await expectHour(14);
  await route(false);await expectBody('Mua hàng → Tài chính bổ sung');
  await choose('FIN-01');await click('[data-action="po-detail"][data-id="PO-DEMO-1"]');
  assert.equal(await evaluate(`!!document.querySelector('[data-action="po-approve"]')`),false);await expectHour(14);
  await choose('PM-01');await click('[data-action="po-detail"][data-id="PO-DEMO-1"]');
  await click('[data-action="po-approve"]');await expectHour(15);await expectBody('Chờ Tài chính bổ sung');
  await choose('BUY-01');await click('[data-action="po-detail"][data-id="PO-DEMO-1"]');
  assert.equal(await evaluate(`document.querySelector('[data-action="po-issue"]').disabled`),true);
  await click('[data-action="po-issue"]');await expectHour(15);
  await shot('p2-03-finance-blocked','BUY-01: PO đã được Mua hàng duyệt, vẫn chặn phát hành vì thiếu Finance; 15:00');
  await choose('FIN-01');await click('[data-action="po-detail"][data-id="PO-DEMO-1"]');
  await click('[data-action="po-return"]');await click('[data-action="po-return-confirm"]');await expectHour(15);
  assert.equal(await evaluate('document.activeElement.id'),'po-return-reason');
  await fill('#po-return-reason','Làm rõ giá mua trước khi phê duyệt bổ sung.');await click('[data-action="po-return-confirm"]');await expectHour(16);await expectBody('Chờ chỉnh sửa');
  await choose('BUY-01');await click('[data-action="po-detail"][data-id="PO-DEMO-1"]');await click('[data-action="po-form"]');
  await expectBody('Làm rõ giá mua');await fill('#po-commercial_terms','Giá đã được làm rõ cho tình huống demo.');await route(true);
  await click('[data-action="po-submit"]');await expectHour(17);await expectBody('Chờ Mua hàng duyệt');await expectBody('Vòng 2');
  assert.equal(await evaluate(`document.querySelector('[data-action="po-issue"]').disabled`),true);
  await choose('FIN-01');await click('[data-action="po-detail"][data-id="PO-DEMO-1"]');assert.equal(await evaluate(`!!document.querySelector('[data-action="po-approve"]')`),false);
  await choose('PM-01');await click('[data-action="po-detail"][data-id="PO-DEMO-1"]');await click('[data-action="po-approve"]');await expectHour(18);
  await choose('FIN-01');await click('[data-action="po-detail"][data-id="PO-DEMO-1"]');await click('[data-action="po-approve"]');await expectHour(19);
  await choose('BUY-01');await click('[data-action="po-detail"][data-id="PO-DEMO-1"]');await click('[data-action="po-issue"]');await expectHour(20);
  await record('P2 Finance route, reason required, return/resubmit round2, old approval blocked','BUY-01','20:00');

  // Shared clock effect is separate from the historical PR-only sequence.
  await reset();await choose('BUY-01');await click('[data-action="po-create"][data-id="PR-D"]');await expectHour(13);
  await choose('MGR-01');assert.equal(await text('#queue-count'),'2 PR');await expectBody('196,00 giờ');await expectBody('97,00 giờ');
  assert.ok((await text('#return-rate')).startsWith('25,00%'));
  await record('P2 shared clock PR-D create: A196/C97, 2 waiting, 25%','MGR-01','13:00');
  await reset();await choose('MGR-01');await expectHour(12);await expectBody('195,00 giờ');await expectBody('96,00 giờ');
  assert.equal(await text('#queue-count'),'2 PR');assert.ok((await text('#return-rate')).startsWith('25,00%'));
  await choose('REQ-01');await click('[data-action="form"][data-id="PR-B"]');
  await select('#budget','UNAVAILABLE');await click('[data-action="submit"]');await expectHour(13);await expectBody('Chờ chỉnh sửa');
  await choose('MGR-01');await expectBody('196,00 giờ');await expectBody('97,00 giờ');assert.equal(await text('#queue-count'),'2 PR');
  await choose('REQ-01');await click('[data-action="form"][data-id="PR-B"]');await select('#budget','PASS');await click('[data-action="submit"]');await expectHour(14);
  await choose('MGR-01');assert.equal(await text('#queue-count'),'3 PR');await expectBody('197,00 giờ');await expectBody('0,00 giờ');await expectBody('98,00 giờ');
  await click('[data-action="detail"][data-id="PR-A"]');await click('[data-action="return"]');await fill('#return-reason','Làm rõ nhu cầu mua.');await click('[data-action="return-confirm"]');
  await click('[data-action="queue"]');await expectHour(15);assert.equal(await text('#queue-count'),'2 PR');await expectBody('1,00 giờ');await expectBody('99,00 giờ');assert.ok((await text('#return-rate')).startsWith('50,00%'));
  await record('P2 PR-only standard sequence 12/13/14/15 remains unchanged','MGR-01','15:00');

  // Fonts, lifecycle and read-only network checks on actual runtime.
  await cdp('DOM.enable');await cdp('CSS.enable');await evaluate('document.fonts.ready.then(()=>true)');
  report.fonts=[];
  for(const selector of ['h1','#app .btn','#app .metric-label']) {
    const {root}=await cdp('DOM.getDocument');const {nodeId}=await cdp('DOM.querySelector',{nodeId:root.nodeId,selector});
    const font=await cdp('CSS.getPlatformFontsForNode',{nodeId});report.fonts.push({selector,...font});
    assert.ok(font.fonts.some(f=>f.isCustomFont&&f.familyName.includes('Be Vietnam')));
  }
  await reset();await choose('BUY-01');assert.equal(await evaluate(`document.querySelectorAll('[data-action="po-detail"]').length`),0);
  await cdp('Page.reload');await wait(`document.querySelector('#results tbody tr')`);await expectHour(12);
  assert.equal(await evaluate(`document.querySelector('#role').value`),'REQ-01');assert.equal(await evaluate(`document.querySelector('#finance-route').value`),'false');
  const resources=events.filter(e=>e.method==='Network.responseReceived').map(e=>({url:e.params.response.url,status:e.params.response.status,mime:e.params.response.mimeType}));
  report.resources=resources;assert.ok(resources.every(r=>r.status===200));assert.ok(resources.every(r=>r.url.startsWith(baseUrl)));
  pass('P2 fonts, local resources, reset/reload defaults and PO empty state',{fonts:report.fonts,resourceCount:resources.length});
}
