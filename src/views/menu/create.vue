<template>
  <div class="menu-create">
    <!-- // 设置组件，isEdit默认为false,无需传入 -->
    <create-or-edit></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './components/create-or-edit.vue'
export default {
  name: 'MenuCreate',
  components: {
    CreateOrEdit
  }
}
</script>

<style lang="scss" scoped>
</style>
