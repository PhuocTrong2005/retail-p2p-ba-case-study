# Bản đồ cải tiến

## Tổng quan

Tài liệu ánh xạ các vấn đề trong quy trình từ mua hàng đến thanh toán (Procure-to-Pay — P2P) hiện tại của NovaRetail tới nguyên nhân gốc rễ, mục tiêu nghiệp vụ và cải tiến quy trình tương lai tương ứng.

Mục đích là chứng minh quy trình tương lai được đề xuất không dựa trên danh sách tính năng tùy ý.

Mỗi cải tiến lớn nên trả lời câu hỏi:

> **Thay đổi này giải quyết vấn đề nghiệp vụ đã xác định nào?**

Việc ánh xạ theo chuỗi phân tích:

```text
Điểm bất cập
    ↓
Nguyên nhân gốc rễ
    ↓
Quyết định cải tiến
    ↓
Mục tiêu nghiệp vụ
    ↓
Quy trình To-Be
    ↓
Yêu cầu tương lai
```

---

# 1. Bản đồ cải tiến tổng hợp

| Điểm bất cập | Nguyên nhân gốc rễ / khoảng trống kiểm soát | Cải tiến To-Be | Mục tiêu |
| ---------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------- | --------- |
| PP-01 — Phê duyệt PO quá lâu | RC-01 — Thiếu luồng phê duyệt PO chuẩn hóa | Chuyển phê duyệt theo luồng công việc | OBJ-01 |
| PP-02 — Dữ liệu mua hàng phân tán | RC-02 — Thiếu luồng dữ liệu mua hàng tích hợp | Quan hệ giao dịch PR → PO → GR → hóa đơn liên thông | OBJ-03 |
| PP-03 — Đối chiếu ba bên thủ công | RC-03 — Thiếu dữ liệu chứng từ tích hợp và khả năng đối chiếu | Đối chiếu ba bên tự động kết hợp xử lý ngoại lệ | OBJ-04 |
| PP-04 — Khó theo dõi trạng thái PR/PO | Chủ yếu RC-02 | Trạng thái luồng công việc tập trung | OBJ-03 |
| PP-05 — Dấu vết kiểm toán hạn chế | RC-01 và RC-02 góp phần | Lịch sử giao dịch và phê duyệt tập trung | OBJ-05 |
| PP-06 — Kiểm soát ngân sách không nhất quán | Khoảng trống kiểm soát quy trình | Bắt buộc kiểm tra ngân sách trước phê duyệt PR | OBJ-04 |
| PP-07 — Dữ liệu mua hàng nhập lặp lại | RC-02 | Tái sử dụng thông tin giao dịch từ bước trước | OBJ-02 |

---

# 2. PP-01 — Chậm phê duyệt đơn đặt hàng

## Vấn đề As-Is

Phê duyệt đơn đặt hàng (Purchase Order — PO) được thực hiện qua email và phụ thuộc vào đôn đốc thủ công.

```text
Lập PO
   ↓
Gửi email phê duyệt
   ↓
Chờ người phê duyệt
   ↓
Xem xét
   ↓
Phản hồi
```

Vì vậy, một phần đáng kể của chu trình phê duyệt có thể là thời gian chờ thay vì thời gian xem xét thực tế.

---

## Nguyên nhân gốc rễ

**RC-01 — Thiếu luồng phê duyệt đơn đặt hàng được chuẩn hóa và tập trung.**

Quy trình hiện tại chưa cung cấp:

* chuyển phê duyệt có cấu trúc;
* khả năng theo dõi tập trung các yêu cầu chờ phê duyệt;
* trạng thái luồng công việc nhất quán;
* lịch sử phê duyệt điện tử rõ ràng.

---

## Cải tiến To-Be

### Phê duyệt PO theo luồng công việc

```text
Gửi PO
    ↓
Đánh giá quy tắc phê duyệt
    ↓
Chuyển đến người phê duyệt bắt buộc
    ↓
Xem xét
    ↓
Phê duyệt / trả về
```

Hệ thống kiểm soát việc chuyển phê duyệt, còn bộ phận mua hàng và tài chính vẫn chịu trách nhiệm quyết định nghiệp vụ.

---

## Tác động kỳ vọng

* giảm chuyển phê duyệt thủ công;
* giảm đôn đốc thủ công;
* cải thiện khả năng theo dõi yêu cầu chờ phê duyệt;
* xử lý phê duyệt nhất quán hơn;
* cải thiện khả năng truy vết phê duyệt.

---

## Mục tiêu nghiệp vụ

**OBJ-01 — Rút ngắn chu trình phê duyệt đơn đặt hàng.**

---

## Quy tắc nghiệp vụ liên quan

* BR-09 — Chuyển phê duyệt PO
* BR-10 — Phê duyệt tài chính bổ sung
* BR-11 — Phát hành PO
* BR-12 — Đơn đặt hàng bị trả về
* BR-26 — Lịch sử kiểm toán

---

# 3. PP-02 — Dữ liệu mua hàng phân tán

## Vấn đề As-Is

Thông tin mua hàng được lưu giữ ở nhiều nguồn.

```text
Yêu cầu mua hàng (PR) trên Excel
   ↓
Tệp / công cụ PO

Hồ sơ kho
   ↓
Phiếu nhận hàng

Phần mềm kế toán
   ↓
Hóa đơn

Email
   ↓
Bằng chứng phê duyệt
```

Người dùng có thể phải tìm trong nhiều hệ thống hoặc tệp để tái dựng một giao dịch mua hàng.

---

## Nguyên nhân gốc rễ

**RC-02 — Thiếu luồng dữ liệu mua hàng tích hợp kết nối các giai đoạn chính của vòng đời P2P.**

---

## Cải tiến To-Be

### Quan hệ giao dịch liên thông

```text
PR-001
   │
   └── PO-001
         ├── GR-001
         └── INV-001
```

Các hồ sơ mua hàng liên quan được kết nối qua tham chiếu giao dịch chung.

Thiết kế không yêu cầu thay mọi ứng dụng bằng một cơ sở dữ liệu vật lý duy nhất. Yêu cầu nghiệp vụ là thông tin giao dịch liên quan có thể được liên kết và truy xuất nhất quán.

---

## Tác động kỳ vọng

* cải thiện tính nhất quán dữ liệu;
* giảm tìm kiếm chứng từ;
* phối hợp liên bộ phận dễ hơn;
* cải thiện khả năng theo dõi giao dịch;
* hỗ trợ tốt hơn cho đối chiếu và lịch sử kiểm toán.

---

## Mục tiêu nghiệp vụ

**OBJ-03 — Cải thiện khả năng theo dõi mua hàng và tính nhất quán dữ liệu.**

---

## Quy tắc nghiệp vụ liên quan

* BR-07 — Truy vết từ PR đến PO
* BR-13 — Bắt buộc tham chiếu PO khi ghi nhận phiếu nhận hàng
* BR-15 — Quan hệ hóa đơn với PO
* BR-25 — Trạng thái giao dịch
* BR-26 — Lịch sử kiểm toán

---

# 4. PP-03 — Đối chiếu ba bên thủ công

## Vấn đề As-Is

AP tìm và so sánh ba hồ sơ giao dịch thủ công.

```text
Tìm PO
   +
Tìm GR
   +
Xem xét hóa đơn
      ↓
So sánh thủ công
```

Khi có sai lệch, cần điều tra thủ công thêm.

---

## Nguyên nhân gốc rễ

**RC-03 — Thiếu dữ liệu PO, phiếu nhận hàng (Goods Receipt — GR) và hóa đơn tích hợp cùng khả năng đối chiếu tự động.**

---

## Cải tiến To-Be

### Đối chiếu ba bên tự động

```text
PO
+
GR
+
Hóa đơn
   ↓
Quy tắc đối chiếu
   ↓
Chứng từ khớp?
```

Nếu đối chiếu đạt:

```text
Đã đối chiếu đạt
   ↓
Chuẩn bị thanh toán
```

Nếu đối chiếu không đạt:

```text
Sai lệch
   ↓
Tạo ngoại lệ
   ↓
Điều tra / ghi nhận chỉnh sửa
   ↓
Chạy lại đối chiếu
   ↓
Đạt? Có → Ghi nhận đã xử lý / cấp điều kiện
      Không → Giữ ngoại lệ mở / chặn đề nghị thanh toán
```

---

## Tác động kỳ vọng

* giảm khối lượng công việc AP với giao dịch thông thường;
* xử lý hóa đơn nhanh hơn;
* kiểm soát đối chiếu nhất quán;
* cải thiện nhận diện sai lệch;
* AP có thể tập trung nhiều công sức hơn vào trường hợp ngoại lệ.

---

## Mục tiêu nghiệp vụ

**OBJ-04 — Tăng cường kiểm soát mua hàng và hóa đơn.**

---

## Quy tắc nghiệp vụ liên quan

* BR-16 — Điều kiện tiên quyết để đối chiếu
* BR-17 — Thuộc tính đối chiếu
* BR-18 — Dung sai đối chiếu
* BR-19 — Đối chiếu đạt
* BR-20 — Sai lệch phải được xử lý ngoại lệ
* BR-21 — Truy vết ngoại lệ

---

# 5. PP-04 — Hạn chế khả năng theo dõi trạng thái PR và PO

## Vấn đề As-Is

Người dùng không thể xác định nhất quán PR hoặc PO hiện đang chờ ở đâu.

Họ có thể cần:

* tìm kiếm email;
* xem bảng tính;
* liên hệ bộ phận mua hàng;
* liên hệ người phê duyệt.

---

## Nguyên nhân gốc rễ góp phần

Vấn đề này chủ yếu liên quan **RC-02 — luồng dữ liệu mua hàng phân tán**.

Quy trình hiện tại không duy trì trạng thái luồng công việc dùng chung giữa các bộ phận.

---

## Cải tiến To-Be

### Trạng thái giao dịch tập trung

Giao dịch giữ trạng thái luồng công việc hiện tại như:

```text
Nháp
Đã gửi
Chờ phê duyệt
Đã phê duyệt
Đã trả về
Đã đặt hàng
Đã nhận hàng
Đã nhận hóa đơn
Đang đối chiếu
Ngoại lệ
Đã đối chiếu đạt
Đã phê duyệt thanh toán
```

Trạng thái chính xác sẽ được làm rõ trong phân tích yêu cầu.

---

## Tác động kỳ vọng

Người dùng có thể xác định:

* trạng thái giao dịch hiện tại;
* có hành động đang chờ hay không;
* ai phụ trách bước tiếp theo;
* giao dịch đã bị trả về hay được phê duyệt.

Điều này giảm việc hỏi trạng thái thủ công.

---

## Mục tiêu nghiệp vụ

**OBJ-03 — Cải thiện khả năng theo dõi mua hàng và tính nhất quán dữ liệu.**

---

## Quy tắc nghiệp vụ liên quan

* BR-25 — Trạng thái giao dịch
* BR-26 — Lịch sử kiểm toán

---

# 6. PP-05 — Dấu vết kiểm toán hạn chế

## Vấn đề As-Is

Bằng chứng phê duyệt và lịch sử giao dịch phân tán trên:

* email;
* bảng tính;
* hồ sơ bộ phận;
* hệ thống riêng biệt.

Có thể khó xác định:

```text
Ai?
Đã làm gì?
Khi nào?
Với giao dịch nào?
```

---

## Các nguyên nhân gốc rễ góp phần

Vấn đề chịu ảnh hưởng của cả:

* **RC-01 — thiếu luồng phê duyệt chuẩn hóa;**
* **RC-02 — thiếu luồng dữ liệu mua hàng liên thông.**

---

## Cải tiến To-Be

### Lịch sử giao dịch tập trung

Với các hành động mua hàng chính, hệ thống giữ thông tin như:

```text
Giao dịch: PO-001
Hành động: Đã phê duyệt
Người dùng: Trưởng bộ phận mua hàng
Thời gian: 10:25
Trạng thái trước: Chờ phê duyệt
Trạng thái mới: Đã phê duyệt
```

Lịch sử kiểm toán được coi là hành vi toàn hệ thống, không phải tác vụ riêng sau mỗi hoạt động BPMN.

---

## Tác động kỳ vọng

* tái dựng giao dịch tốt hơn;
* trách nhiệm giải trình rõ hơn;
* bằng chứng vững hơn cho xem xét nội bộ;
* cải thiện khả năng truy vết phê duyệt.

---

## Mục tiêu nghiệp vụ

**OBJ-05 — Cải thiện khả năng truy vết giao dịch.**

---

## Quy tắc nghiệp vụ liên quan

* BR-12 — PO bị trả về
* BR-21 — Truy vết ngoại lệ
* BR-26 — Lịch sử kiểm toán
* BR-27 — Hành động theo vai trò

---

# 7. PP-06 — Kiểm soát ngân sách không nhất quán

## Vấn đề As-Is

Kiểm tra ngân sách được thực hiện thủ công và có thể phụ thuộc vào thông tin hoặc trao đổi riêng biệt.

```text
PR
 ↓
Kiểm tra ngân sách thủ công
 ↓
Phê duyệt
```

Do đó, kiểm soát có thể được áp dụng không nhất quán.

---

## Nguyên nhân gốc rễ / khoảng trống kiểm soát

Phân tích As-Is không xác định đây là một trong ba nguyên nhân gốc rễ chính thức theo Năm câu hỏi tại sao.

Thay vào đó, vấn đề thể hiện **khoảng trống kiểm soát quy trình** quan trọng:

> Kiểm tra ngân sách chưa được tích hợp thành bước bắt buộc trong luồng mua hàng.

Phân biệt này tránh tạo thêm mã nguyên nhân gốc rễ chỉ để làm bảng truy vết đối xứng.

---

## Cải tiến To-Be

### Kiểm tra ngân sách bắt buộc

```text
Gửi PR
    ↓
Kiểm tra dữ liệu bắt buộc
    ↓
Kiểm tra ngân sách khả dụng
    ↓
Có đủ ngân sách?
```

Nếu kiểm tra không đạt:

```text
Trả PR để chỉnh sửa
   ↓
Người yêu cầu chỉnh sửa
```

Nếu kiểm tra đạt:

```text
Tiếp tục phê duyệt nghiệp vụ
```

---

## Tác động kỳ vọng

* kiểm soát mua hàng nhất quán hơn;
* nhận diện sớm hơn việc thiếu ngân sách;
* giảm phối hợp kiểm tra ngân sách thủ công;
* giảm rủi ro phê duyệt yêu cầu khi chưa có kiểm tra ngân sách đáng tin cậy.

---

## Mục tiêu nghiệp vụ

**OBJ-04 — Tăng cường kiểm soát mua hàng và hóa đơn.**

---

## Quy tắc nghiệp vụ liên quan

* BR-02 — Kiểm tra ngân sách trước phê duyệt PR
* BR-03 — Không đủ ngân sách

---

# 8. PP-07 — Nhập dữ liệu thủ công trùng lặp

## Vấn đề As-Is

Thông tin đã ghi trong yêu cầu mua hàng (Purchase Requisition — PR) có thể phải nhập lại khi lập PO.

Dữ liệu bổ sung cũng có thể được ghi độc lập ở các bước sau.

```text
PR
 ↓
Nhập lại thủ công
 ↓
PO
```

---

## Nguyên nhân gốc rễ

**RC-02 — Thiếu luồng dữ liệu mua hàng tích hợp.**

---

## Cải tiến To-Be

### Ghi nhận và tái sử dụng dữ liệu giao dịch

```text
PR đã phê duyệt
      ↓
Tái sử dụng dữ liệu hiện có
      ↓
Lập PO
```

Hồ sơ ở các bước sau tham chiếu giao dịch liên quan thay vì tạo lại thông tin không liên kết.

```text
PO
├── GR
└── Hóa đơn
```

---

## Tác động kỳ vọng

* ít điểm nhập liệu thủ công hơn;
* giảm khối lượng công việc hành chính;
* giảm rủi ro lỗi nhập liệu;
* cải thiện tính nhất quán giữa các chứng từ liên quan.

---

## Mục tiêu nghiệp vụ

**OBJ-02 — Giảm nhập dữ liệu thủ công lặp lại.**

---

## Quy tắc nghiệp vụ liên quan

* BR-07 — Truy vết từ PR đến PO
* BR-08 — Tái sử dụng dữ liệu PR
* BR-13 — Tham chiếu PO của phiếu nhận hàng
* BR-15 — Tham chiếu PO của hóa đơn

---

# 9. Quan hệ cải tiến giữa nhiều điểm bất cập

Một cải tiến To-Be có thể xử lý nhiều vấn đề As-Is.

Ví dụ:

```text
Dữ liệu giao dịch liên thông
          │
          ├── giảm PP-02 Phân tán
          │
          ├── cải thiện PP-04 Khả năng theo dõi
          │
          ├── giảm PP-07 Nhập lại
          │
          └── hỗ trợ PP-03 Đối chiếu
```

Tương tự:

```text
Phê duyệt theo luồng công việc
          │
          ├── giảm PP-01 Chờ đợi
          │
          ├── cải thiện PP-04 Trạng thái
          │
          └── cải thiện PP-05 Khả năng kiểm toán
```

Điều này quan trọng vì cải tiến quy trình nên xử lý điểm yếu cấu trúc sâu xa, không tạo tính năng rời rạc cho từng điểm bất cập.

---

# 10. Ưu tiên cải tiến

Các cải tiến đề xuất có thể nhóm thành bốn lĩnh vực rộng.

## Lĩnh vực ưu tiên 1 — Chuẩn hóa luồng công việc

Bao gồm:

* luồng PR;
* chuyển phê duyệt PO;
* chuyển phê duyệt thanh toán;
* đường chỉnh sửa và gửi lại.

Chủ yếu xử lý:

* PP-01;
* PP-04;
* PP-05.

---

## Lĩnh vực ưu tiên 2 — Dữ liệu mua hàng liên thông

Bao gồm:

```text
PR
↓
PO
↓
GR / hóa đơn
```

Chủ yếu xử lý:

* PP-02;
* PP-04;
* PP-07.

Điều này cũng tạo điều kiện cho đối chiếu tự động.

---

## Lĩnh vực ưu tiên 3 — Kiểm soát tự động

Bao gồm:

* kiểm tra PR;
* kiểm tra ngân sách;
* đánh giá quy tắc phê duyệt;
* đối chiếu ba bên.

Chủ yếu xử lý:

* PP-03;
* PP-06.

---

## Lĩnh vực ưu tiên 4 — Kiểm soát ngoại lệ và kiểm toán

Bao gồm:

* ngoại lệ đối chiếu có cấu trúc;
* quản lý trạng thái;
* lịch sử giao dịch;
* lịch sử phê duyệt.

Chủ yếu xử lý:

* PP-03;
* PP-04;
* PP-05.

---

# 11. Ma trận truy vết xuyên suốt

| Điểm bất cập | Nguyên nhân gốc rễ / khoảng trống | Mục tiêu | Cải tiến To-Be | Quy tắc nghiệp vụ chính |
| ---------- | ------------------- | --------- | ---------------------------------------- | -------------------------- |
| PP-01 | RC-01 | OBJ-01 | Phê duyệt PO theo luồng công việc | BR-09, BR-10, BR-11, BR-12 |
| PP-02 | RC-02 | OBJ-03 | Dữ liệu giao dịch mua hàng liên thông | BR-07, BR-13, BR-15 |
| PP-03 | RC-03 | OBJ-04 | Đối chiếu ba bên tự động | BR-16 đến BR-21 |
| PP-04 | RC-02 | OBJ-03 | Trạng thái luồng công việc tập trung | BR-25 |
| PP-05 | RC-01 / RC-02 | OBJ-05 | Lịch sử giao dịch và phê duyệt tập trung | BR-26, BR-27 |
| PP-06 | Khoảng trống kiểm soát quy trình | OBJ-04 | Kiểm tra ngân sách bắt buộc | BR-02, BR-03 |
| PP-07 | RC-02 | OBJ-02 | Tái sử dụng dữ liệu PR và tham chiếu giao dịch | BR-07, BR-08 |

---

# 12. Truy vết yêu cầu tương lai

Các giai đoạn dự án tiếp theo sẽ mở rộng ánh xạ này thành yêu cầu chính thức.

```text
PP-01
 ↓
RC-01
 ↓
Phê duyệt theo luồng công việc
 ↓
BR-09
 ↓
Yêu cầu BRD tương lai
 ↓
Yêu cầu chức năng tương lai
 ↓
Ca sử dụng
 ↓
Tiêu chí chấp nhận
```

Ma trận truy vết yêu cầu ở giai đoạn sau sẽ kết nối:

```text
Mục tiêu nghiệp vụ
↕
Điểm bất cập
↕
Yêu cầu nghiệp vụ
↕
Yêu cầu chức năng
↕
Ca sử dụng
↕
Tiêu chí kiểm tra / chấp nhận
```

Do đó, mã yêu cầu được chủ ý chưa tạo ở giai đoạn này.

---

# 13. Kết luận

Bản đồ cải tiến chứng minh quy trình To-Be đề xuất dựa trên nhu cầu nghiệp vụ nhận diện được, không dựa trên danh sách tính năng hệ thống mua hàng chung chung.

Logic thiết kế quan trọng nhất là:

```text
Chuẩn hóa luồng công việc
        +
Kết nối dữ liệu giao dịch
        +
Tự động hóa kiểm soát theo quy tắc
        +
Tổ chức xử lý ngoại lệ có cấu trúc
        ↓
Quy trình P2P được cải tiến
```

Các quyết định cải tiến này kết nối phân tích As-Is với các yêu cầu chính thức sẽ được xây dựng trong những giai đoạn dự án sau.
