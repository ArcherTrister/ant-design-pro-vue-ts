[English](./README.md) | 简体中文

<h1 align="center">Ant Design Pro Vue With TypeScript</h1>
<div align="center">
An out-of-box UI solution for enterprise applications as a Vue boilerplate. based on  <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/" target="_blank">Ant Design of Vue</a>
</div>
<div align="center">
Modified from <a href="https://github.com/sendya/ant-design-pro-vue/" target="_blank">Ant Design Pro Vue</a>
</div>

<div align="center">

[![Backers on Open Collective](https://opencollective.com/ant-design-pro-vue-ts/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/ant-design-pro-vue-ts/sponsors/badge.svg)](#sponsors) [![License](https://img.shields.io/npm/l/package.json.svg?style=flat)](https://github.com/ArcherTrister/ant-design-pro-vue-ts/blob/master/LICENSE)
[![Release](https://img.shields.io/github/release/ArcherTrister/ant-design-pro-vue-ts.svg?style=flat)](https://github.com/ArcherTrister/ant-design-pro-vue-ts/releases/latest)
[![Travis branch](https://travis-ci.org/ArcherTrister/ant-design-pro-vue-ts.svg?branch=master)](https://travis-ci.org/ArcherTrister/ant-design-pro-vue-ts)

</div>

- 预览: https://preview.pro.lxking.cn
- 首页: https://pro.lxking.cn
- 文档: https://pro.lxking.cn/docs/getting-started
- 更新日志: https://pro.lxking.cn/docs/changelog
- 常见问题: https://pro.lxking.cn/docs/faq


Overview
----

基于 [Ant Design of Vue](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/) 实现的 [Ant Design Pro](https://pro.ant.design/) 

![工作台-多标签模式](https://static-2.lxking.cn/open/static/github/20190224163345.jpg)

![工作台+设置菜单](https://static-2.lxking.cn/open/static/github/20181126112124.png)

![个人设置](https://static-2.lxking.cn/open/static/github/20180916-134251.png)


环境和依赖
----

- node
- yarn
- webpack
- eslint
- @vue/cli ~3
- [ant-design-vue](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 实现
- [vue-cropper](https://github.com/xyxiao001/vue-cropper) - 头像裁剪组件
- [@antv/g2](https://antv.alipay.com/zh-cn/index.html) - Alipay AntV 数据可视化图表
- [Viser-vue](https://viserjs.github.io/docs.html#/viser/guide/installation)  - antv/g2 封装实现

> 请注意，我们强烈建议本项目使用 [Yarn](https://yarnpkg.com/) 包管理工具，这样可以与本项目演示站所加载完全相同的依赖版本 (yarn.lock) 。由于我们没有对依赖进行强制的版本控制，采用非 yarn 包管理进行引入时，可能由于 Pro 所依赖的库已经升级版本而引入了新版本所导致的问题。作者可能会由于时间问题无法及时排查而导致您采用本项目作为基项目而出现问题。



项目下载和运行
----

- 拉取项目代码
```bash
git clone https://github.com/ArcherTrister/ant-design-pro-vue-ts.git
cd ant-design-pro-vue-ts
```

- 安装依赖
```
yarn install
```

- 开发模式运行
```
yarn run dev
```

- 编译项目
```
yarn run build
```

- Lints and fixes files
```
yarn run lint
```



其他说明
----

- **关于 Issue 反馈 (重要!重要!重要!) 请在开 *Issue* 前，先阅读该内容：[Issue / PR 编写建议](https://github.com/ArcherTrister/ant-design-pro-vue-ts/issues/90)** 

- 项目使用的 [vue-cli3](https://cli.vuejs.org/guide/), 请确保你所使用的 vue-cli 是新版，并且已经学习 cli 官方文档使用教程

- 关闭 Eslint (不推荐) 移除 `package.json` 中 `eslintConfig` 整个节点代码, `vue.config.js` 下的 `lintOnSave` 值改为 `false`

- 开启组件按需加载 `/src/main.js` L14 修改为 `import './core/lazy_use'`

- [修改 Ant Design 配色 (@kokoroli)](https://github.com/kokoroli/antd-awesome/blob/master/docs/Ant_Design_%E6%A0%B7%E5%BC%8F%E8%A6%86%E7%9B%96.md)

- I18n: [多语言支持 (@musnow)](./src/locales/index.js)

- 生成环境默认不加载 `mock`，更多详情请看 `src/mock/index.js`

- **用于生产环境，请使用 `release` 版本代码，使用 master 代码出现的任何问题需要你自行解决**

## 浏览器兼容

Modern browsers and IE10.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| IE10, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |


## Contributors

This project exists thanks to all the people who contribute. 
<a href="https://github.com/ArcherTrister/ant-design-pro-vue-ts/graphs/contributors"><img src="https://opencollective.com/ant-design-pro-vue-ts/contributors.svg?width=890&button=false" /></a>

<!--
## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/ant-design-pro-vue-ts#backer)] 

<a href="https://opencollective.com/ant-design-pro-vue-ts#backers" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue-ts/backers.svg?width=890"></a>
-->

## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/ant-design-pro-vue-ts#sponsor)]

<a href="https://opencollective.com/ant-design-pro-vue-ts/sponsor/0/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue-ts/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue-ts/sponsor/1/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue-ts/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue-ts/sponsor/2/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue-ts/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue-ts/sponsor/3/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue-ts/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue-ts/sponsor/4/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue-ts/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue-ts/sponsor/5/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue-ts/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue-ts/sponsor/6/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue-ts/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue-ts/sponsor/7/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue-ts/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue-ts/sponsor/8/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue-ts/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue-ts/sponsor/9/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue-ts/sponsor/9/avatar.svg"></a>

## <a id="01"/>简介

### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn dev
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## <a id="02"/>项目开发进度

- [x] **Ant Design Pro Vue With TypeScript**
    - [x] App.vue
    - [x] custom.d.ts
    - [x] main.ts
    - [x] permission.ts
    - [x] shims-ant-design-vue-type.d.ts
    - [x] shims-ant-design-vue.d.ts
    - [x] shims-tsx.d.ts
    - [x] shims-vue.d.ts
    - [x] vue-axios.d.ts
    - [x] **api**
        - [x] index.ts
        - [x] login.ts
        - [x] manage.ts      
    - [x] **assets**
        - [x] background.svg
        - [x] logo.png
        - [x] logo.svg
            - [x] icons
                - [x] bx-analyse.svg
    - [x] **components**
        - [x] global.less
        - [x] index.less
        - [x] index.ts
        - [x] **ArticleListContent**
            - [x] ArticleListContent.vue
            - [x] index.ts
        - [x] **AvatarList**
            - [x] index.less
            - [x] index.md
            - [x] index.ts
            - [x] Item.vue
            - [x] List.vue 
        - [x] **Charts**
            - [x] Bar.vue
            - [x] chart.less
            - [x] ChartCard.vue
            - [x] Liquid.vue
            - [x] MiniArea.vue
            - [x] MiniBar.vue
            - [x] MiniProgress.vue
            - [x] MiniSmoothArea.vue
            - [x] Radar.vue
            - [x] RankList.vue
            - [x] smooth.area.less
            - [x] TagCloud.vue
            - [x] TransferBar.vue
            - [x] Trend.vue
        - [x] **CountDown**
            - [x] CountDown.vue
            - [x] index.md
            - [x] index.ts
        - [x] **DescriptionList**
            - [x] DescriptionList.vue
            - [x] DescriptionListItem.vue
            - [x] index.ts
        - [x] **Editor**
            - [x] QuillEditor.vue
            - [x] WangEditor.vue
        - [x] **Ellipsis**
            - [x] Ellipsis.vue
            - [x] index.md
            - [x] index.ts
        - [x] **Exception**
            - [x] ExceptionPage.vue
            - [x] index.ts
            - [x] type.ts
        - [x] **FooterToolbar**
            - [x] FooterToolBar.vue
            - [x] index.less
            - [x] index.md
            - [x] index.ts
        - [x] **GlobalFooter**
            - [x] GlobalFooter.vue
            - [x] index.ts
        - [x] **GlobalHeader**
            - [x] GlobalHeader.vue
            - [x] index.ts
        - [x] **IconSelector**
            - [x] icons.ts
            - [x] IconSelector.vue
            - [x] index.ts
            - [x] README.md
        - [x] **Menu**
            - [x] index.ts
            - [x] menu.render.tsx
            - [x] menu.tsx
            - [x] SideMenu.vue 
        - [x] **MultiTab**
            - [x] events.ts
            - [x] index.less
            - [x] index.ts
            - [x] MultiTab.vue
            - [x] multiTabs.ts
        - [x] **NoticeIcon**
            - [x] index.ts
            - [x] NoticeIcon.vue
        - [x] **NProgress**
            - [x] nprogress.less
        - [x] **NumberInfo**
            - [x] index.less
            - [x] index.md
            - [x] index.ts
            - [x] NumberInfo.vue   
        - [x] **PageHeader**
            - [x] index.ts
            - [x] PageHeader.vue 
        - [x] **PageLoading**
            - [x] index.ts
            - [x] LoadingPlugin.tsx
            - [x] PageLoading.tsx
        - [x] **Result**
            - [x] index.ts
            - [x] Result.vue
        - [x] **Search**
            - [x] GlobalSearch.tsx
            - [x] index.less
            - [x] index.ts
        - [x] **SettingDrawer**
            - [x] index.ts
            - [x] settingConfig.ts
            - [x] SettingDrawer.vue
            - [x] SettingItem.vue
            - [x] themeColor.ts  
        - [x] **StandardFormRow**
            - [x] index.ts
            - [x] StandardFormRow.vue
        - [x] **Table**
            - [x] index.ts
            - [x] README.md
            - [x] Table.tsx
        - [x] **TagSelect**
            - [x] index.ts
            - [x] TagSelect.tsx
            - [x] TagSelectOption.tsx
        - [x] **TextArea**
            - [x] index.ts
            - [x] style.less
            - [x] TextArea.tsx
        - [x] **tools**
            - [x] Breadcrumb.vue
            - [x] DetailList.vue
            - [x] HeadInfo.vue
            - [x] index.ts
            - [x] LangSelect.vue
            - [x] Logo.vue
            - [x] TwoStepCaptcha.vue
            - [x] UserMenu.vue
        - [x] **Tree**
            - [x] Tree.tsx
        - [x] **Trend**
            - [x] index.less
            - [x] index.md
            - [x] index.ts
            - [x] Trend.vue         
    - [x] **config**
        - [x] defaultSettings.ts
    - [x] **core**
        - [x] bootstrap.ts
        - [x] icons.ts
        - [x] lazy_use.ts
        - [x] use.ts
        - [x] **directives**
            - [x] action.ts
        - [x] **lazy_lib**
            - [x] components_use.ts
    - [x] **interfaces**
        - [x] router-interface.ts
        - [x] service-interface.ts
        - [x] store-interface.ts
    - [x] **layouts**
        - [x] BasicLayout.vue
        - [x] BlankLayout.vue
        - [x] index.ts
        - [x] PageView.vue
        - [x] RouteView.vue
        - [x] UserLayout.vue
    - [ ] **mock**
        - [ ] index.js
        - [ ] util.js
        - [ ] services
            - [ ] article.js
            - [ ] auth.js
            - [ ] manage.js
            - [ ] other.js
            - [ ] tagCloud.js
            - [ ] user.js   
    - [x] **router**
        - [x] async-router-map.ts
        - [x] generator-routers.ts
        - [x] index.ts
        - [x] README.md
    - [x] **shared**
        - [x] **mixins**
            - [x] app-device-enquire.ts
            - [x] mixin-device.ts
            - [x] mixin.ts
    - [x] **store**
        - [x] getters.ts
        - [x] index.ts
        - [x] mutation-types.ts
        - [x] **modules**
            - [x] app.ts
            - [x] async-router.ts
            - [x] permission.ts
            - [x] user.ts
    - [x] **utils**
        - [x] axios.ts
        - [x] device.ts
        - [x] domUtil.ts
        - [x] filter.ts
        - [x] permissions.ts
        - [x] request.ts
        - [x] util.ts
        - [x] utils.less
        - [x] vue-plugins.ts
        - [x] **helper**
            - [x] permission.ts         
    - [x] **views**
        - [x] 404.vue
        - [x] Home.vue
        - [x] **account**
            - [x] Login.vue
            - [x] Register.vue
            - [x] RegisterResult.vue   
        - [x] **dashboard**
            - [x] Analysis.vue
            - [x] Monitor.vue
            - [x] TestWork.vue
            - [x] Workplace.vue
        - [x] **exception**
            - [x] 403.vue
            - [x] 404.vue
            - [x] 500.vue
        - [x] **form**
            - [x] BasicForm.vue
            - [x] **advancedForm**
                - [x] AdvancedForm.vue
                - [x] RepositoryForm.vue
                - [x] TaskForm.vue     
            - [x] **stepForm**
                - [x] Step1.vue
                - [x] Step2.vue
                - [x] Step3.vue
                - [x] StepForm.vue         
        - [x] **list**
            - [x] CardList.vue
            - [x] QueryList.vue
            - [x] StandardList.vue
            - [x] TableList.vue
            - [x] **modules**
                - [x] CreateForm.vue
                - [x] StepByStepModal.vue
                - [x] TaskForm.vue   
            - [x] **search**
                - [x] Applications.vue
                - [x] Article.vue
                - [x] Projects.vue
                - [x] SearchLayout.vue 
                - [x] **components**
                    - [x] CardInfo.vue
                    - [x] IconText.vue       
            - [x] **table**
                - [x] Edit.vue
                - [x] List.vue        
        - [x] **other**
            - [x] IconSelectorView.vue
            - [x] PermissionList.vue
            - [x] RoleList.vue
            - [x] TableInnerEditList.vue
            - [x] TreeList.vue
            - [x] UserList.vue
            - [x] **modules**
                - [x] OrgModal.vue
                - [x] RoleModal.vue        
        - [x] **personal**
            - [x] **center**
                - [x] Index.vue 
                - [x] **page**
                    - [x] App.vue
                    - [x] Article.vue
                    - [x] Project.vue        
            - [x] **settings**
                - [x] AvatarModal.vue
                - [x] BaseSetting.vue
                - [x] Binding.vue
                - [x] Custom.vue
                - [x] Index.vue
                - [x] Notification.vue
                - [x] Security.vue
        - [x] **profile**
            - [x] **advanced**
                - [x] Advanced.vue
            - [x] **basic**
                - [x] Index.vue
        - [x] **result**
            - [x] Error.vue
            - [x] Success.vue
        - [x] **role**
                RoleList.vue

## 优化

> import { Component, Prop, Vue } from 'vue-property-decorator'

> import Vue from 'vue'

>import Component from 'vue-class-component'

> any

```
import MultiTabs from '@/components/NoticeIcon'
import MultiTabs from '@/components/MultiTab/multiTabs'
import LoadingPlugin from '@/components/PageLoading/LoadingPlugin'
import GlobalSearch from '@/components/Search'
import SideMenu from '@/components/Menu/SideMenu.vue'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalFooter from '@/components/GlobalFooter'
import SettingDrawer from '@/components/SettingDrawer'
import PageHeader from '@/components/PageHeader'
import FooterToolBar from '@/components/FooterToolbar'
import Trend from '@/components/Trend'
import AvatarList from '@/components/AvatarList'
import CountDown from '@/components/CountDown/CountDown.vue'
import Ellipsis from '@/components/Ellipsis'
import NumberInfo from '@/components/NumberInfo'
import IconSelector from '@/components/IconSelector'
import STree from '@/components/Tree/Tree'
import { colorList } from '@/components/SettingDrawer/settingConfig'
```

## 生命周期

```
beforeCreate() {
  console.log('===================== beforeCreate =================================')
  console.error(this)
}

created() {
  console.log('===================== created =================================')
  console.error(this)
}

beforeMount() {
  console.log('===================== beforeMount =================================')
  console.error(this)
}

mounted() {
  console.log('===================== mounted =================================')
  console.error(this)
}

beforeUpdate() {
  console.log('===================== beforeUpdate =================================')
  console.error(this)
}

updated() {
  console.log('===================== updated =================================')
  console.error(this)
}

beforeDestroy () {
  console.log('===================== beforeDestroy =================================')
  console.error(this)
}

destroyed () {
  console.log('===================== destroyed =================================')
  console.error(this)
}
```
