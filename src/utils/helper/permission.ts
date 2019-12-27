import { VueConstructor } from 'vue'
import { PermissionsPlugin } from '../vue-plugins'

const PERMISSION_ENUM = {
  add: { key: 'add', label: '新增' },
  delete: { key: 'delete', label: '删除' },
  edit: { key: 'edit', label: '修改' },
  query: { key: 'query', label: '查询' },
  get: { key: 'get', label: '详情' },
  enable: { key: 'enable', label: '启用' },
  disable: { key: 'disable', label: '禁用' },
  import: { key: 'import', label: '导入' },
  export: { key: 'export', label: '导出' }
}

const Permission: PermissionsPlugin = {
  install(Vue: VueConstructor, instance: any): void {
    if (this.installed) {
      return
    }
    this.installed = true

    !Vue.prototype.$auth &&
      Object.defineProperties(Vue.prototype, {
        $auth: {
          get() {
            const _this = this
            return (permissions: any) => {
              const [permission, action] = permissions.split('.')
              const permissionList = _this.$store.getters['user/roles'].permissions
              return (
                permissionList
                  .find((val: any) => {
                    return val.permissionId === permission
                  })
                  .actionList.findIndex((val: any) => {
                    return val === action
                  }) > -1
              )
            }
          }
        }
      })

    !Vue.prototype.$enum &&
      Object.defineProperties(Vue.prototype, {
        $enum: {
          get() {
            // const _this = this;
            return (val: any) => {
              let result = PERMISSION_ENUM
              val &&
                val.split('.').forEach((v: any) => {
                  result = (result && (result as any)[v]) || null
                })
              return result
            }
          }
        }
      })
  }
}

export default Permission
