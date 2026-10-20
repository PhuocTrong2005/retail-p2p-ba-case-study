# Thiết kế ERP lab — 3A: môi trường và điều kiện tiếp cận

**Trạng thái: môi trường mục tiêu được chọn có điều kiện ngày 20/10/2026 (Asia/Saigon); trạng thái sẵn sàng vận hành vẫn chưa xác nhận.** Môi trường mục tiêu là Odoo Community 19.0 bằng container riêng, phụ thuộc các điều kiện trước thiết lập tại mục 5. Chưa thiết lập hoặc thực hiện lab. Đây là lựa chọn môi trường thực hành G1-D01, không phải lựa chọn ERP triển khai cho NovaRetail. Các phần hợp đồng dữ liệu, thiết kế chức năng và phép thử dành cho 3B/3C chưa được hoàn thiện trong 3A.

## 1. Mốc nguồn và kiểm tra đầu lượt

Đầu lượt: branch `main`, HEAD `132e5b338f1738df36a59039f59919f678c9c8be`; `git status --porcelain=v1` rỗng, index rỗng qua `git diff --cached --stat`. Khớp mốc brief; không có thay đổi cần giải thích. Không tìm thấy AGENTS.md trong repo hoặc các thư mục cha đã kiểm tra. File này chưa tồn tại. Branch `erp-lab-design` chưa tồn tại và đã tạo từ HEAD trên. Lần đầu tạo branch bị sandbox chặn ghi `.git`; thao tác được thực hiện lại thành công với quyền phù hợp, không reset hoặc ghi đè.

Snapshot trạng thái đầu lượt và SHA-256 của sáu tài liệu nguồn nằm ngoài repo tại `C:\Users\ASUS\AppData\Local\Temp\p2p-3a-55a374e6a1944679a235da14b6af0f03\snapshot.json`; đã đọc lại thành công. Snapshot ghi trạng thái trước khi tạo branch; thư mục tạm có thể bị hệ điều hành dọn. Các nguồn đã đọc:

| Nguồn nội bộ | Căn cứ dùng cho 3A |
| --- | --- |
| [Đánh giá phương án](../09-solution-evaluation/options-assessment.md), kiến nghị mục 13 và phạm vi mục 16 | Ưu tiên kiểm soát; phép thử nhỏ PO–GR–hóa đơn–đề nghị, không thử toàn P2P |
| [Quyết định nền tảng](../08-traceability/baseline-decisions.md) | G1-D01; G1-D05 giới hạn sửa chứng từ; G1-D06 phân biệt đề nghị với thực hiện thanh toán |
| [Quy tắc nghiệp vụ](../04-to-be-design/business-rules.md) | BR-16–22: đủ dữ liệu, thuộc tính/policy, kết quả hiện hành, ngoại lệ và điều kiện lập đề nghị |
| [Danh mục yêu cầu](../05-brd/requirements-catalog.md) | BRQ-08/10 và truy vết/liên kết hỗ trợ |
| [SRS](../07-software-requirements/srs.md) | FR-09–12, FR-14/15; AC-14–16/29/30/35/36; AC-12/13 hỗ trợ đối chiếu và thiếu dữ liệu |
| [RTM](../08-traceability/requirements-traceability-matrix.md) | OD-01–08 vẫn mở; FR-12 chưa liệt kê mọi biến thể thay đổi điều kiện; NFR-03/04 và trạng thái/quyền còn bao phủ một phần |

## 2. Kiểm kê thực tế — chỉ đọc

Quan sát ngày 20/10/2026 bằng PowerShell, CIM, metadata file/registry có chọn lọc, Get-Service và lệnh truy vấn Docker/WSL. Không đọc cấu hình chứa bí mật, dòng lệnh tiến trình hoặc toàn bộ biến môi trường; không kết nối database hay ứng dụng ERP. Một số truy vấn bị sandbox từ chối ban đầu; truy vấn tài nguyên và Docker được chạy lại chỉ đọc với quyền phù hợp. Kết quả bị từ chối không được dùng làm số đo bằng 0.

| Hạng mục | Đã quan sát | Giới hạn / diễn giải |
| --- | --- | --- |
| Hệ điều hành / CPU | Windows 11 Home Single Language, build hệ điều hành `10.0.26300.0`, X64; 8 bộ xử lý logic | Không suy số nhân vật lý hoặc chứng nhận tương thích Docker từ thông tin này |
| RAM / đĩa C | Tổng 7,8 GiB RAM; khoảng 1,0 GiB RAM trống; C còn 18,5 GiB | Ảnh chụp tại thời điểm kiểm tra; chưa đo tải ERP, chưa xác định dung lượng image/backup thực tế |
| Ảo hóa / WSL | CIM trả `VirtualizationFirmwareEnabled=False`; WSL mặc định Ubuntu, default version 2; WSLService Running | Default version không chứng minh distro đã chạy được; kết quả ảo hóa cần xác minh trước container, chưa xác định nguyên nhân |
| Docker / Compose | CLI Docker `29.6.1` build `8900f1d`; Compose `v5.3.0`; executable trong `C:\Program Files\Docker\Docker\resources\bin` | Công cụ đã cài; không đồng nghĩa Engine sẵn sàng |
| Docker Engine / container / image | `docker version`, `container ls -a`, `image ls` không kết nối được pipe `dockerDesktopLinuxEngine`; `com.docker.service` Stopped | Không xác định được server version hoặc danh sách container/image. Không kết luận không có image/container; service Stopped riêng lẻ cũng không đủ kết luận toàn bộ Desktop ngừng chạy |
| Odoo Windows hiện có | Dịch vụ `odoo-server-19.0` Running; NSSM và Python trong `D:\Download\odoo package`; `server\odoo\release.py` ghi `19.0-20260516`, source head `cf042239eb7af83a694069317beccb8a73aab38d` | Chỉ đọc metadata trên đĩa và đường dẫn executable; chưa chứng minh tiến trình đang nạp đúng bộ source này, ứng dụng khỏe hoặc là lab được phép dùng |
| Edition / module cục bộ | File `purchase/__manifest__.py`, `purchase_stock/__manifest__.py` có mặt trong `server\odoo\addons`; `web_enterprise/__manifest__.py` không có tại đường dẫn đó | Không xác nhận edition: có thể có addons ở nơi khác. Metadata release có tên enterprise không chứng minh module hoặc giấy phép Enterprise. Chưa biết module đã cài trong DB |
| Python / PostgreSQL | Python trên PATH `3.13.3`; Python đi kèm Odoo có file version `3.12.3`; thư mục PostgreSQL đi kèm tồn tại; `PostgreSQL_For_Odoo` Stopped; `psql` không trên PATH | Chưa biết phiên bản PostgreSQL, cluster/DB hoặc nguồn DB Odoo đang dùng; không suy Odoo lỗi vì dịch vụ PostgreSQL này dừng |
| Lab trong repo / quyền tiếp cận | Không tìm thấy file theo tên compose/docker/odoo trong repo; chưa quan sát môi trường NovaRetail cô lập hợp lệ | Tìm theo tên không phải kiểm toán toàn máy. Chủ sở hữu, mục đích dịch vụ Odoo và quyền sửa/tạo dữ liệu chưa rõ; không dùng cài đặt này cho thử nghiệm |

Không khởi động/dừng dịch vụ hoặc container, tải image, cài phần mềm, tạo database, sửa cấu hình hay thử đăng nhập. Chưa xác định được ERP nào đang phục vụ công việc khác; do mục đích chưa rõ, giữ nguyên toàn bộ cài đặt hiện có.

## 3. Khả năng môi trường cần hỗ trợ

**Đạt tiêu chí lựa chọn môi trường không phải đã đạt baseline.** Bảng dưới là yêu cầu về nơi có thể quan sát và bổ sung cơ chế; chưa thiết kế phần mở rộng.

| Khả năng cần có | Căn cứ / điều cần quan sát ở 3B | Đánh giá cho môi trường Odoo Community tự quản |
| --- | --- | --- |
| 1. Dữ liệu tổng hợp và tham chiếu | Định danh nguồn, thuộc tính bắt buộc, dữ liệu ban đầu có thể tái tạo | Có căn cứ về module và dữ liệu XML/CSV (S5); bộ dữ liệu lab chưa thiết kế |
| 2. PO–GR–hóa đơn | Đầu vào FR-09/10; AC-29 yêu cầu lưu hóa đơn có PO khi chưa có GR | Purchase/Purchase Stock mô tả các đối tượng nguồn (S3/S4); đường tạo hóa đơn thiếu GR cần xác minh, không đổi AC-29 để khớp chính sách tạo bill |
| 3. Cấu hình, kết quả và trạng thái | Thiếu dữ liệu khác sai lệch; kết quả hiện hành và ngoại lệ truy được | Có tài liệu control policy/matching (S6); mức đáp ứng BR-16–21 chưa xác minh |
| 4. Xác định hoặc bổ sung đề nghị thanh toán | Đối tượng theo baseline cần được ánh xạ riêng | Có khả năng tạo business object bằng module (S5); chưa khẳng định có đối tượng chuẩn tương đương |
| 5. Kiểm tra riêng lúc chuẩn bị và gửi | FR-12, AC-16/30; dữ liệu thay đổi giữa hai lần kiểm tra | Cần quyền bổ sung logic máy chủ nếu thiếu; chưa chứng minh chức năng chuẩn chặn được |
| 6. Chỉnh sửa và đối chiếu lại | AC-15; nhãn “đã xử lý” không cấp điều kiện; giữ G1-D05 | Cần xác minh hành vi tính lại và đường sửa hợp lệ; không tự cho sửa PO đã duyệt/phát hành hoặc GR đã ghi nhận |
| 7. Lưu bằng chứng và chạy lại | Cấu hình, phiên bản nguồn/kết quả, người/hành động/thời điểm, dữ liệu gốc | Tự quản cho phép kiểm soát file/code/dữ liệu; cách thu bằng chứng và phục hồi phải được xác minh, chưa khẳng định audit chuẩn đầy đủ |
| 8. Bổ sung chức năng tối thiểu | Không phụ thuộc tài khoản SaaS bị hạn chế cài code | Module có thể bổ sung/đổi logic (S5), container có điểm gắn addons (S1/S2); phạm vi bổ sung chuyển 3B |

Vendor Bill, Should Be Paid, Register Payment và Approvals không mặc nhiên tương đương Đề nghị thanh toán. S6 mô tả cờ Should Be Paid có thể sửa tay và sai lệch khi sửa bill chưa chặn thay đổi; đó là lý do phải xác minh cơ chế thực thi, không phải kết quả test ERP của 3A.

## 4. Hai phương án môi trường

Hai ứng viên dùng cùng sản phẩm, khác cách chạy; không có căn cứ cần khảo sát thêm ERP. Odoo 19.0 được giữ vì có source/module công khai, đường mở rộng và image cụ thể, đồng thời có metadata cục bộ để đối chiếu; việc đã đọc tài liệu 19.0 trước đây không tự quyết định lựa chọn.

| Nội dung | A — Container riêng, phương án chính | B — Chạy source trực tiếp trên Windows, dự phòng có điều kiện |
| --- | --- | --- |
| Sản phẩm / phiên bản | Odoo Community 19.0; tag mục tiêu `odoo:19.0-20261015`, được liệt kê trong S1 | Odoo Community 19.0 từ repo công khai `odoo/odoo`; commit cụ thể phải chốt trước thiết lập; không dùng mặc định gói cục bộ `19.0-20260516` |
| Edition / module | Community; dự kiến `purchase`, `stock`, `account`, `purchase_stock` và dependencies do manifest khai báo (S3/S4). Không cần giả định Enterprise/Studio/Approvals | Cùng tập module Community; quyền và addons cài thực tế vẫn cần kiểm tra |
| Tiếp cận | Linux containers qua Docker Compose trên máy này sau khi Engine/WSL/tài nguyên được xác minh | Python venv, source và tiến trình Odoo riêng; PostgreSQL instance/cluster riêng. S7 có hướng dẫn Windows; chưa có môi trường này |
| Cấu hình / mở rộng | Tự quản cấu hình và addons riêng; không sửa source chuẩn. S1/S2/S5 hỗ trợ cơ chế; chưa chứng minh phần bổ sung đạt G1-D01 | Có quyền sửa code module riêng theo mô hình S5/S7; thêm công quản lý dependency/phiên bản Python và PostgreSQL |
| Cô lập dữ liệu | Dự kiến project, network, volume DB và filestore riêng; cổng loopback khác cài đặt cũ, không nối DB hiện có | Dự kiến DB cluster/role, data directory, filestore, config và cổng riêng; không dùng dịch vụ Odoo/PostgreSQL hiện có |
| Khôi phục / chạy lại | Chốt image digest Odoo và PostgreSQL, addons revision, cấu hình đã loại bí mật, dữ liệu tổng hợp gốc. Dự kiến phục hồi đồng bộ DB và filestore hoặc tái tạo bộ dữ liệu trên môi trường lab mới (S1/S8) | Chốt source commit, Python/dependencies và PostgreSQL version; cùng nguyên tắc DB + filestore và bộ dữ liệu gốc. Nhiều thành phần host phải quản lý hơn |
| Phụ thuộc | Engine Linux hoạt động, WSL/ảo hóa hợp lệ, quyền Docker Desktop phù hợp, RAM/đĩa đủ; PostgreSQL mục tiêu major 15 theo ví dụ S1, patch/digest phải chốt; không dùng tag latest | Python/PostgreSQL và thư viện tương thích S7; quyền tạo thư mục/cluster/role riêng; đủ RAM/đĩa. Python có mặt chưa chứng minh dependency dùng được |
| Bằng chứng / trạng thái | S1–S5/S8/S9: tài liệu/source chính thức; CLI đã quan sát, Engine chưa tiếp cận. **Thiết kế mục tiêu, chưa chạy** | S5/S7/S8: tài liệu chính thức; package cục bộ chỉ là quan sát bổ sung. **Chưa thiết lập**, không coi dịch vụ đang chạy là ứng viên B đã sẵn sàng |

Tag là tham chiếu được công bố tại ngày đọc; chưa pull nên digest và tính sẵn có khi thiết lập chưa được xác minh. S1 có ví dụ Compose dùng Odoo 17.0: chỉ dùng làm căn cứ cơ chế chạy/volume/addons; không sao chép ví dụ đó để khẳng định cấu hình 19.0 đã hợp lệ. PostgreSQL 15 là lựa chọn kỹ thuật dự kiến cho lab, không là phiên bản PostgreSQL đã quan sát trên máy.

## 5. Đề xuất và điều kiện trước thiết lập

**Chọn A có điều kiện làm môi trường mục tiêu; trạng thái sẵn sàng vận hành vẫn chưa xác nhận.** Căn cứ là khả năng giữ riêng code/cấu hình/dữ liệu, gắn addons khi chuẩn thiếu và tái tạo cùng phiên bản cho phép thử hai thời điểm của G1-D01. Đây là suy luận thiết kế từ S1–S5/S8, chưa phải bằng chứng tính khả thi vận hành trên máy này. Không tuyên bố A nhẹ hơn B hoặc đã chạy được.

Phần dự kiến dùng chuẩn: dữ liệu nhà cung cấp/mặt hàng tối thiểu, PO, nhận hàng, vendor bill và các tham chiếu/cấu hình liên quan. Kết quả matching, ánh xạ GR, đối tượng đề nghị, kiểm tra hiện hành ở hai hành động và lịch sử ngoại lệ đều chuyển 3B xác minh. Không mặc định toàn bộ phần chuẩn đã đủ G1-D01.

Các điều kiện trước thiết lập được theo dõi riêng; hiện chưa điều kiện nào dưới đây đủ căn cứ để xác nhận môi trường sẵn sàng:

1. Xác minh Engine Linux/WSL có thể vận hành; làm rõ `VirtualizationFirmwareEnabled=False` và phiên bản WSL thực. S9 nêu yêu cầu WSL, RAM và bật ảo hóa. Không tự bật BIOS/Windows feature trong 3A.
2. Đánh giá lại RAM trống và đĩa sau khi xác định kích thước image, DB, filestore, backup; chưa có căn cứ đặt ngưỡng tải ERP hoặc cam kết máy đủ tài nguyên. Tổng 7,8 GiB gần mức RAM hệ thống 8 GB của Docker, trong khi RAM trống hiện thấp.
3. **Image digest:** xác minh tag mục tiêu còn truy cập được và chốt digest Odoo/PostgreSQL cùng PostgreSQL patch, module/dependency trước thiết lập. Chưa pull image hoặc quan sát digest cục bộ; tên tag chưa đủ bảo đảm tái tạo đúng bản.
4. **Khả năng khôi phục:** trước thiết lập phải xác định phương án phục hồi đồng bộ DB và filestore hoặc tái tạo từ dữ liệu gốc, phiên bản/code/cấu hình cần giữ và cách kiểm chứng phục hồi. Hiện mới có căn cứ tài liệu, chưa xác nhận khôi phục được. Việc thử phục hồi chỉ thực hiện khi bước thiết lập/lab được giao riêng; phải có bằng chứng thành công trước khi công bố khả năng chạy lại.
5. Xác nhận quyền dùng Docker Desktop đúng bối cảnh học tập/cá nhân hoặc tổ chức. Căn cứ edition Community là source công khai và license S5/S10; chưa xác minh quyền của gói Odoo cục bộ. Không đăng ký trial, mua gói hay chấp nhận điều khoản thay người dùng.
6. Có người phụ trách thiết lập, quyền tạo tài nguyên lab riêng và nhận diện ranh giới với dịch vụ hiện có; chốt cổng không xung đột trước khi tạo môi trường. Chưa cần kế toán/ngân sách thật.
7. Trước phép thử, duyệt giả định lab, hợp đồng dữ liệu tổng hợp, kết quả mong đợi và phạm vi thao tác được phép ở 3B; không chốt dung sai hoặc đóng OD trong 3A.

**Chỉ chuyển sang B nếu A không thể thực hiện do Engine/ảo hóa hoặc tài nguyên sau xác minh.** Windows source chưa được chứng minh nhẹ hơn hoặc dùng ít RAM hơn container; vẫn phải chứng minh cô lập, dependencies và khả năng phục hồi. Không chuyển sang cài đặt Odoo đang chạy chỉ vì thuận tiện. Nếu cả A/B thiếu tài nguyên hoặc quyền tiếp cận, giữ thiết kế mục tiêu và xin dữ kiện môi trường khác, không bắt đầu lab.

Giữ nguyên môi trường hiện có. Lượt 3A chỉ cập nhật tài liệu; chưa cài phần mềm, tải image, tạo database hoặc khởi động/dừng dịch vụ hay container. Danh sách điều kiện trên không cấp phép thực hiện các thao tác đó.

## 6. Nguồn chính thức và ngày truy cập

Tất cả nguồn dưới đây đã mở và đọc nội dung ngày **20/10/2026**, không chỉ dùng snippet. Khi trang HTML Odoo timeout, đã đọc source RST chính thức của đúng nhánh 19.0. Nhánh/tag có thể thay đổi; cần khóa revision khi thiết lập.

| Mã | URL / phiên bản | Nội dung hỗ trợ và giới hạn |
| --- | --- | --- |
| S1 | [Docker Official Image Odoo README](https://raw.githubusercontent.com/docker-library/docs/master/odoo/README.md), nội dung tại ngày đọc | Tag 19.0-20261015, PostgreSQL, Compose, volumes, addons; không chứng minh image có trên máy |
| S2 | [Odoo Dockerfile 19.0](https://github.com/odoo/docker/blob/master/19.0/Dockerfile) | Odoo 19.0 release 20261015; data volume và extra-addons; chưa kiểm tra image runtime |
| S3 | [Purchase manifest 19.0](https://raw.githubusercontent.com/odoo/odoo/19.0/addons/purchase/__manifest__.py) | Module Purchase, dependency account, LGPL-3; không xác nhận module đã cài trong DB |
| S4 | [Purchase Stock manifest 19.0](https://raw.githubusercontent.com/odoo/odoo/19.0/addons/purchase_stock/__manifest__.py) | PO, receipts, vendor bills for stock; dependencies stock_account/purchase; LGPL-3 |
| S5 | [Architecture Overview 19.0](https://raw.githubusercontent.com/odoo/documentation/19.0/content/developer/tutorials/server_framework_101/01_architecture.rst) | Community/Enterprise, business objects, module mở rộng và XML/CSV; không thiết kế module lab |
| S6 | [Control policies / matching 19.0](https://raw.githubusercontent.com/odoo/documentation/19.0/content/applications/inventory_and_mrp/purchase/manage_deals/control_bills.rst) | Control policy, Should Be Paid, chỉnh bill/đổi cờ; chưa chứng minh khóa đề nghị theo baseline |
| S7 | [Source install 19.0](https://raw.githubusercontent.com/odoo/documentation/19.0/content/administration/on_premise/source.rst) | Community source, Windows, Python/PostgreSQL/dependencies; không coi Python có sẵn là cài đủ |
| S8 | [Deployment / database manager 19.0](https://raw.githubusercontent.com/odoo/documentation/19.0/content/administration/on_premise/deploy.rst) | Cơ chế create/dump/restore có kiểm soát cho development/demo; chưa thử backup/restore |
| S9 | [Docker Desktop Windows requirements](https://docs.docker.com/desktop/setup/install/windows-install/), trang hiện hành | WSL/ảo hóa/RAM và điều kiện Desktop; chưa xác nhận cấu hình máy đủ điều kiện |
| S10 | [Odoo Community LICENSE 19.0](https://raw.githubusercontent.com/odoo/odoo/19.0/LICENSE) | License source công khai; không suy ra quyền Enterprise hoặc quyền dùng một môi trường cụ thể |

Trang HTML on-premise/source và control-bills đã thử nhưng timeout; đường cũ `advanced/3way_matching` không đọc được. Không dùng lỗi truy cập làm bằng chứng tính năng thiếu. Đã thay bằng nguồn chính thức S6/S7; không còn phụ thuộc phải suy tính năng từ snippet.

Giữ cùng dòng 19.0 không bảo đảm cùng build/edition. Các nhận xét 19.0 ở Đợt 2 về matching, bill từ PO, trạng thái và cấu hình/quyền phải đối chiếu trên image/module thực cài. Các nhận xét về Studio approval hoặc API/gói dịch vụ không tự áp dụng cho Community. Nếu đổi phiên bản sau này, phải đọc lại tài liệu/module của phiên bản đó và kiểm tra lại những nhận xét này trước dùng làm căn cứ; không sửa tài liệu Đợt 2 trong 3A.

## 7. Đầu vào chuyển sang 3B và điểm dừng

Bàn giao trong chính tài liệu này: phương án A, bản Odoo Community 19.0/tag mục tiêu, module dự kiến và PostgreSQL dự kiến tại mục 4; nguồn S1–S10; quan sát máy và các điều kiện mục 2/5. Danh sách cần xác minh ở 3B:

- Cơ chế tạo/giữ hóa đơn có PO khi chưa GR, quan hệ PO–receipt–bill, các trường bắt buộc và khả năng quan sát cấu hình thực tế.
- Đối tượng Đề nghị thanh toán có sẵn hoặc cần bổ sung; chỗ kiểm tra riêng khi chuẩn bị/gửi, xử lý kết quả cũ khi dữ liệu đổi và đường thao tác có thể vượt kiểm soát.
- Thiếu dữ liệu, sai lệch và đạt được phân biệt thế nào; đối chiếu lại, trạng thái ngoại lệ và thông tin người phụ trách/lý do/lịch sử; phần chuẩn/cấu hình/phải bổ sung.
- Phạm vi chỉnh sửa cho phép theo G1-D05; vai thử và bằng chứng tối thiểu, phiên bản kết quả; dữ liệu gốc và cách khôi phục đồng bộ. Đây là câu hỏi thiết kế tiếp, chưa là kịch bản/code lab.
- OD-04/05/06/07/08 liên quan: policy dung sai, chuyển cấp, trạng thái, quyền và nhận một phần. Chỉ dùng giả định lab được duyệt khi cần, không đóng OD; OD-01–03 và toàn bộ khoảng thiếu RTM giữ nguyên.

Chưa có câu hỏi bắt buộc để hoàn tất đề xuất 3A. Quyền sử dụng môi trường, người phụ trách và lựa chọn xử lý Docker/tài nguyên cần được xác nhận trước thiết lập, không phải căn cứ tự bắt đầu 3B.

Lựa chọn môi trường không chứng minh ERP đáp ứng baseline. Chưa thực hiện phép thử/lab, chưa đóng OD hoặc đặt policy/dung sai, chưa xác nhận tích hợp kế toán/ngân sách thật và chưa yêu cầu tái tạo toàn bộ tổ chức/master data NovaRetail. Chưa mở rộng sang phê duyệt đề nghị hoặc thực hiện thanh toán trong phép thử G1-D01. Không thay baseline, workflow, SIM, metric, prototype, README, case study hoặc tài liệu Đợt 2. Không cài đặt, chạy test/build, commit, push, merge hoặc bắt đầu 3B/3C.

## 8. Kiểm tra tài liệu 3A

Kiểm tra liên kết nội bộ đến sáu tài liệu nguồn, cấu trúc heading/bảng/code fence, whitespace và ký tự xuống dòng của file mới; `git diff --check` cùng kiểm tra riêng file chưa được theo dõi so với tệp rỗng ngoài repo. Đối chiếu lại SHA-256 nguồn với snapshot, HEAD và index; trạng thái Git chỉ được phát sinh `10-erp-lab/lab-design.md`. Kết quả kiểm tra thực tế được báo trong chat khi hoàn tất; không chạy test/build prototype.

## 9. 3B — Phạm vi và phương pháp Fit-to-Standard

**Bổ sung 3B ngày 20/10/2026 để duyệt; đây là thiết kế qua nguồn, chưa kiểm chứng trên ERP.** Mục 1–8 giữ nguyên bản 3A đã duyệt, kể cả các câu mô tả điểm dừng lịch sử của 3A. Môi trường mục tiêu vẫn được chọn có điều kiện; sẵn sàng vận hành chưa xác nhận. 3B không thực hiện các điều kiện thiết lập tại mục 5.

Đầu lượt: branch `erp-lab-design`, HEAD `132e5b338f1738df36a59039f59919f678c9c8be`; chỉ `10-erp-lab/lab-design.md` untracked, index rỗng, đúng brief. Không thấy AGENTS.md áp dụng khi kiểm tra repo, thư mục cha và thư mục tài liệu. Bản sao nguyên vẹn 3A, trạng thái Git và SHA-256 nguồn/tất cả file tracked được lưu ngoài repo tại `C:\Users\ASUS\AppData\Local\Temp\p2p-3b-183c01ce13cf4ae0904c85386ee7ce1b`; đã đọc lại snapshot. Không đổi branch hoặc cập nhật từ remote.

Đã đọc toàn văn 3A; đối chiếu lại [mục 16 và bằng chứng Đợt 2](../09-solution-evaluation/options-assessment.md), [G1-D01/05/06](../08-traceability/baseline-decisions.md), [BR-16–22](../04-to-be-design/business-rules.md), [FR-09–12, AC-12–16/29/30/35/36](../07-software-requirements/srs.md) và [OD/khoảng thiếu RTM](../08-traceability/requirements-traceability-matrix.md). ID được kiểm tra theo nội dung thực tế. Đặc biệt AC-30 yêu cầu hai lần kiểm tra và chuyển đến người phê duyệt Tài chính; gửi không phải phê duyệt. OD-04/05/06/07/08 về dung sai, chuyển cấp, trạng thái, quyền, nhận một phần vẫn mở; không suy thành policy lab. FR-12 chưa bao phủ mọi biến thể thay đổi điều kiện; toàn vẹn và thông tin trạng thái vẫn chỉ bao phủ một phần.

Phương pháp: đọc tài liệu chính thức, mã nguồn và view của đúng Community 19.0; lần theo đối tượng, liên kết, hàm và cấu hình liên quan. Không dùng tên tính năng hoặc snippet để xác nhận cơ chế chặn. Các nhãn ở mục 12 là đánh giá thiết kế: **chuẩn có bằng chứng hỗ trợ**, **cần cấu hình**, **cần mở rộng**, **cần thay đổi cách vận hành**, **chưa xác minh**; không nhãn nào là test đạt. Không coi cơ chế chưa tìm thấy là chỉ cần cấu hình.

## 10. 3B — Nguồn, phiên bản/module và giới hạn

Mã nguồn chính thức `odoo/odoo` được đọc tại commit cố định **`cf042239eb7af83a694069317beccb8a73aab38d`** (gọi là C19); `odoo/release.py` tại commit này xác nhận dòng 19.0. Đây là revision công khai được nhận diện từ metadata đã ghi ở 3A, không phải xác nhận nguồn của tiến trình cục bộ. **Chưa chứng minh C19 khớp image mục tiêu `odoo:19.0-20261015` hoặc digest của image.** Trước triển khai lab phải đối chiếu lại file/hành vi trên đúng artifact được chọn. Chưa kết luận cho toàn bộ mọi build 19.0.

Đã mở và đọc các nguồn dưới đây ngày **20/10/2026**; bản sao mã nguồn liên quan nằm trong thư mục tạm mục 9. Việc tải nguồn không cài dependency hoặc chạy mã Odoo.

| Mã | Nguồn cố định / module | Phần đọc có ý nghĩa cho G1-D01 |
| --- | --- | --- |
| B1 | [Release C19](https://github.com/odoo/odoo/blob/cf042239eb7af83a694069317beccb8a73aab38d/odoo/release.py), [Purchase manifest](https://github.com/odoo/odoo/blob/cf042239eb7af83a694069317beccb8a73aab38d/addons/purchase/__manifest__.py), [Purchase Stock manifest](https://github.com/odoo/odoo/blob/cf042239eb7af83a694069317beccb8a73aab38d/addons/purchase_stock/__manifest__.py) | Version 19.0; purchase phụ thuộc account, purchase_stock phụ thuộc purchase/stock_account; phạm vi Community công khai |
| B2 | [purchase/models/purchase_order.py](https://github.com/odoo/odoo/blob/cf042239eb7af83a694069317beccb8a73aab38d/addons/purchase/models/purchase_order.py), [purchase_order_line.py](https://github.com/odoo/odoo/blob/cf042239eb7af83a694069317beccb8a73aab38d/addons/purchase/models/purchase_order_line.py), [product.py](https://github.com/odoo/odoo/blob/cf042239eb7af83a694069317beccb8a73aab38d/addons/purchase/models/product.py) | purchase.order; action_create_invoice; _prepare_account_move_line; _compute_qty_invoiced; purchase_method ordered/received |
| B3 | [purchase/models/account_invoice.py](https://github.com/odoo/odoo/blob/cf042239eb7af83a694069317beccb8a73aab38d/addons/purchase/models/account_invoice.py), [view account_move_views.xml](https://github.com/odoo/odoo/blob/cf042239eb7af83a694069317beccb8a73aab38d/addons/purchase/views/account_move_views.xml) | account.move/line kế thừa; purchase_line_id, purchase_order_id; autocomplete; _compute_is_purchase_matched và Purchase Matching |
| B4 | [purchase_stock/models/purchase_order_line.py](https://github.com/odoo/odoo/blob/cf042239eb7af83a694069317beccb8a73aab38d/addons/purchase_stock/models/purchase_order_line.py), [stock_move.py](https://github.com/odoo/odoo/blob/cf042239eb7af83a694069317beccb8a73aab38d/addons/purchase_stock/models/stock_move.py), [account_invoice.py](https://github.com/odoo/odoo/blob/cf042239eb7af83a694069317beccb8a73aab38d/addons/purchase_stock/models/account_invoice.py) | move_ids/purchase_line_id; _prepare_qty_received từ stock move done; liên kết bill với stock move; không là bộ quy tắc đối chiếu NovaRetail |
| B5 | [stock/models/stock_picking.py](https://github.com/odoo/odoo/blob/cf042239eb7af83a694069317beccb8a73aab38d/addons/stock/models/stock_picking.py), [stock_move.py](https://github.com/odoo/odoo/blob/cf042239eb7af83a694069317beccb8a73aab38d/addons/stock/models/stock_move.py) | stock.picking, move_ids; stock.move, picking_id và state; mô hình nhận hàng nhiều thành phần |
| B6 | [purchase/models/res_config_settings.py](https://github.com/odoo/odoo/blob/cf042239eb7af83a694069317beccb8a73aab38d/addons/purchase/models/res_config_settings.py#L17), [view settings](https://github.com/odoo/odoo/blob/cf042239eb7af83a694069317beccb8a73aab38d/addons/purchase/views/res_config_settings_views.xml#L42), [addons tree C19](https://github.com/odoo/odoo/tree/cf042239eb7af83a694069317beccb8a73aab38d/addons) | module_account_3way_match và widget upgrade_boolean; kiểm tra danh mục và đường dẫn module, không suy checkbox là chức năng Community có sẵn |
| B7 | [account/models/account_move.py](https://github.com/odoo/odoo/blob/cf042239eb7af83a694069317beccb8a73aab38d/addons/account/models/account_move.py), [account/wizard/account_payment_register.py](https://github.com/odoo/odoo/blob/cf042239eb7af83a694069317beccb8a73aab38d/addons/account/wizard/account_payment_register.py) | action_post; action_register_payment/action_force_register_payment; wizard _create_payments/action_create_payments tạo, post và reconcile payment |
| B8 | [Control policies 19.0, documentation commit c9202e68ae702daec981b47d0b6055191084ffa2](https://github.com/odoo/documentation/blob/c9202e68ae702daec981b47d0b6055191084ffa2/content/applications/inventory_and_mrp/purchase/manage_deals/control_bills.rst) | Tài liệu Should Be Paid/Exception/sửa tay; dùng làm đối chiếu giới hạn, không chứng minh Community có implementation đó |

**Giới hạn quan trọng:** ở C19, B6 chỉ khai báo module tùy chọn `account_3way_match`, view dùng `upgrade_boolean`; danh mục Community đã đọc không có module này và truy vấn trực tiếp `addons/account_3way_match/__manifest__.py` trả 404. Không dùng B8 để kết luận bật cấu hình là Community có Should Be Paid hoặc khóa G1-D01. Không truy cập repo Enterprise hoặc dùng Studio/Approvals làm bằng chứng Community. Kết luận chỉ là chưa tìm thấy implementation tương ứng trong phạm vi Community đã đọc, không khẳng định mọi edition/build đều thiếu.

B3 tính `is_purchase_matched` dựa trên việc dòng hàng có `purchase_line_id`, không so sánh PO–GR–bill theo policy G1-D01. Hằng `TOLERANCE = 0.02` trong file này phục vụ tìm PO khớp tổng tiền, không được nhận làm dung sai nghiệp vụ NovaRetail. B4 tính số lượng nhận và B2 tính số lượng còn lập hóa đơn là hỗ trợ dữ liệu; chưa phải kết quả đối chiếu có phiên bản/ngoại lệ theo baseline.

Giới hạn tìm kiếm: chỉ đọc các file ở B1–B8, tìm theo matching/payment request/should-be-paid trong các file tải về và danh mục addons; không kiểm toán toàn bộ Odoo. Đường thử `purchase/views/account_invoice_views.xml` và `purchase_stock/models/stock_picking.py` trả 404; đã đọc đúng view account_move và model Stock thay thế. Một số URL raw qua công cụ web không truy cập được; bản sao chính thức được tải trực tiếp vào thư mục tạm để đọc. Không dùng lỗi tải làm bằng chứng sản phẩm thiếu tính năng.

## 11. 3B — Ánh xạ đối tượng và thao tác

| Khái niệm NovaRetail | Đối tượng/module Odoo | Mức tương đương | Bằng chứng | Giới hạn |
| --- | --- | --- | --- | --- |
| PO | purchase.order / purchase.order.line, purchase | Tương ứng chứng từ nguồn để lab | B2 | Không xác nhận tuyến/phát hành PO NovaRetail hoặc PR–PO đã đạt |
| GR / nhận hàng | stock.picking và stock.move; purchase_stock liên kết purchase_line_id | Tương đương một phần qua nghiệp vụ nhận hàng và dòng thực nhận | B4/B5 | GR baseline không mặc nhiên là một picking đơn lẻ; phải giữ đúng chứng từ/dòng/state được chọn, chưa xử lý policy nhận một phần |
| Hóa đơn nhà cung cấp | account.move loại in_invoice và account.move.line; account/purchase | Tương ứng bill nguồn, có liên kết dòng PO | B3/B7 | Không là đề nghị thanh toán; autocomplete ở form chưa chứng minh mọi đường lưu/link đều bị kiểm soát |
| Kết quả đối chiếu / ngoại lệ | is_purchase_matched, qty_received/qty_to_invoice hỗ trợ từng phần; chưa tìm thấy đối tượng kết quả/ngoại lệ đúng baseline trong nguồn đã đọc | Chưa tương đương | B2–B4/B6; B8 ngoài căn cứ Community | Không lấy cờ liên kết hoặc nhãn người dùng làm kết quả hợp lệ |
| Đề nghị thanh toán | Chưa tìm thấy đối tượng tương đương trong phạm vi nguồn đã đọc | Đề xuất đối tượng lab riêng | B3/B7 và giới hạn tìm kiếm mục 10 | Không kết luận toàn sản phẩm không có; không dùng Vendor Bill hoặc account.payment thay thế |
| Chuẩn bị đề nghị | Chưa tìm thấy thao tác đúng baseline; đề xuất hành động Chuẩn bị của lab | Cần mở rộng | B2/B3/B7 | Create Bill/action_post chuẩn bị/ghi nhận bill không phải chuẩn bị đề nghị |
| Gửi đề nghị | Chưa tìm thấy thao tác đúng baseline; đề xuất Gửi của lab đến hộp nhận Tài chính thử | Cần mở rộng | B7 | action_post không là gửi; Register Payment tạo payment, không là phê duyệt đề nghị; không gửi email thật |

## 12. 3B — Bảng Fit-to-Standard

Mức chắc chắn “cao qua nguồn” chỉ áp dụng cho hàm/trường đã đọc tại C19; “giới hạn” áp dụng cho kết luận chưa tìm thấy. Các cách bổ sung bên dưới là **đề xuất lab chờ duyệt**, chưa có code hoặc kết quả thực thi.

| Yêu cầu | Baseline | Cơ chế chuẩn quan sát qua nguồn | Cấu hình cần thiết | Khoảng thiếu | Cách xử lý đề xuất / phân loại | Bằng chứng | Mức chắc chắn |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Thiếu dữ liệu: chờ, khác sai lệch | BR-16/19; FR-09/10; AC-13/29/36 | Bill có liên kết dòng PO; qty_received/qty_to_invoice hỗ trợ dữ liệu | Module Purchase/Stock/Account; chọn control policy và đường ghi bill phù hợp dữ liệu tổng hợp, chưa chốt giá trị policy | Chưa thấy phân loại thiếu dữ liệu và khóa đề nghị. Đường ghi bill khi chưa GR cần kiểm tra thực tế | **Chuẩn hỗ trợ + cần cấu hình + cần mở rộng:** giữ bill/PO; kết quả chờ kèm danh sách thiếu; chặn hai hành động | B2–B5 | Cao về liên kết/số lượng; hành vi AC-29 chưa xác minh |
| Không đạt: ngoại lệ mở, chặn hai bước | BR-20/21; FR-11/12; AC-14/16/35 | is_purchase_matched chỉ phản ánh liên kết; checkbox 3-way gọi module chưa tìm thấy | Không có cấu hình Community được xác định đủ tạo khóa này | Chưa thấy ngoại lệ có trách nhiệm/lịch sử và hai điểm chặn đúng baseline | **Cần mở rộng:** lưu kết quả không đạt, ngoại lệ và guard dùng chung | B3/B6 | Cao về logic đã đọc; giới hạn tìm kiếm đối tượng |
| Chỉnh sửa chưa phải xử lý xong | G1-D01/05; BR-21; FR-11; AC-15 | Có dữ liệu bill/nguồn; không tìm thấy chu trình ngoại lệ theo baseline | Không xác định cấu hình thay thế | Thiếu phân biệt ghi sửa với xác nhận xử lý có điều kiện | **Cần mở rộng + thay đổi cách vận hành:** ghi hành động sửa; kết quả cũ mất hiệu lực, không đóng ngoại lệ; không sửa PO/GR bị giới hạn | B2–B4 | Giới hạn; thiết kế chưa thực thi |
| Đối chiếu lại không đạt: tiếp tục chặn | FR-10/11/12; AC-15/16 | Hàm số lượng tính lại theo dependencies không là lần đối chiếu baseline | Không có cấu hình đủ căn cứ | Chưa có lịch sử kết quả hiện hành và khóa gửi | **Cần mở rộng:** thêm lần đánh giá; không đạt giữ ngoại lệ mở và chặn | B2/B4/B6 | Cao về phạm vi hàm; khoảng thiếu giới hạn |
| Đối chiếu lại đạt: xác nhận xử lý, đủ điều kiện | BR-19–22; FR-10/11/12; AC-15/30 | Chưa thấy kết quả đạt đúng policy để tái sử dụng | Policy Mức B chưa đủ; không đặt dung sai | Không có căn cứ đổi cờ thành kết quả đạt | **Cần mở rộng:** kết quả hợp lệ/còn hiện hành mới xác nhận xử lý; đủ điều kiện khác tự gửi | B3/B6 | Chưa xác minh thuật toán/policy |
| Tự đổi nhãn đã xử lý không cấp điều kiện | G1-D01; BR-22; FR-12; AC-16 | B8 mô tả cờ sửa tay nhưng không là bằng chứng implementation Community | Không dùng nhãn/checkbox làm cấu hình cấp quyền đi tiếp | Chưa thấy guard đề nghị không phụ thuộc nhãn | **Cần mở rộng:** trạng thái xử lý do hệ thống quyết định từ kết quả; nhãn ghi chú không tham gia guard | B3/B6/B8 | Cao về giới hạn nguồn; guard chưa xây |
| Kiểm tra riêng khi chuẩn bị và gửi | BR-19/22; FR-12; AC-16/30 | Create Bill, action_post, Register Payment có mục đích khác | Quyền AP thử cần đề xuất riêng, không cấu hình nhầm thao tác chuẩn | Chưa tìm thấy đối tượng/hai hành động tương đương | **Cần mở rộng + thay đổi cách vận hành:** đối tượng đề nghị riêng, hai hành động cùng guard máy chủ | B2/B7 | Cao về mục đích hàm; giới hạn tìm kiếm |
| Điều kiện đổi giữa hai bước: bỏ kết quả cũ | G1-D01; FR-10/12; AC-16/30; mục 16 Đợt 2 | Dependencies chuẩn cập nhật số lượng/liên kết; chưa thấy snapshot/revision kết quả đề nghị | Chưa có cấu hình version guard được xác định | Kết quả đạt cũ hoặc nhãn cũ không chứng minh hiện hành | **Cần mở rộng:** revision dữ liệu/kết quả; kiểm tra nguyên tử tại gửi, chặn khi stale; kiểm tra thay đổi đồng thời | B2–B4/B7 | Chưa xác minh runtime; thiết kế đề xuất |

“Cần mở rộng” được chọn vì trong phạm vi nguồn đọc chưa xác định được cơ chế chuẩn phục vụ đúng đối tượng/hành động cần thử; không khẳng định đã chứng minh toàn bộ Community không có cách khác. Chưa có dòng nào được kết luận đạt G1-D01. Chuẩn ưu tiên dùng cho chứng từ, tham chiếu và thông tin hỗ trợ; không thay baseline bằng quy trình thanh toán chuẩn của ERP.

## 13. 3B — Thiết kế chức năng lab tối thiểu đề xuất

**Một phương án chính:** giữ chứng từ Community chuẩn, bổ sung một phần mở rộng lab nhỏ cho hồ sơ kết quả/ngoại lệ, đề nghị và kiểm tra hai thời điểm. Tên đối tượng, trạng thái, revision và quyền ở mục này đều là đề xuất phục vụ lab, chờ duyệt; không thêm vào baseline hoặc đóng OD. Chưa viết module, dữ liệu hay test.

### 13.1 Trách nhiệm và dữ liệu tối thiểu

| Thành phần đề xuất | Trách nhiệm / dữ liệu tối thiểu |
| --- | --- |
| Hồ sơ kiểm soát một chuỗi lab | Case ID, company, bill và các dòng bill, PO/dòng PO, tập receipt/move liên quan; revision hiện tại, danh sách thiếu dữ liệu. Đề xuất giới hạn một bill–một PO cho một case; không là policy bội số chứng từ NovaRetail |
| Lần đánh giá bất biến | Result ID, case, số lần đánh giá, Mức A/B, nguồn kết quả và phiên bản nguồn, revision dữ liệu, phiên bản quy tắc/hợp đồng, thời điểm/người hoặc tiến trình tạo; kết quả đề xuất: chờ dữ liệu / không đạt / đạt; lý do và thuộc tính liên quan. Không cho AP sửa giá trị kết quả hoặc trỏ tùy ý sang kết quả cũ |
| Ngoại lệ gắn case | Người phụ trách thử, lý do/thuộc tính sai lệch, hành động chỉnh sửa và lịch sử; trạng thái đề xuất mở / đã xử lý, được cập nhật từ đánh giá có kiểm soát. Thiếu dữ liệu hiển thị là chờ, không đánh đồng với sai lệch. Nếu đã có ngoại lệ rồi dữ liệu trở nên thiếu, giữ ngoại lệ chưa xử lý |
| Đề nghị lab | ID, tham chiếu bill/case/company, người chuẩn bị, nội dung đề nghị tối thiểu, người nhận Tài chính thử; Result ID/revision khi chuẩn bị và khi gửi, thời điểm; trạng thái đề xuất đã chuẩn bị / đã gửi. Không tạo account.payment, không có phê duyệt/trả lại/chuyển tiền |
| Bằng chứng kiểm tra | Attempt ID, correlation/case/request ID nếu có, hành động chuẩn bị/gửi, tác nhân/thời điểm, revision dữ liệu và Result ID thực dùng, nguồn/phiên bản, quyết định cho phép/chặn và lý do/thiếu gì. Giữ cả lần bị chặn, kể cả khi không tạo được đề nghị |

### 13.2 Hai thao tác và điều kiện bắt buộc

**Chuẩn bị:** AP thử chọn bill/case và yêu cầu chuẩn bị. Máy chủ kiểm tra quyền, tham chiếu và kết quả hiện hành trước khi tạo hồ sơ đề nghị ở trạng thái đã chuẩn bị; bị chặn thì chưa có đề nghị đủ điều kiện. Xem bill hoặc mở form nhập thông tin chưa được tính là đã chuẩn bị. Thông tin hoàn thiện trên đề nghị không được thay bill/case/company bằng ghi trực tiếp; đổi nguồn phải đi lại thao tác chuẩn bị có kiểm tra.

**Gửi:** AP thử gửi hồ sơ đã chuẩn bị. Máy chủ đọc lại dữ liệu và kết quả hiện hành, kiểm tra lại guard và đối chiếu revision đã chuẩn bị. Đạt mới ghi đã gửi, lưu bằng chứng và xuất hiện trong hộp nhận của vai Tài chính thử; chưa phê duyệt và không email/thanh toán thật. Không cho tạo thẳng đã gửi hoặc chỉ ghi trường trạng thái để vượt hành động.

Guard dùng chung phải yêu cầu: tác nhân được phép; case và chứng từ đúng quan hệ/company; dữ liệu bắt buộc đầy đủ; có kết quả từ nguồn hợp lệ, thuộc đúng case và phiên bản dữ liệu/quy tắc hiện tại; kết quả hiện hành là đạt. Tại gửi còn yêu cầu hồ sơ đang đã chuẩn bị và revision chuẩn bị khớp hiện tại. Bất kỳ điều kiện thiếu, stale hoặc không đọc/kiểm tra được đều chặn với lý do; không có nhánh miễn trừ bằng nhãn ngoại lệ. AC-30 mới được hỗ trợ ở thiết kế tiếp nhận/chuyển đến Tài chính; chưa kiểm chứng toàn bộ tiêu chí.

### 13.3 Tính hiện hành và thay đổi dữ liệu

Đề xuất dùng **revision dữ liệu tăng đơn điệu của case (D)** và **revision riêng cho mỗi lần công bố kết quả (R)**. D đại diện tập chứng từ/dòng và dữ liệu bắt buộc liên quan: định danh/tham chiếu, thành viên các tập dòng/chứng từ, company/nhà cung cấp/mặt hàng/đơn vị, số lượng/giá/tiền/trạng thái thuộc phạm vi hợp đồng thử. R nhận diện lần đánh giá, không thay cho D. Hồ sơ kết quả bất biến lưu D đã đánh giá, snapshot/dấu vân tay, phiên bản hợp đồng/quy tắc và nguồn fixture. Hồ sơ chuẩn bị gắn với D, R và các phiên bản đó. Mục 3C mới đặc tả trường cụ thể, chưa tạo dữ liệu. Chỉ nhìn write_date của bill hoặc cờ UI không đủ phát hiện thay đổi ở PO/receipt/dòng hoặc tập tham chiếu.

Thay đổi liên quan được phép, thêm/bớt/đổi liên kết làm tăng D; thay đổi phiên bản hợp đồng/quy tắc hoặc nguồn fixture cũng làm kết quả cũ không còn dùng được để cấp điều kiện. Kể cả dữ liệu đổi rồi quay về giá trị cũ vẫn cần lần đánh giá mới. Công bố kết quả mới làm tăng R và thay kết quả hiện hành, kể cả khi D không đổi: kết quả cũ giữ trong lịch sử, không được chọn lại để cấp điều kiện. Kết quả mới không đạt/chờ không được bỏ qua để dùng kết quả đạt trước. Ghi chú thuần mô tả hoặc nhãn người dùng không thay dữ liệu/nguồn đánh giá thì không tự tăng D hoặc tạo kết quả đạt; hành động chỉnh sửa vẫn được ghi lịch sử. Đánh giá lại không đạt giữ ngoại lệ mở; đạt mới hệ thống ghi đã xử lý và cho đủ điều kiện.

**Xử lý đề nghị đã chuẩn bị — lựa chọn mới chỉ phục vụ lab, chờ duyệt:** khi D, R hoặc phiên bản đã gắn với hồ sơ không còn khớp hiện tại, giữ nguyên ID/nội dung/lịch sử và trạng thái đã chuẩn bị, nhưng hiển thị tính hiện hành là cần kiểm tra lại và chặn gửi. Đây là cờ hiệu lực được suy ra, không thêm trạng thái vòng đời mới. Đề xuất AP dùng lại hành động Chuẩn bị trên chính hồ sơ đó; chỉ khi guard hiện hành đạt mới cập nhật liên kết phiên bản và bằng chứng chuẩn bị. Không bắt tạo đề nghị mới hoặc nhập lại toàn bộ nội dung. Không đạt/chờ thì giữ hồ sơ và tiếp tục chặn; khi gửi vẫn kiểm tra lại độc lập. Sau đã gửi không có chuyển trạng thái tiếp trong phạm vi lab này.

**Vì sao đề xuất chuẩn bị lại:** cách này giữ bằng chứng AP đã xem xét đề nghị theo phiên bản mới và giúp lab tránh dùng liên kết chuẩn bị cũ, kể cả kết quả mới vẫn đạt. Đây là lựa chọn thiết kế thận trọng cho lab, chưa là yêu cầu baseline bắt buộc. G1-D01/FR-12/AC-30 yêu cầu đối chiếu hiện hành đạt tại chuẩn bị và gửi; không quy định mọi thay đổi đều buộc AP thao tác chuẩn bị lại. Một thiết kế khác có thể kiểm tra lại đầy đủ ngay lúc gửi và cập nhật bằng chứng, nhưng không phải phương án chính đề xuất ở đây.

Trước khi cho gửi phải kiểm tra version và ghi trạng thái/bằng chứng trong cùng ranh giới giao dịch; thay đổi nguồn và công bố kết quả phải phối hợp trên cùng khóa case hoặc cơ chế tương đương. Không để dữ liệu đổi sau kiểm tra nhưng trước ghi đã gửi. Nếu chưa bảo đảm cơ chế này hoặc có xung đột thì chặn/thử lại có kiểm tra, chưa tuyên bố chống được thay đổi đồng thời. Đây là yêu cầu triển khai sau, chưa chọn mã SQL/thuật toán khóa. Thay đổi sau thời điểm đã gửi và vòng đời xử lý tiếp chưa thuộc lab này.

### 13.4 Nguồn kết quả, quyền tối thiểu và đường vượt kiểm soát

Với Mức A, chỉ tiến trình/người quản trị fixture thử được giao riêng mới công bố kết quả từ bộ kết quả định trước đã duyệt, kèm ID/revision và provenance; AP không có ô tự nhập đạt/không đạt để cấp điều kiện cho chính mình. Nguồn kết quả, phạm vi dữ liệu bắt buộc và quan hệ revision phải xác định được trước khi công bố. Đánh dấu đạt trong fixture không chứng minh chứng từ thực sự đối chiếu đạt; giao diện/bằng chứng phải ghi rõ Mức A.

AP thử chỉ đọc nguồn/kết quả, ghi nội dung đề nghị và yêu cầu hành động được phép; vai Tài chính thử chỉ nhận/xem hồ sơ đã gửi. Quyền chỉnh sửa dữ liệu thử hoặc công bố fixture tách khỏi AP; đây là phân quyền lab đề xuất, không chốt OD-07. Giữ nguyên giới hạn G1-D05: không dùng sửa trực tiếp PO đã duyệt/phát hành hay GR đã ghi nhận để mô phỏng thay đổi. Dùng thay đổi fixture/revision có kiểm soát hoặc chỉnh dữ liệu thực sự được phép; chưa cấp quyền sửa chứng từ nguồn ngoài baseline.

UI, RPC, import, create/write/copy và cập nhật quan hệ của các đối tượng bổ sung đều phải chịu guard/quyền phía máy chủ, không chỉ ẩn nút. Trường trạng thái, Result ID, revision và nhãn xử lý không nhận giá trị tùy ý từ AP; thao tác copy phải trở lại kiểm tra chuẩn bị và không giữ trạng thái đã gửi. Không dùng context do client tự đặt làm cách bỏ kiểm tra. Truy cập quản trị, SQL trực tiếp hoặc code được sửa bởi người đặc quyền ngoài mô hình tác nhân lab không được coi là đã kiểm soát; không tuyên bố bảo mật vận hành.

Xác nhận bill và Register Payment chuẩn **không tạo ra đề nghị lab hoặc trạng thái đã gửi**, nên không là đường tương đương để hoàn thành phép thử. Vai AP thử phải bị giới hạn quyền thanh toán/đường thao tác ngoài phạm vi; không suy từ việc không dùng nút đó là đã bị khóa. Nếu không thể cô lập các quyền này bằng cấu hình/quyền tối thiểu đã xác minh thì chưa thực hiện phép thử. Không mở rộng lab sang xây khóa thanh toán toàn ERP.

Mỗi lần cho phép/chặn phải có bằng chứng theo bảng 13.1, trước/sau trạng thái liên quan và phiên bản module/cấu hình. Lần bị từ chối vẫn phải giữ được bằng chứng; không thiết kế log chỉ nằm trong giao dịch sau đó bị rollback mất. Bằng chứng về attempt lỗi hoặc rollback có thể được lưu bằng log kỹ thuật của tiến trình kiểm tra, kèm mã tương quan. Không mặc định bản ghi bằng chứng trong cùng transaction vẫn tồn tại sau rollback. Cơ chế lưu bền cần được xác minh khi triển khai; lịch sử chatter chuẩn có mặt không chứng minh đủ audit. Phạm vi này chưa chứng minh audit bất biến trong vận hành. Log/ảnh không chứa mật khẩu hoặc dữ liệu thật.

## 14. 3B — Hai mức kiểm chứng và giới hạn dự kiến

| Nội dung | Mức A — Cơ chế chặn, đề xuất bắt đầu | Mức B — Đối chiếu ba bên, chưa đủ điều kiện |
| --- | --- | --- |
| Nguồn kết quả | Kết quả định trước đã duyệt, ID/phiên bản/provenance rõ, công bố có kiểm soát và gắn đúng revision | Kết quả thực sự tính từ chứng từ chuẩn theo thuộc tính, đơn vị, phạm vi và policy đã xác định |
| Phần cần chứng minh khi thực hiện sau | Hai hành động chỉ qua khi kết quả hợp lệ còn hiện hành đạt; thiếu/không đạt/stale/đổi nhãn không cho đi tiếp; lưu bằng chứng các lần kiểm tra | Ngoài guard, phải chứng minh đầu vào, tính đầy đủ dữ liệu, thuật toán và kết quả đối chiếu đúng quy tắc được duyệt |
| Giới hạn | Không chứng minh PO–GR–bill thực sự đối chiếu đúng hoặc FR-10/AC-12 đạt; kết quả định trước là giả lập có công bố | OD-04/08 và thuộc tính/chính sách liên quan chưa đủ; không mặc định dung sai 0 hoặc dùng tolerance tìm PO làm policy |
| Vai trò chuẩn Community | Chứng từ, liên kết và số lượng là nguồn/tham chiếu; không lấy is_purchase_matched làm kết quả | Có thể tái sử dụng dữ liệu/hàm phù hợp sau đối chiếu; chưa xác định thuật toán chuẩn đáp ứng baseline |

Mức A là đề xuất phạm vi kiểm chứng ban đầu, không là kết quả đã đạt và không thay thế Mức B. Phần ngoại lệ/đối chiếu lại ở Mức A chỉ minh họa xử lý theo chuỗi kết quả định trước, không chứng minh thuật toán phát hiện sai lệch. Các giả định phải được duyệt trước thiết kế dữ liệu và kịch bản tại 3C. Không cần tích hợp kế toán/ngân sách thật hoặc tái tạo toàn tổ chức/master data NovaRetail.

## 15. 3B — Quyết định cần duyệt trước 3C và kiểm tra

Ba quyết định đề nghị chủ dự án duyệt trên thiết kế cụ thể này:

1. **Phạm vi kết quả:** bắt đầu Mức A, dùng kết quả định trước có provenance/revision được công bố bởi vai riêng; Mức B hoãn đến khi đủ policy, không coi A là kiểm chứng thuật toán đối chiếu.
2. **Phần bổ sung tối thiểu:** dùng chứng từ Community chuẩn, thêm hồ sơ kiểm soát/kết quả/ngoại lệ và đề nghị riêng với hai thao tác; duyệt giới hạn một bill–một PO/case, trạng thái/quyền lab đề xuất, revision và nguyên tắc chặn/chuẩn bị lại khi thay đổi. Chưa phê duyệt/trả lại đề nghị, chưa chuyển tiền; không sửa baseline hoặc OD.
3. **Căn cứ chuyển 3C:** dùng thiết kế này để đặc tả hợp đồng dữ liệu/kịch bản sau khi duyệt 1–2; ghi rõ C19 chưa khớp image mục tiêu, phải đối chiếu artifact khi thiết lập. Mọi điều kiện Engine/WSL, tài nguyên, digest và khôi phục của mục 5 giữ nguyên trước thiết lập; 3C về dữ liệu/kịch bản không tự cấp phép cài đặt hoặc khởi động dịch vụ.

Kiểm tra hoàn tất 3B: phần 3A phải khớp byte với bản sao đầu lượt; các file tracked và nguồn baseline giữ SHA-256; kiểm tra liên kết nội bộ, heading/bảng/fence, whitespace và file untracked riêng; `git diff --check`; branch/HEAD/index giữ nguyên và status chỉ có tài liệu được phép. Kết quả thực tế được báo trong chat sau kiểm tra. Không tạo module, test, dữ liệu mẫu hoặc tài liệu riêng; chưa cài đặt, chạy ERP/dịch vụ/container, truy cập database, commit, push hoặc bắt đầu 3C. Quyền/audit/tích hợp/toàn vẹn toàn P2P ở mức vận hành vẫn chưa được chứng minh.

## 16. 3C — Đầu vào được duyệt và phạm vi đặc tả

**3B đã được chủ dự án chấp thuận làm đầu vào theo chỉ dẫn trong chat.** Phần 3A/3B phía trên giữ nguyên, kể cả ghi chú lịch sử “chờ duyệt/chưa bắt đầu 3C”. Phần 3C này đặc tả dữ liệu và kịch bản **Mức A**, chưa là kết quả chạy ERP. Tất cả fixture dưới đây là đặc tả tổng hợp trong tài liệu, chưa tạo file dữ liệu, nạp database hoặc chạy test. Những lựa chọn mới ở mục 21 chỉ phục vụ lab và còn cần duyệt trước triển khai.

Đầu lượt: branch `erp-lab-design`, HEAD `132e5b338f1738df36a59039f59919f678c9c8be`, index rỗng; chỉ file này untracked, phù hợp trạng thái đã biết. Không tìm thấy AGENTS.md áp dụng. Bản sao tài liệu trước 3C, trạng thái Git và SHA-256 nguồn/127 file tracked được lưu và đọc lại tại `C:\Users\ASUS\AppData\Local\Temp\p2p-3c-b838b846f8534f7790fde90b724afe9e`. Không đổi branch, reset hoặc cập nhật từ remote.

Đã rà lại G1-D01/05/06, FR-09–12, AC-13–16/29/30/35/36 và OD liên quan từ các nguồn nội bộ ở mục 9. Không bổ sung kết luận về chức năng Odoo ngoài nghiên cứu 3B. Mục tiêu vẫn là cơ chế chặn dựa trên kết quả định trước có kiểm soát; chưa tính đối chiếu ba bên, đặt dung sai, đóng OD hoặc công bố tiêu chí baseline đã đạt. Chuẩn bị lại trên cùng hồ sơ là lựa chọn lab đã mô tả ở mục 13.3, không phải yêu cầu baseline mới.

## 17. 3C — Từ điển trường dữ liệu tối thiểu

Tên trường là tên khái niệm cho lab, chưa phải schema/module Odoo. ID nghiệp vụ dưới đây là khóa tổng hợp để ánh xạ sau này; chưa có database ID. Trừ trường ghi rõ tùy chọn hoặc điều kiện, trường là bắt buộc. Số lượng/đơn giá dùng decimal; thời điểm bằng UTC có timezone, do máy chủ ghi khi thực hiện sau này. Không dùng thời gian fixture làm thời gian quan sát thật.

### 17.1 Case và snapshot nguồn

| Trường | Kiểu / điều kiện | Nguồn và ý nghĩa |
| --- | --- | --- |
| run_id | Chuỗi, duy nhất mỗi lần dựng lại | Người điều phối tạo; ngăn lẫn bằng chứng/counter giữa các lần chạy |
| case_id, company_ref | Hai chuỗi, bắt buộc | Định danh chuỗi lab và công ty tổng hợp |
| bill_ref, po_ref | Hai tham chiếu, bắt buộc | Một bill–một PO/case; không cho AP đổi trực tiếp nguồn đề nghị |
| bill_line_ref, po_line_ref | Hai tham chiếu, bắt buộc | Liên kết dòng bill đến đúng dòng PO; chưa hỗ trợ nhiều dòng trong fixture cơ sở |
| receipt_refs, move_refs | Hai tập tham chiếu đã sắp thứ tự | Có thể rỗng khi thiếu GR; nếu có phải xác định đúng receipt/move và PO line |
| supplier_ref, product_ref, uom_ref, currency_ref | Bốn chuỗi, bắt buộc | Các tham chiếu nguồn được snapshot; không lấy nhãn hiển thị làm khóa |
| po_state, bill_state, receipt_state, move_state | Chuỗi trạng thái nguồn | Bill fixture là draft; receipt/move state có thể null khi chưa có GR. Không là trạng thái đề nghị |
| qty_ordered, qty_billed, unit_price_po, unit_price_bill | Bốn decimal, bắt buộc | Giá trị chứng từ nguồn; ghi để truy bằng chứng, chưa áp thuật toán matching |
| qty_received | Decimal hoặc null | Null khi chưa có GR; 0 là số lượng đã biết, không thay thế ý nghĩa chưa có dữ liệu |
| D | Số nguyên dương, chỉ hệ thống tăng | Revision tập nguồn/tham chiếu. Khởi đầu 1 cho mỗi case/run, không giảm khi hoàn nguyên dữ liệu |
| source_snapshot_id, source_fingerprint | Chuỗi định danh và digest | Snapshot bất biến của dữ liệu thuộc D; digest thực chỉ tạo khi triển khai, chưa bịa giá trị hash |
| required_missing | Tập tên trường/quan hệ thiếu | Suy từ hợp đồng CTRL-A/1; ví dụ receipt_refs, move_refs, qty_received. Không suy thiếu dữ liệu thành sai lệch |
| contract_version, fixture_source_version | Hai chuỗi, bắt buộc | Phiên bản hợp đồng cơ chế và bộ nguồn định trước; thay đổi làm liên kết kết quả cũ mất hiệu lực, không tự đổi D nếu dữ liệu không đổi |

CTRL-A/1 yêu cầu tất cả tham chiếu bắt buộc ở bảng trên xác định được, đúng company và liên kết; PO/bill có dòng hợp lệ; muốn đủ dữ liệu nhận hàng phải có receipt/move liên quan ở trạng thái done và qty_received đã biết. Đây là **hợp đồng dữ liệu lab đề xuất**, không chốt chính sách nhận một phần hoặc thời điểm ghi sổ hóa đơn. Snapshot gồm cả trạng thái và thành viên các tập; fingerprint không gồm ghi chú mô tả, nhãn thủ công hoặc timestamp log. Cách tuần tự hóa để tính digest phải cố định thứ tự khóa/tập và biểu diễn decimal khi triển khai; digest không thay cho D tăng đơn điệu.

### 17.2 Kết quả và ngoại lệ

| Trường | Kiểu / điều kiện | Quy tắc kiểm soát |
| --- | --- | --- |
| result_id, R | Chuỗi duy nhất và số nguyên dương | R tăng mỗi lần công bố mới trong case/run, không reset khi D tăng |
| result_case_ref, evaluated_D, evaluated_snapshot_id | Tham chiếu case, số nguyên, tham chiếu snapshot | Bắt buộc khớp case/run và phiên bản nguồn được đánh giá |
| result_contract_version, result_source_version, fixture_step_id | Ba chuỗi | Provenance đến đúng bước đã duyệt trong manifest nguồn; không cho AP tự chọn giá trị |
| verification_level, outcome | Enum | Level luôn A; outcome là WAIT / FAIL / PASS tương ứng chờ / không đạt / đạt |
| reason_code, reason_detail, missing_fields | Chuỗi, chuỗi, tập tên trường | WAIT nêu thiếu gì; FAIL nêu nội dung giả lập; PASS vẫn phải thỏa điều kiện đầy đủ/đúng tham chiếu |
| published_by, published_at | Actor ID và UTC timestamp | Chỉ PUB-A công bố qua thao tác kiểm soát; kết quả đã công bố không được sửa nội dung |
| current_result_ref | Tham chiếu chỉ do máy chủ quản lý; có thể null | Trỏ lần công bố mới nhất, không tìm “PASS mới nhất”. Có thể trỏ kết quả đã stale để giữ lịch sử, nhưng không cho dùng |
| exception_id, owner_ref, exception_state | ID, actor, enum OPEN / RESOLVED | Chỉ tồn tại khi đã có FAIL; hệ thống cập nhật từ kết quả hiện hành. WAIT sau FAIL giữ OPEN |
| correction_note, user_label | Chuỗi tùy chọn | Chỉ mô tả hành động/nhãn người dùng; không cấp điều kiện và không tự đổi exception_state |

### 17.3 Đề nghị, lệnh và bằng chứng

| Trường | Kiểu / điều kiện | Quy tắc kiểm soát |
| --- | --- | --- |
| request_id, request_case_ref, request_bill_ref | ID và hai tham chiếu | Hồ sơ tạo sau chuẩn bị đạt; gắn run/company. Một đề nghị cho một bill trong một run, kể cả bill bị đưa vào case alias |
| request_state | Enum PREPARED / SUBMITTED | Không thêm trạng thái stale; hiệu lực được suy từ phiên bản |
| request_note, recipient_ref | Chuỗi và actor ref | Nội dung thử; người nhận FIN-A. Không có tài khoản ngân hàng hay lệnh chuyển tiền |
| prepared_binding, sent_binding | Tuple (D, R, contract_version, fixture_source_version, snapshot_id) | Prepared bắt buộc sau chuẩn bị; sent null trước gửi. Máy chủ ghi, AP không tự đặt |
| prepared_by, prepared_at, sent_by, sent_at | Actor/UTC | Hai trường sent null trước gửi; lưu lịch sử mọi lần chuẩn bị lại, không xóa binding cũ khỏi bằng chứng |
| freshness | Giá trị suy ra CURRENT / STALE | So prepared_binding với phiên bản hiện tại; nhãn hiển thị stale là cần kiểm tra lại |
| command_key, command_action, expected_binding | Chuỗi, PREPARE / SEND, tuple | Khóa thử lại và phiên bản client kỳ vọng; expected_binding không là nguồn tin để cho phép, máy chủ phải đọc lại |
| command_payload_digest, command_owner, command_outcome | Digest, actor, enum | Để phát hiện cùng key khác nội dung/actor; không dùng key làm quyền truy cập |
| attempt_id, correlation_id, scenario_id | Ba chuỗi | Mỗi lần gọi có attempt riêng; liên kết retry với lệnh gốc và kịch bản |
| observed_binding, decision, decision_reason | Tuple, ALLOW / BLOCK / REPLAY / ERROR, mã lý do | Ghi phiên bản máy chủ đã đọc, không chỉ phiên bản client gửi; chưa có actual value trước khi chạy |
| delivery_id | ID tùy chọn | Bản ghi tiếp nhận nội bộ FIN-A, duy nhất theo request_id; chỉ tồn tại khi gửi commit thành công |

Không có trường dung sai, phần trăm cho phép, threshold hoặc override. Phạm vi trường nguồn phục vụ nhận diện/hiện hành, không phải từ điển toàn P2P.

## 18. 3C — Bộ fixture tổng hợp có phiên bản và điều kiện đầu

### 18.1 Quy ước chung

Manifest đề xuất **FX-A/1**, hợp đồng **CTRL-A/1**, run đầu dự kiến **RUN-A-001**; mọi dòng đều level A. Actor: **PUB-A** công bố kết quả theo manifest; **SRC-A** điều phối thay đổi nguồn hợp lệ; **AP-A** chuẩn bị/gửi; **FIN-A** nhận/xem; **VIEW-A** chỉ xem. PUB-A và SRC-A không phải AP-A. Phân quyền này phục vụ lab, không đóng OD-07.

Mọi fixture dùng công ty **CO-LAB**, NCC **SUP-LAB**, mặt hàng hữu hình **ITEM-LAB**, đơn vị **EA**, tiền tệ **VND**; một dòng/PO và một dòng/bill; qty_ordered=10, unit_price_po=unit_price_bill=10000. PO ở trạng thái purchase, giữ cố định; bill draft. Receipt/move nếu có ở done, qty_received=10, gắn đúng PO line. Không tạo giá trị thuế, thanh toán một phần hoặc dung sai. Giá và số lượng là dữ liệu tổng hợp, **không là quy tắc tự tính PASS/FAIL**.

Với mã case X ở bảng dưới, dùng khóa `PO-X`, `POL-X-1`, `BILL-X`, `BL-X-1`, `GR-X-1`, `MOVE-X-1`; ID kết quả `RES-X-Rn`; snapshot `SN-X-Dn`; ID đề nghị mong đợi sau chuẩn bị `REQ-X`. Các khóa này là **dự kiến**, chưa có bản ghi thực. Mỗi case bắt đầu không có đề nghị, delivery hoặc ngoại lệ, R chưa phát sinh (ký hiệu R=0, không phải kết quả hợp lệ), trừ checkpoint được chỉ rõ.

| Fixture / case X | Điều kiện nguồn đầu D1 | Bước công bố đầu FX-A/1 | Trạng thái điều kiện mong đợi | Trạng thái thực hiện |
| --- | --- | --- | --- | --- |
| F-M / M | BILL-M draft, qty_billed=10; receipt_refs/move_refs rỗng, qty_received=null | M-01: R1, evaluated_D=1, WAIT, MISSING_GR; missing={receipt_refs,move_refs,qty_received} | Không đủ dữ liệu; chưa có ngoại lệ sai lệch; chặn chuẩn bị/gửi | Chưa thực hiện |
| F-E / E | BILL-E draft, qty_billed=11; GR-E-1/MOVE-E-1 đủ như quy ước | E-01: R1/D1 FAIL, FIXTURE_QTY_REVIEW; detail=đầu ra không đạt định trước cho dòng BL-E-1 | Ngoại lệ OPEN, owner=AP-A; chặn hai thao tác | Chưa thực hiện |
| F-P / P | BILL-P draft, qty_billed=10; GR-P-1/MOVE-P-1 đủ | P-01: R1/D1 PASS, FIXTURE_PASS | Đủ điều kiện chuẩn bị; chưa có đề nghị/delivery | Chưa thực hiện |
| F-C / C | BILL-C draft, qty_billed=10; GR-C-1/MOVE-C-1 đủ | C-01: R1/D1 PASS, FIXTURE_PASS | Đầu vào cho đổi nguồn giữa chuẩn bị/gửi | Chưa thực hiện |
| F-R / R | BILL-R draft, qty_billed=10; GR-R-1/MOVE-R-1 đủ | R-01: R1/D1 PASS, FIXTURE_PASS | Đầu vào cho thay kết quả khi D không đổi | Chưa thực hiện |

Mọi kết quả đầu dùng contract=CTRL-A/1, source=FX-A/1; PUB-A được ghi là người công bố **mong đợi**, published_at để trống cho đến thực hiện. Các chuỗi logical step bên dưới có thứ tự; không suy chúng là lịch sử đã chạy.

### 18.2 Các bước tiến triển được phép trong manifest

| Bước | Thay đổi cụ thể và điều kiện trước | D/R sau bước | Kết quả/hiệu lực mong đợi | Trạng thái thực hiện |
| --- | --- | --- | --- | --- |
| M-02 | SRC-A bổ sung một receipt/move mới GR-M-1/MOVE-M-1 theo luồng ghi nhận hợp lệ, qty_received=10; không sửa GR đã ghi nhận | D2; R vẫn 1, R1/D1 stale | Đủ nguồn nhưng chưa có kết quả dùng được; tiếp tục chặn | Chưa thực hiện |
| M-03 | PUB-A công bố bước tiếp, gắn SN-M-D2 | R2/D2 PASS | Đủ điều kiện chuẩn bị | Chưa thực hiện |
| E-02 | AP-A ghi correction_note=đã liên hệ NCC; không sửa số lượng hay liên kết | D1/R1 giữ nguyên | Ngoại lệ OPEN; chưa cấp điều kiện | Chưa thực hiện |
| E-03 | PUB-A công bố lần đánh giá định trước tiếp theo trên cùng SN-E-D1 | R2/D1 FAIL, FIXTURE_QTY_REVIEW | Ngoại lệ tiếp tục OPEN | Chưa thực hiện |
| E-04 | SRC-A được phép sửa BILL-E đang draft: qty_billed 11→10, giữ BL-E-1/POL-E-1; không sửa PO/GR | D2; R2/D1 stale | Ngoại lệ giữ OPEN; chặn khi chưa có kết quả mới | Chưa thực hiện |
| E-05 | PUB-A công bố gắn SN-E-D2 | R3/D2 PASS | Ngoại lệ RESOLVED bằng hệ thống; đủ điều kiện chuẩn bị | Chưa thực hiện |
| C-02 | Sau chuẩn bị REQ-C ở D1/R1, SRC-A sửa BILL-C draft qty_billed 10→11 qua đường hợp lệ | D2; R1/D1 stale | REQ-C giữ PREPARED nhưng STALE; chặn gửi | Chưa thực hiện |
| C-03 | PUB-A công bố gắn SN-C-D2 | R2/D2 FAIL, FIXTURE_QTY_REVIEW | Ngoại lệ OPEN; REQ-C vẫn STALE và bị chặn | Chưa thực hiện |
| C-04 | SRC-A sửa BILL-C draft qty_billed 11→10, không thay định danh | D3; R2/D2 stale | Không quay về D1 dù giá trị trở lại 10 | Chưa thực hiện |
| C-05 | PUB-A công bố gắn SN-C-D3 | R3/D3 PASS | Đủ điều kiện kiểm tra chuẩn bị lại, chưa tự gửi; REQ-C vẫn STALE đến khi AP-A chuẩn bị lại | Chưa thực hiện |
| R-02 | Sau chuẩn bị REQ-R ở D1/R1, PUB-A công bố đầu ra định trước tiếp theo, dữ liệu nguồn không đổi | R2/D1 FAIL, FIXTURE_REVIEW_REVISED | Không dùng R1 PASS; REQ-R STALE; ngoại lệ OPEN | Chưa thực hiện |
| R-03 | PUB-A công bố bước kế tiếp trên cùng D1 | R3/D1 PASS, FIXTURE_PASS | Vẫn cần chuẩn bị lại trên REQ-R do R đổi; sau đó mới thử gửi | Chưa thực hiện |

Các bước R-02/R-03 cố ý thay đầu ra giả lập khi cùng dữ liệu để cô lập cơ chế chọn kết quả mới nhất. Chúng **không mô tả kết quả tất định của thuật toán matching thật** và không xác nhận dữ liệu đã đối chiếu đạt/không đạt. PUB-A chỉ phát hành bước kế tiếp đã duyệt, không nhập kết quả tùy ý. Source thay đổi hợp lệ là M-02/E-04/C-02/C-04; công bố kết quả R-02 là thay kết quả giả lập, không được ghi thành thay chứng từ.

### 18.3 Biến thể âm và checkpoint tái lập

Mỗi kịch bản mục 20 dùng run độc lập `RUN-<scenario_id>-01`, cùng dữ liệu fixture và tiền tố run cho mọi khóa. Các bước prerequisite trong cùng kịch bản dùng cùng run. D/R chỉ tăng trong run; dựng lại dùng run mới, không xóa lịch sử để tái sử dụng counter/command_key. “Checkpoint” là trạng thái cần dựng rồi xác minh khi triển khai, **chưa phải bản backup đã tồn tại**.

| Biến thể / checkpoint | Định nghĩa điều kiện đầu cụ thể | Trạng thái thực hiện |
| --- | --- | --- |
| CP-P | F-P sau P-01 và AP-A chuẩn bị; REQ-P PREPARED, binding=(1,1,CTRL-A/1,FX-A/1,SN-P-D1); 1 request, 0 delivery | Chưa thực hiện |
| CP-C | F-C sau C-01 và chuẩn bị tương tự CP-P, dùng REQ-C/SN-C-D1 | Chưa thực hiện |
| CP-R | F-R sau R-01 và chuẩn bị tương tự, dùng REQ-R/SN-R-D1 | Chưa thực hiện |
| N-REF | Bản sao F-P nhưng BL-P-1 tham chiếu POL-OTHER-1 không tồn tại, đánh dấu thiếu/không hợp lệ; không công bố PASS hợp lệ | Chưa thực hiện |
| N-PASS | F-M ở D1; cố công bố PASS thay vì bước M-01 bằng PUB-A | Chưa thực hiện |
| N-OLD | F-R sau R-02; yêu cầu gửi chỉ định RES-R-R1 hoặc cố công bố lại bước R-01 thành R3 | Chưa thực hiện |
| N-VERSION | CP-P; đổi contract hiện hành CTRL-A/1→CTRL-A/2 hoặc source FX-A/1→FX-A/2 bằng vai điều phối; nội dung v2 chưa được duyệt | Chưa thực hiện |
| N-ALIAS | CP-P; cố tạo case P-ALT khác ID nhưng cùng run/company và BILL-P | Chưa thực hiện |

N-VERSION chỉ dùng kiểm tra chặn phiên bản không được hỗ trợ; không thiết kế policy hoặc fixture v2. Nhãn user_label=đã xử lý trong ca âm chỉ là dữ liệu mô tả; không giả mạo field hệ thống thành công để dựng checkpoint.

## 19. 3C — Quy tắc kiểm tra bốn điểm đã review

### 19.1 Thay đổi nguồn hợp lệ

Trước M-02/E-04/C-02/C-04, SRC-A phải được cấp đúng quyền lab, xác minh nguồn thuộc run/company/case và trạng thái cho phép. Sửa bill chỉ khi draft; nếu đã posted thì chặn, không tự reset về draft. Bổ sung receipt mới theo luồng hợp lệ không là sửa GR done. Tại Mức A chưa có ERP, các snapshot kế tiếp chỉ mô tả thay đổi dự kiến; khi triển khai nếu đường chuẩn không thực hiện được thì ghi khoảng thiếu, không dùng SQL hay sửa PO/GR để ép qua.

Thay đổi nguồn, tăng D, ghi snapshot và vô hiệu điều kiện cũ phải nhất quán. Nếu quan sát nguồn không khớp snapshot/D mà chưa có thay đổi hợp lệ được ghi, chặn với SOURCE_DRIFT; không tiếp tục tin counter cũ. Ghi chú/nhãn riêng không làm tăng D. Những sửa đổi ngoài tập theo dõi hoặc quyền chưa được duyệt chưa phải đường thay đổi được phép.

### 19.2 Không dùng lại kết quả đạt cũ

Máy chủ chọn current_result_ref từ lần công bố mới nhất của đúng run/case; kiểm tra D/snapshot, contract/source, provenance và tính đầy đủ trước xem outcome. Không truy tìm PASS gần nhất, không nhận Result ID do AP chỉ định như quyết định cuối. R tăng theo thứ tự công bố; retry cùng fixture_step_id trả về cùng result đã tạo, không sinh R mới. Replay bước cũ sau bước mới, tự đổi evaluated_D của kết quả cũ hoặc gán lại current_result_ref đều bị chặn. Một PASS mới chỉ hợp lệ nếu có bước tiếp đã duyệt và đúng binding, không phải “đóng dấu R mới” lên PASS cũ.

### 19.3 Kiểm tra nhất quán khi gửi

Đơn vị kiểm tra là case cùng đề nghị/bill liên quan, phiên bản hợp đồng/nguồn và quyền actor. Đọc lại nguồn, chọn kết quả, so binding chuẩn bị, kiểm tra guard, ghi SUBMITTED và tạo delivery nội bộ phải có thứ tự nhất quán với mọi thay đổi nguồn/công bố kết quả. Dùng khóa hoặc cơ chế tương đương khi triển khai; chưa chọn công nghệ khóa ở 3C.

Nếu writer nguồn/kết quả hoàn tất trước lượt kiểm tra gửi thì sender phải thấy phiên bản mới và chặn binding cũ. Nếu gửi commit trước writer thì bằng chứng phải chứng minh đúng binding tại thời điểm gửi; thay đổi xảy ra sau không được diễn giải thành lỗi dùng kết quả cũ ở thời điểm trước. Không cho trạng thái nửa chừng: SUBMITTED nhưng chưa có delivery hoặc có delivery trong khi đề nghị vẫn PREPARED. Không bảo đảm được nhất quán hoặc gặp lỗi đọc/xung đột không giải quyết được thì chặn/thử lại có kiểm tra, không mặc định cho qua.

### 19.4 Chống tạo/gửi trùng — lựa chọn lab mới cần duyệt

Đề xuất chỉ một request cho `(run_id, company_ref, bill_ref)` xuyên mọi case alias, không chỉ chặn theo case_id. PREPARE lại dùng cùng request_id và giữ lịch sử binding; không tạo bản thứ hai. Đề nghị đã SUBMITTED không được chuẩn bị lại. Một delivery cho request_id; gửi lại đã thành công chỉ trả thông tin lần gửi trước, không thêm delivery hoặc payment. Đây là giới hạn lab một bill/một đề nghị/run, **không chốt policy thanh toán một phần hoặc chống trùng toàn P2P**.

`command_key` duy nhất trong `(run_id, company_ref, command_action)`; nội dung chuẩn hóa gắn actor, case/request, nội dung hành động và expected_binding. Cùng key/cùng nội dung sau khi hoàn tất trả quyết định gốc; cùng key khác nội dung/actor trả KEY_CONFLICT sau kiểm tra quyền. Các actor không được xem kết quả replay của người khác. Hai key khác nhau cùng tạo/gửi vẫn phải chịu quy tắc duy nhất request/delivery ở trên.

Retry quyết định ALLOW trước đây là replay lịch sử, không tái cấp hiệu lực chuẩn bị nếu D/R đã đổi: trả cùng request kèm freshness hiện tại. Retry SEND đã commit trả delivery cũ với thời điểm/binding gốc, không ghi một lần gửi mới. Retry quyết định BLOCK đã hoàn tất trả BLOCK gốc; muốn đánh giá điều kiện mới phải dùng key mới. Nếu lỗi xảy ra trước commit, retry chỉ được tạo đúng một kết quả cuối; không được có thành công giả trong command ledger. Lần gọi nào cũng có attempt/correlation để phân biệt replay, chặn và lần chuyển trạng thái thực.

## 20. 3C — Ma trận kịch bản, kết quả mong đợi và bằng chứng

### 20.1 Gói bằng chứng dự kiến

| Mã | Bằng chứng phải lưu khi thực hiện sau này |
| --- | --- |
| EV0 | Run/scenario ID, actor/quyền thử, artifact Odoo/module thực, manifest/contract/source version, digest nguồn/module và checkpoint đầu; ngày/giờ thực hiện thực tế |
| EV1 | Snapshot trước/sau, khóa chứng từ/dòng, trạng thái nguồn, D, fingerprint, danh sách thiếu; event thay đổi nguồn và tác nhân nếu có |
| EV2 | Result ID/R, evaluated_D/snapshot, current_result_ref, bước manifest, outcome/lý do, provenance và thời điểm công bố; cả kết quả lịch sử liên quan |
| EV3 | Mọi attempt của PREPARE/SEND: actor, command_key, expected/observed binding, quyết định/lý do, thời điểm; ảnh/thông báo chặn và trạng thái ngoại lệ |
| EV4 | Request ID/trạng thái/freshness/binding trước-sau; số lượng request theo run/company/bill xuyên case; delivery ID/số lượng và hộp nhận FIN-A; không có account.payment sinh bởi hành động lab |
| EV5 | Tương quan các phiên xử lý đồng thời: điểm bắt đầu, thứ tự writer/send/commit, khóa hoặc cơ chế tương đương, log lỗi/rollback/retry và command ledger; không chỉ screenshot cuối |

EV0 là bắt buộc cho mọi dòng; cột bằng chứng liệt kê phần cần thêm. **Actual result, thời điểm chạy và đường dẫn bằng chứng hiện để trống**; các mã EV không phải file đã tạo. Mọi lần bị chặn phải có bằng chứng bền vững; attempt lỗi hoặc rollback có thể được ghi bằng log kỹ thuật của tiến trình kiểm tra, kèm mã tương quan để nối EV3/EV5. Không mặc định bản ghi bằng chứng trong cùng transaction vẫn tồn tại sau rollback. Nếu không còn bằng chứng quan sát được thì chưa đạt yêu cầu quan sát, không suy ra “không có log nghĩa là chưa thử”. Phạm vi này chưa chứng minh audit bất biến trong vận hành.

### 20.2 Kịch bản chức năng và phiên bản

| ID / truy vết | Điều kiện đầu và thao tác cụ thể | Kết quả mong đợi | Bằng chứng thêm | Trạng thái |
| --- | --- | --- | --- | --- |
| A01 — AC-13/29/36 | F-M sau M-01; AP-A PREPARE key A01-P1, rồi thử SEND khi chưa có request | Hai thao tác BLOCK; bill/PO giữ liên kết; chỉ rõ thiếu GR/move/qty_received, không gọi là sai lệch; 0 request/0 delivery | EV1–EV4 | Chưa thực hiện |
| A02 — AC-14/16/35 | F-E sau E-01; AP-A xem ngoại lệ, PREPARE và thử SEND không có request | OPEN, owner/lý do/dòng BL-E-1 hiển thị; BLOCK cả hai; 0 request/0 delivery | EV1–EV4 | Chưa thực hiện |
| A03 — AC-15/16 | F-E sau E-02; PREPARE key A03-P1 | Ghi chú chỉnh sửa được lưu, D1/R1 không đổi; ngoại lệ OPEN; BLOCK | EV1–EV3 | Chưa thực hiện |
| A04 — AC-15/16 | F-E sau E-03 R2/D1 FAIL; thử chuẩn bị/gửi | Không quay về R1 hoặc đổi trạng thái xử lý; BLOCK, OPEN | EV2–EV4 | Chưa thực hiện |
| A05 — AC-15/30, hỗ trợ Mức A | F-E sau E-04: thử PREPARE; sau E-05 thử PREPARE key mới rồi SEND | Trước E-05 BLOCK do stale; sau R3/D2 PASS: RESOLVED, 1 REQ-E PREPARED rồi SUBMITTED, 1 delivery FIN-A | EV1–EV4 | Chưa thực hiện |
| A06 — AC-16 | F-E sau E-01; AP-A đặt user_label=đã xử lý, rồi thử sửa exception_state/current_result_ref hoặc chuẩn bị | Nhãn không cấp điều kiện; ghi field hệ thống bị từ chối; chuẩn bị BLOCK; OPEN | EV2–EV4 | Chưa thực hiện |
| A07 — AC-30, hỗ trợ Mức A | F-P sau P-01; AP-A PREPARE A07-P1, hoàn thiện request_note, SEND A07-S1 | Guard độc lập cả hai lần dùng D1/R1/CTRL-A/1/FX-A/1; cùng REQ-P, 1 delivery FIN-A; không phê duyệt/payment | EV1–EV4 | Chưa thực hiện |
| A08 — thay đổi nguồn hợp lệ, AC-16 | CP-C; thực hiện C-02, thử SEND với binding D1/R1 trước C-03 | BILL-C vẫn draft, chỉ qty_billed đổi 10→11; D2/R1 stale; giữ REQ-C PREPARED, STALE; BLOCK, 0 delivery | EV1–EV4 | Chưa thực hiện |
| A09 — AC-14/16 | CP-C → C-02/C-03; SEND chỉ định D1/R1 PASS | Máy chủ dùng R2/D2 FAIL; không dùng PASS cũ, OPEN, BLOCK; REQ-C còn PREPARED | EV1–EV4 | Chưa thực hiện |
| A10 — G1-D01 và lựa chọn chuẩn bị lại của lab | CP-C → C-02 đến C-05; thử SEND ngay, rồi PREPARE key mới và SEND key mới | Giá trị qty trở về 10 nhưng D3, không là D1; SEND đầu BLOCK do binding chuẩn bị cũ; chuẩn bị lại trên cùng REQ-C rồi gửi thành công, tổng 1 request/1 delivery | EV1–EV4 | Chưa thực hiện |
| A11 — thay kết quả, AC-16 | CP-R → R-02; thực hiện N-OLD: chọn RES-R-R1 để gửi hoặc cố PUB-A công bố lại R-01 thành R3 | SEND BLOCK vì R2/D1 FAIL; bước cũ bị từ chối, không sinh R3; current_result vẫn R2; không sửa evaluated_D cũ | EV2–EV4 | Chưa thực hiện |
| A12 — lựa chọn chuẩn bị lại của lab | CP-R → R-02/R-03; SEND trước rồi sau PREPARE lại | Cùng D1 nhưng R3 khác R1: lần đầu BLOCK do binding cũ; chuẩn bị lại REQ-R gắn R3, gửi mới thành công | EV2–EV4 | Chưa thực hiện |
| A13 — AC-29, nguồn bổ sung hợp lệ | F-M → M-02; PREPARE; rồi M-03 và PREPARE/SEND key mới | Có receipt mới không tự PASS: trước R2 BLOCK; sau R2/D2 PASS mới qua; không sửa receipt done; cùng BILL-M/PO-M | EV1–EV4 | Chưa thực hiện |
| A14 — provenance/quyền lab | F-P trước P-01; AP-A cố công bố PASS; sau đó PUB-A công bố P-01 hợp lệ | AP bị từ chối, không sinh R; chỉ PUB-A tạo R1 từ đúng step; không có ô tự nhập PASS cho AP | EV2/EV3 | Chưa thực hiện |
| A15 — dữ liệu không đủ/không hợp lệ | N-PASS và N-REF, hai run riêng; thử công bố PASS/chuẩn bị | PASS thiếu dữ liệu bị từ chối, không cấp kết quả hợp lệ; tham chiếu PO line sai bị chặn với lý do rõ; 0 request/0 delivery | EV1–EV4 | Chưa thực hiện |
| A16 — tính hiện hành phiên bản | N-VERSION, từng biến thể contract/source ở run riêng; SEND với binding cũ | BLOCK do phiên bản không được hỗ trợ/không khớp; không tự coi v1 dùng được hoặc tạo fixture v2 | EV1–EV4 | Chưa thực hiện |
| A17 — G1-D05 / giới hạn nguồn | CP-C; SRC-A thử sửa PO purchase/GR done; biến thể BILL-C đã posted thử đổi qty | Các sửa không được phép bị chặn, không tăng D bởi thay đổi bị từ chối; không reset bill, không sửa PO/GR để tạo kịch bản | EV1/EV3 | Chưa thực hiện |
| A18 — guard phía máy chủ | F-E; AP-A thử create/import/RPC với state SUBMITTED, sửa Result ID hoặc dùng context bỏ kiểm tra; VIEW-A gọi PREPARE/SEND | Mọi đường ghi trái quyền/đi tắt bị chặn, không request SUBMITTED/delivery; không chỉ kiểm tra nút UI | EV2–EV4 | Chưa thực hiện |
| A19 — phát hiện nguồn lệch | CP-P; mô phỏng adapter đọc snapshot nguồn khác SN-P-D1 nhưng D chưa được cập nhật, không sửa DB trực tiếp | SEND BLOCK SOURCE_DRIFT, không tin D1/R1; yêu cầu sửa đường ghi/đánh giá lại, không tự gửi | EV1–EV4 | Chưa thực hiện |

A15/A17/A18 là biến thể âm của hợp đồng/quyền lab; không công bố NFR hoặc toàn bộ AC-31/32 đã được kiểm chứng. A01/A13 hỗ trợ AC-29 về giữ bill/PO; riêng đường ghi bill chuẩn khi chưa GR vẫn phải xác minh trên artifact thực, không chỉ dựng fixture để coi AC-29 đạt.

### 20.3 Kịch bản nhất quán, thử lại và chống trùng

| ID / phạm vi | Điều kiện đầu và thứ tự thao tác | Kết quả mong đợi | Bằng chứng thêm | Trạng thái |
| --- | --- | --- | --- | --- |
| A20 — writer nguồn đi trước SEND | CP-C; điều phối hai phiên để C-02 commit trước kiểm tra/commit gửi, dù sender đã đọc sơ bộ D1 | Sender đọc lại thấy D2 hoặc phát hiện xung đột và BLOCK/thử lại rồi BLOCK; không SUBMITTED từ kiểm tra D1; 0 delivery | EV1–EV5 | Chưa thực hiện |
| A21 — publisher đi trước SEND | CP-R; R-02 commit giữa đọc sơ bộ và ghi gửi | Sender không commit bằng R1; thấy R2 FAIL rồi BLOCK; request PREPARED/STALE, 0 delivery | EV2–EV5 | Chưa thực hiện |
| A22 — SEND đi trước writer | CP-C; gửi giữ quyền xử lý nhất quán và commit D1/R1 trước khi cho C-02 tiến hành | Có đúng 1 lần gửi hợp lệ D1/R1 và 1 delivery; log chứng minh writer xảy ra sau. Không diễn giải phiên bản D2 về sau thành lỗi thời điểm gửi; không kiểm chứng vòng đời sau gửi | EV1–EV5 | Chưa thực hiện |
| A23 — retry tạo, cùng key | F-P sau P-01; PREPARE A23-P1 thành công rồi gửi lại cùng key/nội dung; thêm biến thể phản hồi đầu bị mất sau commit | Cùng REQ-P; 1 request, không thêm lần chuẩn bị thực. Có attempt REPLAY và liên kết quyết định gốc | EV2–EV5 | Chưa thực hiện |
| A24 — tạo đồng thời khác key / alias | F-P sau P-01; hai PREPARE khác key đồng thời; sau đó N-ALIAS và copy đề nghị | Một request theo run/company/bill; lần còn lại trả EXISTING_REQUEST cùng REQ-P/binding D1/R1, không tạo lần chuẩn bị thực thứ hai. Alias/copy tạo hồ sơ khác bị BLOCK DUPLICATE_BILL; không có SUBMITTED | EV1–EV5 | Chưa thực hiện |
| A25 — retry gửi sau commit, cùng/khác key | CP-P; SEND A25-S1 thành công, mất phản hồi; retry cùng key rồi SEND key mới | Cùng delivery cũ; tổng 1 request, 1 chuyển PREPARED→SUBMITTED, 1 delivery; không post payment; kiểm tra quyền trước replay | EV2–EV5 | Chưa thực hiện |
| A26 — gửi đồng thời khác key | CP-P; hai SEND có binding D1/R1 đúng đồng thời | Chỉ một chuyển trạng thái/delivery; lượt còn lại trả ALREADY_SUBMITTED cùng delivery/binding gốc, không tạo tiếp nhận mới | EV2–EV5 | Chưa thực hiện |
| A27 — key trùng nhưng payload khác | CP-P; một lệnh với key K hoàn tất, gọi lại K đổi request/case/expected_binding hoặc actor; từng biến thể run riêng | KEY_CONFLICT/không đủ quyền; không dùng kết quả người khác, không có thao tác mới; 1 quyết định gốc cho key K | EV3–EV5 | Chưa thực hiện |
| A28 — retry cũ không tái cấp hiệu lực | CP-C; sau PREPARE key P1 thực hiện C-02; retry P1. Biến thể SEND từng bị BLOCK rồi C-05, retry key BLOCK cũ | Retry PREPARE trả cùng request kèm STALE, không gắn D mới; retry BLOCK giữ quyết định gốc. Chỉ key mới mới yêu cầu đánh giá mới | EV1–EV5 | Chưa thực hiện |
| A29 — lỗi sau guard, trước commit | CP-P; mô phỏng lỗi tại ranh giới trước ghi hoàn tất/tiếp nhận gửi; retry sau khôi phục với cùng key | Không có SUBMITTED/delivery nửa chừng hoặc ALLOW giả; nếu chưa commit thì vẫn PREPARED/0 delivery. Retry đánh giá lại, tối đa 1 lần gửi thành công; evidence ERROR/rollback vẫn giữ | EV2–EV5 | Chưa thực hiện |
| A30 — retry công bố kết quả | F-R sau R-01; retry đúng R-01 cùng provenance, sau đó công bố R-02 và retry R-01 | Retry trước R-02 trả cùng RES-R-R1, không tăng R; sau R-02 không đưa R1 về current hoặc mint PASS mới. SEND vẫn bị chặn theo R2 | EV2/EV3/EV5 | Chưa thực hiện |

EXISTING_REQUEST, DUPLICATE_BILL, ALREADY_SUBMITTED, KEY_CONFLICT và SOURCE_DRIFT là mã kết quả lab đề xuất, chưa là thông báo hoặc API chuẩn Odoo. Các nhánh trả hồ sơ đã có vẫn phải kiểm tra quyền và ghi attempt, không là lần chuyển trạng thái mới. A29 cần fault injection có kiểm soát trong môi trường lab được giao riêng, chưa viết test hay chạm database ở 3C. Chứng minh thứ tự ở A20–A22 là bắt buộc; chạy tuần tự rồi gọi là test đồng thời không đủ bằng chứng.

## 21. 3C — Giả định mới cần duyệt và phạm vi triển khai tiếp

Các lựa chọn 3B đã được chấp thuận làm đầu vào; các chi tiết sau **mới chỉ phục vụ lab, cần duyệt trước triển khai**:

| ID | Giả định/chi tiết cần duyệt | Giới hạn |
| --- | --- | --- |
| LA-01 | CTRL-A/1, FX-A/1 và năm fixture M/E/P/C/R; một dòng/một PO/một bill, actor và tập trường/snapshot tại mục 17–18 | Không xác nhận thuật toán; không policy dung sai, nhận/thanh toán một phần; không đóng OD |
| LA-02 | SRC-A chỉ dùng draft bill edit hoặc receipt mới qua đường hợp lệ; R-02/R-03 là đầu ra giả lập có thứ tự, không thay chứng từ; contract/source chưa duyệt phải chặn | Nếu artifact không hỗ trợ đường nguồn đã chọn thì báo khoảng thiếu, chưa tự thay bằng thao tác ngoài baseline |
| LA-03 | Chỉ một request/run/company/bill xuyên case; một delivery/request; semantics key/retry/BLOCK lịch sử; giữ binding cũ và chuẩn bị lại cùng hồ sơ khi stale | Chống trùng lab, không kết luận policy bill trùng hay nhiều đề nghị trong vận hành; không thêm nghĩa vụ chuẩn bị lại vào baseline |
| LA-04 | Kiểm tra và commit gửi nhất quán với nguồn/publisher, lỗi chặn an toàn; ranh giới sau gửi ngoài lab; bằng chứng mọi attempt kể cả rollback có thể lưu bằng log kỹ thuật của tiến trình kiểm tra kèm mã tương quan | Không mặc định bản ghi bằng chứng trong cùng transaction vẫn tồn tại sau rollback; chưa chứng minh audit bất biến hoặc bảo đảm concurrency/audit vận hành; chưa lựa chọn công nghệ khóa |
| LA-05 | Mỗi scenario/run cô lập; checkpoint dựng lại từ đặc tả, EV0–EV5 và A01–A30 là tiêu chí quan sát cho triển khai sau | Chưa có backup khôi phục được, dữ liệu nạp hoặc bằng chứng chạy; không sửa coverage RTM |

Phạm vi triển khai tiếp chỉ sau giao việc riêng: xác minh các điều kiện Engine/WSL, tài nguyên, image digest và khả năng khôi phục ở mục 5; đối chiếu source C19 với đúng artifact; chốt LA-01–05; rồi mới thiết lập cô lập, tạo phần bổ sung tối thiểu Mức A, fixture loader có kiểm soát, guard/provenance/revision/idempotency và thu bằng chứng theo ma trận này. Nếu không đủ điều kiện môi trường thì giữ trạng thái chưa sẵn sàng, không dùng cài đặt Odoo hiện có. Đây là phạm vi bàn giao, không phải đã bắt đầu thiết lập hoặc viết code.

Chưa làm thuật toán Mức B, phê duyệt/trả lại đề nghị, chuyển tiền, tích hợp kế toán/ngân sách thật, toàn bộ tổ chức/master data hoặc toàn bộ P2P. Không có dung sai mặc định và không đóng OD. Thử nghiệm tương lai nếu đạt Mức A chỉ chứng minh guard theo kết quả định trước ở phạm vi quan sát, không tự công bố G1-D01 toàn bộ đã đạt.

Kiểm tra tài liệu 3C: bảo toàn nguyên byte phần 3A/3B trước lượt và SHA-256 các file tracked/nguồn ngoài phạm vi; kiểm tra cấu trúc bảng/heading/fence, ID và tham chiếu fixture/scenario, liên kết nội bộ và whitespace kể cả file untracked; `git diff --check`; Git chỉ phát sinh file được phép, index/branch/HEAD giữ nguyên. Các kiểm tra này là kiểm tra tài liệu, không thực hiện bất kỳ kịch bản A01–A30 nào. Không viết code/test, tạo file fixture/module, chạy ERP/dịch vụ/container, commit hoặc push.
