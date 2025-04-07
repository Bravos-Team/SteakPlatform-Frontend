<template>
  <div class="">
    <header
      class="flex flex-wrap justify-start gap-x-3 items-center ms-5 mt-5"
      aria-label="Website Header"
    >
      <!-- Logo + Line -->
      <div class="flex items-center gap-x-2">
        <img :src="'src/assets/images/auth/logo_steak.svg'" alt="Logo" />
        <div class="bg-white w-0.5 h-9 ms-3"></div>
      </div>

      <!-- Language Selection -->
      <div class="flex ms-2 items-center gap-x-2">
        <img
          :src="'src/assets/images/auth/icon-language.svg'"
          class="content-start"
          alt="Language Icon"
        />
        <div class="relative">
          <button
            @click="showDropdown = !showDropdown"
            class="flex items-center gap-x-1 text-white hover:text-gray-400"
            @mouseenter="showDropdown = true"
            @mouseleave="showDropdown = false"
          >
            <span>{{ selectedLanguage != '' ? selectedLanguage : 'Tiếng Việt' }}</span>
            <img
              :src="'src/assets/images/auth/down-line.svg'"
              alt="Dropdown Icon"
              class="w-4 h-4"
            />
          </button>

          <ul
            v-if="showDropdown"
            class="absolute mt-0 bg-[#101014] rounded shadow-md text-white w-40 z-50"
            @mouseenter="showDropdown = true"
            @mouseleave="showDropdown = false"
          >
            <template v-for="(language, index) in languages" :key="index">
              <li
                class="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer"
                @click="(handleSelectedLanguage(language.code), (showDropdown = !showDropdown))"
              >
                {{ language.name }}
              </li>
            </template>
          </ul>
        </div>
      </div>
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

const handleSelectedLanguage = (code) => {
  selectedLanguage.value = languages.find((lang) => lang.code === code).name
}
</script>

<!-- Trong template -->
<button @click="showDropdown = !showDropdown"></button>
