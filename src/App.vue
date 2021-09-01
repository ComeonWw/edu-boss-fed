// 根组件，最终会被渲染到index.html中.
<template>
  <div id="app">
    <!-- 根路由出口，用于渲染路由组件 -->
    <router-view/>

  </div>
</template>

<script>
import request from '@/utils/request'
request({
  method: 'GET',
  // url: 'http://edufront.lagou.com/front/ad/getAdList'
  url: '/front/ad/getAdList'
}).then(res => {
  console.log(res)
})

export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
</style>
