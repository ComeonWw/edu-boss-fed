import Vue from 'vue'
import Vuex from 'vuex'

// J将vuex作为vue的一个插件使用
Vue.use(Vuex)

// 创建一个Vuex容器实例，用来存储需要在组件间共享的状态，并导出实例
export default new Vuex.Store({
  state: {
    user: 100
  },
  // mutation必须为同步函数
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  // 用来存储异步函数
  actions: {
  },
  modules: {
  }
})
