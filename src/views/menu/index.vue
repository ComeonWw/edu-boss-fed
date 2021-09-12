<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'menu-create' })"
          >添加菜单</el-button
        >
      </div>
      <!-- 菜单列表展示区域 -->
      <el-table
        :data="menus"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称">
        </el-table-column>
        <el-table-column
          prop="level"
          label="菜单级数">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序">
        </el-table-column>
        <el-table-column
          label="编辑">
          <el-button>编辑</el-button>
          <el-button>删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getAllMenus } from '@/services/menu'
export default {
  name: 'MenuIndex',
  data () {
    return {
      // 设置数据
      menus: []
    }
  },
  created () {
    // 加载所有菜单信息
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus () {
      // 请求
      const { data } = await getAllMenus()
      console.log('请求菜单成功')
      console.log(data)
      this.menus = data.data
    }
  }
}
</script>

<style lang="scss" scoped></style>
