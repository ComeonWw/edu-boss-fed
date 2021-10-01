<template>
  <div class="alloc-menu">
    <el-card>
      <el-tree
        :data="menus"
        default-expand-all
        show-checkbox
        :props="defaultProps">
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import { getMenuNodeList } from '@/services/menu'
export default {
  props: {
    // 组件内需要通过props接收路径传递的参数，实现解耦
    //  --$route里的数据虽然还能访问，但不能用，否则组件与路由还是耦合，解耦就白写了。
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
    }
  },
  created () {
    // 加载所有菜单
    this.loadMenus()
  },
  methods: {
    async loadMenus () {
      // 请求所有菜单数据
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menus = data.data
      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
