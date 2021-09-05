import Vue from 'vue'
import Vuex from 'vuex'

// J将vuex作为vue的一个插件使用
Vue.use(Vuex)

// 创建一个Vuex容器实例，用来存储需要在组件间共享的状态，并导出实例
export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || null)
  },
  // mutation必须为同步函数
  mutations: {
    setUser (state, payload) {
      // 为了方便使用，在mutation setUser中将payload转换为对象保存。
      state.user = JSON.parse(payload)
      // 通过本地存储对user进行数据持久化，避免页面刷新状态丢失
      // ---本地存储只能保存字符串
      window.localStorage.setItem('user', payload)
    }
  },
  // 用来存储异步函数
  actions: {
  },
  modules: {
  }
})
