<template>
  <div class="resource-list">
    <!-- 使用Card组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 使用form组件 -->
        <el-form
          :inline="true"
          :model="form"
          class="demo-form-inline"
          ref="form"
        >
          <el-form-item label="资源名称" prop="name">
            <el-input clearable v-model="form.name" placeholder="资源名称"></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input clearable v-model="form.url" placeholder="资源路径"></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select
              clearable
              v-model="form.categoryId"
              placeholder="资源分类"
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in resourceCategories"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="onReset">重置</el-button>
            <el-button type="primary" @click="onSubmit">查询搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 使用Table组件 -->
      <el-table
        :data="resources"
        style="width: 100%; margin-bottom: 20px;">
        <el-table-column
          prop="id"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <!-- 时间通过过滤器处理，Table组件数据要使用过滤器，需要通过自定义列模板方式设置插槽表达式 -->
        <el-table-column
          label="时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width='150'
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getResourcePages, getResourceCategory } from '@/services/resource'
export default {
  name: 'ResourceList',
  created () {
    // 调用
    this.loadResources()
    this.loadResourceCategory()
  },
  data () {
    return {
      resources: [],
      // 资源分类列表
      resourceCategories: [],
      form: {
        // 资源名称
        name: '',
        // 资源路径
        url: '',
        // 资源分类
        categoryId: '',
        // 当前页号，默认为1
        current: 1,
        // 每页数据条数，例如为10，按需设置
        size: 10
      },
      // 数据总条数
      totalCount: 0
    }
  },
  methods: {
    handleSizeChange (val) {
      this.form.size = val
      this.form.current = 1
      this.loadResources()
    },
    handleCurrentChange (val) {
      // 将val 同步给current
      this.form.current = val
      // 请求更新数据
      this.loadResources()
    },
    // 异步请求函数
    async loadResources () {
      // 将参数传入请求
      const { data } = await getResourcePages(this.form)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.totalCount = data.data.total
      }
    },
    async loadResourceCategory () {
      const { data } = await getResourceCategory()
      if (data.code === '000000') {
        this.resourceCategories = data.data
      }
    },
    onSubmit () {
      // 筛选提交，请求数据（将请求参数更改为整个form）
      this.form.current = 1
      this.loadResources()
    },
    onReset () {
      this.$refs.form.resetFields()
    }
  },
  filters: {
    // 日期过滤器
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
