import type { IRouteRecord } from '@/router/interfaces/core'
import LayoutDefault from '@/layouts/default/index.vue'

export const constantRoutes: IRouteRecord[] = [
  {
    path: '/',
    component: LayoutDefault,
    redirect: '/dashboard',
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          title: '首页',
          icon: 'dashboard',
          affix: true,
          noCache: true
        }
      }
    ]
  },
  {
    path: '/redirect',
    component: LayoutDefault,
    meta: {
      hidden: true
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },

  // sideMenu routes
  {
    path: '/demo',
    component: LayoutDefault,
    meta: {
      title: '案例',
      icon: 'demo',
      alwaysShow: true
    },
    children: [
      {
        name: 'flowchart',
        path: 'flowchart',
        component: () => import('@/views/demo/FlowDemo.vue'),
        meta: {
          title: '流程图',
          icon: 'flowchart'
        }
      },
      {
        name: 'page-one',
        path: 'page-one',
        component: () => import('@/views/demo/PageOne.vue'),
        meta: {
          title: '页面1',
          icon: 'flowchart'
        }
      }
    ]
  }
]
