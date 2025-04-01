<template>
  <main class="main-container" role="main">
    <div class="main-logo-container">
      <img :src="'src/assets/images/auth/logo_steak.svg'" />
      <p>Đăng Nhập</p>
    </div>
    <form class="login-form">
      <div class="input-container">
        <!-- Ô nhập Email -->
        <div class="box-input-username-login">
          <div class="text-input">
            <p>Email hoặc Tên đăng nhập</p>
          </div>
          <div class="box-input">
            <input class="input-username-login" type="text" />
          </div>
        </div>
        <!-- Ô nhập Mật khẩu -->
        <div class="box-input-password-login">
          <div class="text-input">
            <p>Mật khẩu</p>
          </div>
          <div class="box-input">
            <input class="input-password-login" type="password" />
            <img :src="'src/assets/images/auth/logo-on.svg'" alt="Toggle Password" class="toggle-password" />
          </div>
        </div>
        <!-- Ghi nhớ & Quên mật khẩu -->
        <div class="options-container">
          <div class="fogot-password">
            <a href="">Quên mật khẩu ? </a>
          </div>
        </div>
        <!-- Nút Đăng Nhập -->
        <div class="box-button-login">
          <button type="button" class="button-login">Đăng nhập</button>
        </div>
      </div>
    </form>
    <div class="options-login">
      <div class="divider">
        <span>hoặc bằng cách khác</span>
      </div>
      <div class="oauth-buttons">
        <button type="button" class="button-oauth button-google">
          <img :src="'src/assets/images/auth/logo-google.svg'" alt="" />
        </button>
        <button type="button" class="button-oauth button-facebook">
          <img :src="'src/assets/images/auth/logos_facebook.svg'" alt="" />
        </button>
      </div>
    </div>
  </main>
  <footer class="footer-container">
    <div class="register">
      <a href="">Tạo tài khoản</a>
    </div>
    <div class="privacypolicy">
      <a href="">Chính sách Bảo mật</a>
    </div>
  </footer>
</template>
<style scoped>
/* LOGO & IMAG */
.main-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 500px;
  /* Canh giữa dọc */
  /* Full chiều cao màn hình */
  /* Màu nền để dễ nhìn */
  color: white;
  /* Chữ trắng */
  margin: auto;
  padding-top: 50px;
}

.main-logo-container {
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 200px;
  gap: 20px;
}

.main-logo-container img {
  height: 100px;
}

.main-logo-container p {
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 34px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin: 0;
}

/* BOX INPUT */
.input-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.input-container .box-input {
  display: flex;
  width: 500px;
  position: relative;
  align-items: center;
}

.input-container .text-input {
  margin-bottom: 5px;
}

.input-container .text-input p {
  color: #a9a9a9;
  font-family: Inter;
  font-size: 14px;
  font-weight: 900;
}

.input-container .box-input input {
  width: 100%;
  height: 50px;
  padding: 0 50px 0 20px;
  border-radius: 10px;
  background-color: var(--input-color);
  border: 0.7px solid #444;
  color: #fff;
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  transition: 0.1s ease-out;
  outline: none;
}

/* Ẩn icon mắt mặc định của trình duyệt */
input::-ms-reveal,
input::-webkit-credentials-auto-fill-button {
  display: none;
}

.toggle-password {
  position: absolute;
  right: 15px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.input-container .box-input input:hover {
  border: 1px solid white;
}

.input-container .box-input input:focus {
  border: 3px solid var(--secondary-color);
}

/* options */
.input-container .options-container {
  display: flex;
  position: relative;
  height: 20px;
}

.options-container .fogot-password {
  position: absolute;
  left: 0;
  height: 20px;
}

.options-container .fogot-password a {
  display: block;
  color: var(--secondary-color);
  text-align: right;
  font-family: Inter;
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
}

.input-container .box-button-login {
  display: flex;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
}

.box-button-login button {
  border-radius: 10px;
  border: 0.7px solid #888;
  background: #a9a9a9;
  color: #3c3c3c;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: italic;
  font-weight: 500;
  line-height: normal;
  width: 500px;
  cursor: not-allowed;
  height: 50px;
}

.divider {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
}

/* hoặc bằng cách khác */
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #666;
  /* Màu của đường kẻ */
  margin: 0 10px;
  /* Khoảng cách giữa chữ và đường kẻ */
}

/* options-login */

.options-login {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.options-login .oauth-buttons {
  display: flex;
  margin-top: 10px;
  gap: 30px;
  flex-direction: column;
  border: none;
}

.oauth-buttons .button-oauth {
  width: 500px;
  border-radius: 10px;
  height: 50px;
  border: none;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.oauth-buttons .button-google {
  background-color: white;
  border: none;
}

.oauth-buttons .button-facebook {
  background-color: #1877f2;
  border: none;
}

.button-google:hover,
.button-facebook:hover {
  filter: brightness(1.2); /* Tăng độ sáng */
}

/* footer */

.footer-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  gap: 20px;
}

.footer-container a {
  color: #0af;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
}
</style>
