// 引入axios
import axios from 'axios'

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
  return config
})

export default request
