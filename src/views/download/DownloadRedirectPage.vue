<template>
  <div class="px-3">
    <div
      class="min-h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-10 laptop:p-40"
    >
      <div
        class="bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full h-full border border-gray-700"
      >
        <!-- Cover + Info -->
        <div class="flex flex-col md:flex-row gap-6">
          <img
            src="https://ccdn.steak.io.vn/logo_steak.svg"
            alt="Game Cover"
            class="rounded-xl size-25 object-cover shadow-lg"
          />

          <div class="flex-1 text-white space-y-3">
            <h1 class="text-3xl font-bold">Steak Application</h1>
            <p class="text-gray-300 text-sm text-wrap">
              {{ $t('downloadDescriptions') }}
            </p>
            <div
              v-if="releaseInfoLinux && isLinux"
              class="flex flex-wrap gap-4 text-sm text-gray-400"
            >
              <span
                >📦
                <span class="text-white font-medium">{{
                  handleShowCapacity(releaseInfoLinux.size)
                }}</span></span
              >
              <span class="flex gap-x-2 flex-wrap text-pretty">
                <span> 🛠️ {{ $t('title.pages.game_details.actions.update') }}:</span>
                <span class="text-white font-medium">{{
                  new Date(releaseInfoLinux.updated_at).toLocaleDateString(locale, {
                    dateStyle: 'full',
                  })
                }}</span></span
              >
              <span
                >🌐 {{ $t('languages') }}: <span class="text-white font-medium">English</span>
              </span>
              <span class="flex items-center gap-x-1 text-center">
                <HardDriveDownload class="size-4" />
                <span class="text-center text-white font-medium flex"
                  >{{ $t('downloadCount') }}:{{ releaseInfoLinux.download_count }}</span
                >
              </span>
            </div>

            <div
              v-if="releaseInfoWindows && isWindows"
              class="flex flex-wrap gap-4 text-sm text-gray-400"
            >
              <span
                >📦
                <span class="text-white font-medium">{{
                  handleShowCapacity(releaseInfoWindows.size)
                }}</span></span
              >
              <span
                >🛠️ Cập nhật:
                <span class="text-white font-medium">{{
                  new Date(releaseInfoWindows.updated_at).toLocaleDateString(locale, {
                    dateStyle: 'full',
                  })
                }}</span></span
              >
              <span>🌐 Ngôn ngữ: <span class="text-white font-medium">English</span> </span>
              <span class="flex items-center gap-x-1 text-center">
                <HardDriveDownload class="size-4" />
                <span class="text-center text-white font-medium flex"
                  >Lượt tải:{{ releaseInfoWindows.download_count }}</span
                >
              </span>
            </div>
          </div>
        </div>

        <!-- Download Links -->
        <div class="mt-8 space-y-3">
          <h2 class="text-white text-xl font-semibold">
            <i v-if="isWindows" class="fa-brands fa-windows text-3xl"></i>
            <i v-if="isLinux" class="fa-brands fa-linux text-3xl"></i>
            <i v-if="isMac" class="fa-brands fa-apple text-3xl"></i>
            Tải xuống
          </h2>

          <div class="flex flex-col gap-y-2 gap-4">
            <button
              v-if="isLinux"
              @click="handleDownloadDeb"
              class="w-full font-mono tracking-widest ring-gray-300 ring-0 hover:ring-1 bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer rounded-sm py-1"
            >
              {{ $t('linuxDebVersion') }}
            </button>
            <button
              v-if="isWindows"
              @click="handleDownloadWinSetup"
              class="w-full font-mono tracking-widest ring-gray-300 ring-0 hover:ring-1 bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer rounded-sm py-1"
            >
              {{ $t('windowsSetupVersion') }}
            </button>
          </div>
        </div>

        <!-- Checksum  -->
        <div
          v-if="isLinux && releaseInfoLinux"
          class="mt-8 text-gray-300 text-sm bg-gray-900/70 p-4 rounded-xl border border-gray-700 flex gap-x-1"
        >
          <span class="text-white font-medium">SHA-256:</span>
          <span class="text-wrap truncate"> {{ releaseInfoLinux.digest }}</span>
          <!-- <p><span class="text-white font-medium">MD5:</span> 1bc29b36f623ba82aaf6724fd3b16718</p> -->
        </div>
        <div
          v-if="isWindows && releaseInfoWindows"
          class="mt-8 text-gray-300 text-sm bg-gray-900/70 p-4 rounded-xl border border-gray-700"
        >
          <p>
            <span class="text-white font-medium">SHA-256:</span> {{ releaseInfoWindows.digest }}
          </p>
          <!-- <p><span class="text-white font-medium">MD5:</span> 1bc29b36f623ba82aaf6724fd3b16718</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { HardDriveDownload } from 'lucide-vue-next'
import { computed, nextTick, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const getInformations = async () =>
  await axios
    .get('https://api.github.com/repos/Bravos-Team/SteakClient/releases/latest')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error('Error fetching release information:', error)
      return null
    })

const isLinux = computed(() => {
  return navigator.userAgent.toLowerCase().includes('linux')
})
const isMac = computed(() => {
  return navigator.userAgent.toLowerCase().includes('mac')
})
const isWindows = computed(() => {
  return navigator.userAgent.toLowerCase().includes('win')
})
const handleDownloadDeb = () => {
  const raw =
    'aHR0cHM6Ly9naXRodWIuY29tL0JyYXZvcy1UZWFtL1N0ZWFrQ2xpZW50L3JlbGVhc2VzL2Rvd25sb2FkL2xhc3Rlc3QvU3RlYWtfbGFzdGVzdC5kZWI='
  window.location.href = decodeURI(atob(raw))
}
const handleDownloadWinSetup = () => {
  const raw =
    'aHR0cHM6Ly9naXRodWIuY29tL0JyYXZvcy1UZWFtL1N0ZWFrQ2xpZW50L3JlbGVhc2VzL2Rvd25sb2FkL2xhc3Rlc3QvU3RlYWtTZXR1cC5leGU='
  window.location.href = decodeURI(atob(raw))
}

const releaseInfoLinux = ref()
const releaseInfoWindows = ref()

const handleShowCapacity = (size: number) => {
  if (size < 1024) return `${size} B`
  else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`
  else if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`
  else return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

onMounted(async () => {
  await nextTick()
  const response = await getInformations()
  releaseInfoLinux.value = response.assets.find((asset: any) => asset.name === 'Steak_lastest.deb')
  releaseInfoWindows.value = response.assets.find((asset: any) => asset.name === 'SteakSetup.exe')
})
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
</style>
