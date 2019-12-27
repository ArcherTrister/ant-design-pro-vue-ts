// import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
// import T from 'ant-design-vue/es/table/Table'
// import get from 'lodash.get'

// @Component({
//   name: 'Table',
//   components: {}
// })
// export default class TableComponent extends Vue {
//   @Prop({ type: [String, Function], default: 'key' })
//   private rowKey: any
//   @Prop({ type: Function, required: true })
//   private data!: Function
//   @Prop({ type: Number, default: 1 })
//   private pageNum!: number
//   @Prop({ type: Number, default: 10 })
//   private pageSize!: number
//   @Prop({ type: Boolean, default: true })
//   private showSizeChanger!: boolean
//   @Prop({ type: String, default: 'default' })
//   private size!: string
//   @Prop({ type: [Object, Boolean], default: null })
//   private alert: any
//   @Prop({ type: Object, default: null })
//   private rowSelection: any
//   @Prop({ type: Boolean, default: false })
//   private showAlertInfo!: boolean
//   @Prop({ type: String, default: 'auto' })
//   private showPagination!: string

//   /**
//    * enable page URI mode
//    *
//    * e.g:
//    * /users/1
//    * /users/2
//    * /users/3?queryParam=test
//    * ...
//    */
//   @Prop({ type: Boolean, default: false })
//   private pageURI!: boolean
//   // props: Object.assign({}, T.props, {

//   // }),

//   //data
//   private needTotalList: any[] = []
//   private selectedRows: any[] = []
//   private selectedRowKeys: any[] = []
//   private localLoading: boolean = false
//   private localDataSource: any[] = []
//   private localPagination: any = null

//   constructor() {
//     super()
//     console.warn('========= constructor T =================', T)
//     console.error('========= constructor this =================', this.$props)
//     // this.localPagination = Object.assign({}, this.$props)
//     // Object.assign({}, T.props,this.$props)
//   }

//   beforeCreate() {
//     console.warn('======================= beforeCreate ================================', this.$props)
//   }

//   created() {
//     console.warn('========= created T =================', T.props)
//     console.warn('======================= created this ================================', this.$props)
//     this.$props = Object.assign(T.props, this.$props) as Record<string, any>
//     this.localPagination = Object.assign(T.props, this.$props)
//     const { pageNo } = this.$route.params
//     const localPageNum = (this.$props.pageURI && pageNo && parseInt(pageNo)) || this.$props.pageNum
//     this.localPagination =
//       (['auto', true].includes(this.$props.showPagination) &&
//         Object.assign({}, this.localPagination, {
//           current: localPageNum,
//           pageSize: this.$props.pageSize,
//           showSizeChanger: this.$props.showSizeChanger
//         })) ||
//       false
//     console.log('this.localPagination', this.localPagination)
//     this.needTotalList = this.initTotalList(this.$props.columns)
//     this.loadData(this.localPagination)
//   }

//   //watch
//   @Watch('localPagination.current')
//   localPaginationCurrentChange(val: any) {
//     this.$props.pageURI &&
//       this.$router.push({
//         ...this.$route,
//         name: this.$route.name,
//         params: Object.assign({}, this.$route.params, {
//           pageNo: val
//         })
//       })
//   }

//   @Watch('pageNum')
//   pageNumChange(val: any) {
//     Object.assign(this.localPagination, {
//       current: val
//     })
//   }

//   @Watch('pageSize')
//   pageSizeChange(val: any) {
//     Object.assign(this.localPagination, {
//       pageSize: val
//     })
//   }

//   @Watch('showSizeChanger')
//   showSizeChangerChange(val: any) {
//     Object.assign(this.localPagination, {
//       showSizeChanger: val
//     })
//   }

//   // methods
//   /**
//    * 表格重新加载方法
//    * 如果参数为 true, 则强制刷新到第一页
//    * @param Boolean bool
//    */
//   refresh(bool = false) {
//     bool &&
//       (this.localPagination = Object.assign(
//         {},
//         {
//           current: 1,
//           pageSize: this.$props.pageSize
//         }
//       ))
//     this.loadData(this.localPagination)
//   }

//   /**
//    * 加载数据方法
//    * @param {Object} pagination 分页选项器
//    * @param {Object} filters 过滤条件
//    * @param {Object} sorter 排序条件
//    */
//   loadData(pagination: any, filters?: any, sorter?: any) {
//     console.warn('===============================================================', pagination)
//     this.localLoading = true
//     const parameter = Object.assign(
//       {
//         pageNo:
//           (pagination && pagination.current) ||
//           (this.$props.showPagination && this.localPagination.current) ||
//           this.$props.pageNum,
//         pageSize:
//           (pagination && pagination.pageSize) ||
//           (this.$props.showPagination && this.localPagination.pageSize) ||
//           this.$props.pageSize
//       },
//       (sorter &&
//         sorter.field && {
//           sortField: sorter.field
//         }) ||
//         {},
//       (sorter &&
//         sorter.order && {
//           sortOrder: sorter.order
//         }) ||
//         {},
//       {
//         ...filters
//       }
//     )
//     console.log('parameter', parameter)
//     const result = this.$props.data(parameter)
//     // 对接自己的通用数据接口需要修改下方代码中的 r.pageNo, r.totalCount, r.data
//     // eslint-disable-next-line
//       if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
//       result.then((r: any) => {
//         this.localPagination =
//           (this.$props.showPagination &&
//             Object.assign({}, this.localPagination, {
//               current: r.pageNo, // 返回结果中的当前分页数
//               total: r.totalCount, // 返回结果中的总记录数
//               showSizeChanger: this.$props.showSizeChanger,
//               pageSize: (pagination && pagination.pageSize) || this.localPagination.pageSize
//             })) ||
//           false
//         // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
//         if (r.data.length === 0 && this.$props.showPagination && this.localPagination.current > 1) {
//           this.localPagination.current--
//           this.loadData(pagination, filters, sorter)
//           return
//         }

//         // 这里用于判断接口是否有返回 r.totalCount 且 this.showPagination = true 且 pageNo 和 pageSize 存在 且 totalCount 小于等于 pageNo * pageSize 的大小
//         // 当情况满足时，表示数据不满足分页大小，关闭 table 分页功能
//         try {
//           if (
//             ['auto', true].includes(this.$props.showPagination) &&
//             r.totalCount <= r.pageNo * this.localPagination.pageSize
//           ) {
//             this.localPagination.hideOnSinglePage = true
//           }
//         } catch (e) {
//           this.localPagination = false
//         }
//         console.log('loadData -> this.localPagination', this.localPagination)
//         this.localDataSource = r.data // 返回结果中的数组数据
//         this.localLoading = false
//       })
//     }
//   }

//   initTotalList(columns: any): any[] {
//     const totalList: any[] = []
//     columns &&
//       columns instanceof Array &&
//       columns.forEach(column => {
//         if (column.needTotal) {
//           totalList.push({
//             ...column,
//             total: 0
//           })
//         }
//       })
//     return totalList
//   }

//   /**
//    * 用于更新已选中的列表数据 total 统计
//    * @param selectedRowKeys
//    * @param selectedRows
//    */
//   updateSelect(selectedRowKeys: any, selectedRows: any): void {
//     this.selectedRows = selectedRows
//     this.selectedRowKeys = selectedRowKeys
//     const list = this.needTotalList
//     this.needTotalList = list.map((item: any) => {
//       return {
//         ...item,
//         total: selectedRows.reduce((sum: any, val: any) => {
//           const total = sum + parseInt(get(val, item.dataIndex))
//           return isNaN(total) ? 0 : total
//         }, 0)
//       }
//     })
//   }

//   /**
//    * 清空 table 已选中项
//    */
//   clearSelected() {
//     if (this.$props.rowSelection) {
//       this.$props.rowSelection.onChange([], [])
//       this.updateSelect([], [])
//     }
//   }

//   /**
//    * 处理交给 table 使用者去处理 clear 事件时，内部选中统计同时调用
//    * @param callback
//    * @returns {*}
//    */
//   renderClear(callback: any) {
//     if (this.selectedRowKeys.length <= 0) return null
//     return (
//       <a
//         style="margin-left: 24px"
//         onClick={() => {
//           callback()
//           this.clearSelected()
//         }}
//       >
//         清空
//       </a>
//     )
//   }

//   renderAlert() {
//     // 绘制统计列数据
//     const needTotalItems = this.needTotalList.map((item: any) => {
//       return (
//         <span style="margin-right: 12px">
//           {item.title}总计{' '}
//           <a style="font-weight: 600">{!item.customRender ? item.total : item.customRender(item.total)}</a>
//         </span>
//       )
//     })

//     // 绘制 清空 按钮
//     const clearItem =
//       typeof this.$props.alert.clear === 'boolean' && this.$props.alert.clear
//         ? this.renderClear(this.clearSelected)
//         : this.$props.alert !== null && typeof this.$props.alert.clear === 'function'
//         ? this.renderClear(this.$props.alert.clear)
//         : null

//     // 绘制 alert 组件
//     return (
//       <a-alert showIcon={true} style="margin-bottom: 16px">
//         <template slot="message">
//           <span style="margin-right: 12px">
//             已选择: <a style="font-weight: 600">{this.selectedRows.length}</a>
//           </span>
//           {needTotalItems}
//           {clearItem}
//         </template>
//       </a-alert>
//     )
//   }

//   render() {
//     const props: any = {}
//     const localKeys = Object.keys(this.$data)
//     const showAlert =
//       (typeof this.$props.alert === 'object' &&
//         this.$props.alert !== null &&
//         this.$props.alert.show &&
//         typeof this.$props.rowSelection.selectedRowKeys !== 'undefined') ||
//       this.$props.alert

//     Object.keys(T.props).forEach(k => {
//       const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`
//       if (localKeys.includes(localKey)) {
//         props[k] = (this as any)[localKey]
//         return props[k]
//       }
//       if (k === 'rowSelection') {
//         if (showAlert && this.$props.rowSelection) {
//           // 如果需要使用alert，则重新绑定 rowSelection 事件
//           console.log('this.rowSelection', this.$props.rowSelection)
//           props[k] = {
//             ...this.$props.rowSelection,
//             selectedRows: this.selectedRows,
//             selectedRowKeys: this.selectedRowKeys,
//             onChange: (selectedRowKeys: any, selectedRows: any) => {
//               this.updateSelect(selectedRowKeys, selectedRows)
//               typeof (this as any)[k].onChange !== 'undefined' &&
//                 (this as any)[k].onChange(selectedRowKeys, selectedRows)
//             }
//           }
//           return props[k]
//         } else if (!this.$props.rowSelection) {
//           // 如果没打算开启 rowSelection 则清空默认的选择项
//           props[k] = null
//           return props[k]
//         }
//       }
//       ;(this as any)[k] && (props[k] = (this as any)[k])
//       return props[k]
//     })
//     const table = (
//       <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }} onChange={this.loadData}>
//         {Object.keys(this.$slots).map(name => (
//           <template slot={name}>{this.$slots[name]}</template>
//         ))}
//       </a-table>
//     )

//     return (
//       <div class="table-wrapper">
//         {showAlert ? this.renderAlert() : null}
//         {table}
//       </div>
//     )
//   }
// }

import Vue from 'vue'
import T from 'ant-design-vue/es/table/Table'
import get from 'lodash.get'

const TableComponent = Vue.extend({
  data() {
    return {
      needTotalList: new Array<any>(),
      selectedRows: [],
      selectedRowKeys: [],
      localLoading: false,
      localDataSource: [],
      localPagination: Object.assign({}, this.$props.pagination)
    }
  },
  props: Object.assign({}, T.props, {
    rowKey: {
      type: [String, Function],
      default: 'key'
    },
    data: {
      type: Function,
      required: true
    },
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    showSizeChanger: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'default'
    },
    /**
     * alert: {
     *   show: true,
     *   clear: Function
     * }
     */
    alert: {
      type: [Object, Boolean],
      default: null
    },
    rowSelection: {
      type: Object,
      default: null
    },
    /** @Deprecated */
    showAlertInfo: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: [String, Boolean],
      default: 'auto'
    },
    /**
     * enable page URI mode
     *
     * e.g:
     * /users/1
     * /users/2
     * /users/3?queryParam=test
     * ...
     */
    pageURI: {
      type: Boolean,
      default: false
    }
  }),
  watch: {
    'localPagination.current'(val) {
      this.$props.pageURI &&
        this.$router.push({
          ...this.$route,
          name: this.$route.name,
          params: Object.assign({}, this.$route.params, {
            pageNo: val
          })
        })
    },
    pageNum(val) {
      Object.assign(this.localPagination, {
        current: val
      })
    },
    pageSize(val) {
      Object.assign(this.localPagination, {
        pageSize: val
      })
    },
    showSizeChanger(val) {
      Object.assign(this.localPagination, {
        showSizeChanger: val
      })
    }
  },
  created() {
    const { pageNo } = this.$route.params
    const localPageNum = (this.$props.pageURI && pageNo && parseInt(pageNo)) || this.$props.pageNum
    this.localPagination =
      (['auto', true].includes(this.$props.showPagination) &&
        Object.assign({}, this.localPagination, {
          current: localPageNum,
          pageSize: this.$props.pageSize,
          showSizeChanger: this.$props.showSizeChanger
        })) ||
      false
    console.log('this.localPagination', this.localPagination)
    this.needTotalList = this.initTotalList(this.$props.columns)
    this.loadData(this.localPagination)
  },
  methods: {
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh(bool = false) {
      bool &&
        (this.localPagination = Object.assign(
          {},
          {
            current: 1,
            pageSize: this.$props.pageSize
          }
        ))
      this.loadData(this.localPagination)
    },
    /**
     * 加载数据方法
     * @param {Object} pagination 分页选项器
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    loadData(pagination: any, filters?: any, sorter?: any) {
      this.localLoading = true
      const parameter = Object.assign(
        {
          pageNo:
            (pagination && pagination.current) ||
            (this.$props.showPagination && this.localPagination.current) ||
            this.$props.pageNum,
          pageSize:
            (pagination && pagination.pageSize) ||
            (this.$props.showPagination && this.localPagination.pageSize) ||
            this.$props.pageSize
        },
        (sorter &&
          sorter.field && {
            sortField: sorter.field
          }) ||
          {},
        (sorter &&
          sorter.order && {
            sortOrder: sorter.order
          }) ||
          {},
        {
          ...filters
        }
      )
      console.log('parameter', parameter)
      const result = this.$props.data(parameter)
      // 对接自己的通用数据接口需要修改下方代码中的 r.pageNo, r.totalCount, r.data
      // eslint-disable-next-line
      if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
        result.then((r: any) => {
          this.localPagination =
            (this.$props.showPagination &&
              Object.assign({}, this.localPagination, {
                current: r.pageNo, // 返回结果中的当前分页数
                total: r.totalCount, // 返回结果中的总记录数
                showSizeChanger: this.$props.showSizeChanger,
                pageSize: (pagination && pagination.pageSize) || this.localPagination.pageSize
              })) ||
            false
          // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
          if (r.data.length === 0 && this.$props.showPagination && this.localPagination.current > 1) {
            this.localPagination.current--
            this.loadData(pagination, filters, sorter)
            return
          }

          // 这里用于判断接口是否有返回 r.totalCount 且 this.showPagination = true 且 pageNo 和 pageSize 存在 且 totalCount 小于等于 pageNo * pageSize 的大小
          // 当情况满足时，表示数据不满足分页大小，关闭 table 分页功能
          try {
            if (
              ['auto', true].includes(this.$props.showPagination) &&
              r.totalCount <= r.pageNo * this.localPagination.pageSize
            ) {
              this.localPagination.hideOnSinglePage = true
            }
          } catch (e) {
            this.localPagination = false
          }
          console.log('loadData -> this.localPagination', this.localPagination)
          this.localDataSource = r.data // 返回结果中的数组数据
          this.localLoading = false
        })
      }
    },
    initTotalList(columns: any[]) {
      const totalList: any[] = []
      columns &&
        columns instanceof Array &&
        columns.forEach(column => {
          if (column.needTotal) {
            totalList.push({
              ...column,
              total: 0
            })
          }
        })
      return totalList
    },
    /**
     * 用于更新已选中的列表数据 total 统计
     * @param selectedRowKeys
     * @param selectedRows
     */
    updateSelect(selectedRowKeys: any, selectedRows: any): void {
      this.selectedRows = selectedRows
      this.selectedRowKeys = selectedRowKeys
      const list: any[] = this.needTotalList
      this.needTotalList = list.map((item: any) => {
        return {
          ...item,
          total: selectedRows.reduce((sum: any, val: any) => {
            const total = sum + parseInt(get(val, item.dataIndex))
            return isNaN(total) ? 0 : total
          }, 0)
        }
      })
    },
    /**
     * 清空 table 已选中项
     */
    clearSelected() {
      if (this.$props.rowSelection) {
        this.$props.rowSelection.onChange([], [])
        this.updateSelect([], [])
      }
    },
    /**
     * 处理交给 table 使用者去处理 clear 事件时，内部选中统计同时调用
     * @param callback
     * @returns {*}
     */
    renderClear(callback: any) {
      if (this.selectedRowKeys.length <= 0) return null
      return (
        <a
          style="margin-left: 24px"
          onClick={() => {
            callback()
            this.clearSelected()
          }}
        >
          清空
        </a>
      )
    },
    renderAlert() {
      // 绘制统计列数据
      const needTotalItems = this.needTotalList.map((item: any) => {
        return (
          <span style="margin-right: 12px">
            {item.title}总计{' '}
            <a style="font-weight: 600">{!item.customRender ? item.total : item.customRender(item.total)}</a>
          </span>
        )
      })

      // 绘制 清空 按钮
      const clearItem =
        typeof this.$props.alert.clear === 'boolean' && this.$props.alert.clear
          ? this.renderClear(this.clearSelected)
          : this.$props.alert !== null && typeof this.$props.alert.clear === 'function'
          ? this.renderClear(this.$props.alert.clear)
          : null

      // 绘制 alert 组件
      return (
        <a-alert showIcon={true} style="margin-bottom: 16px">
          <template slot="message">
            <span style="margin-right: 12px">
              已选择: <a style="font-weight: 600">{this.selectedRows.length}</a>
            </span>
            {needTotalItems}
            {clearItem}
          </template>
        </a-alert>
      )
    }
  },

  render() {
    const props: any = {}
    const localKeys = Object.keys(this.$data)
    const showAlert =
      (typeof this.$props.alert === 'object' &&
        this.$props.alert !== null &&
        this.$props.alert.show &&
        typeof this.$props.rowSelection.selectedRowKeys !== 'undefined') ||
      this.$props.alert

    Object.keys(T.props).forEach(k => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`
      if (localKeys.includes(localKey)) {
        props[k] = (this as any)[localKey]
        return props[k]
      }
      if (k === 'rowSelection') {
        if (showAlert && this.$props.rowSelection) {
          // 如果需要使用alert，则重新绑定 rowSelection 事件
          console.log('this.rowSelection', this.$props.rowSelection)
          props[k] = {
            ...this.$props.rowSelection,
            selectedRows: this.selectedRows,
            selectedRowKeys: this.selectedRowKeys,
            onChange: (selectedRowKeys: any, selectedRows: any) => {
              this.updateSelect(selectedRowKeys, selectedRows)
              typeof (this as any)[k].onChange !== 'undefined' &&
                (this as any)[k].onChange(selectedRowKeys, selectedRows)
            }
          }
          return props[k]
        } else if (!this.$props.rowSelection) {
          // 如果没打算开启 rowSelection 则清空默认的选择项
          props[k] = null
          return props[k]
        }
      }
      ;(this as any)[k] && (props[k] = (this as any)[k])
      return props[k]
    })
    const table = (
      <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }} onChange={this.loadData}>
        {Object.keys(this.$slots).map(name => (
          <template slot={name}>{this.$slots[name]}</template>
        ))}
      </a-table>
    )

    return (
      <div class="table-wrapper">
        {showAlert ? this.renderAlert() : null}
        {table}
      </div>
    )
  }
})

export default TableComponent
