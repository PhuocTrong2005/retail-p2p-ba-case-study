# NovaRetail JSC — Nghiên cứu tình huống phân tích nghiệp vụ P2P

## 1. Tổng quan dự án

Đây là nghiên cứu tình huống phân tích nghiệp vụ (Business Analysis — BA) cho NovaRetail JSC, một doanh nghiệp bán lẻ Việt Nam giả lập. Hồ sơ đi từ bối cảnh và quy trình hiện trạng (As-Is) đến quy trình đề xuất tương lai (To-Be), yêu cầu và truy vết cho quy trình mua hàng đến thanh toán (Procure-to-Pay — P2P).

## 2. Bài toán nghiệp vụ

Quy trình được mô hình hóa phụ thuộc vào bảng tính, email, phần mềm kế toán và hồ sơ riêng của từng bộ phận. Phê duyệt chậm, nhập liệu lặp lại, đối chiếu ba bên thủ công, kiểm tra ngân sách thiếu nhất quán và dữ liệu phân tán làm hạn chế khả năng theo dõi và truy vết giao dịch.

## 3. Vai trò và công việc thực hiện

Công việc BA trong nghiên cứu tình huống gồm xác định vấn đề, mục tiêu và phạm vi; phân tích các bên liên quan và trách nhiệm; mô hình hóa As-Is, nguyên nhân gốc rễ và To-Be; xây dựng quy tắc, yêu cầu nghiệp vụ, ca sử dụng và đặc tả yêu cầu phần mềm; thiết lập tiêu chí chấp nhận và ma trận truy vết. Các tài liệu, sơ đồ và bảng tính trong kho thể hiện các công việc này; chưa có phỏng vấn các bên liên quan thực tế.

## 4. Phạm vi

**Trong phạm vi:** mua hàng hóa hữu hình, từ tạo yêu cầu mua hàng (PR) đến phê duyệt đề nghị thanh toán; bao gồm đơn đặt hàng (PO), phiếu nhận hàng (GR), hóa đơn, đối chiếu, ngoại lệ, trạng thái, lịch sử kiểm toán và báo cáo cơ bản.

**Ngoài phạm vi:** mua dịch vụ, thực hiện thanh toán ngân hàng, tiếp nhận nhà cung cấp mới và tìm nguồn cung, quản lý kho chi tiết, xử lý thuế, kế toán đầy đủ và thay thế ERP. Xem [phạm vi chi tiết](./01-business-context/scope.md).

## 5. Giải pháp đề xuất

Đề xuất Hệ thống quản lý mua hàng với luồng xử lý tập trung và liên kết PR–PO–GR–hóa đơn. PR phải qua kiểm tra thông tin và ngân sách trước khi Quản lý cửa hàng xem xét. PO cần phê duyệt mua hàng và phê duyệt tài chính bổ sung khi chính sách được cấu hình yêu cầu; đủ điều kiện phát hành khác với đã phát hành.

Hóa đơn có thể được ghi nhận trong khi chờ dữ liệu đối chiếu. **Cả chuẩn bị và gửi đề nghị thanh toán đều yêu cầu kết quả đối chiếu hiện hành đạt**; sau chỉnh sửa ngoại lệ phải đối chiếu lại đạt để xác nhận đã xử lý. **Đề nghị thanh toán đã được phê duyệt** là điểm kết thúc phạm vi, không đồng nghĩa **đã thanh toán**.

## 6. Sản phẩm và hướng dẫn đọc

Đọc theo thứ tự để theo dõi mạch phân tích, hoặc mở giai đoạn cần rà soát:

| Giai đoạn | Nội dung chính |
| --- | --- |
| [01 — Bối cảnh nghiệp vụ](./01-business-context/README.md) | Bài toán, mục tiêu, số liệu giả lập và phạm vi. |
| [02 — Phân tích các bên liên quan](./02-stakeholder-analysis/README.md) | Nhu cầu phối hợp, phân tích ảnh hưởng và ma trận trách nhiệm RACI sơ bộ. |
| [03 — Phân tích hiện trạng](./03-as-is-analysis/README.md) | BPMN As-Is, điểm bất cập, điểm nghẽn và nguyên nhân gốc rễ. |
| [04 — Thiết kế To-Be](./04-to-be-design/README.md) | Quy trình đề xuất, so sánh, bản đồ cải tiến và quy tắc nghiệp vụ. |
| [05 — Yêu cầu nghiệp vụ](./05-brd/README.md) | BRD, danh mục yêu cầu và khung rà soát/ký duyệt đề xuất. |
| [06 — Phân tích hệ thống](./06-system-analysis/README.md) | Ranh giới hệ thống, ca sử dụng và sơ đồ hoạt động. |
| [07 — Yêu cầu phần mềm](./07-software-requirements/README.md) | 16 FR, 4 NFR và 37 tiêu chí chấp nhận cho kiểm chứng tương lai. |
| [08 — Truy vết](./08-traceability/README.md) | RTM, mức độ bao phủ, khoảng thiếu và quyết định còn mở. |

Tài liệu tham chiếu chung: [bảng thuật ngữ](./glossary.md), [Các quyết định nghiệp vụ nền tảng](./08-traceability/baseline-decisions.md) và [danh mục nguồn Draw.io/ảnh xuất theo trang](./assets/diagrams/sources/README.md).

## 7. Trạng thái và giới hạn

Hồ sơ hiện có phục vụ rà soát năng lực BA; một số chính sách và tiêu chí kiểm chứng vẫn cần hoàn thiện. Giải pháp phần mềm vẫn là đề xuất. Doanh nghiệp, số liệu, tình huống và KPI mục tiêu đều giả lập. Chưa có ký duyệt của các bên liên quan thực tế, triển khai, kiểm thử phần mềm, kiểm thử chấp nhận người dùng (UAT) hoặc đo lường lợi ích vận hành.

Có tiêu chí chấp nhận không đồng nghĩa đã kiểm thử đạt hoặc bao phủ đầy đủ. Các khoảng thiếu và quyết định OD-01–OD-08 vẫn mở tại [RTM](./08-traceability/requirements-traceability-matrix.md).

## 8. Những điểm rút ra từ phân tích

- Kiểm tra ngân sách và phê duyệt nghiệp vụ là hai kiểm soát riêng; kiểm tra ngân sách bắt buộc trước khi xem xét PR.
- Cần phân biệt phê duyệt mua hàng bắt buộc, phê duyệt tài chính có điều kiện và hành động phát hành PO.
- Thiếu dữ liệu đối chiếu khác với sai lệch; chỉnh sửa thông tin khác với xác nhận ngoại lệ đã xử lý sau đối chiếu lại đạt.
- Truy vết giúp nối nhu cầu nghiệp vụ với yêu cầu và tiêu chí kiểm chứng, đồng thời chỉ ra chính sách và mức độ bao phủ còn thiếu.
