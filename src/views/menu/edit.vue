<template>
  <div class="menu-edit">
    <!-- 设置isEdit为true,展示编辑功能 -->
    <create-or-edit :isEdit="true"></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './components/create-or-edit.vue'
export default {
  name: 'MenuEdit',
  components: {
    CreateOrEdit
  }
}
</script>

<style lang="scss" scoped>
</style>
