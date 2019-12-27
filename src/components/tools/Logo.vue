<template>
  <div class="logo">
    <router-link :to="{ name: 'dashboard' }">
      <LogoSvg alt="logo" />
      <h1 v-if="showTitle">
        {{ title }}
      </h1>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import LogoSvg from '@/assets/logo.svg?inline'

@Component({
  name: 'Logo',
  components: { LogoSvg }
})
export default class LogoComponent extends Vue {
  @Prop({ type: String, default: 'Ant Design Pro', required: false })
  private title!: string
  @Prop({ type: Boolean, default: true, required: false })
  private showTitle!: string

  constructor() {
    super()
  }
}
</script>
