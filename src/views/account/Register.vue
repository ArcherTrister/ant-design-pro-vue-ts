<template>
  <div class="main user-layout-register">
    <h3><span>注册</span></h3>
    <a-form ref="formRegister" :form="form" id="formRegister">
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="邮箱"
          v-decorator="[
            'email',
            {
              rules: [{ required: true, type: 'email', message: '请输入邮箱地址' }],
              validateTrigger: ['change', 'blur']
            }
          ]"
        />
      </a-form-item>

      <a-popover
        placement="rightTop"
        :trigger="['focus']"
        :get-popup-container="trigger => trigger.parentElement"
        v-model="state.passwordLevelChecked"
      >
        <template slot="content">
          <div :style="{ width: '240px' }">
            <div :class="['user-register', passwordLevelClass]">
              强度：<span>{{ passwordLevelName }}</span>
            </div>
            <a-progress :percent="state.percent" :showInfo="false" :stroke-color="passwordLevelColor" />
            <div style="margin-top: 10px;">
              <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
            </div>
          </div>
        </template>
        <a-form-item>
          <a-input
            size="large"
            type="password"
            @click="handlePasswordInputClick"
            autocomplete="false"
            placeholder="至少6位密码，区分大小写"
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: '至少6位密码，区分大小写' },
                  { validator: this.handlePasswordLevel }
                ],
                validateTrigger: ['change', 'blur']
              }
            ]"
          />
        </a-form-item>
      </a-popover>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="确认密码"
          v-decorator="[
            'password2',
            {
              rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordCheck }],
              validateTrigger: ['change', 'blur']
            }
          ]"
        />
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          placeholder="11 位手机号"
          v-decorator="[
            'mobile',
            {
              rules: [
                {
                  required: true,
                  message: '请输入正确的手机号',
                  pattern: /^1[3456789]\d{9}$/
                },
                { validator: this.handlePhoneCheck }
              ],
              validateTrigger: ['change', 'blur']
            }
          ]"
        >
          <a-select slot="addonBefore" size="large" default-value="+86">
            <a-select-option value="+86">
              +86
            </a-select-option>
            <a-select-option value="+87">
              +87
            </a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <!--<a-input-group size="large" compact>
            <a-select style="width: 20%" size="large" defaultValue="+86">
              <a-select-option value="+86">+86</a-select-option>
              <a-select-option value="+87">+87</a-select-option>
            </a-select>
            <a-input style="width: 80%" size="large" placeholder="11 位手机号"></a-input>
          </a-input-group>-->

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="验证码"
              v-decorator="[
                'captcha',
                {
                  rules: [{ required: true, message: '请输入验证码' }],
                  validateTrigger: 'blur'
                }
              ]"
            >
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <a-button
            class="getCaptcha"
            size="large"
            :disabled="state.smsSendBtn"
            @click.stop.prevent="getCaptcha"
            v-text="(!state.smsSendBtn && '获取验证码') || state.time + ' s'"
          />
        </a-col>
      </a-row>

      <a-form-item>
        <a-button
          size="large"
          type="primary"
          html-type="submit"
          class="register-button"
          :loading="registerBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="registerBtn"
        >
          注册
        </a-button>
        <router-link class="login" :to="{ name: 'login' }">
          使用已有账户登录
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import MixinDevice from '@/shared/mixins/mixin-device'
import { getSmsCaptcha } from '@/api/login'
import { RegisterState } from '@/interfaces/service-interface'

const levelNames: any = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
}
const levelClass: any = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor: any = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}

@Component({
  components: {}
})
export default class Register extends MixinDevice {
  private form: any
  private state: RegisterState = {
    time: 60,
    smsSendBtn: false,
    passwordLevel: 0,
    passwordLevelChecked: false,
    percent: 10,
    progressColor: '#FF0000'
  }
  private registerBtn: boolean = false

  constructor() {
    super()
  }

  beforeCreate() {
    this.form = this.$form.createForm(this)
  }

  // computed
  public get passwordLevelClass() {
    return levelClass[this.state.passwordLevel]
  }
  public get passwordLevelName() {
    return levelNames[this.state.passwordLevel]
  }
  public get passwordLevelColor() {
    return levelColor[this.state.passwordLevel]
  }

  // methods
  private handlePasswordLevel(rule: any, value: any, callback: Function) {
    let level = 0

    // 判断这个字符串中有没有数字
    if (/[0-9]/.test(value)) {
      level++
    }
    // 判断字符串中有没有字母
    if (/[a-zA-Z]/.test(value)) {
      level++
    }
    // 判断字符串中有没有特殊符号
    if (/[^0-9a-zA-Z_]/.test(value)) {
      level++
    }
    this.state.passwordLevel = level
    this.state.percent = level * 30
    if (level >= 2) {
      if (level >= 3) {
        this.state.percent = 100
      }
      callback()
    } else {
      if (level === 0) {
        this.state.percent = 10
      }
      callback(new Error('密码强度不够'))
    }
  }

  private handlePasswordCheck(rule: any, value: string, callback: Function) {
    const password = this.form.getFieldValue('password')
    console.log('value', value)
    if (value === undefined) {
      callback(new Error('请输入密码'))
    }
    if (value && password && value.trim() !== password.trim()) {
      callback(new Error('两次密码不一致'))
    }
    callback()
  }

  // TODO: callback: () => void
  private handlePhoneCheck(rule: any, value: number, callback: Function) {
    console.log('handlePhoneCheck, rule:', rule)
    console.log('handlePhoneCheck, value', value)
    console.log('handlePhoneCheck, callback', callback)

    callback()
  }

  private handlePasswordInputClick() {
    if (!this.isMobile()) {
      this.state.passwordLevelChecked = true
      return
    }
    this.state.passwordLevelChecked = false
  }

  private handleSubmit() {
    const {
      form: { validateFields },
      state,
      $router
    } = this
    validateFields({ force: true }, (err: any, values: any) => {
      if (!err) {
        state.passwordLevelChecked = false
        $router.push({ name: 'registerResult', params: { ...values } })
      }
    })
  }

  private getCaptcha(e: Event) {
    e.preventDefault()
    const {
      form: { validateFields },
      state,
      $message,
      $notification
    } = this

    validateFields(['mobile'], { force: true }, (err: any, values: any) => {
      if (!err) {
        state.smsSendBtn = true

        const interval = window.setInterval(() => {
          if (state.time-- <= 0) {
            state.time = 60
            state.smsSendBtn = false
            window.clearInterval(interval)
          }
        }, 1000)

        const hide: Promise<any> = $message.loading('验证码发送中..', 0)

        getSmsCaptcha({ mobile: values.mobile })
          .then(res => {
            const reponse = res as any
            setTimeout(() => hide, 2500)
            $notification['success']({
              message: '提示',
              description: '验证码获取成功，您的验证码为：' + reponse.result.captcha,
              duration: 8
            })
          })
          .catch(err => {
            setTimeout(() => hide, 1)
            clearInterval(interval)
            state.time = 60
            state.smsSendBtn = false
            this.requestFailed(err)
          })
      }
    })
  }

  private requestFailed(err: any) {
    this.$notification['error']({
      message: '错误',
      description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
      duration: 4
    })
    this.registerBtn = false
  }

  // watch
  @Watch('state.passwordLevel')
  passwordLevelChange(val: number) {
    console.log(val)
  }
}
</script>
<style lang="less">
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}

.user-layout-register {
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
</style>
<style lang="less" scoped>
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 50%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
}
</style>
