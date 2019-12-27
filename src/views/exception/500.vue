<template>
  <exception-page type="500" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ExceptionPage } from '@/components'

@Component({
  name: 'InternalServerError',
  components: {
    ExceptionPage
  }
})
export default class InternalServerError extends Vue {
  constructor() {
    super()
  }
}
</script>

<style scoped></style>
