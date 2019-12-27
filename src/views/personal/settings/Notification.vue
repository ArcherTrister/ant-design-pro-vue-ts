<template>
  <a-list item-layout="horizontal" :dataSource="data" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Notification',
  components: {}
})
export default class Notification extends Vue {
  // data
  private data: any[] = []

  constructor() {
    super()
  }
}
</script>

<style scoped></style>
