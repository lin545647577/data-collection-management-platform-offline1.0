import { createRouter, createWebHistory } from 'vue-router'
//导入Nprogress
import Nprogress from 'nprogress'
//导入nprogress的样式
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index.vue')
    },
    {
      path:'/login',
      name:'login',
      component: () => import('@/views/login.vue')
    }
  ]
})

//定义路由导航前置守卫
router.beforeEach((to, from, next) => {
  Nprogress.start()
  next()
})
 
//定义路由导航后置守卫
router.afterEach((to, from) => {
  Nprogress.done()
})

export default router
