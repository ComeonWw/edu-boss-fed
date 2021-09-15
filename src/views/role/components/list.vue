<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form
        ref="form"
        :model="form"
        :inline="true"
      >
        <el-form-item label="角色名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            :disabled="isLoading"
          >查询</el-button>
          <el-button
            @click="onReset"
            :disabled="isLoading"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button @click="handleAdd">添加角色</el-button>
    <!-- 使用Table组件 -->
    <el-table
      :data="roles"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
      <!-- 时间通过过滤器处理，Table组件数据要使用过滤器，需要通过自定义列模板方式设置插槽表达式 -->
      <el-table-column
        label="添加时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="150px"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
          >分配菜单</el-button>
          <el-button
            type="text"
          >分配资源</el-button>
          <el-button
            type="text"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="isEdit ? '编辑角色' : '添加角色'"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <!-- 将对话框内容更改为自定义模板 -->
      <create-or-edit
        :is-edit="isEdit"
        :role-id="roleId"
        @success="onSuccess"
        @cancel="dialogVisible = false"
      ></create-or-edit>
    </el-dialog>
  </el-card>
</template>

<script>
import { getRoles, deleteRole } from '@/services/role'
import CreateOrEdit from './create-or-edit'
export default {
  name: 'RoleList',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      // 为顶部搜索功能设置基础配置项
      form: {
        name: ''
      },
      // 所有角色
      roles: [],
      // 控制加载状态
      isLoading: false,
      // 对话框显示与否
      dialogVisible: false,
      // 添加或编辑角色
      isEdit: false,
      // 编辑角色的id
      roleId: ''
    }
  },
  created () {
    this.loadRoles()
  },
  methods: {
    // 请求角色列表数据
    async loadRoles () {
      this.isLoading = true
      const { data } = await getRoles(this.form)
      if (data.code === '000000') {
        this.roles = data.data.records
      }
      this.isLoading = false
    },
    // 添加成功的操作
    onSuccess () {
      // 关闭对话框
      this.dialogVisible = false
      // 刷新列表数据
      this.loadRoles()
    },
    onReset () {

    },
    onSubmit () {

    },
    handleEdit (role) {
      this.dialogVisible = true
      this.isEdit = true
      // 将要编辑的⻆⾊ ID 传递给表单展示
      this.roleId = role.id
    },
    handleAdd () {
      this.dialogVisible = true
      this.isEdit = false
    },
    // 删除角色
    handleDelete (role) {
      this.$confirm(`确认删除角色：${role.name}?`, '删除提示')
        .then(async () => {
          await deleteRole(role.id)
          this.$message.success('删除成功')
          this.loadRoles()
        })
        .catch(err => {
          if (err && err.response) {
            this.$message.error('删除失败，请重试')
          } else {
            this.$message.info('取消删除')
          }
        })
    }
  },
  filters: {
    dateFormat (date) {
      date = new Date(date)
      return `
        ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
      `
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
