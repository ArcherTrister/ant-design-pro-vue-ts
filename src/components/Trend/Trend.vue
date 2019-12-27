<template>
  <div :class="[prefixCls, reverseColor && 'reverse-color']">
    <span>
      <slot name="term" />
      <span class="item-text">
        <slot />
      </span>
    </span>
    <span :class="[flag]"><a-icon :type="`caret-${flag}`"/></span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'Trend', components: {} })
export default class TrendComponent extends Vue {
  // props
  @Prop({ type: String, default: 'ant-pro-trend' })
  private prefixCls!: string
  /**
   * 上升下降标识：up|down
   */
  @Prop({ type: String, required: true })
  private flag!: string
  /**
   * 颜色反转
   */
  @Prop({ type: Boolean, default: false })
  private reverseColor!: boolean
}
</script>

<style lang="less" scoped>
@import 'index';
</style>
