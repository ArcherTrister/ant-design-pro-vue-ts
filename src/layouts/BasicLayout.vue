<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :wrap-class-name="`drawer-sider ${navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
    >
      <side-menu
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="false"
        :collapsible="true"
        @menuSelect="menuSelect"
      />
    </a-drawer>

    <side-menu
      v-else-if="isSideMenu()"
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :collapsible="true"
    />

    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }"
    >
      <!-- layout header -->
      <global-header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />

      <!-- layout content -->
      <a-layout-content
        :style="{
          height: '100%',
          margin: '24px 24px 0',
          paddingTop: fixedHeader ? '64px' : '0'
        }"
      >
        <multi-tab v-if="multiTab" />
        <transition name="page-transition">
          <route-view />
        </transition>
      </a-layout-content>

      <!-- layout footer -->
      <a-layout-footer>
        <global-footer />
      </a-layout-footer>

      <!-- Setting Drawer (show in development mode) -->
      <setting-drawer v-if="!production" />
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { triggerWindowResizeEvent } from '@/utils/util'
import MixinDevice from '@/shared/mixins/mixin-device'
import config from '@/configs/defaultSettings'
import RouteView from './RouteView.vue'
import SideMenu from '@/components/Menu/SideMenu.vue'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalFooter from '@/components/GlobalFooter'
import SettingDrawer from '@/components/SettingDrawer'

@Component({
  components: { RouteView, SideMenu, GlobalHeader, GlobalFooter, SettingDrawer }
})
export default class BasicLayoutComponent extends MixinDevice {
  // data
  private production: boolean = config.production
  private collapsed: boolean = false
  private menus: any[] = []

  constructor() {
    super()
  }

  // computed
  get contentPaddingLeft() {
    if (!this.fixSiderbar || this.isMobile()) {
      return '0'
    }
    if (this.sidebarOpened) {
      return '256px'
    }
    return '80px'
  }

  @State(state => state.permission.addRouters)
  mainMenu!: any[]

  @Watch('sidebarOpened')
  sidebarOpenedChanged(val: boolean) {
    this.collapsed = !val
  }

  // Lifecycle
  created() {
    this.menus = this.mainMenu.find(item => item.path === '/').children
    this.collapsed = !this.sidebarOpened
  }

  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  }

  // methods
  toggle() {
    this.collapsed = !this.collapsed
    this.setSidebar(!this.collapsed)
    triggerWindowResizeEvent()
  }
  paddingCalc() {
    let left = ''
    if (this.sidebarOpened) {
      left = this.isDesktop() ? '256px' : '80px'
    } else {
      left = (this.isMobile() && '0') || (this.fixSiderbar && '80px') || '0'
    }
    return left
  }
  menuSelect() {}
  drawerClose() {
    this.collapsed = false
  }
}
</script>

<style lang="less">
/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
