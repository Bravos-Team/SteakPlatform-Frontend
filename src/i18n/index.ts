import { getCookie } from '@/utils/cookies/cookie-utils'
import { createI18n } from 'vue-i18n'
import en from '@/i18n/languages/en'
import vi from '@/i18n/languages/vi'

const messages = {
  en,
  vi,
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getCookie('locale') || 'vi',
  fallbackLocale: 'vi',
  messages,
})

export default i18n
