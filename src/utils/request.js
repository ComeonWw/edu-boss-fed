// 引入axios
import axios from 'axios'
import store from '@/store'

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

export default request
