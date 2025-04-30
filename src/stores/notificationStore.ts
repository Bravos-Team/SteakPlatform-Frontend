import { defineStore } from 'pinia'
import { notificationConfig } from '@/config/notificationConfig'

export const useNotificationStore = defineStore('notificationStore', {
  state: () => ({
    messages: '',
    type: '',
    visible: false,
  }),
  actions: {
    showSuccess(message: string) {
      this.messages = message
      this.type = 'success'
      this.visible = true

    },
    showError(message: string) {
      this.messages = message
      this.type = 'error'
      this.visible = true
    },
    hide(){
      this.visible =false
    }
  }


})
