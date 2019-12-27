<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <h4 :style="{ marginBottom: '20px' }">
      {{ title }}
    </h4>
    <v-chart height="254" :data="data" :force-fit="true" :padding="['auto', 'auto', '40', '50']">
      <v-tooltip />
      <v-axis />
      <v-bar position="x*y" />
    </v-chart>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'Bar',
  components: {}
})
export default class BarComponent extends Vue {
  // props
  @Prop({
    type: String,
    default: ''
  })
  private title!: string
  @Prop({
    type: Array,
    default: () => {
      return []
    }
  })
  private data!: any[]
  @Prop({
    type: Array,
    default: () => {
      return [
        {
          dataKey: 'x',
          min: 2
        },
        {
          dataKey: 'y',
          title: '时间',
          min: 1,
          max: 22
        }
      ]
    }
  })
  private scale!: any[]
  @Prop({
    type: Array,
    default: () => {
      return [
        'x*y',
        (x: any, y: any) => ({
          name: x,
          value: y
        })
      ]
    }
  })
  private tooltip!: any[]

  constructor() {
    super()
  }
}
</script>
