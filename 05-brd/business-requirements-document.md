# Tài liệu yêu cầu nghiệp vụ

## NovaRetail JSC — Tối ưu hóa quy trình mua hàng đến thanh toán

## 1. Mục đích và đường cơ sở

Tài liệu yêu cầu nghiệp vụ (Business Requirements Document — BRD) này nêu nhu cầu cấp nghiệp vụ cho quy trình mua hàng đến thanh toán (Procure-to-Pay — P2P) đề xuất của NovaRetail. Đây là đường cơ sở nghiệp vụ cho danh mục chi tiết tại [requirements-catalog.md](./requirements-catalog.md), các tương tác hệ thống ở [Giai đoạn 06](../06-system-analysis/README.md) và đặc tả yêu cầu phần mềm (SRS) ở [Giai đoạn 07](../07-software-requirements/README.md).

Dự án là nghiên cứu tình huống bán lẻ Việt Nam giả lập. Mọi khối lượng, số liệu đường cơ sở, mục tiêu và tình huống đều giả lập. Tài liệu không ghi nhận triển khai, kiểm thử hoặc phê duyệt của các bên liên quan.

### Ranh giới phạm vi

Đường cơ sở nghiên cứu tình huống bao gồm mua hàng hóa hữu hình (hàng bán lại, vật tư vận hành, văn phòng phẩm, thiết bị). Bắt đầu khi người yêu cầu được cấp quyền tạo yêu cầu mua hàng (Purchase Requisition — PR) và kết thúc khi đề nghị thanh toán (Payment Request) được phê duyệt. Mua dịch vụ và nghiệm thu/đối chiếu dịch vụ ngoài đường cơ sở này. Phạm vi gồm xử lý PR và đơn đặt hàng (Purchase Order — PO), kiểm tra ngân sách, chọn nhà cung cấp đã phê duyệt, phiếu nhận hàng (Goods Receipt — GR), xử lý hóa đơn nhà cung cấp, đối chiếu ba bên, ngoại lệ đối chiếu, theo dõi giao dịch, lịch sử kiểm toán và báo cáo vận hành cơ bản. Thực hiện và đối soát thanh toán ngân hàng, tiếp nhận nhà cung cấp mới, tìm nguồn cung chiến lược, quản lý kho chi tiết, xử lý thuế và thay thế toàn bộ hệ thống hoạch định nguồn lực doanh nghiệp (ERP) ngoài phạm vi. Phê duyệt đề nghị thanh toán hoàn tất quy trình được mô hình hóa; không có nghĩa đã thanh toán (Paid) hoặc nhà cung cấp đã nhận tiền.

## 2. Bối cảnh và vấn đề nghiệp vụ

Quy trình P2P được mô hình hóa của NovaRetail dùng bảng tính, email, phần mềm kế toán và hồ sơ riêng của từng bộ phận. Luồng phân tán này tạo thời gian chờ phê duyệt, nhập liệu lặp lại, khó theo dõi trạng thái, đối chiếu thủ công, kiểm tra ngân sách thiếu nhất quán và lịch sử giao dịch chưa đầy đủ.

| ID | Vấn đề |
| --- | --- |
| PP-01 | Phê duyệt PO quá lâu. |
| PP-02 | Dữ liệu mua hàng phân tán. |
| PP-03 | Đối chiếu ba bên thủ công. |
| PP-04 | Khó theo dõi trạng thái PR và PO. |
| PP-05 | Dấu vết kiểm toán hạn chế. |
| PP-06 | Kiểm soát ngân sách thiếu nhất quán. |
| PP-07 | Dữ liệu mua hàng được nhập lặp lại. |

Nguồn phân tích chính là RC-01 (chưa có luồng phê duyệt PO chuẩn hóa), RC-02 (chưa có luồng dữ liệu mua hàng tích hợp), RC-03 (chưa có dữ liệu chứng từ tích hợp hoặc năng lực đối chiếu) và khoảng thiếu kiểm soát ngân sách. Phân tích đầy đủ ở [Giai đoạn 03](../03-as-is-analysis/README.md).

## 3. Mục tiêu và chỉ số đo

| ID | Mục tiêu | Chỉ số đo và đích cần đạt |
| --- | --- | --- |
| OBJ-01 | Rút ngắn chu kỳ phê duyệt PO. | Thời gian trung bình từ gửi PO đến phê duyệt cuối cùng: dưới 1 ngày làm việc (mục tiêu giả lập). |
| OBJ-02 | Giảm nhập liệu thủ công lặp lại. | Không quá một điểm nhập ban đầu cho thông tin giao dịch có thể tái sử dụng. |
| OBJ-03 | Cải thiện khả năng theo dõi và tính nhất quán dữ liệu. | 100% giao dịch PR và PO trong phạm vi có trạng thái xử lý có thể xem; ít nhất 95% giao dịch P2P trong phạm vi được quản lý qua quy trình tập trung. |
| OBJ-04 | Củng cố kiểm soát mua hàng và hóa đơn. | 100% PR thuộc diện áp dụng được kiểm tra ngân sách trước phê duyệt nghiệp vụ; ít nhất 80% hóa đơn đủ điều kiện được xử lý qua đối chiếu ba bên tự động, gồm cả kết quả không đạt chuyển xử lý ngoại lệ. |
| OBJ-05 | Cải thiện truy vết. | 100% hành động trọng yếu thực hiện qua quy trình đề xuất được ghi nhận. |

**Định nghĩa OBJ-03.** Chỉ số 95% là tỷ lệ giao dịch P2P trong phạm vi được quản lý qua quy trình tập trung. Đây không phải chỉ số khả năng truy cập thông tin. Mục tiêu được giữ từ đường cơ sở mục tiêu dự án; cách diễn đạt tại đây và trong danh mục được đồng bộ để loại bỏ sự mơ hồ trước đó.

**Quy ước đo lường.** OBJ-01 vẫn từ gửi đến phê duyệt cuối cùng; lịch làm việc, chu kỳ trả lại/gửi lại và cách xử lý hồ sơ đang chờ/bị từ chối còn mở. OBJ-02 liên quan dữ liệu hiện có có thể tái sử dụng; số lượng thực nhận mới, thông tin hóa đơn và đề nghị thanh toán là đầu vào riêng. OBJ-04 đo mức độ bao phủ xử lý tự động, không phải tỷ lệ đối chiếu đạt; mẫu số hóa đơn đủ điều kiện và cách xử lý lần thử lặp còn mở. OBJ-05 đo mức độ bao phủ kiểm toán hành động trọng yếu, không đặt mục tiêu riêng cho tỷ lệ giao dịch có lịch sử đầy đủ. Định nghĩa chi tiết và lựa chọn đo lường còn lại ở [Mục tiêu dự án](../01-business-context/project-objectives.md); các mục tiêu là giả định và không khẳng định kết quả đã đạt.

## 4. Các bên liên quan và vai trò quy trình

Quy trình có Người yêu cầu (Requester), Quản lý cửa hàng (Store Manager), Nhân viên mua hàng (Procurement Officer), Trưởng bộ phận mua hàng (Procurement Manager), Nhân viên kho (Warehouse Staff), Kế toán công nợ phải trả (AP Accountant — AP), Trưởng bộ phận tài chính (Finance Manager) và Nhà cung cấp (Supplier) bên ngoài. Giám đốc tài chính (CFO) là nhà bảo trợ cấp điều hành; Kiểm toán nội bộ (Internal Audit) và Bộ phận công nghệ thông tin (IT Team) là các bên tham vấn chuyên môn. Kiểm toán nội bộ rà soát kiểm soát và lịch sử; IT tư vấn tính khả thi, ranh giới, truy cập và tích hợp. BRD không giao trách nhiệm phê duyệt vận hành cho hai vai trò chuyên môn này.

Phân tích bên liên quan chi tiết, danh sách và ma trận trách nhiệm (RACI) sơ bộ ở [Giai đoạn 02](../02-stakeholder-analysis/stakeholder-analysis.md).

## 5. Yêu cầu nghiệp vụ

Danh mục yêu cầu là đường cơ sở chi tiết chính thức. BRD này tóm tắt cấu trúc được chấp thuận để phân tích, không lặp lại mọi lý do.

| ID | Yêu cầu nghiệp vụ | Ưu tiên | Mục tiêu liên quan |
| --- | --- | --- | --- |
| BRQ-01 | Quản lý giao dịch P2P liên thông | Cao | OBJ-03 |
| BRQ-02 | Quản lý PR chuẩn hóa | Cao | OBJ-02, OBJ-03 |
| BRQ-03 | Kiểm soát ngân sách bắt buộc | Cao | OBJ-04 |
| BRQ-04 | Chọn nhà cung cấp có kiểm soát | Trung bình | OBJ-04 |
| BRQ-05 | Quản lý và phê duyệt PO chuẩn hóa | Cao | OBJ-01, OBJ-05 |
| BRQ-06 | Tái sử dụng dữ liệu mua hàng và liên kết giao dịch | Cao | OBJ-02, OBJ-03 |
| BRQ-07 | Theo dõi trạng thái mua hàng | Cao | OBJ-03 |
| BRQ-08 | Đối chiếu ba bên và xử lý ngoại lệ có kiểm soát | Cao | OBJ-04 |
| BRQ-09 | Truy vết giao dịch và phê duyệt | Cao | OBJ-05 |
| BRQ-10 | Phê duyệt đề nghị thanh toán có kiểm soát | Cao | OBJ-04 |
| BRQ-11 | Báo cáo mua hàng cơ bản | Trung bình | OBJ-01, OBJ-03, OBJ-04, OBJ-05 |

### Mức độ bao phủ yêu cầu

1. Quy trình phải duy trì thông tin PR, PO, GR, hóa đơn, ngoại lệ và đề nghị thanh toán được liên kết khi áp dụng.
2. PR phải đầy đủ, được kiểm tra ngân sách và được phê duyệt nghiệp vụ trước xử lý mua hàng.
3. PO phải xuất phát từ PR đã phê duyệt, dùng nhà cung cấp đủ điều kiện và hoàn tất tuyến phê duyệt áp dụng trước phát hành.
4. GR và hóa đơn phải tham chiếu PO liên quan; thiếu dữ liệu đối chiếu phải tiếp tục chờ, đối chiếu không đạt phải tạo ngoại lệ có kiểm soát và chỉ kết quả đối chiếu hiện hành đạt mới xác lập điều kiện lập đề nghị thanh toán.
5. Đề nghị thanh toán phải chỉ được chuẩn bị và gửi cho hóa đơn có kết quả đối chiếu hiện hành đạt quy tắc áp dụng, sau đó được người phê duyệt tài chính có quyền phê duyệt. Trạng thái ngoại lệ do người dùng đặt không tạo điều kiện hợp lệ.
6. Người dùng được cấp quyền phải có thể xem trạng thái, lịch sử và báo cáo vận hành cơ bản liên quan.

## 6. Quy tắc nghiệp vụ và kiểm soát

[Đường cơ sở quy tắc nghiệp vụ](../04-to-be-design/business-rules.md) chi tiết vẫn là nguồn chính thức. Tài liệu xác lập thông tin PR bắt buộc (BR-01), kiểm tra ngân sách trước phê duyệt PR (BR-02/03), chọn nhà cung cấp đã phê duyệt (BR-06), liên kết PR–PO và tái sử dụng (BR-07/08), kiểm soát chuyển xử lý và phát hành PO (BR-09–12), tham chiếu PO cho GR và hóa đơn (BR-13/15), kiểm soát đối chiếu và ngoại lệ (BR-16–21), điều kiện/phê duyệt đề nghị thanh toán (BR-22–24), kiểm soát trạng thái, kiểm toán và vai trò (BR-25–27).

## 7. Giả định, quyết định còn mở và loại trừ

### Giả định đường cơ sở

Phân tích giả định có Danh mục nhà cung cấp (Supplier Master) đã phê duyệt, xác định được đơn vị yêu cầu/trung tâm chi phí, có thông tin ngân sách, có hệ thống kế toán, Kho ghi nhận GR, mua hàng thuộc phạm vi dựa trên PO, vai trò người dùng xác định và dữ liệu tình huống giả lập. Đây là giả định, không phải thực tế vận hành đã xác nhận.

### Quyết định nghiệp vụ còn mở

Các nội dung sau vẫn chưa chốt và chưa được triển khai thành chính sách cố định: OD-01 ngưỡng phê duyệt PO; OD-02 tiêu chí phê duyệt tài chính bổ sung; OD-03 chính sách kiểm tra ngân sách; OD-04 chính sách/giá trị dung sai đối chiếu; OD-05 chuyển cấp ngoại lệ đối chiếu; OD-06 trạng thái giao dịch cuối cùng; OD-07 quyền vai trò chi tiết; OD-08 chính sách GR một phần. Xem danh mục tổng hợp tại [Giai đoạn 08](../08-traceability/requirements-traceability-matrix.md#quyết-định-còn-mở).

### Loại trừ rõ ràng

Nghiên cứu tình huống không khẳng định ngưỡng phê duyệt, dung sai đối chiếu, quy tắc chuyển cấp ngoại lệ, ký duyệt của các bên liên quan, thiết kế tích hợp vận hành thực tế, kết quả kiểm thử, kết quả triển khai hoặc kết quả hiệu quả thực tế.

## 8. Truy vết và bước tiếp theo

Danh mục ánh xạ BRQ đến mục tiêu, vấn đề, nguyên nhân gốc và quy tắc nghiệp vụ. [Giai đoạn 06](../06-system-analysis/README.md) ánh xạ BRQ đến UC-01 tới UC-12. [Giai đoạn 07](../07-software-requirements/srs.md) xây dựng yêu cầu chức năng (FR), yêu cầu phi chức năng (NFR) và tiêu chí chấp nhận (AC); [Giai đoạn 08](../08-traceability/requirements-traceability-matrix.md) cung cấp ma trận xuyên suốt gọn.

**Trạng thái tài liệu:** hồ sơ hiện có phục vụ rà soát năng lực BA; một số chính sách và tiêu chí kiểm chứng vẫn cần hoàn thiện. Giải pháp phần mềm vẫn là đề xuất; chưa có xác nhận từ các bên liên quan thực tế.
