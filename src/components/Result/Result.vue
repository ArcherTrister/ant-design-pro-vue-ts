<template>
  <div class="result">
    <div>
      <a-icon :class="{ icon: true, [`${type}`]: true }" :type="localIsSuccess ? 'check-circle' : 'close-circle'" />
    </div>
    <div class="title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="description">
      <slot name="description">
        {{ description }}
      </slot>
    </div>
    <div class="extra" v-if="$slots.default">
      <slot />
    </div>
    <div class="action" v-if="$slots.action">
      <slot name="action" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
const resultEnum = ['success', 'error']

@Component({
  name: 'Result',
  components: {}
})
export default class ResultComponent extends Vue {
  // props
  /** @Deprecated */
  @Prop({ type: Boolean, default: false })
  private isSuccess!: boolean
  @Prop({
    type: String,
    default: resultEnum[0],
    validator(val: string) {
      return resultEnum.includes(val)
    }
  })
  private type!: string
  @Prop({ type: String, default: '' })
  private title!: string
  @Prop({ type: String, default: '' })
  private description!: string

  constructor() {
    super()
  }

  // computed
  public get localIsSuccess() {
    return this.type === resultEnum[0]
  }
}
</script>

<style lang="less" scoped>
.result {
  text-align: center;
  width: 72%;
  margin: 0 auto;
  padding: 24px 0 8px;

  .icon {
    font-size: 72px;
    line-height: 72px;
    margin-bottom: 24px;
  }
  .success {
    color: #52c41a;
  }
  .error {
    color: red;
  }
  .title {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    line-height: 32px;
    margin-bottom: 16px;
  }
  .description {
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 24px;
  }
  .extra {
    background: #fafafa;
    padding: 24px 40px;
    border-radius: 2px;
    text-align: left;
  }
  .action {
    margin-top: 32px;
  }
}

.mobile {
  .result {
    width: 100%;
    margin: 0 auto;
    padding: unset;
  }
}
</style>
