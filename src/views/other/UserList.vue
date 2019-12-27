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

    <s-table size="default" :columns="columns" :data="loadData">
      <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
        <a-row :gutter="24" :style="{ marginBottom: '12px' }">
          <a-col :span="12" v-for="(role, index) in record.permissions" :key="index" :style="{ marginBottom: '12px' }">
            <a-col :lg="4" :md="24">
              <span>{{ role.permissionName }}：</span>
            </a-col>
            <a-col :lg="20" :md="24" v-if="role.actionEntitySet.length > 0">
              <a-tag color="cyan" v-for="(action, k) in role.actionEntitySet" :key="k">
                {{ action.describe }}
              </a-tag>
            </a-col>
            <a-col :span="20" v-else>
              -
            </a-col>
          </a-col>
        </a-row>
      </div>
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

    <a-modal title="操作" style="top: 20px;" :width="800" v-model="visible" @ok="handleOk">
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
          label="角色名称"
          has-feedback
          validate-status="success"
        >
          <a-input placeholder="起一个名字" v-model="mdl.name" id="role_name" />
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

        <a-form-item :label-col="labelCol" :wrapperCol="wrapperCol" label="拥有权限" has-feedback>
          <a-row :gutter="16" v-for="(permission, index) in mdl.permissions" :key="index">
            <a-col :span="4"> {{ permission.permissionName }}： </a-col>
            <a-col :span="20">
              <a-checkbox-group :options="permission.actionsOptions" />
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { STable } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'

@Component({
  name: 'UserList',
  components: {
    STable
  }
})
export default class UserList extends Vue {
  //data

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
  private mdl: any = {}

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
      title: '角色名称',
      dataIndex: 'name'
    },
    {
      title: '状态',
      dataIndex: 'status'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true
    },
    {
      title: '操作',
      width: '150px',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' }
    }
  ]
  // 加载数据方法 必须为 Promise 对象
  private loadData: any = (parameter: any) => {
    return getRoleList(parameter).then((res: any) => {
      console.log('getRoleList', res)
      return res.result
    })
  }

  private selectedRowKeys: any[] = []
  private selectedRows: any[] = []

  constructor() {
    super()
  }

  created() {
    getServiceList(null).then((res: any) => {
      console.log('getServiceList.call()', res)
    })

    getRoleList(null).then((res: any) => {
      console.log('getRoleList.call()', res)
    })
  }

  // methods
  handleEdit(record: any) {
    this.mdl = Object.assign({}, record)

    this.mdl.permissions.forEach((permission: any) => {
      permission.actionsOptions = permission.actionEntitySet.map((action: any) => {
        return {
          label: action.describe,
          value: action.action,
          defaultCheck: action.defaultCheck
        }
      })
    })

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
