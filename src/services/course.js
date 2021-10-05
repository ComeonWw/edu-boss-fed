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

// 保存或者更改数据信息
export const saveOrUpdateCourse = data => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

// 上传图片,添加配置项与参数
export const uploadCourseImage = (data, onUploadProgress) => {
  // 接口要求的请求数据类型为multipart/form-data
  // 所以需要提交FormData数据对象
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    // Axios将HTML5新增的上传进度事件：progress
    onUploadProgress
  })
}

// 通过课程id获取课程信息
export const getCourseById = courseId => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}
