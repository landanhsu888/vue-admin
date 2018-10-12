<template>
  <div v-show="value" class="vue-image-crop-upload">
    <div class="vicp-wrap">
      <div class="vicp-close" @click="off">
        <i class="vicp-icon4"/>
      </div>

      <div v-show="step == 1" class="vicp-step1">
        <div class="vicp-drop-area" @dragleave="preventDefault" @dragover="preventDefault" @dragenter="preventDefault" @click="handleClick" @drop="handleChange">
          <i v-show="loading != 1" class="vicp-icon1">
            <i class="vicp-icon1-arrow"/>
            <i class="vicp-icon1-body"/>
            <i class="vicp-icon1-bottom"/>
          </i>
          <span v-show="loading !== 1" class="vicp-hint">{{ lang.hint }}</span>
          <span v-show="!isSupported" class="vicp-no-supported-hint">{{ lang.noSupported }}</span>
          <input v-show="false" v-if="step == 1" ref="fileinput" type="file" @change="handleChange">
        </div>
        <div v-show="hasError" class="vicp-error">
          <i class="vicp-icon2"/> {{ errorMsg }}
        </div>
        <div class="vicp-operate">
          <a @click="off" @mousedown="ripple">{{ lang.btn.off }}</a>
        </div>
      </div>

      <div v-if="step == 2" class="vicp-step2">
        <div class="vicp-crop">
          <div v-show="true" class="vicp-crop-left">
            <div class="vicp-img-container">
              <img
                ref="img"
                :src="sourceImgUrl"
                :style="sourceImgStyle"
                class="vicp-img"
                draggable="false"
                @drag="preventDefault"
                @dragstart="preventDefault"
                @dragend="preventDefault"
                @dragleave="preventDefault"
                @dragover="preventDefault"
                @dragenter="preventDefault"
                @drop="preventDefault"
                @touchstart="imgStartMove"
                @touchmove="imgMove"
                @touchend="createImg"
                @touchcancel="createImg"
                @mousedown="imgStartMove"
                @mousemove="imgMove"
                @mouseup="createImg"
                @mouseout="createImg">
              <div :style="sourceImgShadeStyle" class="vicp-img-shade vicp-img-shade-1"/>
              <div :style="sourceImgShadeStyle" class="vicp-img-shade vicp-img-shade-2"/>
            </div>

            <div class="vicp-range">
              <input :value="scale.range" type="range" step="1" min="0" max="100" @input="zoomChange">
              <i class="vicp-icon5" @mousedown="startZoomSub" @mouseout="endZoomSub" @mouseup="endZoomSub"/>
              <i class="vicp-icon6" @mousedown="startZoomAdd" @mouseout="endZoomAdd" @mouseup="endZoomAdd"/>
            </div>

            <div v-if="!noRotate" class="vicp-rotate">
              <i @mousedown="startRotateLeft" @mouseout="endRotate" @mouseup="endRotate">↺</i>
              <i @mousedown="startRotateRight" @mouseout="endRotate" @mouseup="endRotate">↻</i>
            </div>
          </div>
          <div v-show="true" class="vicp-crop-right">
            <div class="vicp-preview">
              <div v-if="!noSquare" class="vicp-preview-item">
                <img :src="createImgUrl" :style="previewStyle">
                <span>{{ lang.preview }}</span>
              </div>
              <div v-if="!noCircle" class="vicp-preview-item vicp-preview-item-circle">
                <img :src="createImgUrl" :style="previewStyle">
                <span>{{ lang.preview }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="vicp-operate">
          <a @click="setStep(1)" @mousedown="ripple">{{ lang.btn.back }}</a>
          <a class="vicp-operate-btn" @click="prepareUpload" @mousedown="ripple">{{ lang.btn.save }}</a>
        </div>
      </div>

      <div v-if="step == 3" class="vicp-step3">
        <div class="vicp-upload">
          <span v-show="loading === 1" class="vicp-loading">{{ lang.loading }}</span>
          <div class="vicp-progress-wrap">
            <span v-show="loading === 1" :style="progressStyle" class="vicp-progress"/>
          </div>
          <div v-show="hasError" class="vicp-error">
            <i class="vicp-icon2"/> {{ errorMsg }}
          </div>
          <div v-show="loading === 2" class="vicp-success">
            <i class="vicp-icon3"/> {{ lang.success }}
          </div>
        </div>
        <div class="vicp-operate">
          <a @click="setStep(2)" @mousedown="ripple">{{ lang.btn.back }}</a>
          <a @click="off" @mousedown="ripple">{{ lang.btn.close }}</a>
        </div>
      </div>
      <canvas v-show="false" ref="canvas" :width="width" :height="height"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import request from './../utils/request'
import data2blob from './../utils/data2blob'
import effectRipple from './../utils/effectRipple'

import language from './../configs/language'
import mimes from './../configs/mimes'

@Component({
  name: 'ImageCropper',
  })
class ImageCropper extends Vue {

  @Prop({ default: 'avatar' })
  public field!: string

  @Prop({ default: 0 })
  public ki!: number

  @Prop({ default: true })
  public value!: boolean

  @Prop({ default: '' })
  public url!: string

  @Prop({ default: {} })
  public params!: object

  @Prop({ default: {} })
  public headers!: object

  @Prop({ default: 200 })
  public width!: number

  @Prop({ default: 200 })
  public height!: number

  @Prop({ default: true })
  public noRotate!: boolean

  @Prop({ default: false })
  public noCircle!: boolean

  @Prop({ default: false })
  public noSquare!: boolean

  @Prop({ default: 10240 })
  public maxSize!: number

  @Prop({ default: 'zh' })
  public langType!: string

  @Prop({ default: {} })
  public langExt!: object

  @Prop({ default: 'png' })
  public imgFormat!: string

  @Prop({ default: false })
  public withCredentials!: boolean


  // data
  public mime: string = mimes['jpg']
  public lang: any = language['en']
  public isSupported: boolean = typeof FormData !== 'function' ? false : true
  public isSupportTouch: any = document.hasOwnProperty('ontouchstart')

  public step: number = 1
  public loading: number = 0
  public progress: number = 0
  public hasError: boolean = false
  public errorMsg: string = ''
  public ratio: number = this.width / this.height
  public sourceImg: any = null
  public sourceImgUrl: string = ''
  public createImgUrl: string = ''
  public sourceImgMouseDown: any = {
    on: false,
    mX: 0, // 鼠标按下的坐标
    mY: 0,
    x: 0, // scale原图坐标
    y: 0
  }
  public previewContainer: any = {
    width: 100,
    height: 100
  }
  public sourceImgContainer: any = {
    width: 240,
    height: 184 // 如果生成图比例与此一致会出现bug，先改成特殊的格式吧，哈哈哈
  }

  public scale: any = {
    zoomAddOn: false, // 按钮缩放事件开启
    zoomSubOn: false, // 按钮缩放事件开启
    range: 1, // 最大100
    rotateLeft: false, // 按钮向左旋转事件开启
    rotateRight: false, // 按钮向右旋转事件开启
    degree: 0, // 旋转度数
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    maxWidth: 0,
    maxHeight: 0,
    minWidth: 0, // 最宽
    minHeight: 0,
    naturalWidth: 0, // 原宽
    naturalHeight: 0
  }


  // public get mine (): any {

  //   // TODO To Fixed: can be optional langType
  //   // const lang = language[this.langType] ? language[this.langType] : language['en']
  //   // const mime = mimes[tempImgFormat]

  //   const mime = mimes['jpg']
  //   return mime
  // }


  // public get lang (): any {

  //   // TODO To Fixed: can be optional langType
  //   // const lang = language[this.langType] ? language[this.langType] : language['en']
  //   // const mime = mimes[tempImgFormat]

  //   const lang = language['zh']
  //   return lang
  // }

  public get progressStyle (): object {
    return {
      width: this.progress + '%'
    }
  }

  public get sourceImgStyle (): object {
    const top = this.scale.y + this.sourceImgMasking.y + 'px'
    const left = this.scale.x + this.sourceImgMasking.x + 'px'
    return {
      top,
      left,
      width: this.scale.width + 'px',
      height: this.scale.height + 'px',
      transform: 'rotate(' + this.scale.degree + 'deg)', // 旋转时 左侧原始图旋转样式
      '-ms-transform': 'rotate(' + this.scale.degree + 'deg)', // 兼容IE9
      '-moz-transform': 'rotate(' + this.scale.degree + 'deg)', // 兼容FireFox
      '-webkit-transform': 'rotate(' + this.scale.degree + 'deg)', // 兼容Safari 和 chrome
      '-o-transform': 'rotate(' + this.scale.degree + 'deg)' // 兼容 Opera
    }
  }

  public get sourceImgMasking (): any {
    const {
    } = this
    const sic = this.sourceImgContainer
    const sicRatio = sic.width / sic.height // 原图容器宽高比
    let x = 0
    let y = 0
    let w = sic.width
    let h = sic.height
    let scale = 1
    if (this.ratio < sicRatio) {
      scale = sic.height / this.height
      w = sic.height * this.ratio
      x = (sic.width - w) / 2
    }
    if (this.ratio > sicRatio) {
      scale = sic.width / this.width
      h = sic.width / this.ratio
      y = (sic.height - h) / 2
    }
    return {
      scale, // 蒙版相对需求宽高的缩放
      x,
      y,
      width: w,
      height: h
    }
  }

  public get sourceImgShadeStyle (): object {
    const sic = this.sourceImgContainer
    const sim = this.sourceImgMasking
    const w = sim.width == sic.width ? sim.width : (sic.width - sim.width) / 2
    const h = sim.height == sic.height ? sim.height : (sic.height - sim.height) / 2
    return {
      width: w + 'px',
      height: h + 'px'
    }
  }

  public get previewStyle (): object {
    const pc = this.previewContainer
    let w = pc.width
    let h = pc.height
    const pcRatio = w / h
    if (this.ratio < pcRatio) {
      w = pc.height * this.ratio
    }
    if (this.ratio > pcRatio) {
      h = pc.width / this.ratio
    }
    return {
      width: w + 'px',
      height: h + 'px'
    }
  }

  @Watch('value')
  valueHandler(newValue: any) {
    if (newValue && this.loading != 1) {
      this.reset()
    }
  }

  ripple(e: any): void {
    effectRipple(e, void 0)
  }

  off() {
    setTimeout(() => {
      this.$emit('input', false)
      this.$emit('close')
      if (this.step == 3 && this.loading == 2) {
        this.setStep(1)
      }
    }, 200)
  }

  setStep(no: any) {
    // 延时是为了显示动画效果呢，哈哈哈
    setTimeout(() => {
      this.step = no
    }, 200)
  }

  preventDefault(e: any) {
    e.preventDefault()
    return false
  }

  handleClick(e: any) {
    if (this.loading !== 1) {
      if (e.target !== this.$refs.fileinput) {
        e.preventDefault()
        let refs: any = this.$refs
        if (document.activeElement !== refs) {
          refs.fileinput.click()
        }
      }
    }
  }

  handleChange(e: any) {
    e.preventDefault()
    if (this.loading !== 1) {
      const files = e.target.files || e.dataTransfer.files
      this.reset()
      if (this.checkFile(files[0])) {
        this.setSourceImg(files[0])
      }
    }
  }

  checkFile(file: any) {
    // 仅限图片
    if (file.type.indexOf('image') === -1) {
      this.hasError = true
      this.errorMsg = this.lang.error.onlyImg
      return false
    }
    // 超出大小
    if (file.size / 1024 > this.maxSize) {
      this.hasError = true
      this.errorMsg = this.lang.error.outOfSize + this.maxSize + 'kb'
      return false
    }
    return true
  }

  reset() {
    const that = this
    that.loading = 0
    that.hasError = false
    that.errorMsg = ''
    that.progress = 0
  }

  // 设置图片源
  setSourceImg(file: any) {
    let fr = new FileReader()
    fr.onload = () => {
      this.sourceImgUrl = fr.result
      this.startCrop()
    }
    fr.readAsDataURL(file)
  }

  startCrop() {
    let sim = this.sourceImgMasking,
        img = new Image()
    img.src = this.sourceImgUrl
    img.onload = () => {
      let nWidth = img.naturalWidth,
        nHeight = img.naturalHeight,
        nRatio = nWidth / nHeight,
        w = sim.width,
        h = sim.height,
        x = 0,
        y = 0
      // 图片像素不达标
      if (nWidth < this.width || nHeight < this.height) {
        this.hasError = true
        this.errorMsg = this.lang.error.lowestPx + this.width + '*' + this.height
        return false
      }
      if (this.ratio > nRatio) {
        h = w / nRatio
        y = (sim.height - h) / 2
      }
      if (this.ratio < nRatio) {
        w = h * nRatio
        x = (sim.width - w) / 2
      }
      this.scale.range = 0
      this.scale.x = x
      this.scale.y = y
      this.scale.width = w
      this.scale.height = h
      this.scale.degree = 0
      this.scale.minWidth = w
      this.scale.minHeight = h
      this.scale.maxWidth = nWidth * sim.scale
      this.scale.maxHeight = nHeight * sim.scale
      this.scale.naturalWidth = nWidth
      this.scale.naturalHeight = nHeight
      this.sourceImg = img
      this.createImg(void 0)
      this.setStep(2)
    }
    
  }

  imgStartMove(e: any) {
    e.preventDefault()
    // 支持触摸事件，则鼠标事件无效
    if (this.isSupportTouch && !e.targetTouches) {
      return false
    }
    let et = e.targetTouches ? e.targetTouches[0] : e,
        simd = this.sourceImgMouseDown
    simd.mX = et.screenX
    simd.mY = et.screenY
    simd.x = this.scale.x
    simd.y = this.scale.y
    simd.on = true
  }

  imgMove(e: any) {
    e.preventDefault()
    // 支持触摸事件，则鼠标事件无效
    if (this.isSupportTouch && !e.targetTouches) {
      return false
    }
    let et = e.targetTouches ? e.targetTouches[0] : e,
      {
        sourceImgMouseDown: {
          on,
          mX,
          mY,
          x,
          y
        },
        scale,
        sourceImgMasking
      } = this,
      sim = sourceImgMasking,
      nX = et.screenX,
      nY = et.screenY,
      dX = nX - mX,
      dY = nY - mY,
      rX = x + dX,
      rY = y + dY
    if (!on) return
    if (rX > 0) {
      rX = 0
    }
    if (rY > 0) {
      rY = 0
    }
    if (rX < sim.width - scale.width) {
      rX = sim.width - scale.width
    }
    if (rY < sim.height - scale.height) {
      rY = sim.height - scale.height
    }
    scale.x = rX
    scale.y = rY
  }

  startRotateRight(e: any) {
    let that = this,
      {
        scale
      } = that
    scale.rotateRight = true
    function rotate() {
      if (scale.rotateRight) {
        const degree = ++scale.degree
        that.createImg(degree)
        setTimeout(function() {
          rotate()
        }, 60)
      }
    }
    rotate()
  }

  // 按钮按下开始向左旋转
  startRotateLeft(e: any) {
    let that = this,
      {
        scale
      } = that
    scale.rotateLeft = true
    function rotate() {
      if (scale.rotateLeft) {
        const degree = --scale.degree
        that.createImg(degree)
        setTimeout(function() {
          rotate()
        }, 60)
      }
    }
    rotate()
  }

  // 停止旋转
  endRotate() {
    this.scale.rotateLeft = false
    this.scale.rotateRight = false
  }

  // 按钮按下开始放大
  startZoomAdd(e: any) {
    let that = this,
      {
        scale
      } = that
    scale.zoomAddOn = true
    function zoom() {
      if (scale.zoomAddOn) {
        const range = scale.range >= 100 ? 100 : ++scale.range
        that.zoomImg(range)
        setTimeout(function() {
          zoom()
        }, 60)
      }
    }
    zoom()
  }

  // 按钮松开或移开取消放大
  endZoomAdd(e: any) {
    this.scale.zoomAddOn = false
  }

  // 按钮按下开始缩小
  startZoomSub(e: any) {
    let that = this,
      {
        scale
      } = that
    scale.zoomSubOn = true
    function zoom() {
      if (scale.zoomSubOn) {
        const range = scale.range <= 0 ? 0 : --scale.range
        that.zoomImg(range)
        setTimeout(function() {
          zoom()
        }, 60)
      }
    }
    zoom()
  }

  // 按钮松开或移开取消缩小
  endZoomSub(e: any) {
    const {
      scale
    } = this
    scale.zoomSubOn = false
  }

  zoomChange(e: any) {
    this.zoomImg(e.target.value)
  }

  // 缩放原图
  zoomImg(newRange: any) {
    const that = this
    const {
      sourceImgMasking,
      sourceImgMouseDown,
      scale
    } = this
    const {
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      width,
      height,
      x,
      y,
      range
    } = scale
    const sim = sourceImgMasking
    // 蒙版宽高
    const sWidth = sim.width
    const sHeight = sim.height
    // 新宽高
    const nWidth = minWidth + (maxWidth - minWidth) * newRange / 100
    const nHeight = minHeight + (maxHeight - minHeight) * newRange / 100
    // 新坐标（根据蒙版中心点缩放）
    let nX = sWidth / 2 - (nWidth / width) * (sWidth / 2 - x)
    let nY = sHeight / 2 - (nHeight / height) * (sHeight / 2 - y)
    // 判断新坐标是否超过蒙版限制
    if (nX > 0) {
      nX = 0
    }
    if (nY > 0) {
      nY = 0
    }
    if (nX < sWidth - nWidth) {
      nX = sWidth - nWidth
    }
    if (nY < sHeight - nHeight) {
      nY = sHeight - nHeight
    }
    // 赋值处理
    scale.x = nX
    scale.y = nY
    scale.width = nWidth
    scale.height = nHeight
    scale.range = newRange
    setTimeout(function() {
      if (scale.range == newRange) {
        that.createImg(void 0)
      }
    }, 300)
  }

   // 生成需求图片
  createImg(e: any) {
    let that = this,
      {
        mime,
        sourceImg,
        scale: {
          x,
          y,
          width,
          height,
          degree
        },
        sourceImgMasking: {
          scale
        }
      } = that,
      canvas:any = that.$refs.canvas,
      ctx = canvas.getContext('2d')
    if (e) {
      // 取消鼠标按下移动状态
      that.sourceImgMouseDown.on = false
    }
    canvas.width = that.width
    canvas.height = that.height
    ctx.clearRect(0, 0, that.width, that.height)
    // 将透明区域设置为白色底边
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, that.width, that.height)
    ctx.translate(that.width * 0.5, that.height * 0.5)
    ctx.rotate(Math.PI * degree / 180)
    ctx.translate(-that.width * 0.5, -that.height * 0.5)
    ctx.drawImage(sourceImg, x / scale, y / scale, width / scale, height / scale)
    that.createImgUrl = canvas.toDataURL(mime)
  }

  prepareUpload() {
    const {
      url,
      createImgUrl,
      field,
      ki
    } = this
    this.$emit('crop-success', createImgUrl, field, ki)
    if (typeof url === 'string' && url) {
      this.upload()
    } else {
      this.off()
    }
  }

   // 上传图片
  upload() {
    let that = this,
      {
        lang,
        imgFormat,
        mime,
        url,
        headers,
        field,
        ki,
        createImgUrl,
        withCredentials
      } = this,
      fmData = new FormData()
    let params: any = this.params
    fmData.append(field, data2blob(createImgUrl, mime), field + '.' + imgFormat)
    // 添加其他参数
    if (typeof params === 'object' && params) {
      Object.keys(params).forEach((k) => {
        fmData.append(k, params[k])
      })
    }
    // 监听进度回调
    const uploadProgress = function(event: any) {
      if (event.lengthComputable) {
        that.progress = 100 * Math.round(event.loaded) / event.total
      }
    }
    // 上传文件
    that.reset()
    that.loading = 1
    that.setStep(3)
    request({
      url,
      method: 'post',
      data: fmData
    }).then(resData => {
      that.loading = 2
      that.$emit('crop-upload-success', resData.data)
    }).catch(err => {
      if (that.value) {
        that.loading = 3
        that.hasError = true
        that.errorMsg = lang.fail
        that.$emit('crop-upload-fail', err, field, ki)
      }
    })
  }

  created() {
    // 绑定按键esc隐藏此插件事件
    document.addEventListener('keyup', (e) => {
      if (this.value && (e.key == 'Escape' || e.keyCode == 27)) {
        this.off()
      }
    })
  }
}

export default ImageCropper
</script>

<style scoped lang="scss">
  .hamburger {
    display: inline-block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    transform: rotate(90deg);
    transition: .38s;
    transform-origin: 50% 50%;
  }

  .hamburger.is-active {
    transform: rotate(0deg);
  }
</style>
