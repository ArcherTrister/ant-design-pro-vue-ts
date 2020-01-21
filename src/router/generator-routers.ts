import * as loginService from '@/api/login'
import { BasicLayout, BlankLayout, PageView, RouteView } from '@/layouts'
import { CustomRouteConfig } from '@/interfaces/router-interface'

// 前端路由表
const constantRouterComponents: any = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  PageView: PageView,
  RouteView: RouteView,
  '403': () => import(/* webpackChunkName: "error" */ '@/views/exception/403.vue'),
  '404': () => import(/* webpackChunkName: "error" */ '@/views/exception/404.vue'),
  '500': () => import(/* webpackChunkName: "error" */ '@/views/exception/500.vue'),

  // dashboard
  Workplace: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Workplace.vue'),
  Analysis: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Analysis.vue'),
  TestWork: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/TestWork.vue'),

  // form
  BasicForm: () => import(/* webpackChunkName: "form" */ '@/views/form/BasicForm.vue'),
  StepForm: () => import(/* webpackChunkName: "form" */ '@/views/form/stepForm/StepForm.vue'),
  AdvanceForm: () => import(/* webpackChunkName: "form" */ '@/views/form/advancedForm/AdvancedForm.vue'),

  // list
  TableList: () => import(/* webpackChunkName: "list" */ '@/views/list/TableList.vue'),
  StandardList: () => import(/* webpackChunkName: "list" */ '@/views/list/StandardList.vue'),
  CardList: () => import(/* webpackChunkName: "list" */ '@/views/list/CardList.vue'),
  SearchLayout: () => import(/* webpackChunkName: "SearchList" */ '@/views/list/search/SearchLayout.vue'),
  SearchArticles: () => import(/* webpackChunkName: "SearchList" */ '@/views/list/search/Article.vue'),
  SearchProjects: () => import(/* webpackChunkName: "SearchList" */ '@/views/list/search/Projects.vue'),
  SearchApplications: () => import(/* webpackChunkName: "SearchList" */ '@/views/list/search/Applications.vue'),

  // profile
  ProfileBasic: () => import(/* webpackChunkName: "profile" */ '@/views/profile/basic/Index.vue'),
  ProfileAdvanced: () => import(/* webpackChunkName: "profile" */ '@/views/profile/advanced/Advanced.vue'),

  // result
  ResultSuccess: () => import(/* webpackChunkName: "result" */ '@/views/result/Success.vue'),
  ResultFail: () => import(/* webpackChunkName: "result" */ '@/views/result/Error.vue'),

  // exception
  Exception403: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403.vue'),
  Exception404: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404.vue'),
  Exception500: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500.vue'),

  // personal
  PersonalCenter: () => import(/* webpackChunkName: "personal" */ '@/views/personal/center/Index.vue'),
  PersonalSettings: () => import(/* webpackChunkName: "personal" */ '@/views/personal/settings/Index.vue'),
  BaseSettings: () => import(/* webpackChunkName: "personal" */ '@/views/personal/settings/BaseSetting.vue'),
  SecuritySettings: () => import(/* webpackChunkName: "personal" */ '@/views/personal/settings/Security.vue'),
  CustomSettings: () => import(/* webpackChunkName: "personal" */ '@/views/personal/settings/Custom.vue'),
  BindingSettings: () => import(/* webpackChunkName: "personal" */ '@/views/personal/settings/Binding.vue'),
  NotificationSettings: () => import(/* webpackChunkName: "personal" */ '@/views/personal/settings/Notification.vue'),

  // other
  TestIconSelect: () => import(/* webpackChunkName: "TestIconSelect" */ '@/views/other/IconSelectorView.vue'),
  TreeList: () => import(/* webpackChunkName: "OtherList" */ '@/views/other/TreeList.vue'),
  EditList: () => import(/* webpackChunkName: "OtherList" */ '@/views/other/TableInnerEditList.vue'),
  UserList: () => import(/* webpackChunkName: "OtherList" */ '@/views/other/UserList.vue'),
  RoleList: () => import(/* webpackChunkName: "OtherList" */ '@/views/other/RoleList.vue'),
  SystemRole: () => import(/* webpackChunkName: "OtherList" */ '@/views/role/RoleList.vue'),
  PermissionList: () => import(/* webpackChunkName: "OtherList" */ '@/views/other/PermissionList.vue')
}

// 前端未找到页面路由（固定不用改）
const notFoundRouter: CustomRouteConfig = {
  path: '*',
  redirect: '/404',
  hidden: true
}

// 根级菜单
const rootRouter: CustomRouteConfig = {
  key: '',
  name: 'index',
  path: '',
  component: 'BasicLayout',
  redirect: '/dashboard',
  meta: {
    title: '首页'
  },
  children: []
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (token: any) => {
  return new Promise((resolve, reject) => {
    loginService
      .getCurrentUserNav(token)
      .then((res: any) => {
        const { result } = res
        const menuNav: any[] = []
        const childrenNav: any[] = []
        //      后端数据, 根级树数组,  根级 PID
        listToTree(result, childrenNav, 0)
        rootRouter.children = childrenNav
        menuNav.push(rootRouter)
        console.log('menuNav', menuNav)
        const routers = generator(menuNav)
        routers.push(notFoundRouter)
        console.log('routers', routers)
        resolve(routers)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap: any[], parent?: any) => {
  return routerMap.map((item: any) => {
    const { title = '', show = true, hideChildren = false, hiddenHeaderContent = false, target = '', icon = '' } =
      item.meta || {}
    const currentRouter: CustomRouteConfig = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${(parent && parent.path) || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 该路由对应页面的 组件 :方案1
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
      component: constantRouterComponents[item.component || item.key] || (() => import(`@/views/${item.component}`)),

      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title,
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        target: target,
        permission: item.name
      }
    }
    // 是否设置了隐藏菜单
    if (show === false) {
      currentRouter.hidden = true
    }
    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list: any, tree: any[], parentId: any) => {
  list.forEach((item: any) => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}
