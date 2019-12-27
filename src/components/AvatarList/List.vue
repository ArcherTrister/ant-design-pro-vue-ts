<!--
<template>
  <div :class="[prefixCls]">
    <ul>
      <slot></slot>
      <template v-for="item in filterEmpty($slots.default).slice(0, 3)"></template>

      <template v-if="maxLength > 0 && filterEmpty($slots.default).length > maxLength">
        <avatar-item :size="size">
          <avatar :size="size !== 'mini' && size || 20" :style="excessItemsStyle">{{ `+${maxLength}` }}</avatar>
        </avatar-item>
      </template>
    </ul>
  </div>
</template>
-->

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Avatar from 'ant-design-vue/es/avatar'
import AvatarItem from './Item.vue'
import { filterEmpty } from '@/utils/util'

@Component({
  name: 'AvatarList',
  components: {
    Avatar,
    AvatarItem
  }
})
export default class AvatarListComponent extends Vue {
  // props
  @Prop({
    type: String,
    default: 'ant-pro-avatar-list'
  })
  private prefixCls!: string
  /**
   * 头像大小 类型: large、small 、mini, default
   * 默认值: default
   */
  @Prop({
    type: [String, Number],
    default: 'default'
  })
  private size!: [string, number]
  /**
   * 要显示的最大项目
   */
  @Prop({
    type: Number,
    default: 0
  })
  private maxLength!: number
  /**
   * 多余的项目风格
   */
  @Prop({
    type: Object,
    default: () => {
      return {
        color: '#f56a00',
        backgroundColor: '#fde3cf'
      }
    }
  })

  // data
  private excessItemsStyle!: Object

  constructor() {
    super()
  }

  // methods
  private getItems(items: any[]) {
    const classString = {
      [`${this.prefixCls}-item`]: true,
      [`${this.size}`]: true
    }

    if (this.maxLength > 0) {
      items = items.slice(0, this.maxLength)
      items.push(<Avatar size={this.size} style={this.excessItemsStyle}>{`+${this.maxLength}`}</Avatar>)
    }
    const itemList = items.map((item: any) => {
      return <li class={classString}>{item}</li>
    })
    return itemList
  }

  render() {
    const { prefixCls, size } = this.$props
    const classString = {
      [`${prefixCls}`]: true,
      [`${size}`]: true
    }
    const items = filterEmpty(this.$slots.default)
    const itemsDom = items && items.length ? <ul class={`${prefixCls}-items`}>{this.getItems(items)}</ul> : null

    return <div class={classString}>{itemsDom}</div>
  }
}
</script>
