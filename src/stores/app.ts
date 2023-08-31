import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { LocaleType } from '@/plugins/i18n'

// element-plus国际化
import enLocaleElementPlus from 'element-plus/dist/locale/en.mjs'
import zhLocaleElementPlus from 'element-plus/dist/locale/zh-cn.mjs'

export const elmentPlusLocales: Record<LocaleType, any> = {
  zh: zhLocaleElementPlus,
  en: enLocaleElementPlus
}

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

    const elementPlusLocale = computed(() => elmentPlusLocales[language.value])

    return {
      sidebar,
      ToggleSideBar,
      language,
      setLanguage,
      elementPlusLocale
    }
  },
  {
    persist: true
  }
)
