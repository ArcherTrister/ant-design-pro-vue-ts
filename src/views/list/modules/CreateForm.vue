<template>
  <a-modal
    title="新建规则"
    :width="640"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="描述" :labelCol="labelCol" :wrapper-col="wrapperCol">
          <a-input
            v-decorator="[
              'desc',
              {
                rules: [
                  {
                    required: true,
                    min: 5,
                    message: '请输入至少五个字符的规则描述！'
                  }
                ]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'CreateForm',
  components: {}
})
export default class CreateForm extends Vue {
  // data
  private labelCol: any = {
    xs: { span: 24 },
    sm: { span: 7 }
  }
  private wrapperCol: any = {
    xs: { span: 24 },
    sm: { span: 13 }
  }
  private visible: boolean = false
  private confirmLoading: boolean = false
  private form: any

  constructor() {
    super()
  }

  beforeCreate() {
    this.form = this.$form.createForm(this)
  }

  // methods
  add() {
    this.visible = true
  }
  handleSubmit() {
    const {
      form: { validateFields }
    } = this
    this.confirmLoading = true
    validateFields((errors: any, values: any) => {
      if (!errors) {
        console.log('values', values)
        setTimeout(() => {
          this.visible = false
          this.confirmLoading = false
          this.$emit('ok', values)
        }, 1500)
      } else {
        this.confirmLoading = false
      }
    })
  }
  handleCancel() {
    this.visible = false
  }
}
</script>
