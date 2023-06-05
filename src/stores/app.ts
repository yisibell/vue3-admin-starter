import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const sidebar = ref({
    opened: true
  })

  const ToggleSideBar = () => {
    sidebar.value.opened = !sidebar.value.opened
  }

  return {
    sidebar,
    ToggleSideBar
  }
})
