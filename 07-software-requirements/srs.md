# Đặc tả yêu cầu phần mềm

## 1. Mục đích, phạm vi và quy ước

Đặc tả yêu cầu phần mềm (Software Requirements Specification — SRS) này xây dựng yêu cầu hệ thống cho Hệ thống quản lý mua hàng (Procurement Management System) từ danh mục yêu cầu nghiệp vụ (BRQ) và đường cơ sở ca sử dụng (UC). Phạm vi gồm mua hàng hóa hữu hình (hàng bán lại, vật tư vận hành, văn phòng phẩm, thiết bị), từ tạo yêu cầu mua hàng (Purchase Requisition — PR) đến phê duyệt đề nghị thanh toán (Payment Request). Mua dịch vụ, nghiệm thu và đối chiếu dịch vụ ngoài đường cơ sở. Không bao gồm thực hiện thanh toán ngân hàng và không khẳng định đã thiết kế giải pháp, thực hiện kiểm thử hoặc được các bên liên quan phê duyệt.

`FR-xx` định danh yêu cầu chức năng (Functional Requirement), `NFR-xx` định danh yêu cầu phi chức năng (Non-functional Requirement), `AC-xx` định danh tiêu chí chấp nhận (Acceptance Criteria). Mỗi tham chiếu nguồn trỏ đến đường cơ sở nghiệp vụ đã xác lập; các quyết định còn mở vẫn chưa chốt. Đơn đặt hàng (Purchase Order — PO) và phiếu nhận hàng (Goods Receipt — GR) giữ nguyên viết tắt. Các vai trò gồm Người yêu cầu (Requester), Quản lý cửa hàng (Store Manager), Nhân viên mua hàng (Procurement Officer), Trưởng bộ phận mua hàng (Procurement Manager), Nhân viên kho (Warehouse Staff), Kế toán công nợ phải trả (AP Accountant — AP) và Trưởng bộ phận tài chính (Finance Manager).

## 2. Yêu cầu chức năng

### 2.1 Đường cơ sở trường dữ liệu yêu cầu mua hàng

Dưới đây là giả định minh họa của nghiên cứu tình huống để việc kiểm tra PR có thể kiểm chứng. Các bên liên quan tại NovaRetail chưa xác nhận và đây không phải từ điển dữ liệu đầy đủ. Mọi trường liệt kê đều bắt buộc khi gửi; PR chưa đầy đủ có thể lưu nháp mà không cần đạt kiểm tra khi gửi.

| Trường | Cấp | Bắt buộc khi | Giả định kiểm tra | Giả định nguồn |
| --- | --- | --- | --- | --- |
| Người yêu cầu | Phần đầu | Gửi | Bắt buộc; phải xác định người yêu cầu đã xác thực. | Lấy từ hồ sơ người dùng đăng nhập. |
| Cửa hàng / Bộ phận yêu cầu | Phần đầu | Gửi | Bắt buộc; phải là đơn vị đang hoạt động mà người yêu cầu được phép dùng. | Chọn từ danh mục đơn vị tổ chức. |
| Trung tâm chi phí | Phần đầu | Gửi | Bắt buộc; phải đang hoạt động và hợp lệ với đơn vị yêu cầu đã chọn. | Chọn từ danh mục trung tâm chi phí. |
| Lý do nghiệp vụ | Phần đầu | Gửi | Bắt buộc; không rỗng sau khi bỏ khoảng trắng đầu/cuối. | Người yêu cầu nhập. |
| Ngày cần hàng | Phần đầu | Gửi | Bắt buộc; phải là ngày lịch hợp lệ. Không mặc định chính sách ngày tương lai. | Người yêu cầu nhập. |
| Mô tả hàng hóa hữu hình | Dòng hàng | Gửi | Phải có ít nhất một dòng; mô tả từng dòng phải khác rỗng. | Người yêu cầu nhập; không mặc định có danh mục hàng. |
| Số lượng yêu cầu | Dòng hàng | Gửi | Bắt buộc cho từng dòng; dạng số và lớn hơn không. | Người yêu cầu nhập. |
| Đơn giá ước tính | Dòng hàng | Gửi | Bắt buộc cho từng dòng; dạng số và không âm. | Người yêu cầu nhập. |

Danh mục tham chiếu và dữ liệu hồ sơ người dùng là các phụ thuộc được giả định sẵn có cho quy trình đề xuất. Chủ thể chịu trách nhiệm, tích hợp và chính sách kiểm tra chi tiết vẫn cần nghiệp vụ và bộ phận công nghệ thông tin (IT) xác nhận.

### 2.2 Yêu cầu chức năng

| ID | Yêu cầu chức năng | Nguồn |
| --- | --- | --- |
| FR-01 | Hệ thống phải cho phép Người yêu cầu được cấp quyền tạo và lưu PR nháp, kiểm tra theo đường cơ sở trường dữ liệu tại Mục 2.1, và chỉ gửi khi mọi thông tin bắt buộc ở phần đầu và dòng hàng đều hợp lệ. | BRQ-01, BRQ-02; UC-01; BR-01 |
| FR-02 | Hệ thống phải yêu cầu thông tin ngân sách khả dụng cho PR đã gửi thuộc diện áp dụng và chặn chuyển đến phê duyệt nghiệp vụ khi kiểm tra không đạt. | BRQ-03; UC-01; BR-02, BR-03 |
| FR-03 | Hệ thống phải cho phép Quản lý cửa hàng được cấp quyền phê duyệt PR đủ điều kiện để chuyển sang Mua hàng, từ chối mà không có đường mở lại/gửi lại chính PR đó, hoặc trả lại kèm lý do để chỉnh sửa và kiểm tra lại trường bắt buộc cùng ngân sách trước khi xem xét; phải ghi nhận từng quyết định. | BRQ-02, BRQ-09; BRQ-03 hỗ trợ kiểm tra lại; UC-02; BR-04, BR-05, BR-26 |
| FR-04 | Hệ thống phải cho phép Nhân viên mua hàng được cấp quyền chỉ tạo PO từ PR đã phê duyệt, giữ tham chiếu PR nguồn và tái sử dụng dữ liệu PR phù hợp. | BRQ-01, BRQ-05, BRQ-06; UC-03; BR-05, BR-07, BR-08 |
| FR-05 | Hệ thống phải giới hạn lựa chọn nhà cung cấp cho PO ở các nhà cung cấp đủ điều kiện trong Danh mục nhà cung cấp đã phê duyệt. | BRQ-04; UC-03; BR-06 |
| FR-06 | Hệ thống phải chuyển mọi PO đã gửi đến Trưởng bộ phận mua hàng để phê duyệt mua hàng và, khi tiêu chí được cấu hình yêu cầu, chuyển bổ sung đến Trưởng bộ phận tài chính để phê duyệt tài chính, đồng thời ghi nhận từng kết quả. | BRQ-05, BRQ-09; UC-04; BR-09, BR-10, BR-26 |
| FR-07 | Hệ thống phải chặn phát hành PO đến khi hoàn tất mọi phê duyệt bắt buộc; PO bị trả lại phải được chỉnh sửa và gửi lại. | BRQ-05; UC-03, UC-04; BR-11, BR-12 |
| FR-08 | Hệ thống phải cho phép Nhân viên kho được cấp quyền ghi nhận GR theo PO đã phê duyệt và ghi nhận số lượng đã nhận. | BRQ-01, BRQ-06, BRQ-08; UC-05; BR-13, BR-14 |
| FR-09 | Hệ thống phải cho phép Kế toán công nợ phải trả được cấp quyền ghi nhận hóa đơn nhà cung cấp, liên kết với PO tương ứng và lưu trạng thái xử lý. | BRQ-01, BRQ-06, BRQ-08; UC-06; BR-15, BR-25 |
| FR-10 | Hệ thống phải giữ hóa đơn ở trạng thái chờ và chưa đủ điều kiện khi thiếu thông tin PO, GR hoặc hóa đơn bắt buộc; khi đã đủ, phải so sánh các thuộc tính đối chiếu áp dụng theo chính sách được cấu hình, ghi kết quả hiện hành và chạy lại đối chiếu sau chỉnh sửa. | BRQ-08; UC-06; BR-16–BR-19 |
| FR-11 | Hệ thống phải tạo và lưu ngoại lệ với người phụ trách, trạng thái, lý do và lịch sử chỉnh sửa/xác nhận xử lý khi đối chiếu không đạt; phải giữ ngoại lệ mở và chặn chuẩn bị, gửi đề nghị thanh toán đến khi đối chiếu lại đạt, sau đó ghi nhận xác nhận xử lý. | BRQ-08, BRQ-09; UC-06, UC-07; BR-20, BR-21 |
| FR-12 | Hệ thống phải chỉ cho phép Kế toán công nợ phải trả được cấp quyền chuẩn bị và gửi đề nghị thanh toán khi hóa đơn có kết quả đối chiếu hiện hành đạt quy tắc áp dụng; chỉ riêng trạng thái ngoại lệ không được tạo điều kiện hợp lệ. | BRQ-01, BRQ-10; UC-08; BR-19, BR-22 |
| FR-13 | Hệ thống phải cho phép Trưởng bộ phận tài chính được cấp quyền phê duyệt hoặc trả lại đề nghị thanh toán đã gửi và ghi nhận kết quả. | BRQ-10, BRQ-09; BRQ-01 hỗ trợ điểm kết thúc vòng đời; UC-09; BR-23, BR-26 |
| FR-14 | Hệ thống phải hiển thị trạng thái P2P hiện tại và tham chiếu giao dịch liên quan trong quyền truy cập của người dùng được cấp quyền. | BRQ-06, BRQ-07; UC-10; BR-25, BR-27 |
| FR-15 | Hệ thống phải lưu và hiển thị lịch sử giao dịch, phê duyệt trong quyền truy cập, gồm người thực hiện, hành động, thời điểm và giao dịch bị tác động. | BRQ-09; UC-11; BR-21, BR-26, BR-27 |
| FR-16 | Hệ thống phải cung cấp cho Trưởng bộ phận mua hàng và Trưởng bộ phận tài chính được cấp quyền các báo cáo hoặc tổng hợp vận hành mua hàng cơ bản về các nội dung trong UC-12. | BRQ-11; BRQ-07 hỗ trợ tổng hợp trạng thái; UC-12; BR-25, BR-27 |

## 3. Yêu cầu phi chức năng

| ID | Yêu cầu phi chức năng | Nguồn |
| --- | --- | --- |
| NFR-01 | Hệ thống phải thực thi truy cập theo vai trò để người dùng chỉ thực hiện hành động và xem thông tin mà vai trò được giao cho phép. | BRQ-09; UC-10, UC-11, UC-12; BR-27; OD-07 |
| NFR-02 | Với hành động và quyết định trọng yếu trong phạm vi, hệ thống phải giữ lịch sử kiểm toán đủ để xác định hành động, người thực hiện, thời điểm và giao dịch bị tác động. | BRQ-09; UC-01–UC-09; BR-26 |
| NFR-03 | Hệ thống phải bảo toàn tính toàn vẹn tham chiếu cho các quan hệ PR–PO, PO–GR và PO–hóa đơn áp dụng. | BRQ-01, BRQ-06; UC-03, UC-05, UC-06; BR-07, BR-13, BR-15 |
| NFR-04 | Hệ thống phải trình bày lỗi kiểm tra, quyết định trả lại, kết quả đối chiếu và trạng thái hiện tại theo cách người dùng chịu trách nhiệm có thể hiểu. | BRQ-02, BRQ-05, BRQ-07, BRQ-08, BRQ-10; UC-01–UC-10 |

Không đặc tả mục tiêu định lượng về hiệu năng, tính sẵn sàng, lưu trữ hoặc kiểm soát bảo mật vì đường cơ sở chưa cung cấp giá trị được phê duyệt.

NFR-01 và NFR-02 có mức độ bao phủ tổng quát; chi tiết lần lượt phụ thuộc OD-07 và danh mục sự kiện. Điều này không xác nhận sẵn sàng nghiệm thu toàn bộ. NFR-03 (toàn vẹn tham chiếu) và NFR-04 (thông tin dễ hiểu) vẫn chỉ được bao phủ một phần sau bổ sung dưới đây. Các kiểm soát chặn tham chiếu không hợp lệ và kiểm tra liên kết luồng hợp lệ được chọn không bao phủ mọi kiểm soát toàn vẹn. Thông tin quan sát được chưa chứng minh dễ hiểu; vẫn cần xác nhận với người dùng. Xem [giới hạn và khoảng thiếu mức độ bao phủ trong ma trận truy vết yêu cầu (RTM)](../08-traceability/requirements-traceability-matrix.md#mức-độ-bao-phủ-nfr-qua-tiêu-chí-chấp-nhận). Không thêm mục tiêu NFR định lượng.

## 4. Tiêu chí chấp nhận cho luồng trọng yếu

Đường cơ sở có **37 tiêu chí chấp nhận (AC-01–AC-37)**. Mọi tiêu chí đều **được xác định cho kiểm chứng tương lai; chưa thực hiện kiểm tra**. AC-25–AC-37 bổ sung kiểm tra cho yêu cầu hiện có; không xác nhận bao phủ đầy đủ hoặc hoàn tất kiểm thử chấp nhận người dùng (UAT).

### Kiểm tra PR và ngân sách

| ID | Tiêu chí chấp nhận | FR / NFR |
| --- | --- | --- |
| AC-01 | Cho trước (Given) PR thiếu hoặc không đạt kiểm tra một trường trong đường cơ sở Mục 2.1; Khi (When) Người yêu cầu gửi PR; Thì (Then) hệ thống chỉ rõ lỗi ở cấp trường và chặn gửi. PR chưa đầy đủ có thể tiếp tục được lưu nháp. | FR-01, NFR-04 |
| AC-02 | Cho trước (Given) PR đầy đủ thuộc diện áp dụng; Khi (When) PR được gửi; Thì (Then) hệ thống yêu cầu kiểm tra ngân sách trước khi cho Quản lý cửa hàng xem xét PR. | FR-02 |
| AC-03 | Cho trước (Given) kiểm tra ngân sách không đạt; Khi (When) kết quả được trả về; Thì (Then) hệ thống chặn PR đi tiếp đến phê duyệt nghiệp vụ và lưu kết quả kiểm tra. | FR-02 |

### Phê duyệt PR

| ID | Tiêu chí chấp nhận | FR / NFR |
| --- | --- | --- |
| AC-04 | Cho trước (Given) PR đầy đủ và kiểm tra ngân sách áp dụng đã đạt; Khi (When) Quản lý cửa hàng được cấp quyền phê duyệt; Thì (Then) PR sẵn sàng cho xử lý mua hàng và quyết định được ghi nhận. | FR-03 |
| AC-05 | Cho trước (Given) PR đủ điều kiện; Khi (When) Quản lý cửa hàng từ chối; Thì (Then) hệ thống ghi quyết định từ chối, đặt PR ở trạng thái bị từ chối và chặn chuyển sang Mua hàng. Mở lại không thuộc đường cơ sở này và cần chính sách được phê duyệt riêng. | FR-03 |
| AC-06 | Cho trước (Given) PR đủ điều kiện; Khi (When) Quản lý cửa hàng trả lại để chỉnh sửa; Thì (Then) hệ thống ghi lý do trả lại, cho phép Người yêu cầu chỉnh sửa và khi gửi lại phải kiểm tra lại trường bắt buộc cùng ngân sách áp dụng trước khi chuyển phê duyệt. | FR-01–FR-03 |

### Chuyển xử lý và phê duyệt PO

| ID | Tiêu chí chấp nhận | FR / NFR |
| --- | --- | --- |
| AC-07 | Cho trước (Given) PR đã phê duyệt và nhà cung cấp được chọn đủ điều kiện; Khi (When) bộ phận Mua hàng gửi PO; Thì (Then) hệ thống giữ tham chiếu PR, tái sử dụng dữ liệu PR phù hợp và đánh giá tuyến phê duyệt được cấu hình. | FR-04, FR-06, NFR-03 |
| AC-08 | Cho trước (Given) PO đã gửi nhưng chưa hoàn tất các phê duyệt bắt buộc; Khi (When) người dùng thử phát hành; Thì (Then) hệ thống chặn phát hành. | FR-07 |
| AC-09 | Cho trước (Given) PO bị người phê duyệt có quyền trả lại; Khi (When) bộ phận Mua hàng chỉnh sửa; Thì (Then) hệ thống yêu cầu gửi lại qua tuyến áp dụng và giữ lịch sử trả lại. | FR-06, FR-07 |

### Phiếu nhận hàng

| ID | Tiêu chí chấp nhận | FR / NFR |
| --- | --- | --- |
| AC-10 | Cho trước (Given) PO đã phê duyệt; Khi (When) Nhân viên kho được cấp quyền ghi GR với số lượng thực nhận; Thì (Then) GR được liên kết với PO đó và sẵn sàng cho đối chiếu. | FR-08, NFR-03 |
| AC-11 | Cho trước (Given) GR không liên kết với PO đã phê duyệt; Khi (When) có thao tác thử gửi; Thì (Then) hệ thống không hoàn tất GR. | FR-08, NFR-03 |

### Đối chiếu hóa đơn và ngoại lệ

| ID | Tiêu chí chấp nhận | FR / NFR |
| --- | --- | --- |
| AC-12 | Cho trước (Given) hóa đơn nhà cung cấp liên kết với PO và có dữ liệu PO, GR, hóa đơn bắt buộc; Khi (When) bắt đầu đối chiếu; Thì (Then) hệ thống so sánh thuộc tính định trước theo chính sách được cấu hình và ghi nhận kết quả. | FR-09, FR-10 |
| AC-13 | Cho trước (Given) dữ liệu đối chiếu bắt buộc chưa đầy đủ; Khi (When) thử đối chiếu; Thì (Then) hệ thống xác định thông tin bắt buộc còn chờ và chặn chuẩn bị, gửi đề nghị thanh toán. | FR-10, NFR-04 |
| AC-14 | Cho trước (Given) đối chiếu không đạt; Khi (When) kết quả được ghi nhận; Thì (Then) hệ thống tạo ngoại lệ mở có người phụ trách, trạng thái, lý do, lịch sử và chặn chuẩn bị, gửi đề nghị thanh toán. | FR-11 |
| AC-15 | Cho trước (Given) hành động chỉnh sửa đã được ghi cho ngoại lệ mở; Khi (When) chạy lại đối chiếu; Thì (Then) kết quả không đạt giữ ngoại lệ mở và chặn chuẩn bị/gửi đề nghị thanh toán; kết quả đạt ghi ngoại lệ là đã xử lý và làm hóa đơn đủ điều kiện theo quy tắc áp dụng. | FR-10, FR-11 |

### Phê duyệt đề nghị thanh toán

| ID | Tiêu chí chấp nhận | FR / NFR |
| --- | --- | --- |
| AC-16 | Cho trước (Given) thiếu dữ liệu đối chiếu bắt buộc, kết quả đối chiếu hiện hành không đạt, hoặc ngoại lệ được đánh dấu đã xử lý mà chưa đối chiếu lại đạt; Khi (When) AP thử chuẩn bị hoặc gửi đề nghị thanh toán; Thì (Then) hệ thống chặn hành động. | FR-12 |
| AC-17 | Cho trước (Given) hóa đơn đủ điều kiện và đề nghị thanh toán đã gửi; Khi (When) Trưởng bộ phận tài chính được cấp quyền phê duyệt; Thì (Then) hệ thống ghi người phê duyệt và kết quả, đánh dấu quy trình P2P được mô hình hóa hoàn tất tại phê duyệt đề nghị thanh toán, không đánh dấu giao dịch đã thanh toán. | FR-13 |
| AC-18 | Cho trước (Given) đề nghị thanh toán đã gửi; Khi (When) Trưởng bộ phận tài chính trả lại; Thì (Then) hệ thống ghi nhận trả lại và cho AP tiếp cận để chỉnh sửa, gửi lại. | FR-13 |

### Điều kiện nhà cung cấp, truy cập, theo dõi, lịch sử và báo cáo

| ID | Tiêu chí chấp nhận | FR / NFR |
| --- | --- | --- |
| AC-19 | Cho trước (Given) nhà cung cấp ngừng hoạt động hoặc không đủ điều kiện theo Danh mục nhà cung cấp đã phê duyệt; Khi (When) Nhân viên mua hàng thử chọn cho PO; Thì (Then) hệ thống chặn lựa chọn và không cho gửi PO với nhà cung cấp đó. | FR-05 |
| AC-20 | Cho trước (Given) người dùng thiếu quyền theo chính sách truy cập được cấu hình; Khi (When) họ thử xem dữ liệu giao dịch bị hạn chế hoặc thực hiện hành động bị hạn chế; Thì (Then) hệ thống từ chối truy cập hoặc hành động và không tiết lộ dữ liệu bị hạn chế. | NFR-01 |
| AC-21 | Cho trước (Given) người dùng được cấp quyền mở PR hoặc PO có hồ sơ giao dịch liên kết; Khi (When) hiển thị chế độ xem trạng thái; Thì (Then) hiển thị trạng thái hiện tại trong quyền truy cập và đúng các tham chiếu giao dịch liên quan hiện có. | FR-14, NFR-04 |
| AC-22 | Cho trước (Given) một hành động hoặc quyết định trọng yếu trong phạm vi xảy ra; Khi (When) lịch sử được xem xét; Thì (Then) bản ghi xác định giao dịch bị tác động, người thực hiện, hành động và thời điểm. | FR-15, NFR-02 |
| AC-23 | Cho trước (Given) người quản lý được cấp quyền chọn bộ lọc báo cáo; Khi (When) có dữ liệu giao dịch phù hợp; Thì (Then) báo cáo chỉ chứa các hồ sơ được phép truy cập đáp ứng bộ lọc đã chọn. | FR-16, NFR-01 |
| AC-24 | Cho trước (Given) không có dữ liệu giao dịch được phép truy cập đáp ứng bộ lọc báo cáo đã chọn; Khi (When) yêu cầu báo cáo; Thì (Then) hệ thống hiển thị trạng thái không có dữ liệu mà không tiết lộ hồ sơ ngoài quyền truy cập. | FR-16, NFR-01 |

### Tiêu chí bổ sung cho kiểm soát quy trình hiện có

ID nguồn nghiệp vụ dưới đây tham chiếu [quy tắc nghiệp vụ](../04-to-be-design/business-rules.md), [đặc tả UC](../06-system-analysis/use-case-specifications.md) và [các quyết định nghiệp vụ nền tảng](../08-traceability/baseline-decisions.md). Chính sách được cấu hình và phân quyền là điều kiện trước cho kiểm chứng tương lai, không phải chính sách mới được phê duyệt.

| ID | Tiêu chí chấp nhận | FR / NFR | Nguồn nghiệp vụ |
| --- | --- | --- | --- |
| AC-25 | Cho trước (Given) Người yêu cầu được cấp quyền đã nhập PR còn thiếu một hoặc nhiều trường bắt buộc khi gửi; Khi (When) Người yêu cầu lưu nháp; Thì (Then) hệ thống giữ thông tin đã nhập dưới dạng nháp có thể mở lại, không gửi PR hoặc chuyển phê duyệt. | FR-01 | BR-01; UC-01; G1-D05 |
| AC-26 | Cho trước (Given) PR chưa được phê duyệt, gồm PR nháp, bị từ chối, bị trả lại hoặc không đạt kiểm tra ngân sách; Khi (When) Nhân viên mua hàng được cấp quyền thử tạo PO từ PR đó; Thì (Then) hệ thống chặn tạo PO từ PR đó. | FR-04 | BR-05; UC-03 |
| AC-27 | Cho trước (Given) PO đã gửi có chính sách được cấu hình không yêu cầu phê duyệt tài chính bổ sung; Khi (When) hệ thống chuyển xem xét và Trưởng bộ phận mua hàng được cấp quyền phê duyệt; Thì (Then) hệ thống ghi phê duyệt mua hàng, xác định mọi phê duyệt bắt buộc đã hoàn tất và cho PO đủ điều kiện phát hành mà không yêu cầu phê duyệt tài chính. Chỉ riêng việc đủ điều kiện không phải bằng chứng đã phát hành. | FR-06, FR-07 | BR-09–BR-11; UC-04; G1-D02 |
| AC-28 | Cho trước (Given) PO đã gửi có chính sách được cấu hình yêu cầu phê duyệt tài chính bổ sung; Khi (When) Trưởng bộ phận mua hàng được cấp quyền phê duyệt và chưa có phê duyệt tài chính; Thì (Then) hệ thống ghi phê duyệt mua hàng, chuyển PO đến Trưởng bộ phận tài chính, giữ PO chưa đủ điều kiện phát hành và chặn mọi lần thử phát hành khi phê duyệt đó chưa hoàn tất. | FR-06, FR-07 | BR-09–BR-11; UC-04; G1-D02 |
| AC-29 | Cho trước (Given) Kế toán công nợ phải trả được cấp quyền có hóa đơn nhà cung cấp và PO liên quan tồn tại nhưng chưa có GR liên quan; Khi (When) AP ghi nhận hóa đơn theo PO đó; Thì (Then) hệ thống giữ hóa đơn và liên kết PO, để xử lý chờ dữ liệu GR bắt buộc, không ghi đối chiếu đạt và chặn chuẩn bị, gửi đề nghị thanh toán. | FR-09, FR-10, NFR-03 | BR-15, BR-16, BR-19; UC-06; G1-D01 |
| AC-30 | Cho trước (Given) Kế toán công nợ phải trả được cấp quyền chuẩn bị và gửi đề nghị thanh toán, và hóa đơn có kết quả đối chiếu hiện hành đạt quy tắc được cấu hình áp dụng tại cả hai lần kiểm tra; Khi (When) AP bắt đầu chuẩn bị, hoàn thiện thông tin đề nghị và gửi; Thì (Then) hệ thống kiểm tra điều kiện trước khi chuẩn bị và kiểm tra lại trước khi gửi, tiếp nhận đề nghị, ghi nhận việc gửi và chuyển đến người phê duyệt tài chính được cấp quyền. Gửi không đồng nghĩa phê duyệt hoặc thực hiện thanh toán. | FR-12 | BR-19, BR-22–BR-24; UC-08; G1-D01, G1-D06 |
| AC-31 | Cho trước (Given) người dùng Kho được cấp quyền cung cấp tham chiếu PO không xác định được PO tồn tại; Khi (When) người dùng thử hoàn tất ghi nhận GR; Thì (Then) hệ thống chặn hoàn tất GR với tham chiếu đó. | FR-08, NFR-03 | BR-13; UC-05 |
| AC-32 | Cho trước (Given) Kế toán công nợ phải trả được cấp quyền cung cấp tham chiếu PO không xác định được PO tồn tại; Khi (When) AP thử hoàn tất ghi nhận hóa đơn; Thì (Then) hệ thống chặn hoàn tất ghi nhận hóa đơn với tham chiếu đó. | FR-09, NFR-03 | BR-15; UC-06; điều kiện trước: PO tồn tại |
| AC-33 | Cho trước (Given) PR đã phê duyệt và hồ sơ liên quan hợp lệ được tạo qua UC-03, UC-05, UC-06; Khi (When) người dùng được cấp quyền hoàn tất ghi nhận PO, GR, hóa đơn rồi xem tham chiếu giao dịch được phép qua UC-10; Thì (Then) PO giữ và hiển thị tham chiếu PR nguồn thực tế, mỗi GR và hóa đơn giữ và hiển thị tham chiếu PO liên quan thực tế, và mỗi tham chiếu hiển thị xác định đúng hồ sơ nguồn đã dùng khi ghi nhận. | FR-04, FR-08, FR-09, FR-14, NFR-03 | BR-07, BR-13, BR-15, BR-27; UC-03, UC-05, UC-06, UC-10 |
| AC-34 | Cho trước (Given) PR đã được trả lại để chỉnh sửa kèm lý do ghi nhận và Người yêu cầu có quyền xem, sửa PR; Khi (When) Người yêu cầu mở PR bị trả lại; Thì (Then) hệ thống hiển thị lý do trả lại và xác định chỉnh sửa, gửi lại là các bước tiếp theo, gồm kiểm tra lại trường bắt buộc và ngân sách trước khi Quản lý cửa hàng xem xét. | FR-03, NFR-04 | BR-04; UC-01, UC-02; G1-D03 |
| AC-35 | Cho trước (Given) đối chiếu không đạt và Kế toán công nợ phải trả chịu trách nhiệm có quyền xem xét ngoại lệ; Khi (When) AP mở chi tiết; Thì (Then) hệ thống hiển thị các thuộc tính đối chiếu sai lệch, thông tin và tham chiếu giao dịch liên quan trong quyền truy cập của AP, ngoại lệ đang mở và việc chặn chuẩn bị, gửi đề nghị thanh toán; đồng thời chỉ rõ phải chỉnh sửa rồi đối chiếu lại đạt trước khi xác nhận xử lý và đủ điều kiện. | FR-10, FR-11, FR-14, NFR-04 | BR-17, BR-20, BR-21, BR-25, BR-27; UC-06, UC-07, UC-10; G1-D01 |
| AC-36 | Cho trước (Given) thiếu thông tin PO, GR hoặc hóa đơn bắt buộc và Kế toán công nợ phải trả chịu trách nhiệm có quyền xem thông tin xử lý; Khi (When) AP xem kết quả đối chiếu đang chờ; Thì (Then) hệ thống chỉ rõ thông tin bắt buộc nào còn thiếu trong quyền truy cập của AP, phân biệt chờ dữ liệu với so sánh không đạt và hiển thị rằng chuẩn bị, gửi đề nghị thanh toán vẫn bị chặn đến khi có đủ thông tin bắt buộc và đối chiếu đạt. | FR-10, FR-14, NFR-04 | BR-16, BR-19, BR-25, BR-27; UC-06, UC-10; G1-D01 |
| AC-37 | Cho trước (Given) đề nghị thanh toán có quyết định phê duyệt hoặc trả lại của Tài chính đã ghi nhận và người dùng có quyền xem đề nghị; Khi (When) người dùng mở trạng thái qua UC-10; Thì (Then) vị trí trong quy trình hiển thị khớp quyết định: đề nghị đã phê duyệt hiển thị hoàn tất tại phê duyệt đề nghị thanh toán mà không ngụ ý đã thanh toán, còn đề nghị bị trả lại hiển thị AP cần chỉnh sửa và gửi lại. | FR-13, FR-14, NFR-04 | BR-23–BR-25, BR-27; UC-08–UC-10; G1-D06 |

AC-31–AC-33 bao phủ một số kiểm soát tham chiếu trên luồng hợp lệ hiện có, không phải mọi kiểm soát toàn vẹn tham chiếu. Không bổ sung xóa, đảo giao dịch hoặc sửa chứng từ đã phê duyệt. AC-34–AC-37 xác định thông tin quan sát được, không xác định điểm khả dụng, bố cục hoặc bằng chứng người dùng hiểu. Mức dễ hiểu vẫn cần xác nhận với người dùng.

Ngoài PR/PO, AC-29 và AC-36 đề cập hóa đơn chờ dữ liệu đối chiếu, AC-35 đề cập ngoại lệ mở do đối chiếu không đạt, AC-37 đề cập kết quả xem xét đề nghị thanh toán đã xác lập. Bao phủ đầy đủ trạng thái/chuyển trạng thái của GR, hóa đơn, ngoại lệ, đề nghị thanh toán và khả năng xem theo từng hồ sơ vẫn là khoảng thiếu theo OD-06/OD-07; không quy định tên trạng thái mới.

## 5. Quyết định còn mở và ranh giới kiểm chứng

OD-01 đến OD-08 vẫn chưa chốt. Cụ thể, FR-06 dùng tiêu chí được cấu hình, không tự đặt ngưỡng; FR-10 dùng chính sách được cấu hình, không tự đặt dung sai đối chiếu. Quyền truy cập chi tiết, tên trạng thái, chính sách GR một phần và hành vi tích hợp cần được nghiệp vụ xác nhận trước thiết kế hoặc thực hiện.

Xem [Giai đoạn 08](../08-traceability/requirements-traceability-matrix.md) để truy vết xuyên suốt và xem danh mục quyết định.
