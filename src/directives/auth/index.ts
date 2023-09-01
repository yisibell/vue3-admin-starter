import type { FunctionDirective } from 'vue'
import { useAuth } from '@/composables/auth'

/**
 * @desc 页面级权限指令
 * @usage <some v-auth="`foo-auth-code`" />
 */
export const auth: FunctionDirective<HTMLElement, string> = (el, binding) => {
  const { value: authCode } = binding

  const { hasAuth } = useAuth()

  if (authCode) {
    // 没有权限，删除节点
    if (!hasAuth(authCode)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('need a code! Like v-auth="\'some_auth_code\'"')
  }
}
