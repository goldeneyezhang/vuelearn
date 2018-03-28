<template>
 <div>
        <vue-html5-editor :content="value" :height="200" ref="editor"></vue-html5-editor>
      </div>
</template>
<script>
export default {
  // 如果这样写就会出现 模板未被编译的异常，需要调用 compiled 方法才能使用
  // template: `<div>
  //                 <textarea rows="20"
  //                           ref="editor"
  //                           >{{ value }}</textarea></div>`,
  name: 'HtmlEditor',
  props: {
    'value': {
      type: String,
      default: ''
    }
  },
  mounted () {
    // Vue 2.0 的组件只能单向赋值,以往可以通过两路绑定的做法已经失效
    // 所以只能通过事件将组件内部的数据变化暴露给父组件
    /*let htmlEditor = window.UIkit.htmleditor(this.$refs.editor, {
      markdown: true,
      mode: 'tab'
    })
    let self = this
    this.$ui.$(this.$refs.editor).on('input', () => {
      const _val = htmlEditor.editor.getValue()
      if (_val !== self.value) {
        this.$emit('change', _val)
      }
    })*/
  }
}
</script>