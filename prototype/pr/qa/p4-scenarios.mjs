import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';

export async function runP4(h) {
  const {cdp,evaluate,wait,click,fill,select,text,clock,shot,pass,report,events,sleep,reset,dir,baseUrl}=h;
  const choose=async id=>{await evaluate(`document.querySelector('.demo').open=true`);await select('#role',id);await evaluate(`document.querySelector('.demo').open=false`);};
  const scenario=async(outcome,version='v1')=>{await evaluate(`document.querySelector('.demo').open=true`);await select('#matching-scenario',outcome);await select('#matching-version',version);await evaluate(`document.querySelector('.demo').open=false`);};
  const body=()=>text('#app');
  const has=async value=>assert.ok((await body()).includes(value),`${value} missing in ${await body()}`);
  const at=async hours=>assert.equal(await clock(),new Date(Date.parse('2026-10-10T12:00:00+07:00')+(hours+7)*3600000).toISOString().replace('Z','+07:00').replace('.000',''));
  const record=async(name,roles)=>{report.sequence.push({name,roles,time:await clock(),body:await body()});pass(name,{roles,time:await clock()});};
  async function layout(name) {
    for(const width of [1280,1440]) {
      await cdp('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
      const d=await evaluate(`({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,
        buttons:[...document.querySelectorAll('#app button')].map(n=>({text:n.textContent,w:n.clientWidth,sw:n.scrollWidth,h:n.clientHeight,sh:n.scrollHeight}))})`);
      assert.doesNotMatch(await text('#module-nav'),/null/);assert.ok(d.scroll<=d.width,JSON.stringify(d));assert.ok(d.buttons.every(b=>b.w>0&&b.h>0&&b.sw<=b.w&&b.sh<=b.h),JSON.stringify(d.buttons));
      const image=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});writeFileSync(`${dir}/layout-${name}-${width}.png`,Buffer.from(image.data,'base64'));pass(`P4 layout ${name} ${width}`,d);
    }
  }
  async function purchase(live=false) {
    let pr='PR-D';
    if(live) {
      await click('[data-action="new"]');await select('#field-cost_center_id','CC-OPS');await fill('#field-needed_by','15/10/2026');
      await fill('#field-business_reason','Bổ sung thiết bị cho luồng P4 tổng hợp.');await fill('#field-item-description','Máy quét USB tổng hợp');
      await fill('#field-item-quantity','1.5');await fill('#field-item-estimated_unit_price','0');await click('[data-action="submit"]');await at(1);pr='PR-NEW-1';
      await choose('MGR-01');await click(`[data-action="detail"][data-id="${pr}"]`);await click('[data-action="approve"]');await at(2);
    }
    await choose('BUY-01');await click(`[data-action="po-create"][data-id="${pr}"]`);await select('#po-supplier_id','SUP-DEMO-01');await fill('#po-unit_price','12.5');await click('[data-action="po-submit"]');
    await choose('PM-01');await click('[data-action="po-detail"][data-id="PO-DEMO-1"]');await click('[data-action="po-approve"]');await at(live?5:3);
    if(live){await choose('BUY-01');await click('[data-action="po-detail"][data-id="PO-DEMO-1"]');await click('[data-action="po-issue"]');await at(6);}
  }
  const openPO=async role=>{await choose(role);await click('[data-action="po-detail"][data-id="PO-DEMO-1"]');};
  async function receipt(quantity) {await openPO('WH-01');await click('[data-action="gr-form"]');await fill('#gr-received_on','10/10/2026');await fill('#gr-quantity',String(quantity));await click('[data-action="document-save"]');}
  async function invoice(live=false,price=12.5,amount=500) {
    await openPO('AP-01');await click('[data-action="invoice-form"]');await fill('#invoice-number','HD-P4-001');await fill('#invoice-invoice_on','09/10/2026');
    await select('#invoice-supplier_id','SUP-DEMO-01');await fill('#invoice-description',live?'Máy quét USB tổng hợp':'Cuộn giấy in nhiệt K80, khổ 80 mm, dài 45 m');
    await fill('#invoice-quantity',live?'1.5':'40');await fill('#invoice-unit_price',String(price));await fill('#invoice-amount',String(amount));await click('[data-action="document-save"]');
  }
  const openInvoice=async()=>{await openPO('AP-01');await click('[data-action="invoice-detail"]');};
  const openRequest=async()=>{await click('[data-action="payment-detail"]');await click('[data-action="payment-form"]');};
  const finance=async()=>{await choose('FIN-01');await click('#module-nav [data-action="payment-queue"]');await click('[data-action="payment-detail"]');};
  await cdp('Page.enable');await cdp('Runtime.enable');await cdp('Log.enable');await cdp('Network.enable');
  await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await cdp('Page.navigate',{url:baseUrl});await wait(`document.querySelector('#results tbody tr')`);

  // Full live chain, independent from the seed shortcut and no internal session access.
  await reset();await purchase(true);await receipt(1.5);await at(7);await invoice(true,15,22.5);await at(8);
  await scenario('FAIL');await click('[data-action="matching-run"]');await at(9);await has('Không đạt (mô phỏng)');await has('EXCEPTION-1');await has('AP phụ trách: AP-01');
  await layout('fail-exception');await shot('p4-01-fail-exception','AP-01, PR-NEW-1→PO-DEMO-1→GR/INV; RESULT-1 FAIL định trước, EXCEPTION-1 mở; 10/10 21:00');
  await click('[data-action="payment-prepare"]');await at(10);await has('Không đạt (mô phỏng); cần khắc phục');assert.equal(await evaluate('document.activeElement.id'),'notice');
  await fill('#investigation-note','Đang làm rõ giá và tiền của tình huống tổng hợp.');await click('[data-action="matching-note"]');await at(11);
  await click('[data-action="invoice-form"]');await fill('#invoice-unit_price','12.5');await click('[data-action="document-save"]');await at(12);
  await click('[data-action="matching-run"]');await at(13);await has('RESULT-2');await has('vẫn cần khắc phục');
  await click('[data-action="invoice-form"]');await fill('#invoice-amount','18.75');await click('[data-action="document-save"]');await at(14);
  await scenario('PASS');await click('[data-action="matching-run"]');await at(15);await has('RESULT-3');await has('Đã xử lý sau đối chiếu lại đạt');
  await click('[data-action="payment-prepare"]');await at(16);await has('PAYMENT-1');await layout('payment-form');
  await fill('#payment-content','Nội dung giữ khi hủy đổi vai');await evaluate(`document.querySelector('.demo').open=true`);await select('#role','FIN-01');await click('#dialog-cancel');
  assert.equal(await evaluate(`document.querySelector('#role').value`),'AP-01');assert.equal(await evaluate(`document.querySelector('#payment-content').value`),'Nội dung giữ khi hủy đổi vai');await at(16);
  await evaluate(`document.querySelector('.demo').open=false`);await fill('#payment-content','');await click('[data-action="payment-send"]');await at(17);
  assert.equal(await evaluate('document.activeElement.id'),'payment-errors');await click('#payment-errors a');assert.equal(await evaluate('document.activeElement.id'),'payment-content');
  await fill('#payment-content','Đề nghị xử lý hóa đơn tổng hợp đã khắc phục');
  await evaluate(`(()=>{const target=document.querySelector('[data-action="payment-send"]');target.click();target.click();})()`);await sleep(460);await at(18);await has('Chờ Tài chính duyệt');
  assert.equal(await evaluate(`document.querySelectorAll('#submission-history li').length`),1);
  await openInvoice();assert.equal(await evaluate(`!!document.querySelector('[data-action="invoice-form"]')`),false);assert.equal(await evaluate(`!!document.querySelector('[data-action="matching-run"]')`),false);
  await evaluate(`document.querySelector('.demo').open=true`);assert.equal(await evaluate(`document.querySelector('#matching-scenario').disabled && document.querySelector('#matching-version').disabled`),true);await evaluate(`document.querySelector('.demo').open=false`);await at(18);
  await finance();await layout('finance-review');await click('[data-action="payment-return"]');await click('[data-action="payment-return-confirm"]');await at(18);
  assert.equal(await evaluate('document.activeElement.id'),'payment-return-reason');await fill('#payment-return-reason','Cần bổ sung giải trình cho đề nghị tổng hợp.');await click('[data-action="payment-return-confirm"]');await at(19);
  await openInvoice();await openRequest();await click('[data-action="payment-send"]');await at(20);await has('Nhập giải trình khi gửi lại');
  await fill('#payment-explanation','Đã làm rõ nội dung theo yêu cầu Finance.');await click('[data-action="payment-send"]');await at(21);
  await finance();await evaluate(`(()=>{const target=document.querySelector('[data-action="payment-approve"]');target.click();target.click();})()`);await sleep(460);await at(22);
  await has('Đã phê duyệt');await has('Hoàn tất tại phê duyệt đề nghị thanh toán');await has('không có nghĩa đã thanh toán');
  assert.equal(await evaluate(`document.querySelectorAll('#submission-history li').length`),2);assert.equal(await evaluate(`!!document.querySelector('[data-action="payment-approve"]')`),false);
  await layout('approved-request');await shot('p4-04-approved-request','FIN-01 phê duyệt PAYMENT-1 vòng 2, bằng chứng chuẩn bị RESULT-3 giữ nguyên; kết thúc tại đề nghị duyệt; 11/10 10:00');
  await record('P4 full live PR→PO→GR/invoice→FAIL→correction→PASS→prepare/send→Finance return→AP resend→approve','REQ-01/MGR-01/BUY-01/PM-01/WH-01/AP-01/FIN-01');

  // Invoice first: actual WAIT, prepare blocked, GR then PASS.
  await reset();await purchase();await invoice(false,12.5,500);await at(4);await click('[data-action="matching-run"]');await at(5);await has('Chờ dữ liệu');
  assert.equal(await evaluate(`!!document.querySelector('#matching-exception')`),false);await click('[data-action="payment-prepare"]');await at(6);await has('Chờ dữ liệu: Phiếu nhận hàng');
  await layout('waiting-data');await shot('p4-02-waiting-data','AP-01, hóa đơn trước GR: RESULT-1 WAIT từ thiếu dữ liệu thật, chưa có ngoại lệ/đề nghị; chuẩn bị bị chặn; 10/10 18:00');
  await receipt(40);await at(7);await openInvoice();await click('[data-action="matching-run"]');await at(8);await has('RESULT-2');
  await record('P4 invoice before GR: WAIT and prepare blocked; GR alone does not publish PASS','AP-01/WH-01');

  // A different PASS result is allowed only after explicit review, no reprepare.
  await click('[data-action="payment-prepare"]');await at(9);await fill('#payment-content','Giữ nội dung AP khi dữ liệu vừa xem cũ');
  await scenario('PASS','v2');await at(9);await click('[data-action="payment-send"]');await at(10);await has('hết hiệu lực');
  assert.equal(await evaluate(`document.querySelector('#payment-content').value`),'Giữ nội dung AP khi dữ liệu vừa xem cũ');
  await click('[data-action="matching-run"]');await at(11);await click('[data-action="payment-send"]');await at(12);await has('Dữ liệu vừa xem đã cũ');
  assert.equal(await evaluate('document.activeElement.id'),'payment-errors');await layout('stale-view');
  await shot('p4-03-send-blocked-review','AP-01, PAYMENT-1 đã chuẩn bị với RESULT-2/v1; RESULT-3/v2 PASS mới nhưng dấu xem cũ, Gửi bị chặn, giữ nội dung; 11/10 00:00');
  await click('[data-action="payment-review"]');await at(12);assert.equal(await evaluate(`document.querySelector('#payment-content').value`),'Giữ nội dung AP khi dữ liệu vừa xem cũ');
  await click('[data-action="payment-send"]');await at(13);await has('Chuẩn bị: RESULT-2');await has('Vòng 1 · RESULT-3');
  await record('P4 prepare once; changed source blocks send; new PASS still requires review; same request uses new result','AP-01');

  // Second return branch: change invoice, FAIL must block resend until fresh PASS.
  await finance();await click('[data-action="payment-return"]');await fill('#payment-return-reason','Kiểm tra lại tiền hóa đơn tổng hợp');await click('[data-action="payment-return-confirm"]');await at(14);
  await openInvoice();await click('[data-action="invoice-form"]');await fill('#invoice-amount','600');await click('[data-action="document-save"]');await at(15);
  await scenario('FAIL','v2');await click('[data-action="matching-run"]');await at(16);await openRequest();await fill('#payment-explanation','Đang khắc phục số tiền');await click('[data-action="payment-send"]');await at(17);await has('Không đạt (mô phỏng); cần khắc phục');
  await click('[data-action="payment-save"]');await at(18);await click('[data-action="payment-invoice"]');await click('[data-action="invoice-form"]');await fill('#invoice-amount','500');await click('[data-action="document-save"]');await at(19);
  await scenario('PASS','v2');await click('[data-action="matching-run"]');await at(20);await openRequest();await click('[data-action="payment-send"]');await at(21);
  await finance();await click('[data-action="payment-approve"]');await at(22);await has('Đã phê duyệt');await has('Chuẩn bị: RESULT-2');
  await record('P4 after return: invoice edit invalidates old result, FAIL blocks resend, fresh PASS allows same PAYMENT-1','AP-01/FIN-01');

  // Unsupported values cannot be forced through the PASS selector.
  await reset();await purchase();await receipt(40);await invoice(false,12.5,123);await click('[data-action="matching-run"]');await at(6);await has('Chưa có tình huống mô phỏng phù hợp');
  assert.equal(await evaluate(`document.querySelectorAll('#result-history li').length`),0);await click('[data-action="payment-prepare"]');await at(7);await has('Chưa có kết quả đối chiếu');
  await record('P4 unsupported tuple + PASS choice does not publish a result or prepare request','AP-01');
  await reset();await at(0);await choose('FIN-01');await click('#module-nav [data-action="payment-queue"]');await has('Không có đề nghị đang chờ');
  await choose('AP-01');assert.equal(await evaluate(`document.querySelectorAll('[data-action="po-detail"]').length`),0);
  await record('P4 reset clears source choices/results/exceptions/requests and Finance queue','AP-01/FIN-01');

  await cdp('DOM.enable');await cdp('CSS.enable');await evaluate('document.fonts.ready.then(()=>true)');report.fonts=[];
  for(const selector of ['h1','#module-nav .btn','#app .metric-label']) {
    const {root}=await cdp('DOM.getDocument');const {nodeId}=await cdp('DOM.querySelector',{nodeId:root.nodeId,selector});const font=await cdp('CSS.getPlatformFontsForNode',{nodeId});
    report.fonts.push({selector,...font});assert.ok(font.fonts.some(f=>f.isCustomFont&&f.familyName.includes('Be Vietnam')));
  }
  await cdp('Page.reload');await wait(`document.querySelector('#results tbody tr')`);await at(0);
  report.resources=events.filter(e=>e.method==='Network.responseReceived').map(e=>({url:e.params.response.url,status:e.params.response.status}));
  assert.ok(report.resources.every(r=>r.status===200&&r.url.startsWith(baseUrl)));pass('P4 actual font glyphs/local resources/reload defaults',{fonts:report.fonts,resources:report.resources.length});
}
