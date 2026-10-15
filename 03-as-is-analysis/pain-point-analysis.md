# Phân tích điểm bất cập

## 1. Mục đích

Tài liệu phân tích chi tiết các điểm bất cập chính được xác định trong quy trình từ mua hàng đến thanh toán (Procure-to-Pay — P2P) hiện tại của NovaRetail.

Mục đích là kết nối từng vấn đề nghiệp vụ với:

* khâu quy trình xảy ra vấn đề;
* quan sát về hiện trạng;
* tác động có thể có đến nghiệp vụ;
* các bên liên quan bị ảnh hưởng;
* hướng cải tiến dự kiến.

Phân tích dựa trên BPMN quy trình hiện tại (As-Is) và việc đi qua từng bước quy trình hiện tại.

---

## 2. Tổng hợp điểm bất cập

Đã xác định bảy điểm bất cập chính.

| ID | Điểm bất cập | Nhóm | Khâu quy trình chính |
| ----- | ---------------------------------------- | -------------------- | ------------------------------- |
| PP-01 | Phê duyệt đơn đặt hàng quá lâu | Hiệu quả quy trình | Phê duyệt PO |
| PP-02 | Dữ liệu mua hàng phân tán | Dữ liệu và khả năng theo dõi | Toàn bộ P2P |
| PP-03 | Đối chiếu ba bên được thực hiện thủ công | Hiệu quả quy trình | Xử lý hóa đơn |
| PP-04 | Khó theo dõi trạng thái PR và PO | Dữ liệu và khả năng theo dõi | Vòng đời PR / PO |
| PP-05 | Dấu vết kiểm toán hạn chế | Kiểm soát và quản trị | Lịch sử phê duyệt / giao dịch |
| PP-06 | Kiểm soát ngân sách không nhất quán | Kiểm soát và quản trị | Phê duyệt PR |
| PP-07 | Dữ liệu mua hàng được nhập lặp lại | Hiệu quả quy trình | PR → PO → xử lý ở các bước sau |

---

## 3. Phân tích chi tiết điểm bất cập

### PP-01 — Phê duyệt đơn đặt hàng quá lâu

**Khâu quy trình:**
Phê duyệt đơn đặt hàng (Purchase Order — PO).

**Quan sát hiện tại:**
Đơn đặt hàng được gửi phê duyệt qua email. Nhân viên mua hàng phụ thuộc vào việc người phê duyệt nhận thấy email, xem xét PO đính kèm và phản hồi thủ công.

Không có hàng đợi phê duyệt tập trung, chuyển tự động hoặc cơ chế rõ ràng để xác định các yêu cầu chờ phê duyệt.

**Nguyên nhân chính:**
Quy trình phê duyệt phụ thuộc vào trao đổi email thủ công.

**Tác động đến nghiệp vụ:**

* thời gian phê duyệt PO dài hơn;
* chậm phát hành PO;
* nhà cung cấp có thể nhận đơn hàng đã xác nhận muộn hơn;
* hoạt động mua hàng có thể bị chậm;
* nhân viên mua hàng có thể phải đôn đốc thủ công.

**Các bên liên quan bị ảnh hưởng:**

* Nhân viên mua hàng;
* Trưởng bộ phận mua hàng;
* Trưởng bộ phận tài chính;
* Nhà cung cấp;
* Người yêu cầu.

**Mục tiêu liên quan:**
OBJ-01 — Rút ngắn chu trình phê duyệt đơn đặt hàng.

**Hướng cải tiến:**
Chuẩn hóa luồng phê duyệt, giảm chờ đợi không cần thiết và chuyển phê duyệt thủ công.

---

### PP-02 — Dữ liệu mua hàng phân tán

**Khâu quy trình:**
Luồng dữ liệu từ mua hàng đến thanh toán xuyên suốt.

**Quan sát hiện tại:**
Thông tin mua hàng được lưu giữ trên nhiều nguồn, gồm:

* tệp Excel;
* email;
* chứng từ mua hàng;
* hồ sơ kho;
* phần mềm kế toán.

Các bộ phận có thể giữ các phiên bản hoặc phần thông tin khác nhau của cùng một giao dịch mua hàng.

**Nguyên nhân chính:**
Không có hồ sơ giao dịch tập trung kết nối yêu cầu mua hàng (Purchase Requisition — PR), PO, phiếu nhận hàng (Goods Receipt — GR), hóa đơn và thông tin phê duyệt.

**Tác động đến nghiệp vụ:**

* khó phối hợp liên bộ phận;
* thông tin không nhất quán;
* tăng thời gian tìm chứng từ;
* hạn chế khả năng theo dõi giao dịch;
* tăng rủi ro dùng thông tin lỗi thời hoặc không đầy đủ.

**Các bên liên quan bị ảnh hưởng:**

* Nhân viên mua hàng;
* Nhân viên kho;
* Kế toán công nợ phải trả (AP);
* Trưởng bộ phận mua hàng;
* Trưởng bộ phận tài chính.

**Các mục tiêu liên quan:**

* OBJ-02 — Giảm nhập dữ liệu thủ công lặp lại.
* OBJ-03 — Cải thiện khả năng theo dõi mua hàng và tính nhất quán của dữ liệu.

**Hướng cải tiến:**
Tạo luồng dữ liệu mua hàng tích hợp hơn và bảo đảm có thể truy cập nhất quán thông tin giao dịch liên quan qua các bước quy trình.

---

### PP-03 — Đối chiếu ba bên được thực hiện thủ công

**Khâu quy trình:**
Xử lý hóa đơn.

**Quan sát hiện tại:**
Kế toán công nợ phải trả thu thập và so sánh thủ công:

```text id="hi47xt"
Đơn đặt hàng
      +
Phiếu nhận hàng
      +
Hóa đơn nhà cung cấp
```

Kế toán kiểm tra các thông tin như:

* nhà cung cấp;
* số lượng;
* đơn giá;
* tổng tiền.

Nếu phát hiện sai lệch, Kế toán công nợ phải trả phải điều tra thủ công.

**Nguyên nhân chính:**
Thông tin PO, phiếu nhận hàng và hóa đơn được lưu riêng, không được tự động liên kết hoặc đối chiếu.

**Tác động đến nghiệp vụ:**

* thời gian xử lý hóa đơn dài hơn;
* tăng khối lượng công việc cho bộ phận công nợ phải trả;
* rủi ro bỏ sót sai lệch;
* có thể chậm thanh toán;
* điều tra ngoại lệ đòi hỏi phối hợp thêm.

**Các bên liên quan bị ảnh hưởng:**

* Kế toán công nợ phải trả (AP);
* Nhân viên mua hàng;
* Nhân viên kho;
* Trưởng bộ phận tài chính;
* Nhà cung cấp.

**Mục tiêu liên quan:**
OBJ-04 — Tăng cường kiểm soát mua hàng và hóa đơn.

**Hướng cải tiến:**
Hỗ trợ đối chiếu ba bên tự động cho hóa đơn đủ điều kiện và chuyển các trường hợp sai lệch sang xem xét thủ công.

---

### PP-04 — Khó theo dõi trạng thái PR và PO

**Khâu quy trình:**
Vòng đời yêu cầu mua hàng và đơn đặt hàng.

**Quan sát hiện tại:**
Quy trình hiện tại không cung cấp trạng thái giao dịch tập trung.

Người dùng có thể cần:

* tìm kiếm email;
* kiểm tra bảng tính;
* liên hệ bộ phận mua hàng;
* liên hệ quản lý;

để xác định yêu cầu đang chờ ở đâu.

**Nguyên nhân chính:**
Thông tin trạng thái không được quản lý qua luồng công việc dùng chung.

**Tác động đến nghiệp vụ:**

* hạn chế khả năng theo dõi;
* tăng đôn đốc thủ công;
* khó xác định bên chịu trách nhiệm;
* khó phát hiện giao dịch bị chậm;
* giảm sự tin tưởng của người dùng vào quy trình mua hàng.

**Các bên liên quan bị ảnh hưởng:**

* Người yêu cầu;
* Quản lý cửa hàng;
* Nhân viên mua hàng;
* Trưởng bộ phận mua hàng.

**Mục tiêu liên quan:**
OBJ-03 — Cải thiện khả năng theo dõi mua hàng và tính nhất quán của dữ liệu.

**Hướng cải tiến:**
Cung cấp thông tin trạng thái nhất quán xuyên suốt vòng đời PR và PO.

---

### PP-05 — Dấu vết kiểm toán hạn chế

**Khâu quy trình:**
Hoạt động phê duyệt và lịch sử giao dịch.

**Quan sát hiện tại:**
Quyết định phê duyệt và thay đổi giao dịch có thể phân tán trên:

* thư email;
* tệp Excel;
* hồ sơ riêng của từng bộ phận.

Không có nguồn duy nhất chứa lịch sử đầy đủ các hành động mua hàng quan trọng.

**Nguyên nhân chính:**
Quy trình hiện tại không ghi nhận tập trung hoạt động giao dịch và quyết định phê duyệt.

**Tác động đến nghiệp vụ:**

* khó xem xét lịch sử;
* khó xác định người thực hiện hành động;
* bằng chứng cho kiểm toán nội bộ hạn chế;
* khó tái dựng các quyết định mua hàng;
* trách nhiệm giải trình trong quy trình yếu hơn.

**Các bên liên quan bị ảnh hưởng:**

* Trưởng bộ phận mua hàng;
* Trưởng bộ phận tài chính;
* Giám đốc tài chính (CFO);
* Kiểm toán nội bộ.

**Mục tiêu liên quan:**
OBJ-05 — Cải thiện khả năng truy vết giao dịch.

**Hướng cải tiến:**
Ghi nhận các sự kiện mua hàng chính, người dùng, dấu thời gian và quyết định phê duyệt trong lịch sử kiểm toán nhất quán.

---

### PP-06 — Kiểm soát ngân sách không nhất quán

**Khâu quy trình:**
Phê duyệt yêu cầu mua hàng.

**Quan sát hiện tại:**
Thông tin ngân sách có thể cần được kiểm tra thủ công trước khi yêu cầu mua hàng được phê duyệt.

Vì thông tin ngân sách không kết nối trực tiếp với luồng mua hàng, việc kiểm tra có thể phụ thuộc vào tệp có sẵn, trao đổi hoặc xác minh thủ công.

**Nguyên nhân chính:**
Kiểm tra ngân sách chưa được tích hợp thành bước kiểm soát tiêu chuẩn trong quy trình hiện tại.

**Tác động đến nghiệp vụ:**

* yêu cầu có thể tiếp tục mà chưa được xác minh ngân sách đáng tin cậy;
* thêm công sức kiểm tra thủ công;
* rủi ro vượt ngân sách khả dụng;
* chậm phê duyệt khi phải thu thập riêng thông tin ngân sách.

**Các bên liên quan bị ảnh hưởng:**

* Quản lý cửa hàng;
* Trưởng bộ phận tài chính;
* Trưởng bộ phận mua hàng;
* Người yêu cầu.

**Mục tiêu liên quan:**
OBJ-04 — Tăng cường kiểm soát mua hàng và hóa đơn.

**Hướng cải tiến:**
Thiết lập kiểm soát kiểm tra ngân sách nhất quán trước phê duyệt.

---

### PP-07 — Dữ liệu mua hàng được nhập lặp lại

**Khâu quy trình:**
Từ yêu cầu mua hàng đến đơn đặt hàng và xử lý ở các bước sau.

**Quan sát hiện tại:**
Thông tin đã có trong yêu cầu mua hàng có thể phải nhập lại thủ công khi Nhân viên mua hàng lập đơn đặt hàng.

Dữ liệu giao dịch bổ sung cũng có thể được nhập lại trong hồ sơ kho hoặc kế toán.

**Nguyên nhân chính:**
Các công cụ hiện tại không tự động tái sử dụng dữ liệu giao dịch qua các bước quy trình.

**Tác động đến nghiệp vụ:**

* tăng khối lượng công việc vận hành;
* thời gian xử lý dài hơn;
* tăng rủi ro lỗi nhập liệu;
* giá trị không nhất quán giữa các chứng từ;
* giảm năng suất.

**Các bên liên quan bị ảnh hưởng:**

* Nhân viên mua hàng;
* Nhân viên kho;
* Kế toán công nợ phải trả.

**Mục tiêu liên quan:**
OBJ-02 — Giảm nhập dữ liệu thủ công lặp lại.

**Hướng cải tiến:**
Ghi nhận thông tin giao dịch một lần khi có thể và tái sử dụng xuyên suốt các bước xử lý tiếp theo.

---

## 4. Mối liên hệ giữa các điểm bất cập

Bảy điểm bất cập không hoàn toàn độc lập.

Một số vấn đề làm trầm trọng thêm vấn đề khác.

### Dữ liệu phân tán làm tăng công việc thủ công

```text id="1pqs9h"
PP-02 Dữ liệu phân tán
        ↓
PP-07 Nhập dữ liệu trùng lặp
        ↓
Tăng xử lý thủ công
        ↓
Tăng rủi ro lỗi
```

---

### Dữ liệu phân tán làm giảm khả năng theo dõi

```text id="tayu3c"
PP-02 Dữ liệu phân tán
        ↓
Không có thông tin giao dịch dùng chung
        ↓
PP-04 Hạn chế khả năng theo dõi PR/PO
```

---

### Dữ liệu phân tán làm tăng công sức xử lý hóa đơn

```text id="d85ug1"
PP-02 Dữ liệu phân tán
        ↓
PO / GR / hóa đơn được lưu riêng
        ↓
PP-03 Đối chiếu ba bên thủ công
```

---

### Phê duyệt thủ công làm giảm tốc độ và khả năng kiểm toán

```text id="m59lg8"
Phê duyệt qua email
       ↓
       ├── PP-01 Chậm phê duyệt
       │
       └── PP-05 Dấu vết kiểm toán hạn chế
```

Các mối liên hệ cho thấy cải tiến một khâu quy trình nền tảng có thể giải quyết nhiều điểm bất cập.

---

## 5. Ưu tiên các điểm bất cập

Trong nghiên cứu tình huống này, các điểm bất cập được ưu tiên theo tác động vận hành, tác động kiểm soát và ảnh hưởng đến toàn bộ chu trình P2P.

| Mức ưu tiên | Điểm bất cập | Cơ sở |
| -------- | ----------------------------------- | ------------------------------------------------------ |
| Cao | PP-01 — Chậm phê duyệt PO | Trực tiếp kéo dài chu trình mua hàng |
| Cao | PP-02 — Dữ liệu phân tán | Góp phần gây ra nhiều vấn đề ở các bước sau |
| Cao | PP-03 — Đối chiếu ba bên thủ công | Tạo khối lượng công việc đáng kể cho AP và rủi ro chậm thanh toán |
| Cao | PP-06 — Kiểm soát ngân sách không nhất quán | Thể hiện điểm yếu quan trọng trong kiểm soát tài chính |
| Trung bình | PP-04 — Hạn chế khả năng theo dõi trạng thái | Tăng công sức đôn đốc và giảm minh bạch |
| Trung bình | PP-05 — Dấu vết kiểm toán hạn chế | Quan trọng đối với quản trị và trách nhiệm giải trình |
| Trung bình | PP-07 — Nhập dữ liệu trùng lặp | Tăng khối lượng công việc và rủi ro lỗi |

Việc ưu tiên mang tính định tính vì dự án không sử dụng dữ liệu vận hành thực tế của NovaRetail.

---

## 6. Kết luận phân tích

Phân tích điểm bất cập cho thấy các vấn đề P2P hiện tại của NovaRetail chủ yếu bắt nguồn từ ba điểm yếu rộng hơn:

### 1. Luồng công việc thủ công

Các hoạt động trọng yếu như phê duyệt, xử lý chứng từ và đối chiếu hóa đơn phụ thuộc nhiều vào công việc thủ công.

### 2. Thông tin phân tán

Dữ liệu giao dịch phân tán giữa các bộ phận và công cụ, chưa có một hồ sơ mua hàng liên thông duy nhất.

### 3. Kiểm soát quy trình hạn chế

Kiểm tra ngân sách, theo dõi giao dịch và bằng chứng kiểm toán chưa được tích hợp nhất quán vào luồng công việc hiện tại.

Các phát hiện này sẽ được phân tích sâu hơn qua phân tích nguyên nhân gốc rễ, rồi dùng làm đầu vào cho thiết kế quy trình tương lai.
