# Quyết định cho prototype yêu cầu mua hàng (PR) — Giai đoạn 2B

## Phạm vi, thẩm quyền và nguồn

Các SIM-01–SIM-04 dưới đây là **lựa chọn được chủ dự án chấp thuận cho demo thông qua brief 2B**, chỉ áp dụng cho prototype yêu cầu mua hàng (Purchase Requisition — PR). Đây không phải stakeholder sign-off, chính sách doanh nghiệp thực tế hoặc xác nhận đã triển khai/kiểm thử phần mềm. Các lựa chọn thiết kế bổ trợ được ghi riêng; không đổi requirements, mapping, AC, metric hoặc trạng thái OD.

Đầu lượt: nhánh `main`, HEAD `a68dbd88420687db9ac0f9ebc0ae23f15ba6bb8c`, ahead `origin/main` một commit; `06-system-analysis/pr-behavior-analysis.md` là file chưa được theo dõi từ lượt 2A. Không có thay đổi tracked; file 2B chưa tồn tại; không tìm thấy AGENTS.md trong kho hoặc SIM-01–SIM-04 đã dùng. Bảo toàn file 2A và mọi tài liệu hiện có.

| Nguồn đã đọc trực tiếp tại local | Nội dung đối chiếu |
| --- | --- |
| [Bảng hành vi 2A](./pr-behavior-analysis.md) | PR-SCR-01–PR-SCR-04; PR-BHV-01–PR-BHV-18; PR-Q-01–PR-Q-07. Các phương án 2A là đầu vào, được cụ thể hóa trong 2B mà không sửa file 2A. |
| [Thiết kế metric](../08-traceability/pr-metrics-design.md) | PR-MET-01–PR-MET-03; vòng và năm loại sự kiện; kỳ/cohort, mốc chốt, giờ liên tục, làm tròn, xử lý dữ liệu thiếu và năm ví dụ ban đầu. |
| [UC hiện hành](./use-case-specifications.md) | UC-01/02 cho lập/gửi/quyết định; UC-11 phân biệt lịch sử audit và quyền; UC-10/12 là nguồn xem trạng thái/báo cáo được tham chiếu trong 2A. |
| [Quy tắc nghiệp vụ](../04-to-be-design/business-rules.md) | BR-01–BR-05 và BR-25–BR-27: dữ liệu gửi, ngân sách, quyết định, theo dõi, lịch sử, quyền. |
| [SRS](../07-software-requirements/srs.md) | Mục 2.1, FR-01–FR-03, FR-14–FR-16, NFR-01/02/04; AC-01–AC-06, AC-20–AC-25, AC-34. |
| [Baseline decisions](../08-traceability/baseline-decisions.md) | Rà G1-D01–G1-D06; G1-D03/D05 chi phối nháp, trả lại, từ chối; G1-D04 giữ phạm vi hàng hóa hữu hình. |
| [RTM](../08-traceability/requirements-traceability-matrix.md) và [glossary](../glossary.md) | Giữ ID/mapping và thuật ngữ; OD-03/06/07 tiếp tục mở, các OD khác cũng không được đóng trong 2B. |

Nguồn nghiệp vụ nằm tại baseline `6d5d936`; thiết kế metric local tại commit `a68dbd8`. Các nguồn sử dụng ở đây đã được đọc, không có nguồn chưa xác minh được dùng để chốt quyết định. Không có nội dung thiết kế font, màu, bố cục chi tiết, thư viện giao diện hoặc triển khai trong tài liệu này.

## SIM-01 — Ngân sách mô phỏng có thể tái lập

**Quyết định và lý do.** Dùng ba kết quả định trước: **Đạt**, **Không đủ ngân sách**, **Nguồn dữ liệu ngân sách không khả dụng**. Chúng giúp tái hiện cổng kiểm tra trong UC-01 mà không tự đặt công thức, hạn mức hoặc số dư theo OD-03.

Điều khiển demo chọn một trong ba kịch bản trước khi gửi; mặc định khi khởi tạo/khôi phục là **Đạt**. Lựa chọn được giữ cho các lần thử sau cho đến khi người điều khiển đổi; không có chuỗi kết quả ngẫu nhiên hoặc tự tiêu thụ kịch bản. Điều khiển này thuộc ngữ cảnh điều hành demo riêng, không phải hành động nghiệp vụ của Người yêu cầu/Quản lý cửa hàng và không phải quyền ghi đè. Chưa chọn hình thức giao diện của điều khiển.

| Khi xử lý Gửi/Gửi lại | Hành vi cụ thể | Hệ quả với vòng xem xét |
| --- | --- | --- |
| Trường bắt buộc không hợp lệ | Chỉ báo lỗi trường, không chạy kiểm tra ngân sách dù đang chọn kịch bản nào | Không mở vòng |
| Trường hợp lệ, kịch bản Đạt | Ghi kết quả đạt và chuyển đến Quản lý cửa hàng; nhãn thành Chờ xem xét | Mở vòng bằng `FIRST_VALID_SUBMIT` hoặc `VALID_RESUBMIT` tùy lịch sử |
| Trường hợp lệ, kịch bản Không đủ ngân sách | Thông báo không đủ ngân sách, chặn chuyển và cho chỉnh sửa | Không mở vòng; không tạo quyết định trả lại/từ chối |
| Trường hợp lệ, kịch bản Nguồn không khả dụng | Thông báo chưa kiểm tra được ngân sách, chặn chuyển, cho thử lại bằng lần Gửi/Gửi lại tiếp theo | Chưa kết luận đủ hoặc thiếu; không mở vòng |

Mỗi lần Gửi/Gửi lại được xử lý tăng giờ theo SIM-04, kể cả lỗi trường hoặc nguồn không khả dụng. Đổi kịch bản không tăng giờ. Kết quả không phụ thuộc âm thầm vào số lượng, đơn giá hay trường nhập khác; thay dữ liệu đầu vào chỉ ảnh hưởng validation đã mô tả. Bằng chứng kiểm tra đạt của từng lần gửi hợp lệ được giữ trong mô hình phân tích; chưa thiết kế hợp đồng log.

**Ví dụ kiểm tra.** Cùng nội dung hợp lệ và cùng lựa chọn Không đủ ngân sách, hai lần gửi đều bị chặn; đổi sang Đạt rồi gửi mới chuyển xem xét. Khi trường thiếu và đang chọn Nguồn không khả dụng, chỉ xuất hiện lỗi trường; chưa được kết luận đã thử lấy ngân sách.

**Nguồn:** PR-Q-01, PR-BHV-05–PR-BHV-09; UC-01; BR-01/02/03; FR-01/02; AC-01–AC-03; thiết kế metric. **OD:** OD-03 còn mở. **Giới hạn:** kết quả và nhánh nguồn không khả dụng chỉ mô phỏng cho prototype, không xác lập cách vận hành hệ thống ngân sách thật.

## SIM-02 — Năm nhãn demo và thông báo lỗi

**Quyết định và lý do.** Chỉ dùng năm nhãn: **Nháp**, **Chờ xem xét**, **Chờ chỉnh sửa**, **Đã duyệt**, **Đã từ chối**. Chúng diễn giải tình huống thao tác trong demo, không phải state model đầy đủ và không đóng OD-06.

| Tình huống | Nhãn sau xử lý | Sự kiện phân tích metric |
| --- | --- | --- |
| Tạo nội dung mới hoặc lưu nháp trước lần chuyển xem xét đầu | Nháp | Không có sự kiện mở/đóng vòng |
| Gửi lần đầu thất bại do trường/ngân sách/nguồn không khả dụng | Giữ Nháp | Không có sự kiện mở/đóng vòng |
| Gửi hợp lệ lần đầu và thực sự chuyển xem xét | Chờ xem xét | `FIRST_VALID_SUBMIT`, mở vòng đầu |
| Quản lý trả lại có lý do | Chờ chỉnh sửa | `RETURN_FOR_EDIT`, đóng vòng hiện tại |
| Chỉnh sửa, lưu phần sửa hoặc gửi lại thất bại sau trả lại | Giữ Chờ chỉnh sửa | Không mở vòng mới |
| Gửi lại sau trả lại hợp lệ và chuyển xem xét | Chờ xem xét | `VALID_RESUBMIT`, mở vòng tiếp theo |
| Phê duyệt hợp lệ | Đã duyệt | `APPROVE`, đóng vòng |
| Từ chối hợp lệ | Đã từ chối | `REJECT`, đóng vòng; không mở lại cùng PR |

Lỗi trường, không đủ ngân sách và nguồn không khả dụng là **thông báo kết quả kiểm tra**, không tạo nhãn thứ sáu hoặc sự kiện quyết định. Không sửa nội dung PR đang chờ/đã duyệt/đã từ chối trong demo. PR đã duyệt không có thao tác sửa; PR đã từ chối không có thao tác mở lại hoặc gửi lại. Lưu phần chỉnh sửa sau trả lại dùng cùng hành động lưu nháp theo nghĩa giữ phần nhập trong phiên, nhưng không đổi nhãn về Nháp; việc này là cách lưu phục vụ prototype.

**Ví dụ kiểm tra.** PR-B ban đầu Chờ chỉnh sửa; gửi lại với ngân sách không đủ vẫn Chờ chỉnh sửa, vòng cũ vẫn đã đóng. PR-E ban đầu Đã từ chối; không cho phép sửa/gửi lại. Xem hoặc bấm điều khiển đã bị vô hiệu hóa không tạo sự kiện.

**Nguồn:** PR-Q-02; UC-01/02; BR-04; FR-01–FR-03, FR-14; AC-01–AC-06, AC-34; G1-D03/D05; thiết kế metric. **OD:** OD-06 còn mở. **Giới hạn:** bộ nhãn và cách giữ nhãn khi kiểm tra thất bại chỉ áp dụng cho prototype; các nhánh nghiệp vụ duyệt/từ chối/trả lại vẫn lấy từ baseline.

## SIM-03 — Hai vai trò và phạm vi dữ liệu demo

**Quyết định và lý do.** Dùng một Người yêu cầu (`REQ-01`) và một Quản lý cửa hàng (`MGR-01`) thuộc cùng **đơn vị mẫu**. Năm PR-A–PR-E đã review được đặt trong ngữ cảnh đơn vị mẫu, thuộc Người yêu cầu này để bảo toàn kết quả ban đầu; đây chỉ là quy ước gắn phạm vi demo, không tạo dataset mới trong 2B. PR tạo thêm trong phiên thuộc cùng người/đơn vị.

**Xác nhận quan hệ sở hữu/đơn vị cho từng PR mẫu:**

**Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.**

| PR mẫu hiện có | Người yêu cầu sở hữu PR | Đơn vị yêu cầu | Quản lý cửa hàng của đơn vị demo |
| --- | --- | --- | --- |
| PR-A | REQ-01 | Đơn vị mẫu | MGR-01 |
| PR-B | REQ-01 | Đơn vị mẫu | MGR-01 |
| PR-C | REQ-01 | Đơn vị mẫu | MGR-01 |
| PR-D | REQ-01 | Đơn vị mẫu | MGR-01 |
| PR-E | REQ-01 | Đơn vị mẫu | MGR-01 |

Bảng chỉ xác nhận quan hệ cho năm ví dụ đã có, chưa tạo dataset, hồ sơ hoặc danh mục đơn vị. Người yêu cầu sở hữu và đơn vị của mỗi PR giữ nguyên qua các vòng xem xét. MGR-01 là người xem xét trong ngữ cảnh đơn vị demo, không phải chủ sở hữu PR và chỉ được ra quyết định khi PR Chờ xem xét theo SIM-03. Việc cả năm PR cùng người/đơn vị không biến phạm vi demo thành số liệu toàn công ty, không chốt quyền thực tế theo OD-07 hoặc thay đổi sự kiện/kết quả metric đã review.

| Vai trò/ngữ cảnh | Hồ sơ và thao tác demo | Thông tin lịch sử tối thiểu |
| --- | --- | --- |
| Người yêu cầu tại PR-SCR-01/02/03 | Chỉ thấy PR của mình; tạo, lưu và mở lại nháp; sửa/gửi khi Nháp hoặc Chờ chỉnh sửa; xem các PR đã gửi/quyết định; không ra quyết định | Xem chuỗi gửi hợp lệ, quyết định, gửi lại của PR mình: người, hành động, thời điểm và lý do trả lại; xem phản hồi kiểm tra gửi của mình |
| Quản lý cửa hàng tại PR-SCR-04/03 | Thấy PR thuộc đơn vị mẫu; hàng đợi chỉ gồm PR đang Chờ xem xét; chỉ duyệt/từ chối/trả lại khi đủ điều kiện; không sửa nội dung thay Người yêu cầu | Xem chuỗi quy trình của PR trong đơn vị để biết vòng hiện tại, lần gửi và quyết định/lý do trả lại trước đó; không cấp chức năng audit toàn phần |
| Điều khiển demo | Chuyển vai trò, chọn kịch bản, khôi phục dữ liệu | Là chức năng demo, không phải đăng nhập, phân quyền thực hoặc nghiệp vụ PR |

Lịch sử quy trình trên PR-SCR-03 chỉ để giải thích thao tác và vòng đang xem. Không mô phỏng audit history đầy đủ, tìm kiếm audit xuyên hệ thống, lịch sử mọi thay đổi trường hoặc cấp mặc định toàn bộ UC-11. Số vòng hiện tại được dùng để diễn giải gửi lại; metadata định danh/thứ tự sự kiện không trở thành trường người dùng phải nhập.

**Phạm vi metric tại từng nơi:** Người yêu cầu chỉ xem PR-MET-02 của chính PR đang mở ở PR-SCR-03, không có số tổng hợp đơn vị/công ty. Quản lý xem PR-MET-01 và PR-MET-02 tại hàng đợi PR-SCR-04; chi tiết PR-SCR-03 giữ cùng phạm vi đơn vị. PR-MET-03 đặt trong phần tóm tắt của PR-SCR-04, tính trên **tất cả PR thuộc đơn vị mẫu**, chọn cohort theo vòng đầu, không tính riêng các PR còn trong hàng đợi. Bộ lọc danh sách hoặc mở một chi tiết không được âm thầm đổi quần thể của các số tổng hợp. Số không xác định đi kèm từng metric dùng đúng phạm vi tương ứng.

Việc Quản lý cửa hàng xem phần tóm tắt PR-MET-03 là lựa chọn demo được chủ dự án chấp thuận; FR-16/UC-12 không mặc định cấp báo cáo cho vai trò này trong hệ thống thật. Không có số liệu nào được ghi là toàn công ty. Chuyển vai trò chỉ đổi ngữ cảnh, giữ nguyên dữ liệu và đồng hồ trong phiên.

**Ví dụ kiểm tra.** Chuyển từ Người yêu cầu sang Quản lý không thay đổi PR hoặc giờ; Quản lý mở PR-B chỉ xem phần quy trình, không sửa thay Người yêu cầu. Phần tóm tắt cohort vẫn gồm PR-B đang chờ sửa và PR-D/E đã có quyết định dù chúng không nằm trong hàng đợi.

**Nguồn:** PR-Q-03/07; UC-01/02/10/11/12; BR-27; FR-14–FR-16; NFR-01/02; AC-20–AC-24, AC-34; thiết kế metric. **OD:** OD-07 còn mở. **Giới hạn:** chỉ áp dụng cho prototype; không chứng minh bảo mật, xác thực, ma trận quyền hoặc kiểm soát truy cập hệ thống thật.

## SIM-04 — Đồng hồ mô phỏng và tính lại kết quả

**Quyết định và lý do.** Mốc khởi tạo là **10/10/2026 12:00, Asia/Ho_Chi_Minh**, ký hiệu `T0`. Đồng hồ chỉ tăng theo thao tác được quy định, không dùng giờ máy. Một bước một giờ chỉ để nhìn thấy thay đổi phép đo, không đại diện thời gian xử lý thực tế hoặc SLA.

| Thao tác | Thay đổi đồng hồ | Thời điểm/kết quả |
| --- | --- | --- |
| Lưu nháp được xử lý, gồm lưu phần sửa sau trả lại | Tăng đúng một giờ mỗi lần, kể cả lưu lại nội dung giống lần trước | Giữ phần nhập ở thời điểm sau tăng; không tạo sự kiện mở/đóng vòng |
| Gửi/Gửi lại trong ngữ cảnh được phép, dù kiểm tra đạt hay thất bại | Tăng đúng một giờ cho cả thao tác | Sau tăng, kiểm tra trường rồi ngân sách nếu trường hợp lệ; ghi kết quả hoặc sự kiện mở vòng ở mốc mới. Không tăng riêng cho từng bước kiểm tra |
| Thử lại sau nguồn không khả dụng | Là một lần Gửi/Gửi lại, tăng đúng một giờ | Chạy lại kiểm tra trường và kịch bản ngân sách đang chọn; không có thao tác thử lại ngân sách riêng |
| Phê duyệt, Từ chối, Trả lại hợp lệ | Tăng đúng một giờ | Quyết định đóng vòng nhận timestamp sau tăng; Trả lại phải có lý do hợp lệ |
| Mở màn hình/chi tiết/lịch sử, chuyển vai trò, đổi kịch bản | Không tăng | Không ghi sự kiện vòng hoặc đổi dữ liệu PR |
| Bắt đầu biểu mẫu mới, nhập/sửa dữ liệu chưa lưu, sửa lý do quyết định trước khi hoàn tất | Không tăng | Chỉ thay nội dung đang nhập; chưa tạo hồ sơ đã lưu hoặc sự kiện vòng |
| Nút vô hiệu hóa; yêu cầu không được phép; thử hoàn tất Trả lại khi thiếu lý do | Không tăng | Chưa có thao tác nghiệp vụ hợp lệ được xử lý; không ghi quyết định. Lỗi trường khi Gửi vẫn tăng theo hàng Gửi phía trên |
| Khôi phục dữ liệu mẫu hoặc tải lại trang | Đưa về `T0`, không cộng giờ | Bỏ mọi thay đổi, phần nhập chưa lưu và lịch sử phát sinh trong phiên; nạp lại năm ví dụ, vai trò Người yêu cầu và kịch bản Đạt |

Một thao tác Gửi/Gửi lại lưu phần nhập của lần thử trong bộ nhớ phiên, kể cả khi bị lỗi, giữ nhãn theo SIM-02 và cho sửa/thử lại; nó không tự tách thành một lần Lưu nháp cộng thêm giờ. Thao tác nghiệp vụ được xử lý tuần tự; mỗi lần chỉ có một kết quả hoàn tất. Mọi timestamp của kết quả/sự kiện là đồng hồ sau tăng; không dùng timestamp lúc bắt đầu nhập. ID/thứ tự sự kiện phát sinh được cấp theo chuỗi xử lý xác định trong phiên, không lấy ngẫu nhiên từ giờ máy; khôi phục cũng khôi phục thứ tự ban đầu. Chưa thiết kế định dạng ID, payload hoặc cơ chế log.

Sau mỗi thao tác, mỗi lần tính metric nhận **tham số `T` cụ thể bằng đồng hồ hiện tại**, cố định trong lần tính đó. Không thay timestamp lịch sử khi đồng hồ tăng. Sự kiện đến và gồm `T` được xét; thứ tự cùng timestamp và làm tròn giữ đúng tài liệu metric. Cùng dữ liệu khởi tạo, lựa chọn kịch bản và chuỗi thao tác phải cho cùng timestamp, vòng và kết quả.

Kỳ cohort giữ **[01/10/2026 00:00, 08/10/2026 00:00)**; không trượt theo đồng hồ. PR gửi hợp lệ lần đầu sau kỳ không thuộc cohort. PR đã thuộc cohort vẫn có thể thay đổi lịch sử trả lại hoặc tình trạng ngữ cảnh sau kỳ. Năm ví dụ và kết quả tại `T0` giữ nguyên.

### Ví dụ kiểm tra theo chuỗi thao tác

Đây là mô tả kiểm tra tính tay trên năm PR hiện có, không phải dataset mới hoặc kết quả đã chạy trên phần mềm. Nhãn tiền tệ, định dạng đầu vào và bố cục không được suy từ bảng kiểm tra.

**Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.**

| Bước và thao tác | Đồng hồ sau xử lý | Sự kiện/vòng và nhãn | Metric sau bước |
| --- | --- | --- | --- |
| Khởi tạo/khôi phục | 10/10/2026 12:00 | A/C Chờ xem xét; B Chờ chỉnh sửa; D Đã duyệt; E Đã từ chối | PR-MET-01 = 2; A = 195,00 giờ, C = 96,00 giờ; PR-MET-03 = 1/4 = 25,00%; cohort chờ xem xét = 1, chờ sửa = 1 |
| Chuyển vai trò/đổi kịch bản sang Nguồn không khả dụng; sửa nội dung B chưa lưu | 10/10/2026 12:00 | Không có sự kiện vòng | Kết quả không đổi |
| Người yêu cầu gửi lại B, trường hợp lệ, nguồn không khả dụng | 10/10/2026 13:00 | B giữ Chờ chỉnh sửa, không mở vòng | Số chờ vẫn 2; A = 196,00 giờ, C = 97,00 giờ; tỷ lệ vẫn 25,00% |
| Đổi kịch bản sang Đạt, gửi lại B hợp lệ | 10/10/2026 14:00 | `VALID_RESUBMIT` của B mở vòng 2 tại 14:00; B Chờ xem xét | Số chờ = 3; A = 197,00 giờ, B = 0,00 giờ, C = 98,00 giờ; tỷ lệ vẫn 25,00%; cohort chờ = 2, chờ sửa = 0 |
| Chuyển Quản lý, trả A với lý do hợp lệ | 10/10/2026 15:00 | `RETURN_FOR_EDIT` của A đóng vòng 1; A Chờ chỉnh sửa | Số chờ = 2; A Không áp dụng, B = 1,00 giờ, C = 99,00 giờ; PR-MET-03 = 2/4 = 50,00%; cohort chờ = 1, chờ sửa = 1 |
| Khôi phục hoặc tải lại trang | 10/10/2026 12:00 | Bỏ sự kiện/nhập liệu phát sinh, trở về năm ví dụ ban đầu | Trở về đúng kết quả ở hàng khởi tạo |

Các bước trên giả định dữ liệu đầy đủ: số PR không xác định của từng metric đều bằng 0; không chuyển quy tắc này thành mặc định cho log thiếu. Nhánh nguồn không khả dụng không mở vòng B nhưng làm thời gian chờ A/C tăng vì đồng hồ đã tăng. Mốc chờ 0,00 giờ của B ngay sau gửi hợp lệ là giá trị thực tại mốc mở vòng, khác với “Không áp dụng”.

**Kiểm tra riêng sau khôi phục:** một lần Lưu nháp tăng giờ nhưng không mở vòng; một lần Gửi sai trường cũng tăng giờ nhưng chưa kiểm tra ngân sách. Mở/đổi vai/đổi kịch bản không tăng giờ. Gửi hợp lệ một PR mới trong phiên không thêm PR đó vào cohort vì vòng đầu sau 08/10/2026 00:00. Không tạo bộ PR bổ sung trong tài liệu này.

**Nguồn:** PR-Q-06/07; thiết kế metric về `T`, kỳ và sự kiện; UC-01/02; AC-01–AC-06, AC-25. **OD:** liên quan OD-06 về vòng/nhãn, OD-07 về phạm vi; không đóng OD. **Giới hạn:** toàn bộ cơ chế tăng/khôi phục giờ chỉ áp dụng cho prototype, không xác lập thời gian xử lý hoặc cơ chế lưu trữ vận hành.

### Đối chiếu câu “thời điểm báo cáo cố định”

Phần [quy ước thời gian trong tài liệu metric](../08-traceability/pr-metrics-design.md#quy-ước-chung-và-dữ-liệu-sự-kiện-tối-thiểu) đã được làm rõ theo yêu cầu chủ dự án: mỗi lần tính nhận tham số `T` cụ thể và giữ `T` cố định trong lần tính; không tự đọc giờ hệ thống. Prototype có thể truyền `T` từ đồng hồ mô phỏng theo SIM-04, và lần tính tiếp theo nhận mốc mới. Cách hiểu này giữ nguyên công thức, kỳ cohort, timestamp lịch sử và kết quả tại `T0`.

## Các lựa chọn thiết kế bổ trợ, không phải SIM

### Trường và validation cho demo

Giữ nguyên tám trường bắt buộc khi gửi tại BR-01 và SRS 2.1. Chưa đủ trường vẫn lưu nháp được. Sử dụng một đơn vị mẫu đang hoạt động và một trung tâm chi phí mẫu hợp lệ với đơn vị đó; Người yêu cầu lấy từ vai trò demo. Đây là phạm vi tham chiếu nhỏ, chưa tạo danh mục hoặc dataset cụ thể. Hàng hóa nhập mô tả trực tiếp, hỗ trợ một hoặc nhiều dòng, không dựng danh mục hàng.

| Trường | Quy tắc baseline đã có | Cụ thể hóa cho prototype |
| --- | --- | --- |
| Người yêu cầu | Xác định người yêu cầu đã xác thực khi gửi | Gắn cố định Người yêu cầu demo; không có đăng nhập thật hoặc chọn người thay thế |
| Cửa hàng / Bộ phận yêu cầu | Đang hoạt động, người yêu cầu được phép dùng | Dùng đơn vị mẫu của SIM-03; không nhập đơn vị ngoài phạm vi |
| Trung tâm chi phí | Đang hoạt động, hợp lệ với đơn vị yêu cầu | Dùng tham chiếu mẫu hợp lệ; thiếu lựa chọn không đạt kiểm tra gửi |
| Lý do nghiệp vụ | Không rỗng sau bỏ khoảng trắng đầu/cuối | Dùng quy ước không trống bên dưới, không đặt giới hạn độ dài mới |
| Ngày cần hàng | Ngày lịch hợp lệ; không quy định phải ở tương lai | Nhập/hiển thị `dd/mm/yyyy`, kiểm tra đúng ngày/tháng/năm, gồm năm nhuận; không so với đồng hồ để ép ngày tương lai |
| Mô tả hàng hóa hữu hình | Ít nhất một dòng và mô tả mỗi dòng khác rỗng | Không trống theo quy ước bên dưới; dòng đang có thiếu mô tả phải báo lỗi khi gửi |
| Số lượng | Dạng số, lớn hơn 0 ở từng dòng | Áp dụng quy ước số hợp lệ bên dưới, sau đó kiểm tra lớn hơn 0; không giới hạn thành số nguyên |
| Đơn giá ước tính | Dạng số, không âm ở từng dòng | Cùng quy ước số hợp lệ, sau đó kiểm tra không âm; hiển thị tiền VND, không dùng giá để suy ra ngân sách |

**Không trống:** chuỗi sau bỏ ký tự khoảng trắng Unicode ở hai đầu phải còn ít nhất một ký tự không phải khoảng trắng; bao gồm xử lý dấu cách, tab, xuống dòng và khoảng trắng không ngắt. Giữ nội dung bên trong, không đặt độ dài tối thiểu khác. Bỏ khoảng trắng của lý do nghiệp vụ đã có căn cứ SRS; áp dụng cụ thể cho mô tả/lý do trả lại là lựa chọn validation cho prototype.

**Số hợp lệ khi gửi:** không trống sau bỏ khoảng trắng hai đầu; chỉ nhận chữ số 0–9, có thể có một dấu `+`/`-` ở đầu và một dấu chấm thập phân với chữ số ở cả hai phía. Không nhận dấu phân nhóm, dấu phẩy, ký hiệu tiền, số mũ, biểu thức, NaN hoặc vô cực; giá trị phải hữu hạn. Đây là quy ước nhập demo, không phải định dạng nghiệp vụ được duyệt. Cho phép phần lẻ cho cả số lượng và đơn giá; không tự đặt mức tiền tối đa hoặc độ chính xác nghiệp vụ. Hiển thị tiền theo VND, phân nhóm hàng nghìn bằng dấu chấm, phần thập phân nếu có bằng dấu phẩy; giữ giá trị nhập, không tự làm tròn tiền thành số nguyên. Thời lượng metric vẫn theo quy tắc làm tròn riêng đã chốt.

Ví dụ validation: khoảng trắng thuần túy không đạt; số lượng `0` không đạt; đơn giá `0` đạt; `1.5` là số hợp lệ còn `1e3` không thuộc cú pháp nhập demo; `29/02/2026` không phải ngày hợp lệ. Lý do trả lại **bắt buộc theo baseline** (UC-02, FR-03, AC-06/34), dùng quy ước không trống cho demo. Không bắt lý do từ chối và không thêm ô nhập lý do từ chối riêng; không thêm ghi chú phê duyệt, tổng tiền hoặc đơn vị tính thành trường bắt buộc.

### Lưu giữ và phản hồi thao tác

Dùng bộ nhớ của trang đang mở; không backend, localStorage hoặc sessionStorage. Lưu nháp rồi mở lại trong cùng phiên giữ được phần nhập. Tải lại hoặc chức năng Khôi phục dữ liệu mẫu sẽ bỏ thay đổi và nạp lại ngữ cảnh ban đầu theo SIM-04. Không autosave; nhập chưa lưu không cập nhật hồ sơ đã lưu. Khi gửi, xử lý phần nhập hiện tại theo quy tắc gửi của SIM-04.

Phản hồi nghiệp vụ cần phân biệt đã lưu nháp, lỗi từng trường, ngân sách không đủ, chưa lấy được ngân sách, đã chuyển xem xét và đã ghi quyết định. Sau lưu nháp giữ ngữ cảnh chỉnh sửa để tiếp tục; sau gửi thành công hoặc quyết định hợp lệ chuyển về ngữ cảnh chi tiết PR với kết quả hiện tại. Đây là lựa chọn điều hướng ở mức hành vi, chưa chọn cách trình bày hoặc thành phần UI. Thiết kế UI sau phải thể hiện rõ dữ liệu chỉ giữ trong phiên và thao tác tải lại/khôi phục sẽ mất thay đổi.

### Metric trong bốn màn hình hiện có

| Metric | Nơi sử dụng và phạm vi | Nội dung phải đi cùng |
| --- | --- | --- |
| PR-MET-01 | Hàng đợi PR-SCR-04 của Quản lý; PR đủ điều kiện còn chờ trong đơn vị mẫu | Thời điểm báo cáo, phạm vi đơn vị mẫu và số PR không xác định đối với metric này |
| PR-MET-02 | Từng PR tại PR-SCR-04; PR-SCR-03 theo phạm vi vai trò SIM-03 | Mốc mở vòng hiện tại, thời điểm báo cáo, giờ liên tục; “Không áp dụng” khi xác định không chờ; “Không xác định do thiếu dữ liệu”/“Không xác định do dữ liệu không hợp lệ” khi thiếu căn cứ; công bố số PR không xác định của metric trong tập đang được trình bày |
| PR-MET-03 | Phần tóm tắt nhỏ trong PR-SCR-04, không tạo màn hình thứ năm; cohort của toàn bộ đơn vị mẫu | Kỳ `[01/10/2026 00:00, 08/10/2026 00:00)`, `T` hiện tại, phạm vi; tử số/mẫu số tính được; cohort còn chờ xem xét và chờ chỉnh sửa; số chưa xác định cohort, số thuộc cohort chưa xác định lịch sử trả lại, cùng số chưa xác định tình trạng ngữ cảnh |

Giữ nguyên quy tắc loại dữ liệu thiếu riêng cho từng metric; không thay hồ sơ không xác định thành không chờ/chưa từng trả lại. Thiếu định danh không đếm được PR phải công bố số bản ghi không gắn được PR và giới hạn “Không xác định đầy đủ”. PR-MET-03 mẫu số tính được bằng 0 hiển thị **“Không có dữ liệu”**, kèm nguyên nhân nếu do hồ sơ chưa xác định; không hiển thị 0%. Không bổ sung metric, SLA, target hoặc nhãn quá hạn. Mọi bảng hoặc số liệu minh họa, gồm bản xuất/ảnh/mô tả kết quả, phải giữ nhãn: **“Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.”**

## Đóng góp của 2B cho bảy câu hỏi 2A

| Câu hỏi 2A | Quyết định sử dụng ở prototype | Điểm còn mở |
| --- | --- | --- |
| PR-Q-01 | SIM-01: ba kịch bản định trước, tách điều khiển demo; SIM-04: một bước giờ cho mỗi lần gửi | OD-03 về ngân sách thật còn mở |
| PR-Q-02 | SIM-02: năm nhãn, lỗi tách riêng; SIM-03: thông tin vòng ở lịch sử quy trình | OD-06 còn mở; hình thức hiển thị chờ tham chiếu của chủ dự án |
| PR-Q-03 | SIM-03: hai vai trò/một đơn vị, phạm vi PR và lịch sử quy trình tối thiểu, metric theo nơi xem | OD-07 còn mở; chưa có bảo mật/phân quyền thật |
| PR-Q-04 | Tám trường và validation bổ trợ, danh mục tham chiếu tối thiểu, ngày dd/mm/yyyy và tiền VND | Giá trị danh mục/dữ liệu mẫu cụ thể chưa tạo trong 2B; không chặn quyết định hành vi |
| PR-Q-05 | Không thêm trường bắt buộc; lý do trả lại có căn cứ baseline và cụ thể hóa không trống; không ô lý do từ chối riêng | Không thiết kế từ điển dữ liệu doanh nghiệp hoặc precision nghiệp vụ |
| PR-Q-06 | Bộ nhớ trang, lưu/mở nháp trong phiên, phản hồi/điều hướng hành vi và tải lại/khôi phục | Giới hạn lưu phiên phải được thể hiện khi thiết kế UI sau |
| PR-Q-07 | Cả ba metric trong bốn màn hình; SIM-03 xác định phạm vi, SIM-04 xác định `T`; giữ cohort và dữ liệu thiếu | Là lựa chọn demo khác phương án để PR-MET-03 ngoài demo ở 2A; không sửa 2A hoặc cấp quyền báo cáo thật |

Các câu hỏi hành vi 2A đã được giải quyết ở mức đủ chuẩn bị wireframe. Tham chiếu hình thức do chủ dự án cung cấp sau và dữ liệu mẫu cụ thể được để lại cho giai đoạn được giao tiếp theo. Phần bổ sung sau review xác nhận sở hữu/đơn vị của năm PR và làm rõ `T` trong tài liệu metric theo yêu cầu chủ dự án, để commit cùng tài liệu 2A/2B. Không sửa baseline hoặc nội dung 2A; chưa tạo code, JSON, dataset, backend hay dashboard, chưa bắt đầu wireframe/2C và chưa push.
