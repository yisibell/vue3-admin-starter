import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LocaleType } from '@/plugins/i18n'

export const useAppStore = defineStore(
  'app',
  () => {
    const sidebar = ref({
      opened: true
    })

    const language = ref<LocaleType>('zh')

    const ToggleSideBar = () => {
      sidebar.value.opened = !sidebar.value.opened
    }

    const setLanguage = (lang: LocaleType) => {
      language.value = lang
    }

    return {
      sidebar,
      ToggleSideBar,
      language,
      setLanguage
    }
  },
  {
    persist: true
  }
)
