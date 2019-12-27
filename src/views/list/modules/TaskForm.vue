<template>
  <a-modal :width="640" :visible="visible" title="任务添加" @ok="handleSubmit" @cancel="visible = false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item label="任务名称" :labelCol="labelCol" :wrapper-col="wrapperCol">
        <a-input v-decorator="['taskName', { rules: [{ required: true, message: '请输入任务名称' }] }]" />
      </a-form-item>
      <a-form-item label="开始时间" :labelCol="labelCol" :wrapper-col="wrapperCol">
        <a-date-picker
          style="width: 100%"
          v-decorator="['startTime', { rules: [{ required: true, message: '请选择开始时间' }] }]"
        />
      </a-form-item>
      <a-form-item label="任务负责人" :labelCol="labelCol" :wrapper-col="wrapperCol">
        <a-select v-decorator="['owner', { rules: [{ required: true, message: '请选择开始时间' }] }]">
          <a-select-option :value="0">
            付晓晓
          </a-select-option>
          <a-select-option :value="1">
            周毛毛
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="产品描述" :labelCol="labelCol" :wrapper-col="wrapperCol">
        <a-textarea v-decorator="['desc']" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'TaskForm',
  components: {}
})
export default class TaskForm extends Vue {
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
  edit(record: any) {
    const {
      form: { setFieldsValue }
    } = this
    this.visible = true
    this.$nextTick(() => {
      setFieldsValue({ taskName: 'test' })
    })
  }
  handleSubmit() {
    const {
      form: { validateFields }
    } = this
    this.visible = true
    validateFields((errors: any, values: any) => {
      if (!errors) {
        console.log('values', values)
      }
    })
  }
}
</script>
