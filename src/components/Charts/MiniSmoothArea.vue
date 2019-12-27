<template>
  <div :class="prefixCls">
    <div class="chart-wrapper" :style="{ height: 46 }">
      <v-chart :force-fit="true" :height="100" :data="dataSource" :scale="scale" :padding="[36, 0, 18, 0]">
        <v-tooltip />
        <v-smooth-line position="x*y" :size="2" />
        <v-smooth-area position="x*y" />
      </v-chart>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'MiniSmoothArea',
  components: {}
})
export default class MiniSmoothAreaComponent extends Vue {
  // props
  @Prop({
    type: String,
    default: 'ant-pro-smooth-area'
  })
  private prefixCls!: string
  @Prop({
    type: [Object, Array],
    required: true
  })
  private scale: any
  @Prop({
    type: Array,
    required: true
  })
  private dataSource!: any[]

  // data
  private height: number = 100

  constructor() {
    super()
  }
}
</script>

<style lang="less" scoped>
@import 'smooth.area.less';
</style>
