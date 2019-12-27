import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Tag } from 'ant-design-vue'
const { CheckableTag } = Tag

@Component({
  name: 'TagSelectOption',
  components: {}
})
export default class TagSelectOptionComponent extends Vue {
  @Prop({ type: String, default: 'ant-pro-tag-select-option' })
  private prefixCls!: string
  @Prop({ type: [String, Number, Object], default: '' })
  private value!: any
  @Prop({ type: Boolean, default: false })
  private checked!: boolean

  private localChecked: boolean = this.checked || false

  constructor() {
    super()
  }

  @Watch('checked')
  checkedChanged(val: boolean) {
    this.localChecked = val
  }

  @Watch('$parent.items', { deep: true })
  parentItemsChanged(val: any) {
    this.value && val.hasOwnProperty(this.value) && (this.localChecked = val[this.value])
  }

  render() {
    const { $slots, value } = this
    const onChange = (checked: any) => {
      this.$emit('change', { value, checked })
    }
    return (
      <CheckableTag key={value} vModel={this.localChecked} onChange={onChange}>
        {$slots.default}
      </CheckableTag>
    )
  }
}
