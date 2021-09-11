// 引入axios
import axios from 'axios'
import store from '@/store'
// 通过局部引入方式引入Element的Message组件功能
import { Message } from 'element-ui'

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
      // token无效（过期）处理
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
