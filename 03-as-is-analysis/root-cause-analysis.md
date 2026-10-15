# Phân tích nguyên nhân gốc rễ

## 1. Mục đích

Phân tích nguyên nhân gốc rễ nhằm xác định nguyên nhân sâu xa của những vấn đề đáng kể nhất trong quy trình từ mua hàng đến thanh toán (Procure-to-Pay — P2P) hiện tại của NovaRetail.

Phân tích tập trung vào ba nhóm vấn đề có tác động lớn:

1. chậm phê duyệt đơn đặt hàng (Purchase Order — PO);
2. dữ liệu mua hàng phân tán và nhập lặp lại;
3. đối chiếu ba bên thủ công.

Các nhóm này được chọn vì ảnh hưởng trực tiếp đến thời gian chu trình, khối lượng công việc vận hành, chất lượng dữ liệu và xử lý hóa đơn ở các bước sau.

Mục tiêu là tránh chỉ xử lý biểu hiện bên ngoài và xác định các điểm yếu sâu xa về quy trình, dữ liệu và công nghệ để định hướng thiết kế quy trình tương lai (To-Be).

---

## 2. Phương pháp phân tích

Áp dụng phương pháp Năm câu hỏi tại sao (Five Whys) giản lược.

Phân tích theo logic:

```text id="xxrddd"
Vấn đề quan sát được
      ↓
Tại sao xảy ra?
      ↓
Nguyên nhân trực tiếp
      ↓
Tại sao tồn tại tình trạng đó?
      ↓
Nguyên nhân sâu xa
      ↓
Nguyên nhân gốc rễ
```

Phân tích dựa trên quy trình hiện tại (As-Is) được xác định cho nghiên cứu tình huống này.

Vì NovaRetail là tổ chức giả lập, các nguyên nhân được xác định là giả định phân tích rút ra từ quy trình được mô hình hóa, không phải kết quả phỏng vấn nhân viên thực tế hoặc dữ liệu vận hành thực tế.

---

## 3. RC-01 — Chậm phê duyệt đơn đặt hàng

### Vấn đề quan sát được

Việc phê duyệt đơn đặt hàng kéo dài hơn dự kiến.

**Điểm bất cập liên quan:** PP-01.

---

### Phân tích Năm câu hỏi tại sao

**Tại sao 1 — Tại sao phê duyệt PO mất nhiều thời gian?**

Vì đơn đặt hàng có thể phải chờ lâu để quản lý xem xét và phản hồi.

```text id="omav3q"
PO đã gửi
     ↓
Chờ đợi
     ↓
Quản lý xem xét
```

---

**Tại sao 2 — Tại sao yêu cầu phải chờ?**

Vì yêu cầu phê duyệt được gửi qua email và phụ thuộc vào việc người phê duyệt nhận thấy, xử lý thư.

---

**Tại sao 3 — Tại sao quy trình phụ thuộc vào email?**

Vì quy trình mua hàng hiện tại chưa có hàng đợi phê duyệt tập trung hoặc luồng công việc chuẩn hóa.

---

**Tại sao 4 — Tại sao chưa có luồng phê duyệt tập trung?**

Vì việc lập và phê duyệt đơn đặt hàng được quản lý qua các công cụ rời rạc và trao đổi thủ công.

---

### Nguyên nhân gốc rễ

> **Thiếu luồng phê duyệt đơn đặt hàng được chuẩn hóa và tập trung.**

---

### Yếu tố góp phần

Nguyên nhân gốc rễ có thể bị tác động thêm bởi:

* chuyển phê duyệt thủ công;
* không có danh sách tập trung các yêu cầu chờ phê duyệt;
* hạn chế khả năng theo dõi trạng thái giao dịch;
* chưa xác định cơ chế chuyển cấp xử lý;
* bằng chứng phê duyệt phân tán trong email.

---

### Hệ quả đối với nghiệp vụ

```text id="y9nvxb"
Không có luồng công việc chuẩn hóa
          ↓
Chuyển thủ công qua email
          ↓
Thời gian chờ
          ↓
Chu trình phê duyệt PO kéo dài
          ↓
Chậm phát hành PO
```

---

### Hướng cải tiến

Quy trình To-Be nên thiết lập luồng phê duyệt có cấu trúc với quy tắc phê duyệt được xác định và trạng thái giao dịch rõ ràng.

Đây là hướng cải tiến, chưa phải yêu cầu chức năng cuối cùng.

---

## 4. RC-02 — Dữ liệu mua hàng phân tán và nhập lặp lại

### Các vấn đề quan sát được

Thông tin mua hàng phân tán trên nhiều công cụ và cùng một thông tin có thể phải nhập nhiều lần.

**Các điểm bất cập liên quan:**

* PP-02 — Dữ liệu mua hàng phân tán;
* PP-04 — Hạn chế khả năng theo dõi giao dịch;
* PP-07 — Nhập dữ liệu trùng lặp.

---

### Phân tích Năm câu hỏi tại sao

**Tại sao 1 — Tại sao thông tin mua hàng được nhập lặp lại?**

Vì các bước quy trình dùng các tệp, hồ sơ hoặc hệ thống khác nhau.

Ví dụ:

```text id="22c81g"
Yêu cầu mua hàng (PR) trên Excel
   ↓
Hồ sơ PO
   ↓
Hồ sơ kho
   ↓
Hồ sơ kế toán
```

---

**Tại sao 2 — Tại sao các bước quy trình dùng hồ sơ riêng?**

Vì các bộ phận quản lý thông tin độc lập.

---

**Tại sao 3 — Tại sao thông tin giao dịch được quản lý độc lập?**

Vì dữ liệu giao dịch không được tự động chia sẻ xuyên suốt vòng đời P2P.

---

**Tại sao 4 — Tại sao dữ liệu không được tự động chia sẻ?**

Vì các công cụ hiện tại chưa được tích hợp quanh một giao dịch mua hàng chung.

---

### Nguyên nhân gốc rễ

> **Thiếu luồng dữ liệu mua hàng tích hợp, kết nối các giai đoạn chính trong vòng đời từ mua hàng đến thanh toán.**

---

### Yếu tố góp phần

* yêu cầu mua hàng được lập trên bảng tính;
* hồ sơ kho tách biệt;
* phần mềm kế toán được dùng độc lập;
* trao đổi thông tin qua email;
* không có mã giao dịch chung hoặc cách theo dõi luồng công việc dùng chung;
* hạn chế tái sử dụng dữ liệu giao dịch hiện có.

---

### Hệ quả đối với nghiệp vụ

```text id="pfa81z"
Nguồn thông tin rời rạc
            ↓
Chuyển dữ liệu thủ công
            ↓
Nhập dữ liệu trùng lặp
            ↓
Dữ liệu không nhất quán
            ↓
Hạn chế khả năng theo dõi giao dịch
```

---

### Mối liên hệ với các điểm bất cập khác

Nguyên nhân gốc rễ này góp phần gây ra nhiều vấn đề quan sát được.

```text id="1bfrpg"
Thiếu luồng dữ liệu tích hợp
           ↓
     ┌─────┼─────┐
     ↓     ↓     ↓
   PP-02 PP-04 PP-07
```

Điều này cũng gián tiếp góp phần gây đối chiếu hóa đơn thủ công vì bộ phận công nợ phải trả phải thu thập thông tin giao dịch từ nhiều nguồn.

---

### Hướng cải tiến

Quy trình To-Be nên thiết lập luồng giao dịch liên thông, cho phép tái sử dụng và truy cập thông tin mua hàng hiện có qua các bước quy trình liên quan.

---

## 5. RC-03 — Đối chiếu ba bên thủ công

### Vấn đề quan sát được

Bộ phận công nợ phải trả thực hiện thủ công việc đối chiếu ba bên giữa đơn đặt hàng, phiếu nhận hàng (Goods Receipt — GR) và hóa đơn nhà cung cấp.

**Điểm bất cập liên quan:** PP-03.

---

### Phân tích Năm câu hỏi tại sao

**Tại sao 1 — Tại sao AP thực hiện đối chiếu ba bên thủ công?**

Vì kế toán phải so sánh thủ công đơn đặt hàng, phiếu nhận hàng và hóa đơn nhà cung cấp.

---

**Tại sao 2 — Tại sao phải so sánh chứng từ thủ công?**

Vì thông tin giao dịch liên quan được lấy từ các nguồn riêng biệt.

```text id="5jp1be"
PO
   \
    \
     → Kế toán công nợ phải trả (AP) → So sánh thủ công
    /
GR /
   \
    Hóa đơn
```

---

**Tại sao 3 — Tại sao chứng từ được lấy riêng lẻ?**

Vì thông tin PO, phiếu nhận hàng và hóa đơn không được tự động liên kết qua một luồng giao dịch duy nhất.

---

**Tại sao 4 — Tại sao chúng không được tự động liên kết?**

Vì quy trình hiện tại thiếu dữ liệu chứng từ tích hợp và khả năng đối chiếu.

---

### Nguyên nhân gốc rễ

> **Thiếu dữ liệu PO, phiếu nhận hàng và hóa đơn tích hợp cùng cơ chế đối chiếu tự động.**

---

### Yếu tố góp phần

* hồ sơ giao dịch phân tán;
* tìm và lấy chứng từ thủ công;
* không có quy tắc so sánh tự động;
* xử lý ngoại lệ qua email hoặc điện thoại;
* hạn chế khả năng theo dõi trạng thái chứng từ.

---

### Hệ quả đối với nghiệp vụ

```text id="1qrko2"
PO / GR / hóa đơn tách biệt
          ↓
Thu thập chứng từ thủ công
          ↓
So sánh thủ công
          ↓
Tăng khối lượng công việc của AP
          ↓
Xử lý hóa đơn kéo dài
          ↓
Có thể chậm thanh toán
```

---

### Hướng cải tiến

Quy trình To-Be nên hỗ trợ đối chiếu tự động cho hóa đơn đủ điều kiện, đồng thời cho phép chuyển các giao dịch có sai lệch sang xem xét thủ công có kiểm soát.

Không nên giả định tự động hóa sẽ loại bỏ toàn bộ đối chiếu thủ công vì các trường hợp ngoại lệ vẫn có thể cần điều tra.

---

## 6. Nguyên nhân gốc rễ xuyên suốt

Phân tích cho thấy ba vấn đề chính không độc lập với nhau.

Chúng cùng có một số điểm yếu sâu xa rộng hơn.

### 6.1 Thiếu chuẩn hóa quy trình

Nhiều hoạt động phụ thuộc vào trao đổi riêng lẻ và phối hợp thủ công thay vì luồng công việc được xác định.

Ví dụ gồm:

* phê duyệt PO;
* kiểm tra ngân sách;
* xử lý ngoại lệ.

---

### 6.2 Thiếu luồng dữ liệu tích hợp

Thông tin được lưu trữ và chuyển giao độc lập qua các bước quy trình khác nhau.

Điều này góp phần gây ra:

* dữ liệu phân tán;
* nhập dữ liệu trùng lặp;
* hạn chế khả năng theo dõi;
* thu thập chứng từ thủ công.

---

### 6.3 Phụ thuộc nhiều vào kiểm soát thủ công

Các hoạt động kiểm soát quan trọng dựa vào việc nhân viên kiểm tra và phối hợp thông tin thủ công.

Ví dụ gồm:

* kiểm tra ngân sách;
* theo dõi phê duyệt;
* đối chiếu ba bên;
* xử lý sai lệch.

---

## 7. Tổng hợp nguyên nhân gốc rễ

| Mã nguyên nhân gốc rễ | Nguyên nhân gốc rễ | Các điểm bất cập chính bị ảnh hưởng |
| ------------- | ------------------------------------------------------------------ | ---------------------------- |
| RC-01 | Thiếu luồng phê duyệt PO chuẩn hóa | PP-01, PP-04, PP-05 |
| RC-02 | Thiếu luồng dữ liệu mua hàng tích hợp | PP-02, PP-04, PP-07 |
| RC-03 | Thiếu dữ liệu chứng từ tích hợp và khả năng đối chiếu tự động | PP-03, gián tiếp PP-02 |

Phân tích cho thấy có thể xử lý nhiều điểm bất cập dễ nhận thấy thông qua số lượng ít hơn các cải tiến quy trình nền tảng.

---

## 8. Từ nguyên nhân gốc rễ đến hướng cải tiến

Các nguyên nhân gốc rễ kết nối phân tích As-Is với quy trình To-Be.

```text id="jbk56e"
Nguyên nhân gốc rễ
     ↓
Nguyên tắc cải tiến
     ↓
Quy trình To-Be
     ↓
Yêu cầu nghiệp vụ
     ↓
Yêu cầu chức năng
```

Ví dụ:

```text id="0yi9u3"
RC-01
Chưa có luồng phê duyệt chuẩn hóa
        ↓
Chuẩn hóa chuyển phê duyệt
        ↓
Quy trình phê duyệt PO To-Be
```

```text id="npn2g0"
RC-02
Chưa có luồng dữ liệu mua hàng tích hợp
        ↓
Tái sử dụng và tập trung dữ liệu giao dịch
        ↓
Luồng PR → PO → GR → hóa đơn liên thông
```

```text id="gn7y49"
RC-03
Chưa có khả năng đối chiếu
        ↓
Tự động đối chiếu trường hợp đủ điều kiện
        ↓
Quy trình đối chiếu ba bên To-Be
```

Chức năng hệ thống chi tiết sẽ được xác định sau trong quá trình phân tích yêu cầu.

---

## 9. Kết luận

Phân tích nguyên nhân gốc rễ cho thấy các vấn đề P2P hiện tại của NovaRetail chủ yếu bắt nguồn từ ba điểm yếu về cấu trúc:

1. hoạt động phê duyệt không được quản lý qua luồng công việc chuẩn hóa;
2. thông tin mua hàng không luân chuyển nhất quán qua các bước quy trình;
3. đối chiếu hóa đơn phụ thuộc vào dữ liệu giao dịch được thu thập thủ công.

Các phát hiện này cung cấp cơ sở phân tích cho thiết kế quy trình To-Be.

Do đó, quy trình tương lai nên tập trung cải thiện chuẩn hóa quy trình, tích hợp dữ liệu, khả năng theo dõi kiểm soát và tự động hóa có chọn lọc thay vì chỉ số hóa các bước thủ công hiện có.
