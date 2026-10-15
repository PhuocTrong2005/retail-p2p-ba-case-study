# Phạm vi dự án

## 1. Mục đích

Phần này xác định ranh giới dự án cải tiến quy trình mua hàng đến thanh toán (Procure-to-Pay — P2P) cho NovaRetail.

Phạm vi rõ ràng giúp phân tích tập trung vào quy trình mua hàng cốt lõi, tránh mở rộng sang các lĩnh vực không thuộc trọng tâm như thay thế toàn bộ hệ thống hoạch định nguồn lực doanh nghiệp (ERP), lập kế hoạch tồn kho, quản lý vòng đời nhà cung cấp hoặc nghiệp vụ ngân hàng.

Phạm vi được xác định từ các vấn đề và mục tiêu nghiệp vụ đã nhận diện trong phân tích trước đó.

---

## 2. Ranh giới quy trình

Dự án bao gồm mua hàng hóa hữu hình từ lúc nhu cầu mua hàng nội bộ được ghi nhận chính thức đến khi đề nghị thanh toán (Payment Request) liên quan được phê duyệt. Dịch vụ nằm ngoài đường cơ sở nghiên cứu tình huống này vì chưa đặc tả nghiệm thu và đối chiếu dịch vụ.

### Bắt đầu quy trình

Quy trình bắt đầu khi Nhân viên cửa hàng (Store Employee) hoặc người yêu cầu nội bộ được cấp quyền xác định nhu cầu mua hàng và tạo yêu cầu mua hàng (Purchase Requisition — PR).

Ví dụ nhu cầu mua hàng có thể gồm:

* hàng hóa bán lại;
* vật tư vận hành cửa hàng;
* văn phòng phẩm;
* thiết bị.

Dịch vụ bảo trì hoặc vận hành có thể là nhu cầu nghiệp vụ tại NovaRetail, nhưng mua dịch vụ nằm ngoài đường cơ sở hiện tại.

### Kết thúc quy trình

Quy trình kết thúc khi:

* hóa đơn nhà cung cấp đã được xem xét thành công;
* đối chiếu ba bên bắt buộc đã hoàn tất;
* mọi ngoại lệ đối chiếu liên quan đã được xác nhận xử lý sau khi đối chiếu lại đạt;
* đề nghị thanh toán đã được phê duyệt, chỉ hoàn tất quy trình được mô hình hóa.

Thực hiện thanh toán thực tế, chuyển khoản ngân hàng, đối soát và việc nhà cung cấp nhận tiền nằm ngoài phạm vi dự án.

### Ranh giới quy trình tổng quát

```text
Nhu cầu mua hàng
      ↓
Tạo yêu cầu mua hàng
      ↓
Kiểm tra ngân sách
      ↓
Phê duyệt PR
      ↓
Chọn nhà cung cấp
      ↓
Tạo đơn đặt hàng
      ↓
Phê duyệt PO
      ↓
Nhận hàng
      ↓
Nhận hóa đơn
      ↓
Đối chiếu ba bên
      ↓
Xử lý ngoại lệ
      ↓
Phê duyệt đề nghị thanh toán
      ↓
Hoàn tất quy trình
```

---

## 3. Trong phạm vi

Các quy trình và năng lực nghiệp vụ sau thuộc phạm vi dự án.

### 3.1 Quản lý yêu cầu mua hàng

Quy trình đề xuất nên hỗ trợ tạo và quản lý PR.

Phân tích bao gồm:

* tạo PR;
* nhập hàng hóa hữu hình cần mua;
* số lượng yêu cầu;
* chi phí ước tính;
* ngày cần hàng;
* lý do mua hàng;
* cửa hàng hoặc bộ phận yêu cầu;
* gửi PR để xem xét;
* lưu và cập nhật PR nháp;
* chỉnh sửa và gửi lại PR bị trả lại hoặc không đạt kiểm tra ngân sách;
* theo dõi trạng thái PR.

---

### 3.2 Kiểm tra ngân sách

PR nên được kiểm tra với ngân sách khả dụng trước khi đi qua quy trình phê duyệt.

Phạm vi bao gồm:

* xác định ngân sách hoặc trung tâm chi phí liên quan;
* kiểm tra có đủ ngân sách khả dụng hay không;
* ghi nhận kết quả kiểm tra ngân sách;
* chặn hoặc giữ chờ yêu cầu không đáp ứng quy tắc ngân sách đã xác định.

Dự án không bao gồm việc xây dựng hoặc quản lý chính quy trình lập ngân sách doanh nghiệp.

---

### 3.3 Phê duyệt yêu cầu mua hàng

Dự án bao gồm luồng phê duyệt PR.

Quy trình nên hỗ trợ:

* xác định người phê duyệt phù hợp;
* gửi PR để phê duyệt;
* phê duyệt yêu cầu;
* từ chối yêu cầu;
* trả PR để chỉnh sửa kèm lý do, sau đó kiểm tra thông tin và kiểm tra lại ngân sách khi gửi lại;
* ghi nhận quyết định phê duyệt;
* theo dõi trạng thái phê duyệt hiện tại.

Quy tắc phê duyệt sẽ được xác định sau dưới dạng quy tắc nghiệp vụ.

---

### 3.4 Chọn nhà cung cấp

Nhân viên mua hàng (Procurement Officer) được phép chọn nhà cung cấp từ danh sách nhà cung cấp hiện có đã được NovaRetail phê duyệt.

Dự án bao gồm:

* xem nhà cung cấp hiện có đã phê duyệt;
* chọn nhà cung cấp phù hợp cho giao dịch mua hàng;
* liên kết nhà cung cấp đã chọn với đơn đặt hàng (Purchase Order — PO).

Phạm vi không bao gồm tìm kiếm, thẩm định, tiếp nhận hoặc ký hợp đồng với nhà cung cấp mới.

---

### 3.5 Quản lý đơn đặt hàng

Dự án bao gồm tạo và quản lý PO.

Phân tích bao gồm:

* tạo PO từ PR đã phê duyệt;
* tái sử dụng thông tin đã có từ PR;
* chọn nhà cung cấp đã phê duyệt;
* xác định số lượng và giá;
* tính tổng giá trị PO;
* gửi PO để phê duyệt;
* xem trạng thái PO;
* chỉnh sửa và gửi lại PO bị trả lại.

---

### 3.6 Phê duyệt đơn đặt hàng

Dự án bao gồm quy trình xem xét và phê duyệt PO.

Quy trình tương lai nên hỗ trợ quy tắc phê duyệt định trước thay vì chỉ dựa vào email được chuyển tiếp thủ công.

Phạm vi bao gồm:

* xác định tuyến phê duyệt áp dụng, gồm phê duyệt của Trưởng bộ phận mua hàng (Procurement Manager) và phê duyệt bổ sung có điều kiện của Trưởng bộ phận tài chính (Finance Manager);
* chuyển PO để phê duyệt;
* phê duyệt;
* trả lại để chỉnh sửa;
* ghi nhận quyết định phê duyệt;
* theo dõi các phê duyệt đang chờ.

Ngưỡng phê duyệt chi tiết sẽ được xác định sau dưới dạng quy tắc nghiệp vụ.

---

### 3.7 Phiếu nhận hàng

Bộ phận Kho chịu trách nhiệm ghi nhận việc nhận hàng liên quan đến PO.

Dự án bao gồm:

* xác định PO tương ứng;
* ghi nhận số lượng đã nhận;
* ghi nhận ngày nhận;
* xác định giao hàng một phần hoặc đầy đủ;
* ghi nhận sai lệch liên quan;
* cung cấp thông tin nhận hàng để đối chiếu hóa đơn.

Không bao gồm vận hành kho chi tiết như tối ưu lưu trữ, lấy hàng, đóng gói và bố trí kho.

---

### 3.8 Xử lý hóa đơn nhà cung cấp

Dự án bao gồm nhận và xử lý hóa đơn nhà cung cấp liên quan đến PO.

Phân tích bao gồm:

* ghi nhận hóa đơn;
* liên kết hóa đơn với PO tương ứng;
* ghi nhận số hóa đơn, ngày, số tiền và nhà cung cấp;
* xác định hóa đơn cần xem xét thêm;
* theo dõi trạng thái xử lý hóa đơn.

Dự án không bao gồm kế toán thuế hoặc kiểm tra pháp lý hóa đơn điện tử ở mức chi tiết.

---

### 3.9 Đối chiếu ba bên

Dự án bao gồm so sánh:

```text
Đơn đặt hàng
      +
Phiếu nhận hàng (GR)
      +
Hóa đơn nhà cung cấp
```

Quy trình đối chiếu nên so sánh thông tin liên quan như:

* nhà cung cấp;
* mặt hàng;
* số lượng;
* đơn giá;
* tổng số tiền.

Giao dịch đáp ứng quy tắc đối chiếu đã xác định có thể tự động đi tiếp.

Đối chiếu không đạt tạo ngoại lệ đối chiếu và chặn chuẩn bị, gửi đề nghị thanh toán đến khi chỉnh sửa và đối chiếu lại đạt. Thiếu dữ liệu đối chiếu thì tiếp tục chờ và chưa đủ điều kiện.

---

### 3.10 Xử lý ngoại lệ

Dự án bao gồm xử lý cơ bản các ngoại lệ mua hàng.

Ví dụ:

* số lượng trên hóa đơn lớn hơn số lượng đã nhận;
* giá hóa đơn khác giá PO;
* nhận hàng một phần;
* thiếu phiếu nhận hàng (Goods Receipt — GR);
* không đủ ngân sách;
* PR bị từ chối hoặc PO bị trả lại.

Dự án sẽ xác định cách nhận diện, phân công và xử lý các ngoại lệ này ở cấp quy trình nghiệp vụ.

Quản lý tranh chấp phức tạp và khiếu nại nhà cung cấp nằm ngoài phạm vi.

---

### 3.11 Phê duyệt đề nghị thanh toán

Sau khi hoàn tất kiểm tra và đối chiếu hóa đơn, dự án bao gồm quy trình phê duyệt đề nghị thanh toán.

Phạm vi bao gồm:

* tạo hoặc sinh đề nghị thanh toán;
* xem xét thông tin giao dịch hỗ trợ;
* phê duyệt hoặc trả lại đề nghị để chỉnh sửa;
* ghi nhận quyết định phê duyệt;
* cập nhật trạng thái giao dịch mua hàng.

Không bao gồm thực hiện thanh toán thực tế qua ngân hàng.

---

### 3.12 Theo dõi trạng thái và khả năng theo dõi quy trình

Dự án bao gồm theo dõi trạng thái xuyên suốt P2P.

Người dùng liên quan nên có thể xác định trạng thái giao dịch mua hàng, ví dụ:

```text
Nháp
Đã gửi
Chờ phê duyệt
Đã phê duyệt
Bị từ chối
Đã tạo PO
Đã đặt hàng
Đã nhận một phần
Đã nhận hàng
Đã nhận hóa đơn
Đang đối chiếu
Ngoại lệ
Sẵn sàng lập đề nghị thanh toán
Đề nghị thanh toán đã được phê duyệt
Hoàn tất
```

Đây là các trạng thái minh họa, không phải mô hình trạng thái đã chốt. “Hoàn tất” nghĩa là quy trình nghiên cứu tình huống kết thúc tại phê duyệt đề nghị thanh toán; không có nghĩa đã thanh toán (Paid).

---

### 3.13 Dấu vết kiểm toán

Dự án bao gồm ghi nhận hành động trọng yếu xuyên suốt quy trình mua hàng.

Các hành động quan trọng có thể gồm:

* tạo;
* gửi;
* cập nhật;
* phê duyệt;
* từ chối;
* nhận hàng;
* thực hiện đối chiếu hóa đơn;
* xử lý ngoại lệ;
* phê duyệt đề nghị thanh toán.

Với mỗi hành động liên quan, hệ thống về sau nên có thể xác định:

* ai thực hiện;
* hành động nào được thực hiện;
* hành động diễn ra khi nào;
* giao dịch bị tác động.

---

### 3.14 Báo cáo mua hàng

Dự án bao gồm báo cáo vận hành cơ bản cần để đánh giá quy trình được thiết kế lại.

Các chỉ số tiềm năng gồm:

* thời gian phê duyệt PR trung bình;
* thời gian phê duyệt PO trung bình;
* thời gian chu kỳ từ PR đến PO;
* tỷ lệ đối chiếu tự động;
* tỷ lệ sai lệch hóa đơn;
* giá trị mua hàng theo cửa hàng;
* giá trị mua hàng theo nhà cung cấp;
* giá trị mua hàng theo nhóm hàng;
* số phê duyệt đang chờ.

Phân tích thông minh nghiệp vụ nâng cao (Business Intelligence) và phân tích toàn doanh nghiệp nằm ngoài phạm vi.

---

## 4. Ngoài phạm vi

Các lĩnh vực sau được loại trừ rõ ràng khỏi dự án.

### 4.1 Tiếp nhận nhà cung cấp mới

Dự án giả định NovaRetail đã duy trì danh sách nhà cung cấp được phê duyệt.

Các hoạt động như:

* đăng ký nhà cung cấp;
* xác minh danh tính;
* kiểm tra hồ sơ pháp lý;
* thẩm định năng lực;
* kiểm tra tuân thủ;

nằm ngoài phạm vi.

---

### 4.2 Quản lý hợp đồng nhà cung cấp

Không bao gồm đàm phán, soạn thảo, gia hạn và quản lý hợp đồng nhà cung cấp.

---

### 4.3 Tìm nguồn cung chiến lược

Dự án không bao gồm toàn bộ quy trình tìm nguồn cung chiến lược như:

* yêu cầu cung cấp thông tin (Request for Information — RFI);
* yêu cầu báo giá (Request for Quotation — RFQ);
* yêu cầu đề xuất (Request for Proposal — RFP);
* chào giá cạnh tranh;
* quản lý đấu thầu;
* bảng đánh giá nhà cung cấp.

Chọn nhà cung cấp trong dự án chỉ giới hạn ở chọn nhà cung cấp hiện có đã phê duyệt cho giao dịch mua hàng.

---

### 4.4 Dự báo nhu cầu và tồn kho

Dự án không xác định khi nào NovaRetail nên mua sản phẩm dựa trên nhu cầu tương lai.

Các nội dung sau ngoài phạm vi:

* dự báo nhu cầu;
* tối ưu bổ sung hàng;
* tính tồn kho an toàn;
* dự báo tồn kho.

Giả định nhu cầu mua hàng đã tồn tại khi P2P bắt đầu.

---

### 4.5 Quản lý kho chi tiết

Dự án chỉ bao gồm ghi nhận GR.

Không bao gồm:

* bố trí kho;
* sắp xếp tồn kho;
* lấy hàng;
* đóng gói;
* chuyển hàng nội bộ kho;
* tối ưu tuyến đường.

---

### 4.6 Quản lý kế toán đầy đủ

Giả định phần mềm kế toán hiện có của NovaRetail tiếp tục vận hành.

Dự án không thay thế hoặc thiết kế lại:

* sổ cái;
* công nợ phải thu;
* báo cáo tài chính;
* khấu hao;
* kế toán tiền lương;
* báo cáo thuế.

Chỉ xem xét các hoạt động kế toán cần để hỗ trợ P2P.

---

### 4.7 Tính thuế

Tính thuế chi tiết và quy tắc tuân thủ thuế không được phân tích trong dự án.

Thuế có thể xuất hiện dưới dạng dữ liệu giao dịch, nhưng dự án không triển khai hoặc xác nhận tuân thủ quy định thuế Việt Nam.

---

### 4.8 Thực hiện thanh toán ngân hàng

Quy trình được mô hình hóa kết thúc khi đề nghị thanh toán được phê duyệt; sự kiện đó không thực hiện hoặc xác nhận khoản thanh toán.

Dự án không bao gồm:

* tích hợp giao diện lập trình ứng dụng (API) ngân hàng;
* tạo tệp thanh toán;
* chuyển tiền điện tử;
* đối soát ngân hàng.

---

### 4.9 Mua dịch vụ và thao tác chứng từ hoãn đặc tả

Mua dịch vụ, ghi nhận dịch vụ và nghiệm thu dịch vụ nằm ngoài đường cơ sở này. Hủy PR hoặc PO, sửa PR đã phê duyệt hoặc PO đã phê duyệt/phát hành, và mở lại PR bị từ chối được hoãn đặc tả, chưa có luồng xử lý tại đây. Chỉnh sửa để xử lý ngoại lệ đối chiếu không cấp quyền sửa trực tiếp chứng từ đã phê duyệt/phát hành hoặc GR đã ghi nhận.

### 4.10 Quản lý bán hàng và đơn hàng khách hàng

Quy trình hướng đến khách hàng thuộc lĩnh vực từ đơn hàng đến thu tiền (Order-to-Cash), nằm ngoài phạm vi P2P.

Bao gồm:

* đơn hàng khách hàng;
* hóa đơn bán hàng;
* thanh toán của khách hàng;
* quản lý quan hệ khách hàng.

---

### 4.11 Thay thế toàn bộ ERP

Hệ thống quản lý mua hàng (Procurement Management System) đề xuất không nhằm thay thế mọi hệ thống hiện có của NovaRetail.

Dự án chỉ tập trung cải thiện P2P và xác định năng lực mua hàng cần thiết.

---

## 5. Giả định chính

Nghiên cứu tình huống dựa trên các giả định sau.

### A-01 — Danh mục nhà cung cấp hiện có

NovaRetail đã duy trì danh sách nhà cung cấp được phê duyệt cho hoạt động mua hàng.

---

### A-02 — Xác định được đơn vị yêu cầu

Mỗi PR có thể liên kết với cửa hàng, bộ phận hoặc trung tâm chi phí cụ thể.

---

### A-03 — Có thông tin ngân sách

Thông tin ngân sách liên quan có thể được cung cấp cho quy trình mua hàng để kiểm tra ngân sách.

Dự án không xác định cách lập ngân sách năm hoặc ngân sách bộ phận.

---

### A-04 — Hệ thống kế toán hiện có vẫn khả dụng

NovaRetail tiếp tục dùng phần mềm kế toán hiện có cho các hoạt động kế toán tài chính cốt lõi.

---

### A-05 — Kho ghi nhận phiếu nhận hàng

Nhân viên kho (Warehouse Staff) chịu trách nhiệm xác nhận và ghi nhận hàng đã nhận từ nhà cung cấp.

---

### A-06 — Các giao dịch mua thuộc phạm vi phải có đơn đặt hàng

Giả định giao dịch mua hàng thuộc dự án đi theo quy trình dựa trên PO.

Mua hàng không có PO không được phân tích chi tiết.

---

### A-07 — Có thể xác định quy tắc phê duyệt

NovaRetail có thể xác định quy tắc phê duyệt dựa trên các yếu tố như:

* giá trị PO;
* bộ phận;
* cửa hàng;
* trung tâm chi phí;
* nhóm mua hàng.

Quy tắc thực tế sẽ được đặc tả sau.

---

### A-08 — Người dùng mua hàng có vai trò xác định

Giả định người tham gia quy trình có vai trò nghiệp vụ xác định được, như:

* Nhân viên cửa hàng;
* Quản lý cửa hàng (Store Manager);
* Nhân viên mua hàng;
* Trưởng bộ phận mua hàng;
* Nhân viên kho;
* Kế toán công nợ phải trả (AP Accountant — AP);
* Trưởng bộ phận tài chính.

---

### A-09 — Dữ liệu nghiên cứu tình huống là giả lập

Mọi khối lượng, giá trị hiệu quả đường cơ sở, dữ liệu giao dịch và mục tiêu cải tiến trong dự án là giả định, được tạo cho mục đích hồ sơ năng lực và phân tích.

Chúng không đại diện dữ liệu vận hành thực tế của NovaRetail.

---

## 6. Ràng buộc dự án

### C-01 — Nghiên cứu tình huống BA cá nhân

Dự án là nghiên cứu tình huống phân tích nghiệp vụ (Business Analysis — BA) cho hồ sơ năng lực, không bao gồm triển khai hệ thống mua hàng vận hành thực tế.

---

### C-02 — Không tiếp cận dữ liệu nghiệp vụ thật

Phân tích không sử dụng dữ liệu mật hoặc dữ liệu vận hành của công ty bán lẻ thực tế.

Mọi dữ liệu quy trình và ví dụ giao dịch đều giả lập.

---

### C-03 — Giới hạn triển khai kỹ thuật

Dự án tập trung chủ yếu vào:

* phân tích nghiệp vụ;
* phân tích yêu cầu;
* mô hình hóa quy trình;
* đặc tả hệ thống;
* phác thảo khung giao diện (wireframe);
* phân tích dữ liệu.

Phát triển phần mềm chi tiết nằm ngoài phạm vi chính.

---

### C-04 — Tích hợp được đặc tả ở mức tổng quát

Tích hợp tiềm năng với hệ thống kế toán, ngân sách hoặc hệ thống doanh nghiệp khác có thể được thể hiện trong yêu cầu và kiến trúc.

Tuy nhiên, không bao gồm thiết kế API chi tiết, cấu hình phần mềm trung gian hoặc tích hợp vận hành thực tế.

---

### C-05 — Bảo mật được xác định ở cấp yêu cầu

Có thể đặc tả yêu cầu liên quan bảo mật như truy cập theo vai trò, phân quyền và khả năng kiểm toán.

Kiểm thử xâm nhập chi tiết, kiến trúc bảo mật và triển khai hạ tầng nằm ngoài phạm vi dự án BA này.

---

### C-06 — Khung giao diện chỉ bao phủ luồng trọng yếu

Khung giao diện sẽ tập trung vào tương tác chính của người dùng thay vì cung cấp giao diện vận hành thực tế đầy đủ.

Các màn hình ưu tiên có thể gồm:

* bảng tổng hợp mua hàng;
* danh sách PR;
* chi tiết PR;
* danh sách PO;
* phê duyệt PO;
* đối chiếu hóa đơn.

---

### C-07 — Báo cáo dùng dữ liệu giả lập

Mọi phân tích Excel, SQL hoặc Power BI được tạo cho dự án sẽ dùng dữ liệu mua hàng giả lập.

---

## 7. Tóm tắt phạm vi

### Trong phạm vi

```text
Yêu cầu mua hàng
Kiểm tra ngân sách
Phê duyệt PR
Chọn nhà cung cấp đã phê duyệt
Đơn đặt hàng
Phê duyệt PO
Phiếu nhận hàng
Hóa đơn nhà cung cấp
Đối chiếu ba bên
Xử lý ngoại lệ cơ bản
Phê duyệt đề nghị thanh toán
Theo dõi trạng thái PR/PO
Dấu vết kiểm toán
Báo cáo mua hàng cơ bản
```

### Ngoài phạm vi

```text
Tiếp nhận nhà cung cấp mới
Quản lý hợp đồng
Tìm nguồn cung chiến lược / Đấu thầu
Dự báo nhu cầu
Tối ưu tồn kho
Quản lý kho chi tiết
Kế toán đầy đủ
Quản lý thuế
Thực hiện thanh toán ngân hàng
Mua dịch vụ
Hủy PR/PO và sửa chứng từ đã phê duyệt
Bán hàng cho khách hàng
Thay thế toàn bộ ERP
```

---

## 8. Lý do xác định phạm vi

Dự án chủ động giới hạn ở các hoạt động giao dịch P2P.

Dù quản lý vòng đời nhà cung cấp, lập kế hoạch tồn kho, kế toán và nghiệp vụ ngân hàng liên quan đến mua hàng, đưa tất cả vào sẽ làm tăng đáng kể độ phức tạp và giảm chiều sâu phân tích P2P cốt lõi.

Phạm vi được chọn đủ để phân tích các vấn đề nghiệp vụ chính tại NovaRetail, gồm:

* chậm phê duyệt;
* dữ liệu mua hàng phân tán;
* đối chiếu ba bên thủ công;
* khó theo dõi giao dịch;
* khả năng kiểm toán yếu;
* kiểm soát ngân sách thiếu nhất quán;
* nhập liệu thủ công trùng lặp.

Ranh giới này giúp dự án giữ trọng tâm, đồng thời vẫn bao phủ tương tác chính giữa Vận hành cửa hàng, Mua hàng, Kho, Tài chính và Kế toán.
