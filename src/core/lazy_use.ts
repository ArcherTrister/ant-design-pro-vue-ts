import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

// base library
import '@/core/lazy_lib/components_use'
import Viser from 'viser-vue'
import VueCropper from 'vue-cropper'
import MultiTabs from '@/components/MultiTab/multiTabs'
import LoadingPlugin from '@/components/PageLoading/LoadingPlugin'
import GlobalSearch from '@/components/Search'

// ext library
import VueClipboard from 'vue-clipboard2'
// import MultiTab from '@/components/MultiTab'
// import PageLoading from '@/components/PageLoading'
import PermissionHelper from '@/utils/helper/permission'
import './directives/action'

VueClipboard.config.autoSetContainer = true

Vue.use(Viser)
Vue.use(VueCropper)
Vue.use(MultiTabs)
Vue.use(LoadingPlugin)
// Vue.use(MultiTab)
// Vue.use(PageLoading)
Vue.use(VueStorage, config.storageOptions)
Vue.use(VueClipboard)
Vue.use(PermissionHelper)

Vue.component(GlobalSearch.name, GlobalSearch)
