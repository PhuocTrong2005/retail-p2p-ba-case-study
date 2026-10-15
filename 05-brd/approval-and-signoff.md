# Phê duyệt và xác nhận BRD

## 1. Mục đích

Tài liệu xác định khuôn khổ xem xét, xác nhận và phê duyệt **Tài liệu yêu cầu nghiệp vụ (Business Requirements Document — BRD)** của dự án tối ưu hóa quy trình từ mua hàng đến thanh toán tại NovaRetail JSC.

Mục đích là làm rõ:

- các bên liên quan chịu trách nhiệm xem xét BRD;
- các lĩnh vực nghiệp vụ mỗi bên nên xác nhận;
- cách nên ghi nhận trạng thái phê duyệt;
- các quyết định chính sách nghiệp vụ còn mở phải giải quyết trước khi sẵn sàng triển khai.

> **Lưu ý về nghiên cứu tình huống:**
> NovaRetail JSC là tổ chức giả lập được tạo cho dự án hồ sơ năng lực phân tích nghiệp vụ này.
> Tài liệu không thể hiện chữ ký của bên liên quan thực tế hoặc phê duyệt doanh nghiệp chính thức.

---

## 2. Thông tin tài liệu

| Nội dung | Giá trị |
|---|---|
| Dự án | Tối ưu hóa quy trình từ mua hàng đến thanh toán trong bán lẻ |
| Tổ chức | NovaRetail JSC |
| Tài liệu | Phê duyệt và xác nhận BRD |
| Tài liệu liên quan | `business-requirements-document.md` |
| Danh mục liên quan | `requirements-catalog.md` |
| Phiên bản tài liệu | 1.0 |
| Trạng thái tài liệu | Đường cơ sở nghiên cứu tình huống |
| Người lập | Chuyên viên phân tích nghiệp vụ |
| Loại phê duyệt | Khuôn khổ xác nhận giả lập |
| Phê duyệt doanh nghiệp chính thức | Không áp dụng — Nghiên cứu tình huống hồ sơ năng lực |

---

## 3. Mục tiêu phê duyệt

BRD chỉ nên được coi là sẵn sàng cho phân tích yêu cầu chi tiết sau khi các bên liên quan nghiệp vụ phù hợp đã xem xét yêu cầu trong phạm vi trách nhiệm của mình.

Quy trình phê duyệt nhằm xác nhận rằng:

- vấn đề nghiệp vụ được thể hiện đúng;
- phạm vi dự án được hiểu và thống nhất;
- yêu cầu nghiệp vụ phản ánh quy trình To-Be dự kiến;
- kiểm soát nghiệp vụ được thể hiện đúng;
- không có yêu cầu lớn nằm ngoài phạm vi đã thống nhất;
- quyết định chính sách nghiệp vụ còn mở được nhận diện rõ;
- yêu cầu đủ ổn định để tiếp tục phân tích hệ thống chi tiết.

Phê duyệt BRD **không** biểu thị phê duyệt:

- thiết kế hệ thống chi tiết;
- thiết kế giao diện người dùng;
- kiến trúc kỹ thuật;
- thiết kế tích hợp;
- thiết kế cơ sở dữ liệu;
- ước tính triển khai.

Các chủ đề đó thuộc các giai đoạn dự án sau.

---

# 4. Vai trò xem xét và phê duyệt

Các bên liên quan sau sẽ tham gia xem xét và xác nhận BRD trong dự án thực tế.

| Bên liên quan | Vai trò xác nhận BRD | Lĩnh vực xem xét chính |
|---|---|---|
| Trưởng bộ phận mua hàng | Chủ sở hữu quy trình chính | Luồng mua hàng, quản lý PO, quy trình phê duyệt, kiểm soát nhà cung cấp |
| Trưởng bộ phận tài chính | Chủ sở hữu kiểm soát tài chính | Kiểm tra ngân sách, phê duyệt tài chính, kiểm soát hóa đơn, đối chiếu, phê duyệt đề nghị thanh toán |
| Quản lý cửa hàng | Đại diện người phê duyệt nghiệp vụ | Quy trình yêu cầu mua hàng và phê duyệt nghiệp vụ |
| Kế toán công nợ phải trả (AP) | Chuyên gia nghiệp vụ vận hành | Xử lý hóa đơn nhà cung cấp, đối chiếu ba bên, xử lý ngoại lệ, chuẩn bị đề nghị thanh toán |
| Đại diện kho | Chuyên gia nghiệp vụ vận hành | Quy trình nhận hàng và quan hệ từ PO đến GR |
| Đại diện CNTT | Người xem xét hỗ trợ | Tính khả thi tổng quan, điều kiện phụ thuộc hệ thống, xem xét tích hợp |
| Kiểm toán nội bộ | Người xem xét kiểm soát | Truy vết, lịch sử phê duyệt, yêu cầu kiểm toán |
| Giám đốc tài chính (CFO) / Nhà bảo trợ cấp điều hành | Phê duyệt điều hành | Mức phù hợp nghiệp vụ tổng thể và định hướng dự án |

---

# 5. Trách nhiệm xem xét của các bên liên quan

## 5.1 Trưởng bộ phận mua hàng

Trưởng bộ phận mua hàng nên xác nhận BRD thể hiện chính xác quy trình mua hàng dự kiến.

Các lĩnh vực xem xét chính gồm:

- bàn giao yêu cầu mua hàng đến bộ phận mua hàng;
- lựa chọn nhà cung cấp đã được phê duyệt;
- lập đơn đặt hàng;
- luồng phê duyệt PO;
- quy trình chỉnh sửa và gửi lại;
- kiểm soát phát hành PO;
- người phụ trách và trách nhiệm mua hàng.

### Yêu cầu chính liên quan

- BRQ-04 — Lựa chọn nhà cung cấp có kiểm soát
- BRQ-05 — Quản lý và phê duyệt đơn đặt hàng chuẩn hóa
- BRQ-06 — Tái sử dụng dữ liệu mua hàng và liên kết giao dịch

### Xác nhận kỳ vọng

Trưởng bộ phận mua hàng nên xác nhận rằng:

> Quy trình đề xuất cung cấp đủ kiểm soát đối với lập và phê duyệt đơn đặt hàng, không đưa vào hoạt động tìm nguồn cung nằm ngoài phạm vi dự án đã thống nhất.

---

## 5.2 Trưởng bộ phận tài chính

Trưởng bộ phận tài chính nên xác nhận yêu cầu liên quan kiểm soát tài chính.

Các lĩnh vực xem xét chính gồm:

- kiểm tra ngân sách;
- phê duyệt tài chính bổ sung;
- yêu cầu kiểm soát hóa đơn;
- đối chiếu ba bên;
- ngoại lệ đối chiếu;
- phê duyệt đề nghị thanh toán;
- ranh giới quy trình thanh toán.

### Yêu cầu chính liên quan

- BRQ-03 — Kiểm soát ngân sách bắt buộc
- BRQ-05 — Quản lý và phê duyệt đơn đặt hàng chuẩn hóa
- BRQ-08 — Đối chiếu ba bên và xử lý ngoại lệ có kiểm soát
- BRQ-10 — Phê duyệt đề nghị thanh toán có kiểm soát

### Xác nhận kỳ vọng

Trưởng bộ phận tài chính nên xác nhận rằng:

> Các điểm kiểm soát tài chính được áp dụng trước phê duyệt mua hàng và thanh toán, còn thực hiện thanh toán ngân hàng thực tế vẫn nằm ngoài phạm vi dự án.

---

## 5.3 Quản lý cửa hàng

Quản lý cửa hàng đại diện góc nhìn phê duyệt nghiệp vụ cho yêu cầu mua hàng.

Các lĩnh vực xem xét chính gồm:

- thông tin yêu cầu mua hàng;
- phê duyệt nhu cầu nghiệp vụ;
- kịch bản từ chối hoặc trả về;
- quan hệ giữa kiểm tra ngân sách và phê duyệt nghiệp vụ.

### Yêu cầu chính liên quan

- BRQ-02 — Quản lý yêu cầu mua hàng chuẩn hóa
- BRQ-03 — Kiểm soát ngân sách bắt buộc

### Xác nhận kỳ vọng

Quản lý cửa hàng nên xác nhận rằng:

> Kiểm tra ngân sách không thay thế quyết định nghiệp vụ phê duyệt hoặc từ chối nhu cầu mua hàng.

---

## 5.4 Kế toán công nợ phải trả

Kế toán công nợ phải trả nên xác nhận tính khả thi vận hành của yêu cầu xử lý hóa đơn.

Các lĩnh vực xem xét chính gồm:

- ghi hóa đơn nhà cung cấp;
- quan hệ giữa hóa đơn, PO và phiếu nhận hàng;
- đối chiếu ba bên;
- nhận diện sai lệch;
- xử lý ngoại lệ;
- chuẩn bị đề nghị thanh toán.

### Yêu cầu chính liên quan

- BRQ-06 — Tái sử dụng dữ liệu mua hàng và liên kết giao dịch
- BRQ-08 — Đối chiếu ba bên và xử lý ngoại lệ có kiểm soát
- BRQ-10 — Phê duyệt đề nghị thanh toán có kiểm soát

### Xác nhận kỳ vọng

Kế toán công nợ phải trả nên xác nhận rằng:

> Giao dịch thông thường có thể được xử lý nhất quán, còn giao dịch có sai lệch vẫn phải được con người điều tra có kiểm soát.

---

## 5.5 Đại diện kho

Đại diện kho nên xác nhận yêu cầu liên quan phiếu nhận hàng.

Các lĩnh vực xem xét chính gồm:

- nhận hàng được giao;
- ghi phiếu nhận hàng (Goods Receipt — GR);
- tham chiếu PO;
- thông tin cần cho đối chiếu ở bước sau.

### Yêu cầu chính liên quan

- BRQ-06 — Tái sử dụng dữ liệu mua hàng và liên kết giao dịch
- BRQ-08 — Đối chiếu ba bên và xử lý ngoại lệ có kiểm soát

### Xác nhận kỳ vọng

Đại diện kho nên xác nhận rằng:

> Thông tin phiếu nhận hàng có thể được liên kết đáng tin cậy với đúng đơn đặt hàng và dùng cho đối chiếu hóa đơn ở bước sau.

---

## 5.6 Đại diện CNTT

Đại diện CNTT nên thực hiện xem xét tính khả thi tổng quan.

BRD không yêu cầu CNTT phê duyệt thiết kế kỹ thuật chi tiết ở giai đoạn này.

Các lĩnh vực xem xét chính gồm:

- tính sẵn có của thông tin danh mục nhà cung cấp;
- tính sẵn có của thông tin ngân sách;
- cùng tồn tại với hệ thống kế toán hiện có;
- điều kiện phụ thuộc tích hợp tiềm năng;
- điều kiện phụ thuộc về vai trò và truy cập.

### Xác nhận kỳ vọng

Đại diện CNTT nên nhận diện mọi điều kiện phụ thuộc kỹ thuật lớn có thể làm yêu cầu nghiệp vụ không còn khả thi trước khi bắt đầu phân tích hệ thống chi tiết.

---

## 5.7 Kiểm toán nội bộ

Kiểm toán nội bộ nên xem xét yêu cầu kiểm soát và truy vết.

Các lĩnh vực xem xét chính gồm:

- lịch sử phê duyệt;
- lịch sử giao dịch;
- ghi nhận người dùng/hành động/dấu thời gian;
- lịch sử ngoại lệ đối chiếu;
- phân tách trách nhiệm ở mức tổng quan.

### Yêu cầu chính liên quan

- BRQ-09 — Truy vết giao dịch và phê duyệt

### Xác nhận kỳ vọng

Kiểm toán nội bộ nên xác nhận rằng:

> Quy trình tương lai cung cấp đủ khả năng truy vết ở mức nghiệp vụ để hỗ trợ xác định yêu cầu kiểm toán chi tiết sau này.

---

## 5.8 CFO / Nhà bảo trợ cấp điều hành

CFO đóng vai trò Nhà bảo trợ cấp điều hành, không phải người tham gia luồng công việc hằng ngày.

Nhà bảo trợ cấp điều hành nên xác nhận:

- mức phù hợp với mục tiêu nghiệp vụ;
- phạm vi dự án tổng thể;
- kết quả nghiệp vụ kỳ vọng;
- định hướng kiểm soát tài chính chính;
- quyết định chưa giải quyết cần chuyển cấp điều hành.

### Xác nhận kỳ vọng

CFO nên xác nhận rằng:

> BRD vẫn phù hợp chuyển đổi nghiệp vụ dự kiến và không mở rộng thành chương trình ERP đầy đủ, tìm nguồn cung hoặc thực hiện thanh toán.

---

# 6. Ma trận phê duyệt

Ma trận sau thể hiện cấu trúc xác nhận kỳ vọng.

| Sản phẩm / lĩnh vực | Trưởng bộ phận mua hàng | Trưởng bộ phận tài chính | Quản lý cửa hàng | Kế toán công nợ phải trả | Kho | CNTT | Kiểm toán nội bộ | CFO |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Vấn đề nghiệp vụ | R | R | C | C | C | C | C | A |
| Mục tiêu nghiệp vụ | R | R | C | C | C | C | C | A |
| Phạm vi dự án | R | R | C | C | C | C | C | A |
| Yêu cầu PR | C | C | A/R | C |  | C |  |  |
| Kiểm soát ngân sách | C | A/R | C | C |  | C | C |  |
| Lựa chọn nhà cung cấp | A/R | C |  |  |  | C |  |  |
| Quản lý PO | A/R | C |  | C |  | C |  |  |
| Phê duyệt tài chính PO | C | A/R |  | C |  | C | C |  |
| Phiếu nhận hàng | C |  |  | C | A/R | C |  |  |
| Xử lý hóa đơn | C | C |  | A/R | C | C |  |  |
| Đối chiếu ba bên | C | A |  | R | C | C | C |  |
| Xử lý ngoại lệ — xem xét luồng mua hàng | A | C |  | R | C | C | C |  |
| Xử lý ngoại lệ — xem xét kiểm soát tài chính | C | A |  | R | C | C | C |  |
| Phê duyệt đề nghị thanh toán |  | A/R |  | R |  | C | C |  |
| Kiểm toán / truy vết | C | C |  | C | C | C | A/R |  |
| Phê duyệt BRD cuối cùng | R | R | C | C | C | C | C | A |

### Chú giải RACI

| Mã | Ý nghĩa |
|---|---|
| R | Chịu trách nhiệm thực hiện xem xét hoặc xác nhận lĩnh vực |
| A | Chịu trách nhiệm cuối cùng phê duyệt nghiệp vụ của lĩnh vực |
| C | Được tham vấn trong quá trình xác nhận |

`A/R` nghĩa là cùng người xem xét vừa chịu trách nhiệm cuối cùng vừa chịu trách nhiệm thực hiện đối với lĩnh vực xem xét đã nêu. Các ô `A/C` trước đây cho xử lý ngoại lệ được tách theo đối tượng xem xét: Mua hàng phụ trách xác nhận luồng mua hàng, Tài chính phụ trách xác nhận kiểm soát tài chính, hai bên tham vấn nhau. Điều này không chốt chuyển cấp ngoại lệ vận hành hoặc trách nhiệm với trường hợp hỗn hợp; các nội dung đó vẫn mở theo OD-05.

Đây là **RACI xem xét/xác nhận BRD**, khác với **RACI quy trình** theo vai trò con người trong [Phân tích các bên liên quan](../02-stakeholder-analysis/stakeholder-analysis.md#8-ma-trận-raci-sơ-bộ). Tài chính giữ `A/R` với Kiểm soát ngân sách nghĩa là xem xét chính sách/yêu cầu, không thực hiện tính toán ngân sách của hệ thống. Cả hai ma trận đều không cấp quyền truy cập hệ thống; quyền chi tiết vẫn mở theo OD-07.

> Ma trận thể hiện mô hình xác nhận đề xuất cho nghiên cứu tình huống.
> Trong tổ chức thực tế, phân công RACI cuối cùng cần các bên liên quan xác nhận.

---

# 7. Quyết định nghiệp vụ còn mở cần xác nhận

Các nội dung sau nên tiếp tục để mở cho đến khi chủ sở hữu nghiệp vụ phù hợp xác nhận.

| ID | Quyết định còn mở | Chủ sở hữu chính | Bên liên quan hỗ trợ | Trạng thái |
|---|---|---|---|---|
| OD-01 | Ngưỡng phê duyệt đơn đặt hàng chính xác | Trưởng bộ phận mua hàng / Trưởng bộ phận tài chính | CFO nếu cần chuyển cấp | Đang chờ |
| OD-02 | Tiêu chí cần phê duyệt tài chính bổ sung | Trưởng bộ phận tài chính | Trưởng bộ phận mua hàng | Đang chờ |
| OD-03 | Chính sách kiểm tra ngân sách chi tiết | Trưởng bộ phận tài chính | Quản lý cửa hàng / CNTT | Đang chờ |
| OD-04 | Chính sách và giá trị dung sai đối chiếu ba bên, nếu áp dụng | Trưởng bộ phận tài chính | Kế toán công nợ phải trả / Trưởng bộ phận mua hàng | Đang chờ |
| OD-05 | Quy tắc chuyển cấp ngoại lệ đối chiếu | Trưởng bộ phận tài chính / Trưởng bộ phận mua hàng | Kế toán công nợ phải trả | Đang chờ |
| OD-06 | Mô hình trạng thái giao dịch mua hàng cuối cùng | Chủ sở hữu quy trình | CNTT | Đang chờ |
| OD-07 | Quyền chi tiết theo vai trò | Chủ sở hữu nghiệp vụ | CNTT | Đang chờ |
| OD-08 | Chính sách nhận hàng một phần | Trưởng bộ phận mua hàng / Kho | Kế toán công nợ phải trả | Đang chờ |

Không được coi quyết định còn mở là quy tắc vận hành thực tế đã xác nhận khi chưa được xác nhận.

---

# 8. Tiêu chí xác nhận yêu cầu

Yêu cầu nghiệp vụ nên được coi là đã xác nhận khi thỏa mãn các tiêu chí sau.

| Tiêu chí | Câu hỏi xác nhận |
|---|---|
| Nhu cầu nghiệp vụ | Yêu cầu có đáp ứng nhu cầu nghiệp vụ thực, kiểm soát hoặc khả năng thuộc phạm vi đã thống nhất không? |
| Phù hợp phạm vi | Yêu cầu có nằm trong ranh giới quy trình P2P đã phê duyệt không? |
| Truy vết | Có thể truy vết yêu cầu tới mục tiêu, điểm bất cập, nhu cầu quy trình hoặc kiểm soát nghiệp vụ không? |
| Rõ ràng | Có thể hiểu yêu cầu mà không cần diễn giải kỹ thuật chi tiết không? |
| Không trùng lặp | Yêu cầu có mục đích nghiệp vụ riêng không? |
| Nhận thức tính khả thi | Các điều kiện phụ thuộc bên ngoài chính đã được nhận diện chưa? |
| Định hướng kiểm chứng | Sau này có thể rút ra tiêu chí thành công đo lường hoặc quan sát được không? |
| Chủ sở hữu nghiệp vụ | Có xác định được chủ sở hữu nghiệp vụ để xác nhận không? |

---

# 9. Trạng thái xác nhận BRD hiện tại

Vì kho này là nghiên cứu tình huống hồ sơ năng lực, chưa diễn ra xác nhận chính thức của các bên liên quan.

Do đó, trạng thái hiện tại nên được hiểu là:

```text
Đã hoàn tất phân tích
        ↓
Đã soạn BRD
        ↓
Đã hoàn tất rà tính nhất quán nội bộ
        ↓
Đã thiết lập đường cơ sở nghiên cứu tình huống
        ↓
Xác nhận chính thức của các bên liên quan
Chưa thực hiện
```
