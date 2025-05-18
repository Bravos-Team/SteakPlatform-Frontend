<template>
  <div class="">
    <header
      class="flex flex-wrap justify-start gap-x-3 items-center ms-5 mt-3"
      aria-label="Website Header"
    >
      <!-- Logo + Line -->
      <router-link :to="{ name: 'Home' }" class="flex items-center gap-x-2">
        <img
          :src="'https://ccdn.steak.io.vn/logo_steak.svg'"
          class="xl:h-12 h-9 text-dark dark:text-white"
          alt="Logo header"
        />
        <div class="bg-black dark:bg-white w-0.5 h-8 ms-3"></div>
      </router-link>

      <div class="flex absolute right-70">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi text-black dark:text-white me-2 mt-[1px] bi-sun-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"
          />
        </svg>
        <label class="relative inline-block w-10 h-5 cursor-pointer">
          <input type="checkbox" class="peer hidden" @change="toggleDarkTheme" />
          <div
            class="bg-white dark:bg-black ring-2 dark:ring-white rounded-[10px] w-10 h-5 transition-colors duration-300"
          ></div>
          <div
            class="absolute top-0 left-0 w-5 h-5 bg-gradient-to-b from-[#fffca2] to-[#ffcd19] dark:from-[#acd2e5] dark:to-[#3b4a67] to-80% from-40% rounded-full transition-transform duration-300 peer-checked:translate-x-[21px]"
          ></div>
        </label>
      </div>

      <!-- Language Selection -->
      <div class="flex absolute right-10 ms-2 items-center gap-x-2">
        <img
          :src="'https://ccdn.steak.io.vn/language-white.svg'"
          class="content-start text-black dark:text-white hidden dark:block"
          alt="language icon"
        />

        <img
          :src="'https://ccdn.steak.io.vn/language-black.svg'"
          class="content-start text-black dark:text-white block dark:hidden"
          alt="language icon"
        />
        <div class="items-end">
          <div class="relative">
            <button
              @click="showDropdown = !showDropdown"
              class="flex items-center gap-x-1 text-black dark:text-white hover:text-gray-400"
              @mouseenter="showDropdown = true"
              @mouseleave="showDropdown = false"
            >
              <span>{{ selectedLanguage != '' ? selectedLanguage : 'Tiếng Việt' }}</span>
              <img
                :src="'https://ccdn.steak.io.vn/down-line-white.svg'"
                alt="Dropdown Icon"
                class="mt-1 hidden dark:block text-white"
              />
              <img
                :src="'https://ccdn.steak.io.vn/down-line-black.svg.svg'"
                alt="Dropdown Icon"
                class="mt-1 block dark:hidden"
              />
            </button>

            <ul
              v-if="showDropdown"
              class="absolute mt-0 bg-white dark:bg-[#101014] rounded top-full -left-15 shadow-md text-white w-40 z-50"
              @mouseenter="showDropdown = true"
              @mouseleave="showDropdown = false"
            >
              <template v-for="(language, index) in languages" :key="index">
                <li
                  class="px-4 py-2 hover:bg-gray-100 text-black dark:text-white hover:text-black cursor-pointer"
                  @click="(handleSelectedLanguage(language.code), (showDropdown = !showDropdown))"
                >
                  {{ language.name }}
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
      <span class="text-dark dark:text-white xl:text-[18px] text-[14px]">{{ headerTitle }}</span>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const showDropdown = ref(false)

const languages = [
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'en', name: 'English' },
  { code: 'zh', name: 'Chinese' },
]
const selectedLanguage = ref('')

const props = defineProps({
  headerTitle: {
    type: String,
    default: 'Header Title',
  },
})

const handleSelectedLanguage = (code) => {
  selectedLanguage.value = languages.find((lang) => lang.code === code).name
}

const toggleDarkTheme = () => {
  document.getElementsByTagName('html')[0].classList.toggle('dark')
}
</script>

<!-- Trong template -->
<button @click="showDropdown = !showDropdown"></button>
