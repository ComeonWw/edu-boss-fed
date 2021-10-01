<template>
  <div class="alloc-menu">
    <el-card>
      <el-tree
        ref="menuTree"
        node-key="id"
        :data="menus"
        default-expand-all
        show-checkbox
        :props="defaultProps"
        :default-checked-keys="checkedKeys">
      </el-tree>
      <div>
        <el-button>清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'
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
      },
      // 存储选择的数据id
      checkedKeys: []
    }
  },
  created () {
    // 加载所有菜单
    this.loadMenus()
    // 加载角色拥有的菜单列表
    this.loadRoleMenus()
  },
  methods: {
    async loadMenus () {
      // 请求所有菜单数据
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    async onSave () {
      // 传入通过路径参数接收的角色ID
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList: this.$refs.menuTree.getCheckedKeys()
      })
      if (data.code === '000000') {
        // 提示
        this.$message.success('分配菜单成功')
        // 返回⻆⾊列表⻚即可
        this.$router.push('/role')
      }
    },
    async loadRoleMenus () {
      // 请求角色拥有的菜单列表
      const { data } = await getRoleMenus(this.roleId)
      if (data.code === '000000') {
        // 获取选中的数据
        this.getCheckedKeys(data.data)
      }
    },
    // 数据筛选功能
    getCheckedKeys (menus) {
      menus.forEach(menu => {
        if (menu.subMenuList) {
          return this.getCheckedKeys(menu.subMenuList)
        }
        // 存储选中的节点
        if (menu.selected) {
          this.checkedKeys = [...this.checkedKeys, menu.id]
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
