import { defineStore } from 'pinia'
import type { IRouteRecord } from '@/router/interfaces/core'
import { constantRoutes } from '@/router/staticRoutes'
import { createRoutes, createAuthList, asyncRoutesBase } from '@/router/dynamicRoutes'
import type { IGetAllResourceParams, IRouteResourceInfo } from '@/api/resource/index.interface'
import { getAllResource } from '@/api/resource'
import cloneDeep from 'lodash/cloneDeep'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routes: constantRoutes as IRouteRecord[],
    dynamicRoutes: [] as IRouteRecord[],
    resources: [] as IRouteResourceInfo[],
    resourceAuthCodes: [] as string[],
    sidebarList: [] as IRouteRecord[]
  }),
  actions: {
    SET_ROUTES(routes: IRouteRecord[]) {
      this.dynamicRoutes = routes
      this.routes = constantRoutes.concat(routes, asyncRoutesBase)
    },
    SET_RESOURCE_AUTH_CODES(arr: string[]) {
      this.resourceAuthCodes = arr
    },
    setResources(data: IRouteResourceInfo[]) {
      this.resources = data
    },
    setSidebarList(routes: IRouteRecord[]) {
      this.sidebarList = constantRoutes.concat(routes, asyncRoutesBase)
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
    generateRoutes({ resourceIds, isAdmin }: { resourceIds: number[]; isAdmin: 0 | 1 }) {
      const { addRoutes } = createRoutes(this.resources, resourceIds, isAdmin)

      this.setSidebarList(cloneDeep(addRoutes))

      // 二级目录和动态路由分离
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
    }
  }
})
