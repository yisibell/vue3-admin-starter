import type { IRouteRecord } from '@/router/interfaces/core'
import LayoutDefault from '@/layouts/default/index.vue'

import { hiddenRoutes } from './hiddenRoutes'
import { labRoutes } from './labRoutes'

import defaultSettings from '@/settings'

export const constantRoutes: IRouteRecord[] = (
  [
    {
      path: '/',
      component: LayoutDefault,
      redirect: '/dashboard',
      children: [
        {
          name: 'DashboardView',
          path: 'dashboard',
          component: () => import('@/views/dashboard/index.vue'),
          meta: {
            title: defaultSettings.dashboardTitle,
            icon: 'dashboard',
            affix: true,
            noCache: true
          }
        }
      ]
    }
  ] as IRouteRecord[]
).concat(labRoutes, hiddenRoutes)

// 基础的动态路由，带有通配符 * 的路由应该始终放置在路由表的最后面，会拼接到验权生成的动态路由后面
export const latestRoutes = [
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

export const getFullRoutes = (routes: IRouteRecord[], concatDynamicRoutes: boolean = true) => {
  if (concatDynamicRoutes) {
    return constantRoutes.concat(routes, latestRoutes)
  } else {
    return constantRoutes.concat(latestRoutes)
  }
}
