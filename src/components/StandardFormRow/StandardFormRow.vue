<template>
  <div :class="[prefixCls, lastCls, blockCls, gridCls]">
    <div v-if="title" class="antd-pro-components-standard-form-row-index-label">
      <span>{{ title }}</span>
    </div>
    <div class="antd-pro-components-standard-form-row-index-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

const classes = [
  'antd-pro-components-standard-form-row-index-standardFormRowBlock',
  'antd-pro-components-standard-form-row-index-standardFormRowGrid',
  'antd-pro-components-standard-form-row-index-standardFormRowLast'
]

@Component({
  name: 'StandardFormRow',
  components: {}
})
export default class StandardFormRowComponent extends Vue {
  // props
  @Prop({ type: String, default: 'antd-pro-components-standard-form-row-index-standardFormRow' })
  private prefixCls!: string
  @Prop({ type: String, default: undefined })
  private title!: string
  @Prop({ type: Boolean })
  private last!: boolean
  @Prop({ type: Boolean })
  private block!: boolean
  @Prop({ type: Boolean })
  private grid!: boolean

  constructor() {
    super()
  }

  // computed
  public get lastCls() {
    return this.last ? classes[2] : null
  }

  public get blockCls() {
    return this.block ? classes[0] : null
  }

  public get gridCls() {
    return this.grid ? classes[1] : null
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';

.antd-pro-components-standard-form-row-index-standardFormRow {
  display: flex;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px dashed @border-color-split;

  /deep/ .ant-form-item {
    margin-right: 24px;
  }
  /deep/ .ant-form-item-label label {
    margin-right: 0;
    color: @text-color;
  }
  /deep/ .ant-form-item-label,
  .ant-form-item-control {
    padding: 0;
    line-height: 32px;
  }

  .antd-pro-components-standard-form-row-index-label {
    flex: 0 0 auto;
    margin-right: 24px;
    color: @heading-color;
    font-size: @font-size-base;
    text-align: right;
    & > span {
      display: inline-block;
      height: 32px;
      line-height: 32px;
      &::after {
        content: '：';
      }
    }
  }

  .antd-pro-components-standard-form-row-index-content {
    flex: 1 1 0;
    /deep/ .ant-form-item:last-child {
      margin-right: 0;
    }
  }

  &.antd-pro-components-standard-form-row-index-standardFormRowLast {
    margin-bottom: 0;
    padding-bottom: 0;
    border: none;
  }

  &.antd-pro-components-standard-form-row-index-standardFormRowBlock {
    /deep/ .ant-form-item,
    div.ant-form-item-control-wrapper {
      display: block;
    }
  }

  &.antd-pro-components-standard-form-row-index-standardFormRowGrid {
    /deep/ .ant-form-item,
    div.ant-form-item-control-wrapper {
      display: block;
    }
    /deep/ .ant-form-item-label {
      float: left;
    }
  }
}
</style>
