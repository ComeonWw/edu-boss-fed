<template>
  <div class="alloc-menu">分配菜单</div>
</template>

<script>
export default {
  props: {
    // 组件内需要通过props接收路径传递的参数，实现解耦
    //  --$route里的数据虽然还能访问，但不能用，否则组件与路由还是耦合，解耦就白写了。
    roleId: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
