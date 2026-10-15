# Bảng thuật ngữ

Bảng này thống nhất cách gọi trong nghiên cứu tình huống của NovaRetail JSC. Lần đầu trong mỗi tài liệu dùng tên tiếng Việt kèm tiếng Anh hoặc viết tắt; các lần sau dùng tiếng Việt hoặc viết tắt. ID, mã chứng từ, đường dẫn và ký hiệu mô hình được giữ nguyên.

| Thuật ngữ tiếng Anh | Tên tiếng Việt | Viết tắt | Ghi chú phân biệt |
| --- | --- | --- | --- |
| Procure-to-Pay | Quy trình mua hàng đến thanh toán | P2P | Phạm vi mô hình này chỉ đến phê duyệt đề nghị thanh toán; không thực hiện thanh toán ngân hàng. |
| Purchase Requisition | Yêu cầu mua hàng | PR | Đề xuất nhu cầu mua hàng nội bộ. |
| Purchase Order | Đơn đặt hàng | PO | Đủ điều kiện phát hành khác với đã phát hành cho nhà cung cấp. |
| Goods Receipt | Phiếu nhận hàng | GR | Ghi nhận hàng hóa thực nhận; không mở rộng sang nghiệm thu dịch vụ. |
| Supplier Invoice | Hóa đơn nhà cung cấp | — | Có thể ghi nhận khi còn chờ dữ liệu đối chiếu. |
| Payment Request | Đề nghị thanh toán | — | Phê duyệt đề nghị không đồng nghĩa đã thanh toán. |
| Budget Validation | Kiểm tra ngân sách | — | Kiểm soát bắt buộc trước xem xét nghiệp vụ; không chốt cách tính ngân sách. |
| Three-Way Matching | Đối chiếu ba bên | — | Đối chiếu PO, GR và hóa đơn theo chính sách áp dụng. |
| Matching Exception | Ngoại lệ đối chiếu | — | Đối chiếu không đạt tạo ngoại lệ; thiếu dữ liệu là chờ thông tin. |
| Correction | Chỉnh sửa / khắc phục thông tin | — | Ghi nhận chỉnh sửa chưa xác nhận ngoại lệ đã được xử lý. |
| Resolved | Đã xử lý | — | Chỉ xác nhận nhãn này sau khi đối chiếu lại đạt; ghi nhận chỉnh sửa hoặc tự đặt trạng thái không đủ. |
| Re-match | Đối chiếu lại | — | Bắt buộc để xác nhận xử lý ngoại lệ sau chỉnh sửa. |
| Return for Revision | Trả lại để chỉnh sửa | — | Có lý do, cho phép sửa/gửi lại theo luồng đã quy định. |
| Reject | Từ chối | — | PR bị từ chối không có đường mở lại/gửi lại trong đường cơ sở. |
| Approve / Approved | Phê duyệt / Đã phê duyệt | — | Chỉ kết quả phê duyệt nghiệp vụ tương ứng. |
| Eligible to Issue | Đủ điều kiện phát hành | — | Không tự khẳng định PO đã được phát hành. |
| Issued | Đã phát hành | — | PO đã được phát hành; khác với đủ điều kiện. |
| Payment Request Approved | Đề nghị thanh toán đã được phê duyệt | — | Điểm kết thúc phạm vi mô hình; không phải đã thanh toán. |
| Paid | Đã thanh toán | — | Ngoài điểm kết thúc mô hình: đề nghị thanh toán đã được phê duyệt. |
| Pending | Đang chờ / Chưa chốt | — | Giao dịch đang chờ thông tin/xử lý; chính sách chưa chốt tùy ngữ cảnh. |
| Acceptance Criteria | Tiêu chí chấp nhận | AC | Có tiêu chí không đồng nghĩa đã kiểm thử đạt. |
| Coverage | Mức độ bao phủ | — | Phân biệt bao phủ một phần, có tiêu chí và đã thực hiện kiểm tra. |
| Open Decision | Quyết định còn mở | OD | Chưa có chính sách được chốt. |
| Business Analysis | Phân tích nghiệp vụ | BA | Nghiên cứu tình huống trong hồ sơ năng lực. |
| Business Requirement | Yêu cầu nghiệp vụ | BRQ | Giữ nguyên mã yêu cầu. |
| Business Rule | Quy tắc nghiệp vụ | BR | Giữ nguyên mã quy tắc. |
| Functional Requirement | Yêu cầu chức năng | FR | Giữ mức bắt buộc của yêu cầu. |
| Non-functional Requirement | Yêu cầu phi chức năng | NFR | Không suy ra mục tiêu định lượng chưa được phê duyệt. |
| Business Requirements Document | Tài liệu yêu cầu nghiệp vụ | BRD | Không có ký duyệt doanh nghiệp thật. |
| Software Requirements Specification | Đặc tả yêu cầu phần mềm | SRS | Đặc tả cho kiểm chứng tương lai. |
| Requirements Traceability Matrix | Ma trận truy vết yêu cầu | RTM | Liên kết yêu cầu và tiêu chí; không phải kết quả kiểm thử. |
| Use Case | Ca sử dụng | UC | Có 12 UC chính; UC-00 là tổng quan. |
| As-Is / To-Be | Hiện trạng / Đề xuất tương lai | — | Mô hình giả lập; không khẳng định đã triển khai. |
| Baseline | Đường cơ sở | — | Nội dung tham chiếu đã thống nhất cho nghiên cứu tình huống. |
| Stakeholder | Bên liên quan | — | Vai trò giả lập trong nghiên cứu tình huống. |
| Requester / Store Employee | Người yêu cầu / Nhân viên cửa hàng | — | Tạo và gửi PR. |
| Store Manager | Quản lý cửa hàng | — | Phê duyệt nghiệp vụ của PR. |
| Procurement Officer | Nhân viên mua hàng | — | Thực hiện nghiệp vụ mua hàng. |
| Procurement Manager | Trưởng bộ phận mua hàng | — | Phê duyệt mua hàng bắt buộc cho mọi PO. |
| Warehouse Staff | Nhân viên kho | — | Nhận hàng và ghi nhận GR. |
| AP Accountant | Kế toán công nợ phải trả | AP | Điều phối xử lý hóa đơn và ngoại lệ; hệ thống thực hiện so sánh tự động. |
| Finance Manager | Trưởng bộ phận tài chính | — | Phê duyệt tài chính bổ sung theo điều kiện; phê duyệt đề nghị thanh toán. |
| Chief Financial Officer | Giám đốc tài chính | CFO | Nhà bảo trợ cấp điều hành; không phê duyệt PO vận hành. |
| Internal Audit | Kiểm toán nội bộ | — | Rà soát bằng chứng trong quyền được cấp. |
| IT Team | Bộ phận công nghệ thông tin | IT | Hỗ trợ kỹ thuật. |
| Supplier | Nhà cung cấp | — | Phạm vi dùng nhà cung cấp hiện có đã phê duyệt. |
| Supplier Master | Danh mục nhà cung cấp | — | Không bao gồm tiếp nhận/thẩm định nhà cung cấp mới. |
| Budget Data Source | Nguồn dữ liệu ngân sách | — | Nguồn hỗ trợ kiểm tra; không phải chức năng lập/phân bổ ngân sách. |
| Procurement Management System | Hệ thống quản lý mua hàng | — | Ranh giới hệ thống được đề xuất. |
| Responsible / Accountable / Consulted / Informed | Thực hiện / Chịu trách nhiệm cuối cùng / Được tham vấn / Được thông báo | R/A/C/I | Ma trận trách nhiệm con người không cấp quyền hệ thống. |
| Key Performance Indicator | Chỉ số hiệu quả | KPI | Giữ nguyên mục tiêu và các lựa chọn đo lường còn mở. |
| Audit Trail / Audit History | Dấu vết kiểm toán / Lịch sử kiểm toán | — | Bằng chứng hành động, người thực hiện, thời điểm và giao dịch liên quan. |
| User Acceptance Testing | Kiểm thử chấp nhận người dùng | UAT | Chưa thực hiện; không có xác nhận nghiệm thu. |
| Stakeholder Sign-Off | Ký duyệt của các bên liên quan | — | Chưa có ký duyệt doanh nghiệp thật. |
| Rich Picture | Bức tranh tổng thể | — | Raster gốc được giữ nguyên; chú giải được Việt hóa. |
| Extension Point | Điểm mở rộng | — | Giữ nguyên ký hiệu UML `<<extend>>` và `<<include>>`. |
| Gateway / Merge / Join | Cổng điều kiện / Điểm hợp luồng thay thế / Điểm đồng bộ luồng song song | — | Không đổi loại nút hoặc logic trong lượt dịch. |
| Shall / Must; Should; May | Phải; Nên; Có thể / Được phép | — | Giữ đúng mức bắt buộc, khuyến nghị và cho phép theo ngữ cảnh. |
| Proposed / Deferred | Đề xuất / Hoãn đặc tả | — | Không diễn đạt thành quyết định đã chốt. |
