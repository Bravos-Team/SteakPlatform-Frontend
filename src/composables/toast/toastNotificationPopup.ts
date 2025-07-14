import { h } from 'vue'
import { toast } from 'vue-sonner'

export const toastSuccessNotificationPopup = (
  message: string,
  description: string,
  position?: number,
) => {
  return toast.success(h('span', { class: 'text-green-500 text-lg z-999' }, `${message}`), {
    description: h('div', { class: 'text-white' }, `${description}`),
    position: positionComputed(position || 2),
    action: {
      label: 'Undo',
    },
  })
}

export const toastErrorNotificationPopup = (
  message: string,
  description: string,
  position?: number,
) => {
  return toast.error(h('span', { class: 'text-red-500 text-lg z-999' }, `${message}`), {
    description: h('div', { class: 'text-white' }, `${description}`),
    position: positionComputed(position || 2),
    action: {
      label: 'Undo',
    },
  })
}

export const toastNotificationPopup = (
  message: string,
  descriptions: string,
  position?: number,
) => {
  return toast.info(h('span', { class: 'text-blue-500 text-lg z-999' }, `${message}`), {
    description: h('div', { class: 'text-white' }, `${descriptions}`),
    position: positionComputed(position || 2),
    action: {
      label: 'Undo',
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
