import request from '@/utils/request'

export const getQueryCourses = (data) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

// 课程上下架接口
// 注意get请求的参数需要写在axios中
export const changeState = (data) => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params: data
    // 或者将data改为parms，这样传递的参数就可以合并书写，写成paramas就可以
  })
}
