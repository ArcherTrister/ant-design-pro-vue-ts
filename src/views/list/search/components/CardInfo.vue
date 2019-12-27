<template>
  <div class="cardInfo">
    <div>
      <p>活跃用户</p>
      <p>{{ activeUser }}</p>
    </div>
    <div>
      <p>新增用户</p>
      <p>{{ newUser }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'CardInfo',
  components: {}
})
export default class CardInfo extends Vue {
  // props
  @Prop({
    type: [String, Number],
    default: 0
  })
  private activeUser!: any
  @Prop({
    type: [String, Number],
    default: 0
  })
  private newUser!: any

  constructor() {
    super()
  }
}
</script>

<style lang="less" scoped>
@import '~@/components/index.less';
@import '~@/utils/utils.less';

.cardInfo {
  .clearfix();

  margin-top: 16px;
  margin-left: 40px;
  & > div {
    position: relative;
    float: left;
    width: 50%;
    text-align: left;
    p {
      margin: 0;
      font-size: 24px;
      line-height: 32px;
    }
    p:first-child {
      margin-bottom: 4px;
      color: @text-color-secondary;
      font-size: 12px;
      line-height: 20px;
    }
  }
}
</style>
