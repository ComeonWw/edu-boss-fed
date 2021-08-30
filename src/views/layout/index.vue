<template>
  <el-container>
    <el-aside width="200px">
      <!-- 引入app-aside组件 -->
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <!-- 设置子路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/AppAside.vue'
export default {
  name: 'Layout',
  components: {
    AppAside
  }
}
</script>

<style lang="scss" scoped>
  .el-container {
    height: 100vh;
  }
  .el-aside {
    background-color: #d3dce6;
  }
  .el-header {
    background-color: #b3c0d1;
  }
  .el-main {
    background-color: #e9eef3;
  }
</style>
