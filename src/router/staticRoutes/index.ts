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
