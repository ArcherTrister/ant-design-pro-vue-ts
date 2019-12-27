<template>
  <exception-page type="404" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ExceptionPage } from '@/components'

@Component({
  name: 'NotFound',
  components: {
    ExceptionPage
  }
})
export default class NotFound extends Vue {
  constructor() {
    super()
  }
}
</script>
<style scoped></style>
