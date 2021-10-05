<template>
  <div class="course-section">课程内容</div>
</template>

<script>
export default {
  name: 'CourseSection',
  // 设置路由后，通过props接收动态路由参数
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
