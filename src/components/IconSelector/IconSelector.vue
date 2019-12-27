<template>
  <div :class="prefixCls">
    <a-tabs v-model="currentTab" @change="handleTabChange">
      <a-tab-pane v-for="v in icons" :tab="v.title" :key="v.key">
        <ul>
          <li
            v-for="(icon, key) in v.icons"
            :key="`${v.key}-${key}`"
            :class="{ active: selectedIcon == icon }"
            @click="handleSelectedIcon(icon)"
          >
            <a-icon :type="icon" :style="{ fontSize: '36px' }" />
          </li>
        </ul>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import icons from './icons'

@Component({
  name: 'IconSelect',
  components: {}
})
export default class IconSelectComponent extends Vue {
  // props
  @Prop({ type: String, default: 'ant-pro-icon-selector' })
  private prefixCls!: string
  @Prop({ type: String })
  private value!: string

  private selectedIcon: string = ''
  private currentTab: string = 'directional'
  private icons: any[] = icons

  constructor() {
    super()
  }

  // watch
  @Watch('value')
  valueChange(val: any) {
    this.selectedIcon = val
    this.autoSwitchTab()
  }

  created() {
    this.selectedIcon = this.value || ''
    if (this.value) {
      this.autoSwitchTab()
    }
  }

  // methods
  handleSelectedIcon(icon: any) {
    this.selectedIcon = icon
    this.$emit('change', icon)
  }
  handleTabChange(activeKey: any) {
    this.currentTab = activeKey
  }
  autoSwitchTab() {
    icons.some(item => item.icons.some(icon => icon === this.value) && (this.currentTab = item.key))
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';

ul {
  list-style: none;
  padding: 0;
  overflow-y: scroll;
  height: 250px;

  li {
    display: inline-block;
    padding: @padding-sm;
    margin: 3px 0;
    border-radius: @border-radius-base;

    &:hover,
    &.active {
      // box-shadow: 0px 0px 5px 2px @primary-color;
      cursor: pointer;
      color: @white;
      background-color: @primary-color;
    }
  }
}
</style>
