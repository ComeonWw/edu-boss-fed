import request from '@/utils/request'

// 获取角色
export const getRoles = (data) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

// 删除角色
export const deleteRole = (id) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

// 根据id获取角色
export const getRoleById = (id) => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}

// 添加或编辑角色
export const createOrEdit = (data) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}
