import { asyncRoutesMap } from './asyncRoutesMap'
import type { IRouteResourceInfo } from '@/api/resource/index.interface'
import type { IRouteRecord } from '@/router/interfaces/core'

type RouteConfig = IRouteRecord

// 基础的动态路由，带有通配符 * 的路由应该始终放置在路由表的最后面，会拼接到验权生成的动态路由后面
const asyncRoutesBase = [
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

/**
 *@desc: 生成动态路由表
 *@param ori {Array of Object} 资源树
 *@param res_ids {Array of Number} 当前用户所有拥有资源 ids
 *@returns res {Array of Object} 路由表
 */
const createRoutes = (
  ori: IRouteResourceInfo[],
  res_ids: number[] = [],
  isAdmin: 0 | 1 = 0,
  addRoutes: RouteConfig[] = [],
  excludeRouteNames: string[] = []
): {
  addRoutes: RouteConfig[]
  excludeRouteNames: string[]
} => {
  ori.forEach((v) => {
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
      route_no_cache, // 当前菜单项是否被 keep-alive 缓存，（详见 layout 中 tagsView 实现原理）
      route_breadcrumb,
      sub
    } = v
    if ((res_ids.includes(id) || isAdmin) && type !== 3) {
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

      // TIPS: 记录菜单级不缓存路由名
      if (route_no_cache && route_name) excludeRouteNames.push(route_name)

      if (sub && sub.length > 0 && sub[0].type !== 3) {
        ;(route.children as any) = []
        createRoutes(sub, res_ids, isAdmin, route.children, excludeRouteNames)
      }

      addRoutes.push(route)
    }
  })

  return {
    addRoutes,
    excludeRouteNames
  }
}

/**
 *@desc: 页面级权限列表生成器
 *@param ori {Array of Object} 资源树
 *@param res_ids {Array of Number} 当前用户所有拥有资源 ids
 *@param isAdmin {Number} 管理员标识
 *@returns res {Array of String} 权限标识列表
 */
const createAuthList = (
  ori: IRouteResourceInfo[],
  res_ids: number[] = [],
  isAdmin: 0 | 1 = 0,
  res: string[] = []
) => {
  ori.forEach((v) => {
    const { node_name, id, type, sub } = v
    if ((res_ids.includes(id) || isAdmin) && type === 3) {
      res.push(node_name)
    }

    if (sub && sub.length) {
      createAuthList(sub, res_ids, isAdmin, res)
    }
  })
  return res
}

export { createAuthList, createRoutes, asyncRoutesBase }
