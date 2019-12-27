import { VueConstructor } from 'vue'
import PageLoading from './PageLoading'
import { PageLoadingsPlugin } from '@/utils/vue-plugins'
const version = '0.0.1'
const loading: any = {}

loading.newInstance = (Vue: any, options: any) => {
  let loadingElement = document.querySelector('body>div[type=loading]')
  if (!loadingElement) {
    loadingElement = document.createElement('div')
    loadingElement.setAttribute('type', 'loading')
    loadingElement.setAttribute('class', 'ant-loading-wrapper')
    document.body.appendChild(loadingElement)
  }

  const cdProps = Object.assign({ visible: false, size: 'large', tip: 'Loading...' }, options)

  const instance = new Vue({
    data() {
      return {
        ...cdProps
      }
    },
    render() {
      const { tip } = this
      const props: any = {}
      this.tip && (props.tip = tip)
      if (this.visible) {
        return <PageLoading {...{ props }} />
      }
      return null
    }
  }).$mount(loadingElement)

  function update(config: any) {
    // todo
    // const { visible, size, tip } = { ...cdProps, ...config }
    const obj: any = { ...cdProps, ...config }
    const { visible, size, tip } = obj
    instance.$set(instance, 'visible', visible)
    if (tip) {
      instance.$set(instance, 'tip', tip)
    }
    if (size) {
      instance.$set(instance, 'size', size)
    }
  }

  return {
    instance,
    update
  }
}

const api: any = {
  show: function(options: any) {
    this.instance.update({ ...options, visible: true })
  },
  hide: function() {
    this.instance.update({ visible: false })
  }
}

const Loading: PageLoadingsPlugin = {
  install(Vue: VueConstructor, instance: any): void {
    if (this.installed) {
      return
    }
    this.installed = true

    api.instance = loading.newInstance(Vue, instance)
    api.version = version
    !Vue.prototype.$loading &&
      Object.defineProperties(Vue.prototype, {
        $loading: {
          get() {
            return api
          }
        }
      })
  }
}

export default Loading
