<template>
  <div class="sticky z-10 top-0 bottom-0 p-0 lg:px-[189.1px] h-[100px] w-[1135px] lg:w-full">
    <div class="flex flex-row bg-[#101014] items-center h-full">
      <div class="flex justify-center items-center">
        <input type="text" placeholder="Search..." class="sr-only shrink-0" />
        <div
          class="bg-[#202024] relative hover:bg-[#404044] rounded-full w-[230px] outline-none h-[40px] text-gray-400 px-10"
        >
          <img
            src="https://ccdn.steak.io.vn/assets-search-white-w-opacity.svg"
            class="absolute w-5 top-2.5 left-3"
            alt="Search Ico"
          />
          <input
            type="text"
            placeholder="Search store"
            class="bg-transparent placeholder:text-[#fff]/70 text-white w-full h-full focus:outline-none"
          />
        </div>
      </div>
      <div
        class="w-[845px] text-[#fff]/70 h-[100px] flex flex-row justify-start ms-7 gap-5 items-center"
      >
        <router-link to="#" class="hover:text-[#fff] transition-all duration-200"
          >Discover</router-link
        >
        <router-link to="#" class="hover:text-[#fff] transition-all duration-200"
          >Browse</router-link
        >
        <router-link to="#" class="hover:text-[#fff] transition-all duration-200">News</router-link>
      </div>
    </div>
  </div>
</template>

<script setup></script>
