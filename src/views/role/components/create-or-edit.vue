<template>
  <div>
    <el-form>
      <el-form-item label="角色名称">
      <el-input v-model="role.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="role.code"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input type="textarea" v-model="role.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createOrEdit, getRoleById } from '@/services/role'
export default {
  name: 'CreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    roleId: {
      type: [String, Number]
    }
  },
  created () {
    if (this.isEdit) {
      // 用户根据id加载数据
      this.loadRole()
    }
  },
  data () {
    return {
      // 根据接口要求绑定数据
      role: {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      const { data } = await createOrEdit(this.role)
      if (data.code === '000000') {
        // 提示添加成功
        this.$message.success('添加成功')
        // 子组件触发自定义事件，父组件关闭对话框
        this.$emit('success')
        this.role = {}
      }
    },
    onCancel () {
      this.$emit('cancel')
      this.role = {}
    },
    async loadRole () {
      const { data } = await getRoleById(this.roleId)
      if (data.code === '000000') {
        // 将角色数据更新给role即可
        this.role = data.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
