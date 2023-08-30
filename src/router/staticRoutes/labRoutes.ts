import type { IRouteRecord } from '@/router/interfaces/core'
import LayoutDefault from '@/layouts/default/index.vue'

export const labRoutes: IRouteRecord[] = [
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
        name: 'FlowDemo',
        path: 'flowchart',
        component: () => import('@/views/demo/FlowDemo.vue'),
        meta: {
          title: '流程图',
          icon: 'flowchart'
        }
      },
      {
        path: 'page-one',
        component: () => import('@/views/demo/PageOne.vue'),
        meta: {
          title: '页面1',
          icon: 'flowchart',
          alwaysShow: true
        },
        children: [
          {
            name: 'PageOne',
            path: 'page-one',
            component: () => import('@/views/demo/PageOne.vue'),
            meta: {
              title: '页面1-1',
              icon: 'flowchart'
            }
          }
        ]
      },
      {
        name: 'PageTwo',
        path: 'page-two',
        component: () => import('@/views/demo/PageTwo.vue'),
        meta: {
          title: '页面2',
          icon: 'flowchart'
        }
      },
      {
        name: 'PageThree',
        path: 'page-three',
        component: () => import('@/views/demo/PageThree.vue'),
        meta: {
          title: '页面3',
          icon: 'flowchart'
        }
      },
      {
        name: 'PageFour',
        path: 'page-four',
        component: () => import('@/views/demo/PageFour.vue'),
        meta: {
          title: '页面4',
          icon: 'flowchart'
        }
      },
      {
        name: 'PageFive',
        path: 'page-five',
        component: () => import('@/views/demo/PageFive.vue'),
        meta: {
          title: '页面5',
          icon: 'flowchart'
        }
      },
      {
        name: 'PageSix',
        path: 'page-six',
        component: () => import('@/views/demo/PageSix.vue'),
        meta: {
          title: '页面6',
          icon: 'flowchart'
        }
      },
      {
        name: 'PageSeven',
        path: 'page-seven',
        component: () => import('@/views/demo/PageSeven.vue'),
        meta: {
          title: '页面7',
          icon: 'flowchart'
        }
      },
      {
        name: 'PageEight',
        path: 'page-eight',
        component: () => import('@/views/demo/PageEight.vue'),
        meta: {
          title: '页面8',
          icon: 'flowchart'
        }
      },
      {
        name: 'PageNine',
        path: 'page-nine',
        component: () => import('@/views/demo/PageNine.vue'),
        meta: {
          title: '页面9',
          icon: 'flowchart'
        }
      },
      {
        name: 'PageTen',
        path: 'page-ten',
        component: () => import('@/views/demo/PageTen.vue'),
        meta: {
          title: '页面10',
          icon: 'flowchart'
        }
      }
    ]
  },
  {
    path: '/system',
    component: LayoutDefault,
    meta: {
      title: '系统设置',
      icon: 'system-config',
      alwaysShow: true
    },
    children: [
      {
        path: 'resource',
        name: 'SystemResource',
        component: () => import('@/views/system/resource/index.vue'),
        meta: {
          title: '资源管理',
          icon: 'resource-config'
        }
      }
    ]
  }
]
