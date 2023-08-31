import { tricklingProgress } from '@/plugins/trickling'
import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import { ElMessage } from 'element-plus'
import settings from './settings'

const whiteList = ['/login']

export const initPermissionGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    // start progress bar
    tricklingProgress.start()

    const UserStore = useUserStore()
    const PermissionStore = usePermissionStore()

    if (UserStore.accessToken) {
      if (to.path === '/login') {
        // If is logged in, redirect to the home page
        next({ path: '/' })
        tricklingProgress.done()
      } else {
        if (UserStore.userInfo.resourceIds.length === 0 && !UserStore.userInfo.id) {
          try {
            await Promise.all([UserStore.fetchUserInfo(), PermissionStore.allResources()])

            const resourceIds = UserStore.userInfo.resourceIds
            const isAdmin = UserStore.userInfo.is_admin

            PermissionStore.generateRoutes({ resourceIds, isAdmin })

            PermissionStore.dynamicRoutes.forEach((v) => {
              router.addRoute(v)
            })

            next({ ...to, replace: true })
          } catch (err) {
            // Remove token and redirect to login page
            UserStore.setToken('')
            ElMessage.error((err as string) || 'Has Error')
            next(`/login?redirect=${to.fullPath}`)
            tricklingProgress.done()
          }
        } else {
          next()
        }
      }
    } else {
      // Has no token
      if (whiteList.indexOf(to.path) !== -1 || settings.anonymousMode) {
        // In the free login whitelist, go directly
        next()
      } else {
        // Other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.fullPath}`)
        tricklingProgress.done()
      }
    }
  })

  router.afterEach((to) => {
    // finish progress bar
    tricklingProgress.done()
    // set page title
    document.title = to.meta?.title || ''
  })
}
