import Vue from 'vue'
import PropTypes from 'ant-design-vue/es/_util/vue-types'
import TagSelectOption from './TagSelectOption'
import { filterEmpty } from '@/utils/util'

export default Vue.extend({
  components: { TagSelectOption },
  name: 'TagSelect',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-tag-select'
    },
    defaultValue: {
      type: PropTypes.array,
      default: null
    },
    value: {
      type: PropTypes.array,
      default: null
    },
    expandable: {
      type: Boolean,
      default: false
    },
    hideCheckAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expand: false,
      localCheckAll: false,
      items: new Array<any>(), // this.getItemsKey(filterEmpty(this.$slots.default)),
      val: this.value || this.defaultValue || []
    }
  },
  created() {
    this.items = this.getItemsKey(filterEmpty(this.$slots.default))
  },
  methods: {
    onChange(checked: any) {
      const key: any = Object.keys(this.items).filter(key => key === checked.value)
      this.items[key] = checked.checked
      const bool = Object.values(this.items).lastIndexOf(false)
      if (bool === -1) {
        this.localCheckAll = true
      } else {
        this.localCheckAll = false
      }
    },
    onCheckAll(checked: any) {
      console.log(checked)
      Object.keys(this.items).forEach((v: any) => {
        this.items[v] = checked.checked
      })
      this.localCheckAll = checked.checked
    },
    getItemsKey(items: any[]) {
      const totalItem: any = {}
      items.forEach(item => {
        totalItem[item.componentOptions.propsData && item.componentOptions.propsData.value] = false
      })
      return totalItem
    },
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
    },
    // expandable
    renderExpandable() {},
    // render option
    renderTags(items: any[]) {
      const listeners = {
        change: (checked: any) => {
          this.onChange(checked)
          this.$emit('change', checked)
        }
      }

      return items.map(vnode => {
        // const options = vnode.componentOptions
        // options.listeners = listeners
        // return vnode
        if (!vnode.componentOptions) {
          vnode.componentOptions = {}
        }
        vnode.componentOptions.listeners = listeners
        return vnode
      })
    }
  },
  render(h) {
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
})
