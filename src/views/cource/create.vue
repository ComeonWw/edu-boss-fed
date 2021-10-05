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
          <course-image v-model="course.courseListImg" :limit="3"></course-image>
          <course-image v-model="course.courseImgUrl"></course-image>
        </div>
        <div v-show="activeStep === 2">
          <!-- 使用Element中的Input复合型输入框组件 -->
          <el-form-item label="售卖价格">
            <el-input
              type="number"
              v-model="course.discounts"
              :min="0"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input
              type="number"
              v-model="course.price"
              :min="0"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input
              type="number"
              v-model="course.sales"
              :min="0"
            >
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input
              v-model="course.discountsTag"
            >
            </el-input>
          </el-form-item>
        </div>
        <div v-show="activeStep === 3">
          <!-- 秒杀活动 -->
          <!-- 设置秒杀状态开关 -->
          <el-switch
            v-model="course.activityCourse"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          <template v-if="course.activityCourse">
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
              <el-input
                v-model="course.activityCourseDTO.amount"
                type="number"
                :min="0"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
              <el-input
                v-model="course.activityCourseDTO.stock"
                type="number"
                :min="0"
              >
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <div v-show="activeStep === 4">
          <el-form-item>
            <text-editor v-model="course.courseDescriptionMarkDown"></text-editor>
          </el-form-item>
          <!-- 增加上下架开关 -->
          <el-switch
            v-model="course.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          <!-- 最后步骤中设置保存按钮 -->
          <el-form-item>
            <el-button type="primary" @click="handleSave">保存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import CourseImage from './components/course-image.vue'
import { saveOrUpdateCourse } from '@/services/course'
import TextEditor from '@/components/TextEditor/index'

export default {
  name: 'CourseCreate',
  // 注册为子组件
  components: {
    CourseImage,
    TextEditor
  },
  data () {
    return {
      // 步骤条进度
      activeStep: 0,
      steps: [
        { id: 1, title: '基本信息', icon: 'el-icon-edit' },
        { id: 2, title: '课程封面', icon: 'el-icon-upload' },
        { id: 3, title: '销售信息', icon: 'el-icon-picture' },
        { id: 4, title: '秒杀信息', icon: 'el-icon-picture' },
        { id: 5, title: '课程详情', icon: 'el-icon-picture' }
      ],
      imageUrl: '',
      // 保存课程信息
      course: {
        // id: 0,
        // 课程名称
        courseName: '',
        // 课程描述
        brief: '',
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          // 讲师名称
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          // 讲师描述
          description: ''
        },
        // 课程详情
        courseDescriptionMarkDown: '<p>初始值</p>',
        // 商品原价
        price: 0,
        // 售票价格
        discounts: 0,
        priceTag: '',
        // 活动标签
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
        // 商品是否上架,1表示上架,0表示未上架
        status: 0,
        // 销量
        sales: 0,
        // 秒杀课程
        activityCourse: false,
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
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
    async handleSave () {
      // 发送请求
      const { data } = await saveOrUpdateCourse(this.course)
      if (data.code === '000000') {
        this.$router.push({ name: 'cource' })
        this.$message.success('添加课程成功')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}
</style>
