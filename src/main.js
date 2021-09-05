// 入口文件
import Vue from 'vue'
import App from './App.vue'
// 加载router模块，默认加载的是./router/index.js
import router from './router'
import store from './store'

// 引入 Element
import ElementUI from 'element-ui'
// 引入Element 的主题文件
// import 'element-ui/lib/theme-chalk/index.css'
// 引入自定义的全局样式文件
import './styles/index.scss'

// 将Element注册为Vue插件
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  // 将路由挂载到router，让路由生效
  router,
  // 将store改在到store，让vuex的store生效
  store,
  // 渲染根实例(Vue实例)
  render: h => h(App)
}).$mount('#app') // 将Vue实例挂载到了index.html中
