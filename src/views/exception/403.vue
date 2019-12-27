<template>
  <exception-page type="403" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ExceptionPage } from '@/components'

@Component({
  name: 'Forbidden',
  components: {
    ExceptionPage
  }
})
export default class Forbidden extends Vue {
  constructor() {
    super()
  }
}
</script>

<style scoped></style>
