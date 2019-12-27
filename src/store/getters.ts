const getters = {
  // device: (state: GetterTree<IAppState, RootState>) => state.device,
  // theme: (state: GetterTree<IAppState, RootState>) => state.theme,
  // color: (state: GetterTree<IAppState, RootState>) => state.color,
  // multiTab: (state: GetterTree<IAppState, RootState>) => state.multiTab,

  // token: (state: GetterTree<IUserState, RootState>) => state.token,
  // avatar: (state: GetterTree<IUserState, RootState>) => state.avatar,
  // nickname: (state: GetterTree<IUserState, RootState>) => state.name,
  // welcome: (state: GetterTree<IUserState, RootState>) => state.welcome,
  // roles: (state: GetterTree<IUserState, RootState>) => state.roles,
  // userInfo: (state: GetterTree<IUserState, RootState>) => state.info,

  // addRouters: (state: { permission: { addRouters: any } }) => state.permission.addRouters,

  lang: (state: any) => state.i18n.lang
}

export default getters
