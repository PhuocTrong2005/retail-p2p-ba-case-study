# 07 — Đặc tả yêu cầu phần mềm

## Mục đích và kết quả chính

Phần này mô tả hệ thống phải làm gì và dùng tiêu chí nào để kiểm tra yêu cầu. Đặc tả yêu cầu phần mềm (Software Requirements Specification — SRS) gồm **16 yêu cầu chức năng (FR), 4 yêu cầu phi chức năng (NFR) và 37 tiêu chí chấp nhận (AC)**, dựa trên yêu cầu nghiệp vụ (BRQ) và ca sử dụng (UC).

Mỗi AC nêu điều kiện Cho trước/Khi/Thì và nguồn nghiệp vụ để chuẩn bị kiểm thử baseline P2P. Các AC chưa được xác nhận đạt đầy đủ trên một hệ thống triển khai. Một số hành vi liên quan đã được [kiểm chứng trong prototype PR](../prototype/pr/verification.md) theo phạm vi mô phỏng; kết quả này không thay đổi mức bao phủ yêu cầu và không phải kiểm thử chấp nhận người dùng (UAT) hoặc ký duyệt của các bên liên quan thực tế.

## Đọc sâu

- [Đặc tả yêu cầu phần mềm (SRS)](./srs.md): toàn văn FR/NFR/AC và nguồn truy vết.
- [Ma trận truy vết yêu cầu (RTM) và phần còn thiếu](../08-traceability/requirements-traceability-matrix.md): cho biết yêu cầu nào có AC và phần nào mới được bao phủ một phần. NFR-01/02 có mức bao phủ tổng quát; chi tiết còn phụ thuộc quyết định OD-07 và danh mục sự kiện. Mức dễ hiểu của NFR-04 vẫn cần xác nhận với người dùng. Việc có AC không đồng nghĩa đã thực hiện kiểm tra.

Đọc căn cứ tại [tài liệu yêu cầu nghiệp vụ và danh mục BRQ](../05-brd/README.md), [quy tắc nghiệp vụ](../04-to-be-design/business-rules.md) và [phân tích hệ thống](../06-system-analysis/README.md). SRS chưa xác định kiến trúc phần mềm; các yêu cầu chưa phải chức năng đã triển khai.

Tiếp theo: [08 — Truy vết](../08-traceability/README.md).
