<template>
  <transition name="showHeader">
    <div v-if="visible" class="header-animat">
      <a-layout-header
        v-if="visible"
        :class="[
          fixedHeader && 'ant-header-fixedHeader',
          sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed'
        ]"
        :style="{ padding: '0' }"
      >
        <div v-if="mode === 'sidemenu'" class="header">
          <a-icon
            v-if="device === 'mobile'"
            class="trigger"
            :type="collapsed ? 'menu-fold' : 'menu-unfold'"
            @click="toggle"
          />
          <a-icon v-else class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle" />
          <user-menu />
        </div>
        <div v-else :class="['top-nav-header-index', theme]">
          <div class="header-index-wide">
            <div class="header-index-left">
              <logo class="top-nav-header" :show-title="device !== 'mobile'" />
              <s-menu v-if="device !== 'mobile'" mode="horizontal" :menu="menus" :theme="theme" />
              <a-icon v-else class="trigger" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="toggle" />
            </div>
            <user-menu class="header-index-right" />
          </div>
        </div>
      </a-layout-header>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import UserMenu from '../tools/UserMenu.vue'
import SMenu from '../Menu/'
import Logo from '../tools/Logo.vue'
import Mixin from '@/shared/mixins/mixin'

@Component({
  name: 'GlobalHeader',
  components: {
    UserMenu,
    SMenu,
    Logo
  }
})
export default class GlobalHeaderComponent extends Mixin {
  @Prop({ type: String, default: 'sidemenu' }) // sidemenu, topmenu
  private mode!: string
  @Prop({ type: Array, required: true })
  private menus!: any[]
  @Prop({ type: String, required: false, default: 'dark' })
  private theme!: string
  @Prop({ type: Boolean, required: false, default: false })
  private collapsed!: boolean
  @Prop({ type: String, required: false, default: 'desktop' })
  private device!: string

  // data
  private visible: boolean = true
  private oldScrollTop: number = 0
  private ticking: boolean = false

  constructor() {
    super()
  }

  // lifecycle
  mounted() {
    document.addEventListener('scroll', this.handleScroll, { passive: true })
  }

  // methods
  handleScroll() {
    if (!this.autoHideHeader) {
      return
    }

    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.visible = true
        } else if (scrollTop > 300 && this.visible) {
          this.visible = false
        } else if (scrollTop < 300 && !this.visible) {
          this.visible = true
        }
        this.oldScrollTop = scrollTop
        this.ticking = false
      })
    }
  }
  toggle() {
    this.$emit('toggle')
  }

  beforeDestroy() {
    document.body.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style lang="less">
@import '../index.less';

.header-animat {
  position: relative;
  z-index: @ant-global-header-zindex;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter,
.showHeader-leave-to {
  opacity: 0;
}
</style>
