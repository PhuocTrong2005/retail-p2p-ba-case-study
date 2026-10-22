import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';

// Uses the existing CDP harness against actual UI, without exposing session data.
export async function runP3(h) {
  const {cdp,evaluate,wait,click,fill,select,text,clock,shot,pass,report,events,sleep,reset,dir,baseUrl}=h;
  const choose=async id=>{
    await evaluate(`document.querySelector('.demo').open=true`);await select('#role',id);
    await evaluate(`document.querySelector('.demo').open=false`);
  };
  const body=()=>text('#app');
  const contains=async value=>assert.ok((await body()).includes(value),`${value} missing in ${await body()}`);
  const hour=async n=>assert.equal(await clock(),`2026-10-10T${String(n).padStart(2,'0')}:00:00+07:00`);
  const record=async(name,role)=>{
    report.sequence.push({name,role,time:await clock(),body:await body()});pass(name,{role,simulatedTime:await clock()});
  };
  async function layout(name) {
    for(const width of [1280,1440]) {
      await cdp('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
      const dims=await evaluate(`({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,
        buttons:[...document.querySelectorAll('#app button')].map(n=>({text:n.textContent,width:n.getBoundingClientRect().width,height:n.getBoundingClientRect().height,
          clientWidth:n.clientWidth,scrollWidth:n.scrollWidth,clientHeight:n.clientHeight,scrollHeight:n.scrollHeight}))})`);
      assert.ok(dims.scroll<=dims.client,JSON.stringify({name,width,dims}));
      assert.ok(dims.buttons.every(b=>b.width>0&&b.height>0&&b.scrollWidth<=b.clientWidth&&b.scrollHeight<=b.clientHeight),JSON.stringify(dims.buttons));
      const image=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
      writeFileSync(`${dir}/layout-${name}-${width}.png`,Buffer.from(image.data,'base64'));
      pass(`P3 layout ${name} ${width}`,dims);
    }
  }
  async function purchase(live=false) {
    let source='PR-D';
    if(live) {
      await click('[data-action="new"]');await select('#field-cost_center_id','CC-OPS');
      await fill('#field-needed_by','15/10/2026');await fill('#field-business_reason','Bổ sung thiết bị cho demo P3.');
      await fill('#field-item-description','Máy quét USB tổng hợp');await fill('#field-item-quantity','1.5');await fill('#field-item-estimated_unit_price','0');
      await click('[data-action="submit"]');await hour(13);source='PR-NEW-1';
      await choose('MGR-01');await click(`[data-action="detail"][data-id="${source}"]`);await click('[data-action="approve"]');await hour(14);
    }
    await choose('BUY-01');await click(`[data-action="po-create"][data-id="${source}"]`);
    await select('#po-supplier_id','SUP-DEMO-01');await fill('#po-unit_price','12.5');await click('[data-action="po-submit"]');
    await choose('PM-01');await click('[data-action="po-detail"][data-id="PO-DEMO-1"]');await click('[data-action="po-approve"]');
    await contains('Đủ điều kiện phát hành');await contains('Chưa phát hành');await hour(live?17:15);
  }
  async function openPO(role) {await choose(role);await click('[data-action="po-detail"][data-id="PO-DEMO-1"]');}
  async function fillInvoice({amount='123.45',quantity='2.5'}={}) {
    await fill('#invoice-number','HD-DEMO-001');await fill('#invoice-invoice_on','09/10/2026');await select('#invoice-supplier_id','SUP-DEMO-03');
    await fill('#invoice-description','Hàng do AP nhập độc lập');await fill('#invoice-quantity',quantity);await fill('#invoice-unit_price','0');await fill('#invoice-amount',amount);
  }
  await cdp('Page.enable');await cdp('Runtime.enable');await cdp('Log.enable');await cdp('Network.enable');
  await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await cdp('Page.navigate',{url:baseUrl});await wait(`document.querySelector('#results tbody tr')`);

  // Scenario 1: every upstream document is created interactively in this session.
  await reset();await purchase(true);await openPO('WH-01');await contains('Chưa phát hành');
  assert.equal(await evaluate(`!!document.querySelector('[data-action="po-source"]')`),false);
  await click('[data-action="gr-form"]');await layout('gr-form');await fill('#gr-received_on','08/10/2026');await fill('#gr-quantity','1.5');
  await click('[data-action="document-save"]');await hour(18);await contains('GR-DEMO-1');await contains('PR-NEW-1');await contains('Chỉ đọc');
  assert.equal(await evaluate(`!!document.querySelector('[data-action="invoice-form"]')`),false);
  await layout('gr-detail');await shot('p3-01-recorded-gr','WH-01 ghi GR-DEMO-1 từ PO-DEMO-1/PR-NEW-1 vừa thao tác; PO đủ duyệt chưa phát hành; 18:00');
  await openPO('AP-01');await click('[data-action="invoice-form"]');await fillInvoice();await click('[data-action="document-save"]');
  await hour(19);await contains('INV-DEMO-1');await contains('Đủ dữ liệu tối thiểu — chưa đối chiếu');await contains('Phiên bản đầu vào giao dịch: 2');
  await contains('123,45');await contains('Hàng do AP nhập độc lập');
  await record('P3 live PR → approved unissued PO → GR → invoice','REQ-01/MGR-01/BUY-01/PM-01/WH-01/AP-01');

  // Reset with the complete chain, including newly created PR; no stale links.
  await reset();await hour(12);assert.doesNotMatch(await body(),/PR-NEW-1/);
  await choose('AP-01');assert.equal(await evaluate(`document.querySelectorAll('[data-action="po-detail"]').length`),0);
  await choose('WH-01');assert.equal(await evaluate(`document.querySelectorAll('[data-action="po-detail"]').length`),0);
  await record('P3 full-chain reset removes PO/GR/invoice and new PR references','WH-01');

  // Scenario 2: invoice precedes receipt; adding GR does not edit the invoice.
  await reset();await purchase();await openPO('AP-01');await click('[data-action="invoice-form"]');await layout('invoice-form');
  await fillInvoice();await click('[data-action="document-save"]');await hour(16);await contains('Chờ phiếu nhận hàng');
  await contains('Còn thiếu: Phiếu nhận hàng');await contains('Phiên bản hóa đơn: 1');await layout('invoice-waiting');
  await shot('p3-02-invoice-waiting-gr','AP-01 ghi INV-DEMO-1 trước GR, giữ dữ liệu hóa đơn độc lập; Chờ phiếu nhận hàng; 16:00');
  const invoiceBefore=await text('[data-screen="INVOICE-DETAIL"] .readonly-grid');
  await openPO('WH-01');await click('[data-action="gr-form"]');await fill('#gr-received_on','10/10/2026');await fill('#gr-quantity','40');
  await click('[data-action="document-save"]');await hour(17);
  await openPO('AP-01');await click('[data-action="invoice-detail"]');await contains('Đủ dữ liệu tối thiểu — chưa đối chiếu');
  await contains('Phiên bản hóa đơn: 1');assert.equal(await text('[data-screen="INVOICE-DETAIL"] .readonly-grid'),invoiceBefore);
  assert.equal(await evaluate(`!!document.querySelector('[data-action*="match"],[data-action*="payment"]')`),false);
  await layout('invoice-ready');await shot('p3-03-invoice-ready-unmatched','AP-01 xem INV-DEMO-1 sau Kho bổ sung GR; input revision 2, invoice revision 1; đủ dữ liệu tối thiểu, chưa đối chiếu; 17:00');
  await record('P3 invoice before GR stays intact; GR only changes completeness/revision','AP-01');

  // Scenario 4: note/no-op/change/revert revisions and nested source navigation.
  await click('[data-action="invoice-form"]');await fill('#invoice-note','Chỉ giải thích, không đổi đầu vào');await click('[data-action="document-save"]');await hour(18);
  await contains('Phiên bản hóa đơn: 1');await contains('Phiên bản đầu vào giao dịch: 2');
  await click('[data-action="invoice-form"]');await fill('#invoice-amount','50');await click('[data-action="document-save"]');await hour(19);
  await contains('Phiên bản hóa đơn: 2');await contains('Phiên bản đầu vào giao dịch: 3');await contains('123.45 → 50');
  await click('[data-action="invoice-form"]');await click('[data-action="document-save"]');await hour(20);await contains('Lưu không đổi dữ liệu');await contains('Phiên bản hóa đơn: 2');
  await click('[data-action="invoice-form"]');await fill('#invoice-amount','123.45');await click('[data-action="document-save"]');await hour(21);
  await contains('Phiên bản hóa đơn: 3');await contains('Phiên bản đầu vào giao dịch: 4');await contains('INV-DEMO-1');
  await click('[data-action="document-source"]');await contains('Chi tiết PO-DEMO-1');await layout('source-po');
  await click('[data-action="po-source"]');await contains('PR-D');assert.equal(await evaluate(`document.querySelector('#role').value`),'AP-01');
  await click('[data-action="source-back"]');await contains('Chi tiết PO-DEMO-1');
  await click('[data-action="source-back"]');await contains('Hóa đơn INV-DEMO-1');await hour(21);
  await record('P3 invoice note/no-op/change/revert and PO→PR→PO→invoice links','AP-01');

  // Scenarios 3/5: required/date/numeric errors, retained input, dirty warning and repeated clicks.
  await reset();await purchase();await openPO('WH-01');await click('[data-action="gr-form"]');
  await click('[data-action="document-save"]');await hour(16);assert.equal(await evaluate('document.activeElement.id'),'document-errors');
  await click('#document-errors a');assert.equal(await evaluate('document.activeElement.id'),'gr-received_on');
  await fill('#gr-received_on','31/02/2026');await fill('#gr-quantity','39');await click('[data-action="document-save"]');await hour(17);
  await contains('Ngoài phạm vi demo');assert.equal(await evaluate(`document.querySelector('#gr-quantity').value`),'39');
  assert.equal(await evaluate(`document.querySelector('#gr-received_on').value`),'31/02/2026');
  await fill('#gr-received_on','10/10/2026');await fill('#gr-quantity','40');
  await evaluate(`document.querySelector('[data-action="document-save"]').click();document.querySelector('[data-action="document-save"]')?.click()`);await wait(`document.querySelector('[data-screen="GR-DETAIL"]')`);await sleep(460);await hour(18);
  assert.equal(await evaluate(`document.querySelectorAll('#document-history li').length`),1);
  await openPO('AP-01');await click('[data-action="invoice-form"]');await click('[data-action="document-save"]');await hour(19);
  assert.equal(await evaluate('document.activeElement.id'),'document-errors');await fillInvoice({amount:'-1'});await click('[data-action="document-save"]');await hour(20);
  assert.equal(await evaluate(`document.querySelector('#invoice-amount').value`),'-1');
  await evaluate(`document.querySelector('.demo').open=true`);await select('#role','WH-01');await click('#dialog-cancel');
  assert.equal(await evaluate(`document.querySelector('#role').value`),'AP-01');assert.equal(await evaluate(`document.querySelector('#invoice-amount').value`),'-1');await hour(20);
  await evaluate(`document.querySelector('.demo').open=false`);await click('[data-action="document-source"]');await click('#dialog-cancel');
  assert.equal(await evaluate(`!!document.querySelector('#invoice-amount')`),true);
  await fill('#invoice-amount','0');await fill('#invoice-quantity','0');await click('[data-action="document-save"]');await hour(21);
  await fill('#invoice-quantity','40');await evaluate(`document.querySelector('[data-action="document-save"]').click();document.querySelector('[data-action="document-save"]')?.click()`);
  await wait(`document.querySelector('[data-screen="INVOICE-DETAIL"]')`);await sleep(460);await hour(22);
  assert.equal(await evaluate(`document.querySelectorAll('#document-history li').length`),1);
  await contains('Phiên bản đầu vào giao dịch: 2');await contains('Đủ dữ liệu tối thiểu — chưa đối chiếu');
  await choose('MGR-01');await contains('205,00 giờ');await contains('106,00 giờ');
  assert.equal(await text('#queue-count'),'2 PR');assert.ok((await text('#return-rate')).startsWith('25,00%'));
  await record('P3 errors preserve inputs/focus; dirty navigation canceled; repeated GR/invoice click once; shared clock','WH-01/AP-01/MGR-01');

  // Scenario 7: original PR-only sequence, independent reset.
  await reset();await choose('MGR-01');await hour(12);await contains('195,00 giờ');await contains('96,00 giờ');
  await choose('REQ-01');await click('[data-action="form"][data-id="PR-B"]');await select('#budget','UNAVAILABLE');await click('[data-action="submit"]');await hour(13);
  await choose('MGR-01');await contains('196,00 giờ');await contains('97,00 giờ');assert.equal(await text('#queue-count'),'2 PR');
  await choose('REQ-01');await click('[data-action="form"][data-id="PR-B"]');await select('#budget','PASS');await click('[data-action="submit"]');await hour(14);
  await choose('MGR-01');assert.equal(await text('#queue-count'),'3 PR');await contains('197,00 giờ');await contains('98,00 giờ');
  await click('[data-action="detail"][data-id="PR-A"]');await click('[data-action="return"]');await fill('#return-reason','Làm rõ nhu cầu');await click('[data-action="return-confirm"]');
  await click('[data-action="queue"]');await hour(15);await contains('1,00 giờ');await contains('99,00 giờ');assert.equal(await text('#queue-count'),'2 PR');assert.ok((await text('#return-rate')).startsWith('50,00%'));
  await layout('pr-regression');await record('P3 standard PR-only 12/13/14/15 after reset','REQ-01/MGR-01');
  await cdp('DOM.enable');await cdp('CSS.enable');await evaluate('document.fonts.ready.then(()=>true)');report.fonts=[];
  for(const selector of ['h1','#app .btn','#app .metric-label']) {
    const {root}=await cdp('DOM.getDocument');const {nodeId}=await cdp('DOM.querySelector',{nodeId:root.nodeId,selector});
    const font=await cdp('CSS.getPlatformFontsForNode',{nodeId});report.fonts.push({selector,...font});
    assert.ok(font.fonts.some(f=>f.isCustomFont&&f.familyName.includes('Be Vietnam')));
  }
  await reset();await cdp('Page.reload');await wait(`document.querySelector('#results tbody tr')`);await hour(12);
  const resources=events.filter(e=>e.method==='Network.responseReceived').map(e=>({url:e.params.response.url,status:e.params.response.status}));
  assert.ok(resources.every(r=>r.status===200&&r.url.startsWith(baseUrl)));report.resources=resources;
  pass('P3 font glyphs, local HTTP200 resources, reload defaults',{fonts:report.fonts,resourceCount:resources.length});
}
