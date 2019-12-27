<template>
  <div :class="prefixCls">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

@Component({
  name: 'QuillEditor',
  components: {
    quillEditor
  }
})
export default class QuillEditorComponent extends Vue {
  // props
  @Prop({ type: String, default: 'ant-editor-quill' })
  private prefixCls!: string
  // 表单校验用字段
  @Prop({ type: String })
  private value!: string

  // data
  private content: any = null
  private editorOption: any = {}

  constructor() {
    super()
  }

  // methods
  onEditorBlur(quill: any) {
    console.log('editor blur!', quill)
  }
  onEditorFocus(quill: any) {
    console.log('editor focus!', quill)
  }
  onEditorReady(quill: any) {
    console.log('editor ready!', quill)
  }
  // todo quill, html, text
  onEditorChange(html: any) {
    //console.log('editor change!', quill, html, text)
    this.$emit('change', html)
  }

  // watch
  @Watch('value')
  valueChange(val: string) {
    this.content = val
  }
}
</script>

<style lang="less" scoped>
@import url('../index.less');

/* 覆盖 quill 默认边框圆角为 ant 默认圆角，用于统一 ant 组件风格 */
.ant-editor-quill {
  /deep/ .ql-toolbar.ql-snow {
    border-radius: @border-radius-base @border-radius-base 0 0;
  }
  /deep/ .ql-container.ql-snow {
    border-radius: 0 0 @border-radius-base @border-radius-base;
  }
}
</style>
