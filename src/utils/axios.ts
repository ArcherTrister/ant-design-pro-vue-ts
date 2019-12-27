import { VueConstructor } from 'vue'
import { AxiosPlugin } from './vue-plugins'

/**
 * 将axios作为vue插件，在vue的实例上定义了两个方法axios和$http
 */
const VueAxios: AxiosPlugin = {
  install(Vue: VueConstructor, instance: any): void {
    if (this.installed) {
      return
    }
    this.installed = true

    if (!instance) {
      console.error('请使用下面方式注册=============> Vue.use(VueAxios, axios)')
    }

    // Vue.axios = instance

    !Vue.prototype.axios &&
      Object.defineProperties(Vue.prototype, {
        axios: {
          get: function get() {
            return instance
          }
        },
        $http: {
          get: function get() {
            return instance
          }
        }
      })
  }
}

export default VueAxios
