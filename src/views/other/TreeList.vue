<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">
        <s-tree
          :data-source="orgTree"
          :open-keys.sync="openKeys"
          :search="true"
          @click="handleClick"
          @add="handleAdd"
          @titleClick="handleTitleClick"
        />
      </a-col>
      <a-col :span="19">
        <s-table
          ref="table"
          size="default"
          :columns="columns"
          :data="loadData"
          :alert="false"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
        >
          <span slot="action" slot-scope="text, record">
            <template v-if="$auth('table.update')">
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
            </template>
            <a-dropdown>
              <a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">详情</a>
                </a-menu-item>
                <a-menu-item v-if="$auth('table.disable')">
                  <a href="javascript:;">禁用</a>
                </a-menu-item>
                <a-menu-item v-if="$auth('table.delete')">
                  <a href="javascript:;">删除</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </s-table>
      </a-col>
    </a-row>

    <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" />
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import OrgModal from './modules/OrgModal.vue'
import { getOrgTree, getServiceList } from '@/api/manage'

@Component({
  name: 'TreeList',
  components: {
    STable,
    STree,
    OrgModal
  }
})
export default class TreeList extends Vue {
  // data() {
  private openKeys: string[] = ['key-01']
  // 查询参数
  private queryParam: object = {}
  // 表头
  private columns: any[] = [
    {
      title: '#',
      dataIndex: 'no'
    },
    {
      title: '成员名称',
      dataIndex: 'description'
    },
    {
      title: '登录次数',
      dataIndex: 'callNo',
      sorter: true,
      needTotal: true,
      customRender: (text: number) => text + ' 次'
    },
    {
      title: '状态',
      dataIndex: 'status',
      needTotal: true
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      sorter: true
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '150px',
      scopedSlots: { customRender: 'action' }
    }
  ]
  // 加载数据方法 必须为 Promise 对象
  private loadData: any = (parameter: any) => {
    return getServiceList(Object.assign(parameter, this.queryParam)).then((res: any) => {
      return res.result
    })
  }
  private orgTree: any[] = []
  private selectedRowKeys: any[] = []
  private selectedRows: any[] = []

  constructor() {
    super()
  }

  created() {
    getOrgTree(null).then((res: any) => {
      this.orgTree = res.result
    })
  }
  // methods
  handleClick(e: any) {
    console.log('handleClick', e)
    this.queryParam = {
      key: e.key
    }
    ;(this.$refs.table as any).refresh(true)
  }
  handleAdd(item: any) {
    console.log('add button, item', item)
    this.$message.info(`提示：你点了 ${item.key} - ${item.title} `)
    ;(this.$refs.modal as any).add(item.key)
  }
  handleTitleClick(item: any) {
    console.log('handleTitleClick', item)
  }
  titleClick(e: any) {
    console.log('titleClick', e)
  }
  handleSaveOk() {}
  handleSaveClose() {}

  onSelectChange(selectedRowKeys: any, selectedRows: any) {
    this.selectedRowKeys = selectedRowKeys
    this.selectedRows = selectedRows
  }
}
</script>

<style lang="less">
.custom-tree {
  /deep/ .ant-menu-item-group-title {
    position: relative;
    &:hover {
      .btn {
        display: block;
      }
    }
  }

  /deep/ .ant-menu-item {
    &:hover {
      .btn {
        display: block;
      }
    }
  }

  /deep/ .btn {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    width: 20px;
    height: 40px;
    line-height: 40px;
    z-index: 1050;

    &:hover {
      transform: scale(1.2);
      transition: 0.5s all;
    }
  }
}
</style>
