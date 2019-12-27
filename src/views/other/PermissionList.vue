<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="角色ID">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="状态">
              <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">
                  全部
                </a-select-option>
                <a-select-option value="1">
                  关闭
                </a-select-option>
                <a-select-option value="2">
                  运行中
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table :columns="columns" :data="loadData">
      <span slot="actions" slot-scope="text, record">
        <a-tag v-for="(action, index) in record.actionList" :key="index">{{ action.describe }}</a-tag>
      </span>

      <span slot="status" slot-scope="text">
        {{ text | statusFilter }}
      </span>

      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">详情</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">禁用</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>

    <a-modal title="操作" :width="800" v-model="visible" @ok="handleOk">
      <a-form
        :auto-form-create="
          form => {
            this.form = form
          }
        "
      >
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="唯一识别码"
          has-feedback
          validate-status="success"
        >
          <a-input placeholder="唯一识别码" v-model="mdl.id" id="no" disabled="disabled" />
        </a-form-item>

        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="权限名称"
          has-feedback
          validate-status="success"
        >
          <a-input placeholder="起一个名字" v-model="mdl.name" id="permission_name" />
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapperCol="wrapperCol" label="状态" has-feedback validate-status="warning">
          <a-select v-model="mdl.status">
            <a-select-option value="1">
              正常
            </a-select-option>
            <a-select-option value="2">
              禁用
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapperCol="wrapperCol" label="描述" has-feedback>
          <a-textarea :rows="5" v-model="mdl.describe" placeholder="..." id="describe" />
        </a-form-item>

        <a-divider />

        <a-form-item :label-col="labelCol" :wrapperCol="wrapperCol" label="赋予权限" has-feedback>
          <a-select style="width: 100%" mode="multiple" v-model="mdl.actions" :allow-clear="true">
            <a-select-option v-for="(action, index) in permissionList" :key="index" :value="action.value">
              {{ action.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { STable } from '@/components'

@Component({
  name: 'PermissionList',
  filters: {
    statusFilter(status: number) {
      const statusMap: any = {
        1: '正常',
        2: '禁用'
      }
      return statusMap[status]
    }
  },
  components: { STable }
})
export default class PermissionList extends Vue {
  //data() {

  private description: string =
    '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。'

  private visible: boolean = false
  private labelCol: object = {
    xs: { span: 24 },
    sm: { span: 5 }
  }
  private wrapperCol: object = {
    xs: { span: 24 },
    sm: { span: 16 }
  }
  private form: any = null
  private mdl: object = {}

  // 高级搜索 展开/关闭
  private advanced: boolean = false
  // 查询参数
  private queryParam: object = {}
  // 表头
  private columns: any[] = [
    {
      title: '唯一识别码',
      dataIndex: 'id'
    },
    {
      title: '权限名称',
      dataIndex: 'name'
    },
    {
      title: '可操作权限',
      dataIndex: 'actions',
      scopedSlots: { customRender: 'actions' }
    },
    {
      title: '状态',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' }
    },
    {
      title: '操作',
      width: '150px',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' }
    }
  ]
  // 向后端拉取可以用的操作列表
  private permissionList: any[] = []
  // 加载数据方法 必须为 Promise 对象
  private loadData: any = (parameter: any) => {
    return this.$http
      .get('/permission', {
        params: Object.assign(parameter, this.queryParam)
      })
      .then((res: any) => {
        const result = res.result
        result.data.map((permission: any) => {
          permission.actionList = JSON.parse(permission.actionData)
          return permission
        })
        return result
      })
  }

  private selectedRowKeys: any[] = []
  private selectedRows: any[] = []

  constructor() {
    super()
  }

  created() {
    this.loadPermissionList()
  }

  //methods
  loadPermissionList() {
    // permissionList
    new Promise((resolve: any) => {
      const data = [
        { label: '新增', value: 'add', defaultChecked: false },
        { label: '查询', value: 'get', defaultChecked: false },
        { label: '修改', value: 'update', defaultChecked: false },
        { label: '列表', value: 'query', defaultChecked: false },
        { label: '删除', value: 'delete', defaultChecked: false },
        { label: '导入', value: 'import', defaultChecked: false },
        { label: '导出', value: 'export', defaultChecked: false }
      ]
      setTimeout(resolve(data), 1500)
    }).then((res: any) => {
      this.permissionList = res
    })
  }
  handleEdit(record: any) {
    this.mdl = Object.assign({}, record)
    console.log(this.mdl)
    this.visible = true
  }
  handleOk() {}
  onChange(selectedRowKeys: any, selectedRows: any) {
    this.selectedRowKeys = selectedRowKeys
    this.selectedRows = selectedRows
  }
  toggleAdvanced() {
    this.advanced = !this.advanced
  }

  // watch: {
  //   /*
  //     'selectedRows': function (selectedRows) {
  //       this.needTotalList = this.needTotalList.map(item => {
  //         return {
  //           ...item,
  //           total: selectedRows.reduce( (sum, val) => {
  //             return sum + val[item.dataIndex]
  //           }, 0)
  //         }
  //       })
  //     }
  //     */
  // }
}
</script>
