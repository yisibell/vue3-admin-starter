import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useTagsViewStore } from '@/stores/tagsView'
import type { IUserInfo } from '@/api/user/index.interface'
import { getUserInfo } from '@/api/user'

const defaultUserInfo = (): IUserInfo => ({
  id: 0,
  username: '',
  email: '',
  is_admin: 0,
  resourceIds: []
})

export const useUserStore = defineStore(
  'user',
  () => {
    const TagsViewStore = useTagsViewStore()

    const accessToken = ref('')
    const setToken = (token: string = '') => {
      accessToken.value = token
    }

    const userInfo = ref<IUserInfo>(defaultUserInfo())

    const setUserInfo = (info: IUserInfo) => {
      userInfo.value = Object.assign(userInfo.value, info)
    }

    const fetchUserInfo = async () => {
      const { status, data } = await getUserInfo()
      if (status === 200) {
        setUserInfo(data)
      }
    }

    // 登出
    const logout = () => {
      setToken('')
      TagsViewStore.delAllViews()
      setUserInfo(defaultUserInfo())
    }

    return {
      accessToken,
      setToken,
      logout,
      userInfo,
      setUserInfo,
      fetchUserInfo
    }
  },
  {
    persist: {
      paths: ['accessToken']
    }
  }
)
