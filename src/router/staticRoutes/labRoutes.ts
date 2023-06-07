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
        name: 'flowDemo',
        path: 'flowchart',
        component: () => import('@/views/demo/FlowDemo.vue'),
        meta: {
          title: '流程图',
          icon: 'flowchart'
        }
      },
      {
        name: 'pageOne',
        path: 'page-one',
        component: () => import('@/views/demo/PageOne.vue'),
        meta: {
          title: '页面1',
          icon: 'flowchart'
        }
      },
      {
        name: 'pageTwo',
        path: 'page-two',
        component: () => import('@/views/demo/PageTwo.vue'),
        meta: {
          title: '页面2',
          icon: 'flowchart'
        }
      },
      {
        name: 'pageThree',
        path: 'page-three',
        component: () => import('@/views/demo/PageThree.vue'),
        meta: {
          title: '页面3',
          icon: 'flowchart'
        }
      },
      {
        name: 'pageFour',
        path: 'page-four',
        component: () => import('@/views/demo/PageFour.vue'),
        meta: {
          title: '页面4',
          icon: 'flowchart'
        }
      },
      {
        name: 'pageFive',
        path: 'page-five',
        component: () => import('@/views/demo/PageFive.vue'),
        meta: {
          title: '页面5',
          icon: 'flowchart'
        }
      },
      {
        name: 'pageSix',
        path: 'page-six',
        component: () => import('@/views/demo/PageSix.vue'),
        meta: {
          title: '页面6',
          icon: 'flowchart'
        }
      },
      {
        name: 'pageSeven',
        path: 'page-seven',
        component: () => import('@/views/demo/PageSeven.vue'),
        meta: {
          title: '页面7',
          icon: 'flowchart'
        }
      },
      {
        name: 'pageEight',
        path: 'page-eight',
        component: () => import('@/views/demo/PageEight.vue'),
        meta: {
          title: '页面8',
          icon: 'flowchart'
        }
      },
      {
        name: 'pageNine',
        path: 'page-nine',
        component: () => import('@/views/demo/PageNine.vue'),
        meta: {
          title: '页面9',
          icon: 'flowchart'
        }
      },
      {
        name: 'pageTen',
        path: 'page-ten',
        component: () => import('@/views/demo/PageTen.vue'),
        meta: {
          title: '页面10',
          icon: 'flowchart'
        }
      }
    ]
  }
]
