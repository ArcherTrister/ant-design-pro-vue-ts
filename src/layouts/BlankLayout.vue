<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class BlankLayoutComponent extends Vue {
  constructor() {
    super()
  }
}
</script>

<style scoped></style>
