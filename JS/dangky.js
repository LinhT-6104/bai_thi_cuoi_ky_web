function dkytk() {
    let nameID = document.getElementById('nameID').value;
    let email = document.getElementById('email').value;
    let cccd = document.getElementById('cccd').value;
    let fullname = document.getElementById('fullname').value;
    let pass = document.getElementById('pass').value;
    let repass = document.getElementById('repass').value;

    if (!nameID || !email || !cccd || !fullname || !pass || !repass) {
        alert('Vui lòng điền đầy đủ thông tin');
        return;
    }
    if (!(pass.length >= 8) || pass.trim().includes(" ")) {
        alert('Mật khẩu phải có độ dài ít nhất 8 ký tự không dấu không cách')
        return
    }
    if (pass != repass) {
        alert('Mật khẩu chưa trùng khớp vui lòng nhập lại')
        return
    }
    if (nameID === 'admin123') {
        alert('Không thể đăng ký tên tài khoản trên!');
        return
    }

    const danhsachnguoidung = down_local_user();

    if (danhsachnguoidung.some(user => user.nameID === nameID)) {
        alert('Tên tài khoản đã tồn tại vui lòng nhập tên khác');
        return
    }
 
    const nguoidung = {nameID, email, cccd, fullname, pass};

    danhsachnguoidung.push(nguoidung);
    save_local_user(danhsachnguoidung);

    alert("Đăng ký thành công!");
    window.location.href = "dangnhap.html";
}

// Thêm sự kiện ấn enter để đăng ký
const nameID = document.getElementById('nameID');
const email = document.getElementById('email');
const cccd = document.getElementById('cccd');
const fullname = document.getElementById('fullname');
const pass = document.getElementById('pass');
const repass = document.getElementById('repass');

function clickEnter(event) {
    if (event.key === 'Enter') {
        dkytk();
    }
}
nameID.addEventListener('keyup', clickEnter);
email.addEventListener('keyup', clickEnter);
cccd.addEventListener('keyup', clickEnter);
fullname.addEventListener('keyup', clickEnter);
pass.addEventListener('keyup', clickEnter);
repass.addEventListener('keyup', clickEnter);