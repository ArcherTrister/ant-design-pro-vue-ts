import { Component, Vue, Prop } from 'vue-property-decorator'
import { Spin } from 'ant-design-vue'

@Component({
  name: 'PageLoading',
  components: { Spin }
})
export default class PageLoadingComponent extends Vue {
  // props
  @Prop({ type: String, default: 'Loading..' })
  private tip!: string
  @Prop({ type: String, default: 'large' })
  private size!: string

  constructor() {
    super()
  }

  render() {
    const style = {
      textAlign: 'center',
      background: 'rgba(0,0,0,0.6)',
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1100
    }
    const spinStyle = {
      position: 'absolute',
      left: '50%',
      top: '40%',
      transform: 'translate(-50%, -50%)'
    }
    return (
      <div style={style}>
        <Spin size={this.size} style={spinStyle} tip={this.tip} />
      </div>
    )
  }
}
