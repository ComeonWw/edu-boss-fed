<template>
  <div ref="editor" class="text-editor"></div>
</template>

<script>
// 引入富文本编辑器
import E from 'wangeditor'
import { uploadCourseImage } from '@/services/course'

export default {
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editor: null,
      // 要编辑的数据是否加载完毕
      isLoaded: false
    }
  },
  watch: {
    value () {
      // 为富文本编辑器初始胡
      if (!this.isLoaded) {
        this.editor.txt.html(this.value)
      }
    }
  },
  // 由于需要进行DOM 操作,使用mounted钩子
  mounted () {
    // 初始化富文本编辑器
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor)
      // 创建富文本编辑器之前，进行事件设置
      editor.config.onchange = value => {
        this.$emit('input', value)
      }
      // 配置自定义的图片上传功能
      editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadCourseImage(fd)
        if (data.code === '000000') {
          // 通过 inserImgFn 传回给富文本编辑器进行显示
          insertImgFn(data.data.name)
        }
      }
      editor.create()
      editor.txt.html(this.value)
      // 将富文本编辑器实例保存给this以便在watch中操作
      this.editor = editor
    }
  }
}
</script>
