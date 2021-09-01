<template>
  <el-container>
    <el-aside width="200px">
      <!-- 引入app-aside组件 -->
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 引入app-header组件 -->
        <app-header></app-header>
      </el-header>
      <el-main>
        <!-- 设置子路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/AppAside.vue'
import AppHeader from './components/AppHeader.vue'
export default {
  name: 'Layout',
  components: {
    AppAside,
    AppHeader
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
    background-color: #fff;
  }
  .el-main {
    background-color: #e9eef3;
  }
</style>
