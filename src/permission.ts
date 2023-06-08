import { tricklingProgress } from '@/plugins/trickling'
import type { Router } from 'vue-router'

export const initPermissionGuard = (router: Router) => {
  router.beforeEach(() => {
    // start progress bar
    tricklingProgress.start()
  })

  router.afterEach(() => {
    // finish progress bar
    tricklingProgress.done()
  })
}
