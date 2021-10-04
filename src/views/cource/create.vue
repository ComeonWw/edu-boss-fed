<template>
  <div class="course-create">
    <!-- 设置slot后Element会自动设置为上下两部分的布局样式(具有分割) -->
    <el-card>
      <div slot="header">
        <!-- element官方Steps步骤条组件处理 -->
        <!-- active代表步骤进度,默认为0 -->
        <!-- 由于组件没有click事件,应该添加.native设置click原生事件 -->
        <el-steps :active="activeStep" simple>
          <el-step
            v-for="(item, i) in steps"
            :key="item.id"
            :title="item.title"
            :icon="item.icon"
            @click.native="activeStep = i"
          ></el-step>
        </el-steps>
      </div>
      <!-- 步骤容器 -->
      <el-form>
        <div v-show="activeStep === 0">
          <el-form-item label="课程名称">
            <el-input v-model="course.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input v-model="course.brief"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input
              v-model="course.previewFirstField"
              placeholder="概述1"
            >
              <template slot="append">{{course.previewFirstField.length}}/20</template>
            </el-input>
            <el-input
              v-model="course.previewSecondField"
              placeholder="概述2"
            >
              <template slot="append">{{course.previewSecondField.length}}/20</template>
            </el-input>
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input v-model="course.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="course.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程排序">
            <!-- 计数器组件 -->
            <el-input-number
              label="描述文字"
              v-model="course.sortNum"
            ></el-input-number>
          </el-form-item>
        </div>
        <div v-show="activeStep === 1">
          <el-form-item label="课程封面">
            <!-- Element官方 Upload上传组件 - 用户头像上传 -->
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :http-request="handleUpload">
              <!-- 显示预览元素的图片 -->
              <!-- 图片预览修改为当前Upload对应数据 -->
              <img v-if="course.courseListImg" :src="course.courseListImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="解锁封面">
            <!-- Element官方 Upload上传组件 - 用户头像上传 -->
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :http-request="handleUpload">
              <!-- 显示预览元素的图片 -->
              <img v-if="course.courseListImg" :src="course.courseListImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div>
        <div v-show="activeStep === 2">
          <!-- 使用Element中的Input复合型输入框组件 -->
          <el-form-item label="售卖价格">
            <el-input>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input>
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input>
            </el-input>
          </el-form-item>
        </div>
        <div v-show="activeStep === 3">
          <!-- 秒杀活动 -->
          <!-- 设置秒杀状态开关 -->
          <el-switch
            v-model="isSecKill"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          <template v-if="isSecKill">
            <!-- 其他部分的基础结构 -->
            <el-form-item label="开始时间">
              <el-date-picker
                type="datetime"
                placeholder="选择开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                type="datetime"
                placeholder="选择结束时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input>
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
              <el-input>
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <div v-show="activeStep === 4">
          <el-form-item label="课程详情">
            <el-input type="textarea"></el-input>
          </el-form-item>
          <!-- 最后步骤中设置保存按钮 -->
          <el-form-item>
            <el-button type="primary">保存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { uploadCourseImage } from '@/services/course'
//  saveOrUpdateCourse,
export default {
  name: 'CourseCreate',
  data () {
    return {
      // 步骤条进度
      activeStep: 1,
      steps: [
        { id: 1, title: '基本信息', icon: 'el-icon-edit' },
        { id: 2, title: '课程封面', icon: 'el-icon-upload' },
        { id: 3, title: '销售信息', icon: 'el-icon-picture' },
        { id: 4, title: '秒杀信息', icon: 'el-icon-picture' },
        { id: 5, title: '课程详情', icon: 'el-icon-picture' }
      ],
      imageUrl: '',
      // 秒杀状态
      isSecKill: false,
      // 保存课程信息
      course: {
        id: 0,
        // 课程名称
        courseName: '',
        // 课程描述
        brief: '',
        teacherDTO: {
          id: 0,
          courseId: 0,
          // 讲师名称
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          // 讲师描述
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        // 课程排序
        sortNum: 0,
        // 课程概述1
        previewFirstField: '',
        // 课程概述2
        previewSecondField: '',
        status: 0,
        sales: 0,
        activityCourse: true,
        activityCourseDTO: {
          id: 0,
          courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      }
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
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 保存
    // handleSave () {
    //   console.log('保存')
    // }

    // 自定义文件上传操作
    async handleUpload (options) {
      // 创建FormData对象保存数据
      const fd = new FormData()
      // 添加数据的键要根据接口文档设置
      fd.append('file', options.file)
      // 发送请求
      const { data } = await uploadCourseImage(fd)
      if (data.code === '000000') {
        // ⽚预览为组件在 on-success 时设置的本地预览功能
        // 默认检测 imgUrl, 这⾥更换为 course中对应地址即可
        // before-upload ⽤于在上传⽂件前进⾏规则校验（例如⽂件格式与⼤⼩，可⾃⾏调整）
        // data.data.name 为服务器提供的地址
        this.course.courseListImg = data.data.name
        // 提示
        this.$message.success('上传成功')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}
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
