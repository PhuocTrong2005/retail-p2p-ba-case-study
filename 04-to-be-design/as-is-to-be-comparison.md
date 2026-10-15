# So sánh quy trình As-Is và To-Be

## Tổng quan

Tài liệu so sánh quy trình từ mua hàng đến thanh toán (Procure-to-Pay — P2P) hiện tại của NovaRetail JSC với quy trình tương lai được đề xuất.

So sánh làm rõ:

* điều gì thay đổi;
* vì sao cần thay đổi;
* hoạt động nào vẫn do con người chịu trách nhiệm;
* hoạt động theo quy tắc nào được tự động hóa;
* tác động nghiệp vụ kỳ vọng của từng cải tiến.

Mục đích không phải chứng minh mọi hoạt động thủ công đều nên biến mất.

Quy trình To-Be giữ phán đoán của con người ở nơi tạo giá trị nghiệp vụ, đồng thời giảm phối hợp thủ công không cần thiết, nhập liệu lặp lại và kiểm soát không nhất quán.

---

# 1. Tóm tắt điều hành

Quy trình As-Is có thể tóm tắt là:

```text
Thủ công
+
Phân tán
+
Phụ thuộc email
+
Hạn chế khả năng theo dõi
```

Quy trình To-Be đề xuất hướng đến:

```text
Luồng công việc chuẩn hóa
+
Dữ liệu giao dịch liên thông
+
Tự động hóa theo quy tắc
+
Ngoại lệ có kiểm soát
+
Cải thiện khả năng truy vết
```

Vì vậy, thay đổi nền tảng không chỉ đơn thuần là:

```text
Thủ công → Số hóa
```

Mà là:

```text
Quy trình phân tán
        ↓
Quy trình liên thông và có kiểm soát
```

---

# 2. So sánh tổng quan

|Lĩnh vực| As-Is                       | To-Be                                         |
| -------------------- | --------------------------- | --------------------------------------------- |
| Yêu cầu mua hàng | Lập trên Excel | Lập trong luồng mua hàng |
| Kiểm tra dữ liệu PR | Chủ yếu thủ công | Hệ thống kiểm tra dữ liệu bắt buộc |
| Kiểm soát ngân sách | Thủ công / không nhất quán | Kiểm tra ngân sách bắt buộc |
| Phê duyệt PR | Qua email | Theo luồng công việc |
| Lựa chọn nhà cung cấp | Nhà cung cấp hiện có đã phê duyệt | Nhà cung cấp hiện có đã phê duyệt |
| Lập PO | Nhập lại dữ liệu PR | Tái sử dụng thông tin PR |
| Chuyển phê duyệt PO | Chuyển email thủ công | Chuyển theo luồng công việc dựa trên quy tắc |
| Phê duyệt tài chính | Xác định thủ công | Áp dụng theo quy tắc được cấu hình |
| Phát hành PO | Gửi sau phê duyệt qua email | Chỉ phát hành sau các phê duyệt bắt buộc trong luồng |
| Dữ liệu giao dịch | Phân tán trên nhiều công cụ | Kết nối hồ sơ giao dịch liên quan |
| Trạng thái PR/PO | Đôn đốc thủ công | Trạng thái luồng công việc tập trung |
| Lịch sử kiểm toán | Email/tệp | Lịch sử giao dịch tập trung |
| Phiếu nhận hàng | Hồ sơ kho riêng | GR liên kết PO |
| Hóa đơn nhà cung cấp | Hồ sơ kế toán riêng | Hóa đơn liên kết PO |
| Đối chiếu ba bên | Thủ công | Tự động cho giao dịch đủ điều kiện |
| Ngoại lệ đối chiếu | Email / điện thoại | Luồng ngoại lệ có cấu trúc |
| Đề nghị thanh toán | Chuẩn bị thủ công | Chỉ chuẩn bị sau khi đối chiếu hiện hành đạt theo quy tắc áp dụng |
| Phê duyệt thanh toán | Phối hợp thủ công | Phê duyệt theo luồng công việc |
| Thanh toán ngân hàng | Ngoài phạm vi | Ngoài phạm vi |

---

# 3. Yêu cầu mua hàng

## As-Is

Người yêu cầu lập yêu cầu mua hàng (Purchase Requisition — PR) bằng Excel.

```text
Nhu cầu mua hàng
      ↓
Lập PR trên Excel
      ↓
Gửi qua email
```

Thông tin được lưu trong tệp trước khi bộ phận mua hàng có hồ sơ giao dịch tập trung.

### Vấn đề

* thông tin phân tán;
* hạn chế khả năng theo dõi trạng thái;
* có thể nhập dữ liệu trùng lặp ở các bước sau.

---

## To-Be

Người yêu cầu lập PR trực tiếp trong luồng mua hàng.

```text
Nhu cầu mua hàng
      ↓
Lập PR
      ↓
Gửi PR
```

### Thay đổi chính

Giao dịch mua hàng bắt đầu trong quy trình có kiểm soát thay vì bảng tính bên ngoài.

### Tác động kỳ vọng

* theo dõi giao dịch sớm hơn;
* thông tin PR chuẩn hóa;
* dữ liệu tái sử dụng được ở các bước sau.

---

# 4. Kiểm tra PR

## As-Is

Thông tin PR được người dùng ở các bước sau xem xét thủ công.

Thông tin thiếu hoặc sai có thể chỉ được phát hiện sau khi yêu cầu đã gửi.

---

## To-Be

Hệ thống kiểm tra thông tin bắt buộc trước khi PR tiếp tục.

```text
Gửi PR
    ↓
Kiểm tra thông tin bắt buộc
```

### Tác động kỳ vọng

Có thể nhận diện sớm yêu cầu chưa đầy đủ, giảm làm rõ không cần thiết ở các bước sau.

---

# 5. Kiểm soát ngân sách

## As-Is

Kiểm tra ngân sách được thực hiện thủ công và có thể phụ thuộc vào thông tin có sẵn riêng biệt.

```text
PR
 ↓
Kiểm tra ngân sách thủ công
```

Do đó, kiểm soát có thể được áp dụng không nhất quán.

---

## To-Be

Mọi PR đã gửi đều qua bước kiểm tra ngân sách tiêu chuẩn.

```text
PR đã gửi
     ↓
Kiểm tra ngân sách
     ↓
Có đủ ngân sách?
```

### Nếu không

```text
Trả PR
   ↓
Chỉnh sửa
   ↓
Gửi lại
```

### Nếu có

Yêu cầu chuyển sang phê duyệt nghiệp vụ.

---

## Tác động đến nghiệp vụ

Thay đổi cải thiện kiểm soát tài chính mà không đưa quản lý ngân sách doanh nghiệp vào phạm vi dự án.

---

# 6. Phê duyệt yêu cầu mua hàng

## As-Is

Quản lý cửa hàng nhận PR qua email và xem xét thủ công.

Bằng chứng phê duyệt nằm trong trao đổi email.

---

## To-Be

Quản lý cửa hàng xem xét PR qua luồng mua hàng.

Thông tin liên quan có sẵn trong cùng giao dịch.

```text
PR đã kiểm tra đạt
     ↓
Quản lý cửa hàng xem xét
     ↓
Được phê duyệt?
```

---

## Thay đổi chính

**Quyết định vẫn do con người đưa ra**, còn luồng công việc quanh quyết định trở nên có cấu trúc.

Phân biệt này quan trọng:

```text
Tự động hóa
≠
Tự động phê duyệt giao dịch mua
```

Hệ thống hỗ trợ quy trình. Quản lý cửa hàng vẫn chịu trách nhiệm quyết định nghiệp vụ.

---

# 7. Lựa chọn nhà cung cấp

## As-Is

Bộ phận mua hàng chọn nhà cung cấp hiện có.

## To-Be

Bộ phận mua hàng tiếp tục chọn từ danh mục nhà cung cấp đã được phê duyệt.

---

## Nội dung giữ nguyên

Hoạt động này được chủ ý không thay bằng:

* tìm nguồn cung tự động;
* yêu cầu báo giá (RFQ);
* nhà cung cấp dự thầu;
* tiếp nhận nhà cung cấp mới.

Dự án cải tiến không cần thay đổi mọi hoạt động hiện có.

Lựa chọn nhà cung cấp vẫn do con người thuộc bộ phận mua hàng chịu trách nhiệm vì tìm nguồn cung chiến lược đầy đủ nằm ngoài phạm vi.

---

# 8. Lập đơn đặt hàng

## As-Is

Nhân viên mua hàng lập đơn đặt hàng (Purchase Order — PO) và có thể nhập lại thủ công thông tin từ yêu cầu mua hàng.

```text
PR
 ↓
Đọc dữ liệu
 ↓
Nhập lại
 ↓
PO
```

---

## To-Be

Nhân viên mua hàng lập PO bằng thông tin từ PR đã phê duyệt.

```text
PR đã phê duyệt
     ↓
Tái sử dụng dữ liệu
     ↓
Lập PO
```

Nhân viên mua hàng bổ sung hoặc cập nhật thông tin riêng của PO như:

* nhà cung cấp;
* giá mua;
* điều khoản giao hàng;
* thông tin thương mại.

---

## Tác động kỳ vọng

* ít điểm nhập liệu thủ công hơn;
* giảm rủi ro lỗi;
* cải thiện tính nhất quán từ PR đến PO.

---

# 9. Chuyển phê duyệt đơn đặt hàng

## As-Is

Nhân viên mua hàng gửi PO thủ công qua email.

```text
Lập PO
    ↓
Gửi email
    ↓
Chờ
```

Nhân viên có thể phải đôn đốc thủ công.

---

## To-Be

Hệ thống đánh giá quy tắc phê duyệt áp dụng và chuyển PO.

```text
Gửi PO
    ↓
Đánh giá quy tắc
    ↓
Chuyển phê duyệt
```

---

## Thay đổi chính

Trách nhiệm **chuyển phê duyệt** thay đổi:

```text
As-Is:
Nhân viên mua hàng → Chuyển thủ công

To-Be:
Hệ thống → Chuyển theo quy tắc
```

Trách nhiệm **phê duyệt** giữ nguyên:

```text
Trưởng bộ phận mua hàng / Trưởng bộ phận tài chính
→ Quyết định con người
```

---

# 10. Phê duyệt mua hàng

## As-Is

Trưởng bộ phận mua hàng nhận PO qua email, rồi phê duyệt hoặc trả về.

PO bị trả về cần trao đổi và đôn đốc thủ công.

---

## To-Be

Trưởng bộ phận mua hàng thực hiện phê duyệt mua hàng qua luồng công việc. Phê duyệt của Trưởng bộ phận tài chính là bổ sung khi tiêu chí áp dụng yêu cầu; mọi phê duyệt bắt buộc đều phải có trước phát hành.

```text
Xem xét PO
   ↓
Được phê duyệt?
├── Có → Tiếp tục
└── Không → Trả lại để chỉnh sửa
```

PO đã chỉnh sửa được gửi lại qua quy trình có kiểm soát.

---

## Tác động kỳ vọng

* trách nhiệm phụ trách giao dịch rõ hơn;
* đường trả về/gửi lại nhất quán;
* cải thiện lịch sử phê duyệt.

---

# 11. Phê duyệt tài chính có điều kiện

## As-Is

Có thể cần phê duyệt tài chính bổ sung, nhưng việc chuyển phụ thuộc vào xử lý thủ công.

---

## To-Be

Hệ thống đánh giá có cần phê duyệt tài chính bổ sung hay không.

```text
Đã phê duyệt mua hàng
        ↓
Cần phê duyệt tài chính?
       /                  \
      Không                Có
     ↓                      ↓
Tiếp tục             Tài chính xem xét
```

---

## Cải tiến thiết kế

BPMN không gán cố định ngưỡng tiền cụ thể.

Thay vào đó:

> Tiêu chí phê duyệt được duy trì dưới dạng quy tắc nghiệp vụ có thể cấu hình.

Điều này giữ thiết kế quy trình ổn định nếu NovaRetail thay đổi chính sách phê duyệt tài chính sau này.

---

# 12. Phát hành đơn đặt hàng

## As-Is

Bộ phận mua hàng gửi PO đã phê duyệt cho Nhà cung cấp sau khi xác nhận các phê duyệt qua email bắt buộc.

---

## To-Be

PO chỉ được phát hành sau khi luồng công việc xác nhận mọi phê duyệt bắt buộc đã hoàn tất.

```text
Đã hoàn tất các phê duyệt bắt buộc?
       ↓
       Có
       ↓
Phát hành PO
```

---

## Tác động kỳ vọng

Quy trình giảm rủi ro gửi PO trước khi đáp ứng các điều kiện phê duyệt bắt buộc.

---

# 13. Tương tác với nhà cung cấp

## As-Is

Nhà cung cấp:

```text
Nhận PO
   ↓
Chuẩn bị hàng
   ↓
Giao hàng
   ↓
Gửi hóa đơn
```

## To-Be

Tương tác nghiệp vụ bên ngoài về cơ bản giữ nguyên.

---

## Nội dung giữ nguyên

Dự án không bổ sung cổng thông tin nhà cung cấp.

Nhà cung cấp vẫn là bên tham gia bên ngoài và tiếp tục:

* nhận PO;
* giao hàng;
* cung cấp hóa đơn.

Điều này tránh mở rộng phạm vi không cần thiết.

---

# 14. Phiếu nhận hàng

## As-Is

Nhân viên kho ghi phiếu nhận hàng (Goods Receipt — GR) trong tệp hoặc hệ thống kho riêng.

Thông tin có thể chưa được kết nối ngay với giao dịch mua hàng.

---

## To-Be

Nhân viên kho ghi phiếu nhận hàng theo đơn đặt hàng liên quan.

```text
PO-001
  │
  └── GR-001
```

---

## Thay đổi chính

Hoạt động nhận hàng vật lý vẫn do con người thực hiện.

Cải tiến liên quan **quan hệ giao dịch**, không thay thế Nhân viên kho.

---

## Tác động kỳ vọng

* dễ xác định PO liên quan hơn;
* truy vết nhận hàng tốt hơn;
* đầu vào trực tiếp cho đối chiếu ba bên.

---

# 15. Hóa đơn nhà cung cấp

## As-Is

AP nhận hóa đơn nhà cung cấp và ghi vào công cụ kế toán.

Kế toán có thể phải xác định thủ công PO và phiếu nhận hàng liên quan.

---

## To-Be

Hóa đơn nhà cung cấp được ghi nhận theo đơn đặt hàng liên quan.

```text
PO-001
  │
  └── INV-001
```

Điều này tạo cấu trúc:

```text
PR-001
   │
   └── PO-001
         ├── GR-001
         └── INV-001
```

---

## Tác động kỳ vọng

Dữ liệu giao dịch liên quan có thể được truy xuất nhất quán hơn để đối chiếu và xem xét.

---

# 16. Đối chiếu ba bên

## As-Is

AP thực hiện đối chiếu thủ công.

```text
Tìm PO
+
Tìm GR
+
Hóa đơn
   ↓
So sánh thủ công
```

---

## To-Be

Hệ thống thực hiện đối chiếu theo quy tắc được xác định trước.

```text
PO
+
GR
+
Hóa đơn
   ↓
Đối chiếu tự động
```

Các thuộc tính so sánh điển hình gồm:

* nhà cung cấp;
* mặt hàng;
* số lượng;
* đơn giá;
* tổng tiền.

---

## Thay đổi chính

Giao dịch thông thường chuyển từ:

```text
Con người so sánh từng giao dịch
```

sang:

```text
Hệ thống kiểm tra giao dịch thông thường
Con người tập trung vào ngoại lệ
```

---

## Tác động kỳ vọng

* giảm công việc AP lặp lại;
* xử lý hóa đơn thông thường nhanh hơn;
* thực thi kiểm soát nhất quán hơn.

---

# 17. Xử lý ngoại lệ đối chiếu

## As-Is

Điều tra sai lệch có thể gồm:

```text
Gửi email cho bộ phận mua hàng
       ↓
Gọi kho
       ↓
Liên hệ nhà cung cấp
       ↓
Chờ
       ↓
Kiểm tra lại
```

Lịch sử ngoại lệ có thể khó tái dựng.

---

## To-Be

Ngoại lệ có cấu trúc được tạo.

```text
Sai lệch
   ↓
Ngoại lệ đã tạo
   ↓
Đã giao xem xét
   ↓
Điều tra
   ↓
Ghi nhận chỉnh sửa
   ↓
Chạy lại đối chiếu
   ↓
Đạt? Có → Xác nhận ngoại lệ đã xử lý / đủ điều kiện
     Không → Giữ mở / chặn đề nghị thanh toán
```

Ngoại lệ giữ:

* loại;
* giao dịch liên quan;
* người phụ trách;
* trạng thái;
* lý do;
* lịch sử xử lý.

---

## Quyết định thiết kế quan trọng

Xử lý ngoại lệ **không bị loại bỏ**.

Tự động hóa áp dụng cho luồng thông thường, còn trường hợp phức tạp tiếp tục cần phán đoán con người.

Điều này tránh việc thiết kế To-Be giả định thiếu thực tế về xử lý xuyên suốt tự động 100%.

---

# 18. Trạng thái giao dịch

## As-Is

Người dùng xác định trạng thái PR/PO qua:

* email;
* bảng tính;
* liên hệ bộ phận mua hàng;
* liên hệ người phê duyệt.

---

## To-Be

Giao dịch duy trì trạng thái hiện tại rõ ràng.

```text
Đã gửi
↓
Chờ phê duyệt
↓
Đã phê duyệt
↓
Đã đặt hàng
↓
Đã nhận hàng
↓
Đang đối chiếu
↓
Đã đối chiếu đạt
↓
Đã phê duyệt thanh toán
```

---

## Tác động kỳ vọng

* giảm hỏi trạng thái;
* dễ nhận diện công việc đang chờ hơn;
* cải thiện khả năng theo dõi vận hành.

---

# 19. Lịch sử kiểm toán

## As-Is

Bằng chứng phê duyệt và giao dịch phân tán trong email và tệp.

---

## To-Be

Hành động quan trọng được lưu như một phần lịch sử giao dịch.

Ví dụ:

| Giao dịch | Hành động | Người dùng | Thời gian |
| ----------- | --------- | ------------------- | ----- |
| PO-001 | Đã tạo | Nhân viên mua hàng | 09:05 |
| PO-001      |Đã gửi|Nhân viên mua hàng| 09:20 |
| PO-001      |Đã phê duyệt|Trưởng bộ phận mua hàng| 10:10 |

---

## Tác động kỳ vọng

Tổ chức có thể dễ trả lời hơn:

```text
Ai thực hiện hành động?
Khi nào?
Điều gì thay đổi?
Giao dịch nào bị ảnh hưởng?
```

---

# 20. Đề nghị thanh toán

## As-Is

Sau đối chiếu thủ công, AP chuẩn bị thông tin hỗ trợ phê duyệt thanh toán.

---

## To-Be

Chỉ được chuẩn bị và gửi đề nghị thanh toán khi kết quả đối chiếu hiện hành thỏa mãn quy tắc áp dụng. Chỉnh sửa mà chưa đối chiếu lại đạt không làm hóa đơn đủ điều kiện.

```text
Hóa đơn đã đối chiếu đạt
      ↓
Chuẩn bị đề nghị thanh toán
```

---

## Tác động kỳ vọng

Chuẩn bị thanh toán chỉ diễn ra sau khi hoàn tất các kiểm soát mua hàng bắt buộc.

---

# 21. Phê duyệt thanh toán

## As-Is

Tài chính xem xét đề nghị thanh toán và chứng từ hỗ trợ.

## To-Be

Tài chính tiếp tục đưa ra quyết định phê duyệt thanh toán cuối cùng, nhưng đề nghị được chuyển và theo dõi qua luồng công việc.

```text
Đề nghị thanh toán
      ↓
Tài chính xem xét
      ↓
Được phê duyệt?
```

---

## Nội dung giữ nguyên

Trưởng bộ phận tài chính vẫn chịu trách nhiệm quyết định phê duyệt.

Thực hiện thanh toán ngân hàng thực tế nằm ngoài phạm vi của cả hai mô hình.

---

# 22. Trách nhiệm thủ công và tự động

Quy trình To-Be không cố loại con người khỏi mọi bước quy trình.

| Hoạt động | As-Is | To-Be |
| --------------------------- | ------------------------- | ------------------------------ |
| Xác định nhu cầu mua hàng | Con người | Con người |
| Lập PR | Con người | Con người dùng hệ thống tập trung |
| Kiểm tra trường PR bắt buộc | Con người / xem xét ở bước sau | Tự động |
| Kiểm tra ngân sách | Thủ công | Kiểm tra tự động theo quy tắc |
| Phê duyệt PR | Con người | Con người |
| Chọn nhà cung cấp | Con người | Con người |
| Lập PO | Con người | Con người cùng tái sử dụng dữ liệu |
| Chuyển phê duyệt PO | Con người | Tự động |
| Phê duyệt PO | Con người | Con người |
| Nhận hàng | Con người | Con người |
| Kiểm tra hàng | Con người | Con người |
| Ghi GR | Con người | Con người dùng giao dịch liên kết |
| Ghi hóa đơn | Con người | Con người dùng giao dịch liên kết |
| Đối chiếu ba bên thông thường | Con người | Tự động |
| Xử lý sai lệch | Con người | Con người theo luồng có cấu trúc |
| Chuẩn bị đề nghị thanh toán | Con người | Con người |
| Chuyển đề nghị thanh toán | Thủ công | Tự động |
| Phê duyệt đề nghị thanh toán | Con người | Con người |

Phân biệt này thể hiện nguyên tắc thiết kế:

> **Tự động hóa quy tắc lặp lại; giữ phán đoán con người ở nơi cần quyết định nghiệp vụ.**

---

# 23. Tổng hợp cải tiến điểm bất cập

| Điểm bất cập | Tình trạng As-Is | Đáp ứng To-Be |
| ---------- | --------------------------------------- | ------------------------------- |
| PP-01 | Phê duyệt email tạo thời gian chờ | Phê duyệt PO theo luồng công việc |
| PP-02 | Dữ liệu nằm ở các nguồn riêng | Hồ sơ mua hàng liên thông |
| PP-03 | AP đối chiếu thủ công từng hóa đơn | Đối chiếu tự động + ngoại lệ |
| PP-04 | Người dùng hỏi trạng thái thủ công | Trạng thái luồng công việc |
| PP-05 | Bằng chứng kiểm toán phân tán trong các tệp | Lịch sử giao dịch |
| PP-06 | Kiểm tra ngân sách thủ công/không nhất quán | Kiểm tra ngân sách bắt buộc |
| PP-07 | Thông tin PR nhập lại | Tái sử dụng dữ liệu PR đã phê duyệt |

---

# 24. Tác động nghiệp vụ kỳ vọng

## Hiệu quả quy trình

Quy trình To-Be giảm:

* công sức chuyển phê duyệt;
* nhập dữ liệu lặp lại;
* tìm và lấy chứng từ thủ công;
* đối chiếu thủ công cho giao dịch thông thường.

---

## Dữ liệu và khả năng theo dõi

Quy trình To-Be cải thiện:

* truy vết từ PR đến PO;
* truy vết từ PO đến GR;
* truy vết từ PO đến hóa đơn;
* khả năng theo dõi trạng thái giao dịch.

---

## Kiểm soát và quản trị

Quy trình To-Be tăng cường:

* kiểm soát ngân sách;
* kiểm soát phê duyệt;
* kiểm soát đối chiếu hóa đơn;
* truy vết ngoại lệ;
* lịch sử kiểm toán.

---

# 25. Những hoạt động chủ ý giữ thủ công

Một số hoạt động vẫn thủ công vì cần phán đoán nghiệp vụ hoặc hành động vật lý.

Bao gồm:

* xác định nhu cầu mua hàng;
* phê duyệt nghiệp vụ;
* lựa chọn nhà cung cấp;
* phê duyệt mua hàng;
* kiểm tra hàng vật lý;
* điều tra ngoại lệ phức tạp;
* chuẩn bị đề nghị thanh toán;
* phê duyệt thanh toán cuối cùng.

Đây là chủ ý.

Quy trình To-Be được thiết kế tốt không giả định mọi hoạt động thủ công đều kém hiệu quả.

---

# 26. Điều kiện phụ thuộc của quy trình To-Be

Quy trình tương lai đề xuất phụ thuộc một số điều kiện.

### Danh mục nhà cung cấp đáng tin cậy

Điều kiện sử dụng nhà cung cấp phụ thuộc thông tin chính xác về nhà cung cấp đã phê duyệt.

### Thông tin ngân sách khả dụng

Kiểm tra ngân sách tự động cần dữ liệu ngân sách truy cập được và đủ cập nhật.

### Quy tắc phê duyệt được xác định

Chuyển phê duyệt cần chủ sở hữu nghiệp vụ xác định và duy trì tiêu chí phê duyệt.

### Chất lượng dữ liệu giao dịch

Đối chiếu tự động phụ thuộc dữ liệu PO, GR và hóa đơn nhất quán.

### Sự chấp nhận sử dụng của người dùng

Quy trình chỉ cải thiện nếu người dùng thực hiện hoạt động mua hàng qua luồng đã xác định thay vì tiếp tục dựa vào bảng tính và quy trình email song song.

---

# 27. Quyết định thiết kế còn lại

Một số giá trị chưa thể được chốt có căn cứ ở giai đoạn này.

Bao gồm:

* ngưỡng tiền phê duyệt;
* giá trị dung sai đối chiếu;
* chính sách kiểm tra ngân sách chi tiết;
* quy tắc chuyển cấp ngoại lệ;
* trạng thái hệ thống chi tiết;
* quyền chi tiết theo vai trò.

Các nội dung này cần chủ sở hữu nghiệp vụ xác nhận hoặc phân tích yêu cầu thêm.

---

# 28. Nhất quán phạm vi

Quy trình To-Be không bổ sung các khả năng sau:

```text
Tiếp nhận nhà cung cấp mới
Yêu cầu báo giá / đề xuất (RFQ / RFP)
Quản lý đấu thầu
Quản lý hợp đồng
Chấm điểm nhà cung cấp
Dự báo nhu cầu
Quản lý kho đầy đủ
Kế toán sổ cái
Bộ máy tính thuế
Thực hiện thanh toán ngân hàng
Cổng thông tin nhà cung cấp
Thay thế toàn bộ ERP
```

Lựa chọn nhà cung cấp tiếp tục dùng danh mục nhà cung cấp đã được phê duyệt hiện có.

Chuyển khoản ngân hàng vẫn nằm ngoài điểm kết thúc dự án.

---

# 29. Tổng hợp chuyển đổi

Chuyển đổi tổng thể có thể biểu diễn như sau:

```text
AS-IS
────────────────────────────────

Excel / Email
      ↓
Bàn giao thủ công
      ↓
Dữ liệu phân tán
      ↓
Đối chiếu thủ công
      ↓
Hạn chế khả năng theo dõi


TO-BE
────────────────────────────────

Luồng mua hàng tập trung
      ↓
Dữ liệu giao dịch liên thông
      ↓
Chuyển và kiểm soát theo quy tắc
      ↓
Đối chiếu thông thường tự động
      ↓
Ngoại lệ có cấu trúc
      ↓
Trạng thái + lịch sử kiểm toán
```

Vì vậy, thiết kế đề xuất cải thiện quy trình mà không mở rộng không cần thiết thành triển khai toàn bộ hệ thống mua hàng doanh nghiệp hoặc ERP.

---

# 30. Kết luận

Quy trình To-Be giải quyết các điểm yếu cấu trúc chính được xác định trong phân tích As-Is, đồng thời giữ việc ra quyết định cần thiết của con người.

Chuyển đổi cốt lõi là:

```text
Phối hợp thủ công
      ↓
Luồng công việc có cấu trúc

Hồ sơ phân tán
      ↓
Giao dịch liên thông

Kiểm tra thông thường thủ công
      ↓
Tự động hóa theo quy tắc

Ngoại lệ thiếu cấu trúc
      ↓
Luồng ngoại lệ có kiểm soát
```

Các thay đổi này tạo nền tảng quy trình nghiệp vụ cho BRD, phân tích hệ thống, SRS và hoạt động truy vết yêu cầu sau này.
