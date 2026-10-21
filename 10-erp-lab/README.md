# ERP lab — phân tích mức phù hợp và thiết kế kiểm soát

**Phần ERP hoàn tất ở phạm vi phân tích và thiết kế trong phiên bản portfolio này.** Đã phân tích mức phù hợp của Odoo Community, thiết kế phần bổ sung cho kiểm soát G1-D01 và xây dựng 30 kịch bản kiểm chứng. Chưa triển khai hoặc kiểm chứng trên ERP; cả 30 kịch bản vẫn **Chưa thực hiện**.

Chủ dự án quyết định chốt phạm vi này ngày 21/10/2026 vì tài nguyên local hạn chế và lựa chọn phạm vi portfolio. Không tiếp tục chờ giải phóng RAM hoặc thiết lập môi trường. Triển khai thực tế là hướng mở rộng tùy chọn; số liệu kiểm kê không đủ kết luận máy chắc chắn không chạy được Odoo.

[Thiết kế chi tiết](lab-design.md) · [Đánh giá phương án P2P](../09-solution-evaluation/options-assessment.md) · [Case study](../case-study.md) · [Kiểm chứng prototype PR](../prototype/pr/verification.md)

## Sản phẩm đã hoàn tất và phần chưa thực hiện

| Nội dung | Trạng thái và giới hạn |
| --- | --- |
| Phân tích mức phù hợp Odoo Community 19.0 | Đã đối chiếu tài liệu và source chính thức; ánh xạ phần chuẩn, cấu hình và phần cần mở rộng trong mục 9–12 của thiết kế. Chưa kiểm chứng trên artifact ERP thực chạy. |
| Thiết kế lab Mức A cho G1-D01 | Đã thiết kế hồ sơ kết quả/ngoại lệ, đề nghị riêng, kiểm tra độc lập khi chuẩn bị/gửi, tính hiện hành và xử lý thử lại. Chưa viết addon hoặc thực thi cơ chế này. |
| Dữ liệu và kịch bản dự kiến | Đã đặc tả hợp đồng dữ liệu, năm fixture tổng hợp, kết quả mong đợi và bằng chứng cần thu; 30 kịch bản A01–A30 đều chưa thực hiện. Chưa tạo fixture trên ERP. |
| Kiểm kê môi trường local | Đã kiểm tra Docker/WSL và tài nguyên; dừng lần thử thiết lập trước khi tạo môi trường NovaRetail. Số đo lịch sử được tóm tắt bên dưới. |
| Môi trường và kết quả chạy ERP | Chưa có cấu hình Compose, image/digest đã chốt cho lab, database, module đã cài, giao diện đăng nhập, kiểm tra lưu bền hoặc backup/restore thành công. |

Lab Mức A dự kiến kiểm chứng **cơ chế chặn bằng kết quả định trước**, có nguồn và phiên bản rõ ràng. Kết quả giả lập PASS/FAIL không chứng minh chứng từ đã được đối chiếu đúng. Chưa kiểm chứng thuật toán đối chiếu ba bên, chưa chứng minh Odoo đáp ứng G1-D01 và chưa có UAT hoặc kết quả vận hành.

[Prototype PR](../prototype/pr/README.md) đã có kết quả chạy và bằng chứng riêng trong phạm vi mô phỏng PR. Các kết quả đó không phải bằng chứng ERP lab, không xác nhận toàn bộ P2P hoặc thay đổi coverage SRS/RTM. Dữ liệu vẫn là tổng hợp; các OD còn mở và chưa có stakeholder sign-off.

## Hồ sơ thiết kế được bảo toàn

[lab-design.md](lab-design.md) giữ nguyên phân tích source, thiết kế, giả định, hợp đồng dữ liệu và ma trận kịch bản. [Đánh giá phương án](../09-solution-evaluation/options-assessment.md) giữ nguyên kiến nghị có điều kiện đã duyệt. Các câu về bước triển khai, điều kiện môi trường, đầu ra mong đợi hoặc việc cần duyệt trong hai hồ sơ là đề xuất và lịch sử tại thời điểm viết; không phải kết quả đã thực hiện hoặc cam kết triển khai bắt buộc trong portfolio hiện tại.

Image Odoo/PostgreSQL, module và cách cô lập trong thiết kế vẫn là mục tiêu dự kiến. Chưa ghim digest hoặc xác minh image mục tiêu tương ứng commit Community đã review. Không có hướng dẫn khởi động môi trường đã thử để cung cấp.

## Tóm tắt kiểm kê môi trường đã thực hiện

Các quan sát sau ghi ngày **21/10/2026, UTC+07:00**; không mô tả trạng thái máy hiện tại. Không đo lại hoặc truy cập Docker/database khi chốt tài liệu.

| Thời điểm | Quan sát đã ghi nhận | Giới hạn |
| --- | --- | --- |
| 07:52–07:54 — lần thử thiết lập (4A) | Máy có khoảng 7,84 GiB RAM; trước mở Docker Desktop còn 1,89 GiB, sau mở còn 0,10–0,37 GiB. Đĩa C trống từ 32,77 xuống 32,32 GiB. | Dừng vì dư địa tài nguyên hạn chế; chưa pull image hoặc tạo tài nguyên NovaRetail. Chênh lệch đĩa không phải dung lượng image lab. |
| 07:53 — Docker/WSL | Engine Linux 29.6.1 trả lời sau mở Docker Desktop 4.82.0; Compose v5.3.0; WSL phần mềm 2.4.13.0; distro docker-desktop chạy WSL 2. | Engine hoạt động không chứng minh đủ tài nguyên hoặc lab vận hành ổn định. |
| 08:01–08:03 — kiểm kê bổ sung (4A.1) | Sáu mẫu: RAM Windows khả dụng 0,763–0,916 GiB; bộ nhớ cam kết 11,756–12,399 GiB trên giới hạn 16,341 GiB. Đĩa C còn 31,83 GiB lúc 08:01. | Chỉ kiểm kê ngắn, không stress test; bộ nhớ cam kết không phải RAM vật lý đang cư trú. |
| 08:01:42 — các thành phần dùng RAM | Working set theo nhóm: VS Code khoảng 1.149 MiB, Chrome 751 MiB, Docker Desktop UI 362 MiB, backend 184 MiB; VM WSL khoảng 367 MiB. | Có trang chia sẻ và cách hạch toán khác nhau; không cộng host/VM/container thành một tổng hoặc coi là mức chắc chắn giải phóng được. |
| 08:01–08:03 — môi trường Docker cũ | Database cũ dùng khoảng 48–55 MiB theo docker stats; CPU 0,00% trong các mẫu. Lúc cuối kiểm kê, DB Running/healthy, web Exited (127); restart policy giữ nguyên. | Không phải NovaRetail lab; chưa có bằng chứng DB cũ là nguyên nhân chính của RAM thấp. Không thay đổi tài nguyên cũ. |

Phương pháp: CIM cho RAM Windows và bộ nhớ cam kết; Get-Process chỉ lấy tên/PID/số liệu bộ nhớ; docker stats cho container; truy vấn chọn lọc trạng thái Docker/WSL và metadata phụ thuộc. Không cộng các số có thể bao hàm nhau. Không xác định được một nguyên nhân duy nhất cho RAM thấp.

Lần thử thiết lập dừng trước khi có kết quả khởi động lab, lưu dữ liệu hoặc backup/restore. Phần kiểm kê đã hoàn tất; người dùng chọn giữ nguyên ứng dụng và database cũ. Không thực hiện biện pháp giải phóng tài nguyên hoặc phép đo trước/sau can thiệp. Snapshot và log chi tiết nằm ngoài repo, không phải artifact công khai hoặc điều kiện để đọc thiết kế.

## Hướng mở rộng tùy chọn

Nếu sau này có quyết định mở lại triển khai, cần đánh giá lại tài nguyên, điều kiện sử dụng và môi trường cô lập; xác minh phiên bản/artifact; thống nhất giả định lab; rồi mới triển khai và thu bằng chứng theo thiết kế. Khởi động, lưu bền, phục hồi và kiểm tra giao diện đều cần được thử thực tế trước khi công bố kết quả. Đây là lựa chọn mở rộng, không phải công việc đang chờ để hoàn tất portfolio này.

Các quy tắc ignore chỉ giới hạn trong thư mục lab để tránh vô tình đưa `.env`, secrets, backup hoặc runtime vào Git nếu có công việc local về sau; không có các dữ liệu đó trong sản phẩm hiện tại.
