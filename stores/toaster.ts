import { defineStore } from "pinia"

export const useToasterStore = defineStore("toaster", {
  state: () => ({
    toaster: {
      show: false,
      message: '',
      type: 'success'
    }
  }),
  getters: {
    getToaster: (state) => state.toaster
  },
  actions: {
    showToaster({message, type}: {message: string, type: string}) {
      this.toaster = {
        show: true,
        message,
        type
      }
    },
    hideToaster() {
      this.toaster = {
        show: false,
        message: '',
        type: 'success'
      }
    }
  }
})