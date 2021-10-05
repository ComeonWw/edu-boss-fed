<template>
  <div class="course-create">
    <create-or-edit></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './components/create-or-edit.vue'

export default {
  name: 'CourseCreate',
  components: {
    CreateOrEdit
  }
}
</script>

<style lang="scss" scoped>
</style>
