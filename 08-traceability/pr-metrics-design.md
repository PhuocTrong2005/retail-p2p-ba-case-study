# Thiết kế metric xem xét yêu cầu mua hàng (PR) — Giai đoạn 1

Tài liệu này đề xuất ba phép đo phân tích có thể tính lại từ sự kiện nguồn cho yêu cầu mua hàng (Purchase Requisition — PR). Đây là thiết kế đo lường cho nghiên cứu tình huống, chưa phải kết quả vận hành, tiêu chí chấp nhận mới, mô hình trạng thái cuối cùng hoặc chính sách phê duyệt. Các ID `PR-MET-01`–`PR-MET-03` là ID riêng của tài liệu này, không trùng ID hiện hành trong kho tại thời điểm lập.

## Nguồn và ranh giới

**Quy tắc từ đường cơ sở.** [UC-01 và UC-02](../06-system-analysis/use-case-specifications.md#uc-01--lập-và-gửi-yêu-cầu-mua-hàng) quy định PR chỉ chuyển đến Quản lý cửa hàng sau kiểm tra trường bắt buộc và ngân sách đạt; Quản lý cửa hàng có ba quyết định: phê duyệt, từ chối, trả lại có lý do. Trả lại cho phép chỉnh sửa, gửi lại và kiểm tra lại; từ chối không mở lại cùng PR. [FR-01–FR-03, AC-01–AC-06, AC-25, AC-34](../07-software-requirements/srs.md) và [G1-D03, G1-D05](./baseline-decisions.md) củng cố các nhánh này. [RTM](./requirements-traceability-matrix.md) nối BRQ-02/03, UC-01/02, FR/AC liên quan; [glossary](../glossary.md) thống nhất tên vai trò và quyết định. Sáu quyết định G1-D01–G1-D06 đã được rà; G1-D01/02/04/06 thuộc các ranh giới khác, không cung cấp công thức PR.

**Quy ước phân tích mới cần review.** Mốc gửi hợp lệ dùng để đo là thời điểm PR đã qua cả hai kiểm tra áp dụng *và thực sự được chuyển cho Quản lý cửa hàng*, không phải lúc người dùng bấm Gửi trước kiểm tra. Một lần gửi lại sau trả lại mở vòng mới. Kỳ, thời điểm chốt, thứ tự sự kiện và cách làm tròn bên dưới chỉ phục vụ phép đo, không thay đổi hành vi nghiệp vụ. Ba phép đo giúp quan sát hàng chờ và lịch sử trả lại, liên quan khả năng theo dõi của [OBJ-03](../01-business-context/project-objectives.md); chúng không thay thế chỉ số của OBJ-03. Chúng không đo nhập liệu lặp của OBJ-02, tỷ lệ kiểm tra ngân sách của OBJ-04 hoặc target chu kỳ phê duyệt **PO** của OBJ-01.

## Quy ước chung và dữ liệu sự kiện tối thiểu

- `T` là thời điểm báo cáo và chốt dữ liệu cụ thể, được truyền vào mỗi lần tính và giữ cố định trong lần tính đó; không tự đọc giờ hệ thống. Prototype có thể truyền `T` từ đồng hồ mô phỏng theo [SIM-04](../06-system-analysis/pr-prototype-decisions.md#sim-04--đồng-hồ-mô-phỏng-và-tính-lại-kết-quả); lần tính tiếp theo có thể nhận mốc mới từ đồng hồ mô phỏng, không thay đổi công thức hoặc timestamp sự kiện lịch sử. Chỉ đọc sự kiện có `occurred_at ≤ T`, gồm sự kiện đúng `T`. Mọi mốc và hiển thị theo `Asia/Ho_Chi_Minh` (UTC+07:00); dấu thời gian nguồn phải có offset hoặc được chuẩn hóa rõ về múi giờ này.
- Với PR-MET-03, kỳ lấy mẫu là `[S, E)`: gồm `S`, không gồm `E`; yêu cầu `S < E ≤ T`. Kỳ chọn PR theo lúc **mở vòng đầu**, còn quyết định trả lại được xét đến và gồm `T`, kể cả khi sau `E`.
- Trong cùng một PR, sắp theo `(occurred_at, event_order)` tăng dần; `event_order` là số thứ tự nguồn tăng nghiêm ngặt cho các sự kiện nghiệp vụ của PR, kể cả khi trùng thời điểm. Sự kiện đúng `T` được xử lý hết theo thứ tự đó trước khi chụp trạng thái. Không gán thứ tự ưu tiên tùy ý theo loại sự kiện. Nếu thiếu thứ tự cho các sự kiện trùng thời điểm hoặc thứ tự mâu thuẫn, lịch sử PR không đủ tin cậy để tính.
- Thời lượng = chênh lệch giữa hai timestamp gốc theo giây / 3.600, tức giờ liên tục 24/7. Tính và tổng hợp từ giá trị gốc, chỉ làm tròn khi hiển thị đến 2 chữ số thập phân theo quy tắc half-up; không làm tròn mốc thời gian hay từng phần trước khi tính. Tỷ lệ tính từ số đếm nguyên, hiển thị phần trăm đến 2 chữ số thập phân.

| Trường sự kiện | Kiểu dữ liệu | Ý nghĩa và quy tắc |
| --- | --- | --- |
| `event_id` | Chuỗi duy nhất | Khóa truy về bản ghi nguồn; không dùng cùng một sự kiện hai lần. |
| `pr_id` | Chuỗi ổn định | Định danh một PR qua mọi vòng; dùng `COUNT DISTINCT` theo PR. |
| `event_type` | Enum | `FIRST_VALID_SUBMIT`, `RETURN_FOR_EDIT`, `VALID_RESUBMIT`, `APPROVE`, `REJECT`. Không gộp trả lại với từ chối hoặc lỗi ngân sách. |
| `occurred_at` | Timestamp có offset | Thời điểm hiệu lực nghiệp vụ của sự kiện, đủ độ chính xác để tính thời lượng. |
| `event_order` | Số nguyên dương | Thứ tự nguồn tăng nghiêm ngặt trong một PR, giải quyết các sự kiện cùng `occurred_at`. |
| `review_round` | Số nguyên dương | Vòng đầu = 1; gửi lại hợp lệ sau trả lại tăng 1; quyết định mang cùng số vòng đã mở. |
| `actor_id` | Chuỗi | Người thực hiện hành động; phục vụ truy vết theo yêu cầu lịch sử kiểm toán. |
| `required_fields_passed` | Boolean, chỉ ở sự kiện gửi hợp lệ | Bằng chứng kiểm tra trường bắt buộc đạt ở lần gửi đó; phải là `true`. |
| `budget_check_passed` | Boolean, chỉ ở sự kiện gửi hợp lệ | Bằng chứng kiểm tra ngân sách áp dụng đạt ở lần gửi đó; phải là `true`. Không quy định cách tính ngân sách. |
| `check_reference` | Chuỗi, chỉ ở sự kiện gửi hợp lệ | Tham chiếu đến bản ghi/kết quả kiểm tra nguồn của lần gửi đó để đối soát. |
| `return_reason` | Chuỗi, chỉ ở `RETURN_FOR_EDIT` | Lý do trả lại đã ghi nhận; bắt buộc cho sự kiện này. |

Các trường chỉ áp dụng cho một loại sự kiện để trống ở loại khác. Log phân tích phải giữ toàn bộ lịch sử liên quan trước `T`, không chỉ các sự kiện trong `[S, E)`. Các sự kiện gửi hợp lệ chỉ được ghi sau khi trường bắt buộc và ngân sách áp dụng đều đạt và PR được chuyển xem xét. Gửi hợp lệ mở vòng; `RETURN_FOR_EDIT`, `APPROVE` hoặc `REJECT` kết thúc đúng vòng đang mở. `VALID_RESUBMIT` chỉ theo sau `RETURN_FOR_EDIT`; không có quyết định trước mở vòng, hai vòng mở đồng thời, hoặc mở lại chính PR đã bị từ chối. Phê duyệt cũng kết thúc chuỗi xem xét PR trong phạm vi này.

Đánh giá dữ liệu thiếu/không hợp lệ riêng cho từng metric theo bảng bên dưới; một lỗi chỉ ảnh hưởng phép đo cần trường hoặc sự kiện đó. Khi không đủ căn cứ kết luận, đánh dấu **“Không xác định do thiếu dữ liệu”** hoặc **“Không xác định do dữ liệu không hợp lệ”** và ghi lý do, không tự suy ra trạng thái. Không có sự kiện gửi hợp lệ không chứng minh PR là nháp, lỗi validation hay thiếu ngân sách: log năm loại sự kiện này chỉ quan sát được phần đã qua cổng kiểm tra. Muốn thống kê các trạng thái trước cổng cần nguồn khác; tài liệu này không định nghĩa phép đo đó.

### Đánh giá dữ liệu thiếu theo từng metric

Các số hồ sơ không xác định dưới đây là **metadata chất lượng dữ liệu đi kèm ba metric**, không phải metric mới. Đánh giá trên cùng tập hồ sơ nguồn được cung cấp cho lần báo cáo, cùng `T` và cùng phạm vi quan sát phụ thuộc OD-07. Một PR chỉ đếm một lần trong số không xác định của mỗi metric dù có nhiều lỗi; cùng PR có thể không xác định ở nhiều metric. Giữ danh sách `pr_id`, tham chiếu sự kiện và lý do để đối soát.

| Metric | Khi nào đủ căn cứ tính hoặc loại theo nghiệp vụ? | Khi nào phải đánh dấu không xác định? | Công bố cùng kết quả |
| --- | --- | --- | --- |
| PR-MET-01 | Xác định được vòng hiện tại tại `T`, lần mở hợp lệ và việc có/không có quyết định đóng vòng; việc kết luận còn chờ cần lịch sử đầy đủ của vòng đến `T`. Chỉ ghi “không chờ” khi có bằng chứng đủ tin cậy về quyết định cuối hoặc tình trạng ngoài hàng chờ. | Thiếu/mâu thuẫn định danh, bằng chứng gửi hợp lệ, thời điểm so với `T`, thứ tự hoặc vòng; thiếu sự kiện làm không thể xác định vòng đang mở/đã đóng; chưa xác nhận được mức đầy đủ của lịch sử cần dùng. Không có quyết định trong log thiếu không đủ chứng minh đang chờ. | Số PR xác định đang chờ và **số PR không xác định đối với PR-MET-01**. PR không xác định không được gán thành “không chờ” hoặc đóng góp 0; số đang chờ chỉ phản ánh phần xác định được. |
| PR-MET-02 | Nếu xác định PR không thuộc hàng chờ: “Không áp dụng”. Nếu xác định đang chờ và có timestamp chính xác, hợp lệ của lần mở vòng hiện tại: tính `T − timestamp mở vòng`. | Gồm mọi PR không xác định tình trạng chờ theo PR-MET-01, cộng PR đã xác nhận đang chờ nhưng không đủ mốc thời gian chính xác để tính tuổi chờ. Không lấy ngày tạo, vòng trước hoặc giá trị 0 để thay thế. | Danh sách thời lượng của PR tính được và **số PR không xác định đối với PR-MET-02**, phân rõ hai nguyên nhân trên. PR “Không áp dụng” không nằm trong số không xác định. |
| PR-MET-03 | Xác định chắc chắn lần mở vòng đầu để chọn cohort. Với PR trong cohort: một quyết định trả lại hợp lệ trước/đúng `T` đủ chứng minh “đã từng trả lại”; chỉ kết luận “chưa từng trả lại” khi lịch sử quyết định từ vòng đầu đến `T` đầy đủ và không có trả lại. PR xác định ngoài cohort được loại theo nghiệp vụ. | Nhóm thứ nhất: chưa xác định được lần mở vòng đầu có thuộc kỳ hay không. Nhóm thứ hai: đã xác định thuộc cohort nhưng chưa đủ căn cứ kết luận có/không từng bị trả lại. Thiếu timestamp, thứ tự, vòng hoặc mâu thuẫn sự kiện được đánh giá theo việc có ảnh hưởng hai kết luận này hay không. | Công bố `N`, mẫu số tính được `D`, và **số PR không xác định đối với PR-MET-03**, tách hai nhóm không trùng nhau: chưa xác định cohort; thuộc cohort nhưng chưa xác định lịch sử trả lại. Không tính hồ sơ thuộc hai nhóm này vào `N` hoặc `D`; không mặc định “chưa từng trả lại”. |

Nếu thiếu `pr_id` hoặc không thể đối soát định danh, không thể đếm chính xác số PR bị ảnh hưởng: công bố riêng số **bản ghi nguồn không gắn được PR**, đồng thời ghi số PR không xác định tương ứng là **“Không xác định đầy đủ”** thay vì 0. Nếu chưa xác nhận được độ đầy đủ của tập hồ sơ/log nguồn, cũng nêu rõ giới hạn này; số hồ sơ không xác định chỉ bao phủ các PR nhận diện được trong dữ liệu đã cung cấp. Bản ghi trùng `event_id` với nội dung giống nhau chỉ dùng một lần; trùng ID nhưng nội dung mâu thuẫn phải đánh dấu và đánh giá ảnh hưởng theo từng metric.

## Định nghĩa ba metric

### PR-MET-01 — Số PR đang chờ xem xét

| Thuộc tính | Định nghĩa |
| --- | --- |
| Câu hỏi nghiệp vụ | Tại `T`, có bao nhiêu PR đã đến Quản lý cửa hàng và còn chờ quyết định cho vòng hiện tại? |
| Công thức | Đếm số `pr_id` riêng biệt có sự kiện mở vòng mới nhất trước/đúng `T` (`FIRST_VALID_SUBMIT` hoặc `VALID_RESUBMIT`) và **không** có quyết định kết thúc cùng `review_round` trước/đúng `T`. |
| Đơn vị và nhóm | PR; hàng chờ xem xét của Quản lý cửa hàng. Một PR tối đa đóng góp 1. |
| Mốc thời gian | Ảnh chụp tại `T`; không giới hạn thời điểm PR mở vòng. |
| Loại trừ | Nháp, lần gửi chưa qua kiểm tra, ngân sách không đạt, PR đang chờ Người yêu cầu sửa sau trả lại, PR đã duyệt hoặc từ chối. |
| Dữ liệu thiếu | Áp dụng bảng đánh giá theo metric: đánh dấu không xác định khi không đủ căn cứ xác định tình trạng chờ tại `T`; công bố số PR không xác định riêng cho PR-MET-01, không gán chúng thành “không chờ”. |
| Nguồn baseline | UC-01/02; FR-01–FR-03; AC-01–AC-06, AC-25, AC-34; G1-D03/D05; BRQ-02/03 trong RTM. |

### PR-MET-02 — Thời gian chờ hiện tại của từng PR

| Thuộc tính | Định nghĩa |
| --- | --- |
| Câu hỏi nghiệp vụ | Mỗi PR hiện chờ Quản lý cửa hàng đã chờ bao lâu trong **vòng hiện tại** tại `T`? |
| Công thức | Với mỗi PR thuộc PR-MET-01: `(T − occurred_at của sự kiện mở review_round hiện tại) / 3.600 giây` giờ. Lần gửi lại đặt lại mốc bắt đầu; thời gian chờ vòng trước không cộng vào. |
| Đơn vị và nhóm | Giờ liên tục trên từng `pr_id` đang chờ theo PR-MET-01; không phải giờ làm việc. |
| Mốc thời gian | Từ mở vòng hiện tại đến `T`, gồm trường hợp mở đúng `T` cho kết quả thực là 0 giờ. |
| Loại trừ | PR đã xác định không thuộc hàng chờ PR-MET-01: hiển thị “Không áp dụng”, không hiển thị 0. PR chưa xác định tình trạng chờ phải giữ nhãn không xác định. |
| Dữ liệu thiếu | Áp dụng bảng đánh giá theo metric; công bố số PR không xác định riêng cho PR-MET-02, gồm chưa xác định tình trạng chờ và đã xác nhận chờ nhưng chưa tính được thời lượng; không nội suy từ ngày tạo PR. |
| Nguồn baseline | UC-01/02; FR-01–FR-03; AC-02, AC-04–AC-06, AC-34; G1-D03. Thời lượng giờ liên tục là quy ước mới. |

### PR-MET-03 — Tỷ lệ PR từng bị trả lại

| Thuộc tính | Định nghĩa |
| --- | --- |
| Câu hỏi nghiệp vụ | Trong số PR bắt đầu xem xét lần đầu trong kỳ, bao nhiêu PR đã từng bị Quản lý cửa hàng trả lại tính đến `T`? |
| Công thức | Nhóm `C = {pr_id: FIRST_VALID_SUBMIT có S ≤ occurred_at < E}`. Khi dữ liệu đầy đủ, mẫu số `D = card(C)` với `card` là số PR riêng biệt trong tập. Nếu có dữ liệu thiếu/không hợp lệ, dùng `C_tính = {pr_id ∈ C: đủ căn cứ xác định có/không từng bị trả lại đến T}`, `D = card(C_tính)`; tử số `N = card({pr_id ∈ C_tính: tồn tại RETURN_FOR_EDIT hợp lệ với occurred_at ≤ T})`. Kết quả `100 × N / D` phần trăm khi `D > 0`, ghi rõ chỉ tính trên phần dữ liệu xác định được nếu có loại do chất lượng dữ liệu. Một PR trả nhiều lần chỉ tính 1 trong `N`. |
| Đơn vị và nhóm | % PR riêng biệt trong nhóm bắt đầu vòng đầu ở `[S, E)`; không phải tỷ lệ số lần trả. |
| Mốc thời gian | Chọn nhóm bằng lần mở vòng đầu trong kỳ; xét mọi quyết định trả lại của nhóm đến và gồm `T`, cả ngoài kỳ. |
| Loại trừ | PR có vòng đầu ngoài kỳ, dù gửi lại trong kỳ; PR chưa có lần gửi hợp lệ. Quyết định sau `T` không tính. |
| Dữ liệu thiếu | Áp dụng bảng đánh giá theo metric; công bố riêng số PR chưa xác định cohort và số PR thuộc cohort nhưng chưa xác định lịch sử trả lại. Không đưa các PR này vào cả `D` và `N`. Nếu `D = 0`, hiển thị “Không có dữ liệu”, không hiển thị 0%; nếu do hồ sơ chưa xác định, phải ghi kèm nguyên nhân này để phân biệt với cohort thực sự rỗng. |
| Nguồn baseline | UC-01/02; FR-01–FR-03, FR-15; AC-02, AC-04–AC-06, AC-22, AC-34; G1-D03; RTM. Cách chọn cohort và thời điểm chốt là quy ước mới. |

Báo kèm PR-MET-03 hai số ngữ cảnh trong **cùng nhóm `C` tại `T`**: số PR còn mở vòng chờ Quản lý cửa hàng và số PR có quyết định cuối là `RETURN_FOR_EDIT` chưa gửi lại hợp lệ (đang chờ Người yêu cầu chỉnh sửa). Đây là phân rã ngữ cảnh của nhóm, không phải metric độc lập; các PR đã phê duyệt hoặc từ chối không thuộc hai số này. Nếu đã xác định thuộc `C` nhưng chưa xác định được tình trạng hiện tại, công bố thêm số hồ sơ chưa xác định tình trạng trong phần chú thích ngữ cảnh, không gán chúng vào hai số trên. Số này có thể khác số chưa xác định lịch sử trả lại: biết PR từng bị trả lại chưa đủ để kết luận PR hiện đang chờ sửa. Không đặt SLA, target hay nhãn “quá hạn” cho ba metric.

## Năm ví dụ tính tay

Chọn `S = 2026-10-01 00:00`, `E = 2026-10-08 00:00`, `T = 2026-10-10 12:00`, đều theo `Asia/Ho_Chi_Minh`. Mỗi sự kiện dưới đây có `event_id` duy nhất, `event_order` theo số cuối của ID trong từng PR, `review_round` ghi trong ngoặc; mọi gửi/gửi lại trong ví dụ có `required_fields_passed = true`, `budget_check_passed = true` và `check_reference` tương ứng `CHK-<event_id>`. Người gửi là `REQ-01`, người quyết định là `MGR-01`; mọi lần trả có lý do `Cần chỉnh sửa nội dung PR`. Đây là dữ liệu tối thiểu để truy ngược từng kết quả.

**Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.**

| Tình huống / PR | Chuỗi sự kiện nguồn theo thời gian (`event_id`: loại, thời điểm, vòng) | PR-MET-01 tại T | PR-MET-02 tại T | PR-MET-03: mẫu số / tử số | Ngữ cảnh nhóm tại T: chờ xem xét / chờ sửa |
| --- | --- | ---: | --- | --- | --- |
| 1. Chờ lần đầu / `PR-A` | `A-1`: `FIRST_VALID_SUBMIT`, 02/10 09:00 (1) | 1 | 195,00 giờ | 1 / 0 | 1 / 0 |
| 2. Trả lại, đang sửa / `PR-B` | `B-1`: `FIRST_VALID_SUBMIT`, 03/10 10:00 (1); `B-2`: `RETURN_FOR_EDIT`, 09/10 14:00 (1) | 0 | Không áp dụng | 1 / 1 | 0 / 1 |
| 3. Gửi lại, đang chờ / `PR-C` | `C-1`: `FIRST_VALID_SUBMIT`, 29/09 08:00 (1); `C-2`: `RETURN_FOR_EDIT`, 30/09 11:00 (1); `C-3`: `VALID_RESUBMIT`, 06/10 12:00 (2) | 1 | 96,00 giờ | 0 / 0 | 0 / 0 |
| 4. Đã phê duyệt / `PR-D` | `D-1`: `FIRST_VALID_SUBMIT`, 04/10 15:00 (1); `D-2`: `APPROVE`, 05/10 09:00 (1) | 0 | Không áp dụng | 1 / 0 | 0 / 0 |
| 5. Đã từ chối / `PR-E` | `E-1`: `FIRST_VALID_SUBMIT`, 07/10 10:00 (1); `E-2`: `REJECT`, 08/10 00:00 (1) | 0 | Không áp dụng | 1 / 0 | 0 / 0 |

`PR-B` trả lại **sau `E` nhưng trước `T`** nên vẫn vào tử số. `PR-C` gửi lại trong kỳ nhưng vòng đầu mở trước `S`, nên không vào nhóm PR-MET-03. `PR-E` bị từ chối đúng `E`: `E` loại trừ mốc **mở vòng đầu** tại ranh giới, không loại trừ quyết định của PR đã thuộc nhóm.

**Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.**

| Kết quả đối chiếu tại T | Giá trị | Truy vết |
| --- | --- | --- |
| PR-MET-01 | 2 PR | `A-1`, `C-3` mở vòng chưa có quyết định cùng vòng. |
| PR-MET-02 | `PR-A = 195,00 giờ`; `PR-C = 96,00 giờ` | `T − A-1`; `T − C-3`; ba PR còn lại “Không áp dụng”. |
| PR-MET-03 | `1 / 4 = 25,00%` | Nhóm `A-1`, `B-1`, `D-1`, `E-1`; chỉ `B-2` là trả lại đến T. |
| Ngữ cảnh của PR-MET-03 | Còn chờ xem xét: 1 PR; chờ Người yêu cầu chỉnh sửa: 1 PR | Trong nhóm: `PR-A` chờ; `PR-B` chờ sửa. `PR-C` ngoài nhóm. |

**Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.** Trong đúng năm ví dụ đã review, giả định log đầy đủ và hợp lệ: số PR không xác định đối với PR-MET-01 = **0**, PR-MET-02 = **0**, PR-MET-03 = **0** (chưa xác định cohort: **0**; thuộc cohort nhưng chưa xác định lịch sử trả lại: **0**). Số hồ sơ thuộc cohort chưa xác định tình trạng cho phần ngữ cảnh = **0**; số bản ghi không gắn được PR = **0**. Các số này là công bố chất lượng dữ liệu của bộ ví dụ, không bổ sung metric hoặc PR mới.

**Kiểm tra biên.** Với kỳ không có `FIRST_VALID_SUBMIT`, mẫu số PR-MET-03 bằng 0 và kết quả là “Không có dữ liệu”. Lần mở vòng đầu đúng `S` thuộc nhóm, đúng `E` không thuộc nhóm. Quyết định đúng `T` được tính; quyết định sau `T` không được tính. Nếu hai sự kiện cùng timestamp, `event_order` quyết định vòng nào mở/đóng trước; thiếu thứ tự thì đánh dấu thiếu dữ liệu thay vì đoán.

## Giả định và giới hạn cần review

- Xác nhận nguồn có thể xuất `event_id`, `event_order`, mốc chuyển xem xét và bằng chứng kiểm tra cho **từng** lần gửi, kể cả lần gửi lại. Nếu hệ thống chỉ lưu thao tác bấm Gửi, cần xác định mốc hiệu lực chuyển xem xét trước khi tính thời gian.
- Xác nhận phạm vi PR/hồ sơ người dùng được phép xem trong báo cáo theo FR-16, AC-23/24 và **OD-07**. Quyền cụ thể chưa được chốt; phép tính nêu trên giả định tập PR được phép quan sát đã được xác định.
- **OD-03** còn mở về chính sách kiểm tra ngân sách chi tiết; tài liệu chỉ cần bằng chứng đạt theo chính sách áp dụng, không đề xuất chính sách. **OD-06** còn mở về mô hình trạng thái cuối cùng; năm sự kiện ở đây là mô hình phân tích tối thiểu, không đóng OD-06 hay xác định tên trạng thái sản phẩm.
- Log thiếu sự kiện trước cổng không cho phép suy luận số nháp, số lần gửi thất bại hoặc nguyên nhân không xuất hiện. Cần đối chiếu mức đầy đủ của log với nguồn vận hành trước khi dùng cho báo cáo thật; số bị loại do thiếu dữ liệu phải đi cùng kết quả.
- Nhãn **“Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.”** phải được giữ nguyên khi chuyển các số ví dụ sang dashboard, ảnh xuất hoặc phần mô tả kết quả.
