# Phân tích các bên liên quan

## 1. Mục đích

Phân tích các bên liên quan (Stakeholder) nhằm xác định cá nhân và vai trò nghiệp vụ tham gia, ảnh hưởng, kiểm soát hoặc chịu tác động bởi quy trình mua hàng đến thanh toán (Procure-to-Pay — P2P) của NovaRetail.

Phân tích được dùng để:

* xác định nguồn yêu cầu nghiệp vụ chính;
* hiểu nhu cầu và mối quan tâm của các bên liên quan;
* xác định thẩm quyền quyết định và phê duyệt;
* xác định cách phối hợp phù hợp với các bên liên quan;
* hỗ trợ mô hình hóa quy trình theo ký pháp mô hình quy trình nghiệp vụ (BPMN);
* xác định tác nhân hệ thống cho phân tích ca sử dụng (Use Case — UC) sau này;
* làm rõ trách nhiệm xuyên suốt P2P.

Phân tích bao phủ từ tạo yêu cầu mua hàng (Purchase Requisition — PR) đến phê duyệt đề nghị thanh toán (Payment Request).

---

## 2. Phân loại các bên liên quan

Trong dự án, các bên liên quan chia thành bốn nhóm:

### Các bên liên quan cấp điều hành và quản trị

Các bên chịu trách nhiệm bảo trợ nghiệp vụ, quản trị tài chính và tuân thủ.

* Giám đốc tài chính (CFO)
* Kiểm toán nội bộ (Internal Audit)

### Chủ quy trình và người ra quyết định

Các bên có thẩm quyền đối với hoạt động P2P chính.

* Trưởng bộ phận mua hàng (Procurement Manager)
* Trưởng bộ phận tài chính (Finance Manager)
* Quản lý cửa hàng (Store Manager)

### Các bên liên quan vận hành

Các bên thực hiện hoạt động P2P hằng ngày.

* Nhân viên cửa hàng / Người yêu cầu (Store Employee / Requester)
* Nhân viên mua hàng (Procurement Officer)
* Nhân viên kho (Warehouse Staff)
* Kế toán công nợ phải trả (AP Accountant — AP)

### Các bên liên quan hỗ trợ và bên ngoài

Các bên hỗ trợ quy trình hoặc tương tác với NovaRetail từ bên ngoài tổ chức.

* Bộ phận công nghệ thông tin (IT Team — IT)
* Nhà cung cấp (Supplier)

---

# 3. Danh sách các bên liên quan

| ID | Bên liên quan | Vai trò trong P2P | Trách nhiệm chính | Nhu cầu / Kỳ vọng chính | Mức ảnh hưởng | Mức quan tâm |
| ------ | -------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | --------- | -------- |
| STK-01 | Nhân viên cửa hàng / Người yêu cầu | Người yêu cầu mua hàng | Xác định nhu cầu mua hàng, tạo và gửi yêu cầu mua hàng (PR) | Tạo PR đơn giản, theo dõi trạng thái rõ ràng, giảm bước thủ công | Thấp | Cao |
| STK-02 | Quản lý cửa hàng | Người phê duyệt nghiệp vụ / Chủ thể chịu trách nhiệm chi phí | Xem xét nhu cầu nghiệp vụ; phê duyệt, từ chối hoặc trả PR để chỉnh sửa | Thông tin yêu cầu rõ ràng, nắm được ngân sách, phê duyệt nhanh | Trung bình | Cao |
| STK-03 | Nhân viên mua hàng | Nhân viên thu mua / Người dùng nghiệp vụ mua hàng | Xem xét PR đã phê duyệt, chọn nhà cung cấp đã phê duyệt, tạo và quản lý đơn đặt hàng (PO) | Thông tin tập trung, giảm nhập trùng, luồng xử lý rõ ràng | Trung bình | Cao |
| STK-04 | Trưởng bộ phận mua hàng | Chủ quy trình mua hàng | Giám sát mua hàng, thực thi quy tắc, thực hiện phê duyệt mua hàng bắt buộc cho mọi PO | Kiểm soát quy trình, theo dõi phê duyệt, chỉ số hiệu quả mua hàng (KPI) | Cao | Cao |
| STK-05 | Nhân viên kho | Người nhận hàng | Nhận hàng và ghi nhận phiếu nhận hàng (GR) | Tham chiếu PO rõ ràng, ghi nhận nhận hàng đơn giản, ghi nhận sai lệch | Thấp | Cao |
| STK-06 | Kế toán công nợ phải trả (AP) | Người xử lý hóa đơn | Ghi nhận hóa đơn nhà cung cấp, thực hiện đối chiếu ba bên, điều tra sai lệch | Dữ liệu PO/GR chính xác, đối chiếu tự động, luồng xử lý ngoại lệ rõ ràng | Trung bình | Cao |
| STK-07 | Trưởng bộ phận tài chính | Chủ thể chịu trách nhiệm kiểm soát tài chính | Chịu trách nhiệm chính sách ngân sách, phê duyệt tài chính bổ sung cho PO và phê duyệt đề nghị thanh toán | Tuân thủ ngân sách, nắm được thông tin tài chính, truy vết giao dịch | Cao | Cao |
| STK-08 | Giám đốc tài chính (CFO) | Nhà bảo trợ cấp điều hành | Bảo trợ và giám sát quản trị tài chính | Kiểm soát chi phí, hiệu quả quy trình, tuân thủ và báo cáo đáng tin cậy | Cao | Trung bình |
| STK-09 | Kiểm toán nội bộ | Bên liên quan về quản trị | Rà soát kiểm soát quy trình và lịch sử giao dịch | Dấu vết kiểm toán đầy đủ, phân tách nhiệm vụ và bằng chứng phê duyệt | Trung bình | Trung bình |
| STK-10 | Bộ phận công nghệ thông tin (IT) | Bên liên quan hỗ trợ | Hỗ trợ triển khai hệ thống, kiểm soát truy cập và tích hợp | Yêu cầu ổn định, ranh giới tích hợp rõ ràng và khả năng bảo trì | Trung bình | Trung bình |
| STK-11 | Nhà cung cấp | Bên liên quan nghiệp vụ bên ngoài | Nhận PO, giao hàng và cung cấp hóa đơn nhà cung cấp | Thông tin PO chính xác, trao đổi rõ ràng và xử lý kịp thời | Thấp | Trung bình |

---

# 4. Vai trò chính của các bên liên quan

## 4.1 Nhà bảo trợ cấp điều hành — CFO

CFO được xem là nhà bảo trợ cấp điều hành của sáng kiến cải tiến đề xuất vì P2P tác động trực tiếp đến chi mua hàng, kiểm soát tài chính, khả năng kiểm toán và quản trị thanh toán.

Không kỳ vọng CFO tham gia hoạt động mua hàng hằng ngày.

Các mối quan tâm chính gồm:

* khả năng theo dõi chi mua hàng;
* kiểm soát ngân sách;
* quản trị tài chính;
* khả năng kiểm toán;
* giảm các điểm kém hiệu quả khi xử lý;
* đạt kết quả nghiệp vụ kỳ vọng.

---

## 4.2 Chủ quy trình mua hàng — Trưởng bộ phận mua hàng

Trưởng bộ phận mua hàng được xem là chủ quy trình nghiệp vụ chính cho phần mua hàng của P2P.

Trách nhiệm gồm:

* xác định chính sách mua hàng;
* giám sát Nhân viên mua hàng;
* bảo đảm tuân thủ quy tắc mua hàng;
* giám sát xử lý đơn đặt hàng (Purchase Order — PO);
* xác định yêu cầu phê duyệt mua hàng;
* theo dõi hiệu quả mua hàng;
* cung cấp yêu cầu nghiệp vụ cho quy trình mua hàng tương lai.

Trưởng bộ phận mua hàng là một trong các bên quan trọng nhất khi khai thác yêu cầu.

---

## 4.3 Chủ thể chịu trách nhiệm kiểm soát tài chính — Trưởng bộ phận tài chính

Trưởng bộ phận tài chính đại diện khía cạnh kiểm soát tài chính của P2P.

Trách nhiệm chính gồm:

* xác định yêu cầu kiểm soát ngân sách;
* xác định yêu cầu phê duyệt tài chính;
* giám sát phê duyệt đề nghị thanh toán;
* bảo đảm kiểm soát tài chính được áp dụng trước thanh toán;
* hỗ trợ quy tắc ngoại lệ và chuyển cấp.

Vì vậy, Trưởng bộ phận tài chính và Trưởng bộ phận mua hàng đại diện hai góc nhìn kiểm soát khác nhau:

```text
Trưởng bộ phận mua hàng
        ↓
Chính sách và kiểm soát mua hàng

Trưởng bộ phận tài chính
        ↓
Kiểm soát ngân sách và tài chính
```

---

# 5. Nhu cầu và vấn đề của các bên liên quan

## Nhân viên cửa hàng / Người yêu cầu

### Mối quan tâm hiện tại

* PR được tạo thủ công.
* Khó theo dõi trạng thái.
* Người yêu cầu có thể cần liên hệ bộ phận khác để cập nhật.

### Cải tiến kỳ vọng

* tạo PR chuẩn hóa;
* xem được trạng thái xử lý;
* giảm thao tác nhập liệu lặp lại.

---

## Quản lý cửa hàng

### Mối quan tâm hiện tại

* yêu cầu phê duyệt có thể được gửi qua email;
* thông tin hỗ trợ có thể không có ngay;
* thông tin ngân sách có thể cần kiểm tra riêng.

### Cải tiến kỳ vọng

* thông tin phê duyệt rõ ràng;
* dễ tiếp cận trạng thái ngân sách hơn;
* quyết định phê duyệt nhanh hơn;
* xem được lịch sử phê duyệt.

---

## Nhân viên mua hàng

### Mối quan tâm hiện tại

* thông tin mua hàng phân tán;
* thông tin PR có thể cần nhập lại khi tạo PO;
* cần phối hợp thủ công giữa các bộ phận;
* trạng thái PO có thể khó theo dõi.

### Cải tiến kỳ vọng

* thông tin mua hàng tập trung;
* tái sử dụng dữ liệu PR đã phê duyệt;
* luồng xử lý PO có cấu trúc;
* giảm phối hợp thủ công;
* trạng thái ngoại lệ rõ ràng.

---

## Trưởng bộ phận mua hàng

### Mối quan tâm hiện tại

* khó theo dõi các phê duyệt còn chờ;
* thông tin hiệu quả mua hàng hạn chế;
* chuyển phê duyệt thủ công;
* kiểm soát quy trình thiếu nhất quán.

### Cải tiến kỳ vọng

* luồng phê duyệt có kiểm soát;
* bảng tổng hợp mua hàng;
* theo dõi quy trình tốt hơn;
* quy tắc mua hàng và lịch sử kiểm toán rõ ràng.

---

## Nhân viên kho

### Mối quan tâm hiện tại

* thông tin mua hàng có thể không phải lúc nào cũng có ngay;
* thông tin nhận hàng có thể được quản lý riêng;
* sai lệch có thể cần trao đổi thủ công.

### Cải tiến kỳ vọng

* tham chiếu trực tiếp PO đã phê duyệt;
* ghi nhận phiếu nhận hàng (Goods Receipt — GR) chuẩn hóa;
* xử lý rõ ràng giao hàng một phần hoặc sai hàng.

---

## Kế toán công nợ phải trả

### Mối quan tâm hiện tại

* thông tin PO, GR và hóa đơn có thể đến từ các nguồn riêng;
* đối chiếu ba bên thủ công;
* điều tra sai lệch cần phối hợp liên bộ phận.

### Cải tiến kỳ vọng

* tiếp cận thông tin PO và GR nhất quán;
* đối chiếu tự động cho hóa đơn đủ điều kiện;
* xác định rõ sai lệch;
* xử lý ngoại lệ có cấu trúc.

---

## Trưởng bộ phận tài chính

### Mối quan tâm hiện tại

* kiểm tra ngân sách có thể chưa được thực hiện nhất quán;
* phê duyệt tài chính phụ thuộc thông tin từ nhiều nguồn;
* khả năng kiểm toán hạn chế.

### Cải tiến kỳ vọng

* kiểm tra ngân sách nhất quán;
* phê duyệt tài chính có kiểm soát;
* lịch sử giao dịch đầy đủ;
* thông tin đáng tin cậy trước phê duyệt đề nghị thanh toán.

---

## CFO

### Mối quan tâm hiện tại

* khả năng theo dõi tổng hợp mua hàng hạn chế;
* rủi ro chi tiêu không kiểm soát;
* truy vết yếu.

### Cải tiến kỳ vọng

* báo cáo chỉ số hiệu quả mua hàng (KPI);
* kiểm soát mua hàng chặt chẽ hơn;
* khả năng kiểm toán đáng tin cậy;
* cải thiện quản trị tài chính.

---

## Kiểm toán nội bộ

### Mối quan tâm hiện tại

* bằng chứng phê duyệt có thể nằm trong nhiều email, tệp;
* có thể khó tái hiện các thay đổi giao dịch.

### Cải tiến kỳ vọng

* dấu vết kiểm toán đầy đủ;
* xác định được người dùng và thời điểm;
* lịch sử phê duyệt truy vết được;
* bằng chứng hoạt động kiểm soát trọng yếu.

---

## Bộ phận công nghệ thông tin

### Mối quan tâm hiện tại

* thông tin nghiệp vụ nằm trên các công cụ không kết nối;
* ranh giới hệ thống chưa rõ có thể tạo yêu cầu tích hợp khó xử lý.

### Cải tiến kỳ vọng

* yêu cầu chức năng được xác định rõ;
* ranh giới hệ thống rõ ràng;
* vai trò người dùng xác định;
* yêu cầu tích hợp tổng quát.

---

## Nhà cung cấp

### Mối quan tâm hiện tại

* chậm phát hành PO có thể làm chậm xác nhận đơn hàng;
* sai lệch hóa đơn có thể làm chậm thanh toán.

### Cải tiến kỳ vọng

* PO chính xác;
* xử lý giao dịch rõ ràng hơn;
* giảm chậm thanh toán có thể tránh được.

> Nhà cung cấp là bên liên quan bên ngoài nhưng không nhất thiết là người dùng trực tiếp của hệ thống. Cổng nhà cung cấp nằm ngoài phạm vi hiện tại.

---

# 6. Phân tích ảnh hưởng–quan tâm

Ma trận ảnh hưởng–quan tâm (Power–Interest Matrix) được dùng để xác định mức quản lý các bên liên quan cần thiết trong dự án.

Ma trận không xác định trách nhiệm nghiệp vụ trong quy trình. Trách nhiệm được xác định riêng qua ma trận trách nhiệm (RACI).

## Phối hợp chặt chẽ

**Ảnh hưởng cao / Quan tâm cao**

* Trưởng bộ phận mua hàng
* Trưởng bộ phận tài chính

Các bên này có thẩm quyền quyết định đáng kể và trực tiếp tham gia thiết kế quy trình tương lai.

Họ nên tích cực tham gia:

* buổi làm việc nhóm về yêu cầu;
* xác nhận quy trình đề xuất tương lai (To-Be);
* xác định quy tắc nghiệp vụ;
* ưu tiên yêu cầu;
* nghiệm thu giải pháp.

---

## Duy trì sự hài lòng

**Ảnh hưởng cao / Quan tâm vận hành thấp hơn**

* CFO

CFO có thẩm quyền quyết định cao nhưng không tham gia vận hành P2P hằng ngày.

Phối hợp nên tập trung vào:

* kết quả nghiệp vụ;
* kiểm soát tài chính;
* rủi ro lớn;
* tiến độ dự án;
* KPI và hiện thực hóa lợi ích.

---

## Duy trì cung cấp thông tin

**Ảnh hưởng thấp hơn hoặc trung bình / Quan tâm cao**

* Nhân viên cửa hàng / Người yêu cầu
* Quản lý cửa hàng
* Nhân viên mua hàng
* Nhân viên kho
* Kế toán công nợ phải trả

Các bên này tương tác trực tiếp với quy trình và cung cấp yêu cầu vận hành chi tiết.

Họ nên tham gia qua:

* phỏng vấn;
* rà từng bước quy trình;
* buổi làm việc nhóm;
* rà soát mẫu thử;
* tình huống kiểm thử chấp nhận người dùng (UAT).

Dù Nhân viên mua hàng và Kế toán công nợ phải trả có thể không có thẩm quyền tổ chức cao nhất, kiến thức vận hành khiến họ trở thành nguồn yêu cầu trọng yếu.

---

## Theo dõi

**Ảnh hưởng thấp hoặc trung bình / Quan tâm vừa phải**

* Nhà cung cấp
* Kiểm toán nội bộ
* Bộ phận công nghệ thông tin

Phân loại này hiện khớp ma trận ảnh hưởng–quan tâm trong danh sách bên liên quan: STK-09 và STK-10 đều ảnh hưởng trung bình / quan tâm trung bình nên thuộc nhóm Theo dõi. Phân loại mô tả cường độ phối hợp, không phải giá trị đóng góp chuyên môn.

Trao đổi với nhà cung cấp nên tập trung vào thay đổi tác động đến nhận PO, thông tin giao hàng hoặc xử lý hóa đơn. Do chức năng cổng nhà cung cấp ngoài phạm vi, mức tham gia thiết kế hệ thống của nhà cung cấp được giới hạn.

---

## Các bên tham vấn chuyên môn

Các bên sau vẫn ở nhóm Theo dõi khi lập kế hoạch phối hợp nhưng cần được tham vấn chuyên môn theo nội dung cụ thể.

### Kiểm toán nội bộ

Nên được tham vấn khi xác định:

* yêu cầu dấu vết kiểm toán;
* bằng chứng phê duyệt;
* phân tách nhiệm vụ;
* yêu cầu kiểm soát.

### Bộ phận công nghệ thông tin

Nên được tham vấn khi xác định:

* ranh giới hệ thống;
* yêu cầu tích hợp;
* truy cập theo vai trò;
* tính khả thi kỹ thuật;
* yêu cầu phi chức năng.

---

# 7. Cách phối hợp các bên liên quan

| Bên liên quan | Phương thức phối hợp | Tần suất / Giai đoạn | Mục đích chính |
| ------------------- | --------------------------------------------------- | -------------------------------------- | -------------------------------------------- |
| Trưởng bộ phận mua hàng | Làm việc nhóm, phỏng vấn, rà soát yêu cầu | Xuyên suốt phân tích | Trách nhiệm chủ quy trình và xác nhận yêu cầu |
| Trưởng bộ phận tài chính | Làm việc nhóm, phiên xác định quy tắc | Xuyên suốt phân tích | Kiểm soát và phê duyệt tài chính |
| Nhân viên mua hàng | Phỏng vấn, rà từng bước quy trình, rà soát mẫu thử | Phân tích hiện trạng và đề xuất tương lai | Yêu cầu vận hành mua hàng |
| Kế toán công nợ phải trả (AP) | Phỏng vấn, rà từng bước quy trình | Hiện trạng, đề xuất tương lai và đặc tả yêu cầu phần mềm (SRS) | Yêu cầu hóa đơn và đối chiếu |
| Quản lý cửa hàng | Phỏng vấn và rà soát luồng xử lý | Phân tích PR và phê duyệt | Yêu cầu phê duyệt |
| Nhân viên cửa hàng | Phỏng vấn / rà soát tính dễ sử dụng | Phân tích PR và giao diện người dùng (UI) | Yêu cầu của người yêu cầu |
| Nhân viên kho | Rà từng bước quy trình | Phân tích nhận hàng | Yêu cầu nhận hàng |
| Giám đốc tài chính (CFO) | Rà soát quản lý | Các mốc chính | Xác nhận kết quả nghiệp vụ và quản trị |
| Kiểm toán nội bộ | Rà soát kiểm soát | Xác nhận yêu cầu | Yêu cầu kiểm toán và kiểm soát |
| Bộ phận công nghệ thông tin (IT) | Tham vấn kỹ thuật | Phân tích SRS và tích hợp | Tính khả thi và tích hợp |
| Nhà cung cấp | Tham vấn giới hạn | Khi tương tác bên ngoài bị ảnh hưởng | Tương tác PO và hóa đơn |

---

# 8. Ma trận RACI sơ bộ

RACI dưới đây là ma trận quy trình cho vai trò con người. Hệ thống quản lý mua hàng (Procurement Management System) thực hiện kiểm tra ngân sách và đối chiếu tự động; bảng xác định chủ thể chính sách, điều phối và rà soát của con người, không xem hệ thống là vai trò con người.

Ma trận là sơ bộ vì thẩm quyền phê duyệt chi tiết sau này phụ thuộc quy tắc nghiệp vụ và ngưỡng phê duyệt.

**R — Thực hiện (Responsible):** thực hiện hoạt động
**A — Chịu trách nhiệm cuối cùng (Accountable):** chịu trách nhiệm cuối cùng về kết quả
**C — Được tham vấn (Consulted):** cung cấp ý kiến
**I — Được thông báo (Informed):** nhận thông tin

| Hoạt động | Người yêu cầu | Quản lý cửa hàng | Nhân viên mua hàng | Trưởng bộ phận mua hàng | Nhân viên kho | Kế toán công nợ phải trả (AP) | Trưởng bộ phận tài chính | Kiểm toán nội bộ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Tạo và gửi yêu cầu mua hàng (PR) | R/A | I | I | I | - | - | - | - |
| Phê duyệt nhu cầu nghiệp vụ / PR | I | R/A | C | I | - | - | C* | - |
| Kiểm tra ngân sách | I | C | I | I | - | - | A | - |
| Chọn nhà cung cấp đã phê duyệt | - | - | R | A | - | - | - | - |
| Tạo đơn đặt hàng (PO) | - | - | R | A | - | - | I | - |
| Phê duyệt mua hàng cho PO | I | I | C | R/A | - | C | I | - |
| Phê duyệt tài chính bổ sung cho PO (có điều kiện) | I | I | C | C | - | C | R/A | - |
| Ghi nhận phiếu nhận hàng (GR) | - | - | I | I | R/A | I | - | - |
| Ghi nhận / Kiểm tra hóa đơn nhà cung cấp | - | - | I | - | C | R/A | I | - |
| Thực hiện đối chiếu ba bên | - | - | C | I | C | R | A | - |
| Xử lý ngoại lệ đối chiếu | - | - | R/C | C | R/C | R | A | - |
| Phê duyệt đề nghị thanh toán | - | - | I | I | - | C | R/A | - |
| Rà soát bằng chứng kiểm toán | - | - | I | C | I | C | C | R/A |

Với **Kiểm tra ngân sách**, hệ thống thực hiện bằng thông tin Nguồn dữ liệu ngân sách (Budget Data Source) (UC-01/FR-02). Trưởng bộ phận tài chính `A` nghĩa là chịu trách nhiệm chính sách/kiểm soát ngân sách, không tính toán thủ công. AP `R` trong đối chiếu tự động là khởi chạy/điều phối nghiệp vụ và xem xét kết quả; hệ thống thực hiện so sánh.

`R/A` nghĩa là cả hai trách nhiệm áp dụng cho cùng vai trò. `R/C` trong **Xử lý ngoại lệ đối chiếu** phụ thuộc đầu vào cần thiết: Nhân viên mua hàng hoặc Nhân viên kho chịu trách nhiệm cung cấp thông tin điều tra/chỉnh sửa bắt buộc thuộc nghiệp vụ của mình và được tham vấn khi chỉ cần làm rõ. AP điều phối vụ việc, Tài chính chịu trách nhiệm kết quả kiểm soát tài chính. Không cấp quyền sửa trực tiếp chứng từ đã phê duyệt/phát hành; quy trình chỉnh sửa và chuyển cấp còn mở. `C*` nghĩa là tham vấn Tài chính để làm rõ kiểm soát tài chính khi xem xét PR, còn Quản lý cửa hàng giữ quyết định nghiệp vụ; không phải bước phê duyệt PR bổ sung.

**Rà soát bằng chứng kiểm toán** giao Kiểm toán nội bộ trách nhiệm thực hiện/cuối cùng đối với rà soát kiểm toán, nhất quán UC-11. Mua hàng và Tài chính cũng có thể xem lịch sử được phép theo UC-11; phạm vi truy cập vẫn thuộc OD-07. RACI quy trình này khác [RACI rà soát/ký duyệt tài liệu yêu cầu nghiệp vụ (BRD)](../05-brd/approval-and-signoff.md#6-ma-trận-phê-duyệt). Cả `R` và `A` đều không cấp quyền hệ thống; chưa có ký duyệt thực tế của các bên liên quan.

Mọi PO phải có phê duyệt của Trưởng bộ phận mua hàng. Phê duyệt của Trưởng bộ phận tài chính là bổ sung có điều kiện; tiêu chí áp dụng và các ngưỡng còn mở theo OD-01/OD-02. Phải hoàn tất mọi phê duyệt bắt buộc trước phát hành, PO bị trả lại được chỉnh sửa và gửi lại qua luồng áp dụng. CFO vẫn là nhà bảo trợ cấp điều hành, có thể rà soát định hướng dự án/BRD nhưng không phê duyệt PO vận hành.

---

# 9. Giới hạn quan trọng của RACI

Không nên dùng RACI thay mô hình quy trình BPMN.

RACI xác định trách nhiệm:

```text
Ai thực hiện?
Ai chịu trách nhiệm cuối cùng?
Ai phải được tham vấn?
Ai phải được thông báo?
```

BPMN sau này mô tả:

```text
Hoạt động xảy ra khi nào?
Điều gì xảy ra trước và sau?
Quyết định nào được đưa ra?
Thông tin di chuyển thế nào?
Có ngoại lệ nào?
```

Vì vậy hai tài liệu phục vụ mục đích khác nhau.

---

# 10. Ưu tiên khai thác yêu cầu

Không phải mọi bên liên quan cung cấp cùng loại thông tin.

Để khai thác yêu cầu chi tiết, dự án nên ưu tiên các vai trò sau.

### Ưu tiên 1 — Kiến thức vận hành và quy trình

**Nhân viên mua hàng**

Nguồn chính cho:

* xử lý PR;
* chọn nhà cung cấp;
* tạo PO;
* ngoại lệ mua hàng;
* vấn đề vận hành.

**Kế toán công nợ phải trả**

Nguồn chính cho:

* xử lý hóa đơn nhà cung cấp;
* đối chiếu ba bên;
* ngoại lệ hóa đơn.

### Ưu tiên 2 — Quy tắc nghiệp vụ và kiểm soát

**Trưởng bộ phận mua hàng**

Nguồn chính cho:

* chính sách mua hàng;
* quy tắc PO;
* yêu cầu phê duyệt mua hàng.

**Trưởng bộ phận tài chính**

Nguồn chính cho:

* kiểm soát ngân sách;
* kiểm soát thanh toán;
* yêu cầu phê duyệt tài chính.

### Ưu tiên 3 — Yêu cầu hỗ trợ quy trình

**Quản lý cửa hàng / Người yêu cầu**

Cung cấp yêu cầu liên quan:

* tạo yêu cầu mua hàng;
* phê duyệt PR;
* khả năng theo dõi trạng thái.

**Nhân viên kho**

Cung cấp yêu cầu liên quan:

* phiếu nhận hàng;
* sai lệch số lượng;
* giao hàng một phần.

### Xác nhận chuyên môn

**Kiểm toán nội bộ**

Xác nhận:

* khả năng kiểm toán;
* yêu cầu kiểm soát;
* phân tách nhiệm vụ.

**Bộ phận công nghệ thông tin**

Xác nhận:

* tính khả thi kỹ thuật;
* ranh giới hệ thống;
* giả định tích hợp.

---

# 11. Bên liên quan và tác nhân hệ thống

Bên liên quan không tự động là tác nhân hệ thống.

Ví dụ:

```text
CFO
→ Bên liên quan
→ Có thể chủ yếu sử dụng báo cáo
→ Không nhất thiết thực hiện giao dịch hằng ngày
```

```text
Nhà cung cấp
→ Bên liên quan bên ngoài
→ Tương tác với P2P
→ Cổng nhà cung cấp ngoài phạm vi hiện tại
→ Vì vậy có thể không là tác nhân hệ thống trực tiếp
```

Tập tác nhân hệ thống cuối cùng sẽ được xác định khi mô hình hóa UC sau này.

Tác nhân hệ thống vận hành dự kiến gồm:

* Người yêu cầu;
* Quản lý cửa hàng;
* Nhân viên mua hàng;
* Trưởng bộ phận mua hàng;
* Nhân viên kho;
* Kế toán công nợ phải trả;
* Trưởng bộ phận tài chính.

---

# 12. Tóm tắt phân tích

Phân tích xác định ba nhóm bên liên quan có ảnh hưởng lớn nhất đến giải pháp đề xuất.

### Người dùng vận hành

```text
Người yêu cầu
Nhân viên mua hàng
Nhân viên kho
Kế toán công nợ phải trả
```

Họ cung cấp yêu cầu chi tiết về cách quy trình thực tế được thực hiện.

### Chủ thể nghiệp vụ và kiểm soát

```text
Quản lý cửa hàng
Trưởng bộ phận mua hàng
Trưởng bộ phận tài chính
```

Họ xác định yêu cầu phê duyệt, mua hàng, ngân sách và kiểm soát.

### Vai trò quản trị và hỗ trợ

```text
CFO
Kiểm toán nội bộ
Bộ phận công nghệ thông tin
Nhà cung cấp
```

Họ cung cấp bảo trợ, quản trị, ý kiến chuyên môn hoặc tương tác quy trình từ bên ngoài.

Mô hình bên liên quan trong phân tích này là đầu vào cho quy trình BPMN hiện trạng (As-Is), quy trình đề xuất tương lai, yêu cầu nghiệp vụ, UC và yêu cầu kiểm soát truy cập hệ thống.
