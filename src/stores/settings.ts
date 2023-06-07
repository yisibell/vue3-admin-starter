import { defineStore } from 'pinia'
import { ref } from 'vue'
import defaultSettings from '@/settings'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const showSettings = ref(defaultSettings.showSettings)
    const tagsView = ref(defaultSettings.tagsView)
    const fixedHeader = ref(defaultSettings.fixedHeader)
    const sidebarLogo = ref(defaultSettings.sidebarLogo)
    const title = ref(defaultSettings.title)

    const setShowSettings = (show: boolean) => {
      showSettings.value = show
    }

    const setTagsView = (show: boolean) => {
      tagsView.value = show
    }

    const setFixedHeader = (fixed: boolean) => {
      fixedHeader.value = fixed
    }

    const setSidebarLogo = (show: boolean) => {
      sidebarLogo.value = show
    }

    const setTitle = (value: string) => {
      title.value = value
    }

    return {
      showSettings,
      setShowSettings,
      tagsView,
      setTagsView,
      fixedHeader,
      setFixedHeader,
      sidebarLogo,
      setSidebarLogo,
      title,
      setTitle
    }
  },
  {
    persist: true
  }
)
