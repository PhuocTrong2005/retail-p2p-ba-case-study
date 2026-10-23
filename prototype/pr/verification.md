# Kiểm chứng prototype PR — 3C

Các mục 1–4 dưới đây là hồ sơ PR 3C theo phiên bản/thời điểm đã ghi, được bảo toàn. Phần mở rộng PR → PO local ngày 22/10/2026 có kết quả riêng tại [mục 5](#5-p2--liên-thông-pr--po-local); không suy kết quả P2 sang GR/hóa đơn/đề nghị hoặc demo Pages chưa được cập nhật. P3 GR/hóa đơn có hồ sơ riêng tại [mục 6](#6-p3--liên-thông-gr-và-hóa-đơn-local), không thay kết quả lịch sử. P4 có kết quả riêng tại [mục 7](#7-p4--đối-chiếu-mô-phỏng-và-đề-nghị-thanh-toán-local).

## 1. Phạm vi, phiên bản, môi trường và thời điểm kiểm chứng

**Kết luận: 3C hoàn tất trong phạm vi kiểm chứng prototype đã xác định dưới đây.** Không phải UAT, stakeholder sign-off, kiểm thử toàn bộ P2P hoặc bằng chứng về bảo mật, SLA và hiệu quả vận hành thực tế.

**Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.**

### Phạm vi và phiên bản

- Branch `pr-prototype`, HEAD **`42f6c57fddce68b6e096ef46ce40e95f529dd732`**. Đầu lượt chỉ có ` M wireframes/pr/README.md`; không detached HEAD, không thiếu nguồn hoặc thay đổi chưa được giải thích; không tìm thấy AGENTS.md áp dụng.
- Phần được kiểm chứng: bốn màn hình PR, handler, ngân sách/đồng hồ/phạm vi demo SIM-01–04, ba metric, tìm kiếm, cảnh báo phần nhập chưa lưu, reset và server tĩnh. Một mặt hàng mỗi PR theo seed 3A; không PO, GR, hóa đơn hoặc thanh toán.
- Seed: [seed.json](./data/seed.json), [quy tắc dữ liệu](./data/README.md); chủ sở hữu REQ-01, người xem xét MGR-01, Đơn vị mẫu. `T0=2026-10-10T12:00:00+07:00`; kỳ `[2026-10-01T00:00:00+07:00, 2026-10-08T00:00:00+07:00)`.
- Trước lần chạy bổ sung đã xác định **PR-CHK-01–18 là cốt lõi**, **PR-CHK-19–21 là bổ sung**, ghi trong `plan.json` ngoài repo. Không đổi mức theo kết quả. Các ID này chưa có trong repo khi kiểm tra trước khi tạo tài liệu.
- Snapshot đã đọc lại trước sửa: `C:\Users\ASUS\AppData\Local\Temp\pr-verification-3c-qmo7j31o\snapshot.json`, gồm branch/HEAD/status và SHA-256 34 file prototype/nguồn/README wireframe. Các file chương trình, test, QA, seed và ảnh khớp nội dung commit trên; 3C chỉ thêm tài liệu này và liên kết README, không sửa code.

### Nguồn đã đọc trực tiếp

| Nguồn hiện hành | ID được đọc và sử dụng |
| --- | --- |
| [Use case](../../06-system-analysis/use-case-specifications.md) | UC-01, UC-02, UC-10, UC-11, UC-12. UC-11/12 được đọc để phân biệt lịch sử/báo cáo demo với chức năng cho các vai trò của baseline. |
| [Business rules](../../04-to-be-design/business-rules.md) | BR-01–BR-05, BR-25–BR-27: dữ liệu, ngân sách, ba quyết định, ranh giới mua hàng, trạng thái, lịch sử, quyền. |
| [SRS](../../07-software-requirements/srs.md) | Mục 2.1; FR-01–03, FR-14–16; NFR-01–04; AC-01–06, AC-20–26, AC-33–34. AC-26/33 dùng để chỉ rõ phần PO/GR/hóa đơn ngoài prototype. |
| [Baseline decisions](../../08-traceability/baseline-decisions.md) | G1-D03, G1-D04, G1-D05; phân biệt trả lại/từ chối, hàng hóa hữu hình và ranh giới sửa/mở lại. Không đổi các quyết định này. |
| [Hành vi 2A](../../06-system-analysis/pr-behavior-analysis.md) | PR-BHV-01–18 và PR-SCR-01–04; các câu hỏi 2A được cụ thể hóa bằng SIM, không dùng đề xuất cũ để thay quyết định 2B. |
| [Quyết định 2B](../../06-system-analysis/pr-prototype-decisions.md) | SIM-01–04, validation ngày/số/chuỗi và lưu bộ nhớ phiên. OD-03/06/07 còn mở. |
| [Metric](../../08-traceability/pr-metrics-design.md) | PR-MET-01–03; thứ tự `(occurred_at,event_order)`, xét đến và gồm T, kỳ `[S,E)`, giờ liên tục, half-up, chất lượng riêng từng metric và năm ví dụ. |
| [README prototype](./README.md), logic/test/QA/ảnh | Đọc implementation và assertion thực tế để xác định điều gì đã được chứng minh; không lấy số test hoặc ảnh làm nội dung yêu cầu. |

### Môi trường, thời gian và quy ước bằng chứng

Windows/PowerShell; Node **v22.14.0** tại `C:\Users\ASUS\AppData\Roaming\JetBrains\IntelliJIdea2024.3\node\versions\22.14.0\node.exe`. Chrome đang có trên máy: **155.0.8059.40**, khớp báo cáo CDP được tái sử dụng. Không cài dependency. Lượt 3C không mở trình duyệt/server demo; các test server chỉ mở và đóng server riêng trên cổng loopback tạm.

Giờ thực trong tài liệu theo **16/10/2026, UTC+07:00**; không nhầm với giờ mô phỏng **10/10/2026**. Ký hiệu bằng chứng dùng thống nhất cho từng kịch bản:

| Mã bằng chứng / lớp | Nội dung, phiên bản và thời điểm |
| --- | --- |
| **N-S / logic** | [session.test.mjs](./test/session.test.mjs), đọc seed bằng [fixtures.mjs](./test/fixtures.mjs); chạy tại HEAD 42f6c57 trong bộ 49 test lúc **11:01:43.718–11:01:44.005**. |
| **N-M / logic metric** | [metrics.test.mjs](./test/metrics.test.mjs), cùng phiên Node trên; fixture là bản sao, không ghi seed. |
| **N-H / HTTP tĩnh** | [server.test.mjs](./test/server.test.mjs), cùng phiên Node trên; không phải kiểm thử UI hoặc pentest. |
| **N-C / logic, chuỗi riêng** | Test `SIM-04 standard sequence, without intervening saves` trong N-S, chạy riêng tại HEAD 42f6c57 lúc **11:00:58.682–11:00:58.840**, 1 test đạt; cũng chạy trong bộ 49 sau đó, không cộng thành 50 test riêng biệt. |
| **U2 / tích hợp UI** | Báo cáo gốc `M2 draft, reopen, field errors, safe rendering, all budget outcomes, valid first submit and double save guard` lúc **10:38:51.556** và `M2 save returned content keeps returned status` lúc **10:38:53.440**. |
| **U3 / tích hợp UI** | `M3 standard sequence 12/13/14/15/reset matches all expected outputs` lúc **10:39:03.539**, `M3 approve/reject/cancel and empty queue` lúc **10:39:10.080**. |
| **U4 / tích hợp UI** | `M4 search, clear, dirty leave/role cancel/discard and reset cancel` lúc **10:39:16.158**, `M4 browser reload and beforeunload observation` lúc **10:39:17.775**. |
| **UF / UI với fixture phản hồi** | `M1/M4 unknown/no-data fixture, visible quality warning, not-applicable detail and 16px controls` lúc **10:39:35.941**; bản sao phản hồi seed có events/checks rỗng; sau đó tải lại seed thật. |
| **U5 / bố cục và font thực** | 12 kiểm tra bốn màn hình tại 1280/1440/390 px, **10:39:18.733–10:39:32.630**; CDP `CSS.getPlatformFontsForNode` cho bốn weight font local; không suy ra tính dễ hiểu với người dùng thật. |
| **UQ / review hàng đợi** | 8 bản ghi `queueReviews`: 1280/1440 px × bốn mốc 12/13/14/15; nút một dòng, cao 46 px, vừa ô; ID/chẩn đoán không xuất hiện khi phần mở rộng đóng; không đổi giờ khi resize. |
| **P / ảnh trực tiếp, hỗ trợ quan sát** | Chín ảnh PNG trong [evidence](./evidence/pr-01-list.png), công cụ `Page.captureScreenshot`, Chrome/CDP, viewport 1440 px; bảng ảnh và giờ chụp thực tế trong README. Ảnh hỗ trợ quan sát, không chứng minh thứ tự validation, quyền hoặc tính đúng log. |

Toàn bộ U2/U3/U4/UF/U5/UQ thuộc phiên Chrome headless **10:38:46.044–10:39:35.942**, URL đã kiểm tra `http://127.0.0.1:8080/`, cùng bộ thay đổi working tree sau review đã tạo commit 42f6c57. Kết quả đọc lại: **21 mục kiểm tra trình duyệt**, **8 lượt kiểm tra hàng đợi**, **9 ảnh**, không lỗi console trang. Đây không phải số kịch bản PR-CHK hoặc số AC đạt.

### Kiểm kê và quyết định tái sử dụng

1. Đã đọc log gốc, không chỉ README: `C:\Users\ASUS\AppData\Local\Temp\pr-ui-review-ifsd27so\browser-results.json` có assertion/check, `sequence`, `queueReviews`, browser/version, giờ thực và `screenshots`; không có `failure`, `consoleErrors` rỗng. Log TAP gốc có 49 tên test và tổng 49 đạt, 0 lỗi.
2. Đã đối chiếu 17 đường dẫn thực trong commit 42f6c57, file chương trình/QA/test/seed hiện tại với blob commit, chín ảnh/nhãn/giờ chụp với báo cáo và README. Logic và 45 test/fixture 3B.1 không đổi từ commit logic. Không có diff làm thay đổi kết quả sau phiên 3B.2; dữ liệu, scenario và expected value trong QA khớp báo cáo.
3. Vì vậy tái sử dụng **bằng chứng UI và ảnh** 3B.2; không chạy lại toàn bộ desktop/mobile, không chụp thêm hoặc thay ảnh cũ. Hash đo ở 3C là kiểm tra đối chiếu **hiện tại**, không được diễn giải thành metadata đã ghi tại lúc chạy 3B.2.
4. Log TAP gốc thiếu giờ thực tuyệt đối, nên đã chạy bổ sung test chuỗi riêng và một lần bộ Node hiện hành, ghi start/end, HEAD, lệnh, exit code, SHA-256 trước/sau. Không tạo timestamp quá khứ. Bộ 49 hiện tại đạt, mã/seed không thay đổi bởi test.
5. Bản sao log gốc, hash và quyết định phạm vi nằm ngoài repo tại snapshot 3C: `reused/`, `evidence-audit.json`, `plan.json`, `standard-sequence-3c.txt/.json`, `node-suite-3c.txt/.json`. Hash là SHA-256; Temp có thể bị dọn. Các kết quả và liên kết nguồn tái lập cần thiết được giữ trong tài liệu này, không tạo thêm báo cáo bàn giao trong repo.

Lệnh đã chạy bổ sung từ root repo:

```powershell
$prNode = 'C:\Users\ASUS\AppData\Roaming\JetBrains\IntelliJIdea2024.3\node\versions\22.14.0\node.exe'
& $prNode --test '--test-name-pattern=^SIM-04 standard sequence, without intervening saves$' prototype/pr/test/session.test.mjs
& $prNode --test prototype/pr/test/session.test.mjs prototype/pr/test/metrics.test.mjs prototype/pr/test/server.test.mjs
```

Tái lập UI dùng [hướng dẫn server/trình duyệt trong README](./README.md). Script [browser-qa.mjs](./qa/browser-qa.mjs) đã có kết quả U nêu trên; script tồn tại không phải bằng chứng tự động cho mọi lần chạy tương lai. [launch-browser.mjs](./qa/launch-browser.mjs) chỉ là công cụ mở browser/profile QA, không được đếm như test nghiệp vụ.

## 2. Kịch bản và kết quả

Tất cả kịch bản dùng seed/reset làm điều kiện đầu, trừ fixture ghi rõ. **Đạt** nghĩa là expected value của kịch bản trong lớp kiểm tra được chỉ định đã được chứng minh; không có nghĩa toàn bộ yêu cầu baseline đã đạt. Môi trường/phiên bản/thời điểm lấy theo mã N/U/P ở phần 1; không gán giờ Node cho UI hoặc giờ UI cho ảnh khác.

### PR-CHK-01 — Tạo, lưu và mở lại nháp chưa đầy đủ

- **Mức/nguồn:** Cốt lõi; UC-01, BR-01, FR-01, AC-01/25, G1-D05, SIM-02/03/04; PR-BHV-01–04.
- **Đầu vào/bước:** REQ-01 mở Tạo PR; nhập lý do, để các trường khác thiếu; Lưu nháp; về danh sách rồi mở PR-NEW-1. Với N-S, lấy bản sao form rồi sửa bản sao để kiểm tra không làm đổi dữ liệu phiên.
- **Mong đợi:** Mở form chưa tạo PR đã lưu hoặc tăng giờ; tự gắn người/đơn vị; lưu tăng 1 giờ, giữ phần nhập, không mở vòng; mở lại không tăng giờ.
- **Thực tế/trạng thái:** **Đạt**. UI từ 5 PR thành có nháp đã lưu, mở lại giữ nội dung; logic xác nhận sự kiện rỗng, bản sao trả về độc lập và metric không coi nháp rõ nguồn là hồ sơ thiếu log.
- **Bằng chứng/lớp:** N-S test `new form is unsaved; save incomplete draft and reopen copies` (dòng 47); U2; [P form mới](./evidence/pr-02-form.png). Lưu/mở UI và invariants logic được kiểm tra riêng.

### PR-CHK-02 — Validation trước ngân sách, giữ dữ liệu và focus lỗi

- **Mức/nguồn:** Cốt lõi; UC-01 A1, BR-01, FR-01, AC-01, SIM-01/04 và validation 2B; PR-BHV-03/05.
- **Đầu vào/bước:** Tạo PR thiếu trường; chọn UNAVAILABLE; thử gửi với `29/02/2026`, số lượng `1e3` ở logic. UI lưu lý do rồi gửi khi còn thiếu năm trường, chọn liên kết lỗi; bổ sung trường để tiếp tục.
- **Mong đợi:** Gửi thất bại tăng đúng 1 giờ, không kiểm tra ngân sách, không sự kiện mở vòng; dữ liệu lỗi giữ lại; summary được focus, từng liên kết dẫn đến trường có nhãn/lỗi tương ứng. Validation theo tám trường, không ép ngày tương lai hoặc chỉ số nguyên.
- **Thực tế/trạng thái:** **Đạt**. N-S ghi `budget_checked=false`, field error, lịch sử rỗng và dữ liệu `1e3` còn nguyên; U2 xác nhận focus `errors`, link đến `field-cost_center_id`, phần nhập giữ lại. Ngày nhuận, Unicode trống, số lẻ/giá 0 và tham chiếu sai được kiểm tra thêm bằng Node.
- **Bằng chứng/lớp:** N-S dòng 71, 215, 225; U2; [P lỗi gửi](./evidence/pr-02-submit-error.png). Không lấy thông báo/ảnh để suy ra validation chưa gọi ngân sách; kết luận đó dựa trên assertion logic.

### PR-CHK-03 — Hai nhánh ngân sách chặn và lựa chọn giữ nguyên

- **Mức/nguồn:** Cốt lõi; UC-01 A2, BR-02/03, FR-02, AC-02/03; SIM-01/02/04; PR-BHV-06/09.
- **Đầu vào/bước:** Mỗi nhánh bắt đầu reset. N-S dùng B đủ trường, chọn INSUFFICIENT hoặc UNAVAILABLE và gửi lại hai lần; UI U2 dùng PR mới đủ trường, lần lượt thử hai lựa chọn.
- **Mong đợi:** Hai mã kết quả khác nhau; mỗi lần gửi tăng 1 giờ; không mở vòng; lựa chọn không tự tiêu thụ; B vẫn Chờ chỉnh sửa, PR mới vẫn Nháp. UNAVAILABLE không kết luận thiếu ngân sách.
- **Thực tế/trạng thái:** **Đạt**. N-S kiểm tra `INSUFFICIENT_BUDGET`/`BUDGET_UNAVAILABLE`, hai lần thử giữ kịch bản, B có đúng hai sự kiện cũ; U2 xác nhận hai thông báo phân biệt. Không có công thức/số dư ngân sách được kiểm chứng.
- **Bằng chứng/lớp:** Hai test động `budget INSUFFICIENT persists across attempts; no review round` / `budget UNAVAILABLE persists across attempts; no review round` trong N-S; U2, [P B nguồn không khả dụng](./evidence/pr-02-returned-13.png).

### PR-CHK-04 — Gửi hợp lệ lần đầu

- **Mức/nguồn:** Cốt lõi; UC-01 luồng chính, BR-01/02, FR-01/02, AC-02; SIM-01/02/04; PR-BHV-07.
- **Đầu vào/bước:** Nháp mới hợp lệ: CC-OPS, lý do/mô tả không trống, ngày `15/10/2026`, số lượng `1.5`, giá `0`; chọn PASS, Gửi rồi thử gửi lặp.
- **Mong đợi:** Chuẩn hóa số/ngày, `FIRST_VALID_SUBMIT`, vòng/order 1, REQ-01, timestamp sau tăng; có check_reference và bằng chứng đạt; PR vào hàng đợi, lần gửi đầu sau kỳ không vào nhóm PR trong kỳ.
- **Thực tế/trạng thái:** **Đạt**. N-S xác nhận ngày ISO/số 1.5, event đúng, gửi lặp bị chặn không tăng giờ, hàng chờ thành 3 nhưng mẫu số kỳ vẫn 4; U2 chuyển sang chi tiết Chờ xem xét.
- **Bằng chứng/lớp:** N-S `first valid submission uses normalized numbers/date and blocks repeat` dòng 95; U2. Event/check/ID được chứng minh ở logic, không chỉ từ UI.

### PR-CHK-05 — Phê duyệt và ranh giới Mua hàng

- **Mức/nguồn:** Cốt lõi; UC-02 luồng chính, BR-04/05, FR-03, AC-04, G1-D03; SIM-02/03/04; PR-BHV-12.
- **Đầu vào/bước:** Reset; MGR-01 mở A đang chờ, Phê duyệt; thử quyết định lại; ở UI duyệt A/C rồi mở hàng đợi.
- **Mong đợi:** APPROVE đóng vòng 1 ở giờ sau tăng, nhãn Đã duyệt, `ready_for_purchasing=true`; không quyết định lần hai, không còn trong hàng đợi. Không suy ra PO đã tạo.
- **Thực tế/trạng thái:** **Đạt**. N-S kiểm tra cờ sẵn sàng, chặn quyết định và sửa/gửi sau duyệt; U3 xác nhận hành động quyết định biến mất, hàng đợi rỗng sau duyệt A/C.
- **Bằng chứng/lớp:** N-S `approve closes round, makes available to purchasing and blocks second decision` dòng 118; U3. Xử lý PO ngoài phạm vi.

### PR-CHK-06 — Trả lại thiếu lý do và trả lại hợp lệ

- **Mức/nguồn:** Cốt lõi; UC-02 A2, BR-04, FR-03, AC-06/34; SIM-02/04, validation chuỗi 2B; PR-BHV-11/14.
- **Đầu vào/bước:** MGR-01 mở A đang chờ; mở Trả lại, thử lý do rỗng/space/tab/NBSP (logic), rồi nhập lý do cụ thể và hoàn tất; Người yêu cầu mở PR.
- **Mong đợi:** Lý do không hợp lệ không đổi PR/event/giờ; lý do hợp lệ được ghi và đóng đúng vòng, tăng 1 giờ; trả về Người yêu cầu với hướng dẫn sửa/gửi lại và kiểm tra lại.
- **Thực tế/trạng thái:** **Đạt**. N-S đối chiếu toàn bộ trạng thái trước/sau các yêu cầu sai; U3 giữ 14:00 khi lý do thiếu, trả A tại 15:00 khi hợp lệ. Người yêu cầu thấy lý do/bước tiếp theo.
- **Bằng chứng/lớp:** N-S dòng 105; U3; [P sau trả A](./evidence/pr-04-queue-15.png), ảnh chỉ xác nhận kết quả hàng đợi, không thay bằng chứng atomic của yêu cầu sai.

### PR-CHK-07 — Lưu phần sửa, gửi lại thất bại và thành công

- **Mức/nguồn:** Cốt lõi; UC-01 A3/UC-02 A2, BR-04, FR-01–03, AC-06/34, G1-D03/D05; SIM-01/02/04; PR-BHV-04/08.
- **Đầu vào/bước:** Reset; REQ-01 sửa lý do B, Lưu phần sửa rồi mở lại. Ca độc lập: gửi lại B với ngân sách bị chặn, sau đó PASS; ca chuỗi chuẩn không xen lưu.
- **Mong đợi:** Lưu tăng 1 giờ, giữ Chờ chỉnh sửa/vòng 1 đã đóng; lỗi không mở vòng; đạt mới mở vòng 2 bằng VALID_RESUBMIT, có kiểm tra trường/ngân sách lại.
- **Thực tế/trạng thái:** **Đạt**. N-S xác nhận bản chứng từ chưa đổi trước lưu và đúng hai sự kiện cũ sau lưu; U2 giữ nhãn. N-S/U3 xác nhận B chỉ mở vòng 2 tại gửi đạt, không gộp với lỗi ngân sách hoặc lần lưu.
- **Bằng chứng/lớp:** N-S dòng 62, các test ngân sách, N-C; U2/U3; [P B chờ sửa 13:00](./evidence/pr-02-returned-13.png), [P B mở vòng 14:00](./evidence/pr-04-queue-14.png).

### PR-CHK-08 — Từ chối, hủy xác nhận và không mở lại

- **Mức/nguồn:** Cốt lõi; UC-02 A1, BR-04, FR-03, AC-05, G1-D03/D05; SIM-02/03/04; PR-BHV-13.
- **Đầu vào/bước:** Reset; MGR-01 mở A, mở/hủy xác nhận; mở lại và xác nhận. Logic thử confirmed không phải boolean true, sau quyết định thử sửa/lưu/gửi/quyết định lại; có cả E đã từ chối từ seed.
- **Mong đợi:** Mở/hủy không tăng giờ; chỉ xác nhận true mới REJECT đóng vòng, không bắt lý do từ chối; không mở lại hoặc chuyển Mua hàng.
- **Thực tế/trạng thái:** **Đạt**. U3 hủy giữ 12:00, xác nhận ra Đã từ chối và không còn nút quyết định; N-S chặn các phương thức sau từ chối và không ghi return_reason vào REJECT.
- **Bằng chứng/lớp:** N-S dòng 127; U3. Không coi thử gọi handler bằng Node là đã thao tác lại nút UI bị loại bỏ.

### PR-CHK-09 — Chặn sai vai/ngữ cảnh, PR đã duyệt và thao tác lặp

- **Mức/nguồn:** Cốt lõi; BR-04/27, FR-03, AC-20 (phần demo), G1-D05; SIM-02/03/04; PR-BHV-12–14/16.
- **Đầu vào/bước:** N-S thử Người yêu cầu quyết định, Quản lý gửi/tạo/sửa thay, sửa/lưu/gửi PR đang chờ hoặc đã duyệt/từ chối, quyết định lần hai, gửi lặp và định danh trùng. U2 bấm lưu hai lần liên tiếp.
- **Mong đợi:** Handler chặn dù không dựa vào ẩn nút; không dữ liệu/event/giờ thừa. Chỉ lần lưu đầu được xử lý trong cặp bấm lặp UI.
- **Thực tế/trạng thái:** **Đạt** ở lớp ghi rõ. N-S các guard đúng, PR có định danh mâu thuẫn không được quyết định; U2 giờ chỉ từ 12:00 sang 13:00 sau double save. Không phải bằng chứng chống tấn công hoặc phân quyền thật.
- **Bằng chứng/lớp:** N-S dòng 95, 118, 127, 140, 177, 233; U2/U3 cho chặn UI và xử lý bấm lặp. Các request sai vai trực tiếp là kiểm tra **logic**.

### PR-CHK-10 — Phạm vi danh sách, hàng đợi, lịch sử và metric

- **Mức/nguồn:** Cốt lõi; UC-10/11 (phần PR), BR-25–27, FR-14/15, AC-20–22 (phần demo); SIM-03; PR-BHV-01/10/15–18.
- **Đầu vào/bước:** UI seed: REQ-01 đọc năm PR của mình; chuyển MGR-01 xem A/C và mở chi tiết/lịch sử. Logic thêm bản sao fixture khác chủ và khác đơn vị; gọi list/detail/history/openForm/edit/submit/decide/metrics.
- **Mong đợi:** REQ chỉ đọc PR của mình; Quản lý đọc đơn vị mẫu, queue chỉ đang chờ; lịch sử chỉ đọc; Người yêu cầu không có tổng hợp đơn vị. Metric của Quản lý vẫn gồm B/D/E trong kỳ dù ngoài queue; mở chi tiết không đổi mẫu số.
- **Thực tế/trạng thái:** **Đạt** trong SIM-03. N-S chặn fixture không được phép, queue 2, mẫu số 4; U3 có đúng tập/mẫu số. Fixture khác chủ/đơn vị chỉ được kiểm tra **logic**, không tuyên bố thử UI đăng nhập hoặc ma trận quyền thật.
- **Bằng chứng/lớp:** N-S `SIM-03 scopes detail/history/form/actions by owner and unit; metrics use entire unit` dòng 151; U3; [P danh sách](./evidence/pr-01-list.png), [P hàng đợi](./evidence/pr-04-queue-12.png).

### PR-CHK-11 — Tìm kiếm và kết quả rỗng

- **Mức/nguồn:** Cốt lõi; UC-10 A1, PR-BHV-01, brief UI 3B.2; không thêm yêu cầu tìm nâng cao.
- **Đầu vào/bước:** Reset ở danh sách; tìm `  pr-b  `, `MÁY QUÉT`, chuỗi không khớp; Xóa tìm kiếm. Ca riêng duyệt A/C để queue rỗng.
- **Mong đợi:** Trim/không phân biệt hoa thường; lọc theo mã/mô tả; có rỗng và cách xóa; queue rỗng không tính PR đang sửa/đã quyết định; không tăng giờ do tìm/xem.
- **Thực tế/trạng thái:** **Đạt**. U4 có một dòng cho từng tìm kiếm khớp, thông báo rỗng, xóa trở lại năm dòng; U3 có queue rỗng. Không có filter báo cáo doanh nghiệp được chứng minh.
- **Bằng chứng/lớp:** U4/U3; [app.mjs](./app.mjs) `listView/queueView` và assertion trong [QA](./qa/browser-qa.mjs). Đây là bằng chứng UI, không suy ra từ test Node.

### PR-CHK-12 — Rời form/đổi vai với phần nhập chưa lưu

- **Mức/nguồn:** Cốt lõi theo brief 3B.2 và quy ước lưu phiên 2B; PR-BHV-03/04/16. Không bổ sung AC mới.
- **Đầu vào/bước:** REQ-01 mở B, nhập lý do mới; chọn về danh sách, chọn Tiếp tục chỉnh sửa; đổi MGR-01 rồi hủy; cuối cùng rời form bằng Bỏ thay đổi, mở lại B.
- **Mong đợi:** Cảnh báo trong ứng dụng; hủy giữ form/role/giờ, bỏ phần nhập không làm đổi bản đã lưu. Không dựa vào beforeunload thay cảnh báo nội bộ.
- **Thực tế/trạng thái:** **Đạt**. U4 giữ form, role REQ-01 khi hủy và không còn chuỗi chưa lưu khi mở lại B; không tăng giờ.
- **Bằng chứng/lớp:** U4; QA assertion dialog/role/value; không cần và không tạo ảnh mới cho một dialog đã có trace thao tác.

### PR-CHK-13 — Thao tác không tăng giờ

- **Mức/nguồn:** Cốt lõi; SIM-04, PR-BHV-01/10/15–18.
- **Đầu vào/bước:** Từ T0, xem/list/detail/history, mở form, sửa chưa lưu, đổi vai/kịch bản, mở/hủy từ chối/reset và yêu cầu trái vai/thiếu lý do trả; đối chiếu context trước/sau.
- **Mong đợi:** Chỉ các thao tác nghiệp vụ được xử lý mới tăng giờ theo SIM; các thao tác trên không tạo event hay thay lịch sử. Không lấy giờ máy.
- **Thực tế/trạng thái:** **Đạt**. N-S so context bất biến ở các guard/read/control; U2/U3/U4 xác nhận các mốc mong đợi, hủy giữ giờ. Resize ở UQ cũng không đổi thời điểm báo cáo.
- **Bằng chứng/lớp:** N-S dòng 47, 105, 127, 140, 193; U2/U3/U4/UQ. Nguồn timestamp từ handler, không phải nhãn ảnh.

### PR-CHK-14 — Reset, hủy reset và tải lại

- **Mức/nguồn:** Cốt lõi; SIM-01/02/03/04, lưu phiên 2B; brief UI 3B.2.
- **Đầu vào/bước:** Thay nội dung, phát sinh sự kiện/PR mới, đổi vai/ngân sách; reset chưa xác nhận rồi xác nhận. UI hủy reset khi INSUFFICIENT; tải lại sau phần nhập thay đổi và chấp nhận cảnh báo.
- **Mong đợi:** Hủy giữ nguyên; xác nhận/reset/reload đưa về năm PR, T0, REQ-01, PASS, xóa input/feedback/query phát sinh; ID cấp lại xác định, thay đổi phiên trước không lọt sang phiên sau.
- **Thực tế/trạng thái:** **Đạt**. N-S đối chiếu list/context và ID/event sau reset; U4 hủy giữ ngân sách/giờ, reload trả đúng mặc định; U3 reset chuỗi chuẩn khớp seed.
- **Bằng chứng/lớp:** N-S `reset confirmation, isolation, history and deterministic IDs` dòng 193; U3/U4. Không chứng minh lưu bền vì prototype cố ý không lưu bền.

### PR-CHK-15 — Ba metric trong chuỗi chuẩn liên tục

- **Mức/nguồn:** Cốt lõi; PR-MET-01–03, SIM-01–04, PR-BHV-18.
- **Đầu vào/bước:** Chạy đúng bảng chuỗi bên dưới, không xen Lưu; REQ-01 gửi B tại 13/14, MGR-01 trả A tại 15; reset qua điều khiển demo. Chuyển vai/chọn ngân sách không tăng giờ.
- **Mong đợi:** Số PR chờ/giờ chờ/tử mẫu số và ngữ cảnh nhóm đúng từng mốc; B chỉ mở vòng tại 14; C ngoài kỳ dù trong queue.
- **Thực tế/trạng thái:** **Đạt**. N-C và N-S có assertion từng PR/giờ và dữ liệu diagnostic; U3 có bốn bản ghi `sequence` và reset được assert; ảnh giữ đúng mốc. Bảng không dùng kết quả hardcode trong seed để thay phép tính.
- **Bằng chứng/lớp:** N-C, N-S dòng 13, N-M baseline; U3 và bốn ảnh queue-12/13/14/15. Các mốc mới chạy ở **logic 3C**; UI là trace **3B.2 tái sử dụng**, không phải UI chạy lại ở 11:00.

### PR-CHK-16 — Ca biên metric và dữ liệu thiếu/không hợp lệ

- **Mức/nguồn:** Cốt lõi; quy ước/quality PR-MET-01–03, SIM-02/04.
- **Đầu vào/bước:** N-M dùng fixture riêng: lần đầu đúng S/E; quyết định đúng T/sau T; cùng timestamp đảo thứ tự mảng/order sai; hai lần trả; nhóm rỗng; xung đột ID; thiếu timestamp/offset/check/lý do/log; log chưa đầy đủ; bản ghi không gắn PR; thời lượng 1.005 giờ và nhỏ hơn điểm giữa 1 ms.
- **Mong đợi:** S gồm/E loại, T gồm; thứ tự nguồn quyết định; mỗi PR trả nhiều lần chỉ đếm một; mẫu số 0 là Không có dữ liệu; thiếu/lỗi không mặc định nháp hoặc 0. Chưa xác định nhóm, lịch sử trả lại, tình trạng ngữ cảnh được tách riêng; đã biết từng trả không đủ kết luận còn chờ sửa. Half-up chỉ khi hiển thị, giờ gốc giữ nguyên.
- **Thực tế/trạng thái:** **Đạt** ở **logic** N-M: A=1.005 giờ hiển thị 1,01; thiếu log không thành nháp; số không xác định chia nhóm đúng; unlinked ghi Không xác định đầy đủ; duplicate giống nhau dùng một lần. UF chỉ chứng minh UI cảnh báo/nhãn cho một fixture rỗng log, không thay toàn bộ các ca biên logic.
- **Bằng chứng/lớp:** N-M các test ở dòng 18–207; N-S dòng 170; UF kiểm tra cảnh báo ngoài details và chẩn đoán khi mở. Không tuyên bố đã thao tác UI cho mọi ca biên.

### PR-CHK-17 — Phần làm rõ của C và lịch sử tối thiểu

- **Mức/nguồn:** Cốt lõi theo dữ liệu 3A đã chốt; SIM-03, PR-BHV-15, quy tắc sự kiện metric.
- **Đầu vào/bước:** Mở C; đọc nội dung hiện tại, ba sự kiện và ghi chú; ở logic đối chiếu `resubmit_event_id`, lý do trước làm rõ và payload lịch sử.
- **Mong đợi:** Ghi chú gắn C-3; không ngụ ý nội dung hiện tại là snapshot tại C-1; không event/timestamp giả; lịch sử không tự tái dựng chứng từ quá khứ.
- **Thực tế/trạng thái:** **Đạt**. N-S xác nhận C-3, ba sự kiện, `document_snapshots_available=false`; U có ghi chú đúng vị trí C-3, [P chi tiết C](./evidence/pr-03-detail-c.png).
- **Bằng chứng/lớp:** N-S dòng 183; UI check `M1 four screens render seed and C-3 context` lúc 10:38:54.952 và P. Không suy ra full audit từ kết quả này.

### PR-CHK-18 — Bảo toàn seed, bằng chứng ngân sách và bản sao phiên

- **Mức/nguồn:** Cốt lõi; SIM-01/03/04, giới hạn dữ liệu 3A và brief 3C.
- **Đầu vào/bước:** N-S giữ bản sao input/hash file; tạo/gửi PR mới, đổi ngân sách và gửi B thất bại, duyệt A rồi reset; đối chiếu đối tượng, file và lịch sử seed. 3C đối chiếu SHA-256 snapshot trước/sau và nguồn commit.
- **Mong đợi:** Lựa chọn ngân sách tương lai không đổi bằng chứng quá khứ; không mutate đối tượng seed/file seed; không rò thay đổi giữa phiên; file cần bảo toàn giữ nguyên.
- **Thực tế/trạng thái:** **Đạt**. N-S giữ đối tượng và hash file, lịch sử ban đầu khôi phục; metric baseline không đổi chỉ vì chọn ngân sách khác. Hash trước/sau cả bộ 49 test giống nhau. File seed còn khớp `b9232f3`; source thiết kế còn khớp `b579cdc`.
- **Bằng chứng/lớp:** N-S dòng 140/193/203; N-M baseline; `node-suite-3c.json` và snapshot 3C. Bảo toàn file trên đĩa và input object là hai kiểm tra khác nhau, không đánh tráo.

### PR-CHK-19 — Bố cục, font, nút và phần chẩn đoán

- **Mức/nguồn:** Bổ sung; brief/review 3B.2, PR-BHV-10/16–18; hỗ trợ một phần NFR-04.
- **Đầu vào/bước:** Bốn màn hình 1280/1440 và bổ sung 390 px; ở mỗi mốc queue 12/13/14/15 thử 1280/1440, phần mở rộng đóng; kiểm tra glyph/font thực, control 16 px; mở chẩn đoán với fixture.
- **Mong đợi:** Không tràn ngang toàn trang, nút Xem xét một dòng/vừa ô; vùng chính dùng Nhóm PR trong kỳ, chẩn đoán/ID trong mở rộng, cảnh báo vẫn hiện khi cần.
- **Thực tế/trạng thái:** **Đạt** trong kích thước/browser đã kiểm tra. UQ cả tám lượt: nút cao 46 px, một dòng, vừa ô; U5 bốn weight custom font; UF cảnh báo nhìn thấy bên ngoài. Không kết luận mọi thiết bị, accessibility hoặc người dùng hiểu.
- **Bằng chứng/lớp:** U5/UQ/UF, bốn ảnh queue và [ảnh form](./evidence/pr-02-form.png); ảnh kiểm tra 1280 nằm ngoài repo, không thêm bộ ảnh trùng.

### PR-CHK-20 — beforeunload trong Chrome headless

- **Mức/nguồn:** Bổ sung theo brief UI 3B.2; cảnh báo nội bộ bắt buộc đã kiểm tra riêng ở PR-CHK-12.
- **Đầu vào/bước:** Form có phần nhập chưa lưu; click thật và `Input.insertText`; `Page.reload`, dismiss rồi reload/accept.
- **Mong đợi:** Ghi nhận đúng khả năng của browser; hủy còn form, chấp nhận reload về seed. Không đòi chuỗi hộp thoại giống nhau giữa các browser.
- **Thực tế/trạng thái:** **Đạt** cho phép thử này: lúc **10:39:17.333**, Chrome/CDP phát `type=beforeunload`, `hasBrowserHandler=true`, message rỗng; dismiss giữ form, accept khôi phục dữ liệu/config. Không khẳng định đã xem giao diện hộp thoại native headful, đóng tab/cửa sổ hoặc thử browser khác.
- **Bằng chứng/lớp:** U4 `beforeunload` trong log gốc; không có ảnh dựng/hộp thoại giả. Các hành vi chưa thử được công bố ở phần 4, không tính đạt ngoài phép thử này.

### PR-CHK-21 — Server tĩnh và tài nguyên local

- **Mức/nguồn:** Bổ sung theo brief 3B.2; không phải AC/NFR bảo mật thực tế.
- **Đầu vào/bước:** N-H mở server riêng cổng loopback tạm; GET HTML/CSS/module/JSON/font/license, HEAD, POST/PUT/DELETE và các đường dẫn traversal/.git/test/README/encoding sai.
- **Mong đợi:** Chỉ allowlist được phục vụ, MIME đúng, HEAD không body, method ghi 405, đường dẫn không cho phép 404/encoding lỗi 400; đóng server test của mình.
- **Thực tế/trạng thái:** **Đạt**: bốn test N-H đúng các status/MIME/body; tài nguyên thật cũng được tải trong phiên U. Không chứng minh chống mọi tấn công hoặc bảo mật phân quyền của ứng dụng.
- **Bằng chứng/lớp:** N-H bốn test dòng 16/22/29/34; [serve.mjs](./serve.mjs); lớp HTTP, không mô tả như test thao tác UI.

### Chuỗi chuẩn: mong đợi và thực tế

**Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.**

Mọi mốc bên trái là **10/10/2026, UTC+07:00**. Các số ngữ cảnh là chờ xem xét/chờ chỉnh sửa trong cùng nhóm PR trong kỳ; không gồm C. Điều khiển demo không phải vai trò nghiệp vụ thứ ba.

| Mốc / thao tác | Mong đợi | Thực tế N-C / N-S (logic 3C) và U3 (UI 3B.2) | Kết luận |
| --- | --- | --- | --- |
| 12:00, khởi tạo REQ-01 | A/C chờ; A195/C96 giờ; 1/4=25%; 1/1 | 2 PR; A195/C96; 1/4=25%; 1/1 | Khớp |
| 13:00, REQ-01 gửi B, UNAVAILABLE | A/C chờ; A196/C97; B chưa mở vòng; 25%; 1/1 | 2 PR; A196/C97; không thêm event B; 25%; 1/1 | Khớp |
| 14:00, REQ-01 gửi B, PASS | A/B/C chờ; A197/B0/C98; 25%; 2/0 | 3 PR; A197/B0/C98; VALID_RESUBMIT vòng 2; 25%; 2/0 | Khớp |
| 15:00, MGR-01 trả A có lý do | B/C chờ; B1/C99; 2/4=50%; 1/1 | 2 PR; B1/C99; A Chờ chỉnh sửa/Không áp dụng tuổi chờ; 50%; 1/1 | Khớp |
| Reset xác nhận qua demo | Seed, T0, REQ-01, PASS; số ban đầu | Đúng năm PR và dữ liệu/config ban đầu; A195/C96; 25%; 1/1 | Khớp |

U3 được ghi thực lúc 10:38:56.189 / 10:38:57.977 / 10:38:59.692 / 10:39:02.493 và assert reset lúc 10:39:03.539, ngày 16/10. N-C ghi đúng cùng các giá trị trong output diagnostic lúc 11:00:58; không xen lưu, không đổi timestamp seed. N-S lặp lại chuỗi trong bộ test lúc 11:01:43–44. B trả sau cuối kỳ vẫn vào tử số; C gửi lại trong kỳ nhưng lần đầu trước kỳ nên ngoài nhóm.

### Tổng hợp trạng thái, không phải tỷ lệ coverage

| Nhóm | Đạt | Không đạt | Chưa kiểm tra | Bị chặn |
| --- | ---: | ---: | ---: | ---: |
| Cốt lõi PR-CHK-01–18 | 18 | 0 | 0 | 0 |
| Bổ sung PR-CHK-19–21, chỉ phép thử đã mô tả | 3 | 0 | 0 | 0 |

49 là số test Node trong bộ hiện hành, không phải số PR-CHK. 21 mục QA và 8 lượt queue cũng không phải mẫu số coverage yêu cầu. Không cộng các số này hoặc công bố tỷ lệ pass/coverage chung.

## 3. Đối chiếu yêu cầu

Mức bao phủ dùng đúng bốn giá trị: **Đầy đủ**, **Một phần**, **Chưa được kiểm chứng**, **Ngoài phạm vi prototype**. “Đầy đủ” dưới đây chỉ dùng cho quy ước SIM/metric hoặc hành vi demo đã giới hạn rõ; không suy ra toàn bộ AC/NFR đạt. Không sửa SRS/RTM.

| ID nguồn | Nội dung kiểm chứng | Kịch bản / bằng chứng | Mức bao phủ | Phần chưa được chứng minh |
| --- | --- | --- | --- | --- |
| UC-01 | Nháp, kiểm tra và gửi/gửi lại PR | 01–04, 07; N-S/U2/U3 | Một phần | Đủ trong prototype/SIM; xác thực, nguồn ngân sách/đơn vị thật và lưu bền không có. |
| UC-02 | Duyệt/từ chối/trả lại và ghi quyết định | 05–09; N-S/U3 | Một phần | Đủ trong prototype/SIM; thẩm quyền và xử lý Mua hàng thật không được chứng minh. |
| UC-10 | Xem trạng thái/tìm giao dịch có quyền | 10–13; N-S/U4 | Một phần | Chỉ PR, hai vai demo; không toàn P2P/tham chiếu liên chứng từ hoặc xác thực thật. |
| UC-11 | Lịch sử giao dịch theo quyền | 10, 17; N-S/P C | Một phần | Chỉ chuỗi quy trình tối thiểu SIM-03, không chức năng audit của các vai trò baseline. |
| UC-12 | Báo cáo mua hàng cho các vai trò baseline | 15–16 chỉ là phần minh họa metric | Ngoài phạm vi prototype | Báo cáo/bộ lọc cho Trưởng bộ phận mua hàng/Tài chính không triển khai; không lấy metric của MGR-01 để nhận là UC-12 đạt. |
| BR-01 | Tám trường, nháp thiếu trường | 01–02/04; N-S/U2 | Một phần | Đủ với dữ liệu và danh mục demo; xác nhận nghiệp vụ/nguồn danh mục thật chưa có. |
| BR-02, BR-03 | Cổng ngân sách trước xem xét | 02–04/07; N-S/U2 | Một phần | Chỉ kết quả định trước SIM-01; không kiểm chứng chính sách/nguồn ngân sách thật. |
| BR-04 | Ba quyết định đúng vai/ngữ cảnh | 05–10; N-S/U3 | Một phần | Quyền/thẩm quyền thật, tính hợp lý nhu cầu mua thật chưa được chứng minh. |
| BR-05 | Chỉ PR đã duyệt sẵn sàng Mua hàng | 05/08/09; N-S | Một phần | Cờ ready_for_purchasing không thay bằng chứng chặn/tạo PO thực tế. |
| BR-25 | Trạng thái và bước tiếp theo | 05–10/14; N-S/U | Một phần | Năm nhãn SIM-02, không state model cuối cùng toàn P2P; OD-06 mở. |
| BR-26 | Giao dịch/người/hành động/thời điểm | 05–08/10/17; N-S/U3 | Một phần | Không log mọi chỉnh sửa/tạo/lưu, không bất biến, lưu trữ, truy vấn audit toàn hệ thống. |
| BR-27 | Hành động theo vai trò | 09/10; N-S/U3/U4 | Một phần | Guard demo không chứng minh bảo mật, phiên đăng nhập hoặc ma trận quyền thật. |
| FR-01 | Tạo/lưu/kiểm tra/gửi PR | 01–04/07; N-S/U2 | Một phần | Đủ trong prototype/SIM, một mặt hàng; không nguồn danh tính thật/lưu bền/mọi thiết kế nhiều dòng. |
| FR-02 | Yêu cầu và chặn theo kiểm tra ngân sách | 02–04; N-S/U2 | Một phần | Không tích hợp hoặc công thức/hạn mức; OD-03 vẫn mở. |
| FR-03 | Quyết định và gửi lại có kiểm tra | 05–09; N-S/U3 | Một phần | Đủ nhánh mô phỏng; không cấp quyền hoặc chuyển Mua hàng thật. |
| FR-14 | Trạng thái/tham chiếu P2P trong quyền | 10/11/17; N-S/U | Một phần | Thiếu tham chiếu PR–PO–GR–hóa đơn và các giao dịch/vai khác. |
| FR-15 | Lưu/hiển thị lịch sử có quyền | 10/17; N-S/U | Một phần | Chỉ lưu trong bộ nhớ chuỗi PR tối thiểu, không full audit/lưu bền. |
| FR-16 | Báo cáo cho Trưởng bộ phận mua hàng/Tài chính | Không có kịch bản triển khai chức năng này | Ngoài phạm vi prototype | SIM-03 cho MGR-01 xem metric demo không thay yêu cầu FR-16. |
| AC-01 | Lỗi cấp trường, chặn gửi, vẫn lưu nháp | 01/02; N-S/U2/P lỗi | Một phần | Đủ trong prototype/SIM; chưa UAT tính dễ hiểu hoặc toàn hệ thống thật. |
| AC-02 | Ngân sách phải kiểm tra trước xem xét | 02–04; N-S/U2 | Một phần | Đủ thứ tự/cổng demo, chưa nguồn ngân sách thật. |
| AC-03 | Chặn và giữ kết quả kiểm tra không đạt | 03/07; N-S/U2 | Một phần | Feedback phiên demo; chưa lưu kết quả bền trong hệ thống vận hành. |
| AC-04 | Duyệt, sẵn sàng mua và ghi quyết định | 05; N-S/U3 | Một phần | Đủ trong prototype/SIM; không quy trình Mua hàng thật. |
| AC-05 | Từ chối, chặn tiếp và không mở lại | 08/09; N-S/U3 | Một phần | Đủ handler/UI demo; không xác thực/quyền thật. |
| AC-06 | Trả lý do, sửa và kiểm tra lại | 06/07; N-S/U2/U3 | Một phần | Đủ trong prototype/SIM; chưa nghiệp vụ/nguồn ngân sách thật. |
| AC-20 | Không lộ dữ liệu/hành động thiếu quyền | 09/10; N-S fixture | Một phần | Chỉ guard demo; seed/module local vẫn thuộc dữ liệu browser, không bằng chứng kiểm soát truy cập thực tế. |
| AC-21 | Trạng thái và tham chiếu giao dịch hiện có | 10/17; N-S/P | Một phần | Chỉ trạng thái PR; không hồ sơ PR/PO có chứng từ liên kết trong baseline. |
| AC-22 | Xác định giao dịch/người/hành động/thời điểm | 05–08/17; N-S/U3 | Một phần | Chỉ sự kiện PR trọng yếu được mô phỏng; không mọi hành động P2P hoặc NFR audit đầy đủ. |
| AC-23, AC-24 | Lọc/không dữ liệu báo cáo đúng quyền | 16 chỉ kiểm tra nhãn metric demo | Ngoài phạm vi prototype | Không bộ lọc/báo cáo/quyền cho vai trò FR-16; nhãn Không có dữ liệu không chứng minh toàn AC-24. |
| AC-25 | Giữ nháp chưa đầy đủ, không chuyển xem xét | 01; N-S/U2 | Một phần | Đủ trong phiên prototype/SIM; không lưu bền hoặc xác thực thật. |
| AC-26 | Chặn tạo PO từ PR chưa duyệt | Không thử tạo PO | Ngoài phạm vi prototype | Không coi cờ sẵn sàng hoặc PR không trong queue là bằng chứng chặn API tạo PO. |
| AC-33 | Liên kết nguồn PR–PO–GR/hóa đơn | Không có bộ chứng từ liên kết | Ngoài phạm vi prototype | Không triển khai PO/GR/hóa đơn hoặc kiểm tra tham chiếu xuyên luồng. |
| AC-34 | Hiện lý do và hướng sửa/gửi lại | 06/07; N-S/U2/P B | Một phần | Đủ trong prototype/SIM; chưa xác nhận người dùng hiểu theo NFR-04. |
| NFR-01 | Truy cập theo vai trò | 09/10 | Một phần | Kiểm tra guard demo, không bảo mật/thực thi quyền thực tế; OD-07 mở. |
| NFR-02 | Lịch sử kiểm toán hành động trọng yếu | 10/17 | Một phần | Không bất biến, lưu bền, mọi thay đổi hoặc toàn P2P. |
| NFR-03 | Toàn vẹn PR–PO, PO–GR/hóa đơn | Không có luồng liên chứng từ | Ngoài phạm vi prototype | Không kiểm chứng toàn vẹn liên chứng từ. |
| NFR-04 | Lỗi/trạng thái/quyết định dễ hiểu | 02/06/11/12/19 | Một phần | Có nhãn/focus/lỗi quan sát được; chưa nghiên cứu khả dụng, accessibility hoặc người dùng hiểu. |
| G1-D03/D05 | Phân biệt duyệt/từ chối/trả lại/nháp | 01/05–09 | Một phần | Đủ nhánh PR trong prototype/SIM, không các nhánh PO/Payment Request thuộc quyết định. |
| G1-D04 | Hàng hóa hữu hình | 01/04/17 và seed | Một phần | Bộ demo chỉ hàng hóa; không chứng minh toàn bộ kiểm soát phạm vi của hệ thống thật. |
| SIM-01 | Ba kết quả, validation trước ngân sách, lựa chọn độc lập quá khứ | 02–04/07/13/18 | Đầy đủ — trong phạm vi prototype/SIM | Không suy ra ngân sách thật. |
| SIM-02 | Năm nhãn, lỗi khác quyết định, không mở lại | 01–09/14/16 | Đầy đủ — trong phạm vi prototype/SIM | Không state model doanh nghiệp cuối cùng. |
| SIM-03 | Hai vai/đơn vị, chủ sở hữu, lịch sử/metric giới hạn | 09/10/15/17 | Đầy đủ — trong phạm vi prototype/SIM | Các fixture trái phạm vi kiểm tra ở logic; không quyền thật. |
| SIM-04 | Đồng hồ, reset, timestamp/thứ tự và metric | 01–16/18 | Đầy đủ — trong phạm vi prototype/SIM | Không SLA, thời gian xử lý thật hoặc lợi ích vận hành. |
| PR-MET-01 | Vòng hiện tại còn mở, quần thể đơn vị, unknown | 10/15/16; N-M/U3/UF | Đầy đủ — trong mô hình sự kiện prototype đã xác định | Không chứng minh đầy đủ của log vận hành thật. |
| PR-MET-02 | Tuổi chờ vòng hiện tại, raw/half-up/nhãn | 15/16; N-M/U3/UF | Đầy đủ — trong mô hình sự kiện prototype đã xác định | Ca biên ở logic; không tuyên bố mọi ca đã thử UI hoặc giờ làm việc/SLA. |
| PR-MET-03 | Lần đầu `[S,E)`, từng trả một lần, N/D, ngữ cảnh và quality | 10/15/16; N-M/U3/UF | Đầy đủ — trong mô hình sự kiện prototype đã xác định | Không dữ liệu vận hành thật hoặc mọi chính sách ngoài mô hình. |
| PR-BHV-01–04 | Danh sách/tạo/nhập/lưu/mở nháp | 01/02/07/11/12 | Đầy đủ — trong phạm vi prototype/SIM | Một mặt hàng, bộ nhớ phiên; không toàn chức năng P2P. |
| PR-BHV-05–09 | Validation/ngân sách/gửi/gửi lại | 02–04/07/18 | Đầy đủ — trong phạm vi prototype/SIM | Không nguồn ngân sách thật. |
| PR-BHV-10–14 | Chi tiết/lý do/ba quyết định | 05–09/10/17 | Đầy đủ — trong phạm vi prototype/SIM | Không xác thực/thẩm quyền thật hoặc bước Mua hàng. |
| PR-BHV-15–18 | Lịch sử/chi tiết theo vai/queue/metric | 10/13/15–17/19 | Đầy đủ — trong phạm vi prototype/SIM | Chỉ lịch sử quy trình SIM-03; không UC-11/12 đầy đủ. |

Các số 01–21 trong cột kịch bản là hậu tố của PR-CHK, không phải AC. Không có phép tính tỷ lệ coverage chung hoặc kết luận “37 AC pass”; các dòng baseline một phần không được nâng thành đầy đủ nhờ dòng SIM đạt.

## 4. Vấn đề phát hiện và giới hạn

Không phát hiện lỗi triển khai mới cần sửa trong phạm vi 3C. Không sửa expectation, không thay test/QA/code/ảnh để đạt kết quả. Các điểm dưới đây phân biệt khoảng thiếu bằng chứng đã bù, giới hạn prototype và policy mở; không tạo lỗi giả.

| Mã / loại | Mô tả và bước tái hiện | Mong đợi / thực tế | Ảnh hưởng / trạng thái |
| --- | --- | --- | --- |
| EV-01 — Thiếu bằng chứng | Mở log TAP 3B.2: có 49 tên/kết quả và duration nhưng không absolute start/end. | Cần phiên bản/giờ thực truy được. Đã chạy N-C và bộ 49 tại HEAD 42f6c57, ghi metadata/hash trước/sau. | Khoảng thiếu về truy vết thời điểm Node; **đã bù trong 3C**, không giả timestamp cũ, không lỗi nghiệp vụ. |
| LIMIT-01 — Giới hạn prototype | Đổi vai qua điều khiển demo; không có đăng nhập hoặc server nghiệp vụ. | Handler guard hoạt động trong SIM; không thể coi là thực thi quyền thật, dù case 09/10 đạt. | Ngoài phần bảo mật thực tế; **còn giới hạn theo thiết kế**, NFR-01/AC-20 chỉ một phần. |
| LIMIT-02 — Giới hạn prototype | Xem lịch sử rồi tải lại; chỉ năm loại event xem xét, không mọi lần tạo/lưu/chỉnh trường. | Quy trình tối thiểu đúng; không có audit bất biến/lưu bền/toàn P2P hoặc snapshot chứng từ quá khứ. | **Còn giới hạn theo thiết kế**, BR-26/FR-15/NFR-02 chỉ một phần. |
| LIMIT-03 — Giới hạn kiểm chứng | U5/UI mới thử Chrome headless và kích thước nêu trên; beforeunload chỉ thử reload. | Có bằng chứng cho các phép thử đã nêu; chưa thử headful, browser khác, đóng tab/cửa sổ, assistive technology hoặc UAT người dùng. | **Chưa kiểm chứng các mở rộng này**, không nằm trong danh sách cốt lõi đã xác định; không báo đạt accessibility/tính dễ hiểu toàn bộ. |
| LIMIT-04 — Giới hạn phạm vi | Cố tái lập AC-26/33 hoặc UC-12: không có luồng PO/GR/hóa đơn/báo cáo cho vai trò baseline. | PR chỉ sẵn sàng Mua hàng và có metric demo; không có các chức năng liên chứng từ. | **Ngoài phạm vi prototype**, không tính là yêu cầu đạt. |
| OD-03/06/07 — Policy còn mở | Xem SIM và nguồn quyết định: công thức ngân sách, state model cuối cùng và quyền chi tiết chưa chốt. | Demo có lựa chọn được chấp thuận riêng; không được suy ra policy doanh nghiệp hoặc đóng OD. | **Giữ mở**, không đổi baseline/SIM/SRS/RTM. |

Các log Temp có thể mất sau khi hệ điều hành dọn; đó là giới hạn lưu chứng cứ cục bộ, không thay đổi kết quả đã ghi trong tài liệu. Có thể tái lập bằng test/QA đã dẫn nguồn; không lấy việc script tồn tại để mặc định lần tái lập tương lai đạt.

Đối chiếu cuối lượt với snapshot: seed, README dữ liệu, các file logic/test/QA/ảnh, baseline, SRS/RTM, thiết kế metric/SIM và README wireframe được bảo toàn; phần bổ sung chỉ `verification.md` và liên kết trong README prototype. Seed giữ SHA-256 `6d23e6d1a0e2fd31b9fdc40e573b9ee497927e997906d26df052e5e2c8f9feca`. Không stage, commit, push, merge, đổi branch hoặc hosting. Không khởi tạo server/browser demo mới cần dừng; các server test N-H được đóng trong test.

**3C hoàn tất** vì 18 kịch bản cốt lõi đều có kết quả và bằng chứng truy được nguồn, không còn cốt lõi Không đạt/Chưa kiểm tra/Bị chặn. Kết luận này chỉ xác nhận phạm vi kiểm chứng prototype trong tài liệu, không xác nhận toàn bộ yêu cầu hệ thống đã được kiểm thử, được doanh nghiệp chấp thuận hoặc vận hành an toàn/hiệu quả.

## 5 P2 — Liên thông PR → PO local

**P2 hoàn tất trong phạm vi PR → PO đã chạy trên local dưới đây.** Một ứng dụng, một phiên PR/PO, một clock. Không xác nhận toàn bộ AC đạt, UAT, bảo mật server, audit đầy đủ hoặc lợi ích vận hành. P3/P4 chưa triển khai; không có GR/hóa đơn/đề nghị thanh toán hoạt động. P2 chưa được commit code, push hoặc deploy trong lượt này.

### Nguồn, phiên bản và môi trường P2

- Branch `p2p-prototype-design`, đầu lượt HEAD `7b9ee2afdc1d2a5eb17d2341fbfce4b13947d3c7`; index rỗng, chỉ thiết kế P1 untracked, không tìm thấy AGENTS.md áp dụng. Theo brief P2, chỉ stage thiết kế rồi chạy `git diff --cached --check` và commit **`5d47caceec7d5d852b00b19f843490cd281ce5c9`**, thông điệp `docs: add connected P2P prototype design`. Code P2 được kiểm tra là working tree chưa commit trên HEAD này; commit thiết kế không chứa code P2.
- [Thiết kế P1](../../06-system-analysis/p2p-prototype-design.md): phần PR/PO được brief P2 chấp thuận; BHV-01–07 và phần P2 của CHK-01–05/16–20. [UC-03/04](../../06-system-analysis/use-case-specifications.md), [BR-05–12, BR-25–27](../../04-to-be-design/business-rules.md), [G1-D02/03/05](../../08-traceability/baseline-decisions.md), [SRS](../../07-software-requirements/srs.md) FR-01–07, AC-01–09/19/26–28/33 và NFR liên quan là căn cứ; mapping không xác nhận bao phủ đầy đủ từng AC.
- Kế thừa [hành vi PR](../../06-system-analysis/pr-behavior-analysis.md), [SIM-01–04](../../06-system-analysis/pr-prototype-decisions.md), [metric PR](../../08-traceability/pr-metrics-design.md), [seed](./data/seed.json), code/UI/tests hiện hữu. Seed, module validation/time/metrics và kỳ cohort không đổi. Không suy lựa chọn lab ERP thành policy web.
- Snapshot trước sửa ngoài repo: `C:\Users\ASUS\AppData\Local\Temp\p2p-p2-fa0cce8b-4590-4bf2-b45b-59ffb8c2d019`, có HEAD/status/index, bản sao thiết kế trước chốt và SHA-256 của 129 file tracked đầu lượt; đã đọc lại và đối chiếu hash bản sao trước sửa. Các log/ảnh thử/manifest bên dưới cũng nằm ở đó; Temp có thể bị dọn.
- Windows/PowerShell, Node **v22.14.0** có sẵn tại đường dẫn trong README. Chrome **155.0.8059.85 headless**, CDP, không dependency mới. Server tác vụ `http://127.0.0.1:8087/`, chỉ loopback và allowlist; browser tác vụ CDP `127.0.0.1:9237`, profile Temp riêng. Đây là URL local trong phiên kiểm tra, không cam kết server còn chạy sau bàn giao.

### Test Node và gói local

Lệnh từ root repo:

```powershell
$p2Node = 'C:\Users\ASUS\AppData\Roaming\JetBrains\IntelliJIdea2024.3\node\versions\22.14.0\node.exe'
$p2Tests = @(Get-ChildItem prototype/pr/test/*.test.mjs | ForEach-Object FullName)
& $p2Node --test --test-reporter=spec @p2Tests
```

Lượt cuối thực chạy: **63 test, 63 đạt, 0 lỗi, 0 bỏ qua**; log `node-final.txt` ngoài repo. Bao gồm 50 test cũ và 13 test mới trong [p2p.test.mjs](./test/p2p.test.mjs). Giữ nguyên assertion và bytes của [session.test.mjs](./test/session.test.mjs), [metrics.test.mjs](./test/metrics.test.mjs), [fixtures.mjs](./test/fixtures.mjs); [server.test.mjs](./test/server.test.mjs) và [package.test.mjs](./test/package.test.mjs) mở rộng danh sách tài nguyên P2. Các lượt đầu 45 test PR/metric và 62 test sau thêm PO là kiểm tra trung gian, không thay kết quả cuối 63 test.

Test mới kiểm tra PR duyệt thật → PO dùng đúng APPROVE, ineligible/missing/ambiguous source và bằng chứng thiếu; một PO mỗi PR; snapshot detached/trường nguồn RO; NCC không đủ điều kiện/giá không hợp lệ/giá 0 và phần lẻ; nháp chưa đủ; hai tuyến; Procurement bắt buộc; PM/Finance trả thiếu/đủ lý do; vòng mới không dùng duyệt cũ; phát hành 0/+1/0; sai vai/ngữ cảnh; token replay, actor cũ/thế hệ reset cũ dù ID cấp lại; clock/coverage và PR-only chuẩn sau reset; mở lại form PR qua facade runtime.

`node prototype/pr/build-static.mjs` đã chạy local: **17 file** trong `prototype/pr/dist/`, từng byte khớp source; `artifact-manifest.json` ngoài repo giữ SHA-256 từng file. Package test kiểm tra đúng paths/bytes, build lặp loại file thừa và fail trước thay output khi thiếu seed. Server test giữ traversal/.git/test/README ngoài allowlist bị chặn và chỉ GET/HEAD. Không thử toàn bộ artifact qua Pages trong P2; workflow vẫn nguyên bản với kiểm tra gói PR cũ, cần cập nhật/kiểm chứng P5 trước công bố.

### Trình duyệt thực chạy và kịch bản P2

Lệnh thực chạy cuối:

```powershell
& $p2Node prototype/pr/qa/browser-qa.mjs --scope=p2 --cdp=http://127.0.0.1:9237 --url=http://127.0.0.1:8087/ --output=C:/Users/ASUS/AppData/Local/Temp/p2p-p2-fa0cce8b-4590-4bf2-b45b-59ffb8c2d019/browser-final --evidence-dir=C:/Users/ASUS/AppData/Local/Temp/p2p-p2-fa0cce8b-4590-4bf2-b45b-59ffb8c2d019/evidence-final
```

Lượt cuối **22/10/2026 10:07:52.940–10:08:27.253 UTC+07:00**, log `browser-final/browser-results.json`: **15 mục kiểm tra đạt**, gồm 10 bản ghi bố cục (5 ngữ cảnh × 1280/1440 px) và 5 nhóm kiểm tra chức năng/tài nguyên. Con số này là mô tả lượt thực chạy, không chỉ tiêu coverage hoặc bằng chứng mỗi nhóm phủ toàn bộ AC. Các bước dùng CDP click chuột vào nút, input/select qua DOM events; bấm lặp được kích hoạt có chủ đích bằng hai `click()` liên tiếp. Không dùng truy cập session nội bộ thay cho kết quả UI.

**Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.** Mọi mốc trong bảng là **10/10/2026, UTC+07:00** mô phỏng, khác ngày kiểm tra thực 22/10/2026.

| Kịch bản / vai trò | Mong đợi | Thực tế quan sát và kết luận |
| --- | --- | --- |
| PR mới → PO, REQ-01/MGR-01/BUY-01 | PR gửi/duyệt thật dùng ngay để lập PO, không reload/dataset khác; PR ID/APPROVE đúng | REQ-01 gửi PR-NEW-1 13:00, MGR-01 duyệt 14:00, BUY-01 thấy ngay và lập PO-DEMO-1 15:00, snapshot lượng 1.5/giá PR 0; APPROVE `DEMO-EVENT-2`. **Đạt UI + Node** |
| Validation PO và focus, BUY-01 | Thiếu trường/giá âm chặn, giữ phần nhập, focus tổng hợp/trường; NCC không đủ điều kiện không chọn; giá 0 được phép | Gửi thiếu 16:00 focus `po-errors`, liên kết focus `po-supplier_id`; giá -1 chặn 17:00 và giữ giá -1. NCC inactive option disabled; sửa giá 0 rồi gửi hợp lệ 18:00. **Đạt UI**; NaN/vô cực/định dạng/nhà cung cấp giả và các biến thể khác ở **Node** |
| Bấm lặp, tuyến không Finance và phát hành, PM-01/BUY-01 | Một lần gửi; trước đủ duyệt không phát hành/tick; đủ điều kiện khác đã phát hành; phát hành đúng một lần | Gửi lặp chỉ vào vòng 1 lúc 18:00; nút phát hành khóa/click không đổi giờ. PM-01 duyệt 19:00 mới đủ điều kiện. BUY-01 phát hành lặp chỉ một sự kiện 20:00, tổng lịch sử 4 mục Create/Submit/Approve/Issue. **Đạt UI + Node** |
| Mở ngược PR và quay lại, BUY-01 | Đúng PR/lịch sử, không tự đổi vai hoặc T | Tại 20:00 mở PR-NEW-1, đúng nội dung và 2 sự kiện PR thực; vẫn BUY-01; quay đúng PO-DEMO-1, T không đổi. **Đạt UI** |
| Tuyến Finance chốt theo vòng, BUY-01/PM-01/FIN-01 | Finance không duyệt trước Procurement; đổi điều khiển không đổi vòng đã gửi; còn thiếu Finance thì chặn phát hành | Reset riêng: PR-D tạo PO 13:00, gửi tuyến Có 14:00; đổi control Không nhưng tuyến vẫn Có. FIN-01 chưa có nút duyệt trước PM; PM duyệt 15:00, BUY còn khóa phát hành/click không đổi giờ. **Đạt UI + Node** |
| Finance trả lại/gửi lại, FIN-01/BUY-01/PM-01 | Trả thiếu lý do không tick; trả đủ rồi sửa/gửi lại phải duyệt lại từ Procurement, giữ lịch sử | FIN trả thiếu lý do vẫn 15:00/focus reason; đủ lý do trả 16:00. BUY sửa thương mại/gửi lại tuyến Có 17:00, vòng 2 chờ PM, chưa phát hành; PM duyệt 18:00, FIN duyệt 19:00, BUY phát hành 20:00. **Đạt UI**; nhánh PM trả lại cũng **đạt Node** |
| Form bẩn/chuyển vai, BUY-01 | Cảnh báo, hủy giữ nhập/actor/giờ | Đang nhập giá mua 0 sau lỗi lúc 17:00, thử đổi PM mở xác nhận; hủy giữ BUY-01, phần nhập và T=17:00. **Đạt UI** |
| Clock chung với PR-D, BUY-01 → MGR-01 | T tăng nhưng không thêm sự kiện PR/cohort mới | Reset; BUY lập PO từ PR-D 13:00, chuyển MGR thấy 2 chờ, A196/C97 giờ, 25%. **Đạt UI + Node**; coverage thiếu vẫn không xác định kiểm tra riêng ở **Node** |
| Chuỗi PR chuẩn, REQ-01/MGR-01 | Sau reset không xen PO phải giữ 12/13/14/15, công thức/cohort không đổi | 12:00 A195/C96, 2 chờ/25%; B nguồn không khả dụng 13:00 giữ chờ sửa/A196/C97; B đạt 14:00 A197/B0/C98/3 chờ; trả A 15:00 B1/C99/2 chờ/50%. **Đạt UI + Node** |
| Reset/reload, token cũ | Về seed PR/PO rỗng/T0/REQ/PASS/tuyến Không; form thế hệ cũ không tác động dữ liệu ID tái dùng | Reset và reload UI đúng mặc định/PO rỗng. Actor cũ, command replay và PR/PO form token trước reset khi ID cấp lại bị chặn không mutation/tick ở **Node**; không dùng Node để tuyên bố UI đã thử replay form DOM cũ |

Đã kiểm tra 1280/1440 px, `deviceScaleFactor=1`, không cuộn ngang toàn trang tại PR list, PO list/form/chi tiết phát hành và PR nguồn. Đã xem ảnh thực tế: chữ tiếng Việt và nội dung/nút không chồng/cắt trong các ngữ cảnh này. PO dùng panel/bảng/lỗi/dialog/CSS nền hiện có; bốn view PR được giữ. CDP `CSS.getPlatformFontsForNode` xác nhận glyph custom Be Vietnam Pro Bold trên h1, SemiBold trên nút, Regular trên nhãn dữ liệu tổng hợp. **33 response tài nguyên**, tất cả local HTTP 200, không lỗi console trang trong lượt cuối. Không suy cảnh báo stderr của tiến trình Chrome thành lỗi console ứng dụng.

Ba ảnh cuối được sao chép byte từ `evidence-final/` sau khi xem kiểm tra; không ghi đè ảnh PR lịch sử:

| Ảnh | Giờ chụp thực 22/10/2026 UTC+07:00 | Vai trò / giờ mô phỏng |
| --- | --- | --- |
| [p2-01-linked-po-form.png](./evidence/p2-01-linked-po-form.png) | 10:07:56.804 | BUY-01 / 15:00; PO từ PR mới duyệt thật |
| [p2-02-issued-live-pr.png](./evidence/p2-02-issued-live-pr.png) | 10:08:02.839 | BUY-01 / 20:00; phát hành mô phỏng một lần |
| [p2-03-finance-blocked.png](./evidence/p2-03-finance-blocked.png) | 10:08:09.800 | BUY-01 / 15:00; chưa đủ Finance, phát hành khóa |

### Vấn đề đã sửa, bảo toàn nguồn và giới hạn P2

Lượt `browser-attempt1` dừng ở hồi quy mở PR-B vì facade phiên chung thiếu `openForm`, dù luồng PO trước đó đã chạy; đã bổ sung API đọc/mở lại form và test runtime tương ứng. Lượt `browser-attempt2` thực hiện được các nhóm nghiệp vụ nhưng kiểm tra console nhận lại exception cũ của trang dùng chung từ lượt trước. Harness được sửa mở một trang mới do lượt kiểm tra sở hữu; lượt `browser-final` chạy lại toàn bộ và không lỗi console. Hai lượt cũ giữ log/ảnh riêng trong Temp, không làm bằng chứng đạt hoặc dùng ảnh của lượt thiếu bước. Form submit handler cũng giữ generation lúc render để form trước reset không dùng generation mới.

SHA-256 bytes seed trong working tree ở đầu và cuối P2 cùng là `252d27b40eaa68f146ca34dc90b826a92b9c8e65ebd173eba5d5901ad4a1543f`; khớp snapshot đầu lượt. Không thay giá trị hash ghi cho phiên bản lịch sử 3C ở mục trước bằng hash working tree P2. Tests so cả object đầu vào và bytes file; kiểm tra hash cuối riêng xác nhận mọi nguồn ngoài `prototype/pr/` của 129 file tracked đầu lượt, ảnh/font/wireframe và baseline/metric/SIM/ERP không đổi. P1 chỉ cập nhật chấp thuận và commit đầu lượt, không ghi kết quả P2 ngược vào kế hoạch G; file thiết kế không đổi sau commit. `dist/` tự sinh/ignored, không stage/commit. Kết quả `git diff --check`, kiểm tra file mới và Git status cuối phản hồi trong chat; không lấy số liệu kiểm tra cũ làm kết quả mới.

Giới hạn còn lại: quyền theo vai chỉ mô phỏng trong browser, một đơn vị, một dòng/một PO mỗi PR; snapshot PO chỉ từ lúc lập, không tái dựng PR lịch sử. Browser UI chỉ thử dữ liệu seed/PR mới của REQ-01; ngoài đơn vị và thiếu log bằng fixtures ở logic, chưa xác nhận UI lọc toàn bộ ma trận quyền. Chưa thử mọi trình duyệt, headful, mobile P2, công cụ trợ năng/UAT, beforeunload/đóng tab của P2 hoặc mọi tổ hợp trả lại trên UI. Không có backend/lưu bền/NCC thật/email; chưa P3/P4, chưa đối chiếu hay thanh toán, chưa kiểm chứng/công bố artifact đầy đủ P5. Không có lỗi kiểm soát trọng yếu còn biết trong phạm vi P2 đã chạy; không suy thành toàn bộ SRS/AC đạt.

## 6. P3 — Liên thông GR và hóa đơn local

**P3 hoàn tất trong phạm vi local đã kiểm tra dưới đây.** Hai thứ tự GR/hóa đơn nối cùng PO/PR vừa thao tác, chung actor/clock/reset. Chỉ có dữ liệu và revision cho P4; chưa đối chiếu, ngoại lệ, chuẩn bị/gửi/duyệt đề nghị. Không đánh dấu kịch bản xuyên suốt đến Payment Request là đạt; không tuyên bố toàn AC hoặc UAT hoàn tất.

### Nguồn, thiết kế và thay đổi so với HEAD

- Branch `p2p-prototype-design`, HEAD **`aec315c66ea57b678d369e8f0829a644629d4759`** (`feat: connect PR and PO workflow`); đầu lượt working tree sạch/index rỗng, không tìm thấy AGENTS.md áp dụng. P3 là working tree chưa commit trên HEAD này.
- Snapshot trước sửa, đã đọc lại HEAD/hash/bản sao P1: `C:\Users\ASUS\AppData\Local\Temp\p2p-p3-5f5c3034-372c-4b41-ab23-7e89214fffa7`, có `head.txt`, `status.txt`, `index.txt`, `design.before.md`, SHA-256 của **139 file tracked**. Temp có thể bị dọn; không là phụ thuộc runtime. Log, ảnh thử và manifest cũng giữ ngoài repo tại đây.
- Đọc [P1](../../06-system-analysis/p2p-prototype-design.md), [BR-13–17/25–27](../../04-to-be-design/business-rules.md), [G1-D01/02/05](../../08-traceability/baseline-decisions.md), [UC-05/06](../../06-system-analysis/use-case-specifications.md), [SRS](../../07-software-requirements/srs.md) FR-08/09/10/14/15, AC-10/11/29/31/32/33 và NFR liên quan; kế thừa logic/data/UI/test/server/build P2. Mapping này không khẳng định bao phủ đầy đủ AC/NFR.
- P3A cụ thể hóa tại P1 C.1/C.2, D, DEC-01/03/04/06/07/09/10, E.2 và kịch bản G/H: hai trường GR, bảy trường hóa đơn nghiệp vụ cùng ghi chú tùy chọn, ngày bắt buộc, danh mục NCC P2, quyền Kho/AP, revision theo PO và hóa đơn. Tất cả CHK trong thiết kế vẫn **Chưa thực hiện** ở lớp kế hoạch. Giới hạn một dòng/một GR/một hóa đơn/nhận đủ là demo đã chấp thuận, không sửa policy/OD/baseline.
- **15 file tracked khác HEAD:** P1; `prototype/pr/README.md`, `app.mjs`, `build-static.mjs`, `data/po-catalog.json`, `index.html`, `logic/p2p-session.mjs`, `logic/po-session.mjs`, `logic/pr-session.mjs`, `qa/browser-qa.mjs`, `serve.mjs`, `styles.css`, `test/package.test.mjs`, `test/server.test.mjs`, `verification.md`. **6 file mới:** `logic/receiving-invoice.mjs`, `test/receiving-invoice.test.mjs`, `qa/p3-scenarios.mjs` và ba ảnh P3 dưới đây, đều trong `prototype/pr/`.
- Tái dùng một PR domain, PO domain, context/clock/counter/reset/generation và command guard; không app/session/seed PR mới. Module GR/hóa đơn giữ chứng từ/revision riêng, PO có kiểm tra phê duyệt vòng hiện hành và đọc theo vai, API kiểm tra liên kết PR nội bộ không cấp quyền đọc PR cho Kho. UI dùng lại DOM helper/bảng/panel/field/dialog/CSS/font và router; không đổi màn hình PR/PO ngoài bổ sung liên kết cần thiết.

### Test Node, build và bảo toàn

Windows/PowerShell, Node **v22.14.0** có sẵn; không thêm dependency. Lệnh cuối thực chạy từ root:

```powershell
$p3Node = 'C:\Users\ASUS\AppData\Roaming\JetBrains\IntelliJIdea2024.3\node\versions\22.14.0\node.exe'
$p3Tests = @(Get-ChildItem -LiteralPath prototype/pr/test -Filter '*.test.mjs' | ForEach-Object FullName)
& $p3Node --test --test-reporter=spec @p3Tests
& $p3Node prototype/pr/build-static.mjs
```

**77 test thực chạy, 77 đạt, 0 lỗi, 0 bỏ qua**; log `node-final.txt`. Gồm **63 test PR/PO cũ + 14 test P3**. Giữ bytes/assertion của `session.test.mjs`, `metrics.test.mjs`, `fixtures.mjs`, `p2p.test.mjs`; package/server test chỉ thêm tài nguyên `receiving-invoice.mjs`. Test mới kiểm tra cả thứ tự bằng PR mới thật, PO chưa đủ duyệt/Finance/vòng trả lại, ghi theo PO chưa phát hành, hóa đơn theo PO nháp còn thiếu, ngày/số/trường/NCC, lượng GR khác PO, tiền độc lập/giá và tiền 0, lượng lẻ, revision từng trường/no-op/ghi chú/hoàn nguyên, lịch sử/ID/nguồn bất biến, tham chiếu chéo giao dịch, sai vai/ngoài đơn vị, duplicate/replay/reset/thế hệ/actor cũ, input seed bất biến và metric chung.

Build **18 file** trong `prototype/pr/dist/` ignored, danh sách tường minh đúng source và **18/18 khớp byte**; `artifact-manifest.json` ngoài repo giữ SHA-256. Test package giữ kiểm tra tái lập/loại file thừa/fail trước thay output khi thiếu nguồn; server vẫn loopback, read-only, allowlist hẹp và chặn repository/test/tài liệu/traversal. Chưa kiểm chứng artifact đầy đủ dưới Pages prefix trong P3; đường dẫn runtime vẫn tương đối. Workflow không đổi, còn kiểm tra gói PR cũ; P5 cần cập nhật trước công bố.

Đối chiếu 139 hash đầu lượt: **124 không đổi, 15 thay đổi đúng phạm vi**, sáu file mới đúng danh sách trên. Seed PR giữ SHA-256 raw bytes `252d27b40eaa68f146ca34dc90b826a92b9c8e65ebd173eba5d5901ad4a1543f`. `logic/metrics.mjs`, `validation.mjs`, `time.mjs`, `session-context.mjs`, seed/checks, ảnh PR/PO cũ/font/wireframe, baseline/OD/SRS/RTM/SIM/ERP/workflow và mọi nguồn ngoài phạm vi giữ nguyên. Không reset/stash/clean/đổi branch/amend. Không stage/commit/push/merge/deploy.

### Trình duyệt thực chạy, mong đợi và thực tế

Chrome **155.0.8059.85 headless**, Windows, CDP qua Node WebSocket hiện có; profile riêng do tác vụ tạo. Server allowlist `http://127.0.0.1:8088/`, CDP `127.0.0.1:9238`; mỗi lượt QA tạo trang mới. Lượt P3 đạt cuối: **22/10/2026 10:44:16.524–10:45:01.635 UTC+07:00**. Lệnh:

```powershell
& $p3Node prototype/pr/serve.mjs --port=8088
# Terminal khác:
& $p3Node prototype/pr/qa/launch-browser.mjs --cdp-port=9238
# Terminal kiểm tra:
& $p3Node prototype/pr/qa/browser-qa.mjs --scope=p3 --cdp=http://127.0.0.1:9238 --url=http://127.0.0.1:8088/ --output=C:/Users/ASUS/AppData/Local/Temp/p2p-p3-5f5c3034-372c-4b41-ab23-7e89214fffa7/browser-final --evidence-dir=C:/Users/ASUS/AppData/Local/Temp/p2p-p3-5f5c3034-372c-4b41-ab23-7e89214fffa7/evidence-final
```

`browser-final/browser-results.json`: **21 mục đạt**, gồm 14 bố cục (7 ngữ cảnh × 1280/1440) và 7 nhóm chức năng/tài nguyên. Các nhóm không là số AC hoặc tuyên bố coverage đầy đủ. CDP dùng click chuột/input/select và kiểm tra kết quả UI thực; không truy cập session nội bộ. **Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.** Mọi giờ trong bảng là **10/10/2026 UTC+07:00 mô phỏng**, khác thời điểm chạy thực.

| Kịch bản / vai trò | Mong đợi | Thực tế / kết luận |
| --- | --- | --- |
| GR trước hóa đơn từ PR mới; REQ-01/MGR-01/BUY-01/PM-01/WH-01/AP-01 | Liên thông nguồn thật; đủ duyệt không cần phát hành; mỗi chứng từ một ID | PR-NEW-1 gửi 13h/duyệt 14h; PO-DEMO-1 lập 15h/gửi 16h/PM duyệt 17h, chưa phát hành. Kho ghi GR-DEMO-1 lượng 1.5 lúc 18h, AP ghi INV-DEMO-1 lúc 19h, đúng PR/PO, input revision 2. **Đạt UI + Node** |
| Hóa đơn trước GR; AP-01/WH-01 | Giữ hóa đơn chờ, GR sau không tạo Đạt hoặc đổi hóa đơn | Reset riêng; PO từ PR-D đủ duyệt 15h; AP ghi 16h, Chờ phiếu nhận hàng, input/invoice revision 1/1. Kho ghi GR 17h; AP xem đủ dữ liệu tối thiểu/chưa đối chiếu, input/invoice revision 2/1 và nội dung hóa đơn giữ nguyên. **Đạt UI + Node** |
| Dữ liệu độc lập; AP-01 | Không ép NCC/lượng/giá/tiền bằng PO, không tự nhân thành tiền/Đạt | PO NCC A/lượng 40/giá 12.5; hóa đơn NCC C/lượng 2.5/giá 0/tiền 123.45 vẫn giữ đúng và chỉ báo đủ dữ liệu/chưa đối chiếu. **Đạt UI + Node** |
| Validation và giữ nhập; WH-01/AP-01 | Trường bắt buộc/ngày/số, nhận khác lượng bị chặn; lỗi focus đúng | Từ reset riêng: GR gửi trống 16h focus tổng hợp/link focus ngày; ngày 31/02/2026 và lượng 39 chặn 17h, giữ cả hai, báo ngoài demo. Sửa nhận đủ ghi 18h. Hóa đơn trống 19h, tiền -1 chặn 20h giữ -1; lượng 0 chặn 21h, sửa 40/tiền 0 ghi 22h. **Đạt UI**; các NaN/vô cực/định dạng/ngày khác ở **Node** |
| Sửa/ghi chú/no-op/hoàn nguyên; AP-01 | Giữ ID/PO, history before/after; revision chỉ tăng khi dữ liệu nghiệp vụ đổi | Ghi chú 18h giữ input/invoice 2/1; tiền 123.45→50 lúc 19h lên 3/2; lưu không đổi 20h giữ 3/2, history ghi không đổi; hoàn nguyên 21h lên 4/3, vẫn INV-DEMO-1/PO-DEMO-1. **Đạt UI + Node** |
| Liên kết nguồn; AP-01 | Mở PO/PR/quay lại đúng hồ sơ, không đổi vai/T | Hóa đơn→PO→PR-D→PO→INV-DEMO-1 đúng ngữ cảnh, vẫn AP-01/21h. Kho không có đường mở PR/hóa đơn. **Đạt UI**; tham chiếu chéo/sai vai/ngoài đơn vị ở **Node** |
| Cảnh báo phần nhập và lặp; AP-01/WH-01 | Hủy rời form giữ nhập/vai; lặp không tạo chứng từ/thêm giờ | Đổi vai AP→Kho khi form bẩn và mở nguồn bị cảnh báo; hủy giữ AP/-1/20h. Bấm ghi lặp GR/hóa đơn vẫn một mục lịch sử, T18h/T22h. **Đạt UI**; replay cùng command và tạo lại bằng command mới ở **Node** |
| Reset đủ chuỗi và reload; WH-01/AP-01/REQ-01 | Xóa đồng bộ PR mới/PO/GR/hóa đơn/revision, mặc định T0 | Reset sau chuỗi PR-NEW-1→PO→GR→hóa đơn về 12h; PR mới không còn, AP/Kho không còn PO; reload về REQ/T0. **Đạt UI**; form/token trước reset với ID cấp lại bị chặn ở **Node**, chưa replay DOM cũ trên UI |
| Đồng hồ/metric và chuỗi PR chuẩn; MGR-01/REQ-01 | Downstream cùng T, công thức/cohort giữ; reset tái lập PR riêng | P3 đến 22h: A205/C106 giờ, 2 chờ/25%. Reset rồi B nguồn lỗi 13h, B đạt 14h, trả A 15h: A/C 195/96→196/97→A197/B0/C98→B1/C99; cuối 2 chờ/50%. **Đạt UI + Node** |

Bố cục kiểm tra ở GR form/detail, invoice form/waiting/ready, PO nguồn và queue hồi quy PR; 1280/1440 px, deviceScaleFactor=1, không cuộn ngang toàn trang. Kiểm tra kích thước/nội dung nút không bị cắt và xem ảnh thực tế, tiếng Việt/nhãn/nút rõ trong các ngữ cảnh đã kiểm tra. Font glyph thực dùng Be Vietnam Pro Bold/SemiBold/Regular qua `CSS.getPlatformFontsForNode`. **35 response**, toàn local HTTP200; **0 lỗi console** trong lượt P3 cuối.

Hồi quy UI P2 riêng trên cùng source P3, trang mới: **10:45:19.353–10:45:53.401 UTC+07:00 ngày 22/10/2026**, lệnh cùng harness với `--scope=p2`, `--output=.../browser-p2-regression`, `--evidence-dir=.../evidence-p2-regression`: **15 mục đạt, 0 lỗi console**. Giữ nguyên `p2-scenarios.mjs`; không dùng ảnh hồi quy này ghi đè evidence P2 lịch sử.

### Ảnh cuối, lượt thử và giới hạn

Đúng ba PNG mới từ lượt P3 đạt cuối, `Page.captureScreenshot`, rộng 1440 px, sao chép byte và đã xem; ảnh/log thử nằm ngoài repo:

| Ảnh | Giờ chụp thực 22/10/2026 UTC+07:00 | Vai trò / giờ mô phỏng / tình huống |
| --- | --- | --- |
| [p3-01-recorded-gr.png](./evidence/p3-01-recorded-gr.png) | 10:44:24.641 | WH-01 / 18h; GR từ PR mới/PO đủ duyệt chưa phát hành |
| [p3-02-invoice-waiting-gr.png](./evidence/p3-02-invoice-waiting-gr.png) | 10:44:33.553 | AP-01 / 16h; hóa đơn giữ nguyên, chờ GR |
| [p3-03-invoice-ready-unmatched.png](./evidence/p3-03-invoice-ready-unmatched.png) | 10:44:36.610 | AP-01 / 17h; đủ dữ liệu tối thiểu, chưa đối chiếu |

Hai lượt thử giữ riêng: `browser-attempt1` dừng do helper tự đặt chiều cao tối thiểu 24px cho cả nút quay lại dạng chữ hiện hữu; đây không là yêu cầu được duyệt. Đổi kiểm tra sang kích thước dương/nội dung không bị cắt cùng kiểm tra ảnh. `browser-attempt2` đã chạy các nhánh chính nhưng helper chuyển vai ngay sau ghi lặp trong khoảng khóa 400ms hiện có, khiến vai chưa đổi. Helper chờ hết khoảng khóa rồi tiếp tục; không đổi logic sản phẩm hoặc assertion PR/PO để che lỗi. Lượt cuối chạy lại toàn bộ đạt như trên, chỉ lấy ảnh cuối làm bằng chứng.

Giới hạn: một đơn vị/một dòng/một GR/một hóa đơn, không nhận phần/credit note/thuế/tích hợp/lưu bền. Quyền theo vai chỉ mô phỏng, không bảo mật server; ngoài đơn vị/tham chiếu sai/form token cũ kiểm tra ở logic, không bao phủ toàn ma trận UI. Chưa thử mobile/headful/trình duyệt khác/công cụ trợ năng/UAT, beforeunload/đóng tab P3 hoặc artifact đầy đủ Pages prefix. P4 chưa triển khai; không có kết quả Đạt/Không đạt/ngoại lệ/đề nghị, không có policy mới hoặc lợi ích vận hành được xác nhận. Không có lỗi chức năng/kiểm soát trọng yếu còn biết trong phạm vi P3 đã kiểm tra. Các tiến trình local do tác vụ tạo được dừng khi kết thúc; không dừng tiến trình khác.


## 7. P4 — Đối chiếu mô phỏng và đề nghị thanh toán local

P4 hoàn tất trong phạm vi local ghi dưới đây; không kết luận triển khai thuật toán đối chiếu, toàn AC đạt hoặc UAT. Điểm cuối là đề nghị được duyệt, không phải thanh toán. P5 chưa bắt đầu; không stage/commit/push/merge/deploy.

### Nguồn và thiết kế

Branch `p2p-prototype-design`, HEAD `0f5ab9da85d9fc28113095eff1e5ddc70e31e392`; đầu lượt working tree sạch, index rỗng, không AGENTS.md áp dụng. Snapshot đọc lại được tại `C:\Users\ASUS\AppData\Local\Temp\p2p-p4-49d1f398-c36c-406a-b049-4ebcead52cbf`, gồm HEAD/status/index, bản sao P1 và 145 hash nguồn. Lượt tiếp tục ngày 23/10/2026 bảo toàn công việc cũ, không triển khai lại.

Đã đọc P1, G1-D01/05/06, BR-16–24/27, UC-06–09 và FR-10–15/AC-12–18/29/30/35–37 liên quan. [P1](../../06-system-analysis/p2p-prototype-design.md) C/E cụ thể hóa trước code: trường nội dung/giải trình, dữ liệu hỗ trợ RO, bảy trường hóa đơn P3 và revision, điều kiện áp dụng kết quả, hiệu lực/dấu vừa xem, ngoại lệ, quyền/khóa theo giao dịch và clock. Các CHK thiết kế giữ Chưa thực hiện; kết quả thực thi chỉ ghi tại đây, chưa xác nhận artifact đầy đủ P5.

Thêm [matching-payment.mjs](./logic/matching-payment.mjs), [matching-scenarios.json](./data/matching-scenarios.json), [test P4](./test/matching-payment.test.mjs), [QA P4](./qa/p4-scenarios.mjs) và bốn PNG. Tái dùng app/UI/font/parser/context/clock/reset/ID/command guard và chứng từ thực tế P2/P3; không dataset/session mới. Sửa P1, README/verification, app, index, facade phiên, receiving-invoice để khóa/đọc đầu vào, server/build/package/server test, browser harness và một assertion P3. Assertion P3 được giữ ở ý nghĩa nghiệp vụ: thêm GR không tự sinh kết quả (`result-history` rỗng); không còn cấm nút P4 vì P4 đã được giao. Không đổi assertion Node PR/PO/GR/hóa đơn cũ.

Bộ `P4-SYNTHETIC` v1/v2 là dữ liệu tổng hợp tra đúng tuple, không matching tổng quát hoặc dung sai 0. Hai ví dụ: USB mô tả Máy quét USB tổng hợp/lượng 1.5, và giấy PR-D/lượng 40; PO NCC A/giá12.5. FAIL: giá15/tiền22.5 hoặc600, sau sửa giá12.5 vẫn tiền cũ thì FAIL; PASS: giá12.5/tiền18.75 hoặc500. NCC/mô tả/lượng hóa đơn theo ví dụ. Đầu vào ngoài tuple bị chặn, không ép PASS; thiếu dữ liệu thực ưu tiên WAIT, không tạo ngoại lệ mới. Chi tiết nhập trong [README P4](./README.md#p4--đối-chiếu-định-trước-và-đề-nghị-thanh-toán).

### Lệnh và kết quả

Node v22.14.0 có sẵn, không dependency mới. Lệnh thực chạy từ root:

```powershell
$p4Node = 'C:\Users\ASUS\AppData\Roaming\JetBrains\IntelliJIdea2024.3\node\versions\22.14.0\node.exe'
$p4Tests = @(Get-ChildItem -LiteralPath prototype/pr/test -Filter '*.test.mjs' | ForEach-Object FullName)
& $p4Node --test --test-reporter=spec @p4Tests
& $p4Node prototype/pr/build-static.mjs
& $p4Node prototype/pr/qa/browser-qa.mjs --scope=p4 --cdp=http://127.0.0.1:9239 --url=http://127.0.0.1:8089/ --output=<snapshot>/browser-final --evidence-dir=<snapshot>/evidence-final
```

Đường dẫn `<snapshot>` ở trên thay bằng snapshot đầy đủ đã ghi. Node **94/94 đạt**, 0 fail/skipped (77 cũ +17 mới), log `node-final.txt`. Kiểm tra mới gồm WAIT/FAIL/PASS, hai cổng độc lập, revision cũ/hoàn nguyên, version lựa chọn, dấu xem sai/cũ/khác đề nghị, chuẩn bị cũ/gửi mới, hai nhánh trả lại, khóa X không khóa Y, sai vai/liên kết, replay/reset, lịch sử, seed/metric. Fixture bất thường thiếu GR sau chuẩn bị hoặc thay revision sau gửi chỉ ở logic; không có đường UI tạo trạng thái đó.

Chrome 155.0.8059.85 headless/Windows/CDP: P4 cuối **22/10/2026 11:21:15.531–11:22:19.164 UTC+07**, `browser-final/browser-results.json`: **19 mục đạt**, gồm 12 bố cục (6 ngữ cảnh ×1280/1440) và 7 nhóm chức năng/tài nguyên; 39 response local HTTP200, 0 console errors. Font glyph Be Vietnam Pro thực, nút/focus/lỗi/dirty warning, không cuộn ngang toàn trang; bốn ảnh cuối đã xem. Không suy số nhóm thành coverage AC.

| Kịch bản / vai trò | Mong đợi | Thực tế / kết luận (giờ mô phỏng UTC+07) |
| --- | --- | --- |
| PR thật đến duyệt đề nghị; tất cả bảy vai | Cùng phiên/nguồn, FAIL khắc phục mới PASS | 10/10 PR gửi13h/duyệt14h; PO lập15h/gửi16h/duyệt17h/phát hành18h; GR19h/hóa đơn20h; FAIL21h, chuẩn bị chặn22h; ghi chú23h; sửa giá 11/10 00h, FAIL01h; sửa tiền02h/PASS03h/chuẩn bị04h. Đạt |
| AP gửi, Finance trả, AP gửi lại/Finance duyệt | Nội dung/giải trình bắt buộc, cùng ID, không Paid | Gửi trống05h bị chặn/focus; gửi06h; trả thiếu lý do không tick, đủ lý do07h; gửi thiếu giải trình08h chặn; gửi lại09h/duyệt10h. Hai vòng PAYMENT-1, prepared RESULT-3 giữ nguyên. Đạt |
| Hóa đơn trước GR; AP/Kho | WAIT không ngoại lệ/đề nghị | Reset riêng: hóa đơn16h, WAIT17h, chuẩn bị chặn18h; GR19h, chạy PASS20h. Đạt |
| Chuẩn bị cũ, nguồn mới; AP | Chặn riêng tại gửi, xem lại không mất nhập | Chuẩn bị RESULT-2/v1 lúc21h; đổi v2, gửi22h chặn stale; PASS RESULT-3 lúc23h, gửi 11/10 00h chặn dấu xem cũ; xem lại 00h/gửi01h dùng RESULT-3, không chuẩn bị lại. Đạt |
| Sau Finance trả, sửa hóa đơn; AP/Finance | FAIL chặn gửi lại, PASS mới cho gửi | Trả02h/sửa tiền03h/FAIL04h/gửi chặn05h; lưu06h/sửa tiền07h/PASS08h/gửi09h/duyệt10h, cùng PAYMENT-1. Đạt |
| Ngoài tuple, chọn PASS; AP | Không công bố giả | Đủ GR, tiền123: chạy18h chặn không có tình huống, 0 kết quả; chuẩn bị19h chặn. Đạt |
| Khóa/lặp/reset | Chờ/duyệt chỉ đọc, không thao tác thêm | UI chờ không có sửa/chạy, selector khóa; gửi/duyệt lặp chỉ một lần; reset về12h, queue và downstream rỗng. X/Y và guard sau duyệt ở Node. Đạt theo từng lớp |

Ảnh mới từ `Page.captureScreenshot`, rộng1440, byte khớp `evidence-final`, không ghi đè ảnh cũ:

| Ảnh | Giờ chụp thực 22/10/2026 UTC+07 | Vai / giờ mô phỏng |
| --- | --- | --- |
| [FAIL/ngoại lệ](./evidence/p4-01-fail-exception.png) | 11:21:27.386 | AP-01 / 10/10 21h |
| [Chờ dữ liệu](./evidence/p4-02-waiting-data.png) | 11:21:49.977 | AP-01 / 10/10 18h |
| [Gửi cần xem lại](./evidence/p4-03-send-blocked-review.png) | 11:21:55.838 | AP-01 / 11/10 00h |
| [Đề nghị đã duyệt](./evidence/p4-04-approved-request.png) | 11:21:43.452 | FIN-01 / 11/10 10h |

Hai lượt P4 thử tách biệt: attempt1 bị lỗi JS helper khai báo lại `const target` ở global; sửa IIFE. Attempt2 bị dừng ở tình huống ngoài tuple vì helper thiếu bước GR nên sản phẩm trả WAIT đúng; sửa điều kiện đầu. Đã sửa lỗi trình bày `null` trên nav và lịch sử ngoại lệ hẹp trước lượt cuối. Chỉ ảnh/lượt cuối được dùng kết luận.

### Hồi quy tiếp tục và giới hạn

Lượt cũ chạy song song P2/P3 không dùng kết luận: P3 dừng vì vai còn REQ, P2 dừng vì không có queue. Log không ghi thời điểm timer `busy` nên không chứng minh tuyệt đối nguyên nhân lịch sử. Code sản phẩm giữ vai cũ nếu `busy`/dialog, khóa bằng timer400ms; harness chờ cố định460ms sau click, nên chưa bảo đảm timer đã chạy ở trang nền. Hai lượt tuần tự cũ đã đạt P3 21/P2 15 mục ngày22/10; lượt tiếp tục bên dưới kiểm tra riêng theo yêu cầu mới. Không mặc định lỗi sản phẩm đã được loại chỉ từ nhận định harness.

Build **20/20 file** byte khớp nguồn và `artifact-manifest.json` ngoài repo, không test/log/tài liệu/evidence trong gói. Server loopback/read-only/allowlist, không phục vụ repo. Chưa full artifact Pages prefix/hosting/workflow (P5). Chưa mobile/headful/trình duyệt khác/trợ năng/UAT, đa tab/giao dịch server/beforeunload P4. Quyền browser chỉ mô phỏng; không backend/lưu bền/ngân hàng/policy doanh nghiệp. Không có lỗi kiểm soát trọng yếu còn biết trong phạm vi đã thử; giới hạn tuple chủ ý còn giữ.

Lượt tiếp tục **23/10/2026**, chạy tuần tự, mỗi scope tạo/đóng trang độc lập trong profile Chrome mới:

- P2: **15/15 mục đạt**, 2026-10-23T22:00:06.964+07:00 đến 2026-10-23T22:00:41.119+07:00; log `resume-p2/browser-results.json`. Lệnh cùng harness/server/CDP nêu trên, đổi `--scope=p2`, `--output=<snapshot>/resume-p2` và evidence-dir riêng ngoài repo.
- P3: **21/21 mục đạt**, 2026-10-23T22:02:36.319+07:00 đến 2026-10-23T22:03:21.496+07:00; log `resume-p3-final/browser-results.json`. Lệnh cùng harness/server/CDP nêu trên, đổi `--scope=p3`, `--output=<snapshot>/resume-p3-final` và evidence-dir riêng ngoài repo.

Lượt `resume-p3` đã qua nghiệp vụ nhưng lỗi ở reload cuối: điều kiện chờ hàng cũ có thể đúng trước khi navigation khởi tạo trang mới, clock đọc được rỗng. Sửa riêng QA chờ cả hàng và clock T0 rồi giữ assertion giờ; `resume-p3-final` chạy lại toàn bộ đạt. Không sửa runtime hoặc hạ kỳ vọng nghiệp vụ; assertion thêm GR không sinh kết quả vẫn giữ. Không chạy lại Node/P4 vì runtime và cấu hình/gói không đổi.

`role-diagnosis.json` từ script CDP ngoài repo: trên trang mới, lưu PR và đổi vai ngay khi timer400ms chưa chạy giữ REQ-01/T13h; timer chạy khoảng409ms sau, đổi vai sau đó thành MGR-01/queue đúng, vẫn T13h. Đây là kiểm tra guard thực tế, không giả định chỉ lỗi harness. Không có bằng chứng timer của lượt song song cũ nên nguyên nhân chính xác lịch sử chưa xác định tuyệt đối; không tái hiện lỗi vai còn kẹt sau hết guard ở các lượt tuần tự hoàn tất. Bốn ảnh P4 không bị ảnh hưởng bởi thay đổi QA/tài liệu, byte giữ đúng lượt cuối22/10.

Bảo toàn cuối: 145 tracked đầu lượt, **132 không đổi/13 thay đổi** đúng phạm vi; **8 file mới** (bốn module/data/QA/test và bốn PNG). Chỉ P1 nằm ngoài prototype/pr. Seed PR, metric/parser/time/context, assertion Node PR/PO/P3, QA P2, baseline/OD/SRS/RTM/SIM/ERP/wireframe/font/ảnh cũ/workflow giữ hash đầu lượt. Index rỗng/HEAD không đổi. Không stage/commit/push/merge/deploy/P5. Đã kiểm tra liên kết/anchor, bảng/ID/whitespace, file untracked và git diff --check.

## 8. P5 — Artifact và công bố portfolio

### Phiên bản và phạm vi

Ngày 23/10/2026, đầu lượt branch `p2p-prototype-design`, HEAD `dc6e64f467bd0e69b10d3f1f4ae0a1c886a41dd1`, working tree sạch/index rỗng. Snapshot ngoài repo `p2p-p5-999efce6-4c3d-4aa4-bede-911d01e9ecf4` gồm HEAD/status và 153 hash tracked, đã đọc lại. Sau fetch, `main` và `origin/main` cùng `7b9ee2a`, là tổ tiên cách nhánh P1–P4 bốn commit. Brief P5 cho phép commit, fast-forward main, push main đúng một lần và theo dõi deploy.

Không thay runtime, seed, UI, font hoặc test chức năng. Sửa README chính, case study, README prototype, trạng thái giao P5 trong P1 và mục này. Tái dùng hai ảnh P4 trong case study, giữ mọi ảnh/bằng chứng lịch sử. Workflow cũ đòi đúng 13 tệp trong khi build P4 tạo 20: chỉ mở rộng danh sách bảy module/JSON còn thiếu, trigger toàn bộ data và tên workflow; giữ action pin, quyền, concurrency và cách upload riêng dist.

### Kiểm tra mới trên artifact

Build thực chạy bằng Node 22.14.0: `node prototype/pr/build-static.mjs`. Kết quả **20 tệp**. Chạy chính đoạn verifier Node trích từ workflow đã sửa: **20/20 tên, byte nguồn và SHA-256 khớp**; không symlink/tệp lạ, chỉ thư mục data/logic/fonts. Manifest và helper QA lưu ngoài repo. Ảnh Markdown là tài liệu portfolio, không phải tài nguyên runtime cần đóng vào artifact.

Phục vụ riêng dist qua loopback tại prefix `/retail-p2p-ba-case-study/`, không phục vụ repo. Lệnh QA thực chạy (các placeholder chỉ thư mục kết quả/ảnh ngoài repo):

```text
node prototype/pr/qa/browser-qa.mjs --scope=p4 --cdp=http://127.0.0.1:9240 --url=http://127.0.0.1:8090/retail-p2p-ba-case-study/ --output=<artifact-p4> --evidence-dir=<artifact-images>
```

Chrome 155.0.8059.85 headless/Windows; `artifact-p4/browser-results.json` ghi 2026-10-23T22:19:37.919+07:00 đến 2026-10-23T22:20:41.444+07:00: **19/19 mục đạt**, gồm 12 bố cục ở 1280/1440 và bảy nhóm nghiệp vụ/tài nguyên; 39 response HTTP200, không console errors. Bốn ảnh thử ngoài repo, không ghi đè ảnh P4. Đây là QA artifact mới, không ghi lại thành kết quả Node/P2/P3 mới.

| Kịch bản | Mong đợi | Thực tế / kết luận |
| --- | --- | --- |
| PR mới → PO → GR/hóa đơn → FAIL → sửa → PASS | Dùng chứng từ vừa thao tác trong cùng phiên | PR-NEW-1/PO-DEMO-1; FAIL/EXCEPTION-1, sửa giá rồi tiền, RESULT-3 PASS; chuẩn bị PAYMENT-1. Đạt |
| Gửi → Finance trả → AP gửi lại → duyệt | Nội dung/giải trình bắt buộc; cùng hồ sơ, chưa Paid | Thiếu nội dung/lý do/giải trình bị chặn đúng mốc; gửi lại vòng 2 và duyệt cùng PAYMENT-1. Đạt |
| Hóa đơn trước GR | WAIT, chưa Đạt; thêm GR không tự công bố kết quả | WAIT và chặn chuẩn bị; ghi GR rồi phải chạy PASS mới. Đạt |
| Đổi version sau chuẩn bị; có PASS mới nhưng dấu xem cũ | Gửi kiểm tra độc lập, cần xem lại | Chặn stale và dấu xem cũ; xem lại không mất nội dung, gửi dùng RESULT mới. Đạt |
| Finance trả rồi sửa đầu vào | Kết quả cũ hết hiệu lực; FAIL chưa gửi lại được | FAIL chặn, PASS mới cho gửi lại cùng hồ sơ. Đạt |
| Chọn PASS với đầu vào ngoài tuple | Không công bố Đạt giả | Không có kết quả, chặn chuẩn bị. Đạt |
| Khóa và reset | Giao dịch chờ/duyệt chỉ đọc; reset đồng bộ về T0 | UI chờ khóa sửa/chạy/selector; duyệt không lặp; reset xóa downstream/queue, về REQ-01/T0. Đạt theo lớp UI; X/Y kế thừa Node |

Helper CDP bổ sung ngoài repo mở trực tiếp prefix gốc, `index.html`, `?demo=p5`, `#prototype` và reload riêng từng URL: **4/4 đạt**, PR seed/T0/REQ-01 phục hồi, Be Vietnam Pro tải được, không console exception/request lỗi. Không có deep route riêng cho chứng từ; điều hướng module diễn ra trong cùng trang. QA nghiệp vụ trên kiểm tra liên kết/đổi vai không mất phiên, reload mới reset.

### Bằng chứng kế thừa và giới hạn

Kế thừa đúng mốc P4: Node **94/94**, gồm khóa X không khóa Y, guard sai lệch sau gửi bằng fixture logic; P2 UI **15/15** và P3 UI **21/21** chạy tuần tự ngày 23/10, bốn ảnh P4 cuối ngày 22/10. Không chạy lại toàn bộ các bộ này vì nguồn liên quan không đổi. Giữ assertion thêm GR không tự sinh kết quả. Không sửa baseline/OD/SRS/RTM/metric/SIM/ERP hoặc nâng coverage từ kết quả artifact.

Matching là kết quả định trước theo tuple, không phải thuật toán ba bên; vai/clock/quyết định nhập liệu chỉ phục vụ demo. Chưa backend/lưu bền, đa tab, bảo mật production, audit bất biến, mobile/trình duyệt khác/trợ năng/UAT, thanh toán hoặc ERP thực chạy. Metric PR không đổi định nghĩa; downstream dùng cùng clock làm tuổi chờ PR tăng, reset và chạy riêng chuỗi PR để tái lập bằng chứng cũ.

### Rà soát trước công bố

262 liên kết local/anchor và ảnh tham chiếu trong năm tài liệu đã kiểm tra, không lỗi; bảng Markdown và ID P1 giữ hợp lệ. YAML workflow đọc được, branch/job/đích upload đúng; verifier mới thực chạy đạt 20/20. `git diff --check` đạt. Đối chiếu snapshot: 153 tracked, 147 nguyên hash và đúng sáu tệp P5 thay đổi, không file mới. Runtime/seed/metric/ảnh/font và nguồn ngoài phạm vi giữ nguyên; không có đường dẫn máy cá nhân trong README/case study dành cho người xem.

### Mốc công bố

Tài liệu được chốt trước push: kết quả ở trên là local artifact. Deploy và smoke công khai chưa chạy tại thời điểm commit P5; không dùng push thành công làm bằng chứng triển khai. Sau push một lần, cần theo dõi workflow đúng SHA, kiểm tra byte công khai/font/console, smoke PR mới đến Finance duyệt, reset và nhánh chặn. Run URL/SHA và kết quả thực tế sẽ được báo trực tiếp trong bàn giao P5 sau deploy, không ghi trước thành đạt trong commit này.
