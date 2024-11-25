document.addEventListener('DOMContentLoaded', function () {
    // Dữ liệu các tỉnh/thành và dân tộc
    const provinces = [
        "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu",
        "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
        "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng",
        "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp",
        "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh",
        "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên",
        "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng",
        "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An",
        "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình",
        "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng",
        "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa",
        "Thừa Thiên Huế", "Tiền Giang", "TP. Hồ Chí Minh", "Trà Vinh",
        "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
    ];

    const ethnicGroups = [
        "Ba Na", "Bố Y", "Bru - Vân Kiều", "Chăm", "Chơ Ro",
        "Chứt", "Co", "Cơ Ho", "Cờ Lao", "Cơ Tu",
        "Dao", "Ê Đê", "Giáy", "Giẻ Triêng", "Hà Nhì",
        "H'Mông", "Hoa", "Hrê", "Kháng", "Khmer",
        "Khơ Mú", "Kinh", "La Chí", "La Ha", "Lào",
        "Lô Lô", "Mạ", "Mảng", "Mường", "Ngái",
        "Nùng", "Ơ Đu", "Pà Thẻn", "Phù Lá", "Pu Péo",
        "Ra Glai", "Rơ Măm", "Sán Chay", "Sán Dìu", "Si La",
        "Tà Ôi", "Tày", "Thái", "Thổ", "Xinh Mun",
        "Xơ Đăng", "X'tiêng"
    ];

    // Đổ dữ liệu vào các dropdown
    const noiSinh = document.getElementById("noisinh");
    const danToc = document.getElementById("dantoc");
    const tinhThanh = document.getElementById("tinh_thanh_thuongtru");

    if (noiSinh) {
        provinces.forEach(province => {
            const option = document.createElement("option");
            option.value = province;
            option.textContent = province;
            noiSinh.appendChild(option);
        });
    }

    if (danToc) {
        ethnicGroups.forEach(ethnic => {
            const option = document.createElement("option");
            option.value = ethnic;
            option.textContent = ethnic;
            danToc.appendChild(option);
        });
    }

    if (tinhThanh) {
        provinces.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            tinhThanh.appendChild(option);
        });
    }

    // Thay đổi hiển thị theo giá trị dropdown
    let table = document.getElementById("bangthem");
    let xemtrangthaiduyet = document.getElementById("xemtrangthaiduyet");

    if (xemtrangthaiduyet) {
        xemtrangthaiduyet.addEventListener('change', function () {
            const trangthaiduyet = xemtrangthaiduyet.value.trim();
            // Lọc và hiển thị hồ sơ theo trạng thái đã chọn
            if (trangthaiduyet === "all") {
                themhangall();  // Hiển thị tất cả hồ sơ
            } else if (trangthaiduyet === "wait") {
                themhang("Chờ duyệt");
            } else if (trangthaiduyet === "ok") {
                themhang("Đã duyệt");
            } else if (trangthaiduyet === "bonus") {
                themhang("Yêu cầu bổ sung thông tin");
            } else {
                themhang("Không duyệt");
            }
        });
    }

    // Hiển thị danh sách hồ sơ ban đầu
    if (table) themhangall();

    // Hàm thêm và quản lý hồ sơ
    function themhang(trangthai) {
        const danhsachhoso = down_local_ho_so();

        if (table) {
            table.innerHTML = "";
            if (["Chờ duyệt", "Đã duyệt", "Không duyệt"].includes(trangthai)) {
                danhsachhoso
                    .filter(hoso => hoso.trangthai === trangthai)
                    .forEach((hoso, index) => addRow(hoso, index));
            } else {
                danhsachhoso
                    .filter(hoso => hoso.trangthai.includes("bổ sung"))
                    .forEach((hoso, index) => addRow(hoso, index));
            }
        }
    }
    function themhangall() {
        if (table) {
            const danhsachhoso = down_local_ho_so();
            table.innerHTML = "";
            danhsachhoso.forEach((hoso, index) => addRow(hoso, index));
        }
    }
    // Hàm thêm từng dòng vào bảng
    function addRow(hoso, index) {
        const row = table.insertRow();
        row.innerHTML = ` 
            <td>${index + 1}</td>
            <td>HS${index + 1}</td>
            <td>${hoso.hoten}</td>
            <td>${hoso.ngaysinh}</td>
            <td>${hoso.gioitinh}</td>
            <td>${hoso.sodt}</td>
            <td>${hoso.trangthai}</td>
            <td>
                <button onclick="duyet(${index})">Duyệt</button>
                <button onclick="bosung(${index})">Bổ sung</button>
                <button onclick="khongduyet(${index})">Không duyệt</button>
                <br><br>
                <button onclick="xemhs(${index})">Xem</button>
                <button onclick="xoa(${index})">Xóa</button>
            </td>`;
    }

    // Các hàm duyệt, bổ sung, không duyệt, xóa và xem hồ sơ
    window.duyet = function (index) {
        updateTrangThai(index, "Đã duyệt");
    }
    window.bosung = function (index) {
        updateTrangThai(index, "Yêu cầu bổ sung thông tin");
    }
    window.khongduyet = function (index) {
        updateTrangThai(index, "Không duyệt");
    }
    window.xoa = function (index) {
        const danhsachhoso = down_local_ho_so();
        danhsachhoso.splice(index, 1);
        save_local_ho_so(danhsachhoso);
        themhangall();
    };
    window.xemhs = function (index) {
        const danhsachhoso = down_local_ho_so();
        const hoso = danhsachhoso[index];
        localStorage.setItem('hosochuyenhuong', JSON.stringify(hoso));  // Lưu thông tin hồ sơ vào localStorage
        window.location.href = '/HTML/thongtinhoso.html';  // Chuyển tới trang thongtinhoso.html
    }
    // Hàm cập nhật trạng thái hồ sơ
    function updateTrangThai(index, trangthai) {
        const danhsachhoso = down_local_ho_so();
        danhsachhoso[index].trangthai = trangthai;
        save_local_ho_so(danhsachhoso);
        themhangall();
    }

    // Hàm lưu hồ sơ
    window.luuhoso = function () {
        const hoten = document.getElementById('hoten').value.trim();
        const ngaysinh = document.getElementById('ngaysinh').value.trim();
        const socccd = document.getElementById('socccd').value.trim();
        const ngaycap = document.getElementById('ngaycap').value.trim();
        const noicap = document.getElementById('noicap').value.trim();
        const gioitinh = document.getElementById('gioitinh').value.trim();
        const noisinh = document.getElementById('noisinh').value.trim();
        const dantoc = document.getElementById('dantoc').value.trim();
        const sodt = document.getElementById('sodt').value.trim();
        const sodt_nguoithan = document.getElementById('sodt_nguoithan').value.trim();
        const email = document.getElementById('email').value.trim();
        const tinh_thanh_thuongtru = document.getElementById('tinh_thanh_thuongtru').value.trim();
        const quan_huyen_thuongtru = document.getElementById('quan_huyen_thuongtru').value.trim();
        const phuong_xa_thuongtru = document.getElementById('phuong_xa_thuongtru').value.trim();
        const diachicuthe = document.getElementById('diachicuthe').value.trim();
        const tinh_thanh_lienlac = document.getElementById('tinh_thanh_lienlac').value.trim();
        const quan_huyen_lienlac = document.getElementById('quan_huyen_lienlac').value.trim();
        const phuong_xa_lienlac = document.getElementById('phuong_xa_lienlac').value.trim();
        const diachilienlac = document.getElementById('diachilienlac').value.trim();

        // Kiểm tra tất cả trường có dữ liệu
        if (!hoten || !ngaysinh || !socccd || !ngaycap || !noicap || !gioitinh || !noisinh || !dantoc ||
            !sodt || !sodt_nguoithan || !email || !tinh_thanh_thuongtru || !quan_huyen_thuongtru || !phuong_xa_thuongtru ||
            !diachicuthe || !tinh_thanh_lienlac || !quan_huyen_lienlac || !phuong_xa_lienlac || !diachilienlac) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        if (socccd.length() != 12) {
            alert("Vui lòng nhập số căn cước công dân hợp lệ!");
            return;
        }

        const hoso = {
            hoten, ngaysinh, socccd, ngaycap, noicap, gioitinh, noisinh, dantoc, sodt, sodt_nguoithan, email,
            tinh_thanh_thuongtru, quan_huyen_thuongtru, phuong_xa_thuongtru, diachicuthe,
            tinh_thanh_lienlac, quan_huyen_lienlac, phuong_xa_lienlac, diachilienlac,
            trangthai: "Chờ duyệt"
        };

        let danhsachhoso = down_local_ho_so();

        const index = danhsachhoso.findIndex(hoso => hoso.socccd === socccd);

        if (index !== -1) {
            danhsachhoso[index] = hoso;
            // danhsachhoso[index] = { ...danhsachhoso[index], ...hoso };
            alert("Cập nhật hồ sơ thành công!");
        } else {
            danhsachhoso.push(hoso);
            alert("Lưu hồ sơ thành công!");
        }
        
        save_local_ho_so(danhsachhoso);
        themhangall();
    }

    // pop-up bổ sung thông tin
    let bosungIndex = null;
    // Tạo HTML của pop-up khi cần bổ sung
    function createPopup() {
        const popupHTML = `
            <div id="popupBosung" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); justify-content: center; align-items: center; z-index: 1000;">
                <div style="background: white; padding: 20px; border-radius: 8px; width: 400px; text-align: center; position: relative;">
                    <h3>Yêu cầu bổ sung thông tin</h3>
                    <textarea id="bosungDetails" placeholder="Nhập các thông tin cần bổ sung..." rows="5" style="width: 100%; margin-top: 10px; padding: 8px;"></textarea>
                    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                        <button id="submitBosung" style="background-color: #4CAF50; color: white; padding: 8px 15px; border: none; border-radius: 5px;">Lưu</button>
                        <button id="cancelBosung" style="background-color: #f44336; color: white; padding: 8px 15px; border: none; border-radius: 5px;">Hủy</button>
                    </div>
                </div>
            </div>
        `;
        const popupContainer = document.createElement("div");
        popupContainer.innerHTML = popupHTML;
        document.body.appendChild(popupContainer);
    }
    createPopup();
    // Hiển thị pop-up bổ sung
    window.bosung = function (index) {
        console.log("Popup bổ sung được gọi với index:", index);
        bosungIndex = index;
        document.getElementById("popupBosung").style.display = "flex";
    };
    // Đóng pop-up
    function closePopup() {
        document.getElementById("popupBosung").style.display = "none";
        document.getElementById("bosungDetails").value = "";
        bosungIndex = null;
    }
    // Xử lý nút "Hủy" trong pop-up
    document.getElementById("cancelBosung").addEventListener("click", function () {
        closePopup();
    });
    // Đóng pop-up khi nhấn ra ngoài
    document.getElementById("popupBosung").addEventListener("click", function (event) {
        if (event.target.id === "popupBosung") {
            closePopup();
        }
    });
    // Lưu thông tin bổ sung
    document.getElementById("submitBosung").addEventListener("click", function () {
        const bosungDetails = document.getElementById("bosungDetails").value.trim();
        if (bosungDetails === "") {
            alert("Vui lòng nhập thông tin cần bổ sung.");
            return;
        }

        const danhsachhoso = down_local_ho_so();
        if (bosungIndex !== null && danhsachhoso[bosungIndex]) {
            danhsachhoso[bosungIndex].trangthai = `Cần bổ sung các thông tin: ${bosungDetails}`;
            save_local_ho_so(danhsachhoso);

            // Cập nhật bảng và đóng pop-up
            closePopup();
            themhangall();
        } else {
            alert("Không tìm thấy hồ sơ cần bổ sung.");
        }
    });

    // Hiển thi thông tin đã có của thí sinh
    function hienthithongtinhoso() {
        let nguoihoatdong = JSON.parse(localStorage.getItem('nguoihoatdong')) || [];
        let danhsachhoso = down_local_ho_so();
        let danhsachnguoidung = down_local_user();

        if (nguoihoatdong.nameID === "admin123") {
            let hosochuyenhuong = JSON.parse(localStorage.getItem('hosochuyenhuong')) || [];
            fillData(hosochuyenhuong);
        } else {
            danhsachnguoidung.forEach(nguoidung => {
                if (nguoidung.nameID === nguoihoatdong.nameID) {
                    danhsachhoso.forEach(hoso => {
                        if (hoso.socccd === nguoihoatdong.cccd) {
                            fillData(hoso);
                            return;
                        }
                    })
                    return;
                }
            });
        }
    }
    function fillData(hoso) {
        console.log("Hồ sơ tìm thấy:", hoso);
        const trangthaihs = document.getElementById('trangthaihs');
        const hoten = document.getElementById('hoten');
        const ngaysinh = document.getElementById('ngaysinh');
        const socccd = document.getElementById('socccd');
        const ngaycap = document.getElementById('ngaycap');
        const noicap = document.getElementById('noicap');
        const gioitinh = document.getElementById('gioitinh');
        const noisinh = document.getElementById('noisinh');
        const dantoc = document.getElementById('dantoc');
        const sodt = document.getElementById('sodt');
        const sodt_nguoithan = document.getElementById('sodt_nguoithan');
        const email = document.getElementById('email');
        const tinh_thanh_thuongtru = document.getElementById('tinh_thanh_thuongtru');
        const quan_huyen_thuongtru = document.getElementById('quan_huyen_thuongtru');
        const phuong_xa_thuongtru = document.getElementById('phuong_xa_thuongtru');
        const diachicuthe = document.getElementById('diachicuthe');
        const tinh_thanh_lienlac = document.getElementById('tinh_thanh_lienlac');
        const quan_huyen_lienlac = document.getElementById('quan_huyen_lienlac');
        const phuong_xa_lienlac = document.getElementById('phuong_xa_lienlac');
        const diachilienlac = document.getElementById('diachilienlac');

        // Kiểm tra tất cả trường có dữ liệu
        if (hoso.hoten || hoso.ngaysinh || hoso.socccd || hoso.ngaycap || hoso.noicap || hoso.gioitin || hoso.oisinh || hoso.dantoc ||
            hoso.sodt || hoso.sodt_nguoithan || hoso.email || hoso.tinh_thanh_thuongtru || hoso.quan_huyen_thuongtru || hoso.phuong_xa_thuongtru ||
            hoso.diachicuthe || hoso.tinh_thanh_lienlac || hoso.quan_huyen_lienlac || hoso.phuong_xa_lienlac || hoso.diachilienlac) 
            {
                trangthaihs.innerText = hoso.trangthai.trim();
                hoten.value = hoso.hoten.trim();
                ngaysinh.value = hoso.ngaysinh.trim();
                socccd.value = hoso.socccd.trim();
                ngaycap.value = hoso.ngaycap.trim();
                noicap.value = hoso.noicap.trim();
                gioitinh.value = hoso.gioitinh.trim();
                noisinh.value = hoso.noisinh.trim();
                dantoc.value = hoso.dantoc.trim();
                sodt.value = hoso.sodt.trim();
                sodt_nguoithan.value = hoso.sodt_nguoithan.trim();
                email.value = hoso.email.trim();
                tinh_thanh_thuongtru.value = hoso.tinh_thanh_thuongtru.trim();
                quan_huyen_thuongtru.value = hoso.quan_huyen_thuongtru.trim();
                phuong_xa_thuongtru.value = hoso.phuong_xa_thuongtru.trim();
                diachicuthe.value = hoso.diachicuthe.trim();
                tinh_thanh_lienlac.value = hoso.tinh_thanh_lienlac.trim();
                quan_huyen_lienlac.value = hoso.quan_huyen_lienlac.trim();
                phuong_xa_lienlac.value = hoso.phuong_xa_lienlac.trim();
                diachilienlac.value = hoso.diachilienlac.trim();
            }
        return;
    }

    hienthithongtinhoso();

    // Hàm quản lý localStorage
    function down_local_ho_so() {
        return JSON.parse(localStorage.getItem('hoso')) || [];
    }

    function save_local_ho_so(danhsachhoso) {
        localStorage.setItem('hoso', JSON.stringify(danhsachhoso));
    }
});