import { defineStore } from 'pinia'
import type { IRouteRecord } from '@/router/interfaces/core'
import { constantRoutes, asyncRoutes } from '@/router'

const hasPermission = (roles: string[], route: IRouteRecord) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles?.includes(role))
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes: IRouteRecord[], roles: string[]) => {
  const res: IRouteRecord[] = []

  routes.forEach((route) => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routes: [] as IRouteRecord[],
    dynamicRoutes: [] as IRouteRecord[]
  }),
  actions: {
    SET_ROUTES(routes: IRouteRecord[]) {
      this.routes = constantRoutes.concat(routes)
      this.dynamicRoutes = routes
    },

    GenerateRoutes(roles: string[]) {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      this.SET_ROUTES(accessedRoutes)
    }
  }
})
