<template>
  <a-dropdown>
    <span class="action global-lang">
      <a-icon type="global" style="font-size: 16px" />
    </span>
    <a-menu slot="overlay" style="width: 150px;" @click="SwitchLang">
      <a-menu-item key="zh-CN">
        <a rel="noopener noreferrer"> <span role="img" aria-label="简体中文">🇨🇳</span> 简体中文 </a>
      </a-menu-item>
      <a-menu-item key="zh-TW">
        <a rel="noopener noreferrer"> <span role="img" aria-label="繁体中文">🇭🇰</span> 繁体中文 </a>
      </a-menu-item>
      <a-menu-item key="en-US">
        <a rel="noopener noreferrer"> <span role="img" aria-label="English">🇬🇧</span> English </a>
      </a-menu-item>
      <a-menu-item key="pt-BR">
        <a rel="noopener noreferrer"> <span role="img" aria-label="Português">🇧🇷</span> Português </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
// import { mixin as langMixin } from '@/store/i18n-mixin'

@Component({
  name: 'LangSelect',
  components: {}
})
export default class LangSelectComponent extends Vue {
  // name: 'LangSelect',
  // // mixins: [langMixin],
  // data() {
  //   return {}
  // },
  // methods
  //   // SwitchLang (row) {
  //   //   this.setLang(row.key)
  //   // }
  // }
  constructor() {
    super()
  }
}
</script>
