import Vue from 'vue'
import {
  SIDEBAR_TYPE,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR,
  DEFAULT_COLOR_WEAK,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_CONTENT_WIDTH_TYPE,
  DEFAULT_MULTI_TAB
} from '@/store/mutation-types'
import { Module, MutationTree, ActionTree, GetterTree, ActionContext } from 'vuex'
import { RootState, IAppState } from '@/interfaces/store-interface'

const mutations: MutationTree<IAppState> = {
  SET_SIDEBAR_TYPE: (state, type) => {
    state.sidebar = type

    Vue.ls.set(SIDEBAR_TYPE, type)
  },
  CLOSE_SIDEBAR: state => {
    Vue.ls.set(SIDEBAR_TYPE, true)
    state.sidebar = false
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TOGGLE_THEME: (state, theme) => {
    // setStore('_DEFAULT_THEME', theme)
    Vue.ls.set(DEFAULT_THEME, theme)
    state.theme = theme
  },
  TOGGLE_LAYOUT_MODE: (state, layout) => {
    Vue.ls.set(DEFAULT_LAYOUT_MODE, layout)
    state.layout = layout
  },
  TOGGLE_FIXED_HEADER: (state, fixed) => {
    Vue.ls.set(DEFAULT_FIXED_HEADER, fixed)
    state.fixedHeader = fixed
  },
  TOGGLE_FIXED_SIDERBAR: (state, fixed) => {
    Vue.ls.set(DEFAULT_FIXED_SIDEMENU, fixed)
    state.fixSiderbar = fixed
  },
  TOGGLE_FIXED_HEADER_HIDDEN: (state, show) => {
    Vue.ls.set(DEFAULT_FIXED_HEADER_HIDDEN, show)
    state.autoHideHeader = show
  },
  TOGGLE_CONTENT_WIDTH: (state, type) => {
    Vue.ls.set(DEFAULT_CONTENT_WIDTH_TYPE, type)
    state.contentWidth = type
  },
  TOGGLE_COLOR: (state, color) => {
    Vue.ls.set(DEFAULT_COLOR, color)
    state.color = color
  },
  TOGGLE_WEAK: (state, flag) => {
    Vue.ls.set(DEFAULT_COLOR_WEAK, flag)
    state.weak = flag
  },
  TOGGLE_MULTI_TAB: (state, val) => {
    Vue.ls.set(DEFAULT_MULTI_TAB, val)
    state.multiTab = val
  }
}

const actions: ActionTree<IAppState, RootState> = {
  setSidebar(context: ActionContext<IAppState, RootState>, type) {
    context.commit('SET_SIDEBAR_TYPE', type)
  },
  CloseSidebar(context: ActionContext<IAppState, RootState>) {
    context.commit('CLOSE_SIDEBAR')
  },
  ToggleDevice(context: ActionContext<IAppState, RootState>, device) {
    context.commit('TOGGLE_DEVICE', device)
  },
  ToggleTheme(context: ActionContext<IAppState, RootState>, theme) {
    context.commit('TOGGLE_THEME', theme)
  },
  ToggleLayoutMode(context: ActionContext<IAppState, RootState>, mode) {
    context.commit('TOGGLE_LAYOUT_MODE', mode)
  },
  ToggleFixedHeader(context: ActionContext<IAppState, RootState>, fixedHeader) {
    if (!fixedHeader) {
      context.commit('TOGGLE_FIXED_HEADER_HIDDEN', false)
    }
    context.commit('TOGGLE_FIXED_HEADER', fixedHeader)
  },
  ToggleFixSiderbar(context: ActionContext<IAppState, RootState>, fixSiderbar) {
    context.commit('TOGGLE_FIXED_SIDERBAR', fixSiderbar)
  },
  ToggleFixedHeaderHidden(context: ActionContext<IAppState, RootState>, show) {
    context.commit('TOGGLE_FIXED_HEADER_HIDDEN', show)
  },
  ToggleContentWidth(context: ActionContext<IAppState, RootState>, type) {
    context.commit('TOGGLE_CONTENT_WIDTH', type)
  },
  ToggleColor(context: ActionContext<IAppState, RootState>, color) {
    context.commit('TOGGLE_COLOR', color)
  },
  ToggleWeak(context: ActionContext<IAppState, RootState>, weakFlag) {
    context.commit('TOGGLE_WEAK', weakFlag)
  },
  ToggleMultiTab(context: ActionContext<IAppState, RootState>, val) {
    context.commit('TOGGLE_MULTI_TAB', val)
  }
}

const getters: GetterTree<IAppState, RootState> = {
  device: state => state.device,
  theme: state => state.theme,
  color: state => state.color,
  multiTab: state => state.multiTab
}

const appState: IAppState = {
  sidebar: true,
  device: 'desktop',
  theme: '',
  layout: '',
  contentWidth: '',
  fixedHeader: false,
  fixSiderbar: false,
  autoHideHeader: false,
  color: null,
  weak: false,
  multiTab: false
}

const app: Module<IAppState, RootState> = {
  namespaced: true,
  state: appState,
  getters: getters,
  actions: actions,
  mutations: mutations
}

export default app
