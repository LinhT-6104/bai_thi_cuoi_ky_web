document.addEventListener('DOMContentLoaded', function() {
    // Thêm tài khoản
    const themtaikhoan = document.getElementById('themtaikhoan');
    const formthem = document.getElementById('formthem');

    themtaikhoan.addEventListener('click', function() {
        const isSearchBarVisible = formthem.style.display === 'block';
        formthem.style.display = isSearchBarVisible ? 'none' : 'block';
    });
});

function themhang() {
    let danhsachnguoidung = down_local_user();
    let table = document.getElementById('bangthem');
    table.innerHTML = "";
    let a = 1;
    danhsachnguoidung.forEach((nguoidung, index) => {
        let row = table.insertRow();

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.innerHTML = a;
        cell2.innerHTML = nguoidung.nameID;
        cell3.innerHTML = nguoidung.pass;
        cell4.innerHTML = `
            <button id="showsua" onclick="hienthiformsua(${index})">Sửa</button>
            <button id="btnxoa" onclick="xoa(${index})">Xóa</button>`;
        a++;
    });
};
window.onload = themhang;

function hienthiformsua(index) {
    const formsua = document.getElementById('formsua');
    const isSearchBarVisible = formsua.style.display === 'block';
    formsua.style.display = isSearchBarVisible ? 'none' : 'block';
    
    let danhsachnguoidung = down_local_user();
    
    let namelogin = document.getElementById('renamelogin');
    let pass = document.getElementById('repassword');
    namelogin.value = danhsachnguoidung[index].nameID;
    pass.value = danhsachnguoidung[index].pass;

    const btnsua = document.getElementById('btnsua');
    btnsua.onclick = function() {
        suanguoidung(index);
    }
}

function suanguoidung(i) {
    let renamelogin = document.getElementById('renamelogin').value;
    let repassword = document.getElementById('repassword').value;
    let danhsachnguoidung = down_local_user();
    danhsachnguoidung[i].nameID = renamelogin;
    danhsachnguoidung[i].pass = repassword;

    save_local_user(danhsachnguoidung);
    themhang();
}

function xoa(i) {
    let danhsachnguoidung = down_local_user();
    danhsachnguoidung.splice(i,1);
    save_local_user(danhsachnguoidung);
    themhang();
}

function kiemtradangky() {
    let namelogin  = document.getElementById('namelogin').value.trim();
    let password = document.getElementById('password').value.trim();

    let danhsachnguoidung = down_local_user();

    if (namelogin === "" || password === "") {
        alert('Vui lòng điền đầy đủ thông tin');
        return;
    }
    if (!(password.length >= 8) || password.trim().includes(" ")) {
        alert('Mật khẩu phải có độ dài ít nhất 8 ký tự không dấu không cách')
        return
    }
    if (namelogin === 'admin123') {
        alert('Không thể đăng ký tên tài khoản trên!');
        return
    }
    if (danhsachnguoidung.some(user => user.nameID === namelogin)) {
        alert('Tài khoản đã tồn tại vui lòng nhập tên khác');
        return
    }
    let nguoidung = {
        nameID: namelogin, 
        pass: password
    };

    danhsachnguoidung.push(nguoidung);
    save_local_user(danhsachnguoidung);
    alert("Đăng ký thành công!");
    themhang();
}