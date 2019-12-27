<template>
  <div :class="prefixCls">
    <div style="float: left">
      <slot name="extra">
        {{ extra }}
      </slot>
    </div>
    <div style="float: right">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'FooterToolBar',
  components: {}
})
export default class FooterToolBarComponent extends Vue {
  // props
  @Prop({ type: String, default: 'ant-pro-footer-toolbar' })
  private prefixCls!: string
  @Prop({ type: [String, Object], default: '' })
  private extra!: any

  constructor() {
    super()
  }
}
</script>

<style lang="less" scoped></style>
