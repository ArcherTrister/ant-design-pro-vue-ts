<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="规则编号"
        has-feedback
        validate-status="success"
      >
        <a-input
          placeholder="规则编号"
          v-decorator="['no', { rules: [{ required: true, message: '请输入规则编号' }] }]"
          :disabled="true"
        />
      </a-form-item>

      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="服务调用次数"
        has-feedback
        validate-status="success"
      >
        <a-input-number :min="1" style="width: 100%" v-decorator="['callNo', { rules: [{ required: true }] }]" />
      </a-form-item>

      <a-form-item :label-col="labelCol" :wrapperCol="wrapperCol" label="状态" has-feedback validate-status="warning">
        <a-select
          v-decorator="[
            'status',
            {
              rules: [{ required: true, message: '请选择状态' }],
              initialValue: '1'
            }
          ]"
        >
          <a-select-option :value="1">
            Option 1
          </a-select-option>
          <a-select-option :value="2">
            Option 2
          </a-select-option>
          <a-select-option :value="3">
            Option 3
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :label-col="labelCol" :wrapperCol="wrapperCol" label="描述" has-feedback help="请填写一段描述">
        <a-textarea :rows="5" placeholder="..." v-decorator="['description', { rules: [{ required: true }] }]" />
      </a-form-item>

      <a-form-item :label-col="labelCol" :wrapperCol="wrapperCol" label="更新时间" has-feedback validate-status="error">
        <a-date-picker
          style="width: 100%"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Select Time"
          v-decorator="['updatedAt']"
        />
      </a-form-item>

      <a-form-item v-bind="buttonCol">
        <a-row>
          <a-col span="6">
            <a-button type="primary" html-type="submit">
              提交
            </a-button>
          </a-col>
          <a-col span="10">
            <a-button @click="handleGoBack">
              返回
            </a-button>
          </a-col>
          <a-col span="8" />
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import moment from 'moment'
import pick from 'lodash.pick'

@Component({
  name: 'TableEdit',
  components: {}
})
export default class TableEdit extends Vue {
  // props
  @Prop({
    type: [Object, String],
    default: ''
  })
  private record!: any

  // data
  private labelCol: any = {
    xs: { span: 24 },
    sm: { span: 5 }
  }
  private wrapperCol: any = {
    xs: { span: 24 },
    sm: { span: 12 }
  }
  private buttonCol: any = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12, offset: 5 }
    }
  }
  private form: any
  private id: number = 0

  constructor() {
    super()
  }

  beforeCreate() {
    this.form = this.$form.createForm(this)
  }

  mounted() {
    this.$nextTick(() => {
      this.loadEditInfo(this.record)
    })
  }

  // methods
  handleGoBack() {
    this.$emit('onGoBack')
  }
  handleSubmit() {
    const {
      form: { validateFields }
    } = this
    validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }
  handleGetInfo() {}
  loadEditInfo(data: any) {
    const { form } = this
    // ajax
    console.log(`将加载 ${this.id} 信息到表单`)
    new Promise(resolve => {
      setTimeout(resolve, 1500)
    }).then(() => {
      const formData = pick(data, ['no', 'callNo', 'status', 'description', 'updatedAt'])
      formData.updatedAt = moment(data.updatedAt)
      console.log('formData', formData)
      form.setFieldsValue(formData)
    })
  }
}
</script>
