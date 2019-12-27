import { VueConstructor } from 'vue'
import { MultiTab } from '@/components'
import { MultiTabsPlugin } from '@/utils/vue-plugins'
import events from './events'

const MultiTabs: MultiTabsPlugin = {
  install(Vue: VueConstructor, instance: any): void {
    if (this.installed) {
      return
    }
    this.installed = true

    !Vue.prototype.$multiTab &&
      Object.defineProperties(Vue.prototype, {
        $multiTab: {
          get() {
            return {
              /**
               * open new tab on route fullPath
               * @param config
               */
              open: function(config: any) {
                events.$emit('open', config)
              },
              rename: function(key: any, name: any) {
                events.$emit('rename', { key: key, name: name })
              },
              /**
               * close current page
               */
              closeCurrentPage: function() {
                this.close(null)
              },
              /**
               * close route fullPath tab
               * @param config
               */
              close: function(config: any) {
                events.$emit('close', config)
              }
            }
          }
        }
      })

    Vue.component('multi-tab', MultiTab)
  }
}

export default MultiTabs
