import { tricklingProgress } from '@/plugins/trickling'
import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import { ElMessage } from 'element-plus'
import settings from './settings'

export const whiteList = ['/login', '/404', '/redirect']

export const inWhiteList = (path: string) => {
  return whiteList.some((v) => path.includes(v))
}

export const initPermissionGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    // start progress bar
    tricklingProgress.start()

    if (!inWhiteList(to.path) && !router.hasRoute(to.name || '')) {
      next('/404')
      return
    }

    const UserStore = useUserStore()
    const PermissionStore = usePermissionStore()

    if (UserStore.accessToken) {
      if (to.path === '/login') {
        // If is logged in, redirect to the home page
        next({ path: '/' })
        tricklingProgress.done()
      } else {
        // If user information is not obtained
        if (UserStore.isNeedReFetchUserInfo) {
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
            ElMessage.error((err as string) || '[Permission guard]: fetch user info Error!')
            next(`/login?redirect=${to.fullPath}`)
            tricklingProgress.done()
          }
        } else {
          next()
        }
      }
    } else {
      // Has no token
      if (inWhiteList(to.path) || settings.anonymousMode) {
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
    document.title = to.meta.title ? `${settings.title} | ${to.meta.title}` : settings.title
  })
}
