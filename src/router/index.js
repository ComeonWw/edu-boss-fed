import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// 通过import的方式，需要将VueRouter使用Vue.use()注册为Vue的插件，这样才能使用
Vue.use(VueRouter)

// 路由规则
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index')
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'layout' */'@/views/layout/index'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index'),
        meta: { requiresAuth: true }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index'),
        meta: { requiresAuth: true }
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index'),
        meta: { requiresAuth: true }
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create' */'@/views/menu/create'),
        meta: { requiresAuth: true }
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-edit' */'@/views/menu/edit'),
        meta: { requiresAuth: true }
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index'),
        meta: { requiresAuth: true }
      },
      {
        path: '/cource',
        name: 'cource',
        component: () => import(/* webpackChunkName: 'cource' */'@/views/cource/index'),
        meta: { requiresAuth: true }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index'),
        meta: { requiresAuth: true }
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index')
      }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

// 全使用vue router 的导航守卫beforeEach,在任务导航被触发时进行登录状态检测
router.beforeEach((to, from, next) => {
  // 官方示例，检测路由是否需要登录
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // to路由要求具有登录状态，检测用户是否登录
    if (!store.state.user) {
      // 未登录，导航跳转到登录页面
      next({
        name: 'login',
        // 通过query属性给url设置查询字符串参数（键值均为自定义）
        query: {
          // path仅包含部分路径，fullpath为完整路径
          redirect: to.fullPath
        }
      })
    } else {
      // 已经登录，允许通过
      next()
    }
  } else {
    // 无需登录，允许通过
    next()
  }
})

// 模块导出
export default router
