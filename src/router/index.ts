import Vue from 'vue'
import Router, { RawLocation } from 'vue-router'
import { constantRouterMap } from './async-router-map'

// hack router push callback
const originalPush = Router.prototype.push
// Router.prototype.push = function push (location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }
Router.prototype.push = function push(location: RawLocation) {
  return (<any>originalPush.call(this, location)).catch((error: any) => error)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // scrollBehavior: () => ({ y: 0 }),
  scrollBehavior: function(to: any, from: any, savedPosition: any) {
    return { x: 0, y: 0 }
  },
  routes: constantRouterMap
})
