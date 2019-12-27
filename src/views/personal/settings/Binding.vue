<template>
  <a-list item-layout="horizontal" :dataSource="data" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'Binding', components: {} })
export default class Binding extends Vue {
  // data
  private data: any[] = []

  constructor() {
    super()
  }
}
</script>

<style scoped></style>
