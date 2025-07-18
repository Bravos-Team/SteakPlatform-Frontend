import i18n from '@/i18n/index'
export const getTranslatedTitle = (firstLongKey?: string, lastKey?: string) => {
  if (!firstLongKey || !lastKey) return ''
  const fullKey = `${firstLongKey}${lastKey}`
  return i18n.global?.t(fullKey) ?? ''
}
export default getTranslatedTitle
