import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
// import asyncRouter from './modules/async-router'
import permission from './modules/permission'
import getters from './getters'
import { RootState } from '@/interfaces/store-interface'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  modules: {
    app,
    user,
    // asyncRouter,
    permission
  },
  state: {},
  mutations: {},
  actions: {},
  getters: getters
})
