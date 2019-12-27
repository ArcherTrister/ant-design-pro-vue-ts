<template>
  <div :class="['description-list', size, layout === 'vertical' ? 'vertical' : 'horizontal']">
    <div v-if="title" class="title">{{ title }}</div>
    <a-row>
      <slot></slot>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from 'vue-property-decorator'
import { Col } from 'ant-design-vue'
import DetailListItem from './DetailListItem.vue'
import { VueClass } from 'vue-class-component/lib/declarations'

@Component({
  name: 'DescriptionList',
  components: {
    Col
  }
})
export default class DescriptionListComponent extends Vue {
  @Prop({ type: String, default: '', required: false })
  public title!: string
  @Prop({ type: Number, default: 3, required: false })
  public col!: number
  @Prop({ type: String, default: 'large', required: false })
  public size!: string
  @Prop({ type: String, default: 'horizontal', required: false })
  public layout!: string

  constructor() {
    super()
  }

  @Provide()
  colNumber = this.col
}
</script>

<style lang="less" scoped>
.description-list {
  .title {
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  /deep/ .term {
    color: rgba(0, 0, 0, 0.85);
    display: table-cell;
    line-height: 20px;
    margin-right: 8px;
    padding-bottom: 16px;
    white-space: nowrap;

    &:not(:empty):after {
      content: ':';
      margin: 0 8px 0 2px;
      position: relative;
      top: -0.5px;
    }
  }

  /deep/ .content {
    color: rgba(0, 0, 0, 0.65);
    display: table-cell;
    min-height: 22px;
    line-height: 22px;
    padding-bottom: 16px;
    width: 100%;
    &:empty {
      content: ' ';
      height: 38px;
      padding-bottom: 16px;
    }
  }

  &.small {
    .title {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      font-weight: normal;
      margin-bottom: 12px;
    }
    /deep/ .term,
    .content {
      padding-bottom: 8px;
    }
  }

  &.large {
    /deep/ .term,
    .content {
      padding-bottom: 16px;
    }

    .title {
      font-size: 16px;
    }
  }

  &.vertical {
    .term {
      padding-bottom: 8px;
    }
    /deep/ .term,
    .content {
      display: block;
    }
  }
}
</style>
