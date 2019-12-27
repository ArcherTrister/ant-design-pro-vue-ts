<template>
  <v-chart :force-fit="true" height="400" :data="data" :padding="[20, 20, 95, 20]" :scale="scale">
    <v-tooltip />
    <v-axis
      :data-key="axis1Opts.dataKey"
      :line="axis1Opts.line"
      :tick-line="axis1Opts.tickLine"
      :grid="axis1Opts.grid"
    />
    <v-axis
      :data-key="axis2Opts.dataKey"
      :line="axis2Opts.line"
      :tick-line="axis2Opts.tickLine"
      :grid="axis2Opts.grid"
    />
    <v-legend data-key="user" marker="circle" :offset="30" />
    <v-coord type="polar" radius="0.8" />
    <v-line position="item*score" color="user" :size="2" />
    <v-point position="item*score" color="user" :size="4" shape="circle" />
  </v-chart>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'Radar',
  components: {}
})
export default class RadarComponent extends Vue {
  // props
  @Prop({
    type: Array,
    default: null
  })
  private data!: any[]

  // data
  private axis1Opts!: Object
  private axis2Opts!: Object
  private scale!: any[]

  constructor() {
    super()
  }

  // Lifecycle
  beforeMount() {
    this.axis1Opts = {
      dataKey: 'item',
      line: null,
      tickLine: null,
      grid: {
        lineStyle: {
          lineDash: null
        },
        hideFirstLine: false
      }
    }
    this.axis2Opts = {
      dataKey: 'score',
      line: null,
      tickLine: null,
      grid: {
        type: 'polygon',
        lineStyle: {
          lineDash: null
        }
      }
    }

    this.scale = [
      {
        dataKey: 'score',
        min: 0,
        max: 80
      },
      {
        dataKey: 'user',
        alias: '类型'
      }
    ]
  }
}
</script>

<style scoped></style>
