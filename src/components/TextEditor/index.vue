<template>
  <div ref="editor" class="text-editor"></div>
</template>

<script>
// 引入富文本编辑器
import E from 'wangeditor'
export default {
  name: 'TextEditor',
  props: {
    value: {
      type: String
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
      // 设置回调
      editor.config.onchange = (value) => {
        this.$emit('input', value)
      }
      editor.create()
      editor.txt.html(this.value)
    }
  }
}
</script>
