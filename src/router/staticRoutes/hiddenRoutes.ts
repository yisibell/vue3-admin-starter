import type { IRouteRecord } from '@/router/interfaces/core'
import LayoutDefault from '@/layouts/default/index.vue'

export const hiddenRoutes: IRouteRecord[] = [
  {
    path: '/redirect',
    component: LayoutDefault,
    meta: {
      hidden: true
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'RedirectView',
        component: () => import('@/views/app/RedirectView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginView',
    meta: {
      hidden: true
    },
    component: () => import('@/views/app/Login.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    meta: {
      hidden: true
    },
    component: () => import('@/views/app/404.vue')
  }
]
