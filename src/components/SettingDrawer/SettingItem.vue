<template>
  <div class="setting-drawer-index-item">
    <h3 class="setting-drawer-index-title">
      {{ title }}
    </h3>
    <slot />
    <a-divider v-if="divider" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'SettingItem',
  components: {}
})
export default class SettingItemComponent extends Vue {
  @Prop({ type: String, default: '' })
  public title!: string
  @Prop({ type: Boolean, default: false })
  public divider!: boolean

  constructor() {
    super()
  }
}
</script>

<style lang="less" scoped>
.setting-drawer-index-item {
  margin-bottom: 24px;

  .setting-drawer-index-title {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 22px;
    margin-bottom: 12px;
  }
}
</style>
