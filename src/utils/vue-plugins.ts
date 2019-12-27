// plugins
import { VueConstructor } from 'vue'

export interface AxiosPlugin {
  installed?: boolean
  install(Vue: VueConstructor, instance: any): void
}

export interface PermissionsPlugin {
  installed?: boolean
  install(Vue: VueConstructor, instance: any): void
}

export interface MultiTabsPlugin {
  installed?: boolean
  install(Vue: VueConstructor, instance: any): void
}

export interface PageLoadingsPlugin {
  installed?: boolean
  install(Vue: VueConstructor, instance: any): void
}
