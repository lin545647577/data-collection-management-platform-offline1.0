import { createRouter, createWebHistory } from 'vue-router'
//导入Nprogress
import Nprogress from 'nprogress'
//导入nprogress的样式
import 'nprogress/nprogress.css'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
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
