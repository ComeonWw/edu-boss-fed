// 根组件，最终会被渲染到index.html中.
<template>
  <div id="app">
    <!-- 实例内容 -->
    <h1>拉钩教育</h1>
    <!-- 根路由出口，用于渲染路由组件 -->
    <route-view></route-view>

    <!-- 下面测试Element是否可用 -->
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
</style>
