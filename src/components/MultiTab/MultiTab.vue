<script lang="tsx">
import { Component, Prop, Vue, Watch, Emit, Provide, Inject } from 'vue-property-decorator'
import events from './events'

@Component({
  name: 'MultiTab',
  components: {}
})
export default class MultiTabComponent extends Vue {
  fullPathList: any[] = []
  pages: any[] = []
  activeKey: string = ''
  newTabIndex: number = 0

  constructor() {
    super()
  }

  created() {
    // bind event
    events
      .$on('open', (val: string) => {
        if (!val) {
          throw new Error(`multi-tab: open tab ${val} err`)
        }
        this.activeKey = val
      })
      .$on('close', (val: any) => {
        if (!val) {
          this.closeThat(this.activeKey)
          return
        }
        this.closeThat(val)
      })
      // obj { key, name }
      .$on('rename', (obj: any) => {
        console.log('rename', obj.key, obj.name)
        try {
          const item = this.pages.find(item => item.path === obj.key)
          item.meta.customTitle = name
          this.$forceUpdate()
        } catch (e) {
          console.error(e)
        }
      })

    this.pages.push(this.$route)
    this.fullPathList.push(this.$route.fullPath)
    this.selectedLastPath()
  }

  // methods
  onEdit(targetKey: any, action: any) {
    ;(this as any)[action](targetKey)
  }
  remove(targetKey: any) {
    this.pages = this.pages.filter(page => page.fullPath !== targetKey)
    this.fullPathList = this.fullPathList.filter(path => path !== targetKey)
    // 判断当前标签是否关闭，若关闭则跳转到最后一个还存在的标签页
    if (!this.fullPathList.includes(this.activeKey)) {
      this.selectedLastPath()
    }
  }
  selectedLastPath() {
    this.activeKey = this.fullPathList[this.fullPathList.length - 1]
  }

  // content menu
  closeThat(e: any) {
    // 判断是否为最后一个标签页，如果是最后一个，则无法被关闭
    if (this.fullPathList.length > 1) {
      this.remove(e)
    } else {
      this.$message.info('这是最后一个标签了, 无法被关闭')
    }
  }
  closeLeft(e: any) {
    const currentIndex = this.fullPathList.indexOf(e)
    if (currentIndex > 0) {
      this.fullPathList.forEach((item, index) => {
        if (index < currentIndex) {
          this.remove(item)
        }
      })
    } else {
      this.$message.info('左侧没有标签')
    }
  }
  closeRight(e: any) {
    const currentIndex = this.fullPathList.indexOf(e)
    if (currentIndex < this.fullPathList.length - 1) {
      this.fullPathList.forEach((item, index) => {
        if (index > currentIndex) {
          this.remove(item)
        }
      })
    } else {
      this.$message.info('右侧没有标签')
    }
  }
  closeAll(e: any) {
    const currentIndex = this.fullPathList.indexOf(e)
    this.fullPathList.forEach((item, index) => {
      if (index !== currentIndex) {
        this.remove(item)
      }
    })
  }
  closeMenuClick(key: any, route: any) {
    ;(this as any)[key](route)
  }

  // closeMenuClick({ key: string, item, domEvent }) {
  //   const vkey = domEvent.target.getAttribute('data-vkey')
  //   switch (key:string) {
  //     case 'closeRight':
  //       this.closeRight(vkey)
  //       break
  //     case 'closeLeft':
  //       this.closeLeft(vkey)
  //       break
  //     case 'closeAll':
  //       this.closeAll(vkey)
  //       break
  //     default:
  //     case 'closeThat':
  //       this.closeThat(vkey)
  //       break
  //   }
  // }

  renderTabPaneMenu(e: any) {
    return (
      <a-menu
        {...{
          on: {
            click: (obj: any) => {
              this.closeMenuClick(obj.key, e)
            }
          }
        }}
      >
        <a-menu-item key="closeThat">关闭当前标签</a-menu-item>
        <a-menu-item key="closeRight">关闭右侧</a-menu-item>
        <a-menu-item key="closeLeft">关闭左侧</a-menu-item>
        <a-menu-item key="closeAll">关闭全部</a-menu-item>
      </a-menu>
    )

    // return (
    //   <a-menu {...{ on: { click: this.closeMenuClick } }}>
    //     <a-menu-item key="closeThat" data-vkey={e}>
    //       关闭当前标签
    //     </a-menu-item>
    //     <a-menu-item key="closeRight" data-vkey={e}>
    //       关闭右侧
    //     </a-menu-item>
    //     <a-menu-item key="closeLeft" data-vkey={e}>
    //       关闭左侧
    //     </a-menu-item>
    //     <a-menu-item key="closeAll" data-vkey={e}>
    //       关闭全部
    //     </a-menu-item>
    //   </a-menu>
    // )
  }
  // render
  renderTabPane(title: any, keyPath: any) {
    const menu = this.renderTabPaneMenu(keyPath)

    return (
      <a-dropdown overlay={menu} trigger={['contextmenu']}>
        <span style={{ userSelect: 'none' }}>{title}</span>
      </a-dropdown>
    )
  }

  // watch
  @Watch('$route')
  routeChanged(newVal: any) {
    this.activeKey = newVal.fullPath
    if (this.fullPathList.indexOf(newVal.fullPath) < 0) {
      this.fullPathList.push(newVal.fullPath)
      this.pages.push(newVal)
    }
  }

  @Watch('activeKey')
  activeKeyChanged(newPathKey: any) {
    this.$router.push({ path: newPathKey })
  }

  render() {
    const {
      onEdit,
      $data: { pages }
    } = this
    const panes = pages.map((page: any) => {
      return (
        <a-tab-pane
          style={{ height: 0 }}
          tab={this.renderTabPane(page.meta.customTitle || page.meta.title, page.fullPath)}
          key={page.fullPath}
          closable={pages.length > 1}
        ></a-tab-pane>
      )
    })

    return (
      <div class="ant-pro-multi-tab">
        <div class="ant-pro-multi-tab-wrapper">
          <a-tabs
            hideAdd
            type={'editable-card'}
            v-model={this.activeKey}
            tabBarStyle={{
              background: '#FFF',
              margin: 0,
              paddingLeft: '16px',
              paddingTop: '1px'
            }}
            {...{ on: { edit: onEdit } }}
          >
            {panes}
          </a-tabs>
        </div>
      </div>
    )
  }
}
</script>
