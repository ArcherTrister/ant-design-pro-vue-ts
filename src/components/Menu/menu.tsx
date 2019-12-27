import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Menu from 'ant-design-vue/es/menu'
import Icon from 'ant-design-vue/es/icon'

const { Item, SubMenu } = Menu

@Component({
  name: 'SMenu',
  components: {}
})
export default class SMenuComponent extends Vue {
  // props
  @Prop({ type: Array, required: true })
  public menu!: any[]
  @Prop({ type: String, default: 'dark', required: false })
  public theme!: string
  @Prop({ type: String, default: 'inline', required: false })
  public mode!: string
  @Prop({ type: Boolean, default: false, required: false })
  public collapsed!: boolean

  public openKeys: any[] = []
  public selectedKeys: any[] = []
  public cachedOpenKeys: any[] = []

  public get rootSubmenuKeys() {
    const keys: any[] = []
    this.menu.forEach(item => keys.push(item.path))
    return keys
  }

  constructor() {
    super()
  }

  mounted() {
    this.updateMenu()
  }

  // watch
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
  routeChanged() {
    this.updateMenu()
  }

  // methods
  // select menu item
  onOpenChange(openKeys: any[]) {
    // 在水平模式下时执行，并且不再执行后续
    if (this.mode === 'horizontal') {
      this.openKeys = openKeys
      return
    }
    // 非水平模式时
    const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
    if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
      this.openKeys = openKeys
    } else {
      this.openKeys = latestOpenKey ? [latestOpenKey] : []
    }
  }

  updateMenu() {
    const routes = this.$route.matched.concat()
    const { hidden } = this.$route.meta
    if (routes.length >= 3 && hidden) {
      routes.pop()
      this.selectedKeys = [routes[routes.length - 1].path]
    } else {
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

  // render
  renderItem(menu: any) {
    if (!menu.hidden) {
      return menu.children && !menu.hideChildrenInMenu ? this.renderSubMenu(menu) : this.renderMenuItem(menu)
    }
    return null
  }
  renderMenuItem(menu: any) {
    const target = menu.meta.target || null
    const tag = (target && 'a') || 'router-link'
    const props = { to: { name: menu.name } }
    const attrs = { href: menu.path, target: menu.meta.target }

    if (menu.children && menu.hideChildrenInMenu) {
      // 把有子菜单的 并且 父菜单是要隐藏子菜单的
      // 都给子菜单增加一个 hidden 属性
      // 用来给刷新页面时， selectedKeys 做控制用
      menu.children.forEach((item: any) => {
        item.meta = Object.assign(item.meta, { hidden: true })
      })
    }

    return (
      <Item {...{ key: menu.path }}>
        <tag {...{ props, attrs }}>
          {this.renderIcon(menu.meta.icon)}
          <span>{menu.meta.title}</span>
        </tag>
      </Item>
    )
  }
  renderSubMenu(menu: any) {
    const itemArr: any[] = []
    if (!menu.hideChildrenInMenu) {
      menu.children.forEach((item: any) => itemArr.push(this.renderItem(item)))
    }
    return (
      <SubMenu {...{ key: menu.path }}>
        <span slot="title">
          {this.renderIcon(menu.meta.icon)}
          <span>{menu.meta.title}</span>
        </span>
        {itemArr}
      </SubMenu>
    )
  }
  renderIcon(icon: any) {
    if (icon === 'none' || icon === undefined) {
      return null
    }
    const props: any = {}
    typeof icon === 'object' ? (props.component = icon) : (props.type = icon)
    return <Icon {...{ props }} />
  }

  render() {
    const { mode, theme, menu } = this
    const props = {
      mode: mode,
      theme: theme,
      openKeys: this.openKeys
    }
    const on = {
      select: (obj: any) => {
        this.selectedKeys = obj.selectedKeys
        this.$emit('select', obj)
      },
      openChange: this.onOpenChange
    }

    const menuTree = menu.map(item => {
      if (item.hidden) {
        return null
      }
      return this.renderItem(item)
    })
    // {...{ props, on: on }}
    return (
      <Menu vModel={this.selectedKeys} {...{ props, on: on }}>
        {menuTree}
      </Menu>
    )
  }
}
