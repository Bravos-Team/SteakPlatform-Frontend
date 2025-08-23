import { h } from 'vue'
import { toast } from 'vue-sonner'

export const toastSuccessNotificationPopup = (
  message: string,
  description: string,
  position?: number,
) => {
  return toast.success(
    h('span', { class: 'text-green-500 text-lg text-wrap z-999' }, `${message}`),
    {
      description: h('div', { class: 'text-white text-wrap' }, `${description}`),
      position: positionComputed(position || 2),
      cancel: {
        label: '✕',
      },
    },
  )
}

export const toastErrorNotificationPopup = (
  message: string,
  description: string,
  position?: number,
) => {
  return toast.error(h('span', { class: 'text-red-500 text-lg z-999 text-wrap' }, `${message}`), {
    description: h('div', { class: 'text-white text-wrap' }, `${description}`),
    position: positionComputed(position || 2),
    cancel: {
      label: '✕',
    },
  })
}

export const toastNotificationPopup = (
  message: string,
  descriptions: string,
  position?: number,
) => {
  return toast.info(h('span', { class: 'text-blue-500 text-lg z-999 text-wrap' }, `${message}`), {
    description: h('div', { class: 'text-white text-wrap' }, `${descriptions}`),
    position: positionComputed(position || 2),
    cancel: {
      label: '✕',
    },
  })
}

const positionComputed = (positionId: number) => {
  switch (positionId) {
    case 1:
      return 'top-left'
    case 2:
      return 'top-right'
    case 3:
      return 'bottom-left'
    case 4:
      return 'bottom-right'
    default:
      return 'top-right'
  }
}
