import { asyncRoutesMap } from './asyncRoutesMap'
import type { IRouteResourceInfo } from '@/api/resource/index.interface'
import type { IRouteRecord } from '@/router/interfaces/core'

type RouteConfig = IRouteRecord

/**
 *@desc: 生成动态路由表
 *@param resourceTree {Array of Object} 资源树
 *@param resIds {Array of Number} 当前用户所有拥有资源 ids
 *@returns res {Array of Object} 路由表
 */
const createRoutes = (
  resourceTree: IRouteResourceInfo[],
  resIds: number[] = [],
  isAdmin: 0 | 1 = 0,
  addRoutes: RouteConfig[] = []
): {
  addRoutes: RouteConfig[]
} => {
  resourceTree.forEach((v) => {
    const {
      id,
      type,
      name,
      route_name,
      route_path,
      route_component,
      icon,
      route_hidden,
      route_always_show,
      route_no_cache, // 当前菜单项是否被 keep-alive 缓存
      route_breadcrumb,
      sub
    } = v
    if ((resIds.includes(id) || isAdmin) && type !== 3) {
      const route: RouteConfig = {
        path: route_path,
        component: asyncRoutesMap[route_component],
        name: route_name,
        meta: {
          title: name,
          icon,
          noCache: !!route_no_cache,
          breadcrumb: !!route_breadcrumb,
          alwaysShow: !!route_always_show,
          hidden: !!route_hidden
        }
      }

      if (sub && sub.length > 0 && sub[0].type !== 3) {
        ;(route.children as any) = []
        createRoutes(sub, resIds, isAdmin, route.children)
      }

      addRoutes.push(route)
    }
  })

  return {
    addRoutes
  }
}

/**
 *@desc: 页面级权限列表生成器
 *@param resourceTree {Array of Object} 资源树
 *@param resIds {Array of Number} 当前用户所有拥有资源 ids
 *@param isAdmin {Number} 管理员标识
 *@returns res {Array of String} 权限标识列表
 */
const createAuthList = (
  resourceTree: IRouteResourceInfo[],
  resIds: number[] = [],
  isAdmin: 0 | 1 = 0,
  res: string[] = []
) => {
  resourceTree.forEach((v) => {
    const { node_name, id, type, sub } = v
    if ((resIds.includes(id) || isAdmin) && type === 3) {
      res.push(node_name)
    }

    if (sub && sub.length) {
      createAuthList(sub, resIds, isAdmin, res)
    }
  })
  return res
}

export { createAuthList, createRoutes }
