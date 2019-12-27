<template>
  <a-card :bordered="false">
    <component @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" :is="currentComponet" />
  </a-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ATextarea from 'ant-design-vue/es/input/TextArea'
import AInput from 'ant-design-vue/es/input/Input'
// 动态切换组件
import List from '@/views/list/table/List.vue'
import Edit from '@/views/list/table/Edit.vue'

@Component({
  name: 'TableListWrapper',
  components: {
    AInput,
    ATextarea,
    List,
    Edit
  }
})
export default class TableListWrapper extends Vue {
  //data
  private currentComponet: string = 'List'
  private record: string = ''

  constructor() {
    super()
  }

  // created() {}

  //methods
  handleEdit(record: string) {
    this.record = record || ''
    this.currentComponet = 'Edit'
    console.log(record)
  }
  handleGoBack() {
    this.record = ''
    this.currentComponet = 'List'
  }

  //watch
  @Watch('$route.path')
  routeChanged(val: any) {
    this.record = ''
    this.currentComponet = 'List'
  }
}
</script>
