<template>
  <div :class="[prefixCls]">
    <slot name="subtitle">
      <div :class="[`${prefixCls}-subtitle`]">
        {{ typeof subTitle === 'string' ? subTitle : subTitle() }}
      </div>
    </slot>
    <div class="number-info-value">
      <span>{{ total }}</span>
      <span class="sub-total">
        {{ subTotal }}
        <icon :type="`caret-${status}`" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Icon from 'ant-design-vue/es/icon'

@Component({
  name: 'NumberInfo',
  components: {
    Icon
  }
})
export default class NumberInfoComponent extends Vue {
  // props
  @Prop({ type: String, default: 'ant-pro-number-info' })
  private prefixCls!: string
  @Prop({ type: Number, required: true })
  private total!: number
  @Prop({ type: Number, required: true })
  private subTotal!: number
  @Prop({ type: [String, Function], default: '' })
  private subTitle!: number
  @Prop({ type: String, default: 'up' })
  private status!: string

  constructor() {
    super()
  }
}
</script>

<style lang="less" scoped>
@import 'index';
</style>
