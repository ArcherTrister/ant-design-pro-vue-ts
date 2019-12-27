<template>
  <span>
    {{ lastTime | format }}
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

function fixedZero(val: number) {
  return val * 1 < 10 ? `0${val}` : val
}

@Component({
  name: 'CountDown',
  components: {},
  filters: {
    format(time: number) {
      const hours = 60 * 60 * 1000
      const minutes = 60 * 1000
      const h = Math.floor(time / hours)
      const m = Math.floor((time - h * hours) / minutes)
      const s = Math.floor((time - h * hours - m * minutes) / 1000)
      return `${fixedZero(h)}:${fixedZero(m)}:${fixedZero(s)}`
    }
  }
})
export default class CountDownComponent extends Vue {
  // props
  @Prop({ type: Function, default: undefined })
  private format!: Function
  @Prop({ type: [Date, Number], required: true })
  private target!: any
  @Prop({ type: Function, default: () => ({}) })
  private onEnd!: Function

  // data
  private dateTime: string = '0'
  private originTargetTime: number = 0
  private lastTime: number = 0
  private timer: any = null
  private interval: number = 1000

  constructor() {
    super()
  }

  created() {
    this.initTime()
    this.tick()
  }

  //methods
  initTime() {
    let lastTime = 0
    let targetTime = 0
    this.originTargetTime = this.target
    try {
      if (Object.prototype.toString.call(this.target) === '[object Date]') {
        targetTime = this.target
      } else {
        targetTime = new Date(this.target).getTime()
      }
    } catch (e) {
      throw new Error('invalid target prop')
    }

    lastTime = targetTime - new Date().getTime()

    this.lastTime = lastTime < 0 ? 0 : lastTime
  }

  tick() {
    const { onEnd } = this

    this.timer = setTimeout(() => {
      if (this.lastTime < this.interval) {
        clearTimeout(this.timer)
        this.lastTime = 0
        if (typeof onEnd === 'function') {
          onEnd()
        }
      } else {
        this.lastTime -= this.interval
        this.tick()
      }
    }, this.interval)
  }

  beforeUpdate() {
    if (this.originTargetTime !== this.target) {
      this.initTime()
    }
  }

  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped></style>
