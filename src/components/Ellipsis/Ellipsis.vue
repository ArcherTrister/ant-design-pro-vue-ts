<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Tooltip from 'ant-design-vue/es/tooltip'
import { cutStrByFullLength, getStrFullLength } from '@/utils/util'
/*
    const isSupportLineClamp = document.body.style.webkitLineClamp !== undefined;

    const TooltipOverlayStyle = {
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
    };
  */

@Component({
  name: 'Ellipsis',
  components: {
    Tooltip
  }
})
export default class EllipsisComponent extends Vue {
  // props
  @Prop({ type: String, default: 'ant-pro-ellipsis' })
  private prefixCls!: string
  @Prop({ type: Boolean })
  private tooltip!: boolean
  @Prop({ type: Number, required: true })
  private length!: number

  @Prop({ type: Number, default: 1 })
  private lines!: number
  @Prop({ type: Boolean, default: false })
  private fullWidthRecognition!: boolean

  constructor() {
    super()
  }

  // methods
  getStrDom(str: string, fullLength: number) {
    return <span>{cutStrByFullLength(str, this.length) + (fullLength > this.length ? '...' : '')}</span>
  }

  getTooltip(fullStr: string, fullLength: number) {
    return (
      <Tooltip>
        <template slot="title">{fullStr}</template>
        {this.getStrDom(fullStr, fullLength)}
      </Tooltip>
    )
  }

  render() {
    const { tooltip, length } = this.$props
    const str = (this.$slots as any).default.map((vNode: any) => vNode.text).join('')
    const fullLength = getStrFullLength(str)
    const strDom = tooltip && fullLength > length ? this.getTooltip(str, fullLength) : this.getStrDom(str, fullLength)
    return strDom
  }
}
</script>
