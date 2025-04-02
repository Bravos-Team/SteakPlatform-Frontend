<template>
  <div>
    <button @click="changeFavicon('favicon1.ico')">Favicon 1</button>
    <button @click="changeFavicon('favicon2.ico')">Favicon 2</button>
  </div>
</template>

<script>
export default {
  methods: {
    changeFavicon() {
      let link = document.querySelector("link[rel~='icon']")
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }
      link.href = '@/assets/favicon.ico'
    },
  },
}
</script>
