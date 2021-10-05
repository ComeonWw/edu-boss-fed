<template>
  <div class="course-create">
    <create-or-edit :is-edit="isEdit"></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './components/create-or-edit.vue'

export default {
  name: 'CourseCreate',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      isEdit: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
