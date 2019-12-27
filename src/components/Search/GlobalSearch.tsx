import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Select } from 'ant-design-vue'
import './index.less'

@Component({
  name: 'GlobalSearch',
  components: {}
})
export default class GlobalSearchComponent extends Vue {
  // data
  private visible: boolean = false

  constructor() {
    super()
  }

  mounted() {
    const keyboardHandle = (e: any) => {
      e.preventDefault()
      e.stopPropagation()
      const { ctrlKey, shiftKey, altKey, keyCode } = e
      console.log('keyCode:', e.keyCode, e)
      // key is `K` and hold ctrl
      if (keyCode === 75 && ctrlKey && !shiftKey && !altKey) {
        this.visible = !this.visible
      }
    }
    document.addEventListener('keydown', keyboardHandle)
  }

  render() {
    const { visible } = this
    const handleSearch = (e: any) => {
      this.$emit('search', e)
    }

    const handleChange = (e: any) => {
      this.$emit('change', e)
    }
    if (!visible) {
      return null
    }
    return (
      <div class={'global-search global-search-wrapper'}>
        <div class={'global-search-box'}>
          <Select
            size={'large'}
            showSearch
            placeholder="Input search text.."
            style={{ width: '100%' }}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
          ></Select>
          <div class={'global-search-tips'}>Open with Ctrl/⌘ + K</div>
        </div>
      </div>
    )
  }
}
