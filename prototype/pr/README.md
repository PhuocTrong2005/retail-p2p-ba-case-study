# PR prototype — lớp logic 3B.1

**Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.**

JavaScript thuần `.mjs`, dùng độc lập và nhận đối tượng [seed 3A](./data/seed.json). Chưa có UI, HTML/CSS, kiểm tra trình duyệt hoặc nghiệm thu. Không backend, thư viện mới, lưu trữ bền, công thức ngân sách, SLA hoặc policy mới. Quyền demo không thay kiểm soát truy cập thực tế; OD-03/06/07 vẫn mở.

## Đối chiếu nguồn và môi trường

Đầu lượt: branch `readme-editing`, HEAD `b9232f3e4b5045bd3094e0bff8eff3b33f4b2c02`, chỉ `wireframes/pr/README.md` có thay đổi chưa commit. `b579cdc` tồn tại và là tổ tiên của `b9232f3`; ba tài liệu thiết kế không có diff so với `b579cdc`. Seed khớp blob trong `b9232f3`, Git blob hash `f2533cbc9e25752a82dda3a2891019719c194fbd`. Branch triển khai: `pr-prototype`, tạo từ HEAD đó; không commit code.

Windows/PowerShell không tìm thấy `node` trong PATH. Dùng runtime có sẵn, không cài/nâng cấp: `C:\Users\ASUS\AppData\Roaming\JetBrains\IntelliJIdea2024.3\node\versions\22.14.0\node.exe`, phiên bản **v22.14.0**. `node --test --help` qua đường dẫn này trả exit **0**.

Snapshot ngoài repo: `C:\Users\ASUS\AppData\Local\Temp\pr-logic-snapshot-dcde0e86651c4fb0976076fcb1b8c005\snapshot.json`. Chứa branch, HEAD, status, hash seed/ba tài liệu/README wireframe và kết quả tìm runtime; `node-test-help.txt` trong cùng thư mục lưu help thực tế. Thư mục Temp chỉ là bằng chứng cục bộ, có thể bị hệ điều hành dọn.

## Module và API nối UI sau này

| File | Trách nhiệm |
| --- | --- |
| [pr-session.mjs](./logic/pr-session.mjs) | `createPRSession(seed)` tạo phiên riêng: form chưa lưu, PR đã lưu, quyền, ngân sách, đồng hồ, thao tác và reset. |
| [validation.mjs](./logic/validation.mjs) | `validatePR`, `parseNumber`, `parseDate`: tám trường, lỗi `{field, code}`, chuẩn hóa khi gửi đạt. |
| [metrics.mjs](./logic/metrics.mjs) | `inspectHistory`, `calculateMetrics(data, T, options)`: suy ra vòng/trạng thái và ba metric, chất lượng từng metric. |
| [time.mjs](./logic/time.mjs) | Ngày lịch, timestamp có offset, UTC+07:00 và định dạng half-up bằng tỷ số số nguyên. |
| [session.test.mjs](./test/session.test.mjs) | Test thao tác, phạm vi SIM-03, đồng hồ, chuỗi chuẩn, reset và bảo toàn seed. |
| [metrics.test.mjs](./test/metrics.test.mjs) | Test độc lập cho công thức, dữ liệu thiếu/lỗi, ranh giới và phần lẻ. |
| [fixtures.mjs](./test/fixtures.mjs) | Chỉ test đọc seed bằng `node:fs`; fixture tạo trên bản sao, không sửa dữ liệu 3A. |

Các module logic không đọc file, DOM, giờ thực, localStorage hoặc sessionStorage. `Date` chỉ nhận timestamp tường minh, không gọi `Date.now()`/`new Date()` không tham số. Input seed được sao chép hai lần để reset không nhận thay đổi từ người gọi. Các giá trị trả ra cũng là bản sao.

```js
import { createPRSession } from './logic/pr-session.mjs';
const session = createPRSession(seed); // seed được caller nạp
const { pr } = session.beginNew();    // tạo form, chưa thêm PR đã lưu, chưa tăng giờ
session.edit(pr.pr_id, { business_reason: 'Nhu cầu đang nhập' });
session.save(pr.pr_id);               // tăng 1 giờ, cho lưu thiếu trường
session.openForm(pr.pr_id);           // mở lại phần đã lưu/đang nhập, không tăng giờ
```

- `edit` chỉ sửa trường nghiệp vụ cho phép; không đổi ID, người yêu cầu, đơn vị hoặc metadata. Phần nhập chưa lưu tách khỏi chứng từ đã lưu. `beginNew` tự gắn REQ-01/đơn vị mẫu, ID `PR-NEW-n` tránh ID đã dùng; chưa có hồ sơ đã lưu cho đến `save`/`submit`.
- `save` giữ nội dung chưa đầy đủ; PR trả lại giữ **Chờ chỉnh sửa**. `submit` lưu phần nhập của lần thử, tăng một giờ, validation trước rồi mới kiểm tra kết quả ngân sách định trước. Thất bại trả lỗi có cấu trúc và không tạo sự kiện vòng; `budget_checked: false` khi lỗi trường.
- `setBudget('PASS'|'INSUFFICIENT'|'UNAVAILABLE')` là điều khiển demo, không tăng giờ; giữ lựa chọn tới khi đổi. Mặc định/reset là `PASS`. Kết quả tương lai không sửa sáu bản ghi kiểm tra lịch sử; không tính ngân sách từ số lượng hoặc giá.
- `decide(id, 'APPROVE'|'RETURN_FOR_EDIT'|'REJECT', options)` kiểm tra vai trò, đơn vị và vòng hiện tại. Trả lại cần `reason` không trống; từ chối cần `confirmed: true`, không cần lý do từ chối. Yêu cầu chưa đủ điều kiện không đổi giờ/dữ liệu. Mở/hủy hộp xác nhận sau này không gọi quyết định.
- `reset({confirmed:true})` phục hồi seed, lịch sử, form, phản hồi kiểm tra, ID tuần tự, vai trò, ngân sách và đồng hồ. Chưa xác nhận thì không đổi gì; UI sau phải gọi reset đã xác nhận khi tải lại.
- `context`, `setUser`, `list`, `detail`, `history`, `openForm`, `queue`, `metrics` không tăng giờ. ID sự kiện mới `DEMO-EVENT-n` tránh trùng, `event_order` tăng theo từng PR; giờ ghi là sau tăng một giờ. Không dùng random/giờ máy và không xây audit/event sourcing đầy đủ.

`detail` trả nội dung **hiện tại**, tình trạng suy ra, vòng, hành động được phép, thời gian chờ, lý do trả lại và bước sửa/gửi lại. `ready_for_purchasing` chỉ đánh dấu PR đã duyệt, không triển khai bước mua hàng. `history` chỉ trả chuỗi người/hành động/thời điểm/vòng/lý do trả lại và `document_snapshots_available: false`.

Ghi chú làm rõ C vẫn gắn với **C-3**. Không lấy `business_reason` hiện tại để tái dựng C-1 hoặc bất kỳ lần gửi quá khứ nào; không thêm snapshot/audit giả. Nháp mới có dấu nguồn riêng trong phiên (`explicitDrafts`), không suy ra nháp chỉ vì hồ sơ thiếu log.

## Phạm vi đọc và metric

Quyền được kiểm tra trong handler. Người yêu cầu chỉ đọc/lưu/gửi PR của mình trong đơn vị mẫu; không có tổng hợp đơn vị. `detail` chỉ cung cấp PR-MET-02 cho PR được mở. Quản lý đọc PR thuộc đơn vị mẫu, không sửa thay người yêu cầu; chỉ quyết định PR đang chờ. `queue` chỉ chứa PR đang chờ; `metrics()` luôn tính trên **toàn bộ PR của đơn vị mẫu**, gồm B/D/E, không phụ thuộc hàng đợi hoặc chi tiết đang mở. Không xuất hàm đọc toàn bộ trạng thái nội bộ để vượt phạm vi này.

`calculateMetrics` là hàm phân tích thuần cho caller đã có dữ liệu, không phải cổng phân quyền. Nó nhận `T` bắt buộc, cohort từ seed và `unitId` tùy chọn; UI phải đi qua session để giữ SIM-03. Kết quả có `T`, phạm vi đơn vị, nhãn tổng hợp, giá trị gốc, nhãn hiển thị và danh sách/lý do không xác định. `met03.context` luôn thuộc cùng cohort: `waiting`, `awaiting_edit`, `unknown_count`.

Sự kiện được xét tới và gồm `T`, sắp `(occurred_at, event_order)` theo từng PR, không ưu tiên loại sự kiện. Trùng ID giống nhau chỉ tính một lần; xung đột được đánh dấu. PR-MET-03 chọn lần gửi đầu ở `[S,E)`, đếm PR riêng biệt; bằng chứng trả lại hợp lệ ở tiền tố lịch sử vẫn đủ kết luận từng trả lại dù chưa biết tình trạng hiện tại. Lỗi về sau không tự xóa bằng chứng trước đó hoặc kéo PR chắc chắn ngoài kỳ vào nhóm không xác định cohort.

`metadata.history_coverage` của seed xác nhận lịch sử đến T0. Phiên chỉ kéo dài xác nhận cho lịch sử đã biết đầy đủ và do phiên quản lý. Fixture/import có thể đặt `pr.history_coverage.complete_through` để ghi rõ phạm vi riêng; không có xác nhận đủ đến T thì không suy ra còn chờ từ việc không thấy quyết định. Quyết định cuối hợp lệ vẫn đủ kết luận đã duyệt/từ chối. Đây là hợp đồng dữ liệu demo cho tính toán, không bổ sung policy.

Số không xác định tách theo metric: PR-MET-01/02 theo tình trạng hiện tại; PR-MET-03 tách chưa biết cohort và trong cohort chưa biết lịch sử trả lại. Chưa biết tình trạng ngữ cảnh cohort được báo riêng, có thể khác số chưa biết từng trả lại. Mô hình này đòi timestamp chính xác để xác nhận vòng tại T, nên thiếu timestamp mở vòng ảnh hưởng cả PR-MET-01 và PR-MET-02; không dựng bằng chứng phụ để đoán tình trạng. `unknown_duration_count` dành cho trường hợp đã biết chờ nhưng không tính được tuổi, hiện không phát sinh với mô hình nguồn này.

Bản ghi không gắn được PR có đếm riêng, các số PR không xác định ghi **Không xác định đầy đủ**; không tự gán bản ghi đó cho một đơn vị. `quality` báo giới hạn tập nguồn và kết quả từng phần. Thiếu actor hoặc nội dung chứng từ không tự làm hỏng phép đo chỉ dùng sự kiện; kiểm tra dữ liệu gửi vẫn được thực hiện riêng ở lớp nghiệp vụ.

Thời lượng giữ `milliseconds` và `hours` chưa làm tròn; hiển thị half-up từ tỷ số số nguyên, ví dụ **1,005 giờ → 1,01 giờ**, tránh sai số nhị phân tại điểm giữa. Nhãn ngoài hàng chờ là **Không áp dụng**, thiếu/lỗi là **Không xác định do…**; mẫu số 0 trả `percent: null`, **Không có dữ liệu**, kèm nhóm không xác định để phân biệt cohort rỗng.

## Chạy test

Từ root repository trong PowerShell, dùng runtime có sẵn:

```powershell
$prNode = 'C:\Users\ASUS\AppData\Roaming\JetBrains\IntelliJIdea2024.3\node\versions\22.14.0\node.exe'
& $prNode --test prototype/pr/test/session.test.mjs prototype/pr/test/metrics.test.mjs
```

Kết quả đã chạy: **45 test, 45 đạt, 0 lỗi, 0 bỏ qua**. Đây là kiểm tra lớp logic, không tuyên bố AC đã pass hoặc UAT hoàn tất. Fixture riêng bao phủ log thiếu/lỗi, nguồn không đầy đủ, ID mâu thuẫn, thiếu lý do trả lại, sự kiện trùng thời điểm, biên S/E/T, trả nhiều lần, ngày nhuận, số lẻ và quyền khác chủ/khác đơn vị. Test so sánh đối tượng seed trước/sau và SHA-256 file; không ghi seed. Chuỗi chuẩn chạy liên tục không xen lưu nháp, có assertion độc lập với kết quả module và diagnostic thực chạy.

**Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.**

| Bước | Đồng hồ | Chờ review | Thời lượng giờ | Từng trả lại | Cohort chờ review / sửa |
| --- | --- | ---: | --- | --- | --- |
| Ban đầu | 12:00 | 2 | A 195; C 96 | 1/4 = 25% | 1 / 1 |
| B gửi, nguồn không khả dụng | 13:00 | 2 | A 196; C 97 | 1/4 = 25% | 1 / 1 |
| B gửi lại đạt | 14:00 | 3 | A 197; B 0; C 98 | 1/4 = 25% | 2 / 0 |
| Quản lý trả A | 15:00 | 2 | B 1; C 99; A Không áp dụng | 2/4 = 50% | 1 / 1 |
| Reset đã xác nhận | 12:00 | 2 | A 195; C 96 | 1/4 = 25% | 1 / 1 |

Mọi giờ trên là 10/10/2026, UTC+07:00; cohort cố định theo seed. Chuỗi thực chạy khớp từng hàng.

## Mapping hành vi từ nguồn trực tiếp

Nguồn dòng tại thời điểm đối chiếu: [2A](../../06-system-analysis/pr-behavior-analysis.md), [2B](../../06-system-analysis/pr-prototype-decisions.md), [metric](../../08-traceability/pr-metrics-design.md); cả ba khớp `b579cdc`. SIM-01 bắt đầu dòng 21; SIM-02 dòng 40; SIM-03 dòng 61; SIM-04 dòng 95; validation bổ trợ dòng 143 trong 2B. Các PR-BHV dưới đây được đọc trực tiếp từ bảng 2A.

Ký hiệu module/test: **S** = `logic/pr-session.mjs`; **V** = `logic/validation.mjs`; **M** = `logic/metrics.mjs`; **ST** = `test/session.test.mjs`; **MT** = `test/metrics.test.mjs`. **L** = đã triển khai và kiểm tra ở lớp logic; **P** = chỉ hỗ trợ một phần hành vi. **Tất cả phần trình bày, điều hướng và tương tác màn hình chờ UI ở 3B.2**, kể cả dòng ghi L.

| ID | Mô tả | Nguồn file và dòng | Module hoặc test | Trạng thái và phần còn lại |
| --- | --- | --- | --- | --- |
| PR-BHV-01 | Danh sách, chọn PR, bắt đầu tạo | 2A:44; 2B:61 | S `list/detail/beginNew`; ST phạm vi | P — có API; tìm kiếm/điều hướng chờ UI ở 3B.2 |
| PR-BHV-02 | Mở lại nháp | 2A:45; 2B:164 | S `openForm`; ST lưu/mở nháp | L — chờ UI ở 3B.2 |
| PR-BHV-03 | Tạo/nhập tám trường | 2A:51; 2B:143 | S `beginNew/edit`, V; ST validation | L — một mặt hàng theo 3A; form chờ UI ở 3B.2 |
| PR-BHV-04 | Lưu nháp thiếu trường | 2A:52; 2B:95 | S `save`; ST lưu nháp/phần sửa | L — chờ UI ở 3B.2 |
| PR-BHV-05 | Gửi lỗi trường | 2A:53; 2B:143 | S `submit`, V; ST validation trước ngân sách | L — lỗi có cấu trúc; trình bày chờ UI ở 3B.2 |
| PR-BHV-06 | Chặn khi ngân sách không đạt | 2A:54; 2B:21 | S `submit`; ST hai nhánh ngân sách | L — chờ UI ở 3B.2 |
| PR-BHV-07 | Gửi hợp lệ lần đầu | 2A:55; metric:11 | S `submit`; ST lần gửi đầu/chặn gửi lặp | L — chờ UI ở 3B.2 |
| PR-BHV-08 | Sửa/gửi lại sau trả lại | 2A:56; 2B:40 | S `edit/save/submit`; ST chuỗi chuẩn | L — chờ UI ở 3B.2 |
| PR-BHV-09 | Mô phỏng ngân sách | 2A:57; 2B:21 | S `setBudget/submit`; ST ngân sách | L — điều khiển demo chờ UI ở 3B.2 |
| PR-BHV-10 | Chi tiết/trạng thái/bước tiếp | 2A:65; 2B:40/61 | S `detail`, M; ST đọc/quyền | P — có dữ liệu/hành động; trình bày chờ UI ở 3B.2 |
| PR-BHV-11 | Lý do trả và hướng sửa | 2A:66; 2B:61 | S `detail`; ST trả lại/gửi lại | P — có lý do/hướng dẫn; trình bày và điều hướng chờ UI ở 3B.2 |
| PR-BHV-12 | Phê duyệt | 2A:67; 2B:95 | S `decide`; ST phê duyệt/chặn lần hai | L — chờ UI ở 3B.2 |
| PR-BHV-13 | Từ chối | 2A:68; 2B:40/95 | S `decide`; ST từ chối/xác nhận | L — hộp xác nhận chờ UI ở 3B.2 |
| PR-BHV-14 | Trả lại có lý do | 2A:69; 2B:143 | S `decide`; ST lý do Unicode/atomic | L — chờ UI ở 3B.2 |
| PR-BHV-15 | Lịch sử được phép xem | 2A:70; 2B:61 | S `history`; ST quyền/C-3 | P — lịch sử quy trình tối thiểu; trình bày chờ UI ở 3B.2, không full audit |
| PR-BHV-16 | Chi tiết theo vai trò | 2A:71; 2B:61 | S `detail/actions`; ST SIM-03 | P — handler kiểm tra quyền; ẩn/khóa nút chờ UI ở 3B.2 |
| PR-BHV-17 | Hàng đợi Quản lý | 2A:77; 2B:61 | S `queue`; ST hàng đợi/phạm vi | P — có tập đủ điều kiện; chọn/mở màn hình chờ UI ở 3B.2 |
| PR-BHV-18 | Số chờ và tuổi chờ | 2A:78; 2B:170; metric:50/62/74/86 | S `metrics`, M; ST chuỗi, MT biên/chất lượng | L — có số liệu/cohort; hiển thị chờ UI ở 3B.2 |

Có **12 hành vi kiểm tra được ở lớp logic và 6 hành vi chỉ hỗ trợ một phần**; không coi 18 hành vi đã hoàn tất sản phẩm. Chưa kiểm tra trình duyệt, cảnh báo rời form, tìm kiếm, ảnh preview hoặc nghiệm thu 3C. File dữ liệu 3A, wireframe, baseline, SIM và metric nguồn được giữ nguyên.
