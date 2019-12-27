<template>
  <div>
    <v-chart :force-fit="true" :height="height" :width="width" :data="data" :scale="scale" :padding="0">
      <v-tooltip />
      <v-interval
        :shape="['liquid-fill-gauge']"
        position="transfer*value"
        color=""
        :v-style="{
          lineWidth: 10,
          opacity: 0.75
        }"
        :tooltip="[
          'transfer*value',
          (transfer, value) => {
            return {
              name: transfer,
              value
            }
          }
        ]"
      />
      <v-guide
        v-for="(row, index) in data"
        :key="index"
        type="text"
        :top="true"
        :position="{
          gender: row.transfer,
          value: 45
        }"
        :content="row.value + '%'"
        :v-style="{
          fontSize: 100,
          textAlign: 'center',
          opacity: 0.75
        }"
      />
    </v-chart>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'Liquid',
  components: {}
})
export default class LiquidComponent extends Vue {
  // props
  @Prop({
    type: Number,
    default: 0
  })
  private height!: number
  @Prop({
    type: Number,
    default: 0
  })
  private width!: number

  constructor() {
    super()
  }
}
</script>

<style scoped></style>
