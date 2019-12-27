import { Component, Prop, Vue, Watch, Emit, Provide, Inject, Mixins } from 'vue-property-decorator'
import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'
import { State, Action, Getter } from 'vuex-class'

@Component({
  components: {}
})
export default class AppDeviceEnquire extends Vue {
  constructor() {
    super()
  }

  mounted() {
    const { $store } = this
    deviceEnquire((deviceType: any) => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit('app/TOGGLE_DEVICE', 'desktop')
          $store.dispatch('app/setSidebar', true)
          break
        case DEVICE_TYPE.TABLET:
          $store.commit('app/TOGGLE_DEVICE', 'tablet')
          $store.dispatch('app/setSidebar', false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit('app/TOGGLE_DEVICE', 'mobile')
          $store.dispatch('app/setSidebar', true)
          break
      }
    })
  }
}
