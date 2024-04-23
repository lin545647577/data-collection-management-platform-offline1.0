import { createRouter, createWebHistory } from 'vue-router'
//导入Nprogress
import Nprogress from 'nprogress'
//导入nprogress的样式
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/data-collection',
      name: 'home',
      component: () => import('@/components/dcFrame/frame.vue'),
      children:[
        {
          path:'/data-collection/index',
          name:'index',
          component: () => import('@/views/index/index.vue')
        },
        {
          path:'/data-collection/warning',
          name:'warning',
          component: () => import('@/views/warning/index.vue')
        },
        {
          path:'/data-collection/configManage',
          name:'configManage',
          component: () => import('@/views/configManage/index.vue')
        },
        {
          path:'/data-collection/fileManage',
          name:'fileManage',
          component: () => import('@/views/fileManage/index.vue')
        },
        {
          path:'/data-collection/setting',
          name:'setting',
          component: () => import('@/views/setting/index.vue')
        }
      ]
    },
    {
      path:'/data-collection/login',
      name:'login',
      component: () => import('@/views/login.vue')
    },
    {
      path:'/',
      redirect:'/data-collection/index'
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
