<template>
  <el-card>
    <div slot="header">
      <el-form
        :inline="true"
        :model="filterParams"
        ref="filter-form">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="filterParams.phone"></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="rangeDate">
          <el-date-picker
            v-model="filterParams.rangeDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="isLoading"
            @click="handleReset"
          >重置</el-button>
          <el-button
            type="primary"
            @click="handleQuery"
            :disabled="isLoading"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="users"
      style="width: 100%"
      v-loading="isLoading"
    >
      <el-table-column
        prop="id"
        label="用户ID"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="头像"
        width="100">
        <template slot-scope="scope">
          <img width="30px" :src="scope.row.portrait || 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="注册时间">
        <!-- 用户状态操作（服务端没有开放权限，只能演示） -->
      </el-table-column>
      <el-table-column
        prop="name"
        label="状态"
        width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="ENABLE"
            inactive-value="DISABLE"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleForbidUser(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleSelectRole(scope.row)"
          >分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-select v-model="roleIdList" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.value"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAllocRole">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { getUserPages, forbidUser } from '@/services/user'
import { getAllRoles, allocateUserRoles, getUserRoles } from '@/services/role'

export default {
  name: 'UserList',
  data () {
    return {
      users: [],
      filterParams: {
        currentPage: 1,
        pageSize: 100,
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        rangeDate: []
      },
      isLoading: true,
      dialogVisible: false,
      // 所有角色，对象实例的option
      roles: [],
      // 选中角色，对应示例的value1
      roleIdList: [],
      // 当前分配角色的ID(声明在data中)
      currentRoleId: null
    }
  },
  created () {
    this.loadUsers()
  },

  methods: {
    // 加载用户
    async loadUsers () {
      this.isLoading = true
      const { rangeDate } = this.filterParams
      if (rangeDate && rangeDate.length) {
        this.filterParams.startCreateTime = rangeDate[0]
        this.filterParams.endCreateTime = rangeDate[1]
      } else {
        this.filterParams.startCreateTime = ''
        this.filterParams.endCreateTime = ''
      }
      const { data } = await getUserPages(this.filterParams)
      this.users = data.data.records
      this.isLoading = false
    },
    async handleForbidUser (user) {
      const { data } = await forbidUser(user.id)
      console.log(data)
    },
    handleQuery () {
      this.filterParams.currentPage = 1
      this.loadUsers()
    },
    handleReset () {
      this.$refs['filter-form'].resetFields()
      this.loadUsers()
    },
    // 点击用户的分配角色按钮
    async handleSelectRole (userData) {
      // 将当前操作的用户ID保存，一遍提交使用
      this.currentRoleId = userData.id
      // 显示对话框
      this.dialogVisible = true
      // 点击后加载角色列表
      const { data } = await getAllRoles()
      this.roles = data.data
      // 根据用户id请求角色信息（data被之前的请求使用过了，换个名字data2）
      const { data: data2 } = await getUserRoles(userData.id)
      if (data2.code === '000000') {
        // 遍历得到的⻆⾊列表，将id组成数据替换给 roleIdList 即可
        this.roleIdList = data2.data.map(item => item.id)
      }
    },
    // 提交分配角色操作
    async handleAllocRole () {
      // 提交
      const { data } = await allocateUserRoles({
        userId: this.currentRoleId,
        roleIdList: this.roleIdList
      })
      if (data.code === '000000') {
        // 提示
        this.$message.success('分配角色成功')
        // 关闭对话框
        this.dialogVisible = false
        this.roleIdList = []
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
