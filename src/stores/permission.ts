import { defineStore } from 'pinia'
import type { IRouteRecord } from '@/router/interfaces/core'
import { constantRoutes } from '@/router/staticRoutes'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routes: constantRoutes as IRouteRecord[],
    dynamicRoutes: [] as IRouteRecord[]
  }),
  actions: {
    SET_ROUTES(routes: IRouteRecord[]) {
      this.routes = constantRoutes.concat(routes)
      this.dynamicRoutes = routes
    }
  }
})
