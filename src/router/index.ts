import { createRouter, createWebHistory } from 'vue-router'

import { constantRoutes } from './staticRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export default router
