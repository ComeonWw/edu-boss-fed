<template>
  <div class="course-image">
    <!-- 将上传功能结构放入 -->
    <el-form-item label="添加课程">
      <!-- 进度条组件 -->
      <el-progress
        v-if="isUploading"
        type="circle"
        :percentage="percentage"
        :width="178"
      >
      </el-progress>
      <!-- 上传组件 -->
      <el-upload
        v-else
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :http-request="handleUpload">
        <!-- 显示预览元素的图片 -->
        <!-- 图片预览修改为当前Upload对应数据 -->
        <img v-if="value" :src="value" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
  </div>
</template>

<script>
import { uploadCourseImage } from '@/services/course'

export default {
  name: 'CourseImage',
  // 接收父组件数据
  props: {
    value: {
      type: String
    },
    // 限制上传大小
    limit: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      // 保持上传进度百分比
      percentage: 0,
      // 保持下载状态
      isUploading: false
    }
  },
  methods: {
    // 文件上传成功时的钩子
    handleAvatarSuccess (res, file) {
      console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传文件之前的钩子
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < this.limit

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 自定义文件上传操作
    async handleUpload (option) {
      // 设置进度条信息展示
      this.isUploading = true
      // 创建FormData对象保存数据
      const fd = new FormData()
      // 添加数据的键要根据接口文档设置
      fd.append('file', option.file)
      // 发送请求
      const { data } = await uploadCourseImage(fd, event => {
        this.percentage = Math.floor(event.loaded / event.total * 100)
      })
      if (data.code === '000000') {
        // data.data.name 为服务器提供的地址
        // 上传成功后，将数据通过自定义事件传递给父组件
        this.$emit('input', data.data.name)
        // 关闭进度条信息展示
        this.isUploading = false
        // 设置进度条为0
        this.percentage = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 只有作⽤于⾮⼦组件根元素的选择器才需要设置 ::v-deep
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
