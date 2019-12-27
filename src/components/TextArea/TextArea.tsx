import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import './style.less'
import { getStrFullLength, cutStrByFullLength } from '@/utils/util'
import Input from 'ant-design-vue/es/input'
const TextArea = Input.TextArea

@Component({
  name: 'LimitTextArea',
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {}
})
export default class LimitTextAreaComponent extends Vue {
  // props
  @Prop({
    type: String,
    default: 'ant-textarea-limit'
  })
  private prefixCls!: string
  @Prop({
    type: String
  })
  private value!: string
  @Prop({
    type: Number,
    default: 200
  })
  private limit!: number

  // data
  private currentLimit: number = 0

  constructor() {
    super()
  }

  // watch
  @Watch('value')
  valueChange(val: string) {
    this.calcLimitNum(val)
  }

  created() {
    this.calcLimitNum(this.value)
  }
  // methods
  handleChange(e: any) {
    const value = e.target.value
    const len = getStrFullLength(value)
    if (len <= this.limit) {
      this.currentLimit = len
      this.$emit('change', value)
      return
    } else {
      const str = cutStrByFullLength(value, this.limit)
      this.currentLimit = getStrFullLength(str)
      this.$emit('change', str)
    }
    console.error('limit out! currentLimit:', this.currentLimit)
  }
  calcLimitNum(val: string) {
    const len = getStrFullLength(val)
    this.currentLimit = len
  }

  render() {
    const { prefixCls, ...props } = this.$props
    return (
      <div class={this.prefixCls}>
        <TextArea {...{ props }} value={this.value} onChange={this.handleChange}></TextArea>
        <span class="limit">
          {this.currentLimit}/{this.limit}
        </span>
      </div>
    )
  }
}
