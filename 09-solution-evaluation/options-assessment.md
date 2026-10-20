# Đánh giá phương án cải tiến P2P — 2B và kiến nghị có điều kiện 2C

NovaRetail là doanh nghiệp giả lập; dữ liệu, nhu cầu và mục tiêu trong case study chưa được doanh nghiệp thật xác nhận. Đây là phân tích bổ sung sau prototype, không tái dựng lịch sử lựa chọn ban đầu. Mục 1–11 giữ phân tích 2B; mục 12–17 bổ sung 2C theo đầu vào chủ dự án duyệt. Không chấm điểm hoặc đặt trọng số; kiến nghị có điều kiện không phải quyết định mua hay triển khai.

## 1. Câu hỏi, phiên bản và phạm vi

**Câu hỏi:** Với phạm vi và nhu cầu P2P giả lập đã xác định, NovaRetail có thể đáp ứng nhu cầu bằng từng hướng giải pháp như thế nào, với những đánh đổi và điều kiện nào?

Nguồn nội bộ tại HEAD `bcf976031eb07eab9a7b969352dad8ad9d572faf`. Đầu lượt: branch `main`, working tree sạch, index rỗng; thông tin Git cục bộ cho thấy ngang `origin/main`, không fetch. Không tìm thấy AGENTS.md áp dụng. Branch làm việc `solution-evaluation` được tạo từ HEAD này. Sản phẩm này chưa tồn tại trước lượt. Snapshot đầu lượt và SHA-256 của 15 tài liệu nguồn được lưu ngoài repo tại `C:\Users\ASUS\AppData\Local\Temp\p2p-2b-4ef4af306ccd409e92fe1f8551c3a9f8\snapshot.json`, đã đọc lại được; thư mục tạm có thể bị hệ điều hành dọn.

Phạm vi chung: hàng hóa hữu hình; PR → PO → GR → hóa đơn → phê duyệt đề nghị thanh toán; trạng thái, lịch sử và báo cáo cơ bản. PR là yêu cầu mua hàng, PO là đơn đặt hàng, GR là phiếu nhận hàng. Kế toán hiện có tiếp tục vận hành theo giả định đường cơ sở. Không mở rộng sang mua dịch vụ, thanh toán ngân hàng, thuế, kho chi tiết hoặc thay thế toàn bộ ERP (N1–N3).

Lựa chọn nền tảng thực hành portfolio là quyết định học tập riêng. Việc dễ tạo demo không phải bằng chứng phù hợp doanh nghiệp. Không dựng lab, đăng ký trial, dùng tài khoản hoặc thực hiện quan sát hệ thống mới trong 2B.

## 2. Quy ước đánh giá và phân loại đầu vào

Hai lớp được giữ riêng:

- **L1 — Nhu cầu nghiệp vụ:** vấn đề, OBJ và BRQ; xem cơ chế có thể giảm nhập lại, làm rõ người xử lý, kiểm soát phê duyệt, liên kết/đối chiếu chứng từ, truy vết và báo cáo.
- **L2 — Baseline hệ thống đề xuất:** FR/NFR và tiêu chí chấp nhận (AC). Ví dụ FR-02/07/12 yêu cầu hệ thống chặn, NFR-03 yêu cầu toàn vẹn tham chiếu. Checklist do người làm không tương đương các yêu cầu này.

FR mô tả đường cơ sở hệ thống đã đề xuất, không mặc nhiên là tiêu chí lựa chọn trung lập về cách triển khai. Cần phân biệt kết quả nghiệp vụ với cơ chế hệ thống được yêu cầu; khác biệt được ghi thành khoảng thiếu, không hạ baseline để phương án đạt. Nếu 2C cân nhắc cách đáp ứng khác, phải nêu rõ hệ quả và quyết định phạm vi cần chấp thuận (N3–N5).

| Đầu vào | Phân loại và cách dùng | Phần còn mở |
| --- | --- | --- |
| G1-D01–06; BR/FR liên quan | Đã chốt cho case study; dùng kiểm tra kiểm soát và ranh giới | Chưa có stakeholder sign-off thật |
| Trường PR tại SRS 2.1; scope A-01–09 | Giả định phân tích của case study; đánh giá nhất quán trên cùng giả định | Chủ dữ liệu, danh mục, tích hợp và chi tiết trường chưa xác nhận thực tế |
| OBJ-01–05 và đích định lượng | Mục tiêu giả định; phân tích cơ chế tác động, không coi là kết quả hoặc điều kiện nghiệm thu được xác nhận | Kỳ đo, mẫu số, lịch làm việc và cách đếm còn thiếu |
| OD-01–08 | Chính sách/quyết định mở; xem khả năng hỗ trợ khi chính sách được chốt | Ngưỡng PO, tài chính bổ sung, ngân sách, dung sai, chuyển cấp ngoại lệ, trạng thái, quyền, nhận một phần |
| SIM-01–04 | Chỉ dùng cho prototype; giới hạn phạm vi bằng chứng | Không chuyển ngân sách định trước, hai vai demo hoặc đồng hồ mô phỏng thành chính sách vận hành |

Không đặt thêm ngưỡng, dung sai, SLA, ngân sách, quyền chi tiết hoặc chính sách thanh toán/nhận hàng một phần. OD vẫn mở; khoảng thiếu RTM, SIM và metric giữ nguyên (N4–N8).

Trạng thái gắn với **từng tuyên bố**, không gắn một nhãn cho cả phương án:

| Nhãn | Ý nghĩa |
| --- | --- |
| Đáp ứng có bằng chứng | Nguồn xác nhận đúng nội dung và phạm vi được nêu; phải ghi loại bằng chứng |
| Một phần/điều kiện | Có phần hỗ trợ, còn phụ thuộc hoặc thiếu phần kiểm soát |
| Không đáp ứng có bằng chứng | Có căn cứ cho nội dung cụ thể không được đáp ứng trong cấu hình/phạm vi được xét |
| Chưa xác minh | Chưa đủ căn cứ; không phải không đáp ứng hoặc điểm 0 |
| Không áp dụng | Có lý do theo phạm vi; không dùng để bỏ qua nhu cầu bắt buộc |

Loại bằng chứng: **TL** = tài liệu mô tả; **KT** = kết quả kiểm tra đã ghi trong repo; **QS** = quan sát mới; **SL** = suy luận/giả định phân tích. Lượt này không có QS hệ thống nghiệp vụ. TL về khả năng không đồng nghĩa đã cấu hình, kiểm tra hoặc vận hành đạt. Nhận xét B về giải pháp đầy đủ chủ yếu là SL; KT chỉ hỗ trợ phần prototype được chỉ rõ. Không có thang điểm/trọng số.

## 3. Định nghĩa ba phương án

| Phương án | Bao gồm và cơ chế | Không mặc định bao gồm | Điều kiện và điều chưa biết |
| --- | --- | --- | --- |
| A — Chuẩn hóa công cụ hiện có | Biểu mẫu, mã tham chiếu, trách nhiệm, checklist, bàn giao, sổ trạng thái và nơi lưu hồ sơ thống nhất trên bảng tính/email/kế toán hiện có. Kiểm soát chủ yếu do người thực hiện, công cụ giữ dữ liệu | Giữ nguyên hiện trạng; Power Automate, SharePoint hay nền tảng mới; tự động chặn toàn P2P | Cần chủ quy trình, quyền thư mục/tệp phù hợp, quản lý phiên bản và người đối soát. Chưa biết công cụ/phiên bản/quyền thực có (N1–N3; SL-A) |
| B — Workflow riêng | Xây ứng dụng luồng công việc cho cùng P2P: dữ liệu, trạng thái, kiểm tra, phê duyệt, quyền, lịch sử, báo cáo và tích hợp cần thiết | Prototype PR là sản phẩm vận hành; code hiện có làm chi phí bằng 0 | Cần kiến trúc, đội phát triển/vận hành, dữ liệu chuẩn, kiểm thử, đào tạo. Toàn P2P chưa được xây và xác minh (N5–N8; SL-B) |
| C — ERP phù hợp | Dùng phân hệ cho phạm vi P2P; phân biệt quy trình chuẩn, cấu hình, mở rộng, tích hợp và thay đổi cách làm việc | Thay toàn bộ ERP/kế toán; mọi kiểm soát có sẵn; mọi ERP giống nhau | Cần xác minh mức phù hợp sản phẩm, module/edition/giấy phép, quyền, dữ liệu và kết nối kế toán. Odoo chỉ là tham chiếu tài liệu (E1–E6; SL-C) |

A không bị loại vì tên phương án. Nếu sau xác minh chỉ đủ làm bước chuyển tiếp, phải công bố L2 còn thiếu và điều kiện chuyển tiếp, không coi kiểm soát thủ công đã đạt yêu cầu tự động. Chưa kết luận A chỉ dùng được tạm thời.

## 4. Tám tiêu chí từ khung 2A

Các nhận xét dưới đây là đối chiếu thiết kế/khả năng, không phải kết quả test mới. “Cần xây” không xác nhận xây thành công; “cần cấu hình” không xác nhận có thể cấu hình đầy đủ.

| Tiêu chí và câu hỏi | Nguồn nội bộ | A | B | C | Bằng chứng cần bổ sung/cách đánh giá |
| --- | --- | --- | --- | --- | --- |
| 1. Quy trình/kiểm soát: ai được chuyển bước, khi nào bị chặn? | BRQ-02–05/08/10; FR-01–13; G1-D01–03 | **Một phần/điều kiện L1:** checklist và kiểm tra bàn giao; **chưa xác minh L2** khả năng chặn của công cụ thực có (SL-A) | **Một phần:** KT minh họa PR; cần xây kiểm tra phía máy chủ, PO, đối chiếu và đề nghị thanh toán; vận hành **chưa xác minh** (N7; SL-B) | **Một phần TL:** E2 có quy tắc duyệt; E1 chưa chứng minh chặn theo G1-D01. PR/ngân sách và tuyến đúng vai **chưa xác minh** | Đối chiếu từng tình huống mục 6, kiểm tra cả đường hợp lệ và thử vượt kiểm soát; cần policy OD-01–05/08 |
| 2. Dữ liệu/liên kết/tái sử dụng: dữ liệu nào nhập mới, dữ liệu nào dùng lại? | BRQ-01/06/07/11; FR-04/08/09/14/16; NFR-03; OBJ-02/03 | **Một phần L1:** mã chung/copy dữ liệu có thể giảm tìm kiếm nhưng vẫn có bản sao; toàn vẹn hệ thống **chưa xác minh** (SL-A) | **Điều kiện:** mô hình liên kết và tái sử dụng có thể được xây; prototype không có liên chứng từ (N7; SL-B) | **Một phần TL:** E5 mô tả lấy dữ liệu PO vào hóa đơn; E6 có phân tích PO. Liên kết PR và bộ báo cáo NovaRetail **chưa xác minh** | Lần theo hồ sơ nguồn, đối chiếu trường và điểm nhập lại; dữ liệu thực nhận/hóa đơn mới không tính là nhập lặp. Cần chất lượng và bội số chứng từ |
| 3. Quyền/truy vết: hạn chế xem/làm và xác định ai làm gì khi nào được không? | BRQ-09; FR-15; NFR-01/02; BR-26/27; OBJ-05 | **Điều kiện:** quyền tệp và hồ sơ quyết định hỗ trợ rà soát; quyền theo hồ sơ và lịch sử đầy đủ **chưa xác minh** (SL-A) | **Một phần KT:** guard/lịch sử demo; không xác thực thật, lưu bền hay audit đầy đủ. Cần xây/kiểm tra NFR (N7) | **Một phần TL:** nhóm/quyền hồ sơ (E3), dấu vết duyệt (E2); không chứng minh toàn bộ sự kiện/ma trận quyền NovaRetail | Ma trận được duyệt, thử truy cập bị cấm và mẫu log; kiểm tra trường giao dịch/người/hành động/thời điểm. OD-07 và danh mục sự kiện chưa chốt |
| 4. Tích hợp: nguồn ngân sách và kế toán trao đổi thế nào? | Scope A-03/04, C-04; FR-02; BRQ-06 | **Điều kiện:** bàn giao tệp/đối soát bằng người; độ mới và lỗi nhập **chưa xác minh** (SL-A) | **Điều kiện:** phải thiết kế giao diện, ánh xạ, kiểm soát lỗi/trùng và quyền dịch vụ (SL-B) | **Một phần TL:** E4 có JSON-2 API; kết nối hệ thống thực có **chưa xác minh**, phụ thuộc gói và dữ liệu | Cần hệ thống/phiên bản, khả năng xuất/nhập/API, chủ dữ liệu, xử lý lỗi. Kiểm tra đồng bộ và dữ liệu lỗi; không giả định tích hợp sẵn |
| 5. Sử dụng/thay đổi: người dùng hiểu và hoàn thành tác vụ được không? | NFR-04; BRQ-07; OBJ-01/03; RTM | **Điều kiện:** biểu mẫu/trách nhiệm thống nhất; vẫn phải duy trì nhiều bước bàn giao (SL-A) | **Một phần KT:** nhãn/lỗi PR quan sát được trong kiểm chứng cũ; người dùng hiểu/toàn P2P **chưa xác minh** (N7) | **Chưa xác minh:** cần đối chiếu thuật ngữ, tác vụ, quyền và cách vận hành ERP với người dùng (SL-C) | Quan sát hoàn thành tác vụ, lỗi, chỗ cần trợ giúp và nhu cầu đào tạo; chưa UAT. Có giao diện không chứng minh dễ dùng |
| 6. Triển khai/phụ thuộc/rủi ro: cần công việc và quyết định nào? | Scope; G1; OD và gaps RTM | **Điều kiện:** cần thống nhất biểu mẫu, thử bàn giao, phân quyền, đào tạo; không suy triển khai tức thì (SL-A) | **Điều kiện:** cần phân tích toàn P2P, phát triển, dữ liệu, tích hợp, kiểm tra và chuyển đổi (SL-B) | **Điều kiện:** cần khảo sát mức phù hợp, module/cấu hình, dữ liệu, phần mở rộng, tích hợp và chuyển đổi (SL-C) | Danh sách công việc/phụ thuộc, người chịu trách nhiệm, bằng chứng thử chuyển đổi; nguồn lực và thời hạn **chưa xác minh** |
| 7. Sở hữu/vận hành: phải duy trì những khoản và vai trò nào? | Scope P2P và giới hạn triển khai; tiêu chí khả thi bổ sung | Cần công quản lý hồ sơ/đối soát, đào tạo, hỗ trợ công cụ (SL-A) | Cần phát triển, hạ tầng, dữ liệu, hỗ trợ, bảo trì và nhân sự vận hành (SL-B) | Cần quyền sử dụng, cấu hình/mở rộng, tích hợp, hỗ trợ và quản trị (SL-C; E4) | **Chưa xác minh** TCO cả ba: cần cùng kỳ tính, phạm vi, điều kiện sử dụng và công vận hành; không xác định rẻ nhất |
| 8. Bảo trì/thay đổi/mở rộng: đổi policy và tăng quy mô ảnh hưởng gì? | OD; BR-18/27; phạm vi giả lập; tiêu chí khả thi bổ sung | **Điều kiện:** đổi biểu mẫu/checklist, thu hồi bản cũ; tải công việc và kiểm soát phiên bản cần xác minh (SL-A) | **Điều kiện:** có thể thiết kế cấu hình; cần người bảo trì, kiểm tra hồi quy và quản trị phiên bản (SL-B) | **Một phần TL:** E2 cho cấu hình duyệt; mở rộng riêng tạo phụ thuộc nâng cấp cần đánh giá (SL-C) | Thử phân tích một thay đổi policy; cần lộ trình, tải dữ liệu/người dùng, quyền sở hữu cấu hình/code và khả năng xuất dữ liệu. Chưa đo hiệu năng |

Tiêu chí 6–8 là phân tích tính khả thi bổ sung, không phải FR/NFR hoặc ngưỡng lựa chọn mới được duyệt. Không cộng lặp chi phí tích hợp/bảo trì giữa các tiêu chí.

## 5. Cơ chế tác động tới mục tiêu

Nguồn N2/N3 xác định mọi đích là giả định. Bảng mô tả cơ chế có thể tác động; chưa phương án nào chứng minh mức cải thiện vận hành.

| Mục tiêu | A — SL-A | B — SL-B | C — TL và SL-C | Điều kiện đo còn thiếu |
| --- | --- | --- | --- | --- |
| OBJ-01: chu kỳ duyệt PO | Trách nhiệm và hàng chờ chung có thể giảm hỏi lại/chuyển nhầm; chờ người vẫn còn | Chuyển đúng vai/hàng chờ có thể giảm bàn giao; không thay việc người duyệt có thời gian | Quy tắc duyệt có thể hỗ trợ chuyển xử lý (E2); mức phù hợp tuyến chưa rõ | Mốc gửi–duyệt cuối, lịch làm việc, vòng trả lại và hồ sơ chưa kết thúc; Days to Confirm (E6) không mặc nhiên là chỉ số này |
| OBJ-02: giảm nhập lại | Mã chung và nguồn chuẩn giảm sao chép sai, nhưng chưa tự tái sử dụng | Dữ liệu liên kết có thể tự lấy lại thông tin nguồn; phải xây/kiểm tra | PO điền dữ liệu hóa đơn hỗ trợ một phần (E5); PR→PO chưa xác minh | Đơn vị dữ liệu và điểm ghi nhận/nhập lại; không giới hạn mọi P2P chỉ một lần nhập |
| OBJ-03: trạng thái và tập trung | Sổ chung có thể tăng khả năng tìm trạng thái nếu cập nhật đúng | Trạng thái phát sinh từ giao dịch có thể giảm độ trễ cập nhật | Quy trình chung có thể giảm hồ sơ rời; bao phủ toàn chuỗi chưa xác minh | Tập hồ sơ, kỳ, quyền xem, mức bao phủ; trạng thái PR/PO và tỷ lệ tập trung là hai chỉ số |
| OBJ-04: ngân sách và đối chiếu | Checklist giúp áp dụng nhất quán; đối chiếu bằng người không tương đương xử lý tự động | Kiểm tra/chặn và đối chiếu có thể được xây; cần nguồn ngân sách và policy | Có matching được mô tả nhưng kiểm soát đề nghị thanh toán còn thiếu căn cứ (E1/E5) | Mẫu số, đếm kiểm tra lại và hóa đơn đủ điều kiện; tỷ lệ tự động không phải tỷ lệ đối chiếu đạt |
| OBJ-05: truy vết | Lưu quyết định tập trung có thể giảm mất dấu; cần kiểm tra tính đầy đủ | Ghi sự kiện giao dịch có thể tăng bao phủ; demo chưa đủ NFR-02 | Dấu vết duyệt được mô tả (E2), chưa đủ mọi sự kiện trọng yếu | Danh mục sự kiện, trường bắt buộc, kỳ/mẫu số; không tự đặt thời hạn lưu |

Ba metric PR hiện có chỉ đo hàng chờ, tuổi chờ theo vòng và tỷ lệ từng trả lại. Chúng không thay chỉ số PO của OBJ-01 hoặc chứng minh đã đạt OBJ-02/04 (N8).

## 6. Đối chiếu cùng tình huống

Mỗi ô theo thứ tự **ai xử lý → công cụ/cơ chế → kiểm soát → bằng chứng/trạng thái → rủi ro còn lại**. A/B/C là thiết kế so sánh; các bước đề xuất không phải quy trình đã triển khai. Tham chiếu AC là yêu cầu/kịch bản có sẵn, không phải test vừa chạy.

| Tình huống và nguồn | A | B | C — đối chiếu Odoo tham chiếu |
| --- | --- | --- | --- |
| PR thiếu thông tin/ngân sách không đạt; BR-01–03, FR-01/02, AC-01–03 | Người yêu cầu và đầu mối kiểm tra → mẫu/checklist và bằng chứng ngân sách → không bàn giao khi chưa đạt → **điều kiện L1, SL-A** → người vẫn có thể gửi email bỏ bước; L2 chưa xác minh | Người yêu cầu → validation và dịch vụ ngân sách cần xây → chặn chuyển xem xét → **một phần KT N7, PR-CHK-02/03; SL-B** → KT dùng ngân sách định trước, chưa kiểm tra nguồn thật | Người yêu cầu/đầu mối ngân sách → phải xác định PR và cơ chế kiểm tra → yêu cầu chặn trước xem xét → **chưa xác minh**, E1–E6 không đủ → không dùng duyệt PO thay kiểm tra ngân sách PR |
| PR trả lại, sửa/gửi lại; G1-D03, AC-06/34 | Quản lý ghi lý do; Người yêu cầu sửa → mẫu có phiên bản/sổ vòng → kiểm tra lại thông tin/ngân sách trước bàn giao → **điều kiện SL-A** → bỏ sót lý do, nhầm bản | Quản lý/Người yêu cầu → trạng thái và kiểm tra lại cần triển khai → chỉ gửi lại hợp lệ mới mở vòng → **một phần KT N7, PR-CHK-06/07** → mới phạm vi PR/SIM, lưu phiên | Quản lý/Người yêu cầu → cần ánh xạ Return riêng → bắt lý do, cho sửa/gửi lại và kiểm tra lại → **chưa xác minh** → E2 mô tả reject không chứng minh Return theo baseline |
| PR từ chối; G1-D03/05, AC-05 | Quản lý → ghi quyết định, khóa xử lý theo trách nhiệm → không chuyển Mua hàng/gửi lại cùng PR → **điều kiện SL-A** → bản sao/tái sử dụng mã có thể vượt kiểm soát | Quản lý → trạng thái kết thúc và guard cần xây phía máy chủ → chặn mở lại/gửi lại → **một phần KT N7, PR-CHK-08/09** → chưa chứng minh quyền sản xuất | Quản lý → cần thiết kế trạng thái PR và giới hạn hành động → dừng cùng PR → **chưa xác minh** → cơ chế thu hồi quyết định E2 cần đối chiếu, không áp mặc định cho PR |
| PO mua hàng bắt buộc, Tài chính bổ sung có điều kiện; G1-D02, AC-27/28 | Trưởng Mua hàng/Tài chính duyệt; Nhân viên Mua hàng phát hành → hồ sơ duyệt/checklist → đủ mọi duyệt mới gửi → **điều kiện SL-A** → phát hành tay khi thiếu duyệt | Các vai trên → bộ định tuyến và guard phát hành cần xây → Mua hàng luôn duyệt; Tài chính theo policy → **chưa xác minh, SL-B** → lỗi tuyến/quyền nếu OD-01/02 chưa rõ | Các vai trên → đánh giá bước duyệt có điều kiện E2 → phải bảo toàn duyệt Mua hàng và chặn phát hành → **một phần TL**, chưa cấu hình → quyền bước cao/thu hồi quyết định có thể khác baseline; không gán ngưỡng |
| Hóa đơn thiếu dữ liệu đối chiếu; BR-16/19, AC-29/36 | AP phối hợp Kho/Mua hàng → giữ hóa đơn và tham chiếu PO trong sổ chờ → phân biệt thiếu dữ liệu với sai lệch, chưa lập/gửi đề nghị → **điều kiện SL-A** → nhầm hồ sơ chờ thành đạt | AP → lưu hóa đơn/liên kết và xác định dữ liệu thiếu cần xây → chặn cả chuẩn bị/gửi → **chưa xác minh, SL-B** → thiếu kiểm tra cập nhật hoặc liên kết nguồn | AP → E5 mô tả tạo hóa đơn trực tiếp và liên kết PO; cần trạng thái chờ riêng → chặn đề nghị theo G1-D01 → **một phần TL về ghi nhận; chưa xác minh kiểm soát** → không dùng điều kiện tạo bill theo hàng nhận thay AC-29 |
| Đối chiếu không đạt, chỉnh sửa/đối chiếu lại; G1-D01, AC-14/15/35 | AP điều phối Mua hàng/Kho → bảng đối chiếu, hồ sơ ngoại lệ và lần đối chiếu lại → chỉ kết quả mới đạt mới xác nhận xử lý → **điều kiện SL-A** → đánh dấu đóng tay/sử dụng kết quả cũ | AP và bên liên quan → matching, ngoại lệ có người phụ trách, lưu kết quả hiện hành cần xây → đối chiếu lại đạt mới cấp điều kiện → **chưa xác minh, SL-B** → tranh chấp dữ liệu/ghi đồng thời cần thiết kế | AP → xem dấu hiệu sai lệch E1, cần bổ sung luồng ngoại lệ/đối chiếu lại → đòi hỏi kết quả hiện hành → **một phần TL; chưa xác minh G1-D01** → cờ có thể sửa tay, không thay kiểm tra độc lập |
| Chuẩn bị/gửi và kết thúc phê duyệt đề nghị; BR-22–24, AC-16–18/30/37 | AP lập/gửi; Trưởng Tài chính duyệt/trả → bộ hồ sơ và kiểm tra hai thời điểm → chỉ xử lý nếu đối chiếu hiện hành đạt, dừng ở duyệt → **điều kiện SL-A** → thay dữ liệu sau kiểm tra, nhầm duyệt với đã trả tiền | AP/Tài chính → đối tượng đề nghị, kiểm tra hai lần và luồng duyệt cần xây → không cho trạng thái ngoại lệ tự cấp điều kiện → **chưa xác minh, SL-B** → toàn bộ ngoài demo PR | AP/Tài chính → cần xác định đối tượng đề nghị và quy tắc chặn → giữ điểm kết thúc baseline → **chưa xác minh** → các thao tác đăng ký thanh toán trong E1/E5 không phải bằng chứng cho luồng đề nghị này |

Chỉnh sửa ngoại lệ không cho phép sửa trực tiếp PO đã duyệt/phát hành hoặc GR đã ghi nhận. Cơ chế sửa/đảo các chứng từ đó chưa chốt. Chỉ ghi số lượng thực nhận; không suy từ ví dụ ERP ra chính sách nhận/đối chiếu/thanh toán một phần của NovaRetail (N4/N5).

## 7. ERP tham chiếu và giới hạn nghiên cứu

**Odoo, nhánh tài liệu 19.0**, được dùng vì nguồn chính thức công khai có mô tả hóa đơn/PO, matching, duyệt, quyền, API và báo cáo. Không xác nhận edition hay gói triển khai; đặc biệt không giả định Community có Studio hoặc mọi chức năng được nêu. Đây không phải lựa chọn ERP cho NovaRetail và không đại diện mọi ERP.

Đã mở, đọc nội dung RST trong kho chính thức `odoo/documentation`, không chỉ dùng snippet. Các trang HTML trên odoo.com bị timeout khi truy cập; dùng nguồn RST tương ứng ở nhánh 19.0. Nhánh có thể thay đổi theo thời gian, không phải snapshot commit cố định; phạm vi nguồn/ngày truy cập ghi dưới đây.

Các điểm đọc được (TL):

- E1: matching có cờ Should Be Paid; sửa bill có thể sinh Exception mà không chặn thay đổi, cờ có thể chỉnh tay. **Không đáp ứng có bằng chứng đối với việc coi riêng cờ này là khóa không thể sửa tay**; chưa kết luận toàn bộ Odoo không thể đáp ứng FR-12. Cần xác minh hoặc bổ sung kiểm tra độc lập tại chuẩn bị/gửi.
- E2: Studio mô tả điều kiện/bước duyệt, thứ tự và dấu vết; cũng có thu hồi quyết định. Đây là năng lực cấu hình cần đối chiếu G1-D02/03, không phải tuyến NovaRetail đã đạt.
- E3/E4: có cơ chế quyền và API được mô tả; ma trận quyền, luồng tích hợp thực tế và điều kiện gói còn cần xác minh.
- E5/E6: có tái sử dụng dữ liệu PO và báo cáo mua hàng; chưa xác minh chuỗi PR, điều kiện nhà cung cấp FR-05, mọi liên kết NFR-03 hoặc đủ báo cáo FR-16.

Phần lớn công việc C phải phân loại thêm: dùng chuẩn cho năng lực đã phù hợp; cấu hình cho tuyến/quyền có thể cấu hình; mở rộng cho khoảng thiếu đã xác minh; tích hợp cho ngân sách/kế toán giữ lại; thay đổi vận hành cho dữ liệu/trách nhiệm/đào tạo. Chưa đủ căn cứ gán mọi khoảng thiếu vào cấu hình hoặc khẳng định bắt buộc viết module.

Dừng nghiên cứu tại sáu nguồn đủ làm rõ khả năng và khoảng thiếu trọng yếu. Không mở khảo sát ERP khác, add-on bên thứ ba, giá, triển khai hoặc lab.

## 8. Bằng chứng và giả định

Ngày đọc/truy cập: **20/10/2026, Asia/Saigon**. N1–N8 cùng phiên bản HEAD mục 1; ngày đọc không phải ngày chạy kiểm tra cũ. Mã trong bảng trên trỏ về các nguồn dưới đây.

| Mã | Tuyên bố được hỗ trợ và nguồn | Phiên bản/ngày | Loại và giới hạn |
| --- | --- | --- | --- |
| N1 | Doanh nghiệp giả lập, phạm vi phân tích/demo và chưa lựa chọn ERP: [README](../README.md), [case study](../case-study.md), [business context](../01-business-context/README.md) | HEAD mục 1; 20/10/2026 | TL nội bộ; không chứng minh hiện trạng doanh nghiệp thật |
| N2 | Định nghĩa OBJ, phạm vi, giả định hệ thống giữ lại: [objectives](../01-business-context/project-objectives.md), [scope](../01-business-context/scope.md) | HEAD mục 1; 20/10/2026 | TL nội bộ; đích và khối lượng giả lập, phép đo còn mở |
| N3 | BRQ, ưu tiên nghiệp vụ và quan hệ mục tiêu: [BRD](../05-brd/business-requirements-document.md), [catalog](../05-brd/requirements-catalog.md) | HEAD mục 1; 20/10/2026 | TL nội bộ; chưa sign-off thực tế; ưu tiên không phải trọng số phương án |
| N4 | Điều kiện chuyển bước và sáu quyết định: [business rules](../04-to-be-design/business-rules.md), [baseline decisions](../08-traceability/baseline-decisions.md) | HEAD mục 1; 20/10/2026 | TL nội bộ; chốt cho case study, không chốt OD |
| N5 | FR/NFR/AC và coverage gaps: [SRS](../07-software-requirements/srs.md), [RTM — quyết định mở](../08-traceability/requirements-traceability-matrix.md#quyết-định-còn-mở) | HEAD mục 1; 20/10/2026 | TL yêu cầu; coverage là tiêu chí đã xác định, không phải test đạt |
| N6 | Ranh giới hai vai, ngân sách, trạng thái, đồng hồ demo: [SIM](../06-system-analysis/pr-prototype-decisions.md) | HEAD mục 1; 20/10/2026 | TL nội bộ; không áp cho doanh nghiệp |
| N7 | Hành vi PR và giới hạn đã kiểm chứng: [README prototype](../prototype/pr/README.md), [verification](../prototype/pr/verification.md) | Tệp tại HEAD mục 1; verification ghi HEAD `42f6c57fddce68b6e096ef46ce40e95f529dd732`, kiểm tra 16/10/2026; đọc 20/10/2026 | KT đã ghi nhận; không chạy lại, không UAT/bảo mật/audit đầy đủ hoặc toàn P2P |
| N8 | Ba metric PR không thay mục tiêu PO/nhập lại/đối chiếu: [metric — nguồn và ranh giới](../08-traceability/pr-metrics-design.md#nguồn-và-ranh-giới) | HEAD mục 1; 20/10/2026 | TL thiết kế; không lợi ích vận hành |
| E1 | Cờ matching, Exception và khả năng sửa tay: [Control policies](https://raw.githubusercontent.com/odoo/documentation/19.0/content/applications/inventory_and_mrp/purchase/manage_deals/control_bills.rst), phần Pay vendor bills with 3-way matching | Nhánh 19.0; 20/10/2026 | TL nhà cung cấp; không phải kiểm tra khóa FR-12; edition/môi trường chưa xác minh |
| E2 | Bước duyệt theo điều kiện/thứ tự, thu hồi, dấu vết: [Approval rules](https://raw.githubusercontent.com/odoo/documentation/19.0/content/applications/studio/approval_rules.rst), Configuration/Use | Nhánh 19.0, Studio; 20/10/2026 | TL nhà cung cấp; không chứng minh PR/PO NovaRetail hoặc giấy phép Studio |
| E3 | Quyền nhóm và record rules: [Access rights](https://raw.githubusercontent.com/odoo/documentation/19.0/content/applications/general/users/access_rights.rst), Manage roles/Create and modify groups | Nhánh 19.0; 20/10/2026 | TL nhà cung cấp; chưa cấu hình/thử ma trận OD-07, không chứng nhận bảo mật |
| E4 | JSON-2 API và điều kiện gói: [External JSON-2 API](https://raw.githubusercontent.com/odoo/documentation/19.0/content/developer/reference/external_api.rst), phần đầu/Access Rights/Transaction | Nhánh 19.0; 20/10/2026 | TL nhà cung cấp; tài liệu ghi external API thuộc Custom, không One App Free/Standard; không coi là xác nhận mọi mô hình triển khai hoặc tích hợp sẵn |
| E5 | Hóa đơn trực tiếp, tham chiếu/tự điền PO: [Manage vendor bills](https://raw.githubusercontent.com/odoo/documentation/19.0/content/applications/inventory_and_mrp/purchase/manage_deals/manage.rst), Manage vendor bills in Accounting | Nhánh 19.0; 20/10/2026 | TL nhà cung cấp; việc tạo không cần PO cho thấy phải kiểm tra ràng buộc PO; không xác nhận FR-09/NFR-03 đạt |
| E6 | Báo cáo PO, lượng đặt/nhận, Days to Confirm: [Purchase Analysis report](https://raw.githubusercontent.com/odoo/documentation/19.0/content/applications/inventory_and_mrp/purchase/advanced/analyze.rst), Measures | Nhánh 19.0; 20/10/2026 | TL nhà cung cấp; không tự đồng nhất với metric OBJ-01 hoặc bộ báo cáo FR-16 |
| SL-A | Thiết kế chuẩn hóa với công cụ hiện có, checklist/sổ theo dõi | Phân tích 2B, 20/10/2026; căn cứ N1–N5 | SL; chưa có biểu mẫu/quyền/quy trình vận hành đã kiểm chứng |
| SL-B | Công việc cần làm để xây workflow đủ P2P | Phân tích 2B, 20/10/2026; căn cứ N3–N7 | SL; khả năng thiết kế không phải bằng chứng triển khai thành công |
| SL-C | Công việc áp dụng ERP trong phạm vi và rủi ro cấu hình/mở rộng | Phân tích 2B, 20/10/2026; căn cứ N2–N5, E1–E6 | SL; không đại diện mọi ERP hoặc trải nghiệm triển khai thực tế |

## 9. Công việc, chi phí và rủi ro riêng từng hướng

Chỉ xác định nhóm cần khảo sát; không gán số tiền, số người, thời gian hoặc ROI. TCO là tổng chi phí sở hữu trong cùng kỳ và phạm vi; chưa có căn cứ tính hoặc kết luận phương án rẻ nhất.

| Hướng | Nhóm công việc/chi phí và nguồn lực | Nguyên nhân → ảnh hưởng → giảm thiểu dự kiến |
| --- | --- | --- |
| A | Rà quyền sử dụng công cụ hiện có; thiết kế biểu mẫu/sổ; chuẩn hóa dữ liệu; bàn giao kế toán; kiểm tra, đào tạo; lưu trữ/hỗ trợ và công đối soát định kỳ | Bản sao tệp và cập nhật bằng người → lệch trạng thái/thiếu duyệt → một nguồn hồ sơ được quản lý, quy tắc phiên bản, đối soát và phân trách nhiệm; hiệu lực cần kiểm chứng. Khối lượng tăng có thể tăng công kiểm tra, chưa đo được |
| B | Phân tích/thiết kế toàn P2P; phát triển; dữ liệu/tích hợp; kiểm tra quyền và kiểm soát; đào tạo/chuyển đổi; hạ tầng, sao lưu, hỗ trợ và bảo trì | Khoảng cách demo–vận hành, phụ thuộc đội phát triển → thiếu kiểm soát hoặc chậm sửa lỗi → phân rã baseline, kiểm tra kịch bản phía máy chủ và bàn giao vận hành. Thiếu người bảo trì → rủi ro gián đoạn → xác định chủ sở hữu và năng lực hỗ trợ trước vận hành |
| C | Xác minh module/edition/quyền sử dụng; phân tích mức phù hợp; cấu hình/mở rộng; dữ liệu/tích hợp kế toán; kiểm tra/đào tạo/chuyển đổi; hạ tầng/hỗ trợ/nâng cấp | Quy trình chuẩn/cờ khác policy NovaRetail → tưởng đã chặn nhưng còn đường vượt → kiểm tra từng điều kiện và đường truy cập. Tùy chỉnh sâu → phụ thuộc nâng cấp → tách cấu hình/phần mở rộng, đánh giá hồi quy và hỗ trợ; không đổi policy chỉ để khớp ERP |

Các giảm thiểu là đề xuất phân tích SL-A/B/C, chưa thực hiện hoặc xác nhận hiệu quả. Không suy công cụ hiện có đã trả tiền thì không còn chi phí; không suy phí sử dụng ERP là toàn bộ TCO.

## 10. Kiểm tra tài liệu tại cuối 2B

Kiểm tra bằng script PowerShell: đích của 15 liên kết nội bộ và 2 anchor tồn tại; số cột nhất quán trong từng bảng; code fence cân bằng; không có khoảng trắng cuối dòng. Đối chiếu SHA-256 của 15 nguồn với snapshot đầu lượt không phát hiện thay đổi. Không chạy test/build hoặc kiểm tra hệ thống nghiệp vụ mới.

`git diff --check` kiểm tra phần được theo dõi; file mới được kiểm tra riêng bằng `git diff --no-index --check` so với tệp rỗng ngoài repo. Với `--no-index`, mã 1 có thể phản ánh hai tệp khác nhau; phải đọc chẩn đoán khoảng trắng, không suy từ mã 1 thành lỗi tài liệu. Index giữ rỗng; chỉ có file này mới trong Git status.

## 11. Điểm dừng và đầu vào tại cuối 2B

Phần này ghi trạng thái lịch sử khi kết thúc 2B. Các câu hỏi bên dưới đã được chủ dự án cung cấp đầu vào để tiến hành 2C tại mục 12; những thông tin chưa có vẫn giữ là khoảng thiếu.

**Đánh đổi đã làm rõ:** A có thể tăng tính nhất quán ở lớp nghiệp vụ nhưng phụ thuộc người và chưa chứng minh lớp chặn hệ thống; B cho phép thiết kế theo baseline nhưng phải xây và duy trì phần lớn phạm vi; C có năng lực tài liệu để tái sử dụng nhưng cần kiểm tra khoảng cách quy trình, điều kiện gói, cấu hình/mở rộng và kết nối kế toán. Đây là khác biệt thiết kế/phụ thuộc, không phải thứ hạng.

**Chưa đủ bằng chứng:** phương án phù hợp nhất, rẻ nhất, nhanh nhất; đạt mục tiêu định lượng; toàn bộ quyền/bảo mật/audit, kiểm soát ngân sách và đề nghị thanh toán; hiệu quả vận hành hoặc trải nghiệm người dùng. Prototype chỉ chứng minh một phần hành vi PR trong SIM. Không có test mới hoặc quan sát ERP mới.

| Thông tin thiếu có thể thay đổi lựa chọn | Cách xử lý trước 2C |
| --- | --- |
| Thứ tự ưu tiên mục tiêu, mức chấp nhận công việc thủ công và kiểm soát hệ thống cần giữ | Thiếu vẫn so sánh định tính; chưa đủ để cân nhắc đánh đổi/kiến nghị. Chủ dự án cần xác nhận giả định case study, không tự thay baseline |
| Nguồn lực, ngân sách, thời gian, kỳ TCO, năng lực vận hành | Chưa kết luận khả thi hoặc chi phí tương đối. Không tự tạo số để hoàn thành bảng |
| Công cụ/kế toán/ngân sách phải giữ, giao diện, chủ dữ liệu, chất lượng/khối lượng dữ liệu và tải đồng thời | Cần dữ kiện hoặc giả định case study được chủ dự án chấp thuận; số liệu tổng hợp trong bối cảnh không chứng minh tải vận hành thực |
| OD-01–08 và gaps RTM | Có thể giữ điều kiện để so sánh; phải xác nhận policy liên quan trước kết luận đáp ứng kiểm soát cụ thể; không đóng OD trong tài liệu này |
| Module/edition/giấy phép/hosting ERP và bằng chứng cấu hình | Cần nghiên cứu chính thức tiếp khi có câu hỏi ảnh hưởng lựa chọn; nếu cần lab/quan sát phải giao việc riêng. Không tự mở trial hoặc khảo sát mọi ERP |

Tối đa ba câu cần chủ dự án xác nhận trước 2C:

1. Trong OBJ-01–05, ưu tiên nghiệp vụ nào dẫn dắt đánh đổi, và những kiểm soát hệ thống nào phải giữ khi cân nhắc cách làm thủ công?
2. Những công cụ, phần mềm kế toán và nguồn ngân sách nào giả định phải giữ; nguồn lực, giới hạn triển khai và kỳ tính chi phí nào được phép dùng cho case study?
3. 2C sẽ chỉ kết luận có điều kiện trên bằng chứng hiện có, hay cần bổ sung xác minh nào về Odoo/module/edition và các policy còn mở trước khi kiến nghị?

Dừng ở tài liệu 2B trong working tree để review. Chưa chấm điểm, lựa chọn phương án, thực hiện 2C hoặc thay đổi nội dung portfolio đã công bố.

## 12. Đầu vào và rà soát cho 2C

**C0 — đầu vào chủ dự án duyệt trong brief 2C, ngày 20/10/2026:** OBJ-04 dẫn dắt; OBJ-03 và OBJ-05 hỗ trợ; không đặt trọng số, không bỏ OBJ-01/02 hoặc thay target. Giữ G1-D01–06, giả định kế toán hiện có tiếp tục vận hành; chưa biết sản phẩm/API kế toán và nguồn ngân sách. Chưa đặt ngân sách triển khai, số người, thời hạn hoặc kỳ TCO. Odoo 19.0 chỉ tham chiếu tài liệu, edition/gói và khả năng thực tế chưa xác minh. Đây là đầu vào phân tích case study, không phải xác nhận doanh nghiệp thật và không đóng OD.

Đầu lượt 2C: branch `solution-evaluation`, HEAD như mục 1; chỉ file này chưa được theo dõi, index rỗng. Đã sao lưu file này, case-study.md, README.md và snapshot SHA-256 của 127 file hiện có tại `C:\Users\ASUS\AppData\Local\Temp\p2p-2c-1635668ed47041aea5e0d32534248e64`, đọc lại được trước sửa.

Đã đọc toàn văn 2B và đối chiếu N4/N5/N7; mở lại nguồn chính thức E1/E2 ngày 20/10/2026. Không phát hiện nhận xét 2B cần sửa về nội dung. Giữ giới hạn: khả năng có thể xây của B chưa được kiểm chứng; TL của C chưa phải cấu hình đạt; KT của prototype không chứng minh toàn P2P. Cờ matching hoặc bước duyệt trong E1/E2 không tự chứng minh G1-D01–03. Vendor Bill, Register Payment và Paid không tương đương đối tượng/luồng Đề nghị thanh toán của NovaRetail. Không suy kết luận Odoo sang mọi ERP.

Các mã N/E tại mục 8 giữ nguồn của phân tích 2B. C0 bổ sung ưu tiên cho 2C; nhận định/kiến nghị dưới đây là suy luận phân tích từ C0 và các nguồn đã nêu, không phải kết quả vận hành mới.

## 13. Kiến nghị có điều kiện

**K1 — Dùng chuẩn hóa công cụ hiện có làm bước chuẩn bị/chuyển tiếp có giới hạn.** Căn cứ C0, N2–N5 và SL-A: trách nhiệm, mã liên kết, hồ sơ quyết định và sổ trạng thái hỗ trợ OBJ-03/05, tạo đầu vào cho kiểm soát OBJ-04. Đánh đổi là tiếp tục phụ thuộc người; chưa chứng minh hệ thống tự chặn. Chỉ áp dụng khi có chủ quy trình, nơi lưu bản chuẩn, người kiểm tra bàn giao và ghi rõ khoảng thiếu; chưa coi đây là phương án cuối đáp ứng baseline hệ thống. Rủi ro còn lại là bỏ bước, nhầm bản hoặc dùng kết quả đối chiếu cũ. Cần bổ sung mẫu hồ sơ xuyên chuỗi, bằng chứng kiểm tra bàn giao/quyền và đánh giá công cụ thực có. Nếu chỉ có kiểm soát thủ công, không xác nhận FR-02/07/12 đạt hoặc dùng chuyển tiếp để miễn kiểm soát bắt buộc.

**K2 — Đi tiếp bằng xác minh kiểm soát trọng yếu cho B và C, trước khi chọn hướng triển khai.** Căn cứ OBJ-04 dẫn dắt, G1-D01–03, N5/N7 và E1/E2: chưa hướng nào có bằng chứng vận hành đủ về ngân sách, tuyến PO và chặn đề nghị thanh toán. Đánh đổi là cần làm rõ thiết kế và môi trường trước khi mở rộng chức năng. B cần thiết kế cơ chế thực thi và năng lực duy trì; C cần ánh xạ chuẩn/cấu hình/mở rộng vào đúng baseline. Chỉ chuyển sang thử nghiệm nhỏ khi có policy liên quan được duyệt cho phép thử, môi trường hợp pháp và người phụ trách; trước đó thực hiện đối chiếu thiết kế/hồ sơ giao diện như mục 16. Rủi ro còn lại là nhầm khả năng mô tả với khả năng thực thi. Bằng chứng cần bổ sung: ánh xạ kiểm soát, đường vượt có thể xảy ra, phần phải xây/cấu hình và kết quả kịch bản có phiên bản. Không mở hai dự án triển khai hoặc chọn C chỉ vì đã đọc tài liệu Odoo.

**K3 — Chỉ cam kết một hướng khi có bằng chứng kiểm soát và phương án duy trì khả thi.** Căn cứ C0, N4/N5 và bảng mục 14: với ưu tiên OBJ-04, ưu điểm giao diện, báo cáo hoặc tái sử dụng không bù được khoảng thiếu kiểm soát trọng yếu. Chọn hướng C chỉ có điều kiện khi cấu hình/phần bổ sung được xác minh đáp ứng baseline, kết nối kế toán/ngân sách khả thi và có năng lực vận hành. Chọn hướng B chỉ có điều kiện khi thiết kế/phép thử chứng minh cùng kiểm soát và có nguồn lực phát triển, hỗ trợ, bảo trì. Đánh đổi là C có thể phát sinh cấu hình/mở rộng và phụ thuộc nâng cấp, B phải sở hữu công việc xây/duy trì. Rủi ro còn lại gồm dữ liệu, tích hợp, quyền và chi phí chưa xác định. Trước cam kết cần bằng chứng mục 14, phạm vi công việc/chi phí cùng kỳ tính được duyệt và đánh giá tác động OBJ-01/02. Hiện chưa đủ căn cứ chọn một giải pháp cuối cùng; bước tiếp cụ thể là phạm vi xác minh ở mục 16.

## 14. Điều kiện quyết định

| Điều kiện | Bằng chứng hiện có | Phần cần xác minh | Ảnh hưởng tới lựa chọn | Bước xử lý tiếp |
| --- | --- | --- | --- | --- |
| PR chỉ chuyển xem xét sau thông tin/ngân sách đạt; Return/Reject riêng | N4/N5 quy định; N7 chỉ kiểm tra PR/SIM | Nguồn ngân sách, kiểm tra lại khi gửi lại, chặn mở lại PR từ chối | B/C chưa được xác nhận đạt; A thủ công không thay yêu cầu hệ thống | Xác định nguồn/policy OD-03 và ánh xạ FR-01–03, AC-01–06/34 |
| PO có Mua hàng bắt buộc, Tài chính bổ sung theo policy; đủ duyệt mới phát hành | G1-D02; E2 chỉ mô tả khả năng duyệt | Tuyến đúng vai, điều kiện OD-01/02, quyền và đường phát hành khác | C cần xác minh cấu hình; B cần cơ chế thực thi; thiếu duyệt không được bù bởi ưu điểm khác | Đối chiếu AC-27/28 và chặn phát hành; ghi phần chuẩn/cấu hình/phải xây |
| Thiếu dữ liệu khác sai lệch; chuẩn bị và gửi đề nghị đều cần đối chiếu hiện hành đạt | G1-D01; AC-14–16/29/30/35/36; E1 chưa đủ chứng minh khóa này | Ngoại lệ/đối chiếu lại, kiểm tra hai thời điểm, dữ liệu thay đổi giữa hai bước, đối tượng đề nghị | Chưa vượt điều kiện triển khai nếu còn khoảng thiếu; không loại cả ERP vì thiếu bằng chứng | Lập chuỗi kịch bản trọng tâm mục 16; làm rõ OD-04/05 liên quan |
| Quyền và lịch sử theo nhu cầu đã chốt | NFR-01/02; N7 giới hạn demo; E2/E3 mô tả năng lực | Ma trận OD-07, sự kiện/trường lịch sử, lưu giữ và hành vi truy cập bị cấm | Thiếu bằng chứng thì B/C chưa đạt điều kiện; quyền tệp A không tự tương đương | Duyệt phạm vi quyền thử và danh mục sự kiện; kiểm tra hồ sơ và log |
| Liên kết chứng từ, trạng thái và dữ liệu tái sử dụng đúng nguồn | NFR-03; RTM còn gaps; E5 hỗ trợ một phần | PR–PO–GR–hóa đơn, PO bắt buộc, nguồn không tồn tại, dữ liệu nhất quán và người xử lý | Quyết định phần phải bổ sung của B/C; đánh giá giới hạn đối soát A | Lập bộ hồ sơ tổng hợp liên kết; kiểm tra AC-26/29/31–33, FR-14/16 |
| Kế toán giữ lại và ngân sách có giao diện khả thi | Scope A-03/04; sản phẩm/API và nguồn ngân sách chưa biết | Chủ dữ liệu, cách trao đổi, lỗi/trùng, độ mới và quyền truy cập | Có thể chặn cam kết cả B/C; không mặc định nhập tay đạt FR-02 hoặc OBJ-02 | Thu thập đặc tả xuất/nhập/API; nếu chưa có, ghi phụ thuộc bị chặn |
| Quy trình chuẩn/cấu hình giữ G1-D01–06 | N4/N5; E1/E2 chưa chứng minh baseline toàn chuỗi | Phân biệt đề nghị với bill/payment; Return/Reject, tuyến duyệt, sửa chứng từ và điểm kết thúc | C chỉ tiếp tục nếu giải pháp khoảng thiếu được xác minh; B cũng phải giữ cùng ranh giới | Ánh xạ từng kiểm soát sang chuẩn/cấu hình/mở rộng/tích hợp; không sửa policy để khớp sản phẩm |
| Có nguồn lực triển khai/vận hành, phạm vi chi phí và trách nhiệm rõ | Mục 9 chỉ liệt kê nhóm công việc; C0 chưa đặt nguồn lực/kỳ TCO | Năng lực cấu hình/phát triển/hỗ trợ, dữ liệu, đào tạo, hạ tầng, bảo trì và điều kiện sử dụng | Chưa cam kết B/C khi chưa có chủ vận hành; chưa kết luận chi phí tương đối | Làm rõ gói công việc và khả năng cung cấp nguồn lực; xin duyệt giả định còn thiếu trước tính khả thi |

“Chưa xác minh” giữ nguyên là khoảng thiếu, không phải thất bại. TL hoặc kế hoạch khắc phục đơn thuần chưa đủ vượt điều kiện triển khai. Các điều kiện trên không đặt trọng số, ngưỡng hay policy mới và không xác nhận toàn bộ SRS/RTM đã được kiểm chứng.

## 15. Khi điều kiện thay đổi

Các hàng là tình huống phân tích, không phải sự thật mới về NovaRetail.

| Tình huống | Kiến nghị thay đổi thế nào | Bằng chứng để xem xét lại |
| --- | --- | --- |
| Chưa có nguồn lực duy trì phần mềm | Chưa cam kết B; C cũng cần chủ cấu hình/hỗ trợ hoặc dịch vụ phù hợp. A chỉ hỗ trợ chuẩn bị trong giới hạn K1 | Trách nhiệm vận hành, hỗ trợ và nguồn lực khả dụng được xác nhận |
| Công cụ hiện có chỉ hỗ trợ kiểm soát thủ công | Giữ A ở vai trò chuyển tiếp; chưa coi đạt baseline tự kiểm tra/chặn. Đưa khoảng thiếu sang xác minh B/C | Kiểm tra khả năng công cụ; bằng chứng cơ chế thực thi nếu có |
| ERP đáp ứng nhiều nhu cầu nhưng thiếu kiểm soát trọng yếu | Chưa triển khai chỉ vì phần lớn tính năng phù hợp; xác minh bổ sung. Nếu không có cách đáp ứng khả thi, chuyển đánh giá sang B | Kết quả kiểm tra phần bổ sung, nguồn lực duy trì và tác động nâng cấp |
| Tích hợp kế toán/ngân sách chưa khả thi | Dừng cam kết phần phụ thuộc của cả B/C; xác định cách trao đổi được duyệt. Không giả định kiểm tra tay tương đương hệ thống | Đặc tả nguồn/giao diện và thử trao đổi có kiểm soát; nếu vẫn thiếu thì giữ trạng thái bị chặn |
| Có năng lực cấu hình/vận hành ERP phù hợp | Có thể tiến xác minh C, không tự chọn C; vẫn phải qua điều kiện kiểm soát | Năng lực thực hiện và bằng chứng cấu hình/kịch bản |
| Chưa có năng lực ERP nhưng có đội phát triển/vận hành phù hợp | Có thể tiến xác minh B; không suy đội phát triển tự đủ năng lực P2P/bảo mật | Thiết kế kiểm soát, phạm vi công việc và phép thử trọng yếu của B |
| Chưa có năng lực cấu hình hoặc phát triển/vận hành | Chưa cam kết B/C; làm rõ phương án cung cấp năng lực trước thử nghiệm | Chủ sở hữu và khả năng hỗ trợ được duyệt; không kéo dài chuyển tiếp bằng cách hạ baseline |

## 16. Phạm vi xác minh tiếp theo đề xuất

Chỉ thực hiện sau khi được giao/duyệt riêng; lượt 2C chưa cài ERP, trial, code hoặc lab.

**Bản đồ đối chiếu thiết kế:** giữ chuỗi PR–PO–GR–hóa đơn–đề nghị để ánh xạ kiểm soát cho thiết kế B và quy trình/cấu hình C, ghi khoảng thiếu và phụ thuộc. Đây là bản đồ toàn chuỗi, không phải phạm vi của phép thử nhỏ đầu tiên. Chỉ đề xuất thử một hướng khi có cơ chế kiểm soát mô tả được, môi trường tiếp cận hợp lệ và người phụ trách; nếu cả hai cùng đủ điều kiện, trình đánh đổi để chủ dự án duyệt hướng thử.

**Câu hỏi của phép thử đầu tiên — G1-D01:** cơ chế được thử có giữ hồ sơ chờ khi thiếu dữ liệu, xử lý ngoại lệ và chỉ cho chuẩn bị/gửi đề nghị khi kết quả đối chiếu hiện hành đạt không? Đối chiếu AC-14–16/29/30/35/36; chưa thử toàn P2P.

**Dữ liệu và môi trường lab giả lập:** dùng bộ PO–GR–hóa đơn liên kết và hồ sơ đề nghị tổng hợp. Ghi hợp đồng dữ liệu thử: định danh/tham chiếu, dữ liệu bắt buộc cho đối chiếu, phiên bản dữ liệu/kết quả, tình trạng thiếu/không đạt/đạt và thông tin cần để truy bằng chứng. Các kết quả mẫu phải được xác lập rõ trong kịch bản; không tự đặt dung sai hoặc policy nghiệp vụ. Giả định chỉ phục vụ lab cần được duyệt cho phạm vi thử, không đóng OD. Với C cần rõ phiên bản/module/edition, điều kiện sử dụng và môi trường cô lập; với B cần phạm vi/môi trường riêng được duyệt, không sửa prototype hiện có. Chỉ thiết lập vai thử và log đủ phục vụ G1-D01, chưa xác nhận toàn bộ quyền/audit.

**Thông tin tích hợp thật:** khi đánh giá triển khai, cần xác định sản phẩm kế toán, nguồn ngân sách, chủ dữ liệu, giao diện xuất/nhập/API, quyền, độ mới và xử lý lỗi/trùng. Đây là đầu vào để xác minh tích hợp vận hành, không phải điều kiện bắt buộc để tiếp tục nghiên cứu hoặc lab G1-D01. Lab có thể dùng dữ liệu tổng hợp và hợp đồng dữ liệu giả lập; không cần có hệ thống kế toán/ngân sách thật. Kết quả lab không chứng minh tích hợp thật đã khả thi.

**Các tình huống của phép thử đầu tiên:**

1. Thiếu dữ liệu đối chiếu bắt buộc, ví dụ chưa có GR: giữ hóa đơn/tham chiếu PO ở trạng thái chờ; phân biệt với sai lệch và chặn cả chuẩn bị lẫn gửi đề nghị.
2. Đủ dữ liệu nhưng đối chiếu không đạt: ngoại lệ mở và hai hành động trên bị chặn.
3. Ghi chỉnh sửa hoặc đổi nhãn “đã xử lý” chưa cấp điều kiện. Đối chiếu lại không đạt thì tiếp tục chặn; đạt mới xác nhận xử lý và đủ điều kiện. Không sửa trực tiếp PO đã duyệt/phát hành hoặc GR đã ghi nhận khi cơ chế chưa chốt.
4. Kiểm tra riêng lúc chuẩn bị và lúc gửi. Dùng phiên bản dữ liệu/kết quả thử để mô phỏng điều kiện thay đổi giữa hai thời điểm: kết quả cũ không cấp điều kiện gửi khi kết quả hiện hành chưa đạt; kết quả hiện hành đạt tại cả hai thời điểm mới cho phép luồng hợp lệ. Không mở rộng sang phê duyệt đề nghị hoặc thực hiện thanh toán.

**Backlog xác minh:** ngân sách và vòng đời PR theo G1-D03; tuyến/phát hành PO theo G1-D02; phê duyệt/trả lại đề nghị và điểm kết thúc; ma trận quyền/audit đầy đủ; toàn vẹn liên kết toàn chuỗi, báo cáo và tích hợp thật. Chỉ dùng chứng từ nguồn làm dữ liệu đầu vào của phép thử G1-D01, không mặc định các chủ đề backlog đã được kiểm tra.

**Đầu ra:** ma trận G1-D01–AC–kịch bản–kết quả–bằng chứng, phiên bản/cấu hình, giả định/hợp đồng dữ liệu thử, hồ sơ nguồn và log chứng minh điều kiện ở từng lần chuẩn bị/gửi; ghi rõ khoảng thiếu và backlog. Không công bố UAT, sẵn sàng sản xuất, tích hợp thật hoặc mức cải thiện OBJ từ phép thử này.

**Tiếp tục:** khi các tình huống G1-D01 có kết quả và bằng chứng truy được, không còn khoảng thiếu trọng yếu chưa xử lý trong phạm vi thử thì trình chọn chủ đề backlog tiếp theo; chưa quyết định triển khai. **Đổi hướng:** nếu có bằng chứng hướng thử không đáp ứng G1-D01 và không có cách bổ sung khả thi, dùng cùng kịch bản để đánh giá hướng còn lại. **Dừng/chờ phần bị ảnh hưởng:** nếu thiếu giả định/hợp đồng dữ liệu thử được duyệt, cách xác lập kết quả mong đợi, môi trường hợp lệ hoặc người phụ trách; không coi thiếu hệ thống thật là thất bại của lab. Giữ nguyên baseline, OD và coverage.

## 17. Kiểm tra và điểm dừng 2C

Chỉ sửa tài liệu này, phần hướng tiếp theo của case-study.md và một liên kết sản phẩm trong README.md. Kiểm tra liên kết tương đối/anchor, bảng, code fence và whitespace; `git diff --check` cho file theo dõi và kiểm tra riêng file này bằng `git diff --no-index --check` so với tệp rỗng ngoài repo. So sánh SHA-256 với snapshot đầu 2C để xác nhận nguồn ngoài phạm vi được bảo toàn. Không chạy test/build.

Hoàn tất 2C trong working tree để review trước khi chốt/công bố Đợt 2. Chưa commit, push, merge, triển khai hoặc thực hiện ERP lab; kiến nghị không phải quyết định mua/triển khai Odoo. Không tạo tổng điểm, ROI, kết quả vận hành, sign-off hoặc UAT.
