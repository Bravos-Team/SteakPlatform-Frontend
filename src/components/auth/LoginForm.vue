<template>
  <div class="text-white flex flex-col items-center justify-center px-4 min-h-screen">
    <div class="flex flex-col items-center mb-10">
      <img :src="'src/assets/images/auth/logo_steak.svg'" class="h-22" />
      <p class="text-2xl font-extrabold mt-2">Đăng Nhập</p>
    </div>

    <form class="w-full max-w-md mx-auto space-y-4">
      <div>
        <p class="text-sm font-bold text-gray-400 mb-0.5">Email hoặc Tên đăng nhập</p>
        <input
          type="email"
          class="xl:w-full peer invalid:focus:border-red-500 h-12 px-4 rounded-lg bg-[#1a1a1a] border border-gray-600 text-white invalid:focus:ring-2 invalid:focus:ring-red-500 focus:outline-none valid:focus:ring-2 valid:focus:ring-[#0af] transition w-full"
        />
        <label for="email" class="invisible peer-invalid:visible text-red-500">
          Vui lòng nhập email hợp lệ
        </label>
      </div>

      <div>
        <p class="text-sm font-bold text-gray-400 mb-1">Mật khẩu</p>
        <div class="relative">
          <input
            id="password"
            type="password"
            required
            class="peer xl:w-full h-12 px-4 pr-12 rounded-lg bg-[#1a1a1a] border border-gray-600 text-white invalid:focus:border-red-500 invalid:focus:ring-2 invalid:focus:ring-red-500 focus:outline-none valid:focus:ring-2 valid:focus:ring-[#0af] transition w-full"
          />
          <img
            :src="'src/assets/images/auth/logo-on.svg'"
            class="absolute right-3 top-3 w-6 h-6 cursor-pointer"
            alt="Toggle Password"
          />
        </div>
      </div>

      <div class="text-right">
        <a href="#" class="text-sm text-[#0af] italic underline">Quên mật khẩu?</a>
      </div>

      <div>
        <button
          type="button"
          class="w-full h-12 bg-gray-500 text-black font-medium italic rounded-lg cursor-not-allowed"
        >
          Đăng nhập
        </button>
      </div>

      <div class="flex items-center text-sm font-bold text-white">
        <hr class="flex-1 border-gray-600" />
        <span class="px-4">hoặc bằng cách khác</span>
        <hr class="flex-1 border-gray-600" />
      </div>

      <div class="flex flex-col space-y-4">
        <button class="flex items-center justify-center h-12 w-full bg-white rounded-lg">
          <img :src="'src/assets/images/auth/logo-google.svg'" class="h-6" />
        </button>
        <button class="flex items-center justify-center h-12 w-full bg-[#1877f2] rounded-lg">
          <img :src="'src/assets/images/auth/logos_facebook.svg'" class="h-6" />
        </button>
      </div>
    </form>

    <footer class="mt-10 mb-10 flex flex-col items-center space-y-3">
      <a href="#" class="text-[#0af] italic underline">Tạo tài khoản</a>
      <a href="#" class="text-[#0af] italic underline">Chính sách Bảo mật</a>
    </footer>
  </div>
</template>
