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
    if (cccd.length < 12) {
        alert('Vui lòng điền mã căn cước công dân hợp lệ');
        return
    }
    if (nameID === 'admin123') {
        alert('Không thể đăng ký tên tài khoản trên!');
        return
    }
    if (!(pass.length >= 8) || pass.trim().includes(" ")) {
        alert('Mật khẩu phải có độ dài ít nhất 8 ký tự không dấu không cách')
        return
    }
    if (pass != repass) {
        alert('Mật khẩu chưa trùng khớp vui lòng nhập lại')
        return
    }
    if (!email.includes('@') || email.indexOf('@') === 0
        || email.indexOf('@') !== email.lastIndexOf('@')
        || email.lastIndexOf('.') < email.indexOf('@') + 2
        || email.lastIndexOf('.') === email.length - 1
        || email.includes(' ')) {
        alert("Email không hợp lệ. Vui lòng nhập email đúng định dạng, ví dụ: abc@gmail.com");
        return;
    }
    // !email.includes('@'): Email phải chứa ký tự @.
    // email.indexOf('@') === 0: @ không được nằm ở đầu email.
    // email.indexOf('@') !== email.lastIndexOf('@'): Email không được chứa nhiều ký tự @.
    // email.lastIndexOf('.') < email.indexOf('@') + 2: Phải có dấu . sau @, với ít nhất 1 ký tự giữa @ và ..
    // email.lastIndexOf('.') === email.length - 1: . không được nằm ở cuối email.
    // email.includes(' '): Email không được chứa khoảng trắng.
    const danhsachnguoidung = down_local_user();

    if (danhsachnguoidung.some(user => user.nameID === nameID)) {
        alert('Tên tài khoản đã tồn tại vui lòng nhập tên khác');
        return
    }
    if (danhsachnguoidung.some(user => user.cccd === cccd)) {
        alert('Mã căn cước công dân đã tồn tại vui lòng nhập tên khác');
        return
    }
    if (danhsachnguoidung.some(user => user.email === email)) {
        alert('Email đã tồn tại vui lòng nhập tên khác');
        return
    }

    let nguoidung = {
        nameID: nameID,
        cccd: cccd,
        fullname: fullname,
        email: email,
        pass: pass
    };

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