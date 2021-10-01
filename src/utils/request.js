// 引入axios
import axios from 'axios'
import store from '@/store'
// 通过局部引入方式引入Element的Message组件功能
import { Message } from 'element-ui'
// 引入router
import router from '@/router'
// 引入qs
import qs from 'qs'

// 创建一个axios实例，用于自定义配置axios对象
const request = axios.create({
  timeout: 2000
  // baseURL:
  // headers:
})

function getBaseURL (url) {
  if (url.startsWith('/boss')) {
    return 'http://eduboss.lagou.com'
  } else {
    return 'http://edufront.lagou.com'
  }
}

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      // router.currentRouter就是存储了路由信息的对象
      redirect: router.currentRoute.fullPath
    }
  })
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 根据请求的url判断基地址，设置给config.baseURL
  config.baseURL = getBaseURL(config.url)

  // token统一处理
  // 为了严谨，可以读取store的user后进行token测试
  const { user } = store.state
  if (user && user.access_token) {
    // 设置token
    config.headers.Authorization = user.access_token
  }
  return config
})

// 是否正在更新token
let isRefreshing = false

// 存储因等待token刷新而挂起的请求
let requests = []

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 状态码为 2xx 都会进⼊这⾥
  console.log('请求响应成功了', response)
  return response
}, function (error) {
  // 超出 2xx 都会进⼊这⾥
  if (error.response) {
    // 请求发送成功，也收到了响应，到状态码超过了2xx(常见错误处理位置)
    // 1.保存状态码
    const { status } = error.response
    let errorMessage = ''
    // 判断
    if (status === 400) {
      errorMessage = '请求参数错误'
    } else if (status === 401) {
      // 1: 无token信息
      // 检测，如果store不存在user,跳转登录页
      if (!store.state.user) {
        redirectLogin()
        // 阻止后续操作，抛出错误对象
        return Promise.reject(error)
      }
      // 2.token无效（错误token,过期token）
      //  -发送token请求之前首先判断isRefreshing，是否存在其他的已发送的刷新请求
      if (isRefreshing) {
        // 将发送请求保存在函数中，存储到requests中等待执行，并return终止操作
        return requests.push(() => {
          request(error.config)
        })
      }
      //  -如果没有，则更新isRefreshing并发送请求，继续执行后面的操作
      isRefreshing = true
      // 发送请求，获取新的access_token
      return request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: qs.stringify({
          refreshtoken: store.state.user.refresh_token
        })
      }).then(res => {
        // 刷新token失败
        if (res.data.state !== 1) {
          // 清除无效的用户信息
          store.commit('setUser', null)
          // 跳转到登录页面
          redirectLogin()
          return Promise.reject(error)
        }
        // 刷新token成功
        // -存储新的token
        store.commit('setUser', res.data.content)
        // Token刷新成功后，将requests中的请求重新发送
        requests.forEach(callback => callback())
        // 随后清空已被重新发送的请求
        requests = []
        // -重新发送之前失败的请求
        //  -error.config 是本次失败的请求配置对象
        return request(error.config)
      }).catch(() => {
        store.commit('setUser', null)
        redirectLogin()
        return Promise.reject(error)
      }).finally(() => {
        //  -Token请求完毕，无论成功失败，都将isRefreshing设置为false
        isRefreshing = false
      })
    } else if (status === 403) {
      errorMessage = '没有权限，请联系管理员'
    } else if (status === 404) {
      errorMessage = '请求资源不存在'
    } else if (status >= 500) {
      errorMessage = '服务端错误，请联系管理员'
    }
    Message.error(errorMessage)
  } else if (error.request) {
    // 请求发送成功，但没有收到响应
    Message.error('请求超时，请重试')
  } else {
    // 在设置请求时发生了一些失去，触发了错误（未知型错误）
    Message.error(`请求失败${error.message}`)
  }
  // 将失败的错误对象继续抛出，传递给接收响应的处理函数
  return Promise.reject(error)
})
export default request
