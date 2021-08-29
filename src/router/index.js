import Vue from 'vue'
import VueRouter from 'vue-router'

// 通过import的方式，需要将VueRouter使用Vue.use()注册为Vue的插件，这样才能使用
Vue.use(VueRouter)

// 路由规则
const routes = []

const router = new VueRouter({
  routes
})

// 模块导出
export default router
