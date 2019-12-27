<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { colorList } from '@/components/SettingDrawer/settingConfig'
import ASwitch from 'ant-design-vue/es/switch'
import AList from 'ant-design-vue/es/list'
import AListItem from 'ant-design-vue/es/list/Item'
import MixinDevice from '@/shared/mixins/mixin-device'

const Meta = AListItem.Meta

@Component({
  filters: {
    themeFilter(theme: string | number) {
      const themeMap: any = {
        dark: '暗色',
        light: '白色'
      }
      return themeMap[theme]
    }
  },
  components: {
    AListItem,
    AList,
    ASwitch,
    Meta
  }
})
export default class Custom extends MixinDevice {
  constructor() {
    super()
  }

  // methods
  colorFilter(color: string) {
    const c = colorList.find(o => o.color === color)
    return c && c.key
  }

  onChange(checked: any) {
    if (checked) {
      this.$store.dispatch('app/ToggleTheme', 'dark')
    } else {
      this.$store.dispatch('app/ToggleTheme', 'light')
    }
  }

  render() {
    return (
      <AList itemLayout="horizontal">
        <AListItem>
          <Meta>
            <a slot="title">风格配色</a>
            <span slot="description">整体风格配色设置</span>
          </Meta>
          <div slot="actions">
            <ASwitch
              checkedChildren="暗色"
              unCheckedChildren="白色"
              defaultChecked={(this.navTheme === 'dark' && true) || false}
              onChange={this.onChange}
            />
          </div>
        </AListItem>
        <AListItem>
          <Meta>
            <a slot="title">主题色</a>
            <span slot="description">
              页面风格配色： <a domPropsInnerHTML={this.colorFilter(this.primaryColor)} />
            </span>
          </Meta>
        </AListItem>
      </AList>
    )
  }
}
</script>

<style scoped></style>
