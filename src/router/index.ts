import { createRouter, createWebHistory } from 'vue-router'
import LayoutDefault from '@/layouts/default/index.vue'

export * from './dynamicRoutes/asyncRoutesMap'
export * from './staticRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LayoutDefault',
      component: LayoutDefault,
      redirect: '/home',
      children: [
        {
          name: 'home',
          path: 'home',
          component: () => import('@/views/HomeView.vue')
        }
      ]
    }
  ]
})

export default router
