# CountDown 倒计时

倒计时组件。



引用方式：

```javascript
import CountDown from '@/components/CountDown/CountDown.vue'

export default {
    components: {
        CountDown
    }
}
```



## 代码演示  [demo](https://pro.lxking.cn/test/home)

```html
<count-down :target="new Date().getTime() + 3000000" :on-end="onEndHandle" />
```



## API

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| target | 目标时间 | Date | - |
| onEnd |  倒计时结束回调 | funtion | -|
