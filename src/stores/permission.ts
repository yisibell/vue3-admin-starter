import { defineStore } from 'pinia'
import type { IRouteRecord } from '@/router/interfaces/core'
import { constantRoutes, getFullRoutes } from '@/router/staticRoutes'
import { createRoutes, createAuthList } from '@/router/dynamicRoutes'
import type { IGetAllResourceParams, IRouteResourceInfo } from '@/api/resource/index.interface'
import { getAllResource } from '@/api/resource'
import cloneDeep from 'lodash/cloneDeep'
import settings from '@/settings'
import router from '@/router'

const flatRouteNames = (routes: IRouteRecord[], res: (string | symbol)[] = []) => {
  routes.forEach((v) => {
    if (v.name) {
      res.push(v.name)
    }

    if (v.children && v.children.length > 0) {
      flatRouteNames(v.children, res)
    }
  })

  return res
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    sidebarList: constantRoutes as IRouteRecord[],
    routes: constantRoutes as IRouteRecord[],
    dynamicRoutes: [] as IRouteRecord[],
    resources: [] as IRouteResourceInfo[],
    resourceAuthCodes: [] as string[]
  }),
  getters: {
    dynamicRouteNames(): (string | symbol)[] {
      return [...new Set([...flatRouteNames(this.dynamicRoutes)])]
    }
  },
  actions: {
    SET_ROUTES(routes: IRouteRecord[]) {
      this.dynamicRoutes = routes
      this.routes = getFullRoutes(routes, settings.showDynamicSidebarMenu)
    },
    SET_RESOURCE_AUTH_CODES(arr: string[]) {
      this.resourceAuthCodes = arr
    },
    setResources(data: IRouteResourceInfo[]) {
      this.resources = data
    },
    setSidebarList(routes: IRouteRecord[]) {
      this.sidebarList = getFullRoutes(routes, settings.showDynamicSidebarMenu)
    },
    /** 获取所有资源 */
    async allResources(payload?: { force?: boolean; params?: IGetAllResourceParams }) {
      const { force, params } = payload || {}
      if (!force && this.resources.length) return this.resources

      const { status, data } = await getAllResource(params)

      if (status === 200) {
        this.setResources(data)
      } else {
        this.setResources([])
      }

      return this.resources
    },
    /** 生成前端路由 */
    generateRoutes({ resourceIds, isAdmin }: { resourceIds: number[]; isAdmin: 0 | 1 }) {
      const { addRoutes } = createRoutes(this.resources, resourceIds, isAdmin)

      this.setSidebarList(cloneDeep(addRoutes))

      // TIPS: 二级目录和动态路由分离
      addRoutes.forEach((item) => {
        item.children &&
          item.children.length > 0 &&
          item.children.forEach((sub) => {
            if (sub.children && sub.children.length > 0) {
              sub.children.forEach((sub2) => {
                item.children?.push(sub2)
              })
              sub.children = []
            }
          })
      })

      this.SET_ROUTES(addRoutes)
      this.SET_RESOURCE_AUTH_CODES(createAuthList(this.resources, resourceIds, isAdmin))
    },
    /** 删除动态路由 */
    removeDynamicRoutes() {
      this.dynamicRouteNames.forEach((name) => {
        if (router.hasRoute(name)) {
          router.removeRoute(name)
        }
      })
    }
  }
})
