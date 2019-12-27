export interface RootState {}

export interface IAppState {
  sidebar: boolean
  device: string
  theme: string
  layout: string
  contentWidth: string
  fixedHeader: boolean
  fixSiderbar: boolean
  autoHideHeader: boolean
  color?: string | null
  weak: boolean
  multiTab: boolean
}

export interface IUserState {
  token: string
  name: string
  welcome: string
  avatar: string
  roles: any[]
  info: any
}

export interface IPermission {
  routers: any[]
  addRouters: any[]
}
