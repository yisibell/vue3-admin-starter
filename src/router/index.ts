import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './staticRoutes'

const router = createRouter({
  strict: true,
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export default router
