# Quy tắc nghiệp vụ

## Tổng quan

Tài liệu xác định các quy tắc nghiệp vụ chính chi phối quy trình từ mua hàng đến thanh toán (Procure-to-Pay — P2P) được đề xuất cho NovaRetail JSC.

Quy tắc nghiệp vụ quy định điều kiện và ràng buộc mà quy trình tương lai phải tuân theo. Các quy tắc được tách khỏi mô hình BPMN để có thể thay đổi chính sách vận hành mà không phải thiết kế lại toàn bộ luồng quy trình.

Các quy tắc trong tài liệu được rút ra từ:

* các điểm bất cập As-Is đã xác định;
* phân tích nguyên nhân gốc rễ;
* mục tiêu dự án;
* thiết kế quy trình To-Be;
* phạm vi và giả định dự án đã thống nhất.

> **Lưu ý:** NovaRetail JSC là công ty giả lập dùng cho nghiên cứu tình huống phân tích nghiệp vụ này. Những quy tắc thường cần quyết định chính sách của quản lý, như ngưỡng phê duyệt và dung sai đối chiếu, được chủ ý giữ ở dạng có thể cấu hình, không gán giá trị tùy ý.

---

# 1. Nhóm quy tắc

Các quy tắc nghiệp vụ được nhóm theo các lĩnh vực sau:

| Nhóm | Mô tả |
| -------------------- | ----------------------------------------------------------------- |
| Yêu cầu mua hàng | Quy tắc lập, gửi, kiểm tra và phê duyệt PR |
| Kiểm soát ngân sách | Quy tắc kiểm tra ngân sách trước phê duyệt mua hàng |
| Lựa chọn nhà cung cấp | Quy tắc về điều kiện sử dụng nhà cung cấp |
| Đơn đặt hàng | Quy tắc lập, phê duyệt và phát hành PO |
| Phiếu nhận hàng | Quy tắc nhận hàng đã mua |
| Hóa đơn nhà cung cấp | Quy tắc ghi nhận hóa đơn và liên kết giao dịch |
| Đối chiếu ba bên | Quy tắc so sánh PO, GR và hóa đơn |
| Xử lý ngoại lệ | Quy tắc cho giao dịch có sai lệch |
| Phê duyệt thanh toán | Quy tắc về điều kiện sẵn sàng và phê duyệt thanh toán |
| Trạng thái và kiểm toán | Quy tắc về khả năng theo dõi và lịch sử giao dịch |
| Truy cập và kiểm soát | Quy tắc về hành động được cấp quyền cho người dùng |

---

# 2. Tổng hợp quy tắc nghiệp vụ

| Mã quy tắc | Quy tắc nghiệp vụ | Lĩnh vực |
| ------- | ------------------------------------------------------------------------------------------------------------ | -------------------- |
| BR-01 | Yêu cầu mua hàng phải có thông tin bắt buộc trước khi gửi | Yêu cầu mua hàng |
| BR-02 | Mọi PR đã gửi phải đạt kiểm tra ngân sách trước phê duyệt nghiệp vụ | Kiểm soát ngân sách |
| BR-03 | PR không đạt kiểm tra ngân sách không được chuyển phê duyệt | Kiểm soát ngân sách |
| BR-04 | PR phải được người phê duyệt nghiệp vụ có thẩm quyền phê duyệt | Yêu cầu mua hàng |
| BR-05 | Chỉ PR đã phê duyệt mới được chuyển sang xử lý mua hàng | Yêu cầu mua hàng |
| BR-06 | Chỉ nhà cung cấp đang hoạt động và đã được phê duyệt mới được chọn cho PO | Lựa chọn nhà cung cấp |
| BR-07 | PO được tạo từ PR phải giữ tham chiếu PR nguồn | Đơn đặt hàng |
| BR-08 | Nên tái sử dụng dữ liệu PR hiện có khi lập PO nếu phù hợp | Đơn đặt hàng |
| BR-09 | Mọi PO đã gửi phải theo tuyến phê duyệt áp dụng | Đơn đặt hàng |
| BR-10 | Phải áp dụng phê duyệt tài chính bổ sung khi thỏa mãn tiêu chí được cấu hình | Đơn đặt hàng |
| BR-11 | Không được phát hành PO cho nhà cung cấp cho đến khi hoàn tất mọi phê duyệt bắt buộc | Đơn đặt hàng |
| BR-12 | PO bị trả về phải được chỉnh sửa và gửi lại qua luồng phê duyệt | Đơn đặt hàng |
| BR-13 | Phiếu nhận hàng phải tham chiếu PO đã phê duyệt | Phiếu nhận hàng |
| BR-14 | Phải ghi nhận số lượng thực nhận; cách xử lý nhận một phần vẫn phụ thuộc OD-08 | Phiếu nhận hàng |
| BR-15 | Hóa đơn nhà cung cấp dùng trong quy trình P2P phải tham chiếu PO liên quan | Hóa đơn nhà cung cấp |
| BR-16 | Chỉ được bắt đầu đối chiếu ba bên khi có đủ thông tin PO, GR và hóa đơn bắt buộc | Đối chiếu ba bên |
| BR-17 | Đối chiếu phải so sánh các thuộc tính giao dịch được xác định trước | Đối chiếu ba bên |
| BR-18 | Nếu chính sách được phê duyệt cho phép dung sai đối chiếu, các giá trị phải có thể cấu hình | Đối chiếu ba bên |
| BR-19 | Hóa đơn đối chiếu đạt được phép chuyển sang chuẩn bị thanh toán | Đối chiếu ba bên |
| BR-20 | Giao dịch có sai lệch phải qua xử lý ngoại lệ trước chuẩn bị thanh toán | Xử lý ngoại lệ |
| BR-21 | Ngoại lệ đối chiếu phải giữ người phụ trách, trạng thái, lý do và lịch sử xử lý | Xử lý ngoại lệ |
| BR-22 | Chỉ được chuẩn bị đề nghị thanh toán cho hóa đơn đủ điều kiện | Phê duyệt thanh toán |
| BR-23 | Đề nghị thanh toán phải được người phê duyệt tài chính có thẩm quyền phê duyệt | Phê duyệt thanh toán |
| BR-24 | Thực hiện thanh toán ngân hàng nằm ngoài luồng mua hàng được xác định trong dự án | Phê duyệt thanh toán |
| BR-25 | Các giao dịch mua hàng chính phải duy trì trạng thái quy trình hiện tại | Trạng thái và kiểm toán |
| BR-26 | Các hành động chính và quyết định phê duyệt phải được ghi vào lịch sử giao dịch | Trạng thái và kiểm toán |
| BR-27 | Người dùng chỉ được thực hiện hành động được vai trò nghiệp vụ được giao cho phép | Truy cập và kiểm soát |

---

# 3. Quy tắc yêu cầu mua hàng

## BR-01 — Thông tin yêu cầu mua hàng bắt buộc

Yêu cầu mua hàng (Purchase Requisition — PR) phải có đầy đủ thông tin bắt buộc trước khi được gửi.

Đối với đường cơ sở của nghiên cứu tình huống này, thông tin bắt buộc khi gửi gồm:

* người yêu cầu;
* cửa hàng hoặc bộ phận yêu cầu;
* trung tâm chi phí;
* mô tả hàng hóa hữu hình;
* số lượng yêu cầu;
* đơn giá ước tính;
* ngày cần hàng;
* lý do nghiệp vụ.

PR chưa đầy đủ được phép lưu nháp nhưng không được gửi. Các giả định theo trường về dữ liệu phần đầu PR so với dòng hàng, kiểm tra và nguồn được xác định tại [Mục 2.1 của SRS](../07-software-requirements/srs.md#21-đường-cơ-sở-trường-dữ-liệu-yêu-cầu-mua-hàng). Danh sách này là giả định phân tích cho nghiên cứu tình huống, chưa phải chính sách NovaRetail được các bên liên quan xác nhận.

### Cơ sở

Yêu cầu không đầy đủ tạo việc làm rõ không cần thiết và chậm xử lý ở các bước sau.

### Hành vi hệ thống kỳ vọng

```text
Lập PR
   ↓
Gửi
   ↓
Kiểm tra thông tin bắt buộc
   ↓
Đầy đủ?
├── Có → Tiếp tục
└── Không → Trả lỗi kiểm tra
```

---

## BR-02 — Kiểm tra ngân sách trước phê duyệt PR

Mọi yêu cầu mua hàng đã gửi phải đạt kiểm tra ngân sách trước khi được chuyển phê duyệt nghiệp vụ.

### Quy tắc

> PR không được chuyển đến Quản lý cửa hàng phê duyệt cho đến khi kiểm tra ngân sách áp dụng hoàn tất với kết quả đạt.

### Cơ sở

Kiểm tra ngân sách nên vận hành như kiểm soát tài chính nhất quán, không phải hoạt động thủ công tùy chọn.

**Điểm bất cập liên quan:** PP-06
**Mục tiêu liên quan:** OBJ-04

---

## BR-03 — Không đủ ngân sách

Nếu không có đủ ngân sách, yêu cầu mua hàng không được chuyển phê duyệt.

Thay vào đó, yêu cầu phải được trả về để chỉnh sửa hoặc xử lý theo chính sách ngân sách áp dụng.

```text
Kiểm tra ngân sách
       ↓
Có đủ ngân sách?
     /          \
    Có           Không
    ↓             ↓
Phê duyệt PR    Trả PR
```

Giải pháp mua hàng sử dụng thông tin ngân sách khả dụng nhưng không quản lý lập kế hoạch hoặc phân bổ ngân sách doanh nghiệp.

---

## BR-04 — Phê duyệt yêu cầu mua hàng

Yêu cầu mua hàng phải được người phê duyệt nghiệp vụ có thẩm quyền phê duyệt trước khi bộ phận mua hàng được xử lý.

Trong thiết kế quy trình hiện tại, Quản lý cửa hàng đại diện người phê duyệt nghiệp vụ. Phê duyệt cho phép xử lý mua hàng; từ chối chặn xử lý, không mở lại hoặc gửi lại cùng PR trong đường cơ sở này. Trả lại để chỉnh sửa cần có lý do và cho phép Người yêu cầu chỉnh sửa, gửi lại PR. Khi gửi lại, hệ thống lặp lại kiểm tra trường bắt buộc và ngân sách; chỉ kết quả đạt mới cho phép PR quay lại bước Quản lý cửa hàng xem xét.

Người phê duyệt đánh giá nhu cầu mua hàng có hợp lý hay không.

### Phân biệt kiểm soát

Kiểm tra ngân sách và phê duyệt nghiệp vụ là hai quyết định khác nhau.

```text
Kiểm tra ngân sách
= Có đủ ngân sách khả dụng không?

Phê duyệt PR
= Có nên thực hiện giao dịch mua này không?
```

---

## BR-05 — Phải có PR đã phê duyệt để xử lý mua hàng

Chỉ được bắt đầu xử lý mua hàng sau khi yêu cầu mua hàng đạt trạng thái đã phê duyệt.

PR nháp, bị từ chối, bị trả về hoặc không đạt kiểm tra ngân sách không được chuyển thành đơn đặt hàng có hiệu lực.

---

# 4. Quy tắc lựa chọn nhà cung cấp

## BR-06 — Yêu cầu nhà cung cấp đã được phê duyệt

Chỉ được lập đơn đặt hàng (Purchase Order — PO) cho nhà cung cấp có trong danh mục nhà cung cấp đã được phê duyệt và đủ điều kiện sử dụng.

```text
Đã chọn nhà cung cấp
      ↓
Đã phê duyệt / đang hoạt động?
     /          \
    Có           Không
    ↓             ↓
Tiếp tục       Chặn lựa chọn
```

### Lưu ý phạm vi

Quy tắc này không bao gồm:

* tiếp nhận nhà cung cấp mới;
* đánh giá điều kiện nhà cung cấp;
* yêu cầu báo giá / đề xuất (RFQ/RFP);
* đấu thầu;
* đàm phán hợp đồng.

Các quy trình đó nằm ngoài phạm vi dự án.

---

# 5. Quy tắc đơn đặt hàng

## BR-07 — Truy vết từ PR đến PO

Đơn đặt hàng được lập từ yêu cầu mua hàng đã phê duyệt phải giữ tham chiếu PR nguồn.

Ví dụ:

```text
PR-2026-001
      ↓
PO-2026-001
```

Mối liên hệ này phải tiếp tục có sẵn để theo dõi giao dịch ở các bước sau.

---

## BR-08 — Tái sử dụng dữ liệu yêu cầu mua hàng

Khi phù hợp, nên tái sử dụng thông tin từ PR đã phê duyệt khi lập đơn đặt hàng.

Thông tin có thể tái sử dụng gồm:

* mặt hàng;
* số lượng;
* người yêu cầu;
* đơn vị yêu cầu;
* ngày cần hàng;
* tham chiếu PR.

Bộ phận mua hàng được phép bổ sung thông tin riêng của PO, gồm:

* nhà cung cấp;
* giá mua cuối cùng;
* điều khoản giao hàng;
* thông tin thương mại.

### Cơ sở

Quy tắc này giảm nhập dữ liệu thủ công lặp lại mà vẫn cho phép bộ phận mua hàng duy trì thông tin riêng của PO.

**Điểm bất cập liên quan:** PP-07
**Mục tiêu liên quan:** OBJ-02

---

## BR-09 — Chuyển phê duyệt đơn đặt hàng

Mọi đơn đặt hàng đã gửi phải theo tuyến phê duyệt áp dụng trước khi được phát hành.

Tuyến phê duyệt có thể phụ thuộc các tiêu chí nghiệp vụ như:

* số tiền PO;
* nhóm mua hàng;
* bộ phận;
* trung tâm chi phí;
* yêu cầu kiểm soát tài chính.

Hệ thống nên đánh giá các quy tắc áp dụng và chuyển mọi PO đến Trưởng bộ phận mua hàng để phê duyệt mua hàng, sau đó đến Trưởng bộ phận tài chính để phê duyệt bổ sung chỉ khi tiêu chí áp dụng yêu cầu. Giám đốc tài chính (CFO) không phải người phê duyệt PO vận hành trong đường cơ sở này.

---

## BR-10 — Phê duyệt tài chính bổ sung

Phải yêu cầu phê duyệt tài chính bổ sung khi thỏa mãn tiêu chí phê duyệt được xác định trước.

```text
Phê duyệt mua hàng
        ↓
Cần phê duyệt tài chính bổ sung?
        /                           \
       Không                         Có
      ↓                               ↓
Tiếp tục                    Trưởng bộ phận tài chính xem xét
```

### Cấu hình quy tắc

Ngưỡng tiền cụ thể hoặc tiêu chí chuyển phê duyệt khác được chủ ý chưa xác định trong nghiên cứu tình huống này.

Chúng nên được duy trì dưới dạng quy tắc nghiệp vụ có thể cấu hình theo chính sách NovaRetail đã được phê duyệt.

---

## BR-11 — Phát hành PO

Không được phát hành đơn đặt hàng cho Nhà cung cấp cho đến khi mọi phê duyệt bắt buộc đã hoàn tất.

```text
PO đã được lập
    ↓
Các phê duyệt bắt buộc
    ↓
Đã phê duyệt đầy đủ?
├── Không → Không phát hành
└── Có → Phát hành PO
```

---

## BR-12 — Đơn đặt hàng bị trả về

Nếu người phê duyệt yêu cầu thay đổi, PO phải được trả về bộ phận mua hàng để chỉnh sửa.

Sau chỉnh sửa, PO phải được gửi lại qua luồng phê duyệt áp dụng.

Các hành động phê duyệt và trả về trước đó nên được giữ trong lịch sử giao dịch.

---

# 6. Quy tắc phiếu nhận hàng

## BR-13 — Bắt buộc tham chiếu PO khi ghi nhận phiếu nhận hàng

Mọi phiếu nhận hàng (Goods Receipt — GR) trong phạm vi dự án phải tham chiếu đơn đặt hàng đã phê duyệt liên quan.

```text
PO-2026-001
     │
     └── GR-2026-001
```

Điều này hỗ trợ đối chiếu ba bên ở bước sau.

---

## BR-14 — Nhận hàng một phần

Quy trình có thể hỗ trợ nhận một phần khi số lượng giao thấp hơn số lượng PO còn phải nhận.

Ví dụ:

```text
Số lượng PO: 100

Lần giao đầu:
GR-001 = 60

Còn lại:
40
```

Phiếu nhận hàng phải ghi chính xác số lượng thực nhận.

Không được tự động coi việc nhận một phần là giao hàng hoàn tất.

Ví dụ minh họa việc ghi số lượng thực nhận. Cách xử lý chi tiết nhận một phần vẫn còn mở theo OD-08; quy tắc này không phê duyệt chính sách đối chiếu một phần hoặc thanh toán một phần.

---

# 7. Quy tắc hóa đơn nhà cung cấp

## BR-15 — Quan hệ hóa đơn với PO

Hóa đơn nhà cung cấp xử lý qua luồng P2P đã xác định phải tham chiếu đơn đặt hàng liên quan.

Ví dụ:

```text
PR-001
  │
  └── PO-001
        ├── GR-001
        └── INV-001
```

Tham chiếu PO cho phép hệ thống lấy thông tin mua hàng và nhận hàng liên quan.

---

# 8. Quy tắc đối chiếu ba bên

## BR-16 — Điều kiện tiên quyết để đối chiếu

Chỉ được thực hiện đối chiếu ba bên khi có đủ thông tin giao dịch bắt buộc.

Quan hệ chứng từ tối thiểu là:

```text
Đơn đặt hàng
      +
Phiếu nhận hàng
      +
Hóa đơn nhà cung cấp
```

Nếu một hồ sơ bắt buộc chưa có, giao dịch không được coi là đối chiếu đạt.

---

## BR-17 — Thuộc tính đối chiếu

Đối chiếu ba bên phải so sánh các thuộc tính giao dịch được xác định trước.

Các thuộc tính có thể gồm:

* nhà cung cấp;
* mặt hàng;
* số lượng đặt;
* số lượng nhận;
* số lượng trên hóa đơn;
* đơn giá PO;
* đơn giá hóa đơn;
* tổng tiền.

Ví dụ:

| Thuộc tính | PO | GR | Hóa đơn |
| ---------- | -----: | -----: | ------: |
| Mặt hàng | ITEM-A | ITEM-A | ITEM-A |
| Số lượng | 100 | 100 | 100 |
| Đơn giá | 50,000 | — | 50,000 |

Nếu các giá trị bắt buộc thỏa mãn quy tắc đối chiếu đã được phê duyệt, hóa đơn được phép đánh dấu là đã đối chiếu đạt.

---

## BR-18 — Dung sai đối chiếu

Khi chính sách NovaRetail cho phép dung sai, giá trị dung sai đối chiếu phải có thể cấu hình.

Các ví dụ có thể gồm:

* dung sai số lượng;
* dung sai giá;
* dung sai số tiền.

Nghiên cứu tình huống không gán tỷ lệ hoặc số tiền dung sai cụ thể vì các giá trị này cần chính sách Tài chính/Mua hàng được phê duyệt.

---

## BR-19 — Đối chiếu đạt

Hóa đơn nhà cung cấp chỉ được chuyển sang chuẩn bị đề nghị thanh toán khi kết quả đối chiếu hiện hành thỏa mãn quy tắc đối chiếu ba bên áp dụng. Thiếu thông tin PO, GR hoặc hóa đơn bắt buộc thì tiếp tục chờ và chưa đủ điều kiện.

```text
Đối chiếu ba bên
     ↓
Đạt
     ↓
Hóa đơn đã đối chiếu đạt
     ↓
Chuẩn bị thanh toán
```

---

# 9. Quy tắc xử lý ngoại lệ

## BR-20 — Sai lệch phải được xử lý ngoại lệ

Nếu giao dịch không thỏa mãn quy tắc đối chiếu, hóa đơn không được chuyển thẳng sang chuẩn bị thanh toán.

Thay vào đó:

```text
Sai lệch
   ↓
Tạo ngoại lệ
   ↓
Điều tra / ghi nhận chỉnh sửa
   ↓
Chạy lại đối chiếu
   ↓
Đạt? Có → Xác nhận ngoại lệ đã xử lý và hóa đơn đủ điều kiện
      Không → Giữ ngoại lệ mở và chặn đề nghị thanh toán
```

---

## BR-21 — Truy vết ngoại lệ

Mỗi ngoại lệ đối chiếu nên giữ tối thiểu:

* giao dịch liên quan;
* loại ngoại lệ;
* mô tả;
* người phụ trách được giao;
* trạng thái hiện tại;
* dấu thời gian tạo;
* thông tin xử lý;
* dấu thời gian xử lý.

Các loại ngoại lệ có thể gồm:

* sai lệch số lượng;
* sai lệch giá;
* chưa nhận đủ hàng;
* thông tin hóa đơn không chính xác.

Kế toán công nợ phải trả (AP) phối hợp chỉnh sửa với bộ phận mua hàng, kho hoặc nhà cung cấp khi cần. Ghi nhận hành động chỉnh sửa tự nó không làm ngoại lệ trở thành đã xử lý. Chỉ xác nhận đã xử lý sau khi chạy lại đối chiếu đạt. Điều này không cho phép sửa trực tiếp PO đã phê duyệt/đã phát hành hoặc GR đã ghi nhận; quy trình chỉnh sửa các chứng từ đó vẫn còn mở.

---

# 10. Quy tắc thanh toán

## BR-22 — Điều kiện lập đề nghị thanh toán

Chỉ được chuẩn bị đề nghị thanh toán (Payment Request) khi hóa đơn nhà cung cấp liên quan đủ điều kiện xử lý thanh toán.

Điều kiện này yêu cầu kết quả đối chiếu hiện hành đạt theo quy tắc áp dụng, bao gồm mọi chính sách dung sai đã được phê duyệt. Thiếu dữ liệu hoặc kết quả không đạt chặn cả chuẩn bị và gửi. Sau chỉnh sửa, phải chạy lại đối chiếu; đối chiếu lại không đạt giữ ngoại lệ mở và bị chặn, còn đối chiếu lại đạt xác nhận ngoại lệ đã xử lý và làm hóa đơn đủ điều kiện. Chỉ riêng trạng thái “đã xử lý” do người dùng đặt không thể cấp điều kiện này. Không xác định cơ chế ghi đè hoặc miễn trừ.

---

## BR-23 — Phê duyệt thanh toán

Đề nghị thanh toán phải được người phê duyệt tài chính có thẩm quyền xem xét và phê duyệt.

Trong mô hình quy trình hiện tại, Trưởng bộ phận tài chính thực hiện vai trò này.

Nếu cần thay đổi, đề nghị thanh toán được trả về AP để chỉnh sửa và gửi lại.

---

## BR-24 — Ranh giới thực hiện thanh toán

Phê duyệt đề nghị thanh toán chỉ hoàn tất luồng công việc được mô hình hóa trong nghiên cứu tình huống; không có nghĩa đã thực hiện thanh toán hoặc Nhà cung cấp đã nhận tiền.

Các hoạt động sau nằm ngoài phạm vi:

* khởi tạo chuyển khoản ngân hàng;
* tích hợp cổng thanh toán;
* thực hiện qua API ngân hàng;
* đối soát ngân hàng.

```text
Đề nghị thanh toán đã được phê duyệt
          ↓
     KẾT THÚC PHẠM VI

Thanh toán ngân hàng
→ Ngoài phạm vi
```

---

# 11. Quy tắc trạng thái và kiểm toán

## BR-25 — Trạng thái giao dịch

Các giao dịch mua hàng chính phải duy trì trạng thái quy trình hiện tại.

Các trạng thái có thể gồm:

```text
Nháp
Đã gửi
Chờ kiểm tra
Chờ phê duyệt
Đã phê duyệt
Đã trả về
Đã từ chối
PO đã được lập
PO đã phê duyệt
Đã đặt hàng
Đã nhận một phần
Đã nhận hàng
Đã nhận hóa đơn
Đang đối chiếu
Ngoại lệ
Đã đối chiếu đạt
Chờ phê duyệt thanh toán
Đã phê duyệt thanh toán
```

Mô hình trạng thái chính xác sẽ được làm rõ trong phân tích yêu cầu hệ thống.

### Mục đích

Thông tin trạng thái nên cho phép người dùng hiểu:

* giao dịch hiện ở đâu;
* có cần hành động hay không;
* ai chịu trách nhiệm bước tiếp theo.

**Điểm bất cập liên quan:** PP-04
**Mục tiêu liên quan:** OBJ-03

---

## BR-26 — Lịch sử kiểm toán

Các hành động mua hàng chính phải được ghi vào lịch sử giao dịch.

Bản ghi kiểm toán nên ghi nhận thông tin như:

| Trường | Ví dụ |
| --------------- | ------------------- |
| Giao dịch | PO-2026-001 |
| Hành động | Đã phê duyệt |
| Người dùng | Trưởng bộ phận mua hàng |
| Dấu thời gian | 2026-08-16 10:25 |
| Trạng thái trước | Chờ phê duyệt |
| Trạng thái mới | Đã phê duyệt |

Các sự kiện quan trọng gồm:

* tạo giao dịch;
* gửi;
* phê duyệt;
* từ chối;
* trả lại để chỉnh sửa;
* thay đổi quan trọng;
* kết quả đối chiếu;
* tạo ngoại lệ;
* xác nhận ngoại lệ đã xử lý;
* phê duyệt đề nghị thanh toán.

**Điểm bất cập liên quan:** PP-05
**Mục tiêu liên quan:** OBJ-05

---

# 12. Quy tắc truy cập và phân quyền

## BR-27 — Hành động theo vai trò

Người dùng chỉ được thực hiện các hành động mà vai trò được giao cho phép.

Ví dụ:

| Vai trò | Hành động được cấp quyền điển hình |
| ------------------- | -------------------------------------------------------------------- |
| Nhân viên cửa hàng | Lập và gửi PR |
| Quản lý cửa hàng | Xem xét PR |
| Nhân viên mua hàng | Xử lý PR và lập PO |
| Trưởng bộ phận mua hàng | Xem xét PO |
| Nhân viên kho | Ghi nhận phiếu nhận hàng |
| Kế toán công nợ phải trả | Ghi nhận hóa đơn, xử lý ngoại lệ đối chiếu, chuẩn bị đề nghị thanh toán |
| Trưởng bộ phận tài chính | Thực hiện phê duyệt tài chính và phê duyệt đề nghị thanh toán |

Quyền chi tiết sẽ được xác định sau trong phân tích yêu cầu hệ thống.

---

# 13. Quy tắc cần xác nhận nghiệp vụ

Không nên chốt các nội dung sau nếu chưa được chủ sở hữu nghiệp vụ liên quan xác nhận:

| Nội dung | Chủ sở hữu đề xuất |
| ---------------------------------------------- | ------------------------------------- |
| Ngưỡng tiền phê duyệt PO | Trưởng bộ phận mua hàng / Trưởng bộ phận tài chính |
| Tiêu chí cần phê duyệt tài chính bổ sung | Trưởng bộ phận tài chính |
| Chính sách kiểm tra ngân sách | Trưởng bộ phận tài chính |
| Dung sai đối chiếu | Trưởng bộ phận tài chính / AP |
| Quy tắc phê duyệt ngoại lệ | Trưởng bộ phận tài chính / Trưởng bộ phận mua hàng |
| Trạng thái giao dịch chi tiết | Chủ sở hữu quy trình |
| Quyền chi tiết theo vai trò | Chủ sở hữu nghiệp vụ / CNTT |
| Chính sách nhận hàng một phần | Mua hàng / Kho |

Các nội dung này là chính sách nghiệp vụ có thể cấu hình, không phải giả định để dự án tự đặt ra.

---

# 14. Quan hệ với yêu cầu

Quy tắc nghiệp vụ cung cấp các ràng buộc mà yêu cầu sau này phải tuân thủ.

```text
Quy tắc nghiệp vụ
      ↓
Yêu cầu nghiệp vụ
      ↓
Yêu cầu chức năng
      ↓
Ca sử dụng / hành vi hệ thống
      ↓
Tiêu chí chấp nhận
```

Ví dụ:

```text
BR-02
Mọi PR phải đạt kiểm tra ngân sách
        ↓
Yêu cầu nghiệp vụ
Quy trình mua hàng phải thực thi kiểm soát ngân sách
        ↓
Yêu cầu chức năng
Hệ thống phải kiểm tra ngân sách khả dụng
trước khi chuyển PR phê duyệt
```

Mã yêu cầu chính thức sẽ được gán trong các giai đoạn BRD và SRS.

---

## Lưu ý về nghiên cứu tình huống

NovaRetail JSC là công ty giả lập được tạo cho dự án hồ sơ năng lực phân tích nghiệp vụ này.

Tiêu chí phê duyệt, giá trị dung sai, khối lượng quy trình và chính sách vận hành dùng trong các ví dụ sau là giả lập, trừ khi được đánh dấu rõ là quy tắc nghiệp vụ đã xác nhận.
