<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <h4 :style="{ marginBottom: '20px' }">
      {{ title }}
    </h4>
    <v-chart height="254" :data="data" :scale="scale" :force-fit="true" :padding="['auto', 'auto', '40', '50']">
      <v-tooltip />
      <v-axis />
      <v-bar position="x*y" />
    </v-chart>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'TransferBar',
  components: {}
})
export default class TransferBarComponent extends Vue {
  // props
  @Prop({
    type: String,
    default: ''
  })
  private title!: string

  // data
  private data: any[] = []
  private scale: any[] = []
  private tooltip: any[] = []

  constructor() {
    super()
  }

  beforeMount() {
    this.tooltip = [
      'x*y',
      (x: any, y: any) => ({
        name: x,
        value: y
      })
    ]
    this.scale = [
      {
        dataKey: 'x',
        title: '日期(天)',
        alias: '日期(天)',
        min: 2
      },
      {
        dataKey: 'y',
        title: '流量(Gb)',
        alias: '流量(Gb)',
        min: 1
      }
    ]
  }

  created() {
    this.getMonthBar()
  }

  // methods
  getMonthBar() {
    this.$http.get('/analysis/month-bar').then((res: any) => {
      this.data = res.result
    })
  }
}
</script>
