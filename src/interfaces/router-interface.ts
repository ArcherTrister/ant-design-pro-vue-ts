export interface CustomRouteConfig {
  key?: string
  name?: string
  path: string
  component?: string

  redirect?: string

  meta?: Meta

  hideChildrenInMenu?: boolean

  hidden?: boolean

  children?: CustomRouteConfig[]

  // alias?: string | string[]
  // children?: RouteConfig[]
  // meta?: any
  // beforeEnter?: NavigationGuard
  // props?: boolean | Object | RoutePropsFunction
  // caseSensitive?: boolean
  // pathToRegexpOptions?: PathToRegexpOptions
}

export interface Meta {
  title: any
  icon?: any | undefined
  hiddenHeaderContent?: any
  target?: any
  permission?: any
}
