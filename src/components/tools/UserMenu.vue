<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a href="https://pro.lxking.cn/docs/getting-started" target="_blank">
        <span class="action">
          <a-icon type="question-circle-o" />
        </span>
      </a>
      <notice-icon class="action" />
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar" />
          <span>{{ nickname }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <router-link :to="{ name: 'PersonalCenter' }">
              <a-icon type="user" />
              <span>个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'PersonalSettings' }">
              <a-icon type="setting" />
              <span>账户设置</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2" disabled>
            <a-icon type="setting" />
            <span>测试</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout" />
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import NoticeIcon from '@/components/NoticeIcon'

@Component({
  name: 'UserMenu',
  components: {
    NoticeIcon
  }
})
export default class UserMenuComponent extends Vue {
  // computed: {
  //   ...mapGetters(['nickname', 'avatar'])
  // },
  @Getter('nickname', { namespace: 'user' })
  private nickname!: string
  @Getter('avatar', { namespace: 'user' })
  private avatar!: string

  constructor() {
    super()
  }

  // methods
  // ...mapActions(['Logout']),
  @Action('Logout', { namespace: 'user' })
  Logout: any

  handleLogout() {
    this.$confirm({
      title: '提示',
      content: '真的要注销登录吗 ?',
      onOk: () => {
        return this.Logout({})
          .then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 16)
          })
          .catch((err: any) => {
            this.$message.error({
              title: '错误',
              description: err.message
            })
          })
      },
      onCancel() {}
    })
  }
}
</script>
