<template>
  <div class="menu-create">
    <!-- Card组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 设置标题 -->
        <span>{{ isEdit ? '编辑菜单' : '添加菜单'}}</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <!-- 将下拉菜单数据绑定为 parentId，默认为-1 -->
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <!-- 无上级菜单选项 -->
            <el-option
              :value="-1"
              label="无上级菜单"
            ></el-option>
            <!-- 动态选项 -->
            <el-option
              v-for="item in parentMenuList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number
            v-model="form.orderNum"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button v-if="!isEdit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu'
export default {
  name: 'CreateOrEdit',
  // 接收父组件传值，判断是添加还是编辑功能
  props: {
    isEdit: {
      // 类型为布尔，默认值为false
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        parentId: 0,
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: true
      },
      parentMenuList: []
    }
  },
  created () {
    // 请求上级菜单信息
    this.loadMenuInfo()
  },
  methods: {
    async onSubmit () {
      // 1：表单验证(省略)
      // 2：验证通过，提交表单
      const { data } = await createOrUpdateMenu(this.form)
      // // 检测是否提交成功,成功时候data.code为‘000000'
      if (data.code === '000000') {
        // 提示成功
        this.$message.success('提交成功')
        // 跳回菜单页面
        this.$router.push('/menu')
      }
    },
    // 请求上级菜单信息⽅法
    // 分析：getEditMenuInfo接口在编辑功能是可以获得菜单信息，添加时为空。需要传入动态路由参数id(添加功能默认值为-1)
    async loadMenuInfo () {
      // 编辑功能合并后，处理接口id,默认值-1为添加功能使用
      const id = this.$route.params.id || -1
      const { data } = await getEditMenuInfo(id)
      // 如果存在menuinfo,说明为编辑功能，更新展示数据
      if (data.data.menuInfo) {
        this.form = data.data.menuInfo
      }
      // 请求成功的话，保存数据
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
