# NovaRetail JSC — Nghiên cứu tình huống phân tích nghiệp vụ P2P

## 1. Tổng quan dự án

NovaRetail JSC là **doanh nghiệp bán lẻ giả lập tại Việt Nam** trong nghiên cứu tình huống phân tích quy trình mua hàng đến thanh toán (Procure-to-Pay — P2P). Bài toán là thông tin mua hàng nằm rải rác trong bảng tính, email và hồ sơ của từng bộ phận, khiến việc phê duyệt và đối chiếu chứng từ phải chờ trao đổi thủ công.

Tôi phân tích quy trình hiện tại, đề xuất cách xử lý từng bước và viết yêu cầu phần mềm kèm tiêu chí chấp nhận.

[Đọc case study](./case-study.md) · [Mở demo PR](https://phuoctrong2005.github.io/retail-p2p-ba-case-study/) · [Hướng dẫn sử dụng](prototype/pr/README.md#hướng-dẫn-thử-nhanh) · [Kết quả kiểm chứng](prototype/pr/verification.md)

Prototype minh họa việc tạo, gửi và xem xét yêu cầu mua hàng, xử lý trả lại và theo dõi ba chỉ số PR bằng dữ liệu tổng hợp.

## 2. Bài toán nghiệp vụ

Dữ liệu mua hàng phân tán làm chậm bàn giao, phê duyệt và đối chiếu. Đọc [case study](./case-study.md) để theo dõi mạch vấn đề → quyết định → prototype → kiểm chứng; [phát biểu vấn đề](./01-business-context/problem-statement.md) và [phân tích hiện trạng](./03-as-is-analysis/README.md) giữ căn cứ chi tiết.

## 3. Vai trò và công việc thực hiện

Tôi thực hiện phân tích nghiệp vụ, xây dựng và rà soát tài liệu, vẽ sơ đồ, thiết kế UI và các hoạt động kiểm tra. Codex hỗ trợ triển khai code theo yêu cầu và các quyết định đã thống nhất. [Case study](./case-study.md) trình bày công việc qua ba quyết định BA.

## 4. Phạm vi

**Trong phạm vi phân tích:** mua hàng hóa hữu hình, từ lập PR đến phê duyệt đề nghị thanh toán. Các bước gồm xem xét PR, lập và phê duyệt đơn đặt hàng (PO), ghi phiếu nhận hàng (GR), xử lý hóa đơn, đối chiếu và xử lý ngoại lệ. Tài liệu cũng mô tả yêu cầu xem trạng thái, lịch sử giao dịch và báo cáo mua hàng.

**Ngoài phạm vi:** mua dịch vụ, thực hiện thanh toán ngân hàng, tiếp nhận nhà cung cấp mới và tìm nguồn cung, quản lý kho chi tiết, xử lý thuế, kế toán đầy đủ và thay thế hệ thống quản trị doanh nghiệp (ERP). Điểm kết thúc là đề nghị thanh toán được phê duyệt; việc chuyển tiền nằm ngoài quy trình này. Xem [phạm vi chi tiết](./01-business-context/scope.md).

## 5. Giải pháp đề xuất

Hệ thống quản lý mua hàng được đề xuất sẽ lưu liên kết giữa PR, PO, GR và hóa đơn. Sơ đồ To-Be thể hiện người xử lý từng bước, điều kiện chuyển bước và các nhánh trả lại hoặc chờ bổ sung thông tin.

Xem [sơ đồ To-Be](./assets/diagrams/exports/to-be/p2p-to-be.png), [nguồn Draw.io](./assets/diagrams/sources/to-be/p2p-to-be.drawio) và [quy tắc nghiệp vụ](./04-to-be-design/business-rules.md) để đối chiếu các điều kiện này.

## 6. Sản phẩm và hướng dẫn đọc

**Tài liệu phân tích.** Mở [tài liệu yêu cầu nghiệp vụ (BRD)](./05-brd/business-requirements-document.md) để đọc nhu cầu và phạm vi chung. Dùng bảng dưới đây để tìm tài liệu theo phần việc cần xem.

| Phần việc | Sản phẩm trong repo |
| --- | --- |
| [Bối cảnh nghiệp vụ](./01-business-context/README.md) | Vấn đề, mục tiêu và phạm vi nghiên cứu. |
| [Các bên liên quan](./02-stakeholder-analysis/README.md) | Phân tích vai trò; [danh sách các bên liên quan](./02-stakeholder-analysis/P2P_Stakeholder_Register.xlsx) và [RACI sơ bộ](./02-stakeholder-analysis/Preliminary_RACI_Matrix_P2P.xlsx). |
| [Quy trình hiện tại](./03-as-is-analysis/README.md) | Sơ đồ As-Is, các điểm bất cập và nguyên nhân gây chậm hoặc nhập liệu lặp. |
| [Quy trình đề xuất](./04-to-be-design/README.md) | Sơ đồ To-Be, so sánh với hiện trạng và các quy tắc chuyển bước. |
| [Yêu cầu nghiệp vụ](./05-brd/README.md) | BRD, danh mục yêu cầu và khung xem xét, ký duyệt. |
| [Phân tích hệ thống](./06-system-analysis/README.md) | [Đặc tả 12 UC chính](./06-system-analysis/use-case-specifications.md) và sơ đồ hoạt động. UC-00 là sơ đồ tổng quan, không tính vào 12 UC chính. |
| [Yêu cầu phần mềm](./07-software-requirements/README.md) | [Đặc tả yêu cầu phần mềm (SRS)](./07-software-requirements/srs.md): yêu cầu chức năng, phi chức năng và AC theo dạng Cho trước/Khi/Thì. |
| [Truy vết yêu cầu](./08-traceability/README.md) | [RTM](./08-traceability/requirements-traceability-matrix.md) nối yêu cầu với UC và AC, đồng thời ghi các phần cần bổ sung hoặc còn chờ quyết định. |

[Thiết kế phép đo PR](./08-traceability/pr-metrics-design.md) bổ sung cách xác định số PR đang chờ, thời gian chờ theo vòng xem xét và tỷ lệ PR từng bị trả lại.

**Wireframe tĩnh.** Bộ [wireframe PR](./wireframes/pr/README.md) có bốn màn hình: danh sách của Người yêu cầu, tạo/chỉnh sửa, chi tiết PR và hàng đợi của Quản lý cửa hàng. Tải repository về máy, sau đó mở [wireframes/pr/index.html](./wireframes/pr/index.html) bằng trình duyệt; các nút lưu, gửi và quyết định là mẫu tĩnh. Có thể xem nhanh qua [ảnh hàng đợi](./wireframes/pr/previews/pr-04-queue.png) hoặc [các ảnh tiêu biểu](./wireframes/pr/README.md#ảnh-tiêu-biểu). Hướng dẫn mở, ảnh và phạm vi kiểm tra được ghi trong [README wireframe](./wireframes/pr/README.md#kiểm-tra-và-giới-hạn).

**Prototype tương tác.** Bản [prototype PR](./prototype/pr/README.md) cho phép tạo và lưu PR, gửi và gửi lại, phê duyệt, trả lại, từ chối và xem lịch sử quy trình. Ba chỉ số thể hiện số PR đang chờ xem xét, thời gian chờ theo vòng và tỷ lệ PR từng bị trả lại. Mở [demo công khai](https://phuoctrong2005.github.io/retail-p2p-ba-case-study/) và làm theo [hướng dẫn thử nhanh](./prototype/pr/README.md#hướng-dẫn-thử-nhanh); nếu muốn chạy trên máy, xem [hướng dẫn chạy local](./prototype/pr/README.md#chạy-local). Dữ liệu chỉ tồn tại trong bộ nhớ trang; tải lại hoặc khôi phục sẽ đưa về dữ liệu mẫu.

Xem [tình huống trả lại và gửi lại trong case study](./case-study.md#4-giải-pháp-và-bằng-chứng-kiểm-chứng) hoặc [bộ ảnh prototype và nguồn ghi nhận](./prototype/pr/README.md#ảnh-trực-tiếp-hiện-hành). Ảnh minh họa dữ liệu tổng hợp, không phản ánh trạng thái phiên demo hiện tại.

Tra thuật ngữ tại [glossary](./glossary.md). [Các quyết định nghiệp vụ nền tảng](./08-traceability/baseline-decisions.md) giải thích ranh giới đã chọn; [danh mục sơ đồ](./assets/diagrams/sources/README.md) dẫn tới nguồn Draw.io và ảnh xuất.

## 7. Trạng thái và giới hạn

- Đã có prototype PR truy cập công khai; chưa phải hệ thống vận hành. [Kết quả kiểm chứng](./prototype/pr/verification.md) chỉ xác nhận phạm vi prototype, không đồng nghĩa toàn bộ tiêu chí chấp nhận đã được kiểm thử đạt.
- Dữ liệu và kết quả nghiệp vụ là mô phỏng bằng **dữ liệu tổng hợp**. Các chỉ tiêu trong [mục tiêu dự án](./01-business-context/project-objectives.md) là **mục tiêu giả định**, chưa phải kết quả đo lợi ích vận hành.
- UI chỉ chứng minh phạm vi dữ liệu mẫu của Người yêu cầu REQ-01; chưa kiểm tra với PR của người khác.
- Kiểm tra công khai thực hiện trên Chrome headless, bản desktop. Phân quyền demo, lịch sử quy trình và đồng hồ mô phỏng không chứng minh bảo mật, lịch sử kiểm toán đầy đủ hoặc thời gian xử lý thực tế.
- Vai trò và nhu cầu của các bên liên quan được giả định cho nghiên cứu tình huống. Chưa có phỏng vấn, kiểm thử chấp nhận người dùng (UAT) hoặc stakeholder sign-off; [khung ký duyệt BRD](./05-brd/approval-and-signoff.md) chỉ mô tả việc cần làm.
- Các quyết định còn mở (Open Decision — OD) từ OD-01 đến OD-08 vẫn được ghi tại [RTM](./08-traceability/requirements-traceability-matrix.md), gồm chính sách ngân sách, phê duyệt tài chính bổ sung, dung sai đối chiếu và quyền chi tiết theo vai trò.
- Các khoảng trống bao phủ yêu cầu trong RTM vẫn còn mở. Phần được kiểm chứng một phần hoặc ngoài phạm vi prototype được ghi riêng trong tài liệu kiểm chứng; kết quả prototype không thay đổi coverage của SRS/RTM.
- Placeholder và thông tin chứng từ chưa được bổ sung thuộc **wireframe tĩnh**. Prototype dùng bộ dữ liệu tổng hợp riêng đã được ghi nhận tại [tài liệu dữ liệu](./prototype/pr/data/README.md); không suy giới hạn placeholder của wireframe sang dữ liệu prototype. Nội dung demo chưa được xác minh như chứng từ hoặc nhu cầu mua thực tế.

## 8. Những điểm rút ra từ phân tích

Đọc [ba quyết định BA](./case-study.md#3-phân-tích-và-ba-quyết-định-quan-trọng) và [bài học, giới hạn, hướng tiếp theo](./case-study.md#5-kết-quả-giới-hạn-bài-học-và-hướng-tiếp-theo). Các kiểm soát toàn P2P vẫn được giữ trong [quy tắc nghiệp vụ](./04-to-be-design/business-rules.md) và [quyết định nền tảng](./08-traceability/baseline-decisions.md).
