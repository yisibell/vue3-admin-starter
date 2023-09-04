import { defineStore } from 'pinia'
import { ref } from 'vue'
import defaultSettings from '@/settings'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const anonymousMode = ref(defaultSettings.anonymousMode)

    const fixedHeader = ref(defaultSettings.fixedHeader)
    const setFixedHeader = (fixed: boolean) => {
      fixedHeader.value = fixed
    }

    const sidebarLogo = ref(defaultSettings.sidebarLogo)
    const setSidebarLogo = (show: boolean) => {
      sidebarLogo.value = show
    }

    const title = ref(defaultSettings.title)
    const setTitle = (value: string) => {
      title.value = value
    }

    const showLanguagePicker = ref(defaultSettings.showLanguagePicker)

    return {
      fixedHeader,
      setFixedHeader,
      sidebarLogo,
      setSidebarLogo,
      title,
      setTitle,
      anonymousMode,
      showLanguagePicker
    }
  },
  {
    persist: true
  }
)
