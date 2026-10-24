# EduManage Pro - Phần Mềm Quản Lý Sinh Viên Hiện Đại

Hệ thống quản lý hồ sơ sinh viên chuyên nghiệp, giao diện Dashboard hiện đại chuẩn UI/UX, hỗ trợ tiếng Việt 100%, chạy mượt mà trên mọi trình duyệt web.

---

## 🚀 Cách Chạy Phần Mềm

Bạn có 2 cách cực kỳ đơn giản để sử dụng:

### Cách 1: Chạy trực tiếp (Nhanh nhất - Không cần cài đặt)
* **Nhấp đúp chuột vào file `start.bat`** (hoặc mở trực tiếp file `index.html` bằng trình duyệt Chrome, Edge, Cốc Cốc, Firefox...).
* Ứng dụng sẽ mở ngay lập tức với đầy đủ giao diện và tính năng.

### Cách 2: Chạy qua máy chủ cục bộ (Local Server)
* **Nhấp đúp chuột vào file `start-server.bat`**.
* Máy chủ Java tích hợp sẵn sẽ tự động biên dịch và mở ứng dụng tại địa chỉ: `http://localhost:8080/`.

---

## 🌟 Các Tính Năng Nổi Bật

### 1. Quản lý Hồ sơ Sinh viên Toàn diện
* **Thông tin chi tiết**: Mã sinh viên (MSSV), Họ và tên, Giới tính, Ngày sinh, Khoa / Viện đào tạo, Lớp học, Khóa học, Quê quán (63 tỉnh thành), Địa chỉ thường trú, Số điện thoại, Email, Trạng thái học tập, Ghi chú khen thưởng/kỷ luật.
* **Ảnh chân dung (Avatar)**: Tự động tải ảnh từ máy tính (nén và lưu trữ an toàn) hoặc tự sinh avatar màu nhận diện cá nhân sinh động.
* **Tự động sinh mã**: Gợi ý mã sinh viên tự động tăng (VD: `SV2026001`, `SV2026002`,...).

### 2. Thẻ Sinh Viên Số (Digital Student ID Card)
* Thiết kế mô phỏng thẻ nhựa sinh viên chuyên nghiệp của các trường đại học hàng đầu.
* Hiển thị avatar, logo, mã vạch/mã QR, thông tin khóa học.
* Hỗ trợ **In Thẻ Sinh Viên** riêng biệt chỉ với 1 cú nhấp chuột.

### 3. Tìm Kiếm & Bộ Lọc Đa Chiều (Smart Search & Filter)
* **Tìm kiếm tức thì (Search as you type)**: Tìm nhanh theo Tên, MSSV, Số điện thoại, Email, Quê quán.
* **Lọc đa tiêu chí**: Lọc theo Khoa, Lớp học, Giới tính, Trạng thái học tập (Đang học, Bảo lưu, Đã tốt nghiệp, Đã thôi học).
* **Sắp xếp linh hoạt**: Bấm vào tiêu đề cột để sắp xếp tăng/giảm theo MSSV, Họ tên (chuẩn tiếng Việt), Ngày sinh, Quê quán, Trạng thái.

### 4. Thao tác Hàng loạt (Batch Operations)
* Chọn nhiều sinh viên cùng lúc bằng checkbox.
* Xóa hàng loạt có hộp thoại xác nhận an toàn.
* Xuất file Excel riêng cho các sinh viên đã chọn.

### 5. Nhập & Xuất Dữ Liệu Chuyên Nghiệp (Import / Export)
* **Xuất Excel (.xlsx)**: Xuất bảng danh sách sinh viên chuẩn định dạng, có căn chỉnh độ rộng cột thẩm mỹ.
* **Xuất CSV (.csv)**: Hỗ trợ UTF-8 có BOM chống lỗi font tiếng Việt khi mở bằng Excel.
* **Nhập Excel / CSV**: Hỗ trợ kéo thả file, có xem trước danh sách (Preview) và kiểm tra trùng lặp mã sinh viên trước khi lưu.
* **Tải file mẫu**: Cung cấp sẵn file mẫu chuẩn `.xlsx` để người dùng dễ dàng nhập liệu số lượng lớn.

### 6. Sao Lưu & Khôi Phục An Toàn (Backup & Restore)
* **Sao lưu (Backup)**: Tải file sao lưu `.json` về máy tính bất cứ lúc nào.
* **Khôi phục (Restore)**: Nạp lại toàn bộ dữ liệu từ file sao lưu dễ dàng.
* **Dữ liệu mẫu (Reset Data)**: Tích hợp sẵn hàng chục hồ sơ sinh viên mẫu thực tế để trải nghiệm ngay.

### 7. Giao diện & Trải nghiệm (UI/UX)
* Hỗ trợ **Chế độ Sáng / Tối (Dark Mode / Light Mode)** bảo vệ mắt.
* Biểu đồ tròn trực quan thể hiện tỷ lệ sinh viên theo từng Khoa/Viện.
* Thông báo Toast sinh động, hiệu ứng mượt mà.
* Hỗ trợ In ấn (Print Friendly) chuẩn định dạng văn bản báo cáo.

---

## 📁 Cấu Trúc Thư Mục

```text
d:\Downloads\Studen/
├── index.html            # Giao diện chính hoàn chỉnh
├── start.bat             # File khởi động 1-click mở ứng dụng ngay
├── start-server.bat      # File chạy máy chủ Java HTTP localhost:8080
├── Server.java           # Máy chủ tĩnh viết bằng Java thuần
├── css/
│   └── style.css         # CSS tùy biến, thẻ sinh viên, dark mode, in ấn
├── js/
│   ├── data.js           # Quản lý dữ liệu mẫu, khoa, lớp, LocalStorage
│   ├── export-import.js  # Xử lý xuất nhập Excel/CSV, sao lưu/khôi phục
│   └── app.js            # Logic ứng dụng, CRUD, tìm kiếm, lọc, modal
└── README.md             # Tài liệu hướng dẫn sử dụng
```
