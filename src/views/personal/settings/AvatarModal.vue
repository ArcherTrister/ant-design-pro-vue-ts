<template>
  <a-modal
    title="修改头像"
    :visible="visible"
    :mask-closable="false"
    :confirm-loading="confirmLoading"
    :width="800"
    :footer="null"
    @cancel="cancelHandel"
  >
    <a-row>
      <a-col :xs="24" :md="12" :style="{ height: '350px' }">
        <vue-cropper
          ref="cropper"
          :img="options.img"
          :info="true"
          :auto-crop="options.autoCrop"
          :auto-crop-width="options.autoCropWidth"
          :auto-crop-height="options.autoCropHeight"
          :fixed-box="options.fixedBox"
          @realTime="realTime"
        />
      </a-col>
      <a-col :xs="24" :md="12" :style="{ height: '350px' }">
        <div class="avatar-upload-preview">
          <img :src="previews.url" :style="previews.img" />
        </div>
      </a-col>
    </a-row>
    <br />
    <a-row>
      <a-col :lg="2" :md="2">
        <a-upload name="file" :beforeUpload="beforeUpload" :show-upload-list="false">
          <a-button icon="upload">
            选择图片
          </a-button>
        </a-upload>
      </a-col>
      <a-col :lg="{ span: 1, offset: 2 }" :md="2">
        <a-button icon="plus" @click="changeScale(1)" />
      </a-col>
      <a-col :lg="{ span: 1, offset: 1 }" :md="2">
        <a-button icon="minus" @click="changeScale(-1)" />
      </a-col>
      <a-col :lg="{ span: 1, offset: 1 }" :md="2">
        <a-button icon="undo" @click="rotateLeft" />
      </a-col>
      <a-col :lg="{ span: 1, offset: 1 }" :md="2">
        <a-button icon="redo" @click="rotateRight" />
      </a-col>
      <a-col :lg="{ span: 2, offset: 6 }" :md="2">
        <a-button type="primary" @click="finish('blob')">
          保存
        </a-button>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface cropperOptions {
  img: string | ArrayBuffer | null
  autoCrop: boolean
  autoCropWidth: number
  autoCropHeight: number
  fixedBox: boolean
}

@Component({
  name: 'AvatarModal',
  components: {}
})
export default class AvatarModal extends Vue {
  // data
  private visible: boolean = false
  private id: any = null
  private confirmLoading: boolean = false
  private fileList: any[] = []
  private uploading: boolean = false
  private options: cropperOptions = {
    // img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    img: '',
    autoCrop: true,
    autoCropWidth: 200,
    autoCropHeight: 200,
    fixedBox: true
  }
  private previews: object = {}

  constructor() {
    super()
  }

  // methods
  edit(id: any) {
    this.visible = true
    this.id = id
    /* 获取原始头像 */
  }
  close() {
    this.id = null
    this.visible = false
  }
  cancelHandel() {
    this.close()
  }
  changeScale(num: number) {
    num = num || 1
    const cropper = this.$refs.cropper as any
    cropper.changeScale(num)
  }
  rotateLeft() {
    const cropper = this.$refs.cropper as any
    cropper.rotateLeft()
  }
  rotateRight() {
    const cropper = this.$refs.cropper as any
    cropper.rotateRight()
  }
  beforeUpload(file: any) {
    const reader = new FileReader()
    // 把Array Buffer转化为blob 如果是base64不需要
    // 转化为base64
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.options.img = reader.result
    }
    // 转化为blob
    // reader.readAsArrayBuffer(file)

    return false
  }

  // 上传图片（点击上传按钮）
  finish(type: any) {
    console.log('finish')
    console.log(type)
    const _this = this
    const formData = new FormData()
    const cropper = this.$refs.cropper as any
    // 输出
    if (type === 'blob') {
      cropper.getCropBlob((data: any) => {
        console.log(this)
        // debugger
        const img = window.URL.createObjectURL(data)
        // this.model = true
        // this.modelSrc = img
        // formData.append('file', data, this.fileName)
        this.$http
          .post('https://www.mocky.io/v2/5cc8019d300000980a055e76', formData, {
            contentType: false,
            processData: false,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          })
          .then((response: any) => {
            console.log('upload response:', response)
            // var res = response.data
            // if (response.status === 'done') {
            //   _this.imgFile = ''
            //   _this.headImg = res.realPathList[0] // 完整路径
            //   _this.uploadImgRelaPath = res.relaPathList[0] // 非完整路径
            //   _this.$message.success('上传成功')
            //   this.visible = false
            // }
            _this.$message.success('上传成功')
            _this.$emit('ok', response.url)
            _this.visible = false
          })
      })
    } else {
      cropper.getCropData((data: any) => {
        console.log(this)
        // this.model = true
        // this.modelSrc = data
      })
    }
  }
  okHandel() {
    const vm = this

    vm.confirmLoading = true
    setTimeout(() => {
      vm.confirmLoading = false
      vm.close()
      vm.$message.success('上传头像成功')
    }, 2000)
  }

  realTime(data: object) {
    this.previews = data
  }
}
</script>

<style lang="less" scoped>
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
