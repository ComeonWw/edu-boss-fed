<template>
  <div class="role">
    <role-list></role-list>
  </div>
</template>

<script>
// 引入角色列表组件
import RoleList from './components/list.vue'
export default {
  name: 'RoleIndex',
  components: {
    RoleList
  }
}
</script>

<style lang="scss" scoped></style>
