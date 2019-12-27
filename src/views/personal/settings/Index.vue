<template>
  <div class="page-header-index-wide">
    <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
      <div class="personal-settings-info-main" :class="device">
        <div class="personal-settings-info-left">
          <a-menu
            :mode="device == 'mobile' ? 'horizontal' : 'inline'"
            :style="{
              border: '0',
              width: device == 'mobile' ? '560px' : 'auto'
            }"
            :selected-keys="selectedKeys"
            type="inner"
            @openChange="onOpenChange"
          >
            <a-menu-item key="/personal/settings/base">
              <router-link :to="{ name: 'BaseSettings' }">
                基本设置
              </router-link>
            </a-menu-item>
            <a-menu-item key="/personal/settings/security">
              <router-link :to="{ name: 'SecuritySettings' }">
                安全设置
              </router-link>
            </a-menu-item>
            <a-menu-item key="/personal/settings/custom">
              <router-link :to="{ name: 'CustomSettings' }">
                个性化
              </router-link>
            </a-menu-item>
            <a-menu-item key="/personal/settings/binding">
              <router-link :to="{ name: 'BindingSettings' }">
                账户绑定
              </router-link>
            </a-menu-item>
            <a-menu-item key="/personal/settings/notification">
              <router-link :to="{ name: 'NotificationSettings' }">
                新消息通知
              </router-link>
            </a-menu-item>
          </a-menu>
        </div>
        <div class="personal-settings-info-right">
          <div class="personal-settings-info-title">
            <span>{{ $route.meta.title }}</span>
          </div>
          <route-view />
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { PageView, RouteView } from '@/layouts'
import MixinDevice from '@/shared/mixins/mixin-device'
import { SettingOption } from '@/interfaces/service-interface'

@Component({
  components: {
    RouteView
    // PageView
  }
})
export default class SettingIndex extends MixinDevice {
  // horizontal  inline
  private mode: string = 'inline'
  private openKeys: any[] = []
  private selectedKeys: any[] = []
  // cropper
  private preview: object = {}
  private option: SettingOption = {
    img: '/avatar2.jpg',
    info: true,
    size: 1,
    outputType: 'jpeg',
    canScale: false,
    autoCrop: true,
    // 只有自动截图开启 宽度高度才生效
    autoCropWidth: 180,
    autoCropHeight: 180,
    fixedBox: true,
    // 开启宽度和高度比例
    fixed: true,
    fixedNumber: [1, 1]
  }
  private pageTitle: string = ''

  constructor() {
    super()
  }

  created() {
    this.updateMenu()
  }

  // methods
  onOpenChange(openKeys: any) {
    this.openKeys = openKeys
  }
  updateMenu() {
    const routes = this.$route.matched.concat()
    const route = routes.pop()
    if (route) {
      this.selectedKeys = [route.path]
    }
    this.selectedKeys = []
    // this.selectedKeys = [routes.pop()?.path];
    //this.selectedKeys = [routes.pop().path]
  }

  @Watch('$route')
  routeChanged(val: any) {
    this.updateMenu()
  }
}
</script>

<style lang="less" scoped>
.personal-settings-info-main {
  width: 100%;
  display: flex;
  height: 100%;
  overflow: auto;

  &.mobile {
    display: block;

    .personal-settings-info-left {
      border-right: unset;
      border-bottom: 1px solid #e8e8e8;
      width: 100%;
      height: 50px;
      overflow-x: auto;
      overflow-y: scroll;
    }
    .personal-settings-info-right {
      padding: 20px 40px;
    }
  }

  .personal-settings-info-left {
    border-right: 1px solid #e8e8e8;
    width: 224px;
  }

  .personal-settings-info-right {
    flex: 1 1;
    padding: 8px 40px;

    .personal-settings-info-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      margin-bottom: 12px;
    }
    .personal-settings-info-view {
      padding-top: 12px;
    }
  }
}
</style>
