<template>
  <span>
    <a-icon :type="type" style="margin-right: 8px" />
    {{ text }}
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'IconText',
  components: {}
})
export default class IconText extends Vue {
  // props
  @Prop({
    type: String,
    required: true
  })
  private type!: string
  @Prop({
    type: [String, Number],
    required: true
  })
  private text!: any

  constructor() {
    super()
  }
}
</script>
