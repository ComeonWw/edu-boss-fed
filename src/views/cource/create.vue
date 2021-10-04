<template>
  <div class="course-create">
    <!-- 设置slot后Element会自动设置为上下两部分的布局样式(具有分割) -->
    <div slot="header">
      <el-card>
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
        <!-- 步骤容器 -->
        <el-form>
          <div v-show="activeStep === 0">
            基本信息
          </div>
          <div v-show="activeStep === 1">
            课程封面
          </div>
          <div v-show="activeStep === 2">
            销售信息
          </div>
          <div v-show="activeStep === 3">
            秒杀信息
          </div>
          <div v-show="activeStep === 4">
            课程详情
            <!-- 最后步骤中设置保存按钮 -->
            <el-form-item>
              <el-button type="primary">保存</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseCreate',
  data () {
    return {
      // 步骤条进度
      activeStep: 4,
      steps: [
        { id: 1, title: '基本信息', icon: 'el-icon-edit' },
        { id: 2, title: '课程封面', icon: 'el-icon-upload' },
        { id: 3, title: '销售信息', icon: 'el-icon-picture' },
        { id: 4, title: '秒杀信息', icon: 'el-icon-picture' },
        { id: 5, title: '课程详情', icon: 'el-icon-picture' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}
</style>
