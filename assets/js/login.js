function login() {
  let user = document.getElementById("email").value;
  let pass = document.getElementById("password").value;

  if (user === "admin@gmail.com" && pass === "admin") {
    this.location.href = "index.html";
  } else if (user.length <= 0 || pass.length <= 0) {
    alert("Vui lòng điền tài khoản hoặc mật khẩu");
  } else {
    alert("Tài khoản hoặc mật khẩu không đúng");
  }
}
