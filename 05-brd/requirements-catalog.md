# Danh mục yêu cầu nghiệp vụ

## 1. Tổng quan

Tài liệu xác định danh mục yêu cầu nghiệp vụ hợp nhất cho dự án **Tối ưu hóa quy trình từ mua hàng đến thanh toán tại NovaRetail JSC**.

Danh mục chuyển [vấn đề và mục tiêu](../01-business-context/README.md), [điểm bất cập/nguyên nhân gốc rễ](../03-as-is-analysis/README.md), [phạm vi](../01-business-context/scope.md) và [To-Be/quy tắc](../04-to-be-design/README.md) thành tập yêu cầu nghiệp vụ có cấu trúc. [BRD](./business-requirements-document.md) giữ bản tổng hợp để đọc riêng.

Danh mục thiết lập **đường cơ sở yêu cầu nghiệp vụ**, được phân rã thành ca sử dụng ở [Giai đoạn 06](../06-system-analysis/README.md) và yêu cầu chức năng/phi chức năng ở [Giai đoạn 07](../07-software-requirements/README.md).

> **Lưu ý:** NovaRetail JSC là tổ chức giả lập được tạo cho nghiên cứu tình huống hồ sơ năng lực phân tích nghiệp vụ này. Mọi khối lượng quy trình, chỉ tiêu và kịch bản vận hành đều giả lập.

---

## 2. Quy ước định danh yêu cầu

Yêu cầu nghiệp vụ dùng định danh sau:

```text
BRQ-XX
```

Ví dụ:

```text
BRQ-01
BRQ-02
BRQ-03
```

Dự án dùng quy ước đặt tên sau xuyên suốt các sản phẩm phân tích:

| Tiền tố | Ý nghĩa |
| ------ | -------------------------- |
| OBJ | Mục tiêu nghiệp vụ |
| PP | Điểm bất cập |
| RC | Nguyên nhân gốc rễ |
| BR | Quy tắc nghiệp vụ |
| BRQ | Yêu cầu nghiệp vụ |
| FR | Yêu cầu chức năng |
| NFR | Yêu cầu phi chức năng |
| UC | Ca sử dụng |

Quy ước hỗ trợ [truy vết yêu cầu](../08-traceability/requirements-traceability-matrix.md) xuyên suốt.

### Đồng bộ cách đo mục tiêu

Với OBJ-03, chỉ tiêu 95% là tỷ lệ giao dịch P2P trong phạm vi được quản lý qua quy trình tập trung. Chỉ tiêu này tách biệt với chỉ tiêu 100% khả năng theo dõi trạng thái PR/PO và không đo khả năng truy cập thông tin.

OBJ-01 vẫn đo từ lúc gửi PO đến phê duyệt cuối cùng; lịch làm việc, vòng trả về/gửi lại và cách xử lý bản ghi đang chờ/bị từ chối còn mở. OBJ-02 hướng đến không quá một điểm ghi nhận chính cho thông tin hiện có tái sử dụng được; dữ liệu mới về số lượng GR, hóa đơn và đề nghị thanh toán được tách riêng. OBJ-04 giữ 100% kiểm tra ngân sách và ít nhất 80% hóa đơn đủ điều kiện **được xử lý qua đối chiếu ba bên tự động**, bao gồm trường hợp sai lệch; đây không phải chỉ tiêu 80% đối chiếu đạt. Mẫu số hóa đơn đủ điều kiện, kỳ quan sát và cách xử lý lần thử lặp lại chưa được xác định. OBJ-05 giữ mức bao phủ kiểm toán 100% hành động chính; mức bao phủ lịch sử đầy đủ theo giao dịch là chẩn đoán riêng. Xem [Mục tiêu dự án](../01-business-context/project-objectives.md) để biết định nghĩa đo lường chuẩn và lựa chọn còn mở. Không chỉ tiêu nào là kết quả đã đạt.

---

## 3. Định nghĩa mức ưu tiên

Yêu cầu nghiệp vụ được ưu tiên theo ba mức.

| Mức ưu tiên | Định nghĩa |
| ---------- | ------------------------------------------------------------------------------------------------ |
| **Cao** | Cần để xử lý vấn đề nghiệp vụ lớn, kiểm soát quy trình trọng yếu hoặc khả năng To-Be cốt lõi |
| **Trung bình** | Quan trọng với quản trị quy trình nhưng không phải động lực chuyển đổi chính |
| **Thấp** | Cải tiến hữu ích có thể hoãn mà không ngăn quy trình To-Be cốt lõi vận hành |

Mức ưu tiên thể hiện **tầm quan trọng nghiệp vụ**, không phải độ phức tạp triển khai hoặc công sức phát triển.

---

# 4. Tổng hợp yêu cầu nghiệp vụ

| ID | Yêu cầu nghiệp vụ | Mức ưu tiên | Mục tiêu chính |
| ------ | ---------------------------------------------------- | -------- | ----------------- |
| BRQ-01 | Quản lý giao dịch từ mua hàng đến thanh toán tập trung | Cao | OBJ-03 |
| BRQ-02 | Quản lý yêu cầu mua hàng chuẩn hóa | Cao | OBJ-02, OBJ-03 |
| BRQ-03 | Kiểm soát ngân sách bắt buộc | Cao | OBJ-04 |
| BRQ-04 | Lựa chọn nhà cung cấp có kiểm soát | Trung bình | OBJ-04 |
| BRQ-05 | Quản lý và phê duyệt đơn đặt hàng chuẩn hóa | Cao | OBJ-01, OBJ-05 |
| BRQ-06 | Tái sử dụng dữ liệu mua hàng và liên kết giao dịch | Cao | OBJ-02, OBJ-03 |
| BRQ-07 | Khả năng theo dõi trạng thái mua hàng | Cao | OBJ-03 |
| BRQ-08 | Đối chiếu ba bên và xử lý ngoại lệ có kiểm soát | Cao | OBJ-04 |
| BRQ-09 | Truy vết giao dịch và phê duyệt | Cao | OBJ-05 |
| BRQ-10 | Phê duyệt đề nghị thanh toán có kiểm soát | Cao | OBJ-04 |
| BRQ-11 | Báo cáo mua hàng cơ bản | Trung bình | OBJ-01, OBJ-03, OBJ-04, OBJ-05 |

---

# 5. Yêu cầu nghiệp vụ chi tiết

## BRQ-01 — Quản lý giao dịch từ mua hàng đến thanh toán tập trung

### Yêu cầu

> NovaRetail cần quy trình mua hàng chuẩn hóa và liên thông, bao phủ từ lập yêu cầu mua hàng đến phê duyệt đề nghị thanh toán.

### Cơ sở nghiệp vụ

Quy trình từ mua hàng đến thanh toán (Procure-to-Pay — P2P) hiện tại phân tán trên nhiều công cụ và nguồn thông tin, gồm:

* Excel;
* email;
* hồ sơ kho;
* phần mềm kế toán.

Vì vậy, một giao dịch mua hàng có thể được thể hiện khác nhau giữa nhiều bộ phận.

Quy trình tương lai nên cung cấp vòng đời giao dịch liên thông bao phủ:

```text
Yêu cầu mua hàng
        ↓
Đơn đặt hàng
        ↓
Phiếu nhận hàng
        ↓
Hóa đơn nhà cung cấp
        ↓
Đề nghị thanh toán
```

### Mức ưu tiên

**Cao**

### Nguồn

* PP-02 — Dữ liệu mua hàng phân tán
* PP-04 — Khó theo dõi trạng thái PR/PO
* RC-02 — Thiếu luồng dữ liệu mua hàng tích hợp
* Thiết kế giao dịch liên thông To-Be

### Mục tiêu liên quan

* OBJ-03 — Cải thiện khả năng theo dõi mua hàng và tính nhất quán dữ liệu

### Quy tắc nghiệp vụ liên quan

* BR-07 — Truy vết từ PR đến PO
* BR-13 — Bắt buộc tham chiếu PO khi ghi nhận phiếu nhận hàng
* BR-15 — Quan hệ hóa đơn với PO
* BR-25 — Trạng thái giao dịch
* BR-26 — Lịch sử kiểm toán

### Định hướng thành công nghiệp vụ

Người dùng liên quan nên có thể theo dõi giao dịch mua hàng trong phạm vi từ lập PR đến phê duyệt đề nghị thanh toán mà không phải tái dựng thủ công vòng đời từ các tệp và email không liên kết.

---

## BRQ-02 — Quản lý yêu cầu mua hàng chuẩn hóa

### Yêu cầu

> NovaRetail cần yêu cầu mua hàng được lập, gửi, kiểm tra, phê duyệt, từ chối hoặc trả về và theo dõi qua luồng mua hàng chuẩn hóa. Từ chối kết thúc đường xử lý PR đó; trả về có lý do cho phép chỉnh sửa và gửi lại sau kiểm tra lại trường bắt buộc và ngân sách.

### Cơ sở nghiệp vụ

Quy trình yêu cầu mua hàng As-Is bắt đầu bằng tệp Excel và phụ thuộc nhiều vào trao đổi email.

Điều này tạo ra:

* xử lý yêu cầu không nhất quán;
* thông tin phân tán;
* hạn chế khả năng theo dõi trạng thái;
* thêm công sức nhập liệu ở bước sau.

Vòng đời PR tương lai nên theo quy trình có kiểm soát:

```text
Lập
  ↓
Gửi
  ↓
Kiểm tra
  ↓
Phê duyệt / từ chối / trả về
  ↓
Theo dõi
```

### Mức ưu tiên

**Cao**

### Nguồn

* PP-02 — Dữ liệu mua hàng phân tán
* PP-04 — Khó theo dõi trạng thái PR/PO
* PP-07 — Dữ liệu mua hàng được nhập lặp lại
* Quy trình yêu cầu mua hàng To-Be

### Mục tiêu liên quan

* OBJ-02 — Giảm nhập dữ liệu thủ công lặp lại
* OBJ-03 — Cải thiện khả năng theo dõi mua hàng và tính nhất quán dữ liệu

### Quy tắc nghiệp vụ liên quan

* BR-01 — Thông tin yêu cầu mua hàng bắt buộc
* BR-04 — Phê duyệt yêu cầu mua hàng
* BR-05 — Phải có PR đã phê duyệt để xử lý mua hàng
* BR-25 — Trạng thái giao dịch

### Định hướng thành công nghiệp vụ

Yêu cầu mua hàng nên theo quy trình nhất quán thay vì dựa vào cách dùng bảng tính và email riêng lẻ.

---

## BRQ-03 — Kiểm soát ngân sách bắt buộc

### Yêu cầu

> NovaRetail yêu cầu mọi yêu cầu mua hàng thuộc diện áp dụng phải đạt kiểm tra ngân sách trước khi chuyển phê duyệt nghiệp vụ.

### Cơ sở nghiệp vụ

Kiểm tra ngân sách trong As-Is được thực hiện thủ công và có thể không được áp dụng nhất quán.

Quy trình To-Be thiết lập kiểm tra ngân sách là kiểm soát bắt buộc trước phê duyệt của Quản lý cửa hàng.

```text
PR đã gửi
     ↓
Kiểm tra ngân sách
     ↓
Có đủ ngân sách?
   /            \
  Có             Không
  ↓               ↓
Phê duyệt PR    Trả PR
```

Kiểm tra ngân sách và phê duyệt nghiệp vụ là các quyết định nghiệp vụ khác nhau:

```text
Kiểm tra ngân sách
= Có đủ ngân sách khả dụng không?

Phê duyệt nghiệp vụ
= Có nên thực hiện giao dịch mua này không?
```

### Mức ưu tiên

**Cao**

### Nguồn

* PP-06 — Kiểm soát ngân sách không nhất quán
* Khoảng trống kiểm soát quy trình được xác định trong phân tích As-Is
* Quy trình kiểm tra ngân sách bắt buộc To-Be

### Mục tiêu liên quan

* OBJ-04 — Tăng cường kiểm soát mua hàng và hóa đơn

### Quy tắc nghiệp vụ liên quan

* BR-02 — Kiểm tra ngân sách trước phê duyệt PR
* BR-03 — Không đủ ngân sách

### Định hướng thành công nghiệp vụ

Yêu cầu mua hàng thuộc diện áp dụng không nên chuyển phê duyệt nghiệp vụ khi chưa có kết quả kiểm tra ngân sách đạt.

### Ranh giới phạm vi

Quy trình mua hàng sử dụng thông tin ngân sách khả dụng.

Các nội dung sau vẫn ngoài phạm vi:

* lập ngân sách;
* phân bổ ngân sách;
* lập kế hoạch tài chính;
* dự báo ngân sách.

---

## BRQ-04 — Lựa chọn nhà cung cấp có kiểm soát

### Yêu cầu

> NovaRetail yêu cầu đơn đặt hàng sử dụng nhà cung cấp đủ điều kiện từ danh mục nhà cung cấp hiện có đã được phê duyệt.

### Cơ sở nghiệp vụ

Chỉ nhà cung cấp đã được NovaRetail phê duyệt mới nên đủ điều kiện sử dụng trong quy trình mua hàng thuộc phạm vi.

Yêu cầu này cung cấp cơ chế kiểm soát mua hàng mà không mở rộng dự án sang tìm nguồn cung hoặc tiếp nhận nhà cung cấp mới.

### Mức ưu tiên

**Trung bình**

### Nguồn

* Phạm vi dự án
* Giả định danh mục nhà cung cấp đã được phê duyệt
* Xử lý mua hàng To-Be

### Mục tiêu liên quan

* OBJ-04 — Tăng cường kiểm soát mua hàng và hóa đơn

### Quy tắc nghiệp vụ liên quan

* BR-06 — Yêu cầu nhà cung cấp đã được phê duyệt

### Định hướng thành công nghiệp vụ

Đơn đặt hàng trong quy trình P2P đã xác định không nên được phát hành cho nhà cung cấp chưa đủ điều kiện theo danh mục nhà cung cấp đã được phê duyệt.

### Ranh giới phạm vi

Yêu cầu không bao gồm:

* tiếp nhận nhà cung cấp mới;
* đánh giá điều kiện nhà cung cấp;
* yêu cầu báo giá (RFQ);
* yêu cầu đề xuất (RFP);
* quản lý đấu thầu;
* chấm điểm nhà cung cấp;
* đàm phán hợp đồng.

---

## BRQ-05 — Quản lý và phê duyệt đơn đặt hàng chuẩn hóa

### Yêu cầu

> NovaRetail yêu cầu đơn đặt hàng được lập từ yêu cầu mua hàng đã phê duyệt và xử lý qua luồng phê duyệt chuẩn hóa trước khi phát hành cho nhà cung cấp.

### Cơ sở nghiệp vụ

Quy trình phê duyệt PO hiện tại phụ thuộc vào trao đổi email và đôn đốc thủ công.

Điều này trực tiếp góp phần gây ra:

* thời gian chờ phê duyệt;
* chậm phát hành PO;
* hạn chế khả năng theo dõi phê duyệt;
* khả năng truy vết phê duyệt yếu.

Quy trình tương lai nên theo trình tự có kiểm soát:

```text
PR đã phê duyệt
     ↓
Lập PO
     ↓
Gửi PO
     ↓
Xác định tuyến phê duyệt
     ↓
Phê duyệt mua hàng
     ↓
Phê duyệt tài chính bổ sung
(nếu cần)
     ↓
PO đã phê duyệt đầy đủ
     ↓
Phát hành PO
```

### Mức ưu tiên

**Cao**

### Nguồn

* PP-01 — Phê duyệt PO quá lâu
* PP-05 — Dấu vết kiểm toán hạn chế
* RC-01 — Thiếu luồng phê duyệt PO chuẩn hóa
* Quy trình phê duyệt PO To-Be

### Mục tiêu liên quan

* OBJ-01 — Rút ngắn chu trình phê duyệt đơn đặt hàng
* OBJ-05 — Cải thiện khả năng truy vết giao dịch

### Quy tắc nghiệp vụ liên quan

* BR-07 — Truy vết từ PR đến PO
* BR-08 — Tái sử dụng dữ liệu yêu cầu mua hàng
* BR-09 — Chuyển phê duyệt đơn đặt hàng
* BR-10 — Phê duyệt tài chính bổ sung
* BR-11 — Phát hành PO
* BR-12 — Đơn đặt hàng bị trả về

### Định hướng thành công nghiệp vụ

Mọi đơn đặt hàng nên theo tuyến phê duyệt áp dụng và hoàn tất mọi phê duyệt bắt buộc trước khi phát hành cho Nhà cung cấp.

### Lưu ý chính sách

Ngưỡng phê duyệt chính xác được chủ ý chưa xác định trong đường cơ sở hiện tại.

Tiêu chí phê duyệt nên tiếp tục có thể cấu hình theo chính sách Mua hàng và Tài chính đã xác nhận.

---

## BRQ-06 — Tái sử dụng dữ liệu mua hàng và liên kết giao dịch

### Yêu cầu

> NovaRetail cần các hồ sơ mua hàng liên quan tái sử dụng thông tin giao dịch có sẵn và duy trì quan hệ truy vết được xuyên suốt vòng đời P2P.

### Cơ sở nghiệp vụ

Quy trình As-Is yêu cầu nhập và tìm thông tin thủ công qua nhiều bước quy trình.

Quy trình tương lai nên hỗ trợ quan hệ giao dịch trực tiếp như:

```text
PR-001
   │
   └── PO-001
         ├── GR-001
         └── INV-001
```

Thông tin đã ghi nhận ở bước trước nên được tái sử dụng khi phù hợp.

### Mức ưu tiên

**Cao**

### Nguồn

* PP-02 — Dữ liệu mua hàng phân tán
* PP-03 — Đối chiếu ba bên thủ công
* PP-07 — Dữ liệu mua hàng được nhập lặp lại
* RC-02 — Thiếu luồng dữ liệu mua hàng tích hợp

### Mục tiêu liên quan

* OBJ-02 — Giảm nhập dữ liệu thủ công lặp lại
* OBJ-03 — Cải thiện khả năng theo dõi mua hàng và tính nhất quán dữ liệu

### Quy tắc nghiệp vụ liên quan

* BR-07 — Truy vết từ PR đến PO
* BR-08 — Tái sử dụng dữ liệu yêu cầu mua hàng
* BR-13 — Bắt buộc tham chiếu PO khi ghi nhận phiếu nhận hàng
* BR-15 — Quan hệ hóa đơn với PO

### Định hướng thành công nghiệp vụ

Thông tin mua hàng hiện có nên được tái sử dụng qua các hoạt động ở bước sau khi phù hợp, đồng thời vẫn nhận diện được chứng từ liên quan là một phần của cùng giao dịch mua hàng.

---

## BRQ-07 — Khả năng theo dõi trạng thái mua hàng

### Yêu cầu

> NovaRetail cần người dùng được cấp quyền có thể theo dõi trạng thái hiện tại của yêu cầu mua hàng, đơn đặt hàng, phiếu nhận hàng, hóa đơn nhà cung cấp, ngoại lệ và hoạt động phê duyệt liên quan.

### Cơ sở nghiệp vụ

Người dùng hiện phụ thuộc vào:

* email;
* bảng tính;
* đôn đốc bộ phận mua hàng;
* đôn đốc quản lý;

để xác định trạng thái giao dịch mua hàng.

Quy trình tương lai nên cung cấp thông tin trạng thái luồng công việc nhất quán.

Người dùng liên quan nên có thể xác định:

```text
Trạng thái hiện tại là gì?

Giao dịch đã được phê duyệt chưa?

Đã bị trả về chưa?

Có hành động đang chờ không?

Bước quy trình nào đang phụ trách giao dịch?
```

### Mức ưu tiên

**Cao**

### Nguồn

* PP-04 — Khó theo dõi trạng thái PR/PO
* PP-02 — Dữ liệu mua hàng phân tán
* RC-02 — Thiếu luồng dữ liệu mua hàng tích hợp

### Mục tiêu liên quan

* OBJ-03 — Cải thiện khả năng theo dõi mua hàng và tính nhất quán dữ liệu

### Quy tắc nghiệp vụ liên quan

* BR-25 — Trạng thái giao dịch
* BR-27 — Hành động theo vai trò

### Định hướng thành công nghiệp vụ

Người dùng được cấp quyền nên có thể xác định trạng thái hiện tại của giao dịch mua hàng liên quan mà không chủ yếu dựa vào đôn đốc email thủ công.

---

## BRQ-08 — Đối chiếu ba bên và xử lý ngoại lệ có kiểm soát

### Yêu cầu

> NovaRetail yêu cầu hóa đơn nhà cung cấp được kiểm tra với đơn đặt hàng và phiếu nhận hàng liên quan trước khi chuyển sang chuẩn bị thanh toán, với cách xử lý có cấu trúc cho giao dịch có sai lệch.

### Cơ sở nghiệp vụ

Trong quy trình As-Is, Kế toán công nợ phải trả (AP) xác định và so sánh thủ công:

```text
Đơn đặt hàng
      +
Phiếu nhận hàng
      +
Hóa đơn nhà cung cấp
```

Quy trình tương lai nên hỗ trợ đối chiếu theo quy tắc cho giao dịch đủ điều kiện.

```text
PO + GR + hóa đơn
        ↓
Đối chiếu ba bên
        ↓
Chứng từ khớp?
     /          \
    Có           Không
    ↓             ↓
Đủ điều kiện  Tạo ngoại lệ
                  ↓
             Điều tra / ghi nhận chỉnh sửa
                  ↓
               Chạy lại đối chiếu
                  ↓
             Đạt? Có → Ghi nhận đã xử lý / cấp điều kiện
                   Không → Giữ ngoại lệ mở / chặn đề nghị thanh toán
```

Tự động hóa nên hỗ trợ giao dịch thông thường, còn sai lệch vẫn phải được con người điều tra có kiểm soát.

### Mức ưu tiên

**Cao**

### Nguồn

* PP-03 — Đối chiếu ba bên thủ công
* RC-03 — Thiếu dữ liệu chứng từ tích hợp và khả năng đối chiếu
* Quy trình đối chiếu ba bên To-Be

### Mục tiêu liên quan

* OBJ-04 — Tăng cường kiểm soát mua hàng và hóa đơn

### Quy tắc nghiệp vụ liên quan

* BR-16 — Điều kiện tiên quyết để đối chiếu
* BR-17 — Thuộc tính đối chiếu
* BR-18 — Dung sai đối chiếu
* BR-19 — Đối chiếu đạt
* BR-20 — Sai lệch phải được xử lý ngoại lệ
* BR-21 — Truy vết ngoại lệ

### Định hướng thành công nghiệp vụ

Giao dịch đủ điều kiện nên đi qua kiểm soát đối chiếu ba bên nhất quán; hóa đơn có sai lệch không nên chuyển thẳng sang chuẩn bị đề nghị thanh toán cho đến khi đã ghi nhận chỉnh sửa và đối chiếu lại đạt; ngoại lệ vẫn mở sau đối chiếu lại không đạt.

---

## BRQ-09 — Truy vết giao dịch và phê duyệt

### Yêu cầu

> NovaRetail yêu cầu các hoạt động mua hàng chính, thay đổi giao dịch, ngoại lệ đối chiếu và quyết định phê duyệt giữ đủ lịch sử phục vụ xem xét vận hành và kiểm toán.

### Cơ sở nghiệp vụ

Quy trình hiện tại lưu bằng chứng giao dịch trên:

* email;
* tệp Excel;
* hồ sơ bộ phận;
* hệ thống riêng biệt.

Quy trình tương lai nên cho phép NovaRetail xác định:

```text
Ai thực hiện hành động?
Hành động nào đã được thực hiện?
Xảy ra khi nào?
Giao dịch nào bị ảnh hưởng?
Quyết định phê duyệt nào đã được đưa ra?
Trạng thái nào đã thay đổi?
```

### Mức ưu tiên

**Cao**

### Nguồn

* PP-05 — Dấu vết kiểm toán hạn chế
* RC-01 — Thiếu luồng phê duyệt chuẩn hóa
* RC-02 — Thiếu luồng dữ liệu mua hàng tích hợp
* Thiết kế lịch sử kiểm toán To-Be

### Mục tiêu liên quan

* OBJ-05 — Cải thiện khả năng truy vết giao dịch

### Quy tắc nghiệp vụ liên quan

* BR-12 — Đơn đặt hàng bị trả về
* BR-21 — Truy vết ngoại lệ
* BR-26 — Lịch sử kiểm toán
* BR-27 — Hành động theo vai trò

### Định hướng thành công nghiệp vụ

Các hoạt động mua hàng chính nên có thể được tái dựng từ lịch sử giao dịch mà không phụ thuộc bằng chứng email hoặc bảng tính rải rác.

---

## BRQ-10 — Phê duyệt đề nghị thanh toán có kiểm soát

### Yêu cầu

> NovaRetail yêu cầu đề nghị thanh toán chỉ chuyển phê duyệt tài chính sau khi hoàn tất các kiểm soát mua hàng và hóa đơn áp dụng.

### Cơ sở nghiệp vụ

Chỉ nhận hóa đơn nhà cung cấp không nên làm giao dịch đủ điều kiện phê duyệt đề nghị thanh toán.

Các kiểm soát mua hàng liên quan phải hoàn tất trước.

```text
Hóa đơn nhà cung cấp
       ↓
Đối chiếu ba bên
       ↓
Kết quả đối chiếu hiện hành đạt
       ↓
Chuẩn bị đề nghị thanh toán
       ↓
Trưởng bộ phận tài chính xem xét
       ↓
Đề nghị thanh toán đã được phê duyệt
```

### Mức ưu tiên

**Cao**

### Nguồn

* Quy trình phê duyệt thanh toán To-Be
* Yêu cầu kiểm soát thanh toán
* Ranh giới phạm vi dự án

### Mục tiêu liên quan

* OBJ-04 — Tăng cường kiểm soát mua hàng và hóa đơn

### Quy tắc nghiệp vụ liên quan

* BR-19 — Đối chiếu đạt
* BR-20 — Sai lệch phải được xử lý ngoại lệ
* BR-22 — Điều kiện lập đề nghị thanh toán
* BR-23 — Phê duyệt thanh toán
* BR-24 — Ranh giới thực hiện thanh toán

### Định hướng thành công nghiệp vụ

Đề nghị thanh toán chỉ nên đến bước phê duyệt tài chính sau khi mọi kiểm soát mua hàng và hóa đơn áp dụng đã hoàn tất với kết quả đạt.

### Ranh giới phạm vi

```text
Đề nghị thanh toán đã được phê duyệt
          ↓
     KẾT THÚC PHẠM VI
```

Các nội dung sau vẫn ngoài phạm vi:

* chuyển khoản ngân hàng;
* thực hiện qua API thanh toán;
* quyết toán thanh toán;
* đối soát ngân hàng.

---

## BRQ-11 — Báo cáo mua hàng cơ bản

### Yêu cầu

> NovaRetail cần quản lý được cấp quyền xem báo cáo hoặc tổng hợp mua hàng vận hành cơ bản để theo dõi quy trình.

### Cơ sở nghiệp vụ

Báo cáo mua hàng cơ bản được nêu rõ trong phạm vi dự án và cần để xem xét quy trình được thiết kế lại. Đây là nhu cầu nghiệp vụ riêng, không chỉ là tính năng xem trạng thái.

### Mức ưu tiên

**Trung bình**

### Nguồn

* Phạm vi dự án — Báo cáo mua hàng
* Nhu cầu theo dõi quy trình To-Be
* UC-12 — Xem báo cáo mua hàng

### Mục tiêu liên quan

* OBJ-01 — Rút ngắn chu trình phê duyệt đơn đặt hàng
* OBJ-03 — Cải thiện khả năng theo dõi mua hàng và tính nhất quán dữ liệu
* OBJ-04 — Tăng cường kiểm soát mua hàng và hóa đơn
* OBJ-05 — Cải thiện khả năng truy vết giao dịch

### Quy tắc nghiệp vụ liên quan

* BR-25 — Trạng thái giao dịch
* BR-27 — Hành động theo vai trò

### Định hướng thành công nghiệp vụ

Quản lý được cấp quyền nên có thể xem thông tin vận hành cơ bản như trạng thái PR/PO, yêu cầu chờ phê duyệt, trạng thái GR và hóa đơn, ngoại lệ đối chiếu và trạng thái đề nghị thanh toán. Bố cục báo cáo, công thức KPI, bộ lọc, chức năng xuất và thiết kế biểu đồ để xác định sau.

---

# 6. Ma trận yêu cầu với mục tiêu

| Yêu cầu nghiệp vụ | OBJ-01 | OBJ-02 | OBJ-03 | OBJ-04 | OBJ-05 |
| -------------------- | :----: | :----: | :----: | :----: | :----: |
| BRQ-01               |        |        |    ✓   |        |        |
| BRQ-02               |        |    ✓   |    ✓   |        |        |
| BRQ-03               |        |        |        |    ✓   |        |
| BRQ-04               |        |        |        |    ✓   |        |
| BRQ-05               |    ✓   |        |        |        |    ✓   |
| BRQ-06               |        |    ✓   |    ✓   |        |        |
| BRQ-07               |        |        |    ✓   |        |        |
| BRQ-08               |        |        |        |    ✓   |        |
| BRQ-09               |        |        |        |        |    ✓   |
| BRQ-10               |        |        |        |    ✓   |        |
| BRQ-11               |    ✓   |        |    ✓   |    ✓   |    ✓   |

---

# 7. Ma trận yêu cầu với điểm bất cập

| Yêu cầu | PP-01 | PP-02 | PP-03 | PP-04 | PP-05 | PP-06 | PP-07 |
| ----------- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| BRQ-01      |       |   ✓   |       |   ✓   |       |       |       |
| BRQ-02      |       |   ✓   |       |   ✓   |       |       |   ✓   |
| BRQ-03      |       |       |       |       |       |   ✓   |       |
| BRQ-04      |       |       |       |       |       |       |       |
| BRQ-05      |   ✓   |       |       |       |   ✓   |       |       |
| BRQ-06      |       |   ✓   |   ✓   |       |       |       |   ✓   |
| BRQ-07      |       |   ✓   |       |   ✓   |       |       |       |
| BRQ-08      |       |       |   ✓   |       |       |       |       |
| BRQ-09      |       |       |       |   ✓   |   ✓   |       |       |
| BRQ-10      |       |       |   ✓   |       |       |       |       |
| BRQ-11      |   ✓   |       |       |   ✓   |   ✓   |       |       |

BRQ-04 chủ yếu được rút ra từ phạm vi kiểm soát mua hàng đã thống nhất, không phải từ một trong bảy điểm bất cập As-Is đã xác định.

---

# 8. Ánh xạ yêu cầu với nguyên nhân gốc rễ

| Yêu cầu | Nguyên nhân gốc rễ / nguồn kiểm soát |
| ----------- | ------------------------------------------------------------------- |
| BRQ-01 | RC-02 — Thiếu luồng dữ liệu mua hàng tích hợp |
| BRQ-02 | RC-02 và xử lý PR thủ công phân tán |
| BRQ-03 | Khoảng trống kiểm soát ngân sách |
| BRQ-04 | Kiểm soát mua hàng từ nhà cung cấp đã được phê duyệt |
| BRQ-05 | RC-01 — Thiếu luồng phê duyệt PO chuẩn hóa |
| BRQ-06 | RC-02 — Thiếu luồng dữ liệu mua hàng tích hợp |
| BRQ-07 | RC-02 — Thiếu luồng dữ liệu mua hàng tích hợp |
| BRQ-08 | RC-03 — Thiếu dữ liệu chứng từ tích hợp và khả năng đối chiếu |
| BRQ-09 | RC-01 và RC-02 |
| BRQ-10 | Yêu cầu kiểm soát thanh toán phụ thuộc kiểm soát hóa đơn đã hoàn tất |
| BRQ-11 | Nhu cầu báo cáo vận hành trong phạm vi |

---

# 9. Điều kiện phụ thuộc giữa các yêu cầu

Các yêu cầu nghiệp vụ có liên hệ, không hoàn toàn độc lập.

## 9.1 Nền tảng giao dịch

BRQ-01 cung cấp nền tảng quy trình tổng thể.

```text
BRQ-01
Quản lý giao dịch P2P tập trung
        │
        ├── BRQ-02
        │   Quản lý PR
        │
        ├── BRQ-05
        │   Quản lý PO
        │
        └── BRQ-06
            Liên kết giao dịch
```

---

## 9.2 Điều kiện phụ thuộc dựa trên dữ liệu

BRQ-06 hỗ trợ nhiều khả năng ở các bước sau.

```text
BRQ-06
Tái sử dụng dữ liệu và liên kết giao dịch
        │
        ├── BRQ-07
        │   Khả năng theo dõi trạng thái
        │
        ├── BRQ-08
        │   Đối chiếu ba bên
        │
        ├── BRQ-09
        │   Truy vết
        │
        └── BRQ-11
            Báo cáo cơ bản
```

---

## 9.3 Điều kiện phụ thuộc từ hóa đơn đến thanh toán

```text
BRQ-08
Đối chiếu ba bên
        ↓
Điều kiện hóa đơn
        ↓
BRQ-10
Phê duyệt đề nghị thanh toán
```

Quy trình đề nghị thanh toán có kiểm soát yêu cầu kết quả đối chiếu hiện hành đạt theo quy tắc áp dụng. Ngoại lệ được đánh dấu đã xử lý mà chưa có đối chiếu lại đạt không thể cấp điều kiện này.

---

# 10. Yêu cầu ngoài phạm vi hiện tại

Đường cơ sở yêu cầu nghiệp vụ chủ ý loại trừ:

* tiếp nhận nhà cung cấp mới;
* đánh giá điều kiện nhà cung cấp;
* yêu cầu báo giá / đề xuất (RFQ / RFP);
* quản lý đấu thầu;
* tìm nguồn cung chiến lược;
* quản lý vòng đời hợp đồng;
* quản lý hiệu quả nhà cung cấp;
* dự báo tồn kho;
* lập kế hoạch nhu cầu;
* chức năng hệ thống quản lý kho đầy đủ;
* lập và hoạch định ngân sách doanh nghiệp;
* kế toán sổ cái;
* công nợ phải thu;
* tiền lương;
* xử lý thuế chi tiết;
* thực hiện thanh toán ngân hàng;
* tích hợp API ngân hàng;
* đối soát ngân hàng;
* mua dịch vụ, ghi nhận và nghiệm thu dịch vụ;
* hủy PR hoặc PO, sửa PR đã phê duyệt hoặc PO đã phê duyệt/đã phát hành và mở lại PR bị từ chối (để sau);
* cổng thông tin nhà cung cấp;
* thay thế toàn bộ ERP.

Mọi yêu cầu tương lai về các khả năng này nên được đánh giá như thay đổi phạm vi tiềm năng.

---

# 11. Yêu cầu cần phân rã thêm

Yêu cầu nghiệp vụ mô tả **NovaRetail cần gì**.

Hành vi hệ thống chi tiết sẽ được xác định trong các giai đoạn phân tích sau.

| BRQ | Phân tích thêm cần thực hiện |
| ------ | -------------------------------------------------------------- |
| BRQ-01 | Mô hình giao dịch và quan hệ vòng đời |
| BRQ-02 | Trường PR, kiểm tra, trạng thái, hành động người dùng |
| BRQ-03 | Hành vi kiểm tra ngân sách và kịch bản không đạt |
| BRQ-04 | Kiểm tra điều kiện nhà cung cấp |
| BRQ-05 | Luồng PO, chuyển phê duyệt, kịch bản trả về/gửi lại |
| BRQ-06 | Quan hệ chứng từ và dữ liệu giao dịch tái sử dụng được |
| BRQ-07 | Mô hình trạng thái chi tiết và quy tắc cho phép xem |
| BRQ-08 | Quy tắc đối chiếu, dung sai, loại ngoại lệ và luồng xử lý |
| BRQ-09 | Sự kiện kiểm toán, trường lịch sử và quy tắc truy cập |
| BRQ-10 | Dữ liệu đề nghị thanh toán và hành vi phê duyệt |
| BRQ-11 | Chủ đề báo cáo, quyền truy cập, định nghĩa KPI, bộ lọc và trình bày |

Các lĩnh vực này được phân rã trong [SRS](../07-software-requirements/srs.md) và [Phân tích hệ thống](../06-system-analysis/README.md); các lựa chọn chi tiết được liệt kê vẫn phụ thuộc quyết định còn mở và công việc thiết kế sau này.

---

# 12. Quyết định nghiệp vụ còn mở

Một số chính sách nghiệp vụ được chủ ý giữ chưa giải quyết.

| ID | Quyết định còn mở | Chủ sở hữu dự kiến |
| ----- | ------------------------------------------------ | ------------------------------------- |
| OD-01 | Ngưỡng tiền phê duyệt PO chính xác | Trưởng bộ phận mua hàng / Trưởng bộ phận tài chính |
| OD-02 | Tiêu chí cần phê duyệt tài chính bổ sung | Trưởng bộ phận tài chính |
| OD-03 | Chính sách kiểm tra ngân sách chi tiết | Trưởng bộ phận tài chính |
| OD-04 | Giá trị dung sai đối chiếu ba bên | Trưởng bộ phận tài chính / Kế toán công nợ phải trả |
| OD-05 | Quy tắc chuyển cấp ngoại lệ đối chiếu | Trưởng bộ phận mua hàng / Trưởng bộ phận tài chính |
| OD-06 | Trạng thái giao dịch mua hàng cuối cùng | Chủ sở hữu quy trình |
| OD-07 | Quyền chi tiết theo vai trò | Chủ sở hữu nghiệp vụ / CNTT |
| OD-08 | Chính sách nhận hàng một phần chi tiết | Mua hàng / Kho |

Các quyết định này nên được xác nhận, không tự đặt ra chỉ để hoàn thiện tài liệu.

---

# 13. Đường cơ sở yêu cầu nghiệp vụ

Đường cơ sở yêu cầu BRD ban đầu gồm:

```text
11 yêu cầu nghiệp vụ

9 mức ưu tiên cao
2 mức ưu tiên trung bình
0 mức ưu tiên thấp
```

Đường cơ sở bao phủ ranh giới quy trình đã thống nhất:

```text
Lập yêu cầu mua hàng
            ↓
Phê duyệt đề nghị thanh toán
```

---

# 14. Phân rã yêu cầu tương lai

Yêu cầu nghiệp vụ sẽ được phân rã thành yêu cầu chi tiết hơn sau này.

Ví dụ:

```text
BRQ-05
Quản lý và phê duyệt PO chuẩn hóa
        ↓
Yêu cầu chức năng
        ↓
Lập PO từ PR đã phê duyệt
Xác định tuyến phê duyệt
Chuyển PO đến người phê duyệt
Phê duyệt / trả PO
Gửi lại PO đã chỉnh sửa
        ↓
Ca sử dụng
        ↓
Tiêu chí chấp nhận
```

Ví dụ khác:

```text
BRQ-08
Đối chiếu ba bên có kiểm soát
        ↓
Yêu cầu chức năng
        ↓
Lấy PO / GR / hóa đơn
Đánh giá quy tắc đối chiếu
Nhận diện sai lệch
Tạo ngoại lệ
Điều tra / ghi nhận chỉnh sửa
Chạy lại đối chiếu
Đạt → Ghi nhận đã xử lý / cấp điều kiện
Không đạt → Giữ ngoại lệ mở / chặn đề nghị thanh toán
```

Mã yêu cầu chức năng sẽ được gán chính thức trong giai đoạn yêu cầu chi tiết.

---

# 15. Hướng truy vết

Dự án sẽ duy trì mô hình truy vết sau:

```text
Vấn đề nghiệp vụ
       ↓
Điểm bất cập
       ↓
Nguyên nhân gốc rễ
       ↓
Mục tiêu nghiệp vụ
       ↓
Yêu cầu nghiệp vụ
       ↓
Quy tắc nghiệp vụ
       ↓
Yêu cầu chức năng
       ↓
Ca sử dụng
       ↓
Tiêu chí chấp nhận / kiểm tra
```

Danh mục yêu cầu nghiệp vụ thiết lập tầng `BRQ` của mô hình này.

---

# 16. Trạng thái danh mục

| Nội dung | Trạng thái |
| -------------------------------- | --------------- |
| Đã xác định BRQ-01 đến BRQ-11 | Hoàn tất |
| Đã gán mức ưu tiên nghiệp vụ | Hoàn tất |
| Ánh xạ mục tiêu nghiệp vụ | Hoàn tất |
| Ánh xạ điểm bất cập | Hoàn tất |
| Ánh xạ nguyên nhân gốc rễ/kiểm soát | Hoàn tất |
| Tham chiếu quy tắc nghiệp vụ | Hoàn tất |
| Yêu cầu chức năng chi tiết | Được xác định trong Giai đoạn 07 |
| Ca sử dụng chi tiết | Được xác định trong Giai đoạn 06 |
| Tiêu chí chấp nhận | Được xác định trong Giai đoạn 07 |
| RTM cuối cùng | Đường cơ sở gọn trong Giai đoạn 08 |

---

## Lưu ý về phạm vi áp dụng nghiên cứu tình huống

NovaRetail JSC là tổ chức giả lập được tạo riêng cho dự án hồ sơ năng lực phân tích nghiệp vụ này.

Yêu cầu trong danh mục dựa trên bối cảnh nghiệp vụ giả lập, phạm vi dự án đã thống nhất, phân tích quy trình As-Is, phân tích điểm bất cập, phân tích nguyên nhân gốc rễ và quy trình To-Be đề xuất.

Mọi chỉ tiêu định lượng, chính sách phê duyệt, dung sai đối chiếu hoặc giả định vận hành đều cần xác nhận khi triển khai thực tế.
