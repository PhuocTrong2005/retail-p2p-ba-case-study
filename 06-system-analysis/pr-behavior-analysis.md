# Bảng hành vi luồng yêu cầu mua hàng (PR) — Giai đoạn 2A

Tài liệu chuyển yêu cầu hiện hành về yêu cầu mua hàng (Purchase Requisition — PR) thành đầu vào cho wireframe. Nội dung gồm danh mục màn hình đề xuất, hành vi, trường dữ liệu và câu hỏi cần quyết định ở 2B. Các phương án ở đây chưa tạo hoặc phê duyệt quyết định mô phỏng (SIM).

## Căn cứ và quy ước đọc

Đối chiếu Git đầu lượt: nhánh `main`, HEAD `a68dbd88420687db9ac0f9ebc0ae23f15ba6bb8c`, working tree sạch; local đi trước `origin/main` một commit. So với baseline `6d5d936`, chỉ có tài liệu metric được thêm. Không tìm thấy `AGENTS.md` trong kho. Đã kiểm tra các tiền tố `PR-SCR-`, `PR-BHV-`, `PR-Q-` chưa được dùng; các ID dưới đây chỉ định danh phân tích trong tài liệu, không thay ID/mapping yêu cầu.

| Nguồn hiện hành | Nội dung dùng trong 2A |
| --- | --- |
| [Đặc tả UC](./use-case-specifications.md) | UC-01: lập/gửi, lỗi trường, không đủ ngân sách, gửi lại; UC-02: ba quyết định; UC-10: trạng thái; UC-11: lịch sử và giới hạn vai trò; UC-12: báo cáo. UC-10–12 chỉ dùng cho phần xem liên quan PR. |
| [Quy tắc nghiệp vụ](../04-to-be-design/business-rules.md) | BR-01–BR-04: trường/gửi/ngân sách/quyết định; BR-05: chỉ PR đã duyệt mới được xử lý mua hàng; BR-25–BR-27: theo dõi, lịch sử, quyền. |
| [SRS](../07-software-requirements/srs.md) | Mục 2.1: tám trường bắt buộc khi gửi; FR-01–FR-03, FR-14–FR-16, NFR-01/02/04; AC-01–AC-06, AC-20–AC-25, AC-34. AC-26 chỉ củng cố ranh giới PR chưa duyệt, không thiết kế luồng PO. |
| [Quyết định baseline](../08-traceability/baseline-decisions.md) | G1-D03 phân biệt duyệt/từ chối/trả lại; G1-D04 giới hạn hàng hóa hữu hình; G1-D05 hỗ trợ nháp và sửa/gửi lại trong phạm vi. G1-D01/02/06 đã rà, không phát sinh hành vi PR mới. |
| [RTM](../08-traceability/requirements-traceability-matrix.md) | Giữ mapping BRQ-02/03 với FR-01–FR-03, UC-01/02 và AC hiện có; OD-03, OD-06, OD-07 tiếp tục mở. |
| [Glossary](../glossary.md) | Dùng thống nhất Người yêu cầu, Quản lý cửa hàng, nháp, từ chối, trả lại. |
| [Thiết kế metric](../08-traceability/pr-metrics-design.md) | Ba metric, năm sự kiện phân tích, vòng xem xét, tham số thời gian và dữ liệu không xác định. Đây là thiết kế local tại commit `a68dbd8`, không phải nguồn để gán quy tắc mới vào baseline. |

Mức xác định được ghi trên từng hành vi:

- **Đã có căn cứ:** hành vi nghiệp vụ đã có trong các nguồn được chỉ rõ. Không có nghĩa đã thiết kế giao diện, kiểm thử AC hoặc có xác nhận doanh nghiệp thật.
- **Đề xuất thiết kế:** cách nhóm thông tin, màn hình hoặc điều hướng để phục vụ thiết kế tiếp theo; nguồn nghiệp vụ liên quan không quy định chi tiết này.
- **Cần quyết định ở 2B:** lựa chọn mô phỏng còn chặn wireframe/prototype; câu hỏi và phương án đề xuất chưa phải quyết định đã được duyệt.

## Danh mục màn hình đề xuất

| ID | Màn hình chính | Vai trò/ngữ cảnh dự kiến | Lý do nhóm |
| --- | --- | --- | --- |
| PR-SCR-01 | Danh sách PR của Người yêu cầu | Người yêu cầu tìm PR, mở nháp hoặc PR cần chỉnh sửa | Một điểm vào cho công việc của Người yêu cầu; phạm vi “của tôi” là đề xuất, cần PR-Q-03 xác định phạm vi demo. |
| PR-SCR-02 | Tạo/chỉnh sửa PR | Người yêu cầu tạo mới, mở nháp, chỉnh sửa sau lỗi hoặc trả lại | Dùng chung bộ trường và kiểm tra khi gửi, phân biệt rõ lưu nháp với gửi. |
| PR-SCR-03 | Chi tiết PR, thông tin trả lại và lịch sử theo quyền | Người yêu cầu xem thông tin được phép; Quản lý cửa hàng xem xét/ra quyết định; người được quyền lịch sử xem bằng chứng | Dùng chung thông tin PR, tách hành vi theo ngữ cảnh để tránh hai bản chi tiết lệch nhau. Quyền xem lịch sử đầy đủ không tự cấp cho hai vai trò vận hành. |
| PR-SCR-04 | Hàng đợi xem xét PR | Quản lý cửa hàng tìm PR đủ điều kiện đang chờ | Tách công việc ra quyết định khỏi danh sách của Người yêu cầu. Phạm vi cửa hàng/đơn vị phải qua PR-Q-03. |

Cả bốn màn hình đều là **đề xuất thiết kế**; baseline không quy định cấu trúc màn hình. Nhóm thao tác ra quyết định nằm trong PR-SCR-03, nên không cần màn hình chính thứ năm. Chưa xác định bố cục, thành phần giao diện hay cách chuyển trang cụ thể.

## Bảng hành vi theo màn hình

Các trường hợp dưới đây đều yêu cầu người dùng có quyền phù hợp. BR-27, NFR-01 và AC-20 quy định phải kiểm soát quyền; ma trận quyền chi tiết vẫn thuộc OD-07. Tên sự kiện viết hoa chỉ tham chiếu mô hình phân tích metric, không phải hợp đồng log kỹ thuật.

### PR-SCR-01 — Danh sách của Người yêu cầu

| ID | Vai trò/ngữ cảnh và thông tin | Hành động | Điều kiện trước | Phản hồi, dữ liệu/sự kiện | Lỗi/nhánh thay thế | Nguồn | Mức xác định |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PR-BHV-01 | Người yêu cầu; PR ID, mô tả nhu cầu, tình trạng và bước tiếp theo dự kiến | Mở danh sách, chọn PR hoặc bắt đầu tạo mới | Có ngữ cảnh người dùng demo và tập PR được phép xem | Điều hướng đến PR-SCR-02 hoặc PR-SCR-03; không tự phát sinh sự kiện mở vòng | Không có PR phù hợp: thông tin không có kết quả; không để lộ hồ sơ bị hạn chế | Không có nguồn trực tiếp cho cấu trúc danh sách/cột/điều hướng; UC-01 và UC-10, FR-14 hỗ trợ nhu cầu; PR-Q-03 | Đề xuất thiết kế |
| PR-BHV-02 | Người yêu cầu đã lưu nháp; nội dung nháp hiện có | Mở lại nháp | Nháp đã được lưu và người dùng có quyền | Nhận lại nội dung đã lưu để tiếp tục nhập; chưa chuyển xem xét, chưa mở vòng metric | Chưa đủ trường khi mở lại vẫn là nháp; không ép đạt kiểm tra gửi để tiếp tục | FR-01; AC-25; BR-01; G1-D05 | Đã có căn cứ |

### PR-SCR-02 — Tạo/chỉnh sửa

| ID | Vai trò/ngữ cảnh và thông tin | Hành động | Điều kiện trước | Phản hồi, dữ liệu/sự kiện | Lỗi/nhánh thay thế | Nguồn | Mức xác định |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PR-BHV-03 | Người yêu cầu có nhu cầu hàng hóa hữu hình; tám trường tại bảng trường dữ liệu | Tạo PR, nhập thông tin | Người dùng được cấp quyền, đơn vị hợp lệ; nguồn ngân sách giả định sẵn có | Nội dung PR được hình thành để lưu nháp hoặc gửi; chưa mở vòng metric | Không tự yêu cầu danh mục hàng hóa chưa có; chi tiết dữ liệu demo cần PR-Q-04 | UC-01 điều kiện trước và luồng chính; FR-01; BR-01; G1-D04 | Đã có căn cứ |
| PR-BHV-04 | Người yêu cầu đang nhập PR mới hoặc nháp; nội dung đã nhập | Lưu nháp | Có nội dung PR đang nhập; chưa cần đạt đủ trường khi gửi | Giữ nội dung để mở lại; không gửi hoặc chuyển Quản lý cửa hàng; không có `FIRST_VALID_SUBMIT` | Thiếu trường không chặn lưu nháp chỉ vì chưa đạt điều kiện gửi. Cách phản hồi và lưu giữ trong demo: PR-Q-06 | FR-01; BR-01; AC-01, AC-25; G1-D05 | Đã có căn cứ |
| PR-BHV-05 | Người yêu cầu gửi PR thiếu/không hợp lệ; trường đầu và dòng hàng | Gửi | Có PR đang được phép nhập/sửa | Kiểm tra theo SRS 2.1, chỉ rõ lỗi cấp trường và chặn gửi; không mở vòng xem xét | Cho sửa rồi gửi lại; validation thất bại không phải quyết định `REJECT` | UC-01 A1; BR-01; FR-01; NFR-04; AC-01 | Đã có căn cứ |
| PR-BHV-06 | Người yêu cầu; dữ liệu PR đã qua kiểm tra trường, kết quả ngân sách không đạt | Gửi hoặc gửi lại sau khi sửa lỗi ngân sách | PR đủ thông tin để kiểm tra ngân sách áp dụng | Lưu kết quả kiểm tra, chặn chuyển xem xét; cho chỉnh sửa theo UC-01. Chưa có lần gửi hợp lệ thì chưa mở vòng đầu | Không dùng kết quả không đạt như `RETURN_FOR_EDIT` của Quản lý cửa hàng; không tự thêm ghi đè ngân sách. Cách mô phỏng: PR-Q-01 | UC-01 A2; BR-02/03; FR-02; AC-02/03; G1-D05 | Đã có căn cứ |
| PR-BHV-07 | Người yêu cầu gửi thành công lần đầu đến Quản lý cửa hàng; PR và kết quả kiểm tra | Gửi | Trường bắt buộc và ngân sách áp dụng đều đạt; PR chưa có vòng xem xét | Ghi gửi, chuyển Quản lý cửa hàng; theo thiết kế metric là `FIRST_VALID_SUBMIT`, mở vòng đầu khi thực sự chuyển xem xét | Nếu một kiểm tra chưa đạt thì không báo gửi hợp lệ hoặc đưa vào hàng chờ | UC-01 luồng chính/điều kiện sau; BR-01/02; FR-01/02; AC-01–AC-03; thiết kế metric | Đã có căn cứ |
| PR-BHV-08 | Người yêu cầu nhận PR bị Quản lý cửa hàng trả lại; lý do và nội dung PR | Chỉnh sửa, gửi lại | Có quyết định trả lại kèm lý do; có quyền sửa/gửi lại | Kiểm tra lại cả trường bắt buộc và ngân sách; chỉ sau khi đạt và chuyển xem xét mới có `VALID_RESUBMIT`, mở vòng tiếp theo | Trường sai hoặc ngân sách không đạt tiếp tục chặn; vòng cũ đã kết thúc, không mở vòng mới khi kiểm tra thất bại | UC-01 A3; UC-02 A2; BR-04; FR-01–FR-03; AC-06, AC-34; G1-D03; thiết kế metric | Đã có căn cứ |
| PR-BHV-09 | Người yêu cầu trong demo; phản hồi kiểm tra ngân sách | Kích hoạt kịch bản gửi đạt/không đạt | Chưa có chính sách ngân sách chi tiết được chốt | Cần chọn cách tái hiện kết quả mà không tự đặt công thức, số dư hoặc hạn mức | Không tự coi sự cố nguồn ngân sách là kết quả “không đủ ngân sách”; nhánh kỹ thuật chưa được baseline quy định | OD-03; UC-01; FR-02 chỉ quy định kiểm soát nghiệp vụ, không quy định cơ chế mô phỏng; PR-Q-01 | Cần quyết định ở 2B |

Việc người dùng thử gửi lại sau lỗi trường/ngân sách trước khi từng chuyển xem xét, nếu cuối cùng đạt, vẫn mở **vòng đầu** bằng `FIRST_VALID_SUBMIT`. Chỉ gửi lại sau quyết định trả lại của Quản lý cửa hàng mới là `VALID_RESUBMIT` mở vòng tiếp theo theo tài liệu metric. Không đồng nhất thao tác “gửi lại” trong ngôn ngữ thông thường với loại sự kiện phân tích.

### PR-SCR-03 — Chi tiết theo ngữ cảnh

| ID | Vai trò/ngữ cảnh và thông tin | Hành động | Điều kiện trước | Phản hồi, dữ liệu/sự kiện | Lỗi/nhánh thay thế | Nguồn | Mức xác định |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PR-BHV-10 | Người dùng vận hành có quyền; nội dung PR, tình trạng hiện tại và bước tiếp theo | Xem chi tiết | PR tồn tại và được phép truy cập | Hiển thị thông tin/trạng thái hiện tại được phép; không sửa PR hoặc tạo sự kiện vòng do việc xem | Không tìm thấy giao dịch phù hợp: thông tin không có kết quả; thiếu quyền: không lộ dữ liệu hạn chế | UC-10; BR-25/27; FR-14; NFR-01/04; AC-20/21 | Đã có căn cứ |
| PR-BHV-11 | Người yêu cầu mở PR bị trả lại; lý do trả và nội dung cần chỉnh sửa | Xem thông tin trả lại, tiếp tục chỉnh sửa | PR đã trả lại kèm lý do và người dùng có quyền xem/sửa | Hiển thị lý do và bước sửa/gửi lại, gồm kiểm tra lại trường và ngân sách; thao tác sửa thực hiện qua PR-SCR-02 là đề xuất điều hướng | Không có lý do trong dữ liệu là thiếu dữ liệu, không điền lý do giả hoặc suy ra từ lỗi ngân sách | UC-01 A3; UC-02 A2; BR-04; FR-03; NFR-04; AC-06, AC-34; G1-D03 | Đã có căn cứ |
| PR-BHV-12 | Quản lý cửa hàng xem PR đang chờ; nội dung PR và căn cứ kiểm tra đủ điều kiện | Phê duyệt | PR đã gửi hợp lệ, trường và ngân sách đạt, vòng hiện tại đang chờ; có quyền quyết định | Ghi quyết định/người/thời điểm; PR sẵn sàng cho Mua hàng; `APPROVE` đóng vòng hiện tại | PR chưa đủ điều kiện không được coi là đã duyệt; không thêm thao tác sửa PR đã duyệt | UC-02 luồng chính; BR-04/05/26; FR-03; AC-04; G1-D03/D05; thiết kế metric | Đã có căn cứ |
| PR-BHV-13 | Quản lý cửa hàng xem PR đủ điều kiện; nội dung PR | Từ chối | Vòng hiện tại đang chờ và có quyền quyết định | Ghi quyết định, chặn chuyển Mua hàng; `REJECT` đóng vòng; không mở lại/gửi lại chính PR | Không chuyển từ chối sang đường sửa/gửi lại. Baseline chưa bắt buộc lý do từ chối; PR-Q-05 | UC-02 A1/điều kiện sau; BR-04; FR-03; AC-05; G1-D03/D05; thiết kế metric | Đã có căn cứ |
| PR-BHV-14 | Quản lý cửa hàng xem PR đủ điều kiện; lý do trả lại | Trả lại để chỉnh sửa | Vòng hiện tại đang chờ, người dùng có quyền và có lý do trả lại | Yêu cầu/ghi lý do cùng quyết định; trả Người yêu cầu; `RETURN_FOR_EDIT` đóng vòng hiện tại, chờ chỉnh sửa | Thiếu lý do thì chưa đủ điều kiện hoàn tất quyết định trả lại; chi tiết kiểm tra chuỗi và phản hồi demo: PR-Q-05 | UC-02 A2; BR-04; FR-03; AC-06, AC-34; G1-D03; thiết kế metric | Đã có căn cứ |
| PR-BHV-15 | Người có quyền xem lịch sử PR; giao dịch, tác nhân, hành động, thời điểm, quyết định có sẵn | Xem lịch sử chỉ đọc | Có PR và quyền xem lịch sử tương ứng | Hiển thị lịch sử có sẵn trong quyền được cấp; không đổi dữ liệu. Số vòng có thể hỗ trợ diễn giải theo thiết kế metric | Không có lịch sử được phép xem: thông tin phù hợp, không lộ dữ liệu hạn chế. Không mặc định Người yêu cầu/Quản lý cửa hàng thấy toàn bộ lịch sử | UC-11; BR-26/27; FR-15; NFR-02; AC-22; OD-07 | Đã có căn cứ |
| PR-BHV-16 | Hai vai trò vận hành trong demo; tình trạng, nhóm hành động và mức lịch sử được thấy | Xem chi tiết theo ngữ cảnh vai trò | Cần PR-Q-02/03 xác định nhãn và phạm vi demo | Đề xuất cùng PR-SCR-03 có ngữ cảnh xem hoặc quyết định; chưa xác định ẩn/khóa nút, trình bày lịch sử hay nội dung xác nhận | Không suy ra quyền xem lịch sử toàn phần từ việc có quyền xem trạng thái/lý do trả lại | Không có nguồn trực tiếp cho cách trình bày; OD-06/07 và UC-10/11 chỉ đặt ranh giới; PR-Q-02/03 | Cần quyết định ở 2B |

### PR-SCR-04 — Hàng đợi của Quản lý cửa hàng

| ID | Vai trò/ngữ cảnh và thông tin | Hành động | Điều kiện trước | Phản hồi, dữ liệu/sự kiện | Lỗi/nhánh thay thế | Nguồn | Mức xác định |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PR-BHV-17 | Quản lý cửa hàng; PR ID, người/đơn vị yêu cầu, thông tin nhu cầu, thời điểm chuyển xem xét dự kiến | Mở hàng đợi, chọn PR để xem xét | Có tập PR được phép xem và đủ điều kiện đang chờ | Đề xuất đưa đến ngữ cảnh quyết định của PR-SCR-03; mở hàng đợi không tạo sự kiện mở/đóng vòng | Nháp, kiểm tra thất bại, đang chờ Người yêu cầu sửa, đã duyệt/từ chối không thuộc hàng chờ; cột và thứ tự danh sách chưa do baseline quy định | Không có nguồn trực tiếp cho màn hình/cột; UC-02 điều kiện trước, FR-03 hỗ trợ mục đích; thiết kế PR-MET-01; PR-Q-03 | Đề xuất thiết kế |
| PR-BHV-18 | Quản lý cửa hàng trong demo; số đang chờ và thời gian chờ từng PR | Xem thông tin metric trong phạm vi demo | Cần xác định tập hồ sơ, `T` cố định và khả năng quan sát theo OD-07 | Đề xuất PR-MET-01 ở hàng đợi, PR-MET-02 theo từng PR; giữ số không xác định đi kèm | Không gán số toàn công ty cho phạm vi người dùng; không thêm SLA hoặc nhãn quá hạn | Vị trí là đề xuất, không được FR-16 quy định cho Quản lý cửa hàng; nguồn công thức: thiết kế metric; PR-Q-03/07 | Cần quyết định ở 2B |

## Phân loại trường dữ liệu

BR-01 và SRS 2.1 đã xác định **tám trường bắt buộc khi gửi**, không bắt buộc phải đầy đủ khi lưu nháp. Đây là giả định baseline của case study, chưa được doanh nghiệp thật xác nhận. Không còn câu hỏi “tám trường này có bắt buộc khi gửi không”; câu hỏi 2B là cách thể hiện các giả định và dữ liệu tham chiếu trong demo. Dữ liệu nhập cũng là thông tin đọc để Quản lý cửa hàng xem xét; không tự cấp quyền sửa cho người xem xét.

| Trường | Mục đích và nguồn | Baseline xác định bắt buộc? | Validation có căn cứ | Chi tiết còn thiếu cần quyết định |
| --- | --- | --- | --- | --- |
| Người yêu cầu | Xác định người đề nghị; hồ sơ đăng nhập theo SRS 2.1 | Có, khi gửi | Xác định được người yêu cầu đã xác thực | Danh tính đại diện trong demo, cách thể hiện; không tự cho đổi người yêu cầu. PR-Q-03/04 |
| Cửa hàng / Bộ phận yêu cầu | Xác định đơn vị; danh mục đơn vị tổ chức giả định trong SRS 2.1 | Có, khi gửi | Đơn vị đang hoạt động, người yêu cầu được phép dùng | Giá trị đại diện, cách chọn/hiển thị và phạm vi được phép vẫn phụ thuộc OD-07. PR-Q-03/04 |
| Trung tâm chi phí | Gắn nhu cầu với đơn vị; danh mục trung tâm chi phí giả định trong SRS 2.1 | Có, khi gửi | Đang hoạt động, hợp lệ với đơn vị đã chọn | Giá trị và quan hệ đơn vị–trung tâm chi phí cho demo; không tạo danh mục doanh nghiệp mới. PR-Q-04 |
| Lý do nghiệp vụ | Giải thích nhu cầu; Người yêu cầu nhập | Có, khi gửi | Không rỗng sau bỏ khoảng trắng đầu/cuối | Độ dài, định dạng chưa quy định; chỉ dùng kiểm tra tối thiểu đã có nếu được chọn ở 2B. PR-Q-04 |
| Ngày cần hàng | Thể hiện nhu cầu thời gian; Người yêu cầu nhập | Có, khi gửi | Ngày lịch hợp lệ; không mặc định phải là ngày tương lai | Định dạng nhập/hiển thị; không bổ sung hạn ngày. PR-Q-04 |
| Mô tả hàng hóa hữu hình | Xác định hàng cần mua; nhập theo từng dòng | Có, khi gửi; ít nhất một dòng | Mô tả mỗi dòng khác rỗng; không giả định có danh mục hàng | Cách biểu diễn nhiều dòng; định dạng/độ dài chưa có; không tự thêm trường bắt buộc. PR-Q-04 |
| Số lượng yêu cầu | Nhu cầu từng dòng; Người yêu cầu nhập | Có, khi gửi, từng dòng | Dạng số và lớn hơn 0 | Số chữ số thập phân, đơn vị tính chưa được quy định. PR-Q-04/05 |
| Đơn giá ước tính | Giá trị ước tính từng dòng; Người yêu cầu nhập | Có, khi gửi, từng dòng | Dạng số và không âm | Tiền tệ, cách nhập/hiển thị số và độ chính xác chưa chốt; không suy ra công thức ngân sách. PR-Q-04/05 |
| Lý do trả lại | Giải thích việc cần sửa; Quản lý cửa hàng nhập, Người yêu cầu xem | Có khi quyết định trả lại; UC-02, FR-03, AC-06/34 | Phải có lý do cùng quyết định; chưa quy định độ dài hoặc kiểm tra khoảng trắng cụ thể | Kiểm tra chuỗi tối thiểu cho demo và cách báo thiếu lý do. PR-Q-05 |
| Lý do từ chối / ghi chú quyết định khác | Chỉ là trường ứng viên nếu demo cần giải thích | Chưa xác định bắt buộc; không lấy yêu cầu lý do trả lại áp sang từ chối/phê duyệt | Chưa có validation riêng trong UC-02/FR-03/AC-04/05 | Có cần xuất hiện hay bỏ khỏi demo; đề xuất bỏ để giữ phạm vi tối thiểu. PR-Q-05 |
| PR ID, tình trạng hiện tại, bước tiếp theo | Xác định hồ sơ và theo dõi; UC-10, FR-14, AC-21; `pr_id` của metric | Không phải trường Người yêu cầu bắt buộc nhập trong SRS 2.1 | Không có định dạng mã hoặc tập tên trạng thái cuối cùng; định danh ổn định là quy ước phân tích metric | Mã hiển thị, nhãn tình trạng và bước tiếp theo; không chốt state model. PR-Q-02 |
| Kết quả kiểm tra ngân sách | Giải thích cổng chuyển xem xét; FR-02, AC-02/03 | Phải kiểm tra áp dụng; kết quả không đạt phải lưu; không phải đầu vào người dùng | Chỉ chuyển xem xét sau đạt; chưa có công thức, hạn mức hoặc số dư | Cách mô phỏng đạt/không đạt; có cần hiển thị chi tiết số tiền hay chỉ kết quả. PR-Q-01 |
| Lịch sử: người, hành động/quyết định, thời điểm, PR bị tác động | Truy vết; FR-15, NFR-02, AC-22 | Thông tin kiểm toán bắt buộc của hành động trọng yếu; không phải trường tạo PR | Phải xác định được các thành phần này; thời hạn lưu trữ chưa chốt | Mức lịch sử mỗi vai trò demo được xem và cách hiển thị thời gian. PR-Q-03/07 |
| Vòng, mốc mở vòng, thứ tự và tham chiếu sự kiện | Hỗ trợ metric và giải thích chuỗi xem xét; tài liệu metric local | Trường phân tích đề xuất, không bổ sung vào danh sách bắt buộc nhập của baseline | Theo tài liệu metric; không đoán khi thiếu/thứ tự mâu thuẫn | Có cần hiển thị số vòng cho người dùng demo; không yêu cầu người dùng tự nhập metadata. PR-Q-02/07 |

Không tự bổ sung tổng tiền, tiền tệ, đơn vị tính hoặc trường bổ sung thành bắt buộc. Nếu muốn thể hiện các thông tin này trong demo, PR-Q-05 phải làm rõ nhu cầu và phạm vi; chưa lập công thức tính hoặc chính sách kiểm tra mới.

## Phân biệt hành vi, nhãn và vòng xem xét

| Khái niệm | Căn cứ và hệ quả | Phần hiển thị chưa chốt |
| --- | --- | --- |
| Lưu nháp / gửi | Lưu nháp giữ nội dung chưa đầy đủ và không chuyển xem xét; gửi chạy các kiểm tra theo UC-01 | Lời phản hồi lưu/gửi và cách điều hướng thuộc thiết kế, PR-Q-02/06 |
| Validation thất bại / từ chối | Lỗi kiểm tra chặn trước xem xét; từ chối là quyết định của Quản lý cửa hàng đóng vòng đã mở và không mở lại cùng PR | Cách hiển thị lỗi khác quyết định cần chốt ở PR-Q-02; không coi lỗi là `REJECT` |
| Không đạt ngân sách / trả lại của Quản lý cửa hàng | UC-01 A2 chặn trước khi chuyển; UC-02 A2 là quyết định có lý do trong vòng xem xét. Chỉ loại thứ hai là `RETURN_FOR_EDIT` | Đề xuất phân biệt bằng nhãn “Kiểm tra ngân sách không đạt” và “Trả lại để chỉnh sửa”; chưa phê duyệt bộ nhãn |
| Trả lại / từ chối | Trả lại cho phép sửa và kiểm tra lại trước vòng mới; từ chối không mở lại/gửi lại chính PR, theo G1-D03 | Nhãn “Chờ chỉnh sửa” là đề xuất diễn giải bước tiếp theo, không phải trạng thái mới đã chốt |
| Đang chờ / đã duyệt / đã từ chối | Các tình huống nghiệp vụ có căn cứ trong UC-01/02; mô hình trạng thái cuối cùng vẫn thuộc OD-06 | “Chờ xem xét”, “Đã phê duyệt”, “Đã từ chối”, “Nháp” là từ ngữ đề xuất để dùng nhất quán trong demo; bộ nhãn đầy đủ và cách dùng phải qua PR-Q-02 |

Không đưa hủy/xóa, sửa PR đã duyệt hoặc mở lại PR bị từ chối vào hành vi hay danh mục màn hình. Kết quả duyệt chỉ được mô tả là sẵn sàng cho Mua hàng, dừng thiết kế tại ranh giới PR.

## Liên kết với ba metric

| Metric | Vị trí đề xuất | Quần thể và thông tin phải giữ | Điểm chờ 2B |
| --- | --- | --- | --- |
| PR-MET-01 | PR-SCR-04, thông tin tổng hợp hàng chờ trong phạm vi demo | PR đã chuyển hợp lệ, vòng hiện tại còn mở tại `T`; không gồm nháp, kiểm tra thất bại hoặc chờ Người yêu cầu sửa. Đi kèm số PR không xác định riêng theo thiết kế metric | PR-Q-03/07 xác định phạm vi quan sát; chưa gán cho Quản lý cửa hàng quyền xem số toàn công ty. Không đổi thành số đếm toàn bộ PR cá nhân |
| PR-MET-02 | Theo từng PR ở PR-SCR-04, có thể xem lại ở PR-SCR-03 | Chỉ PR thuộc PR-MET-01; giờ liên tục từ mở vòng hiện tại đến `T`. Ngoài phạm vi xác định được: “Không áp dụng”; thiếu căn cứ: “Không xác định…”; giữ công bố số PR không xác định tương ứng | PR-Q-07 chốt có dùng trong demo và `T` cố định; không mặc định quyền xem hoặc thêm SLA/target/quá hạn |
| PR-MET-03 | Đề xuất để ngoài bốn màn hình nghiệp vụ của 2A; dành cho ngữ cảnh tổng hợp sau khi xác định phạm vi | Cohort theo vòng đầu mở ở `[S, E)`, quyết định trả lại đến và gồm `T`; đếm PR riêng biệt. Giữ tử/mẫu số tính được, hai số ngữ cảnh trong cohort và các số không xác định; mẫu số 0: “Không có dữ liệu” | PR-Q-07 cân nhắc không đưa vào demo PR hiện tại. Nếu muốn đưa vào, phải xác định người xem theo OD-07; FR-16/UC-12 nêu Trưởng bộ phận mua hàng/Tài chính, không mặc định Quản lý cửa hàng hoặc Người yêu cầu có quyền báo cáo |

Nguồn duy nhất của công thức và xử lý thiếu dữ liệu là [thiết kế metric đã có](../08-traceability/pr-metrics-design.md). Giữ `[S, E)`, `S < E ≤ T`, sự kiện đến và gồm `T`, múi giờ `Asia/Ho_Chi_Minh`, thứ tự nguồn khi trùng thời điểm và cách làm tròn đã xác định. Không suy ra đồng hồ chạy thực từ thao tác demo; cách minh họa metric trước/sau thao tác cần PR-Q-07 quyết định.

PR-BHV-07 mở vòng đầu; PR-BHV-08 mở vòng tiếp theo sau trả lại; PR-BHV-12/13/14 lần lượt đóng vòng bằng `APPROVE`/`REJECT`/`RETURN_FOR_EDIT`. PR-BHV-03/04/05/06 và thao tác xem không mở/đóng vòng. Đây là liên kết ngữ nghĩa giữa hành vi và thiết kế phân tích, chưa quy định API, payload, cơ chế lưu log hoặc kiến trúc event sourcing.

Nếu dùng lại năm ví dụ metric về sau, phải giữ nhãn **“Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.”** trong màn hình, ảnh xuất và phần mô tả kết quả có số liệu. 2A không tạo bộ dữ liệu hoặc tính lại metric mới.

## Đầu vào cần quyết định ở 2B

Các câu hỏi dưới đây chặn lựa chọn cụ thể cho wireframe/prototype. Cột phương án là đề nghị để review ở 2B, chưa phải SIM đã tạo, chưa là chính sách nghiệp vụ và không đóng OD.

| ID | Câu hỏi cần quyết định | Nguồn liên quan | Vì sao cần trước wireframe/prototype? | Phương án đơn giản đề xuất, chưa chốt |
| --- | --- | --- | --- | --- |
| PR-Q-01 | Mô phỏng kết quả kiểm tra ngân sách thế nào, hiển thị kết quả ở mức nào? | UC-01 A2; BR-02/03; FR-02; AC-02/03; OD-03; PR-BHV-06/09 | Phải tái hiện đạt/không đạt và phản hồi gửi, nhưng chưa có công thức, nguồn hoặc chính sách ngân sách chi tiết | Kịch bản minh họa định trước “đạt/không đạt”, ghi rõ mô phỏng, chỉ hiển thị kết quả; không tính số dư/hạn mức hoặc cho người phê duyệt ghi đè |
| PR-Q-02 | Dùng bộ nhãn tình trạng, lỗi và bước tiếp theo nào; có hiển thị vòng không? | UC-01/02/10; FR-14; NFR-04; AC-34; OD-06; thiết kế metric | Cần phân biệt nháp, gửi bị chặn, chờ quyết định, chờ sửa và kết quả cuối mà không dựng state model mới | Dùng các nhãn diễn giải trong bảng phân biệt; tách kết quả kiểm tra khỏi quyết định; số vòng chỉ khi giúp giải thích gửi lại. Chốt cách đặt nhãn ở 2B |
| PR-Q-03 | Hai vai trò demo được xem những PR nào, thực hiện thao tác nào và xem lịch sử đến đâu? | UC-01/02/10/11; BR-27; NFR-01; AC-20/21/22/34; OD-07 | Chặn nội dung danh sách, hàng đợi, chi tiết, nhóm thao tác và metric. UC-11 không mặc định cấp toàn bộ lịch sử cho hai vai trò vận hành | Giới hạn ngữ cảnh demo vào một đơn vị đại diện, Người yêu cầu lập/sửa PR phù hợp, Quản lý cửa hàng quyết định PR đủ điều kiện; Người yêu cầu xem lý do trả lại theo AC-34. Full history chỉ khi phạm vi demo được xác nhận riêng; không tạo ma trận quyền doanh nghiệp |
| PR-Q-04 | Thể hiện tám trường đã có và dữ liệu tham chiếu trong demo thế nào? | BR-01; SRS 2.1; FR-01; AC-01/25 | Cần cách nhập/xem đơn vị, trung tâm chi phí, nhiều dòng và số/ngày; không thể tự tạo danh mục hoặc quy tắc định dạng được duyệt | Giữ nguyên tám trường và validation baseline; chọn giá trị đại diện tối thiểu ở giai đoạn sau, dùng mô tả hàng hóa nhập trực tiếp; định dạng chỉ ghi là quy ước demo |
| PR-Q-05 | Có cần trường ngoài tám trường tạo PR và lý do trả lại không? Kiểm tra lý do trả lại trong demo thế nào? | SRS 2.1; UC-02 A2; FR-03; AC-04–AC-06/34 | Chặn sự xuất hiện của đơn vị tính/tiền tệ/ghi chú và dấu bắt buộc; lý do từ chối chưa có căn cứ bắt buộc, độ dài lý do trả lại chưa chốt | Không thêm trường bắt buộc. Đề xuất bỏ ghi chú quyết định khác và các trường chưa cần; lý do trả lại kiểm tra khác rỗng sau bỏ khoảng trắng như quy ước demo cần duyệt, không gán quy tắc này cho baseline |
| PR-Q-06 | Lưu nháp, mở lại và phản hồi sau thao tác được tái hiện ở mức nào trong prototype? | FR-01; AC-25; UC-01; PR-BHV-02/04 | Cần phân biệt phản hồi lưu với gửi và chứng minh mở lại nội dung; baseline không chọn cách lưu giữ cho prototype | Thể hiện lưu rồi mở lại trong cùng phiên demo; không thêm autosave hoặc cam kết lưu bền. Mức phản hồi/điều hướng cụ thể chốt ở 2B |
| PR-Q-07 | Dùng metric nào trong demo, ở đâu, với phạm vi và mốc thời gian nào; minh họa kết quả sau thao tác ra sao? | Thiết kế metric; FR-16; AC-23/24; UC-12; OD-07 | Cần tránh số công ty trong phạm vi cá nhân/cửa hàng và tránh tính bằng đồng hồ thật; PR-MET-03 cần ngữ cảnh cohort riêng | Cân nhắc chỉ PR-MET-01/02 ở hàng đợi/chi tiết; giữ `T` cố định và ghi phạm vi. Để PR-MET-03 ngoài demo nghiệp vụ này. Nếu cần so sánh trước/sau, chọn rõ ảnh chụp cố định và sự kiện đến `T` thay vì tự đổi công thức |

## Ranh giới hoàn thành 2A

Đã đối chiếu hành vi tạo/lưu/mở nháp, lỗi trường, ngân sách không đạt, gửi hợp lệ, ba quyết định, sửa/gửi lại, lý do trả lại và lịch sử với nguồn hiện hành. Các lựa chọn màn hình là đề xuất; các câu hỏi PR-Q-01–PR-Q-07 được giữ chờ 2B. OD-03/06/07 vẫn mở. Tài liệu này không bổ sung AC, yêu cầu, metric, quyền chi tiết hoặc quyết định SIM; không sửa năm ví dụ metric hay các tài liệu đã chốt.
