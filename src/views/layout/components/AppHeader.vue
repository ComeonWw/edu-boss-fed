<template>
  <div class="app-header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <!-- Element的Avatar组件 -->
        <el-avatar
          :size="40"
          :src="userInfo.portrait || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{userInfo.userName}}</el-dropdown-item>
        <el-dropdown-item
          divided
          @click.native='handleLogout'
        >退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
// 引入userInfo接口请求功能
import { getUserInfo } from '@/services/user'
export default {
  name: 'AppHeader',
  // 实例创建时请求数据
  created () {
    // 不建议在钩子函数中直接书写逻辑，应该封装到methods中
    this.loadUserInfo()
    // this.loadUsserInfo()
  },
  data () {
    // 声明存储用户信息的数据，绑定到视图中
    return {
      userInfo: {}
    }
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      console.log(data)
      this.userInfo = data.content
    },
    handleLogout () {
      this.$confirm('确定退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功'
        })
        // 通过 mutation 中的 setUser 清空 user，由于 setUser 也设置了本地存储，这时也会⾃动清空
        this.$store.commit('setUser', null)
        // 跳转到登录页
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-header {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown-link {
      display: flex;
      align-items: center;
    }
  }
</style>
