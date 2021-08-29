import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入路由中需要使用的组件功能
// 可以写为index,也可以写为index.vue
import Login from '@/views/login/index'
import Layout from '@/views/layout/index'
import Home from '@/views/home/index'
import Role from '@/views/role/index'
import Menu from '@/views/menu/index'
import Resource from '@/views/resource/index'
import Cource from '@/views/cource/index'
import User from '@/views/user/index'
import Advert from '@/views/advert/index'
import AdvertSpace from '@/views/advert-space/index'
import ErrorPage from '@/views/error-page/index'

// 通过import的方式，需要将VueRouter使用Vue.use()注册为Vue的插件，这样才能使用
Vue.use(VueRouter)

// 路由规则
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/role',
        name: 'role',
        component: Role
      },
      {
        path: '/menu',
        name: 'menu',
        component: Menu
      },
      {
        path: '/resource',
        name: 'resource',
        component: Resource
      },
      {
        path: '/cource',
        name: 'cource',
        component: Cource
      },
      {
        path: '/user',
        name: 'user',
        component: User
      },
      {
        path: '/advert',
        name: 'advert',
        component: Advert
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: AdvertSpace
      }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: ErrorPage
  }
]

const router = new VueRouter({
  routes
})

// 模块导出
export default router
