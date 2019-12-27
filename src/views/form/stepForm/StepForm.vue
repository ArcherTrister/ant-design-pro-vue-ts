<template>
  <a-card :bordered="false">
    <a-steps class="steps" :current="currentTab">
      <a-step title="填写转账信息" />
      <a-step title="确认转账信息" />
      <a-step title="完成" />
    </a-steps>
    <div class="content">
      <step1 v-if="currentTab === 0" @nextStep="nextStep" />
      <step2 v-if="currentTab === 1" @nextStep="nextStep" @prevStep="prevStep" />
      <step3 v-if="currentTab === 2" @prevStep="prevStep" @finish="finish" />
    </div>
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'

@Component({
  name: 'StepForm',
  components: {
    Step1,
    Step2,
    Step3
  }
})
export default class StepForm extends Vue {
  // data
  private description: string = '将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。'
  private currentTab: number = 0
  // form
  private form: any = null

  constructor() {
    super()
  }

  // methods
  // handler
  nextStep() {
    if (this.currentTab < 2) {
      this.currentTab += 1
    }
  }
  prevStep() {
    if (this.currentTab > 0) {
      this.currentTab -= 1
    }
  }
  finish() {
    this.currentTab = 0
  }
}
</script>

<style lang="less" scoped>
.steps {
  max-width: 750px;
  margin: 16px auto;
}
</style>
