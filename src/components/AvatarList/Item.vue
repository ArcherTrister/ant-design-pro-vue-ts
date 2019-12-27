<template>
  <tooltip v-if="tips !== ''">
    <template slot="title">
      {{ tips }}
    </template>
    <avatar :size="avatarSize" :src="src" />
  </tooltip>
  <avatar v-else :size="avatarSize" :src="src" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Avatar from 'ant-design-vue/es/avatar'
import Tooltip from 'ant-design-vue/es/tooltip'

@Component({
  name: 'AvatarItem',
  components: {
    Avatar,
    Tooltip
  }
})
export default class AvatarItemComponent extends Vue {
  // props
  @Prop({ type: String, default: '', required: false })
  private tips!: string
  @Prop({ type: String, default: '' })
  private src!: string

  // data
  private size: any

  constructor() {
    super()
  }

  // Lifecycle
  created() {
    this.size = (this.$parent as any).size
  }

  // mounted() {}

  // computed
  public get avatarSize() {
    return (this.size !== 'mini' && this.size) || 20
  }

  // watch
  @Watch('$parent.size')
  sizeChange(val: any) {
    this.size = val
  }
}
</script>
