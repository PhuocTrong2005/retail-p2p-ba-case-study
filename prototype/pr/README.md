# Prototype P2P liên thông (PR → đề nghị thanh toán được duyệt)

<a id="prototype-pr--tích-hợp-ui-3b2"></a>

**Demo công khai:** [https://phuoctrong2005.github.io/retail-p2p-ba-case-study/](https://phuoctrong2005.github.io/retail-p2p-ba-case-study/) · [Thử nhanh P2P](#thử-nhanh-p2p-liên-thông)

Một ứng dụng, một phiên dữ liệu và một đồng hồ từ PR đến Finance phê duyệt đề nghị thanh toán. Bản P5 dùng artifact 20 tệp; [verification P5](./verification.md#8-p5--artifact-và-công-bố-portfolio) phân biệt kiểm tra mới và bằng chứng kế thừa. Không thực hiện thanh toán.

**Prototype P2P — dữ liệu tổng hợp, chưa phải hệ thống vận hành.**

**Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.**

[Câu chuyện portfolio](../../case-study.md) · [Kết quả kiểm chứng prototype](./verification.md) · [Đọc sâu: triển khai và kiểm tra](#đọc-sâu-triển-khai-và-kiểm-tra-đã-ghi-nhận)

## Thử nhanh P2P liên thông

Mở demo, mở **Điều khiển demo** và chuyển vai theo từng bước. Mỗi trang mới bắt đầu tại T0 **10/10/2026 12:00 UTC+07**; tránh tải lại giữa luồng vì dữ liệu chỉ ở bộ nhớ trang.

1. **BUY-01:** vào PR đã duyệt, chọn **PR-D**, lập PO với **NCC mẫu A**, giá mua **12.5**; giữ tuyến không cần Finance bổ sung, gửi duyệt. **PM-01:** mở hàng đợi PO và duyệt. Đây là đường vào nhanh trên cùng seed; để đi toàn luồng, dùng REQ-01 tạo PR mô tả **Máy quét USB tổng hợp**, lượng **1.5**, giá ước tính **0**, điền các trường bắt buộc, gửi và để MGR-01 duyệt trước khi BUY-01 lập PO giá **12.5**.
2. **WH-01:** mở PO đủ duyệt, ghi GR nhận đủ (PR-D là **40**, PR mới ở trên là **1.5**) và ngày hợp lệ. **AP-01:** ghi hóa đơn cùng NCC/mô tả/lượng, số/ngày hợp lệ, giá **15**, tiền **600** (hoặc **22.5** cho PR mới). Tiền nhập độc lập, không tự tính/ép khớp PO.
3. Chọn kịch bản **FAIL**, version **v1**, chạy đối chiếu mô phỏng: thấy **Không đạt** và ngoại lệ, chưa chuẩn bị được. Sửa giá thành **12.5**, tiền thành **500** (hoặc **18.75**), lưu; chọn **PASS**, chạy lại: kết quả hiện hành **Đạt** mới cho chuẩn bị.
4. **AP-01:** chuẩn bị đề nghị, nhập nội dung, gửi. **FIN-01:** vào hàng đợi đề nghị, trả lại với lý do. **AP-01:** mở cùng đề nghị, bổ sung giải trình và gửi lại. **FIN-01:** duyệt; kết quả **Đã phê duyệt**, chưa thanh toán. Khi chờ/đã duyệt, đầu vào và nguồn kết quả của giao dịch này bị khóa; sau duyệt chỉ xem.
5. Mở **Điều khiển demo → Khôi phục dữ liệu mẫu → Khôi phục**: PR seed, clock T0 và vai REQ-01 phục hồi; PO/GR/hóa đơn/kết quả/ngoại lệ/đề nghị vừa làm đều bị xóa.

Matching chỉ công bố kết quả định trước khi đầu vào khớp tuple tổng hợp; chọn PASS không bỏ qua điều kiện. Hóa đơn trước GR trả **WAIT**, chưa phải Đạt. Xem [hướng dẫn chi tiết P4](#p4--đối-chiếu-định-trước-và-đề-nghị-thanh-toán) và [verification](./verification.md#8-p5--artifact-và-công-bố-portfolio) cho các nhánh stale, khóa và giới hạn. Chuỗi PR riêng dưới đây vẫn được bảo toàn để tái lập metric; reset trước và không xen thao tác downstream.

## Hướng dẫn thử nhanh

Mỗi lần tải trang là một phiên mới, bắt đầu lúc **10/10/2026 12:00 UTC+07:00**, vai trò **Người yêu cầu**, ngân sách mặc định **Đạt**. Tải lại sẽ xóa tiến trình. Chuỗi dưới đây **không có thao tác Lưu nháp hoặc Lưu phần sửa xen giữa**, để mốc 13:00–15:00 khớp các ví dụ; chỉ chuyển sang Quản lý sau bước 4.

1. Mở [demo PR](https://phuoctrong2005.github.io/retail-p2p-ba-case-study/) ở vai trò **Người yêu cầu · REQ-01**.
2. Trong **PR của tôi**, bấm **Chỉnh sửa** ở **PR-B** đang **Chờ chỉnh sửa**.
3. Mở **Điều khiển demo**, chọn ngân sách **Nguồn dữ liệu ngân sách không khả dụng** trước khi bấm **Gửi lại**. Đồng hồ đến **13:00**; B vẫn Chờ chỉnh sửa và có thông báo nguồn không khả dụng.
4. Đổi ngân sách sang **Đạt**, rồi bấm **Gửi lại**. Đồng hồ đến **14:00**; B chuyển sang Chờ xem xét, vòng 2.
5. Trong **Điều khiển demo**, chuyển vai trò sang **Quản lý cửa hàng · MGR-01**. Bấm **Xem xét** ở PR-A, chọn **Trả lại để chỉnh sửa**, nhập lý do, rồi bấm **Hoàn tất trả lại**. Đồng hồ đến **15:00**.
6. Bấm **Về hàng đợi**: còn B/C, thời gian chờ **1,00/99,00 giờ**, tỷ lệ trả lại **50,00% (2/4 PR)**. Để bắt đầu lại, mở **Điều khiển demo**, bấm **Khôi phục dữ liệu mẫu** rồi xác nhận **Khôi phục**: dữ liệu mẫu, Người yêu cầu, ngân sách Đạt và đồng hồ 12:00 được phục hồi.

## Trạng thái và giới hạn

- Prototype đã truy cập công khai qua GitHub Pages; chưa phải hệ thống vận hành. Dữ liệu và kết quả nghiệp vụ là mô phỏng bằng dữ liệu tổng hợp.
- Dữ liệu chỉ lưu trong bộ nhớ trang. Đồng hồ tăng theo thao tác demo, không phải thời gian xử lý thực tế; chọn ngân sách hoặc chuyển vai trò không tăng giờ. Chuyển vai trò không phải đăng nhập hoặc bảo mật thực tế.
- UI chỉ chứng minh phạm vi dữ liệu mẫu của Người yêu cầu REQ-01; chưa kiểm tra UI với PR của người khác. Kiểm tra quyền bằng fixture ở lớp logic không thay thế bằng chứng UI này.
- Kiểm tra công khai thực hiện trên Chrome headless, bản desktop 1280/1440 px. Chưa UAT hoặc stakeholder sign-off; chưa kết luận cho mọi trình duyệt hay quyền truy cập thực tế.
- OD và các khoảng trống bao phủ yêu cầu vẫn mở theo [RTM](../../08-traceability/requirements-traceability-matrix.md); kết quả prototype không thay đổi coverage của SRS/RTM.

Kết quả [kiểm chứng prototype](./verification.md) ghi kịch bản, nguồn yêu cầu, kết quả, phiên bản/lớp kiểm tra và giới hạn; không phải UAT hoặc stakeholder sign-off.

## Chạy local

Cần Node.js có lệnh `node` trong PATH. Từ root repository:

```powershell
node prototype/pr/serve.mjs
```

Mở **http://127.0.0.1:8080/**. Nếu cổng bận, dùng `node prototype/pr/serve.mjs --port=8081` và mở **http://127.0.0.1:8081/**. Dừng server bằng Ctrl+C khi xong; không dừng tiến trình khác để lấy cổng. Không hỗ trợ mở prototype qua `file://`.

Runtime được ghi nhận trong các lượt kiểm tra là Node **v22.14.0**. Hướng dẫn tái lập và cấu hình máy chủ nằm trong [ghi nhận môi trường](#môi-trường-và-máy-chủ-local-của-lượt-tích-hợp).

## Sử dụng

- Khởi tạo ở **Người yêu cầu · REQ-01**. PR của tôi có tìm mã/mô tả, trim và không phân biệt hoa/thường; có xóa tìm kiếm và thông báo rỗng. Tạo PR chỉ mở form chưa lưu. Lưu nháp thiếu trường rồi mở lại; PR trả lại dùng Lưu phần sửa/Gửi lại và giữ Chờ chỉnh sửa.
- Tám trường dùng nội dung seed; người yêu cầu/đơn vị chỉ đọc. Không validation native chặn handler. Lỗi gửi giữ phần nhập, focus tổng hợp lỗi; liên kết dẫn tới trường có lỗi và thông báo cạnh trường. Không đủ ngân sách khác với nguồn không khả dụng; chỉ gọi kiểm tra ngân sách sau validation đạt.
- **Điều khiển demo** giữ REQ-01/MGR-01 và ba kết quả ngân sách; P2 bổ sung BUY-01 (Nhân viên mua hàng), PM-01 (Trưởng bộ phận mua hàng), FIN-01 (Trưởng bộ phận tài chính) cùng lựa chọn tuyến PO. Đổi vai/ngân sách/tuyến không tăng giờ; tuyến chốt theo từng vòng gửi PO. P3 thêm WH-01 (Kho) và AP-01 (Kế toán công nợ phải trả). Reset khôi phục cả PR/PO/GR/hóa đơn/revision/clock/counter/cấu hình/UI; phân quyền chỉ mô phỏng, handler vẫn kiểm tra vai/ngữ cảnh/thế hệ phiên.
- **MGR-01** xem hàng đợi và chi tiết trong đơn vị mẫu, chỉ quyết định PR đủ điều kiện. Trả lại cần lý do; từ chối cần xác nhận hậu quả. Mở/hủy xác nhận không gọi quyết định hoặc tăng giờ. PR đã duyệt/từ chối không có hành động sửa/gửi lại/quyết định lần hai.
- Rời form/đổi vai khi có phần nhập chưa lưu mở cảnh báo nội bộ: Tiếp tục chỉnh sửa hoặc Bỏ thay đổi. Hủy reset giữ nguyên dữ liệu/lựa chọn/giờ; xác nhận reset xóa cả trạng thái UI, tìm kiếm và phần nhập.
- Chỉ handler sở hữu validation, sự kiện và tăng giờ. UI giữ phần nhập cục bộ trước thao tác, không tính metric hoặc thời gian nghiệp vụ bằng cách thứ hai. Có khóa xử lý và bỏ click thứ hai trong double-click; không tự retry ghi. Nội dung người dùng được tạo bằng DOM/textContent, không chèn HTML.
- Nháp tạo mới có nguồn riêng; thiếu log không bị coi là nháp. Chi tiết chỉ là nội dung hiện tại. Ghi chú làm rõ C xuất hiện tại **C-3**, không ngụ ý có tại C-1 hoặc tái dựng snapshot quá khứ.

## P4 — Đối chiếu định trước và đề nghị thanh toán

**Kết quả định trước để kiểm chứng cơ chế kiểm soát, không phải thuật toán đối chiếu ba bên.** Logic thực kiểm tra dữ liệu bắt buộc, quan hệ, revision, hiệu lực, quyền và hai cổng chuẩn bị/gửi. Chỉ những tuple tổng hợp trong [matching-scenarios.json](./data/matching-scenarios.json) có kết quả định trước; ngoài tuple thì chặn công bố, không chọn PASS để vượt qua. Không có dung sai/policy hoặc giá thị trường được suy từ các số này.

Từ luồng PR/PO/GR/hóa đơn hiện có, dùng **NCC mẫu A**, giá PO **12.5** và một trong hai ví dụ:

| Ví dụ trên chứng từ thật | Mô tả / lượng PO, GR, hóa đơn | Hóa đơn FAIL: giá / tiền | Hóa đơn PASS: giá / tiền |
| --- | --- | --- | --- |
| PR mới nhập qua UI | Máy quét USB tổng hợp / 1.5 | 15 / 22.5 hoặc đã sửa giá 12.5 / 22.5 | 12.5 / 18.75 |
| Vào nhanh PR-D, cùng phiên | Cuộn giấy in nhiệt K80, khổ 80 mm, dài 45 m / 40 | 15 / 600 hoặc đã sửa giá 12.5 / 600 | 12.5 / 500 |

Đây là các giá trị nhập riêng để tra tình huống, không tự nhân lượng × giá. Mô tả/NCC/lượng hóa đơn theo đúng ví dụ; số/ngày hóa đơn nhập hợp lệ theo P3. Có thể ghi hóa đơn trước GR: lần chạy sẽ Chờ dữ liệu và chỉ rõ thiếu GR; không ngoại lệ sai lệch mới, không chuẩn bị được đề nghị.

1. AP mở hóa đơn. Trong **Điều khiển demo**, chọn **Không đạt (mô phỏng)** và nguồn `P4-SYNTHETIC / v1`; đóng panel rồi **Chạy đối chiếu mô phỏng**. Tuple FAIL phù hợp mở ngoại lệ có AP phụ trách, thuộc tính/lý do; thử **Chuẩn bị đề nghị** sẽ bị chặn.
2. Ghi chú điều tra hoặc sửa hóa đơn trong phạm vi P3. Ghi chú không cấp điều kiện; sửa dữ liệu làm kết quả cũ hết hiệu lực. Chỉ sửa giá rồi chạy FAIL vẫn giữ ngoại lệ mở. Sửa tiền đúng tuple PASS, chọn PASS rồi chạy mới; lúc này mới ghi xử lý ngoại lệ cùng Result ID mới. Không có nút tự đóng ngoại lệ hoặc sửa PO/GR đã hoàn tất.
3. **Chuẩn bị đề nghị** tạo một hồ sơ. AP nhập nội dung; NCC/tiền/tham chiếu là RO từ hóa đơn. **Gửi đề nghị** kiểm tra độc lập lại dữ liệu và PASS hiện hành. Nội dung bắt buộc khi gửi; lưu được chưa đầy đủ. Chỉ có một đề nghị mỗi giao dịch; bấm chuẩn bị lại mở cùng ID.
4. Đổi kịch bản/version của đúng giao dịch không tăng giờ nhưng làm kết quả cũ hết hiệu lực; đổi rồi đổi về không hồi sinh kết quả. v2 dùng cùng số tổng hợp, provenance khác. Nếu chạy PASS mới sau chuẩn bị, gửi bằng dấu xem cũ bị chặn. Bấm **Xem lại dữ liệu hiện hành**: không tăng giờ, giữ nội dung AP nhập; gửi lại dùng Result ID mới và giữ nguyên bằng chứng chuẩn bị cũ.
5. Chuyển **FIN-01** → **Hàng đợi đề nghị** → **Xem xét đề nghị**. Finance chỉ quyết định hồ sơ đang chờ: phê duyệt hoặc trả lại có lý do không trống. AP mở lại cùng ID, sửa nội dung/nhập giải trình bắt buộc rồi gửi lại. Chỉ sửa giải trình không tự làm kết quả hết hiệu lực; nếu sửa hóa đơn sau trả lại phải chạy lại PASS phù hợp trước gửi.
6. Khi đề nghị chờ Finance/đã duyệt, mọi sửa hóa đơn (cả ghi chú), đổi nguồn/kịch bản và chạy mới bị khóa tại handler và UI của đúng giao dịch. Giao dịch khác và chỉ đọc vẫn dùng được. Sau duyệt chỉ xem, kết thúc tại phê duyệt đề nghị; không mở lại/từ chối/thanh toán.

Mỗi lần chạy có kết quả tạo Result ID/order mới; trường hợp không có tình huống chỉ ghi attempt bị chặn. Lịch sử cũ không sửa/chọn lại làm hiện hành. Run/prepare/send/lưu được tiếp nhận +1 giờ (kể cả lỗi nội dung/stale/thiếu dữ liệu); duyệt/trả hợp lệ +1 giờ; trả thiếu lý do, sai vai/trạng thái/tham chiếu, khóa, token lặp/cũ không tick. Xem lại/đọc/đổi lựa chọn không tick. Reset/reload xóa kết quả/ngoại lệ/đề nghị/dấu xem và về PASS/v1 chưa có kết quả, giữ cùng cơ chế PR/PO/GR/hóa đơn; công thức metric và seed PR không đổi.

[matching-payment.mjs](./logic/matching-payment.mjs) dùng context/clock/ID/reset/command guard và dữ liệu P3 thực; không tạo app/session/dataset thứ hai. [P1 C/E](../../06-system-analysis/p2p-prototype-design.md) quản lý chi tiết thiết kế; [verification mục 7](./verification.md#7-p4--đối-chiếu-mô-phỏng-và-đề-nghị-thanh-toán-local) ghi phạm vi thực chạy và giới hạn. Bộ test cuối **94/94 đạt** (77 cũ + 17 mới). Gói hiện tại **20 file**, khớp nguồn; workflow P5 đã cập nhật danh sách 20 tệp và trigger dữ liệu; kết quả artifact ở verification mục 8.

```powershell
$p4Node = 'node'
$p4Tests = @(Get-ChildItem -LiteralPath prototype/pr/test -Filter '*.test.mjs' | ForEach-Object FullName)
& $p4Node --test --test-reporter=spec @p4Tests
& $p4Node prototype/pr/build-static.mjs
# Các terminal riêng, chọn cổng trống:
& $p4Node prototype/pr/serve.mjs --port=8089
& $p4Node prototype/pr/qa/launch-browser.mjs --cdp-port=9239
& $p4Node prototype/pr/qa/browser-qa.mjs --scope=p4 --cdp=http://127.0.0.1:9239 --url=http://127.0.0.1:8089/ --output="<thư-mục-kết-quả-ngoài-repo>" --evidence-dir="<thư-mục-ảnh-ngoài-repo>"
```

Chạy từng scope trình duyệt riêng, không song song trên cùng browser. Dừng đúng tiến trình do mình tạo. Bốn ảnh cuối P4: [Không đạt/ngoại lệ](./evidence/p4-01-fail-exception.png), [chờ dữ liệu](./evidence/p4-02-waiting-data.png), [gửi bị chặn cần xem lại](./evidence/p4-03-send-blocked-review.png), [Finance đã duyệt](./evidence/p4-04-approved-request.png). Các mục PR/P2/P3 bên dưới giữ kết quả đúng phiên bản, không chứng minh toàn AC/UAT hoặc P5.

## P3 — Ghi GR và hóa đơn trong cùng phiên

Chạy local như phần dưới; dùng chính PO vừa lập/duyệt ở P2, không tải lại. Mỗi PO tối đa một GR và một hóa đơn trong demo; một dòng, nhận đủ một lần. Đây là giới hạn demo được chủ dự án chấp thuận, không phải policy doanh nghiệp.

1. Đi từ PR mới: REQ-01 tạo/gửi PR → MGR-01 duyệt → BUY-01 lập/gửi PO → PM-01 duyệt, thêm FIN-01 nếu tuyến yêu cầu. PO đủ phê duyệt hiện hành là đủ để Kho nhận; không bắt buộc phát hành trước. PR-D chỉ là đường vào nhanh tùy chọn trên cùng seed.
2. Chuyển **WH-01**, mở PO → **Ghi phiếu nhận hàng**. Nhập ngày nhận hợp lệ và lượng thực nhận đúng lượng PO. Ngày nhận là ngày nghiệp vụ, khác giờ ghi nhận. Lượng khác PO được giữ để sửa và báo ngoài phạm vi, không tự đổi thành nhận đủ. **Ghi GR** tạo một ID, người/giờ; GR đã ghi chỉ đọc, không sửa/xóa.
3. Chuyển **AP-01**, mở PO → **Ghi hóa đơn**. Nhập số/ngày hóa đơn, NCC, mô tả, lượng, đơn giá và số tiền riêng; ghi chú tùy chọn. Chọn NCC trong chính danh mục P2 (cả ba NCC mẫu, không áp cổng chọn NCC của PO cho hóa đơn). Không tự ép dữ liệu khớp PO hoặc tính tiền bằng lượng × giá. Các trường ngoài ghi chú bắt buộc; lượng > 0, giá/tiền ≥ 0, số hữu hạn đúng định dạng; ngày lịch hợp lệ.
4. Có thể làm bước hóa đơn trước GR, theo bất kỳ PO tồn tại trong phiên (kể cả PO đang soạn). Hóa đơn được giữ và hiển thị **Chờ phiếu nhận hàng**, liệt kê phần PO còn thiếu nếu có. Kho bổ sung GR khi PO đủ duyệt, AP mở lại hóa đơn: **Đủ dữ liệu tối thiểu — chưa đối chiếu**. Dữ liệu hóa đơn/revision hóa đơn không bị đổi bởi thêm GR.
5. AP dùng **Sửa hóa đơn**; giữ ID/PO nguồn, cho sửa bảy trường nhập nghiệp vụ và ghi chú. Lưu có lịch sử trước/sau. `input_revision` theo từng PO tăng khi thêm GR, thêm hóa đơn hoặc đổi trường hóa đơn nghiệp vụ; `invoice_revision` chỉ tăng khi dữ liệu hóa đơn nghiệp vụ đổi. Sửa rồi lưu/hoàn nguyên rồi lưu tăng ở cả hai lần. Lưu không đổi hoặc chỉ sửa ghi chú vẫn +1 giờ nhưng không tăng revision.
6. Mở PO nguồn và PR nguồn theo quyền, rồi **Quay lại ngữ cảnh trước**; không reload/đổi vai/tăng giờ. Kho chỉ xem PO đủ duyệt và GR liên quan, không có quyền xem hóa đơn/PR. Vai Mua hàng/Finance được đọc chứng từ liên quan; chỉ AP ghi/sửa hóa đơn, chỉ Kho ghi GR. Rời form bẩn/đổi vai có cảnh báo; hủy giữ phần nhập.

Mở form/xem/liên kết/đổi vai không tăng T. Ghi/lưu được tiếp nhận xử lý tăng đúng một giờ, kể cả lỗi trường/GR khác lượng; lỗi giữ nhập và focus tổng hợp lỗi, liên kết tới trường. Sai vai/trạng thái/tham chiếu, tạo lặp hoặc command cũ/lặp không thêm giờ/chứng từ. Reset/reload xóa đồng bộ downstream, revision và UI, khởi tạo PR seed duy nhất; không dùng form cũ ghi vào dữ liệu mới dù ID được cấp lại.

[receiving-invoice.mjs](./logic/receiving-invoice.mjs) quản lý GR/hóa đơn/revision, dùng chung context/clock/ID/reset và guard command của P2. UI dùng lại bảng/panel/field/dialog/font Be Vietnam Pro; [catalog P2](./data/po-catalog.json) chỉ thêm hai actor, không thêm dataset PR. Thao tác P3 làm tuổi chờ PR tăng theo cùng T; công thức/cohort/seed không đổi. Tái lập chuỗi PR chuẩn bằng reset rồi chỉ thao tác PR, không xen downstream.

**Ở mốc P3 chưa có đối chiếu/ngoại lệ/đề nghị thanh toán:** đủ dữ liệu không là Đạt hoặc cấp quyền chuẩn bị/gửi. Không thuế/dung sai/credit note/nhận từng phần/backend/lưu bền. Quyền chỉ mô phỏng trong trình duyệt, chưa là bảo mật vận hành.

### Kiểm tra P3

Dùng `$p2Node` và lệnh toàn bộ test ở mục P2 dưới đây: **77/77 test đạt** (63 cũ + 14 mới), không đổi assertion PR/PO cũ. Build ở mốc P3 **18 file** (P4 hiện tại 20 file), giữ allowlist hẹp, từng byte khớp source. Các con số 17 file P2 và 13 file H1/H2 bên dưới là phiên bản lịch sử; ở mốc đó workflow chưa mở rộng; P5 cập nhật kiểm tra gói đầy đủ.

```powershell
$p3Node = 'node'
& $p3Node prototype/pr/serve.mjs --port=8088
# Terminal khác:
& $p3Node prototype/pr/qa/launch-browser.mjs --cdp-port=9238
# Terminal kiểm tra:
& $p3Node prototype/pr/qa/browser-qa.mjs --scope=p3 --cdp=http://127.0.0.1:9238 --url=http://127.0.0.1:8088/ --output="<thư-mục-kết-quả-ngoài-repo>" --evidence-dir="<thư-mục-ảnh-ngoài-repo>"
```

Dùng cổng trống, chỉ dừng tiến trình do mình mở. Lượt Chrome P3 đạt **21 mục**, hồi quy UI P2 riêng đạt **15 mục**; xem [verification mục 6](./verification.md#6-p3--liên-thông-gr-và-hóa-đơn-local) về môi trường, thời điểm, lệnh và giới hạn. Không ghi đè ảnh PR/PO cũ; ba ảnh cuối: [GR đã ghi](./evidence/p3-01-recorded-gr.png), [hóa đơn chờ GR](./evidence/p3-02-invoice-waiting-gr.png), [đủ dữ liệu nhưng chưa đối chiếu](./evidence/p3-03-invoice-ready-unmatched.png).

## P2 — Thử liên thông PR → PO trên local

Chạy server bằng lệnh trong [Chạy local](#chạy-local). Giữ `prototype/pr/` và URL gốc; chưa cài dependency mới. Toàn bộ bước dưới diễn ra trong một trang/một phiên. Mở Điều khiển demo để chuyển vai, rồi đóng panel để thao tác phần nội dung. Tải lại hoặc xác nhận Khôi phục dữ liệu mẫu sẽ mất tiến trình và trở về T0; hủy reset giữ cả phần nhập chưa lưu.

1. Khôi phục dữ liệu, ở REQ-01 bấm **Tạo PR**, nhập đủ trường và **Gửi**. Có thể dùng lượng có phần lẻ, giá ước tính 0 và ngày lịch hợp lệ; không ép ngày tương lai. Đồng hồ 13:00 nếu không xen lưu/lần gửi lỗi.
2. Chuyển **MGR-01**, mở PR vừa tạo ở hàng đợi và **Phê duyệt**: 14:00.
3. Chuyển **BUY-01**: PR vừa duyệt xuất hiện ngay trong **PR sẵn sàng lập PO**. Bấm **Lập PO** trên chính PR đó: 15:00. PR-D chỉ là cách vào nhanh trên cùng seed nếu muốn thử PO riêng.
4. Xem PR nguồn/số phê duyệt, nội dung kế thừa chỉ đọc và giá ước tính PR. Chọn **NCC mẫu A**, nhập **Giá mua** riêng; giá hữu hạn ≥ 0, cho phép 0, dấu chấm cho phần lẻ. Thông tin giao hàng/thương mại tùy chọn. Hai NCC không đủ điều kiện hiển thị nhưng không cho chọn; không có onboarding. Không hiển thị tổng PO hoặc ngưỡng tiền để suy tuyến.
5. Trong Điều khiển demo chọn tuyến cho lần gửi: mặc định **Không cần Tài chính bổ sung**. Bấm **Gửi PO**: 16:00. PO chuyển Mua hàng duyệt; đổi lựa chọn sau gửi không đổi tuyến đã chốt.
6. Chuyển **PM-01**, mở PO và **Phê duyệt PO**: 17:00. Nếu không cần Finance, PO **Đủ điều kiện phát hành**, vẫn **Chưa phát hành**. Nếu đã chọn cần Finance, còn chờ **FIN-01** duyệt bổ sung; phát hành bị chặn đến khi đủ mọi phê duyệt.
7. Chuyển **BUY-01**, mở PO và **Phát hành mô phỏng**: 18:00 trên tuyến không Finance và không có thao tác xen thêm. Ghi người/giờ đúng một lần; không email. Thiếu phê duyệt, phát hành lặp hoặc bấm lặp không tăng giờ/không thêm sự kiện phát hành.
8. Bấm **Mở PR nguồn**, kiểm tra đúng ID và lịch sử gửi/duyệt thực tế; **Quay lại ngữ cảnh PO** đưa về hồ sơ trước đó, không đổi vai hoặc clock. Chuyển vai/module không làm mất dữ liệu phiên.

PM-01 hoặc FIN-01 tại đúng bước có thể **Trả lại PO**, lý do không trống; thiếu lý do không ghi quyết định/tăng giờ. BUY-01 sửa/gửi lại; vòng mới đánh giá tuyến lại và bắt đầu từ PM-01, phê duyệt cũ chỉ còn lịch sử. Không có nhánh từ chối PO, sửa PO đang duyệt/đã duyệt/phát hành hoặc sửa PR nguồn đã duyệt.

PO chưa đầy đủ có thể lưu nháp; số/NCC đã nhập không hợp lệ bị báo lỗi, giữ phần nhập UI để sửa. Gửi lỗi trong ngữ cảnh cho phép tăng đúng một giờ, không chuyển duyệt. Chỉ có một PO mỗi PR: chọn lại sẽ mở PO đang có. Form bẩn có cảnh báo rời/chuyển vai; không có autosave hoặc lưu bền.

### Tổ chức module và metric trong P2

- [session-context.mjs](./logic/session-context.mjs) sở hữu clock, actor, cấu hình, cấp ID/thế hệ reset; [p2p-session.mjs](./logic/p2p-session.mjs) khởi tạo đúng một miền PR và một miền PO, kiểm tra token thế hệ/actor/mã thao tác trước mutation. [po-session.mjs](./logic/po-session.mjs) giữ chứng từ, vòng/tuyến/phê duyệt/lịch sử PO. [pr-session.mjs](./logic/pr-session.mjs) nhận context dùng chung; API tương thích cũ vẫn phục vụ test PR riêng, runtime không tạo phiên PR thứ hai.
- [app.mjs](./app.mjs) tái dùng DOM helpers, bảng/panel/callout/dialog và bốn view PR hiện có, thêm ngữ cảnh danh sách/form/chi tiết PO. [po-catalog.json](./data/po-catalog.json) chỉ thêm ba actor PO và ba NCC tổng hợp; không sao chép PR/user/đơn vị seed gốc. Font/CSS nền, validation PR, time/metric và cohort cũ được giữ.
- API đọc PR đã duyệt có kiểm tra vai/phạm vi và bằng chứng APPROVE; Mua hàng không giả danh REQ-01. PO giữ PR ID/APPROVE ID thật và snapshot lúc lập; không dựng snapshot PR ở các mốc quá khứ. Quyền/historical log chỉ là mô phỏng trong trình duyệt.
- Cùng clock: reset rồi BUY-01 lập PO từ PR-D đưa T đến 13:00; A/C vẫn chờ và tuổi chờ thành 196/97 giờ, số chờ 2, tỷ lệ 25%. Chỉ kéo dài coverage cho lịch sử PR phiên biết đầy đủ; fixture thiếu vẫn không xác định. Muốn tái lập chuỗi PR 12/13/14/15, reset chung rồi chạy riêng chuỗi **Hướng dẫn thử nhanh**, không xen thao tác PO.
- [Server local](./serve.mjs) và [build](./build-static.mjs) có allowlist/gói **17 file** ở mốc P2 (18 file ở P3; 20 file ở P4 hiện tại), cùng package test kiểm tra tên/byte/tái lập và fail khi thiếu nguồn. Chỉ phục vụ tài nguyên ứng dụng được phép, không toàn repository. Ở mốc P2 workflow vẫn kiểm tra gói PR cũ; P5 đã mở rộng thành 20 tệp, không dùng kết quả lịch sử P2 làm bằng chứng deploy hiện hành.

### Tái lập kiểm tra P2

Dùng Node v22.14.0 trong PATH hoặc đặt biến thành executable đã cài, không cần dependency mới:

```powershell
$p2Node = 'node'
$p2Tests = @(Get-ChildItem prototype/pr/test/*.test.mjs | ForEach-Object FullName)
& $p2Node --test --test-reporter=spec @p2Tests
```

Lượt P2 ngày 22/10/2026: **63 test thực chạy, 63 đạt**, gồm 50 test cũ và 13 test PR–PO mới. Các assertion PR cũ không đổi; package/server tests chỉ mở rộng tài nguyên P2. Kết quả, phiên bản và giới hạn ghi tại [verification mục 5](./verification.md#5-p2--liên-thông-pr--po-local).

Chạy server ở terminal riêng, rồi dùng helper trình duyệt hiện có; chọn cổng chưa dùng, không dừng tiến trình khác:

```powershell
& $p2Node prototype/pr/serve.mjs --port=8087
# Terminal khác:
& $p2Node prototype/pr/qa/launch-browser.mjs --cdp-port=9237
# Terminal kiểm tra:
& $p2Node prototype/pr/qa/browser-qa.mjs --scope=p2 --cdp=http://127.0.0.1:9237 --url=http://127.0.0.1:8087/ --output="<thư-mục-kết-quả-ngoài-repo>" --evidence-dir="<thư-mục-ảnh-ngoài-repo>"
```

[browser-qa.mjs](./qa/browser-qa.mjs) dùng lại CDP client/click/fill/screenshot hiện có; [p2-scenarios.mjs](./qa/p2-scenarios.mjs) chỉ chứa kịch bản mới. Mỗi lượt mở/đóng một trang riêng để không nhận lại exception cũ từ trang khác. `--evidence-dir` cho phép giữ ảnh thử ngoài repo; không ghi đè ảnh PR lịch sử. Dừng đúng server/browser do mình mở sau kiểm tra.

Ba ảnh P2 giữ từ lượt cuối: [PO từ PR mới duyệt](./evidence/p2-01-linked-po-form.png), [phát hành mô phỏng](./evidence/p2-02-issued-live-pr.png), [chặn khi thiếu Finance](./evidence/p2-03-finance-blocked.png). Ảnh chỉ hỗ trợ quan sát, không thay test handler/nguồn sự kiện. Phần **Ảnh trực tiếp hiện hành** và các mục đọc sâu dưới đây giữ hồ sơ PR theo phiên bản lịch sử; không dùng chúng chứng minh P2 mới đã chạy.

## Ảnh trực tiếp hiện hành

Một bộ chín PNG từ `Page.captureScreenshot`, Chrome 155/CDP, viewport 1440 px, chụp cả trang; không ảnh dựng hoặc ảnh wireframe thay thế. Bảng ghi giờ thực ngày **16/10/2026 UTC+07:00**; cột mô phỏng là **10/10/2026**. Mỗi ảnh giữ vai trò, đồng hồ và lựa chọn ngân sách.

| Ảnh | Tình huống / vai trò | Giờ chụp thực tế | Giờ mô phỏng |
| --- | --- | --- | --- |
| [pr-01-list.png](./evidence/pr-01-list.png) | PR-SCR-01, năm PR seed; REQ-01 | 10:38:46.269 | 12:00 |
| [pr-02-form.png](./evidence/pr-02-form.png) | PR-SCR-02, tạo form chưa lưu; REQ-01 | 10:38:46.834 | 12:00 |
| [pr-02-submit-error.png](./evidence/pr-02-submit-error.png) | Lỗi gửi/focus/giữ phần nhập; REQ-01 | 10:38:48.892 | 14:00, ca riêng |
| [pr-03-detail-c.png](./evidence/pr-03-detail-c.png) | PR-SCR-03, C vòng 2, ghi chú tại C-3; REQ-01 | 10:38:54.949 | 12:00 |
| [pr-04-queue-12.png](./evidence/pr-04-queue-12.png) | PR-SCR-04, chuỗi chuẩn ban đầu; MGR-01 | 10:38:56.271 | 12:00 |
| [pr-02-returned-13.png](./evidence/pr-02-returned-13.png) | B gửi lại, nguồn không khả dụng, giữ Chờ chỉnh sửa; REQ-01 | 10:38:57.694 | 13:00 |
| [pr-04-queue-13.png](./evidence/pr-04-queue-13.png) | A196/C97, B chưa mở vòng; MGR-01 | 10:38:58.056 | 13:00 |
| [pr-04-queue-14.png](./evidence/pr-04-queue-14.png) | A197/B0/C98, ba PR chờ; MGR-01 | 10:38:59.777 | 14:00 |
| [pr-04-queue-15.png](./evidence/pr-04-queue-15.png) | B1/C99, A chờ sửa, tỷ lệ 50%; MGR-01 | 10:39:02.569 | 15:00 |

## Đọc sâu: triển khai và kiểm tra đã ghi nhận

Các mục dưới đây bảo toàn hồ sơ theo từng giai đoạn, phiên bản và ngày kiểm tra. Các lệnh tái lập dùng `node` và placeholder thư mục ngoài repo thay đường dẫn riêng của máy tác giả; kết quả và thời điểm lịch sử giữ nguyên. Branch, HEAD, Git status, đường dẫn Temp và các câu “chưa push/hosting/3C” mô tả **thời điểm của lượt được ghi nhận**, không phải trạng thái repository hiện tại. Prototype hiện đã có demo công khai ở đầu trang. Log Temp có thể đã bị dọn; kết quả lịch sử không phải kết quả vừa chạy lại trong lượt biên tập portfolio.

Bốn màn hình HTML/CSS/ES modules nối với lớp logic 3B.1. Dữ liệu chỉ tồn tại trong bộ nhớ trang, không localStorage/sessionStorage, backend hoặc database. Tải lại/reset phục hồi seed, lịch sử, ID, vai trò REQ-01, ngân sách Đạt và 10/10/2026 12:00 UTC+07:00. Kiểm tra tích hợp 3B.2 không thay thế [kiểm chứng 3C](./verification.md) hoặc UAT; không tuyên bố AC đã pass. OD-03/06/07 vẫn mở.

### Môi trường và máy chủ local của lượt tích hợp

Node của lượt lịch sử: **v22.14.0**. Để chạy lại, dùng Node 22.14.0 trong PATH (hoặc đặt biến Node thành executable đã cài). Từ root repo, PowerShell; các placeholder thư mục QA bên trên cần thay bằng đường dẫn ngoài repo:

```powershell
$prNode = 'node'
& $prNode prototype/pr/serve.mjs
```

Lệnh trên đã chạy và kiểm tra tại **http://127.0.0.1:8080/**. Nếu cổng bận, dùng `& $prNode prototype/pr/serve.mjs --port=8081` và URL `http://127.0.0.1:8081/`; không dừng tiến trình khác. Không cam kết hỗ trợ `file://`. Server tác vụ được dừng khi kết thúc kiểm tra; chạy lại lệnh để mở prototype.

[serve.mjs](./serve.mjs) dùng `node:http`/`node:fs`, chỉ bind `127.0.0.1`. Allowlist thực tế:

| URL | Tài nguyên local |
| --- | --- |
| `/`, `/index.html`, `/styles.css`, `/app.mjs` | Các file tương ứng trong `prototype/pr/` |
| `/data/seed.json` | `prototype/pr/data/seed.json` |
| `/logic/pr-session.mjs`, `/logic/validation.mjs`, `/logic/metrics.mjs`, `/logic/time.mjs` | Bốn module trong `prototype/pr/logic/` |
| `/fonts/BeVietnamPro-Regular.ttf`, `/fonts/BeVietnamPro-Medium.ttf`, `/fonts/BeVietnamPro-SemiBold.ttf`, `/fonts/BeVietnamPro-Bold.ttf`, `/fonts/OFL.txt` | Đúng năm file đã kiểm kê trong `wireframes/pr/`, không sao chép font |

MIME tương ứng HTML/CSS/JavaScript/JSON/TTF/text. Chỉ GET/HEAD; không API ghi. Đường dẫn ngoài danh sách, traversal, `.git`, test, README và chính server không được phục vụ. Không công khai toàn repository; realpath được kiểm tra trong thư mục cho phép.

### Nguồn và kiểm tra trước khi sửa

Branch `pr-prototype`, HEAD `e72287ecf1ede6d7a88ddb3560e5dc81f7c639a1`; không detached HEAD. Đọc trực tiếp danh sách đường dẫn và trạng thái file trong commit: đúng tám file được thêm, gồm README kỹ thuật, bốn module logic và ba file test/fixture. Nội dung local khớp commit; đầu lượt chỉ có ` M wireframes/pr/README.md`.

`b579cdc` và `b9232f3` đều tồn tại, là tổ tiên của HEAD. Seed và README dữ liệu khớp `b9232f3`; ba tài liệu thiết kế khớp `b579cdc`. Nguồn tham chiếu: [2A](../../06-system-analysis/pr-behavior-analysis.md), [SIM/2B](../../06-system-analysis/pr-prototype-decisions.md), [metric](../../08-traceability/pr-metrics-design.md), [wireframe](../../wireframes/pr/README.md), [HTML nguồn](../../wireframes/pr/index.html), [CSS nguồn](../../wireframes/pr/styles.css), [seed 3A](./data/seed.json), [giới hạn dữ liệu](./data/README.md). Thứ tự sự kiện là `(occurred_at, event_order)` trong từng PR; không ưu tiên loại sự kiện.

Snapshot đọc lại thành công trước khi sửa: `<bằng chứng ngoài repo của lượt lịch sử>`. Có branch/HEAD/status, danh sách tám file commit, SHA-256 mọi file tracked và bản sao trước sửa của tám file logic/test/README. Các log Node/CDP nằm cùng thư mục tạm; không tạo báo cáo bàn giao riêng trong repo.

### Module và kiểm tra

[app.mjs](./app.mjs) nối bốn màn hình; [index.html](./index.html) giữ shell và điều khiển demo; [styles.css](./styles.css) tái sử dụng CSS đã duyệt, chỉ điều chỉnh đường dẫn font và bổ sung trạng thái tương tác/dialog. [pr-session.mjs](./logic/pr-session.mjs), [validation.mjs](./logic/validation.mjs), [metrics.mjs](./logic/metrics.mjs), [time.mjs](./logic/time.mjs) giữ nguyên byte so với commit logic; không sửa hợp đồng 3B.1.

PR-MET-01/02 theo hàng chờ hiện tại; PR-MET-03 dùng toàn cohort của đơn vị, không thu hẹp theo hàng đợi/tìm kiếm. Hiển thị kỳ, thời điểm báo cáo, tử/mẫu số, số cohort chờ review/chờ sửa, số không xác định theo từng metric và ngữ cảnh. Cảnh báo chất lượng cần thiết hiện ngoài disclosure. Phân biệt Không áp dụng, Không xác định và Không có dữ liệu. Giữ giờ gốc; hiển thị half-up theo module metric. Không thêm SLA hoặc target.

```powershell
& $prNode --test prototype/pr/test/session.test.mjs prototype/pr/test/metrics.test.mjs prototype/pr/test/server.test.mjs
```

Kết quả cuối: **49 test, 49 đạt, 0 lỗi, 0 bỏ qua**: 45 test logic được giữ nguyên và bốn test server mới trong [server.test.mjs](./test/server.test.mjs). Test logic so sánh đối tượng seed trong bộ nhớ trước/sau và hash file. Kiểm tra SHA-256 cuối tác vụ là bằng chứng riêng cho bảo toàn file trên đĩa, không thay thế kiểm tra đối tượng.

#### Trình duyệt và cách tái lập

Windows, **Chrome/155.0.8059.40 headless**, Chrome DevTools Protocol qua Node WebSocket có sẵn, không Playwright/dependency mới. Phiên sau review dùng profile tạm `<bằng chứng ngoài repo của lượt lịch sử>`, CDP `127.0.0.1:9226`. Các lần Chrome/Edge khởi động ban đầu chưa mở được CDP; phiên kiểm tra thành công dùng `--headless=new --no-sandbox --disable-gpu --disable-software-rasterizer --in-process-gpu --no-first-run`, chỉ truy cập prototype local.

Để tái lập với runtime/trình duyệt có sẵn, mở server ở terminal thứ nhất. Terminal thứ hai:

```powershell
& $prNode prototype/pr/qa/launch-browser.mjs --cdp-port=9226
```

Helper [launch-browser.mjs](./qa/launch-browser.mjs) tạo profile tạm mới và báo PID/cổng; có thể nhận `--browser=<đường-dẫn-executable>`. Nó dừng nếu cổng CDP đã bận, không gắn vào trình duyệt khác. Terminal thứ ba:

```powershell
& $prNode prototype/pr/qa/browser-qa.mjs --cdp=http://127.0.0.1:9226 --url=http://127.0.0.1:8080/
```

[browser-qa.mjs](./qa/browser-qa.mjs) thao tác DOM/input chuột thực qua CDP, assert kết quả hiển thị, chụp ảnh trực tiếp vào `evidence/`, ghi log vào thư mục Temp (`--output=<thư-mục>` tùy chọn). Lệnh thực chạy sau review dùng thêm `--output=<thư-mục-kết-quả-ngoài-repo>`. Chạy lại sẽ thay bộ ảnh hiện hành. Fixture thiếu log được thực hiện bằng chặn một phản hồi seed trong phiên QA và cấp bản sao riêng; sau kiểm tra khôi phục tải seed thật, không sửa file/server dữ liệu.

Phiên cuối từ **16/10/2026 10:38:46.044 đến 10:39:35.942 UTC+07:00**, 21 mục kiểm tra trình duyệt và tám lượt kiểm tra hàng đợi sau review đạt, không lỗi console trang. Thời gian thực dưới đây khác thời gian mô phỏng 10/10/2026:

| Mốc | Kiểm tra trực tiếp | Thời gian thực 16/10/2026, UTC+07:00 | Kết luận |
| --- | --- | --- | --- |
| M1 | HTTP seed/font/module, bốn màn hình, nội dung seed/C-3, fixture không xác định/không dữ liệu, console | 10:38:46–10:38:54; bổ sung 10:39:35 | Đạt trong phiên Chrome này |
| M2 | Tạo/lưu/mở nháp, lưu phần sửa, validation/focus, ba kết quả ngân sách, gửi đạt, nội dung nhập an toàn | 10:38:46–10:38:53 | Đạt |
| M3 | Chuỗi chuẩn, trả lại thiếu/đủ lý do, duyệt/từ chối, hủy xác nhận, hành động sau quyết định | 10:38:55–10:39:10 | Đạt |
| M4 | Tìm kiếm/xóa/rỗng, queue trống, cảnh báo bỏ phần nhập/đổi vai, hủy reset, bấm lặp, tải lại | 10:39:10–10:39:18; fixture 10:39:35 | Đạt |
| M5 | Bốn màn hình ở 1280/1440 px và bổ sung 390 px; font thực, input 16 px, focus/lỗi | 10:39:18–10:39:34 | Không cuộn ngang toàn trang; bảng cho phép cuộn riêng |

Font render được kiểm tra bằng `CSS.getPlatformFontsForNode`: BeVietnamPro-Regular ở input, Medium ở nhãn, SemiBold ở nút, Bold ở h1; đều là custom font. Profile mới, deviceScaleFactor 1/zoom 100%. Đã đọc ảnh thực chạy để kiểm tra bố cục, tiếng Việt và nút; không có lỗi chồng chữ/cắt nút được ghi nhận trong phạm vi màn hình đã kiểm tra.

**beforeunload:** lúc **10:39:17.333 UTC+07:00**, click chuột thật vào trường và nhập bằng `Input.insertText`, rồi `Page.reload`. Chrome phát `Page.javascriptDialogOpening` với `type=beforeunload`, `hasBrowserHandler=true`, message rỗng. Dismiss giữ form; accept tải lại và trở về seed, REQ-01, Đạt, T0. Đây là quan sát protocol trong Chrome headless, không khẳng định giao diện/nội dung hộp thoại native giống các trình duyệt khác. Chưa thử đóng tab/cửa sổ hoặc trình duyệt khác; browser có thể không hiện cảnh báo nếu chưa có tương tác hoặc khi tiến trình bị đóng. Cảnh báo nội bộ không phụ thuộc beforeunload.

#### Chuỗi chuẩn thực chạy

**Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.**

Không xen lưu nháp. Khởi tạo REQ-01; REQ-01 gửi lại B tại 13:00/14:00; MGR-01 trả A tại 15:00. Đổi vai và chọn ngân sách không tăng giờ. Các số ngữ cảnh là chờ review/chờ sửa trong cùng cohort.

| Mô phỏng 10/10/2026 | Mong đợi | Thực chạy | Kết luận |
| --- | --- | --- | --- |
| 12:00 | 2 chờ; A195/C96 giờ; 1/4=25%; 1/1 | 2; A195/C96; 25%; 1/1 | Khớp |
| 13:00, B nguồn không khả dụng | 2 chờ; A196/C97; 25%; 1/1 | 2; A196/C97; B chưa mở vòng; 25%; 1/1 | Khớp |
| 14:00, B gửi đạt | 3 chờ; A197/B0/C98; 25%; 2/0 | 3; A197/B0/C98; B vòng 2; 25%; 2/0 | Khớp |
| 15:00, MGR-01 trả A | 2 chờ; B1/C99; 2/4=50%; 1/1 | 2; B1/C99; A chờ sửa; 50%; 1/1 | Khớp |
| Reset xác nhận | T0, seed và cấu hình khởi tạo | Đúng năm PR, REQ-01, Đạt, 12:00 | Khớp |

### Mapping 18 hành vi

Nguồn dòng từ file 2A đã đọc trực tiếp, vẫn khớp `b579cdc`. S = `logic/pr-session.mjs`, V = `logic/validation.mjs`, M = `logic/metrics.mjs`; UI = `app.mjs`; QA = `qa/browser-qa.mjs`. Kết quả dưới đây chỉ trong phạm vi prototype/Chrome đã nêu, không coi là nghiệm thu toàn bộ hành vi hoặc full audit.

| ID | Mô tả | Nguồn file/dòng | Chức năng/module/test | Bằng chứng |
| --- | --- | --- | --- | --- |
| PR-BHV-01 | Danh sách/tìm/chọn/tạo | 2A:44; SIM-03 | UI listView; S list/beginNew; QA M1/M4 | pr-01-list; tìm mã/mô tả/rỗng/xóa đạt |
| PR-BHV-02 | Mở lại nháp | 2A:45 | UI route/form; S openForm; QA M2 | Lưu/rời/mở lại đạt |
| PR-BHV-03 | Nhập tám trường | 2A:51; 2B:143 | UI field/formView; V; QA M2 | pr-02-form |
| PR-BHV-04 | Lưu nháp thiếu trường | 2A:52; SIM-04 | UI mutate; S save; QA M2 | Lưu/mở lại, tăng 1 giờ đạt |
| PR-BHV-05 | Validation lỗi | 2A:53 | UI mutate/field; V; QA M2 | pr-02-submit-error; focus/link đạt |
| PR-BHV-06 | Ngân sách không đạt | 2A:54; SIM-01 | S submit; UI notice; QA M2 | Hai nhánh chặn khác nhau đạt |
| PR-BHV-07 | Gửi hợp lệ lần đầu | 2A:55 | S submit; UI mutate; QA M2 | PR mới mở vòng 1 đạt |
| PR-BHV-08 | Sửa/gửi lại | 2A:56; SIM-02 | S edit/save/submit; QA M2/M3 | pr-02-returned-13; pr-04-queue-14 |
| PR-BHV-09 | Kịch bản ngân sách | 2A:57; SIM-01 | UI điều khiển; S setBudget; QA M2/M3 | Ba kịch bản đạt, không đổi bằng chứng cũ |
| PR-BHV-10 | Chi tiết/trạng thái | 2A:65 | UI detailView; S detail; QA M1 | pr-03-detail-c |
| PR-BHV-11 | Lý do/bước sửa | 2A:66 | UI form/detail; S detail; QA M2/M3 | pr-02-returned-13 |
| PR-BHV-12 | Phê duyệt | 2A:67 | S decide; UI approve; QA M3 | Duyệt A/C, queue trống, không còn quyết định đạt |
| PR-BHV-13 | Từ chối/xác nhận | 2A:68 | UI dialog; S decide; QA M3 | Hủy giữ giờ; xác nhận đóng vòng đạt |
| PR-BHV-14 | Trả có lý do | 2A:69 | UI return-panel; S decide; QA M3 | Thiếu lý do không tăng giờ; đủ lý do 15:00 đạt |
| PR-BHV-15 | Lịch sử được xem | 2A:70; SIM-03 | UI history; S history; QA M1/M3 | pr-03-detail-c; chỉ quy trình tối thiểu |
| PR-BHV-16 | Chi tiết theo vai | 2A:71; SIM-03 | UI actions; S kiểm tra quyền; logic test + QA M3/M4 | Đổi vai/cảnh báo, hành động hợp lệ đạt |
| PR-BHV-17 | Hàng đợi | 2A:77; SIM-03 | UI queueView; S queue; QA M1/M3 | pr-04-queue-12; queue trống đạt |
| PR-BHV-18 | Metric/cohort | 2A:78; metric:50/62/74/86 | M; UI queueView; logic test + QA M3/M5 | pr-04-queue-12/13/14/15; fixture chất lượng đạt |

Giới hạn còn lại: chưa thử trình duyệt khác/headful, đóng tab/cửa sổ, công nghệ hỗ trợ hoặc UAT người dùng. 390 px đã kiểm tra bổ sung, không đại diện kiểm thử mọi thiết bị. Lịch sử chỉ là quy trình SIM-03, không audit đầy đủ. Các giá/nhu cầu demo không được xác minh thực tế. Không có lỗi chức năng cốt lõi còn mở được ghi nhận trong phiên kiểm tra này.

### Kiểm tra bảo toàn cuối lượt

Đối chiếu SHA-256 với snapshot: seed, README dữ liệu, toàn bộ wireframe (gồm README thay đổi sẵn), ba tài liệu thiết kế và toàn bộ file tracked ngoài README kỹ thuật giữ nguyên. Bốn module logic và ba test/fixture của 3B.1 cũng giữ nguyên. Seed trên đĩa vẫn khớp blob trong `b9232f3`; ba thiết kế vẫn khớp `b579cdc`.

Đã kiểm tra liên kết/ảnh/Markdown, whitespace file mới và `git diff --check`. Chỉ README kỹ thuật tracked được sửa; các file mới nằm trong `prototype/pr/`. README wireframe vẫn là thay đổi chưa commit từ trước, không stage. Commit triển khai 3B.2 chỉ chứa các file thuộc `prototype/pr/`, không gồm thay đổi có sẵn của wireframe. Không push/merge hoặc bắt đầu 3C.

### Hai điểm UI đã sửa sau review

Snapshot trước sửa: `<bằng chứng ngoài repo của lượt lịch sử>`. Không đổi module tính toán, phạm vi dữ liệu, seed hoặc các số đo.

- Cột thao tác rộng 128 px; nút Xem xét dùng chữ một dòng và padding phù hợp. Tại 1280/1440 px, cả bốn mốc mô phỏng 12:00/13:00/14:00/15:00 đều đạt: chữ một dòng, nút cao 46 px, nằm trong ô, không cuộn ngang toàn trang. Có tám bản ghi kiểm tra kích thước thực trong log CDP; ảnh kiểm tra 1280 px để ngoài repo, bộ ảnh hiện hành giữ 1440 px.
- Vùng chính dùng “Nhóm PR trong kỳ”, giữ kỳ, thời điểm báo cáo, tỷ lệ/tử/mẫu số và số PR chờ xem xét/chờ sửa. ID metric và chi tiết chẩn đoán, gồm các số 0, nằm trong Cách tính và chất lượng dữ liệu. Chi tiết PR cũng chuyển dòng chẩn đoán vào phần mở rộng. Khi fixture có năm hồ sơ không xác định, cảnh báo ngắn vẫn nhìn thấy bên ngoài; mở phần chi tiết thấy đúng số lượng. Không ẩn số PR chờ sửa bằng 0 vì đó là thông tin nghiệp vụ cần giữ.

Đã chạy lại 49 test Node và toàn bộ QA trình duyệt; chuỗi chuẩn giữ nguyên kết quả. Chín ảnh hiện hành được chụp lại trực tiếp, giữ đúng nhãn mốc mô phỏng; bảng giờ chụp ghi phiên sau review.

### H1 — artifact static local (16/10/2026)

Nguồn H1: `main` tại `ec1bcbaeece2adefbe78e16f4d87a7afaa5f4d0f`; đã xác minh `42f6c57`, `07e5f68`, `ec1bcba` là commit tồn tại trong lịch sử HEAD. Branch `pr-prototype` cùng HEAD (ahead/behind 0/0), working tree sạch trước khi tạo `pr-static`. Các kết quả 3B.2/3C bên trên giữ nguyên phạm vi và phiên bản lịch sử.

Đóng gói từ root repo bằng Node có sẵn (H1 thực dùng **v22.14.0**):

```powershell
$prNode = 'node'
& $prNode prototype/pr/build-static.mjs
```

[build-static.mjs](./build-static.mjs) đọc đủ nguồn trước khi thay đầu ra, lỗi nếu thiếu file, rồi tạo lại `prototype/pr/dist/`. Đây là artifact tự sinh, không chỉnh tay hoặc commit; ignore chỉ `/prototype/pr/dist/`. Nguồn chính vẫn ở `prototype/pr/`; font nguồn duy nhất vẫn ở `wireframes/pr/`. Không cài dependency.

Gói gồm đúng **13 file**: `index.html`, `styles.css`, `app.mjs`; bốn module trong `logic/`; `data/seed.json`; bốn TTF Be Vietnam Pro 400/500/600/700 và `fonts/OFL.txt`. Sao chép byte từ danh sách nguồn tường minh; không đưa test/fixture/QA/server/README/ảnh/wireframe/snapshot/log vào gói. Build thành công mới dùng artifact; build lỗi không được coi đầu ra cũ là bản mới.

Thử bằng server tĩnh thông thường dưới đường dẫn con; ví dụ dùng Python có sẵn, từ root repo (không dùng `serve.mjs` để phục vụ gói):

```powershell
$prStaticRoot = Join-Path ([System.IO.Path]::GetTempPath()) ('pr-static-preview-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $prStaticRoot | Out-Null
Copy-Item -LiteralPath prototype/pr/dist -Destination (Join-Path $prStaticRoot 'retail-p2p-ba-case-study') -Recurse
python -m http.server 8082 --bind 127.0.0.1 --directory $prStaticRoot
```

Mở `http://127.0.0.1:8082/retail-p2p-ba-case-study/` (có dấu `/` cuối). Dừng server này bằng Ctrl+C khi xong; nếu cổng bận, chọn cổng khác. Đây là bản sao artifact tạm để thử, không phải nguồn cần bảo trì. Hosting sau này chỉ cần phục vụ file và directory index, có MIME ES module; không router hoặc rewrite. Cách chạy local cũ ở phần trên vẫn giữ nguyên; `file://` không thuộc phạm vi hỗ trợ.

Chạy toàn bộ test prototype, gồm kiểm tra đóng gói:

```powershell
$prTests = @(Get-ChildItem prototype/pr/test/*.test.mjs | ForEach-Object FullName)
& $prNode --test @prTests
```

H1 kiểm tra kỹ thuật local bằng Chrome/155.0.8059.40 headless qua CDP và server filesystem độc lập, dùng cổng ngẫu nhiên: mọi request runtime nằm dưới `/retail-p2p-ba-case-study/`, HTTP 200 đúng MIME cho HTML/CSS/module/seed/bốn font, giấy phép truy cập được. File ngoài gói và URL không tồn tại trả 404, không có fallback. Không lỗi console ảnh hưởng khởi tạo. `CSS.getPlatformFontsForNode` xác nhận glyph thực dùng Be Vietnam Pro (Bold trên tiêu đề/brand, Medium trên đồng hồ), không chỉ computed CSS; cả bốn weight tải được.

Cả artifact dưới đường dẫn con và server local cũ đều khởi tạo 5 PR ở REQ-01, ngân sách PASS/Đạt, thời gian `2026-10-10T12:00:00+07:00`; đổi MGR-01 thấy PR-A/PR-C, `195,00`/`96,00 giờ`, `25,00%` với `1 / 4 PR`. Kiểm tra này thuộc H1, không phải UAT hoặc chạy lại chuỗi nghiệp vụ 3C. H2 kiểm tra bản static theo nghiệp vụ; H3 mới thiết lập/công bố hosting. H1 chưa publish, cấu hình Pages/workflow, commit, push hoặc merge.

Kết quả test H1: chạy toàn bộ bốn file *.test.mjs đúng một lượt sau sửa, **50 test thực chạy, 50 đạt, 0 lỗi, 0 bỏ qua** (49 test hiện có và một test đóng gói mới). Test đóng gói kiểm tra đúng danh sách/byte, tái tạo không giữ file thừa và thiếu seed phải thất bại trước khi thay đầu ra. SHA-256 seed, cả bốn module logic, wireframe/font/giấy phép và mọi file tracked ngoài bốn file đã chủ ý sửa đều khớp snapshot trước sửa. Đã kiểm tra diff, liên kết mới, git diff --check và git check-ignore -v: chỉ artifact bị ignore, source và thư mục dist khác không bị ignore.

### Kiểm tra bản static

**H2 hoàn tất trong phạm vi kiểm tra local này.** Kết quả dưới đây đến từ phiên trình duyệt mới trên **Build A**, không lấy kết quả server local cũ, 3C hoặc test Node để kết luận H2. Không phải UAT hoặc xác nhận quyền/bảo mật thực tế.

**Dữ liệu tổng hợp — minh họa cách đo, không phải kết quả vận hành thực tế.**

Nguồn: branch `pr-static`, commit `dac523d6cbb87643dce222b077b96e03ce18beb6`, working tree sạch trước kiểm tra. Windows/PowerShell, Node **v22.14.0**, **Chrome/155.0.8059.40 headless**, Chrome DevTools Protocol qua Node WebSocket có sẵn; không cài dependency. Phiên đạt chạy **16/10/2026 15:17:57.105–15:18:57.161 UTC+07:00**. Viewport **1440×1000**, thêm bốn màn hình ở **1280×1000**, **1440×1000**, **390×1000**; zoom 100%, `deviceScaleFactor=1`, `visualViewport.scale=1`.

Lệnh build từ root repo:

```powershell
& $prNode prototype/pr/build-static.mjs
```

`$prNode` dùng executable đã ghi ở H1. Chỉ script build tạo lại `prototype/pr/dist/`, không xóa thủ công. Build A có đúng **13 file** theo danh sách H1, từng byte khớp nguồn: HTML/CSS/app, bốn module logic, seed, bốn TTF và OFL; không test/QA/server/tài liệu/ảnh. Manifest gắn commit nguồn và SHA-256 từng file nguồn/artifact. Sau toàn bộ thao tác trình duyệt, **13/13 file khớp manifest Build A; file khác: không có**. Toàn bộ 119 file tracked khớp snapshot trước khi bổ sung mục README này; không sửa seed, logic, nguồn ứng dụng, QA trong repo, wireframe hoặc `verification.md`.

Snapshot, manifest đầy đủ, helper/server tạm, log CDP và ảnh bố cục thử nằm ngoài repo tại `<bằng chứng ngoài repo của lượt lịch sử>`: `snapshot.json` (đã đọc lại trước build), `build-a-manifest.json`, `build-a-after-browser.json`, `h2-browser-results.json`, `network-audit.json`, `cdp-events.json`, `server-requests.ndjson`. Temp có thể bị hệ điều hành dọn; năm ảnh chuỗi chuẩn bên dưới được giữ trong repo.

Server thử `serve-artifact.mjs` nằm trong thư mục Temp trên, dùng `node:http` và `node:fs`, bind loopback/cổng khả dụng, chỉ ánh xạ `/retail-p2p-ba-case-study/` đến **trực tiếp `prototype/pr/dist/`**. Không khởi động/import `serve.mjs`, không lấy tài nguyên từ wireframe, không fallback hoặc rewrite. Helper QA chỉ kết nối URL server đã khởi động độc lập. URL thực tế: **http://127.0.0.1:50838/retail-p2p-ba-case-study/**. Server và trình duyệt do lượt H2 tạo đã dừng sau kiểm tra; URL này không còn được phục vụ.

| Kiểm tra kỹ thuật | Mong đợi | Thực chạy / kết luận |
| --- | --- | --- |
| Truy cập `/` | 404 hoặc trang không chứa ứng dụng | **404**, nội dung `Not found`, không có `#app`; đạt phép thử không fallback, không suy thành yêu cầu hosting. |
| Truy cập đường dẫn con, điều hướng và tải lại | Tài nguyên lấy từ artifact, đúng MIME, khởi tạo không lỗi | **37 request trình duyệt / 13 URL duy nhất** gồm lượt đọc giấy phép; tất cả dưới prefix, HTTP 200, không request ngoài artifact. HTML/CSS/ES module/JSON/TTF/text đúng MIME; không lỗi tải hoặc console trong ứng dụng. |
| Font tiếng Việt | Glyph thật dùng Be Vietnam Pro | `CSS.getPlatformFontsForNode`: Bold ở h1, Medium ở nhãn dữ liệu tổng hợp, SemiBold ở h2, Regular ở footer; đều custom font, có glyph tiếng Việt. Bốn TTF tải thành công; OFL đọc được từ artifact. Đạt. |
| Desktop 1280/1440, 100% | Không chồng chữ, cắt nút hoặc cuộn ngang toàn trang | Bốn màn hình mỗi kích thước: `scrollWidth <= clientWidth`, chữ trong nút nằm trong hộp nút; đã đọc ảnh thật, không thấy chồng/cắt. Nhãn dữ liệu tổng hợp và giới hạn lưu bộ nhớ hiển thị. Đạt. |
| Bổ sung 390 px | Quan sát responsive, không chặn desktop | Bốn màn hình không cuộn ngang toàn trang; bảng rộng cuộn ngang trong vùng bảng. Không kết luận đã thao tác đầy đủ mọi nút ở mobile. |

Chuỗi chuẩn chạy **liên tục từ seed trong một phiên**, không xen Lưu nháp/Lưu phần sửa hoặc reset giữa bốn mốc. Đổi ngân sách/chuyển vai được đối chiếu không tăng giờ. Ngữ cảnh nhóm dưới đây lần lượt là số PR chờ xem xét/chờ chỉnh sửa trong nhóm kỳ, khác quần thể hàng đợi.

| Mốc mô phỏng / bước | Mong đợi | Thực chạy | Kết luận |
| --- | --- | --- | --- |
| 12:00, seed; MGR-01, Đạt | Hàng đợi A/C; 195/96 giờ; 1/4 = 25%; nhóm 1/1 | A/C, `195,00`/`96,00 giờ`, `25,00%`, `1 / 4 PR`, nhóm 1/1 | Đạt |
| 13:00, REQ-01 gửi lại B, nguồn không khả dụng; chuyển MGR-01 | B giữ Chờ chỉnh sửa; A/C 196/97 giờ; 25%; nhóm 1/1 | B chưa vào hàng đợi; A/C `196,00`/`97,00 giờ`, `25,00%`, nhóm 1/1 | Đạt |
| 14:00, đổi Đạt, REQ-01 gửi lại B; chuyển MGR-01 | B mở vòng 2; A/B/C 197/0/98 giờ; 25%; nhóm 2/0 | Đúng ba PR, B vòng 2; `197,00`/`0,00`/`98,00 giờ`, `25,00%`, nhóm 2/0 | Đạt |
| 15:00, MGR-01 trả A với lý do hợp lệ | A rời hàng đợi; B/C 1/99 giờ; 2/4 = 50%; nhóm 1/1 | B/C, `1,00`/`99,00 giờ`, `50,00%`, `2 / 4 PR`, nhóm 1/1 | Đạt |
| Reset sau chuỗi | Seed 5 PR, REQ-01, Đạt, 12:00 | Đúng 5 PR ban đầu, vai trò/ngân sách/đồng hồ phục hồi | Đạt |

Mỗi kịch bản độc lập sau đây đều reset trước khi chạy. Kết quả lấy từ DOM/đồng hồ/lịch sử hiển thị và thao tác trình duyệt, không truy cập trực tiếp đối tượng session để thay cho UI.

| Kịch bản | Mong đợi | Thực chạy / kết luận |
| --- | --- | --- |
| Lưu nháp thiếu trường rồi rời/mở lại | Giữ nội dung, chưa chuyển xem xét, tăng một giờ | PR-NEW-1 giữ lý do nhập, trung tâm chi phí còn trống, Nháp, 13:00. Đạt. |
| Lưu phần sửa B bị trả lại | Giữ Chờ chỉnh sửa và nội dung đã lưu | Rời/mở lại có lý do mới, Chờ chỉnh sửa, 13:00. Đạt. |
| Gửi thiếu trường | Giữ dữ liệu, lỗi tại trường/tổng hợp, chưa kiểm tra ngân sách, +1 giờ | Năm trường lỗi có thông báo, focus tổng hợp rồi liên kết tới trung tâm chi phí; lý do đã nhập còn nguyên, 13:00 dù chọn Không đủ ngân sách. Đạt. |
| Ngân sách không đủ | Chặn chuyển xem xét | B vẫn Chờ chỉnh sửa, 13:00; hàng đợi chỉ A/C. Đạt. Nguồn không khả dụng và gửi lại Đạt đã thử riêng trong chuỗi chuẩn. |
| Trả lại thiếu lý do | Không tạo quyết định, không tăng giờ | Báo lý do không trống; A còn Chờ xem xét, lịch sử không tăng, vẫn 12:00. Đạt. |
| Phê duyệt A | Đóng vòng, cập nhật danh sách/hàng đợi | A Đã duyệt, thời gian chờ Không áp dụng, lịch sử có một quyết định, sẵn sàng Mua hàng ngoài demo; hàng đợi còn C, danh sách ghi Đã duyệt, 13:00. Đạt. |
| Từ chối A: hủy rồi xác nhận | Hủy giữ phiên; xác nhận đóng vòng, không sửa/gửi lại | Hủy giữ nguyên DOM nghiệp vụ/giờ/ngữ cảnh; xác nhận A Đã từ chối, Không áp dụng, hàng đợi còn C, 13:00. Người yêu cầu không có nút sửa hoặc gửi lại trên danh sách/chi tiết. Đạt trong phạm vi UI. |
| Bấm lặp Gửi lại / Lưu nháp | Chỉ xử lý một lần | Gửi B hai lần sát nhau chỉ thêm một lần gửi lại (ba mục lịch sử), 13:00; Lưu nháp lặp chỉ tạo một PR mới (sáu PR), 13:00. Đạt. |
| Tìm mã/mô tả, không có kết quả, xóa tìm | Trim, không phân biệt hoa/thường; khôi phục danh sách | `  pr-b  ` tìm B; `MÁY QUÉT` tìm A; chuỗi không khớp báo rỗng; Xóa tìm kiếm trở về năm PR, không tăng giờ. Đạt. |
| Rời form chưa lưu | Tiếp tục giữ nhập; bỏ thay đổi bỏ phần chưa lưu | Hủy rời form giữ lý do mới; hủy đổi vai giữ REQ-01; xác nhận bỏ thay đổi rồi mở lại có giá trị cũ, vẫn 12:00. Đạt. |
| Hủy reset | Giữ nguyên cả phần nhập và kịch bản/ngữ cảnh | Form, lý do chưa lưu, lựa chọn Không đủ ngân sách, giờ và vai trò giữ nguyên. Đạt. |
| Tải lại sau thay đổi dữ liệu | Bỏ thay đổi, về seed/12:00/REQ-01/Đạt | Phê duyệt A rồi đổi ngân sách và reload: A lại Chờ xem xét, lịch sử một mục seed, năm PR và mặc định phục hồi. Request sau điều hướng/reload vẫn từ đường dẫn con. Đạt. |
| beforeunload trên Chrome đã nêu | Ghi quan sát theo thao tác cụ thể | Click/`Input.insertText` thật vào form bẩn, `Page.reload`: Chrome mở beforeunload; hủy giữ form/nhập, chấp nhận reload về seed. Chỉ chứng minh thao tác reload trên Chrome headless này. |

**23 mục kiểm tra trong log đạt**, gồm các mốc chuỗi và kiểm tra kỹ thuật; thêm 12 bản ghi bố cục (bốn màn hình × ba viewport). Không phát hiện lỗi ứng dụng/đóng gói cần sửa. Lượt helper đầu lúc 15:17:06–15:17:33 bị dừng vì helper để panel demo mở che nút Xem xét; đã sửa helper **ngoài repo** để đóng panel trước click, xác nhận hash vẫn 13/13, chạy lại toàn bộ phiên đạt nêu trên. Log lượt dừng giữ riêng `h2-browser-attempt1.json`/`cdp-events-attempt1.json`; không dùng lượt thiếu bước đó làm bằng chứng đạt. Không chạy lại test Node vì không sửa code ứng dụng/logic/server/đóng gói hoặc QA trong repo; số 50/50 ở H1 không được dùng thay kết quả H2.

Năm ảnh chụp mới trực tiếp bằng `Page.captureScreenshot`, viewport 1440×1000, có vai trò/giờ/kịch bản ngân sách trên giao diện; giờ chụp thực theo 16/10/2026 UTC+07:00:

| Ảnh | Giờ chụp thực | Vai trò / giờ mô phỏng / ngân sách |
| --- | --- | --- |
| [static-queue-12.png](./evidence/static/static-queue-12.png) | 15:17:57.467 | MGR-01 / 12:00 10/10/2026 / Đạt |
| [static-queue-13.png](./evidence/static/static-queue-13.png) | 15:17:58.815 | MGR-01 / 13:00 10/10/2026 / Nguồn dữ liệu ngân sách không khả dụng |
| [static-queue-14.png](./evidence/static/static-queue-14.png) | 15:18:00.188 | MGR-01 / 14:00 10/10/2026 / Đạt |
| [static-queue-15.png](./evidence/static/static-queue-15.png) | 15:18:02.248 | MGR-01 / 15:00 10/10/2026 / Đạt |
| [static-reset.png](./evidence/static/static-reset.png) | 15:18:03.242 | REQ-01 / 12:00 10/10/2026 / Đạt, reset sau chuỗi |

**Giới hạn:** seed chỉ có PR-A–PR-E đều thuộc REQ-01; H2 chỉ xác nhận UI hiển thị đúng năm PR của dữ liệu mẫu, chưa chứng minh UI loại PR của người yêu cầu khác. Không dùng fixture đổi chủ sở hữu trong H2. Đã đọc đối chiếu test `SIM-03 scopes detail/history/form/actions by owner and unit; metrics use entire unit` trong [session.test.mjs](./test/session.test.mjs), có OTHER-OWNER/OTHER-UNIT và kiểm tra chặn; đó là bằng chứng lớp logic đã có, không phải phép thử UI H2 mới. Chuyển vai không thay thế kiểm tra lọc theo chủ sở hữu. Chưa thử browser khác, headful, đóng tab/cửa sổ, đầy đủ ca biên metric, accessibility hoặc UAT; không suy rộng quan sát beforeunload. Giới hạn mobile bảng cuộn nội bộ như trên.

Chỉ bổ sung mục README này và năm ảnh static; kết quả 3C trong `verification.md` giữ nguyên. Không stage/commit `dist/`, không workflow, Pages, hosting công khai, commit, push hoặc merge trong H2.
