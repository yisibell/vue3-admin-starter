import type { IRouteRecord } from '@/router/interfaces/core'
import LayoutDefault from '@/layouts/default/index.vue'
import { hiddenRoutes } from './hiddenRoutes'
import { labRoutes } from './labRoutes'
import defaultSettings from '@/settings'

export const constantRoutes: IRouteRecord[] = (
  [
    {
      path: '/',
      name: 'Home',
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

export const latestRoutes: IRouteRecord[] = []

export const getFullRoutes = (routes: IRouteRecord[], concatDynamicRoutes: boolean = true) => {
  if (concatDynamicRoutes) {
    return constantRoutes.concat(routes, latestRoutes)
  } else {
    return constantRoutes.concat(latestRoutes)
  }
}
