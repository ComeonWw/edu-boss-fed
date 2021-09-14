import request from '@/utils/request'

// 资源请求
export const getResourcePages = (data) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

// 查询资源分类请求
export const getResourceCategory = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
