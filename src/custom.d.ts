// declare module '*.svg' {
//   const content: any
//   export default content
// }

declare module '*.svg'
declare module '*.svg?inline'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

declare module 'webpack-theme-color-replacer/client'

declare module 'vue-cropper'

declare module 'vue-quill-editor'

declare module 'wangeditor'

interface MultiTabs {
  installed?: boolean
  install(Vue: any, instance: any): void
}
