<script lang="tsx">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { Col } from 'ant-design-vue'

const responsive: any = {
  1: { xs: 24 },
  2: { xs: 24, sm: 12 },
  3: { xs: 24, sm: 12, md: 8 },
  4: { xs: 24, sm: 12, md: 6 }
}

@Component({
  name: 'DescriptionListItem',
  components: {
    Col
  }
})
export default class DescriptionListItemComponent extends Vue {
  @Prop({ type: String, default: '', required: false })
  public term!: string

  @Inject()
  public readonly colNumber!: number

  constructor() {
    super()
  }

  render() {
    return (
      <Col {...{ props: responsive[this.colNumber] }}>
        <div class="term">{this.term}</div>
        <div class="content">{this.$slots.default}</div>
      </Col>
    )
  }
}
</script>

<style scoped></style>
