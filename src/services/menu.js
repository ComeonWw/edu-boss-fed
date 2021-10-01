import request from '@/utils/request'

// 添加菜单请求功能
export const createOrUpdateMenu = (data) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

// 获取编辑菜单⻚⾯信息
//  -请求参数为id,默认值为-1
export const getEditMenuInfo = (id = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

// 获取所有菜单
export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

// 删除指定菜单
export const deleteMenu = (id) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}

// 获取所有菜单并按层级展示
export const getMenuNodeList = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}
