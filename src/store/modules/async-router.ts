// import { constantRouterMap } from '@/router/async-router-map'
// import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from 'vuex'
// import { RootState, IPermission } from '@/interfaces/store-interface'
// import { generatorDynamicRouter } from '@/router/generator-routers'

// const mutations: MutationTree<IPermission> = {
//   SET_ROUTERS: (state, routers) => {
//     state.addRouters = routers
//     state.routers = constantRouterMap.concat(routers)
//   }
// }

// const actions: ActionTree<IPermission, RootState> = {
//   GenerateRoutes({ commit }, data) {
//     return new Promise(resolve => {
//       const { token } = data
//       generatorDynamicRouter(token).then(routers => {
//         commit('SET_ROUTERS', routers)
//         resolve()
//       })
//     })
//   }
// }

// const getters: GetterTree<IPermission, RootState> = {
//   addRouters: state => state.addRouters
// }

// const state: IPermission = {
//   routers: constantRouterMap,
//   addRouters: []
// }

// const asyncRouter: Module<IPermission, RootState> = {
//   namespaced: true,
//   state: state,
//   getters: getters,
//   actions: actions,
//   mutations: mutations
// }

// export default asyncRouter
