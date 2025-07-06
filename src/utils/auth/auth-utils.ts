import { ref } from 'vue'

export let isPassword = ref(true)
export const togglePasswordVisibility = () => {
  return (isPassword.value = !isPassword.value)
}
