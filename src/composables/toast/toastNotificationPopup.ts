import { h } from 'vue'
import { toast } from 'vue-sonner'

export const toastSuccessNotificationPopup = (message: string, description: string) => {
  return toast.success(h('span', { class: 'text-green-500 text-lg z-999' }, `${message}`), {
    description: h('div', { class: 'text-white' }, `${description}`),
    action: {
      label: 'Undo',
    },
  })
}

export const toastErrorNotificationPopup = (message: string, description: string) => {
  return toast.error(h('span', { class: 'text-red-500 text-lg z-999' }, `${message}`), {
    description: h('div', { class: 'text-white' }, `${description}`),
    action: {
      label: 'Undo',
    },
  })
}
