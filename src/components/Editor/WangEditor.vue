<template>
  <div :class="prefixCls">
    <div ref="editor" class="editor-wrapper" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import WEditor from 'wangeditor'

@Component({
  name: 'WangEditor',
  components: {}
})
export default class WangEditorComponent extends Vue {
  // props
  @Prop({ type: String, default: 'ant-editor-wang' })
  private prefixCls!: string
  @Prop({ type: String })
  private value!: string

  // data
  private editor: any = null
  private editorContent: any = null

  constructor() {
    super()
  }

  @Watch('value')
  valueChange(val: string) {
    this.editorContent = val
    this.editor.txt.html(val)
  }

  mounted() {
    this.initEditor()
  }

  // methods
  initEditor() {
    this.editor = new WEditor(this.$refs.editor)
    // this.editor.onchangeTimeout = 200
    this.editor.customConfig.onchange = (html: string) => {
      this.editorContent = html
      this.$emit('change', this.editorContent)
    }
    this.editor.create()
  }
}
</script>

<style lang="less" scoped>
.ant-editor-wang {
  .editor-wrapper {
    text-align: left;
  }
}
</style>
