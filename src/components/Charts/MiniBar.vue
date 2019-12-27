<template>
  <div class="antv-chart-mini">
    <div class="chart-wrapper" :style="{ height: 46 }">
      <v-chart :force-fit="true" :height="height" :data="data" :padding="[36, 5, 18, 5]">
        <v-tooltip />
        <v-bar position="x*y" />
      </v-chart>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import moment from 'moment'

const beginDay = new Date().getTime()

@Component({
  name: 'MiniBar',
  components: {}
})
export default class MiniBarComponent extends Vue {
  // data
  private data: any[] = []
  private tooltip: any[] = []
  private scale: any[] = []
  private height: number = 100

  constructor() {
    super()
  }

  beforeMount() {
    for (let i = 0; i < 10; i++) {
      this.data.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: Math.round(Math.random() * 10)
      })
    }

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
        min: 2
      },
      {
        dataKey: 'y',
        title: '时间',
        min: 1,
        max: 30
      }
    ]
  }
}
</script>

<style lang="less" scoped>
@import 'chart';
</style>
