# Ma trận truy vết yêu cầu

## Mục đích và trạng thái

Ma trận truy vết yêu cầu (Requirements Traceability Matrix — RTM) gọn này truy vết vấn đề nghiệp vụ được mô hình hóa qua mục tiêu, yêu cầu nghiệp vụ (BRQ), yêu cầu chức năng (FR), ca sử dụng (UC) và tiêu chí chấp nhận (Acceptance Criteria — AC). Đường cơ sở có 37 tiêu chí chấp nhận (AC-01–AC-37), gồm 13 tiêu chí bổ sung AC-25–AC-37. AC chỉ là điều kiện kiểm chứng tương lai; chưa thực hiện kiểm thử và không khẳng định phê duyệt của các bên liên quan. Có tiêu chí, bao phủ một phần và trạng thái thực hiện là các khái niệm riêng: mọi tiêu chí vẫn chưa được kiểm tra. Các viết tắt chứng từ gồm yêu cầu mua hàng (PR), đơn đặt hàng (PO), phiếu nhận hàng (GR); đề nghị thanh toán (Payment Request).

| Vấn đề | Mục tiêu | BRQ | FR(s) | Ca sử dụng | Tiêu chí chấp nhận |
| --- | --- | --- | --- | --- | --- |
| PP-01 Chậm phê duyệt PO | OBJ-01 | BRQ-05 | FR-04, FR-06, FR-07 | UC-03, UC-04 | AC-07–AC-09, AC-26–AC-28 |
| PP-02 Dữ liệu phân tán | OBJ-03 | BRQ-01, BRQ-06 | FR-01, FR-04, FR-08, FR-09, FR-12, FR-14; NFR-03 | UC-01, UC-03, UC-05, UC-06, UC-08, UC-10 | AC-01, AC-07, AC-10, AC-11, AC-12, AC-16, AC-21, AC-25, AC-26, AC-29–AC-33 |
| PP-03 Đối chiếu ba bên thủ công | OBJ-04 | BRQ-08 | FR-09–FR-11 | UC-06, UC-07 | AC-12–AC-15, AC-29, AC-35, AC-36 |
| PP-04 Khó theo dõi trạng thái PR/PO | OBJ-03 | BRQ-07 | FR-14; FR-16 hỗ trợ tổng hợp trạng thái | UC-10; UC-12 hỗ trợ tổng hợp | AC-21, AC-35–AC-37 cho một số vị trí trong quy trình hiện có; AC-23 hỗ trợ báo cáo |
| PP-05 Dấu vết kiểm toán hạn chế | OBJ-05 | BRQ-09 | FR-15; NFR-02 | UC-01–UC-09, UC-11 | AC-04–AC-06, AC-09, AC-14, AC-17, AC-18, AC-22 |
| PP-06 Kiểm soát ngân sách thiếu nhất quán | OBJ-04 | BRQ-03 | FR-02 | UC-01, UC-02 | AC-02, AC-03 |
| PP-07 Nhập liệu lặp lại | OBJ-02 | BRQ-02, BRQ-06 | FR-01, FR-04 | UC-01, UC-03 | AC-01, AC-07 |
| Kiểm soát vòng đời PR trong phạm vi | OBJ-03, OBJ-04 | BRQ-02, BRQ-03 | FR-01–FR-03 | UC-01, UC-02 | AC-01–AC-06, AC-25, AC-34 |
| Kiểm soát đề nghị thanh toán trong phạm vi | OBJ-04 | BRQ-10; BRQ-01 hỗ trợ điểm kết thúc vòng đời | FR-12, FR-13 | UC-08, UC-09 | AC-16–AC-18, AC-30, AC-37 |
| Nhu cầu báo cáo trong phạm vi | OBJ-01, OBJ-03, OBJ-04, OBJ-05 | BRQ-11 | FR-16 | UC-12 | AC-23, AC-24 |

Tiêu chí kiểm chứng xuyên suốt: AC-19 bao phủ điều kiện nhà cung cấp; AC-20 bao phủ kiểm soát truy cập theo phân quyền được cấu hình. Liên kết xác định mức độ bao phủ hoặc hỗ trợ được nêu, không phải kiểm thử đã thực hiện hoặc bao phủ đầy đủ mọi hành vi. Cụ thể, AC-07 kiểm tra giữ tham chiếu PR/tái sử dụng dữ liệu và đánh giá tuyến, không kiểm tra điều kiện nhà cung cấp; kiểm soát kiểm tra điều kiện là AC-19.
## Mức độ bao phủ yêu cầu bổ sung qua AC

| Yêu cầu | Tiêu chí chấp nhận | Mức độ bao phủ |
| --- | --- | --- |
| FR-05 | AC-19 | Chặn nhà cung cấp ngừng hoạt động hoặc không đủ điều kiện trong Danh mục nhà cung cấp đã phê duyệt. |
| FR-14 | AC-21, AC-33, AC-35–AC-37 | Trạng thái PR/PO, tham chiếu luồng hợp lệ và một số vị trí trong quy trình của hóa đơn/ngoại lệ/đề nghị thanh toán; bao phủ đầy đủ trạng thái và quyền vẫn còn mở. |
| FR-15 | AC-22 | Kiểm tra lịch sử kiểm toán xác định giao dịch, người thực hiện, hành động và thời điểm. |
| FR-16 | AC-23, AC-24 | Kiểm tra kết quả báo cáo theo bộ lọc và kết quả không có dữ liệu. |

### Mức độ bao phủ NFR qua tiêu chí chấp nhận

Mức độ bao phủ dưới đây mô tả tiêu chí đã xác định, không phải kết quả kiểm thử. Yêu cầu phi chức năng (NFR) NFR-01/02 có mức độ bao phủ tổng quát; chi tiết phụ thuộc OD-07/danh mục sự kiện. Không dòng nào xác nhận sẵn sàng nghiệm thu toàn bộ, bao phủ đầy đủ hoặc hoàn tất kiểm thử chấp nhận người dùng (UAT). Mọi tiêu chí được tham chiếu vẫn chưa được kiểm tra.

| NFR | Mức độ bao phủ qua AC đã xác định | Mức độ | Ranh giới / Khoảng thiếu còn lại |
| --- | --- | --- | --- |
| NFR-01 | AC-20; AC-23, AC-24 cho truy cập báo cáo | Bao phủ tổng quát; chi tiết phụ thuộc OD-07 | AC-20 bao phủ xem/thao tác không có quyền theo phân quyền được cấu hình. Ma trận quyền thực tế, gồm phạm vi cửa hàng/trung tâm chi phí/hồ sơ, chưa chốt theo OD-07. Tác nhân có quyền trong tiêu chí mới là điều kiện trước, không kiểm chứng toàn bộ ma trận quyền. |
| NFR-02 | AC-22; bản ghi quyết định/ngoại lệ hỗ trợ trong AC-04–AC-06, AC-09, AC-14, AC-17, AC-18, AC-27, AC-28, AC-30 | Bao phủ tổng quát; chi tiết phụ thuộc danh mục sự kiện | AC-22 quy định giao dịch, người thực hiện, hành động và thời điểm cho hành động trọng yếu. Danh mục sự kiện cuối cùng và quy tắc đầy đủ/đếm chỉ số hiệu quả (KPI) vẫn cần xác nhận; chưa xác định thời hạn lưu trữ. Ghi kết quả/việc gửi trong tiêu chí mới chưa xác lập danh mục đầy đủ. |
| NFR-03 | AC-07, AC-10, AC-11; AC-29, AC-31–AC-33 được bổ sung; AC-21 hỗ trợ hiển thị tham chiếu | Một phần, đã mở rộng | AC-31/AC-32 chặn rõ việc hoàn tất với tham chiếu PO không tồn tại; AC-29/AC-33 kiểm tra ghi nhận hóa đơn và giữ/hiển thị liên kết nguồn trên luồng hợp lệ. Chưa bao phủ mọi kiểm soát toàn vẹn: trường hợp riêng bỏ trống tham chiếu PO trên hóa đơn, bội số quan hệ chứng từ và bảo toàn liên kết qua chỉnh sửa được phép vẫn là khoảng thiếu. Không bổ sung xóa, đảo giao dịch, sửa chứng từ đã phê duyệt hoặc chặn liên kết mất nguồn qua các thao tác đó. |
| NFR-04 | AC-01, AC-13, AC-21; AC-34–AC-37 được bổ sung; AC-06, AC-15, AC-18 hỗ trợ bản ghi | Một phần, đã mở rộng | Lý do trả PR/bước tiếp theo, thuộc tính sai lệch/trạng thái bị chặn, phân biệt thiếu dữ liệu và vị trí trong quy trình của đề nghị thanh toán đã xác lập nay có tiêu chí quan sát được. Mức dễ hiểu vẫn cần xác nhận với người dùng; có thông tin không chứng minh tính dễ sử dụng. Bao phủ đầy đủ cách trình bày các trường hợp trả lại, kết quả đối chiếu và trạng thái chứng từ khác vẫn còn mở. |

### Truy vết AC bổ sung

Toàn văn tiêu chí Cho trước (Given)/Khi (When)/Thì (Then) và nguồn nghiệp vụ nằm tại [phần bổ sung của đặc tả yêu cầu phần mềm (SRS)](../07-software-requirements/srs.md#tiêu-chí-bổ-sung-cho-kiểm-soát-quy-trình-hiện-có). Quy tắc và UC nguồn đã tồn tại; không thêm FR/NFR hoặc chính sách mới.

| AC | FR / NFR | BRQ | Nguồn nghiệp vụ | Nội dung kiểm tra đã xác định |
| --- | --- | --- | --- | --- |
| AC-25 | FR-01 | BRQ-01, BRQ-02 | BR-01; UC-01; G1-D05 | Lưu PR nháp chưa đầy đủ, không gửi/chuyển phê duyệt. |
| AC-26 | FR-04 | BRQ-05 | BR-05; UC-03 | Chặn tạo PO từ PR chưa phê duyệt. |
| AC-27 | FR-06, FR-07 | BRQ-05, BRQ-09 | BR-09–BR-11; UC-04; G1-D02 | Phê duyệt mua hàng bắt buộc; tuyến không cần Tài chính đủ điều kiện phát hành. |
| AC-28 | FR-06, FR-07 | BRQ-05, BRQ-09 | BR-09–BR-11; UC-04; G1-D02 | Tuyến Tài chính bổ sung vẫn chưa đủ điều kiện đến khi được phê duyệt. |
| AC-29 | FR-09, FR-10, NFR-03 | BRQ-01, BRQ-06, BRQ-08 | BR-15, BR-16, BR-19; UC-06; G1-D01 | Giữ hóa đơn/liên kết PO khi chờ dữ liệu GR; chặn chuẩn bị/gửi đề nghị thanh toán. |
| AC-30 | FR-12 | BRQ-01, BRQ-10 | BR-19, BR-22–BR-24; UC-08; G1-D01, G1-D06 | Chuẩn bị/gửi thành công bởi người có quyền, kiểm tra điều kiện hai lần. |
| AC-31 | FR-08, NFR-03 | BRQ-01, BRQ-06, BRQ-08 | BR-13; UC-05 | Chặn hoàn tất GR với PO không tồn tại. |
| AC-32 | FR-09, NFR-03 | BRQ-01, BRQ-06, BRQ-08 | BR-15; UC-06; điều kiện trước: PO tồn tại | Chặn hoàn tất ghi nhận hóa đơn với PO không tồn tại. |
| AC-33 | FR-04, FR-08, FR-09, FR-14, NFR-03 | BRQ-01, BRQ-06, BRQ-07 | BR-07, BR-13, BR-15, BR-27; UC-03, UC-05, UC-06, UC-10 | Giữ/hiển thị liên kết nguồn thực tế trên luồng hợp lệ. |
| AC-34 | FR-03, NFR-04 | BRQ-02 | BR-04; UC-01, UC-02; G1-D03 | Trình bày lý do trả PR và bước chỉnh sửa/gửi lại. |
| AC-35 | FR-10, FR-11, FR-14, NFR-04 | BRQ-07, BRQ-08 | BR-17, BR-20, BR-21, BR-25, BR-27; UC-06, UC-07, UC-10; G1-D01 | Trình bày thuộc tính sai lệch, thông tin liên quan trong quyền truy cập, ngoại lệ mở/trạng thái bị chặn và đối chiếu lại bắt buộc. |
| AC-36 | FR-10, FR-14, NFR-04 | BRQ-07, BRQ-08 | BR-16, BR-19, BR-25, BR-27; UC-06, UC-10; G1-D01 | Xác định dữ liệu thiếu, phân biệt với sai lệch và hiển thị việc chặn. |
| AC-37 | FR-13, FR-14, NFR-04 | BRQ-07, BRQ-10 | BR-23–BR-25, BR-27; UC-08–UC-10; G1-D06 | Hiển thị kết quả phê duyệt/trả lại đề nghị thanh toán đã xác lập. |

## Kiểm tra mức độ bao phủ BRQ

| BRQ | Mức độ bao phủ FR / NFR | Mức độ bao phủ UC | Cơ sở / Giới hạn |
| --- | --- | --- | --- |
| BRQ-01 Quản lý giao dịch liên thông | FR-01, FR-04, FR-08, FR-09, FR-12; NFR-03; FR-13 hỗ trợ điểm kết thúc | UC-01, UC-03, UC-05, UC-06, UC-08; UC-09 hỗ trợ điểm kết thúc phê duyệt | Bao phủ tạo/ghi nhận xuyên suốt chuỗi PR đến đề nghị thanh toán; UC-09 hoàn tất ranh giới phê duyệt. Kiểm chứng toàn vẹn liên kết vẫn chỉ một phần. |
| BRQ-02 Quản lý PR | FR-01, FR-03; NFR-04 hỗ trợ thông tin cho người dùng | UC-01, UC-02 | Tạo/kiểm tra/gửi và ba kết quả xem xét. |
| BRQ-03 Kiểm soát ngân sách | FR-02; FR-03 hỗ trợ kiểm tra lại sau trả lại | UC-01, UC-02 | UC-01 thực hiện kiểm tra ngân sách; UC-02 yêu cầu kết quả đạt trước khi xem xét. |
| BRQ-04 Chọn nhà cung cấp | FR-05 | UC-03 | Chỉ chọn nhà cung cấp hiện có đã phê duyệt và đủ điều kiện. |
| BRQ-05 Quản lý và phê duyệt PO | FR-04, FR-06, FR-07; NFR-04 hỗ trợ thông tin cho người dùng | UC-03, UC-04 | Phê duyệt mua hàng bắt buộc; Tài chính phê duyệt bổ sung khi được yêu cầu. |
| BRQ-06 Tái sử dụng và liên kết dữ liệu | FR-04, FR-08, FR-09, FR-14; NFR-03 | UC-03, UC-05, UC-06, UC-10 | Tái sử dụng/giữ liên kết PR và PO; chế độ xem trạng thái hiển thị tham chiếu. |
| BRQ-07 Theo dõi trạng thái | FR-14; FR-16 hỗ trợ tổng hợp trạng thái; NFR-04 hỗ trợ thông tin cho người dùng | UC-10; UC-12 hỗ trợ tổng hợp trạng thái | Báo cáo UC-12 hỗ trợ theo dõi nhưng không thay thế truy cập trạng thái từng giao dịch. AC-21 bao phủ PR/PO; AC-35–AC-37 thêm một số vị trí trong quy trình hiện có của hóa đơn/ngoại lệ/đề nghị thanh toán, không phải mô hình trạng thái đầy đủ. |
| BRQ-08 Đối chiếu và ngoại lệ | FR-08–FR-11; NFR-04 hỗ trợ thông tin cho người dùng | UC-05, UC-06, UC-07 | Đầu vào GR, đối chiếu hóa đơn và chỉnh sửa/đối chiếu lại có kiểm soát. |
| BRQ-09 Truy vết | FR-03, FR-06, FR-11, FR-13, FR-15; NFR-02; NFR-01 hỗ trợ truy cập được phép | UC-01–UC-09 là hành vi xuyên suốt, UC-11 là năng lực rà soát chuyên biệt | UC giao dịch ghi bằng chứng; UC-11 rà soát. Chỉ xem trạng thái UC-10 không bao phủ xem lịch sử. |
| BRQ-10 Phê duyệt đề nghị thanh toán | FR-12, FR-13; NFR-04 hỗ trợ thông tin cho người dùng | UC-08, UC-09 | Bắt buộc có đối chiếu hiện hành đạt; phê duyệt/trả lại theo luồng. Chỉ phê duyệt đề nghị thanh toán là điểm kết thúc phạm vi được mô hình hóa. |
| BRQ-11 Báo cáo mua hàng cơ bản | FR-16 | UC-12 | Nội dung báo cáo vận hành và kết quả theo bộ lọc/không có dữ liệu trong quyền truy cập. |

### Thay đổi mức độ bao phủ và khoảng thiếu chức năng còn lại

- FR-01: AC-25 kiểm tra trực tiếp lưu, mở lại nháp chưa đầy đủ mà không gửi/chuyển phê duyệt. AC-01/AC-06 vẫn bao phủ kiểm tra khi gửi và kiểm tra lại PR bị trả; không khẳng định bao phủ mọi biến thể cập nhật nháp.
- FR-04/FR-06/FR-07: AC-26 thêm kiểm soát PR chưa phê duyệt; AC-27/AC-28 thêm kiểm tra chuyển xử lý/điều kiện với Mua hàng bắt buộc và Tài chính có điều kiện. AC-08 giữ chặn phát hành tổng quát khi thiếu phê duyệt. Chưa thêm tiêu chí riêng cho hoàn tất phê duyệt tài chính thành công hoặc mọi tổ hợp tuyến trả lại; OD-01/OD-02 còn mở. Đủ điều kiện không khẳng định tự động phát hành.
- FR-09: AC-29 thêm ghi hóa đơn trước khi có GR; AC-32 chặn tham chiếu PO không tồn tại. Trường hợp riêng bỏ trống tham chiếu PO và kiểm tra toàn bộ hóa đơn vẫn chưa có tiêu chí trực tiếp; không suy ra chính sách trường dữ liệu bổ sung.
- FR-12: AC-30 thêm chuẩn bị/gửi thành công bởi người có quyền và hai lần kiểm tra điều kiện đã có. AC-16 giữ kiểm soát chặn; các tiêu chí không liệt kê mọi tình huống thay đổi điều kiện.
- FR-14: AC-33 kiểm tra hiển thị tham chiếu nguồn trên luồng hợp lệ; AC-35/AC-36 kiểm tra thông tin ngoại lệ mở/chờ dữ liệu đã xác lập; AC-37 kiểm tra vị trí phê duyệt/trả lại đề nghị thanh toán đã xác lập. Theo dõi trạng thái vòng đời GR, các chuyển trạng thái khác của hóa đơn/ngoại lệ/đề nghị thanh toán và khả năng xem theo vai trò/hồ sơ vẫn chỉ một phần theo OD-06/OD-07. AC-10 kiểm tra ghi nhận/liên kết GR, không phải mô hình trạng thái GR đầy đủ. Báo cáo AC-23 vẫn là bao phủ hỗ trợ.

Các bổ sung này khép lại một số trường hợp thiếu tiêu chí, không phải mọi khoảng thiếu bao phủ. NFR-03/04 vẫn chỉ một phần, mọi tiêu chí chưa được kiểm tra và hành vi UC/FR hiện có vẫn là đường cơ sở yêu cầu.

## Mức độ bao phủ quy tắc nghiệp vụ và ràng buộc

27 quy tắc dưới đây được truy vết đến nội dung yêu cầu/UC thực chất. Tham chiếu AC chỉ kiểm tra đã xác định; chú thích nêu bao phủ một phần hoặc ràng buộc chính sách. Ràng buộc phạm vi hoặc chính sách không yêu cầu FR riêng.

| BR | BRQ liên quan | FR / NFR hoặc ràng buộc | UC | AC hiện có / Giới hạn |
| --- | --- | --- | --- | --- |
| BR-01 | BRQ-02 | FR-01 | UC-01 | AC-01, AC-06, AC-25; đã có tiêu chí rõ về lưu nháp chưa đầy đủ. |
| BR-02 | BRQ-03 | FR-02 | UC-01, UC-02 | AC-02, AC-03, AC-06. |
| BR-03 | BRQ-03 | FR-02 | UC-01 | AC-03, AC-06. |
| BR-04 | BRQ-02 | FR-03 | UC-02 | AC-04–AC-06, AC-34; phân quyền được cấu hình áp dụng xuyên suốt theo AC-20. |
| BR-05 | BRQ-02, BRQ-05 | FR-03, FR-04 | UC-02, UC-03 | AC-04, AC-05, AC-07, AC-26; kiểm soát tạo PO từ PR chưa phê duyệt đã rõ. |
| BR-06 | BRQ-04 | FR-05 | UC-03 | AC-19; nhà cung cấp đủ điều kiện trong AC-07 là điều kiện trước. |
| BR-07 | BRQ-01, BRQ-06 | FR-04, NFR-03 | UC-03 | AC-07, AC-33; tính toàn vẹn rộng hơn vẫn chỉ bao phủ một phần. |
| BR-08 | BRQ-06 | FR-04 | UC-03 | AC-07 kiểm tra tái sử dụng dữ liệu PR phù hợp. |
| BR-09 | BRQ-05 | FR-06 | UC-03, UC-04 | AC-07, AC-09, AC-27, AC-28; một số nhánh chuyển xử lý đã rõ, chưa gồm mọi tổ hợp. |
| BR-10 | BRQ-05 | FR-06 | UC-04 | AC-27, AC-28; AC-07/AC-08 hỗ trợ kiểm soát chuyển xử lý/phát hành; tiêu chí vẫn thuộc OD-01/OD-02. |
| BR-11 | BRQ-05 | FR-07 | UC-03, UC-04 | AC-08, AC-27, AC-28; đủ điều kiện khác với đã phát hành. |
| BR-12 | BRQ-05 | FR-07 | UC-03, UC-04 | AC-09. |
| BR-13 | BRQ-01, BRQ-06, BRQ-08 | FR-08, NFR-03 | UC-05 | AC-10, AC-11, AC-31, AC-33. |
| BR-14 | BRQ-08 | FR-08; ràng buộc chính sách nhận hàng một phần | UC-05 | AC-10 kiểm tra số lượng thực tế; cách xử lý OD-08 chưa được kiểm chứng hoặc phê duyệt. |
| BR-15 | BRQ-01, BRQ-06 | FR-09, NFR-03 | UC-06 | AC-29, AC-32, AC-33; AC-12 giả định có liên kết; trường hợp riêng bỏ trống tham chiếu vẫn là khoảng thiếu. |
| BR-16 | BRQ-08 | FR-10 | UC-06 | AC-12, AC-13, AC-29, AC-36. |
| BR-17 | BRQ-08 | FR-10 | UC-06 | AC-12, AC-35. |
| BR-18 | BRQ-08 | FR-10; ràng buộc chính sách có điều kiện | UC-06 | AC-12 áp dụng chính sách được cấu hình. Việc áp dụng/giá trị dung sai vẫn thuộc OD-04; chưa đặc tả tính năng quản lý cấu hình. |
| BR-19 | BRQ-08, BRQ-10 | FR-10, FR-12 | UC-06, UC-08 | AC-15, AC-16, AC-29, AC-30, AC-36; đối chiếu hiện hành đạt vẫn bắt buộc. |
| BR-20 | BRQ-08 | FR-11 | UC-06, UC-07 | AC-14, AC-15, AC-35. |
| BR-21 | BRQ-08, BRQ-09 | FR-11, FR-15; NFR-02 | UC-07, UC-11 | AC-14, AC-15, AC-22, AC-35. |
| BR-22 | BRQ-10 | FR-12 | UC-08 | AC-16, AC-30; đã có tiêu chí rõ cho chuẩn bị/gửi thành công. |
| BR-23 | BRQ-10 | FR-13 | UC-09 | AC-17, AC-18, AC-30, AC-37; AC-30 chuyển đến Tài chính, không kiểm tra phê duyệt. |
| BR-24 | BRQ-10 | Ràng buộc phạm vi: không thực hiện thanh toán ngân hàng | UC-09 | AC-17, AC-30, AC-37 phân biệt gửi/hoàn tất quy trình với đã thanh toán; không thêm FR thực hiện thanh toán ngân hàng. |
| BR-25 | BRQ-01, BRQ-07, BRQ-11 | FR-09, FR-14, FR-16 | UC-06, UC-10, UC-12 | AC-21 kiểm tra PR/PO; AC-35–AC-37 kiểm tra một số vị trí quy trình hiện có; AC-23 hỗ trợ tổng hợp; bao phủ đầy đủ trạng thái chứng từ khác vẫn còn mở. |
| BR-26 | BRQ-09 | FR-03, FR-06, FR-11, FR-13, FR-15; NFR-02 | UC-01–UC-09, UC-11 | AC-04–AC-06, AC-09, AC-14, AC-17, AC-18, AC-22; AC-27, AC-28, AC-30 hỗ trợ bản ghi phê duyệt/gửi, không xác nhận danh mục đầy đủ. |
| BR-27 | BRQ-07, BRQ-09, BRQ-11 | NFR-01; FR-14–FR-16 | UC-01–UC-12 theo quyền truy cập được cấu hình | AC-20, AC-23, AC-24; AC-33, AC-35–AC-37 dùng chế độ xem trong quyền truy cập nhưng không kiểm chứng toàn bộ ma trận quyền; OD-07 còn mở. |

## Quyết định còn mở

| ID | Quyết định nghiệp vụ chưa chốt | Lý do còn mở |
| --- | --- | --- |
| OD-01 | Ngưỡng giá trị phê duyệt PO | Cần chính sách Mua hàng/Tài chính được phê duyệt. |
| OD-02 | Tiêu chí phê duyệt tài chính bổ sung | Cần chính sách Tài chính. |
| OD-03 | Chính sách kiểm tra ngân sách chi tiết | Đường cơ sở yêu cầu kiểm tra, chưa xác định cách tính hoặc chính sách nguồn dữ liệu. |
| OD-04 | Chính sách và giá trị dung sai đối chiếu | Không mặc định dung sai khi chưa có chính sách được phê duyệt. |
| OD-05 | Quy tắc chuyển cấp ngoại lệ đối chiếu | Thiết kế chủ thể chịu trách nhiệm/chuyển cấp cần nghiệp vụ xác nhận. |
| OD-06 | Mô hình trạng thái giao dịch cuối cùng | Trạng thái minh họa không phải mô hình trạng thái đã chốt. |
| OD-07 | Quyền vai trò chi tiết | Bắt buộc kiểm soát theo vai trò; quyền cụ thể cần xác nhận. |
| OD-08 | Chính sách nhận hàng một phần | Quy trình có thể ghi số lượng thực nhận; cách xử lý theo chính sách vẫn chưa chốt. |

## Ghi chú bàn giao

1. Xác nhận giả định và quyết định còn mở với chủ thể nghiệp vụ liên quan trước khi thiết kế.
2. Chỉ chuyển từng tiêu chí chấp nhận thành kiểm thử thực thi được sau khi biết giải pháp và quyết định chính sách.
3. Ghi bằng chứng kiểm thử và trạng thái phê duyệt riêng; kho hồ sơ năng lực này chưa có cả hai.
