English | [简体中文](./README.zh-CN.md)

<h1 align="center">Ant Design Pro Vue With TypeScript</h1>
<div align="center">
An out-of-box UI solution for enterprise applications as a Vue boilerplate. based on  <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/" target="_blank">Ant Design of Vue</a>
</div>
<div align="center">
Modified from <a href="https://github.com/sendya/ant-design-pro-vue/" target="_blank">Ant Design Pro Vue</a>
</div>

## <a id="01"/>Introduction

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

## <a id="02"/>Project development progress

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

## Optimize

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

## Lifecycle

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