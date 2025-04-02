<template>
  <div>
    <header class="logo-headers" aria-label="Website Header">
      <!-- Logo + Line -->
      <div class="logo-container">
        <img :src="'src/assets/images/auth/logo_steak.svg'" alt="Logo" />
        <div class="vertical-line"></div>
      </div>

      <!-- Language Selection -->
      <div class="language-container">
        <img :src="'src/assets/images/auth/icon-language.svg'" alt="Language Icon" />
        <div class="text-language">
          <div class="text">
            <p>Tiếng Việt</p>
          </div>
          <div class="language-dropdown">
            <img :src="'src/assets/images/auth/down-line.svg'" alt="Dropdown Icon" />
          </div>
        </div>
      </div>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>
<style >
* {
  padding: 0;
  margin: 0;
}

:root {
  --primary-color: #101014;
  --secondary-color: #00aaff;
  --input-color: #202024;
  --font-size: 16px;
}

body {
  background-color: var(--primary-color);
  font-size: var(--font-size);
  padding: 0;
  margin: 0;
  position: relative;
}

.logo-headers {
  width: 200px;
  height: 50px;
  position: absolute;
  top: 30px;
  left: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
}

/* LOGO + LINE */
.logo-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo-container img {
  height: 50px;
}

/* Dấu gạch dọc */
.vertical-line {
  width: 1px;
  /* Độ dày */
  height: 40px;
  /* Chiều cao */
  background-color: white;
  /* Màu sắc */
}

/* NGÔN NGỮ */
.language-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.language-container img {
  height: 20px;
}

.text-language {
  display: flex;
  align-items: center;
}

.text-language .text {
  display: flex;
  min-width: 60px;
  height: 20px;
  align-items: center;
}

.text-language .text p {
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 400;
  margin: 0;
}

/* Icon dropdown */
.language-dropdown img {
  height: 20px;
}
</style>
