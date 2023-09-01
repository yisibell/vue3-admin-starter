import { usePermissionStore } from '@/stores/permission'
import { piniaStore } from '@/plugins/pinia'

export const useAuth = () => {
  const PermissionStore = usePermissionStore(piniaStore)

  const hasAuth = (code: string) => {
    // 当前用户可用权限 code 列表
    const auths = PermissionStore.resourceAuthCodes
    if (code === 'public') return true
    return auths.includes(code)
  }

  return {
    hasAuth
  }
}
