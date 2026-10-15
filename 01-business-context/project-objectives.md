# Mục tiêu dự án

## 1. Mục đích

Sau khi rà soát quy trình mua hàng đến thanh toán (Procure-to-Pay — P2P) hiện tại, dự án xác định một số vấn đề lặp lại liên quan đến chậm phê duyệt, dữ liệu phân tán, xử lý thủ công, khó theo dõi, hạn chế khả năng kiểm toán và kiểm soát tài chính thiếu nhất quán.

Thay vì xem từng vấn đề là một mục tiêu riêng, dự án nhóm các vấn đề liên quan thành năm lĩnh vực cải tiến rộng hơn.

Các mục tiêu dưới đây xác định kết quả kỳ vọng của quy trình P2P được thiết kế lại.

> **Giả định:** Các giá trị định lượng trong nghiên cứu tình huống này là giả định, chỉ nhằm xác lập mục tiêu có thể đo lường cho quy trình đề xuất.

---

## 2. Mục đích nghiệp vụ tổng thể

Mục đích tổng thể của dự án là cải thiện hiệu quả, tính minh bạch, tính nhất quán và khả năng kiểm soát quy trình P2P của NovaRetail.

Dự án tập trung vào:

* giảm thời gian chờ không cần thiết;
* giảm công việc thủ công lặp lại;
* cải thiện khả năng tiếp cận thông tin mua hàng nhất quán;
* củng cố kiểm soát mua hàng và thanh toán;
* cải thiện khả năng truy vết giao dịch.

---

## 3. Mục tiêu nghiệp vụ

### OBJ-01 — Rút ngắn chu kỳ phê duyệt đơn đặt hàng

Quy trình phê duyệt đơn đặt hàng (Purchase Order — PO) hiện tại phụ thuộc nhiều vào trao đổi qua email. Yêu cầu phê duyệt có thể chờ đến khi người quản lý phù hợp xem xét và phản hồi.

Dự án hướng đến giảm thời gian chờ không cần thiết và rút ngắn chu kỳ phê duyệt PO.

**Vấn đề liên quan:**
PP-01 — Phê duyệt PO quá lâu.

**Chỉ số đo:**
Thời gian trung bình từ gửi PO đến phê duyệt cuối cùng.

**Giả định hiện tại:**
Khoảng 2 ngày làm việc.

**Mục tiêu:**
Dưới 1 ngày làm việc.

**Ranh giới đo lường:** Khoảng thời gian vẫn là từ gửi PO đến phê duyệt cuối cùng. Lịch làm việc, mốc bắt đầu từ lần gửi đầu hay lần gửi lại, cách xử lý chu kỳ trả lại/gửi lại và hồ sơ đang chờ hoặc bị từ chối chưa được xác định. Không mặc định lịch làm việc hoặc quy tắc loại trừ nào.

---

### OBJ-02 — Giảm nhập liệu thủ công lặp lại

Thông tin mua hàng hiện được nhập và chuyển giữa nhiều tệp, hệ thống. Thông tin tương tự có thể phải nhập lại khi tạo PO, ghi nhận nhận hàng hoặc xử lý hóa đơn.

Mục tiêu là giảm nhập liệu lặp lại và cho phép tái sử dụng thông tin giao dịch xuyên suốt quy trình P2P khi có thể.

**Vấn đề liên quan:**

* PP-02 — Dữ liệu mua hàng phân tán.
* PP-07 — Dữ liệu được nhập lại thủ công qua nhiều giai đoạn quy trình.

**Chỉ số đo:**
Các điểm nhập lại thủ công đối với thông tin có thể tái sử dụng đã tồn tại, cùng số điểm ghi nhận ban đầu của thông tin đó.

**Giả định hiện tại:**
Khoảng 4 điểm nhập liệu thủ công.

Ước tính giả lập này cần được xác nhận theo định nghĩa đã làm rõ về dữ liệu có thể tái sử dụng; không được mặc định chỉ tính các lần nhập dư thừa.

**Mục tiêu:**
Không quá 1 điểm nhập liệu thủ công ban đầu cho thông tin giao dịch có thể tái sử dụng, với dữ liệu được tái sử dụng ở các bước sau khi có thể.

**Ranh giới đo lường:** Nhập lại thông tin yêu cầu mua hàng (Purchase Requisition — PR) hoặc PO đã có được tính là nhập lặp. Quan sát mới hoặc dữ liệu riêng của chứng từ, như số lượng thực nhận, thông tin hóa đơn nhà cung cấp và thông tin đề nghị thanh toán (Payment Request), là các đầu vào riêng. Mục tiêu không giới hạn toàn bộ P2P ở một lần nhập liệu. Đơn vị dữ liệu tái sử dụng, cách đếm điểm nhập và tập đối tượng quan sát vẫn cần xác định.

---

### OBJ-03 — Cải thiện khả năng theo dõi mua hàng và tính nhất quán dữ liệu

Thông tin mua hàng hiện phân tán trên email, bảng tính và phần mềm kế toán. Do đó, người dùng có thể khó xác định trạng thái hiện tại của PR hoặc PO và phải tìm thông tin liên quan từ nhiều nguồn.

Quy trình được thiết kế lại nên cung cấp cách nhìn nhất quán hơn về giao dịch mua hàng, giúp người dùng liên quan xác định trạng thái hiện tại và bên chịu trách nhiệm dễ hơn.

**Vấn đề liên quan:**

* PP-02 — Dữ liệu mua hàng phân tán.
* PP-04 — Khó theo dõi trạng thái PR và PO.

**Chỉ số đo:**

* Tỷ lệ giao dịch PR và PO có trạng thái xử lý.
* Tỷ lệ giao dịch mua hàng được quản lý qua quy trình tập trung.

**Mục tiêu:**

* 100% giao dịch PR và PO nên có trạng thái xử lý có thể xem được.
* Ít nhất 95% giao dịch P2P trong phạm vi nên được quản lý qua quy trình tập trung.

**Ranh giới đo lường:** Khả năng xem trạng thái và mức độ bao phủ giao dịch tập trung là hai chỉ số riêng. Tập hồ sơ, kỳ quan sát, đơn vị đếm giao dịch và tiêu chí hiển thị cho người có quyền vẫn cần xác định; quyền truy cập chi tiết còn mở theo OD-07.

---

### OBJ-04 — Củng cố kiểm soát mua hàng và hóa đơn

Quy trình hiện tại có hai điểm yếu kiểm soát đáng kể: kiểm tra ngân sách chưa được thực hiện nhất quán trước mua hàng, và đối chiếu ba bên được xử lý thủ công.

Dự án hướng đến cải thiện các điểm kiểm soát này trước khi hoàn tất quyết định mua hàng và thanh toán.

PR nên được kiểm tra với ngân sách khả dụng trước khi phê duyệt. Hóa đơn nhà cung cấp cũng nên được đối chiếu với PO và phiếu nhận hàng (Goods Receipt — GR) trước khi xử lý thanh toán.

**Vấn đề liên quan:**

* PP-03 — Đối chiếu ba bên được thực hiện thủ công.
* PP-06 — Kiểm soát ngân sách thiếu nhất quán.

**Chỉ số đo:**

* Tỷ lệ PR được kiểm tra với ngân sách khả dụng trước khi phê duyệt.
* Tỷ lệ hóa đơn đủ điều kiện được xử lý qua đối chiếu ba bên tự động.

**Mục tiêu:**

* 100% PR nên được kiểm tra ngân sách trước khi phê duyệt.
* Ít nhất 80% hóa đơn đủ điều kiện nên được xử lý qua đối chiếu ba bên tự động.

Hóa đơn có sai lệch số lượng, giá hoặc nhận hàng vẫn có thể cần xem xét thủ công.

**Ranh giới đo lường:** Chỉ số đối chiếu tự động tính hóa đơn đủ điều kiện được xử lý qua kiểm soát đối chiếu ba bên tự động, gồm cả kết quả không đạt phải xử lý ngoại lệ. Không có nghĩa 80% đối chiếu đạt. Điều kiện bắt đầu đối chiếu khác với điều kiện lập đề nghị thanh toán sau khi đối chiếu đạt. Mẫu số hóa đơn đủ điều kiện, kỳ quan sát và cách xử lý các lần đối chiếu lặp vẫn cần xác định. Chỉ số ngân sách cũng cần quy tắc đếm khi kiểm tra lại sau gửi lại; mục tiêu 100% giữ nguyên.

---

### OBJ-05 — Cải thiện khả năng truy vết giao dịch

Quyết định phê duyệt và thay đổi giao dịch hiện phân tán trong email và các tệp riêng. Điều này gây khó khăn khi rà soát hoạt động quá khứ và xác định ai đã thực hiện hành động cụ thể.

Quy trình tương lai nên cung cấp lịch sử giao dịch đủ để hỗ trợ rà soát vận hành và kiểm toán nội bộ.

**Vấn đề liên quan:**
PP-05 — Dấu vết kiểm toán mua hàng còn hạn chế.

**Chỉ số đo:**
Tỷ lệ hành động mua hàng trọng yếu trong phạm vi được ghi nhận với thông tin kiểm toán bắt buộc.

**Mục tiêu:**
100% hành động trọng yếu được thực hiện qua quy trình mua hàng đề xuất nên được ghi nhận.

Các hành động trọng yếu gồm:

* Tạo
* Gửi
* Phê duyệt
* Từ chối
* Trả lại để chỉnh sửa
* Cập nhật
* Ghi nhận phiếu nhận hàng
* Thực hiện đối chiếu hóa đơn
* Phê duyệt đề nghị thanh toán

**Ranh giới đo lường:** Mục tiêu 100% liên quan đến mức độ bao phủ kiểm toán hành động trọng yếu, nhất quán với BR-26 và NFR-02. Tỷ lệ giao dịch có lịch sử đầy đủ là chỉ số chẩn đoán riêng, không có mục tiêu riêng được xác định tại đây. Danh mục sự kiện trọng yếu cuối cùng, quy tắc đầy đủ trường bắt buộc, mẫu số và kỳ quan sát cần được xác nhận; không mặc định thời hạn lưu trữ.

---

## 4. Tóm tắt mục tiêu

| ID | Mục tiêu | Chỉ số đo chính | Đích cần đạt |
| --- | --- | --- | --- |
| OBJ-01 | Rút ngắn chu kỳ phê duyệt PO | Thời gian trung bình từ gửi đến phê duyệt cuối cùng | < 1 ngày làm việc |
| OBJ-02 | Giảm nhập liệu thủ công lặp lại | Ghi nhận ban đầu và nhập lại dữ liệu có thể tái sử dụng | ≤ 1 điểm nhập ban đầu cho dữ liệu có thể tái sử dụng |
| OBJ-03 | Cải thiện khả năng theo dõi mua hàng và tính nhất quán dữ liệu | Mức độ bao phủ trạng thái PR/PO; tỷ lệ giao dịch P2P trong phạm vi được tập trung | 100% xem được trạng thái; ≥ 95% tập trung |
| OBJ-04 | Củng cố kiểm soát mua hàng và hóa đơn | Kiểm tra ngân sách; hóa đơn đủ điều kiện được xử lý qua đối chiếu tự động | 100% kiểm tra ngân sách; ≥ 80% được xử lý đối chiếu tự động |
| OBJ-05 | Cải thiện khả năng truy vết giao dịch | Mức độ bao phủ kiểm toán hành động trọng yếu | 100% |

Với OBJ-03, mục tiêu 95% đo tỷ trọng giao dịch P2P trong phạm vi được quản lý qua quy trình tập trung. Mục tiêu này tách biệt với chỉ số 100% xem được trạng thái PR/PO. Mọi mục tiêu đều là kỳ vọng giả lập; chưa mục tiêu nào là kết quả đã đạt. Các lựa chọn đo lường nêu trên vẫn còn mở.

---

## 5. Quan hệ giữa vấn đề và mục tiêu

```text
PP-01 Chậm phê duyệt
        ↓
OBJ-01 Rút ngắn chu kỳ phê duyệt PO


PP-02 Dữ liệu phân tán
PP-07 Nhập liệu trùng lặp
        ↓
OBJ-02 Giảm nhập liệu thủ công lặp lại


PP-02 Dữ liệu phân tán
PP-04 Khó theo dõi trạng thái
        ↓
OBJ-03 Cải thiện khả năng theo dõi mua hàng và tính nhất quán dữ liệu


PP-03 Đối chiếu ba bên thủ công
PP-06 Kiểm soát ngân sách thiếu nhất quán
        ↓
OBJ-04 Củng cố kiểm soát mua hàng và hóa đơn


PP-05 Dấu vết kiểm toán hạn chế
        ↓
OBJ-05 Cải thiện khả năng truy vết giao dịch
```

---

## 6. Từ mục tiêu đến giải pháp

Mục tiêu mô tả kết quả nghiệp vụ kỳ vọng từ dự án. Chúng chưa xác định chức năng hệ thống cụ thể.

Ví dụ:

```text
Vấn đề nghiệp vụ
Phê duyệt PO quá lâu

        ↓

Mục tiêu nghiệp vụ
Rút ngắn chu kỳ phê duyệt PO

        ↓

Quy trình đề xuất tương lai
Giảm chuyển xử lý thủ công và thời gian chờ không cần thiết

        ↓

Yêu cầu nghiệp vụ
Quy trình phê duyệt phải tuân theo quy tắc phê duyệt định trước

        ↓

Yêu cầu chức năng
Hệ thống phải chuyển PO đã gửi
đến người phê duyệt phù hợp theo quy tắc phê duyệt đã xác định
```

Giải pháp chi tiết sẽ được xác định sau trong thiết kế quy trình đề xuất tương lai và phân tích yêu cầu.
