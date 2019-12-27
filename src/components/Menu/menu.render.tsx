import Menu from 'ant-design-vue/es/menu'
import Icon from 'ant-design-vue/es/icon'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { RouteRecord } from 'vue-router'
import { CreateElement } from 'vue'

const { Item, SubMenu } = Menu

@Component({
  name: 'SMenu',
  components: {}
})
export default class SMenuComponent extends Vue {
  @Prop({ type: Array, required: true })
  public menu!: any[]
  @Prop({ type: String, default: 'dark', required: false })
  public theme!: string
  @Prop({ type: String, default: 'inline', required: false })
  public mode!: string
  @Prop({ type: Boolean, default: false, required: false })
  public collapsed!: boolean

  public get rootSubmenuKeys() {
    const keys: any[] = []
    this.menu.forEach(item => keys.push(item.path))
    return keys
  }

  public openKeys: any[] = []
  public selectedKeys: any[] = []
  public cachedOpenKeys: any[] = []

  constructor() {
    super()
  }

  created() {
    this.updateMenu()
  }

  @Watch('collapsed')
  collapsedChanged(val: any) {
    if (val) {
      this.cachedOpenKeys = this.openKeys.concat()
      this.openKeys = []
    } else {
      this.openKeys = this.cachedOpenKeys
    }
  }
  @Watch('$route')
  routeChanged(val: any) {
    this.updateMenu()
  }

  renderIcon(h: CreateElement, icon: any) {
    if (icon === 'none' || icon === undefined) {
      return null
    }
    const props: any = {}
    typeof icon === 'object' ? (props.component = icon) : (props.type = icon)
    return h(Icon, { props: { ...props } })
  }
  renderMenuItem(h: CreateElement, menu: any, pIndex: string, index: number) {
    const target = menu.meta.target || null
    return h(Item, { key: menu.path ? menu.path : 'item_' + pIndex + '_' + index }, [
      h('router-link', { attrs: { to: { name: menu.name }, target: target } }, [
        this.renderIcon(h, menu.meta.icon),
        h('span', [menu.meta.title])
      ])
    ])
  }
  renderSubMenu(h: CreateElement, menu: any, pIndex: string, index: number) {
    const this2_ = this
    const subItem = [h('span', { slot: 'title' }, [this.renderIcon(h, menu.meta.icon), h('span', [menu.meta.title])])]
    const itemArr: any[] = []
    const pIndex_ = pIndex + '_' + index
    console.log('menu', menu)
    if (!menu.hideChildrenInMenu) {
      menu.children.forEach(function(item: any, i: number) {
        itemArr.push(this2_.renderItem(h, item, pIndex_, i))
      })
    }
    return h(SubMenu, { key: menu.path ? menu.path : 'submenu_' + pIndex + '_' + index }, subItem.concat(itemArr))
  }
  renderItem(h: CreateElement, menu: any, pIndex: string, index: number) {
    if (!menu.hidden) {
      return menu.children && !menu.hideChildrenInMenu
        ? this.renderSubMenu(h, menu, pIndex, index)
        : this.renderMenuItem(h, menu, pIndex, index)
    }
  }
  renderMenu(h: CreateElement, menuTree: any) {
    const this2_ = this
    const menuArr: any[] = []
    menuTree.forEach(function(menu: any, i: number) {
      if (!menu.hidden) {
        menuArr.push(this2_.renderItem(h, menu, '0', i))
      }
    })
    return menuArr
  }
  onOpenChange(openKeys: any[]) {
    const latestOpenKey = openKeys.find((key: any) => !this.openKeys.includes(key))
    if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
      this.openKeys = openKeys
    } else {
      this.openKeys = latestOpenKey ? [latestOpenKey] : []
    }
  }
  updateMenu() {
    const routes: RouteRecord[] = this.$route.matched.concat()

    if (routes.length >= 4 && this.$route.meta.hidden) {
      routes.pop()
      this.selectedKeys = [routes[2].path]
    } else {
      // this.selectedKeys = [routes.pop()?.path];
      const route = routes.pop()
      if (route) {
        this.selectedKeys = [route.path]
      } else {
        this.selectedKeys = []
      }
    }

    const openKeys: any[] = []
    if (this.mode === 'inline') {
      routes.forEach(item => {
        openKeys.push(item.path)
      })
    }

    this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
  }

  render(h: CreateElement) {
    return h(
      Menu,
      {
        props: {
          theme: this.$props.theme,
          mode: this.$props.mode,
          openKeys: this.openKeys,
          selectedKeys: this.selectedKeys
        },
        on: {
          openChange: this.onOpenChange,
          select: (obj: any) => {
            this.selectedKeys = obj.selectedKeys
            this.$emit('select', obj)
          }
        }
      },
      this.renderMenu(h, this.menu)
    )
  }
}
