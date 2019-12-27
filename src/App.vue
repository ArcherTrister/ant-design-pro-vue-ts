<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script lang="ts">
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

import { Component, Prop } from 'vue-property-decorator'
import AppDeviceEnquire from '@/shared/mixins/app-device-enquire'

@Component({
  components: {}
})
export default class App extends AppDeviceEnquire {
  @Prop({ type: Number, default: 0 })
  private height!: number
  @Prop({ type: Number, default: 0 })
  private width!: number

  private locale: any = zhCN

  constructor() {
    super()
  }

  mounted() {}
}
</script>
<style>
#app {
  height: 100%;
}
</style>
