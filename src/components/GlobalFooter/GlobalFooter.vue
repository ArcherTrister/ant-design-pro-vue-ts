<template>
  <div class="footer">
    <div class="links">
      <a href="https://pro.lxking.cn/" target="_blank">Pro 首页</a>
      <a href="https://github.com/ArcherTrister/ant-design-pro-vue-ts" target="_blank">
        <a-icon type="github" />
      </a>
      <a href="https://ant.design/">Ant Design</a>
      <a href="https://vue.ant.design/">Vue Antd</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" /> 2018 <span>ArcherTrister出品</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'GlobalFooter',
  components: {}
})
export default class GlobalFooterComponent extends Vue {
  constructor() {
    super()
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
