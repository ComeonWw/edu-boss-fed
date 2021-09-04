<template>
  <div class="login">
    <!-- form组件 -->
    <el-form
      label-position="top"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
          :loading="isLoginLoading"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 封装请求模块后，引入使用
import { login } from '@/services/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度为6-18个字符', trigger: 'blur' }
        ]
      },
      // 默认提交按钮不处于加载中
      isLoginLoading: false
    }
  },
  methods: {
    // onSubmit () {
    //   // console.log('submit!')
    //   this.$refs.form.validate((valid) => {
    //     if (valid) {
    //       alert('submit!')
    //     } else {
    //       console.log('error submit!')
    //       return false
    //     }
    //   })
    // }

    // async和await处理一步请求操作
    async onSubmit () {
      // 使用try catch处理验证结果
      try {
        // 1.表单验证
        await this.$refs.form.validate()
        // 2. 请求
        // 设置按钮加载中
        this.isLoginLoading = true
        const { data } = await login(this.form)
        // 取消按钮加载中状态
        this.isLoginLoading = false
        // 3.响应处理
        if (data.state !== 1) {
          return this.$message.error(data.message)
        }
        // 成功时跳转到首页，使用this.$router.push()
        this.$router.push({
          name: 'home'
        })
        this.$message.success(data.message)
      } catch (err) {
        console.log('验证失败', err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
    // 容器充满高度
    height: 100vh;
    display: flex;
    // 内容水平垂直居中
    align-items: center;
    justify-content: center;

    .el-form {
      background-color: #fff;
      width: 300px;
      padding: 20px;
      border-radius: 10px;

      .el-button {
        width: 100%;
      }
    }
  }
</style>
