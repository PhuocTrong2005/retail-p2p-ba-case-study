# Dữ liệu PR tổng hợp — giai đoạn 3A

**Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.**

[seed.json](./seed.json) là nguồn dữ liệu mẫu duy nhất cho prototype PR. Nội dung chứng từ, danh mục và lý do được xây dựng cho demo; không phải chứng từ doanh nghiệp, báo giá hoặc giá thị trường đã xác minh. Không đóng OD hay bổ sung policy; OD-03/06/07 vẫn mở. Quyền demo không phải kiểm soát truy cập thực tế.

## Nguồn và phạm vi

- [Thiết kế metric](../../../08-traceability/pr-metrics-design.md): giữ PR-A–PR-E, mười sự kiện, ID, thứ tự, vòng, người thực hiện, thời điểm và `CHK-<event_id>`; lý do trả lại chung chung được cụ thể hóa theo brief 3A.
- [Phân tích hành vi 2A](../../../06-system-analysis/pr-behavior-analysis.md): trường dữ liệu, gửi/gửi lại, ba quyết định và ranh giới xem xét PR.
- [Quyết định prototype 2B](../../../06-system-analysis/pr-prototype-decisions.md): SIM-01–04, định dạng ngày/số/tiền, phạm vi demo và mốc khôi phục.
- [UC-01/02](../../../06-system-analysis/use-case-specifications.md), [BR-01–05, BR-25–27](../../../04-to-be-design/business-rules.md), [SRS 2.1, FR-01–03 và AC-01–06/25/34](../../../07-software-requirements/srs.md): căn cứ trường bắt buộc, kiểm tra và quyết định.
- [Wireframe hiện hành](../../../wireframes/pr/README.md) và [nguồn HTML](../../../wireframes/pr/index.html): xác định phần nội dung chứng từ còn thiếu. Seed bổ sung nội dung để review; chưa cập nhật placeholder trong wireframe.

Chỉ có dữ liệu và tài liệu trong thư mục này. Chưa có HTML/CSS, logic prototype, backend, thư viện, bộ kiểm thử phần mềm hoặc PR nháp. Tạo/lưu nháp sẽ bắt đầu từ thao tác người dùng ở 3B.

## Cấu trúc seed

| Khóa | Nội dung và cách dùng |
| --- | --- |
| `metadata` | Nhãn tổng hợp, giới hạn, phạm vi và xác nhận độ đầy đủ của lịch sử demo đến `T0`. Không dùng xác nhận này cho log vận hành khác. |
| `demo_config` | Múi giờ, `initial_time`, cohort cố định, tiền tệ, đơn vị, người dùng ban đầu và cấu hình ngân sách cho thao tác thử sau. |
| `reference_data` | Hai vai trò, hai người dùng, một đơn vị và ba trung tâm chi phí mẫu đang hoạt động. |
| `purchase_requisitions` | Năm nội dung PR hiện tại; mỗi PR có đúng một đối tượng `item`, không có danh sách nhiều dòng. |
| `historical_checks` | Sáu bản ghi kết quả kiểm tra tổng hợp, truy vết bằng `check_reference` và `event_id`; mọi kết quả đều đạt và có `simulated: true`. |
| `events` | Mười sự kiện nguồn cho vòng xem xét; dùng để suy ra tình trạng và tính metric. |

Định danh danh mục là quy ước kỹ thuật demo mới, không phải mã doanh nghiệp được duyệt. `UNIT-01` có tên **Đơn vị mẫu**, người xem xét `MGR-01`. Hai người dùng cùng đơn vị này; cả năm PR thuộc `REQ-01`. Danh mục trung tâm chi phí chỉ gồm `CC-OPS` (Vận hành cửa hàng), `CC-DISPLAY` (Trưng bày hàng hóa), `CC-STOCK` (Kho cửa hàng), đều gắn với `UNIT-01`.

Tám trường được ánh xạ như sau:

| Trường nghiệp vụ | Thuộc tính JSON |
| --- | --- |
| Người yêu cầu | `requester_id` → `reference_data.users` |
| Đơn vị yêu cầu | `unit_id` → `reference_data.units` |
| Trung tâm chi phí | `cost_center_id` → `reference_data.cost_centers` |
| Lý do nghiệp vụ | `business_reason` |
| Ngày cần hàng | `needed_by` |
| Mô tả hàng hóa | `item.description` |
| Số lượng | `item.quantity` |
| Đơn giá ước tính | `item.estimated_unit_price` |

Một mặt hàng mỗi PR là cấu trúc tối thiểu cho bộ demo này, chưa quyết định thiết kế mua hàng nhiều dòng. Đặc tính và cách đóng gói được ghi ngay trong mô tả; không thêm trường đơn vị tính hoặc tổng tiền. Giá chỉ là ước tính tổng hợp, không dùng suy ra kết quả ngân sách.

## Kiểu dữ liệu và quy tắc dùng sau này

- `needed_by` là ngày ISO `YYYY-MM-DD`, không chứa giờ. Khi triển khai, nhập/hiển thị `dd/mm/yyyy`; chỉ kiểm tra ngày lịch hợp lệ, không ép ngày tương lai. Ngày cần hàng của PR-D là 09/10/2026, trước `T0`, vẫn hợp lệ; không suy ra đã nhận hàng hoặc quá hạn.
- `quantity` và `estimated_unit_price` là số JSON hữu hạn, lần lượt lớn hơn 0 và không âm. Dữ liệu hiện tại dùng số nguyên vì các hàng hóa đếm được; không đặt quy tắc chỉ cho phép số nguyên.
- Quy ước input tương lai theo 2B: chữ số 0–9, dấu `+`/`-` tùy chọn ở đầu, dấu chấm thập phân tùy chọn có chữ số hai phía; bỏ khoảng trắng hai đầu. Không nhận dấu phân nhóm, dấu phẩy, ký hiệu tiền, số mũ, biểu thức, NaN hay vô cực. JSON kiểu số không phải chuỗi input và không dùng định dạng hiển thị.
- Tiền dùng VND, hiển thị phân nhóm bằng dấu chấm, phần thập phân nếu có bằng dấu phẩy; ví dụ `1250000` → `1.250.000 VND`. Giữ phần lẻ nếu có, không tự làm tròn tiền thành số nguyên hoặc đặt precision nghiệp vụ.
- Lý do nghiệp vụ, mô tả và lý do trả lại không trống sau bỏ khoảng trắng Unicode hai đầu; không thêm độ dài tối thiểu.
- Timestamp dùng ISO 8601 với offset `+07:00`, múi giờ `Asia/Ho_Chi_Minh`. `T0 = 2026-10-10T12:00:00+07:00`. Cohort giữ `[2026-10-01T00:00:00+07:00, 2026-10-08T00:00:00+07:00)`.

### Ngân sách: cấu hình tương lai và bằng chứng lịch sử

`demo_config.future_budget_simulation` cung cấp đúng ba kết quả SIM-01: **Đạt**, **Không đủ ngân sách**, **Nguồn dữ liệu ngân sách không khả dụng**. Mặc định/khôi phục là `PASS`; lựa chọn giữ cho các lần thử sau đến khi người điều khiển đổi. Chỉ chạy ngân sách sau validation trường đạt. Đây là cấu hình, chưa có logic hoặc thao tác demo ở 3A.

`historical_checks` là căn cứ **mô phỏng** riêng cho sáu lần gửi hợp lệ đã chuyển xem xét. Mỗi sự kiện gửi giữ hai boolean đạt và tham chiếu bản ghi kiểm tra tương ứng; các giá trị lặp tại bản ghi kiểm tra phải khớp sự kiện. Không phải bản trích xuất hệ thống kiểm tra thật, không có số dư, hạn mức hoặc công thức ngân sách. Đổi lựa chọn cho thao tác tương lai không được thay bản ghi kiểm tra hoặc ý nghĩa sự kiện quá khứ.

### Lý do trả lại và nội dung làm rõ

`B-2`: **“Làm rõ căn cứ cần 40 kẹp bảng giá: nêu số vị trí cần bổ sung tại khu khuyến mại và số kẹp dùng cho mỗi vị trí.”** Nội dung PR-B đã giải thích nhu cầu ghi giá ở khu khuyến mại, nhưng chưa có phân bổ 40 kẹp; vẫn chờ Người yêu cầu làm rõ. Không tự bổ sung lời giải hoặc lần gửi lại B.

`C-2`: **“Làm rõ căn cứ cần 12 thùng: nêu số khu kho sử dụng và số thùng cho mỗi khu để xem xét nhu cầu.”** Lý do ban đầu đã nêu việc tách hàng theo khu kho; phần làm rõ cho lần gửi lại `C-3` bổ sung **sáu khu × hai thùng luân phiên = 12 thùng**, giữ nguyên số lượng.

`PR-C.demo_clarification` liên kết `C-2`/`C-3`, ghi lý do nghiệp vụ trước làm rõ và giải thích nội dung bổ sung; `business_reason` của PR-C là nội dung sau làm rõ. Đây là ghi chú nội dung được xây dựng cho demo, không phải sự kiện mới, lịch sử phiên bản được kiểm toán hoặc bằng chứng thời điểm chỉnh sửa. Không thêm timestamp. Các lý do trả lại yêu cầu căn cứ nghiệp vụ, không cáo buộc thiếu trường bắt buộc sau validation đạt. `E-2` không có lý do từ chối; không bổ sung trường bắt buộc này.

### Lịch sử và tình trạng suy ra

Seed không lưu nhãn tình trạng hiện tại, thời gian chờ hoặc kết quả metric. Khi dùng sau này, lấy sự kiện `occurred_at ≤ T`, sắp theo `(occurred_at, event_order)` trong từng PR. `event_order` tăng nghiêm ngặt trong PR, không phải thứ tự toàn mảng `events` giữa các PR.

`FIRST_VALID_SUBMIT` mở vòng 1. `RETURN_FOR_EDIT`, `APPROVE`, `REJECT` đóng đúng vòng đang chờ; chỉ `RETURN_FOR_EDIT` cho phép `VALID_RESUBMIT` mở vòng tiếp theo. Không mở lại PR đã duyệt/từ chối. Tại `T0`, nhãn suy ra là A/C **Chờ xem xét**, B **Chờ chỉnh sửa**, D **Đã duyệt**, E **Đã từ chối**; đây chỉ là nhãn demo SIM-02, không thay lịch sử nguồn hoặc đóng OD-06.

## Kết quả kiểm tra dữ liệu

Đã chạy mã Python tạm ngoài repository bằng thư viện chuẩn, đọc trực tiếp seed; không thêm bộ kiểm thử phần mềm. Các kiểm tra đạt:

- JSON hợp lệ, không trùng khóa JSON hoặc ID; đúng năm PR, mười sự kiện, sáu kiểm tra lịch sử, hai vai trò/người dùng và một đơn vị.
- Tham chiếu người dùng/vai trò/đơn vị/trung tâm chi phí/sự kiện/kiểm tra/phần làm rõ đều tồn tại và khớp phạm vi.
- Tám trường đầy đủ, kiểu số/boolean/ngày/timestamp hợp lệ, giá trị số đúng miền, chuỗi không trống, danh mục đang hoạt động.
- Đối chiếu ID, loại, thời điểm và vòng trực tiếp với bảng năm ví dụ trong tài liệu metric; kiểm tra thứ tự nguồn theo hậu tố ID và tác nhân tương ứng.
- Chuỗi mở/đóng vòng hợp lệ, gửi lại chỉ sau trả lại; bằng chứng kiểm tra đạt khớp từng lần gửi; không gắn trường kiểm tra hoặc lý do trả lại vào sai loại sự kiện.
- Cấu hình ngân sách có đúng ba kết quả và mặc định Đạt; phần làm rõ C không thêm sự kiện/timestamp.
- Liên kết local của README và `git diff --check` đạt, gồm kiểm tra whitespace cho hai file mới chưa được Git theo dõi.

### Metric được tính độc lập từ sự kiện tại T0

**Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.**

| Phép tính | Kết quả và truy vết |
| --- | --- |
| PR-MET-01 | **2 PR**, A/C: `A-1` và `C-3` mở vòng chưa đóng tại T0. |
| PR-MET-02 | A: `(T0 − A-1) / 3.600 giây = 195,00 giờ`; C: `(T0 − C-3) / 3.600 giây = 96,00 giờ`. B/D/E: Không áp dụng. |
| PR-MET-03 | Lần gửi đầu trong `[S, E)` chọn A/B/D/E, mẫu số **4**; chỉ B có trả lại đến T0, tử số **1**; `100 × 1/4 = 25,00%`. |
| Ngữ cảnh cùng cohort | **1 chờ xem xét** (A), **1 chờ chỉnh sửa** (B); D/E đã có quyết định cuối. |
| Chất lượng dữ liệu | PR không xác định đối với PR-MET-01: **0**, PR-MET-02: **0**; PR-MET-03 chưa xác định cohort: **0**, thuộc cohort chưa xác định lịch sử trả lại: **0**; cohort chưa xác định tình trạng: **0**; bản ghi không gắn được PR: **0**. |

Mã kiểm tra nhóm và duyệt sự kiện để xác định vòng còn mở, lấy chênh lệch timestamp gốc theo giây, chọn cohort theo lần gửi đầu và đếm PR từng trả lại; sau đó mới đối chiếu kết quả với các giá trị đã review. Không đọc nhãn tình trạng hoặc kết quả có sẵn từ seed. Giờ tính liên tục 24/7; chỉ làm tròn khi hiển thị đến hai chữ số thập phân theo half-up, tỷ lệ từ số đếm nguyên.

B trả lại sau cuối kỳ vẫn vào tử số vì trước T0. C gửi lại trong kỳ nhưng lần gửi đầu trước kỳ nên không vào cohort. Quyết định từ chối E đúng cuối kỳ vẫn được xét đến T0. Các số chất lượng bằng 0 chỉ áp dụng bộ demo đầy đủ này; log thiếu/không hợp lệ về sau phải xử lý riêng theo tài liệu metric, không mặc định bằng 0. Mẫu số bằng 0 hiển thị “Không có dữ liệu”.

## Giả định cần review

Nhu cầu mua, thông số hàng hóa, số lượng, ngày cần, giá ước tính, danh mục trung tâm chi phí và hai lý do trả lại là nội dung tổng hợp mới để review thiết kế. Chưa khẳng định nội dung này đã được doanh nghiệp xác nhận hoặc đủ cho quyết định mua thực tế. Phần làm rõ C là diễn giải nội dung demo, không bổ sung lịch sử thực tế. Các quy tắc validation, quyền, SIM, baseline và metric hiện hành được giữ nguyên.
