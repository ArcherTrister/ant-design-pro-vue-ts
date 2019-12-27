import { Component, Model, Prop, Vue } from 'vue-property-decorator'
import PropTypes from 'ant-design-vue/es/_util/vue-types'
import TagSelectOption from './TagSelectOption'
import { filterEmpty } from '@/utils/util'

@Component({
  name: 'TagSelect',
  // model: {
  //   prop: 'checked',
  //   event: 'change'
  // },
  components: { TagSelectOption }
})
export default class TagSelectComponent extends Vue {
  @Model('change', {
    type: Boolean
  })
  public checked!: boolean
  @Prop({ type: String, default: 'ant-pro-tag-select' })
  private prefixCls!: string
  @Prop({ type: PropTypes.array, default: null })
  private defaultValue: any
  @Prop({ type: PropTypes.array, default: null })
  private value: any
  @Prop({ type: Boolean, default: false })
  private expandable!: boolean
  @Prop({ type: Boolean, default: false })
  private hideCheckAll!: boolean

  private expand: boolean = false
  private localCheckAll: boolean = false
  private items: any[] = this.getItemsKey(filterEmpty(this.$slots.default))
  private val: any = this.value || this.defaultValue || []

  constructor() {
    super()
  }

  // methods
  onChange(checked: any) {
    const key: any = Object.keys(this.items).filter(key => key === checked.value)
    this.items[key[0]] = checked.checked
    const bool = Object.values(this.items).lastIndexOf(false)
    if (bool === -1) {
      this.localCheckAll = true
    } else {
      this.localCheckAll = false
    }
  }

  onCheckAll(checked: any) {
    console.log(checked)
    Object.keys(this.items).forEach((v: any) => {
      this.items[v] = checked.checked
    })
    this.localCheckAll = checked.checked
  }

  getItemsKey(items: any[]) {
    const totalItem: any = {}
    items.forEach(item => {
      totalItem[item.componentOptions.propsData && item.componentOptions.propsData.value] = false
    })
    return totalItem
  }

  // CheckAll Button
  renderCheckAll() {
    const props = {
      on: {
        change: (checked: any) => {
          this.onCheckAll(checked)
          checked.value = 'total'
          this.$emit('change', checked)
        }
      }
    }
    const checkAllElement = (
      <TagSelectOption key={'total'} checked={this.localCheckAll} {...props}>
        All
      </TagSelectOption>
    )
    return (!this.hideCheckAll && checkAllElement) || null
  }

  // expandable
  renderExpandable() {}
  // render option
  renderTags(items: any[]) {
    const listeners = {
      change: (checked: any) => {
        this.onChange(checked)
        this.$emit('change', checked)
      }
    }

    return items.map((vnode: any) => {
      // const options = vnode.componentOptions
      if (!vnode.componentOptions) {
        vnode.componentOptions = {}
      }
      vnode.componentOptions.listeners = listeners
      return vnode
    })
  }

  render() {
    const {
      $props: { prefixCls }
    } = this

    const classString = {
      [`${prefixCls}`]: true
    }
    const tagItems = filterEmpty(this.$slots.default)
    return (
      <div class={classString}>
        {this.renderCheckAll()}
        {this.renderTags(tagItems)}
      </div>
    )
  }
}
