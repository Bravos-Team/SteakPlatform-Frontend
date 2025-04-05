<template>
  <div>
    <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
      message: "Hello I'm from test",
      firstName: 'Chan',
      lastName: 'Phong',
    }
  },
  computed: {
    fullName: {
      get() {
        return this.firstName + ' ' + this.lastName
      },
      set(newValue) {
        const parts = newValue.split(' ')
        ;(this.firstName = parts[0]), (this.lastName = parts[1])
      },
    },
  },
}
</script>
