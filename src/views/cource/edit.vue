<template>
  <div class="course-edit">
    <!-- 将props的数据传递给子组件 -->
    <create-or-edit
      :is-edit="isEdit"
      :courseId="courseId"
    ></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './components/create-or-edit.vue'

export default {
  name: 'CourseEdit',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      isEdit: true
    }
  },
  components: {
    CreateOrEdit
  }
}
</script>

<style lang="scss" scoped>
</style>
