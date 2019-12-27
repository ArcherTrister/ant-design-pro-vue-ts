export interface LoginState {
  time: number
  loginBtn: boolean
  // login type: 0 email, 1 username, 2 telephone
  loginType: number
  smsSendBtn: boolean
}

export interface RegisterState {
  time: number
  smsSendBtn: boolean
  passwordLevel: number
  passwordLevelChecked: boolean
  percent: number
  progressColor: string
}

export interface SettingOption {
  img: string
  info: boolean
  size: number
  outputType: string
  canScale: boolean
  autoCrop: boolean
  // 只有自动截图开启 宽度高度才生效
  autoCropWidth: number
  autoCropHeight: number
  fixedBox: boolean
  // 开启宽度和高度比例
  fixed: boolean
  fixedNumber: any[]
}
