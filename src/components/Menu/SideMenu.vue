<template>
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null]"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null"
  >
    <logo />
    <s-menu
      :collapsed="collapsed"
      :menu="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      style="padding: 16px 0px;"
    />
  </a-layout-sider>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit, Provide, Inject } from 'vue-property-decorator'
import Logo from '@/components/tools/Logo.vue'
import SMenu from './index'
import MixinDevice from '@/shared/mixins/mixin-device'

@Component({
  name: 'SideMenu',
  components: {
    Logo,
    SMenu
  }
})
export default class SideMenuComponent extends MixinDevice {
  @Prop({ type: String, default: 'inline', required: false })
  private mode!: string
  @Prop({ type: String, default: 'dark', required: false })
  private theme!: string
  @Prop({ type: Boolean, default: false, required: false })
  private collapsible!: boolean
  @Prop({ type: Boolean, default: false, required: false })
  private collapsed!: boolean
  @Prop({ type: Array, required: true })
  private menus!: any[]

  constructor() {
    super()
  }

  @Emit('menuSelect')
  onSelect(obj: any) {
    // this.$emit('menuSelect', obj)
  }
}
</script>
