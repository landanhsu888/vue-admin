<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container editor-container">
    <textarea :id="tinymceId" class="tinymce-textarea"/>
    <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import editorImage from './../components/editorImage.vue'

@Component({
    name: 'Tinymce',
    components: {
      editorImage
    }
  })
class Tinymce extends Vue {

  @Prop({ default: 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '') })
  public id!: string
  
  @Prop({ default: ''})
  public value!: string

  @Prop({ default: [] })
  public toolbar!: any[]

  @Prop({ default: 'file edit insert view format table' })
  public menubar!: string

  @Prop({ default: 360 })
  public height!: number
  
  public hasChange: boolean = false
  public hasInit: boolean = false
  public tinymceId: string = this.id
  public fullscreen: boolean = false
  public languageTypeList: any = {
    'en': 'en',
    'zh': 'zh_CN'
  }

  public get language() {
    return this.languageTypeList[this.$store.getters.language]
  }

  public updateStyle(style: any, oldCluster: any, newCluster:any): any {
    let newStyle = style
    oldCluster.forEach((color: any, index: any) => {
      newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
    })
    return newStyle
  }

  public getCSSString(this: any, url: any, callback: Function, variable: any): void {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
        callback()
      }
    }
    xhr.open('GET', url)
    xhr.send()
  }

  public getThemeCluster(theme: any) {
    const tintColor = (color: any, tint: any) => {
      let red:any = parseInt(color.slice(0, 2), 16)
      let green:any = parseInt(color.slice(2, 4), 16)
      let blue:any = parseInt(color.slice(4, 6), 16)

      if (tint === 0) { // when primary color is in its rgb space
        return [red, green, blue].join(',')
      } else {
        red += Math.round(tint * (255 - red))
        green += Math.round(tint * (255 - green))
        blue += Math.round(tint * (255 - blue))

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }
    }

    const shadeColor = (color: any, shade: any) => {
      let red:any = parseInt(color.slice(0, 2), 16)
      let green:any = parseInt(color.slice(2, 4), 16)
      let blue:any = parseInt(color.slice(4, 6), 16)

      red = Math.round((1 - shade) * red)
      green = Math.round((1 - shade) * green)
      blue = Math.round((1 - shade) * blue)

      red = red.toString(16)
      green = green.toString(16)
      blue = blue.toString(16)

      return `#${red}${green}${blue}`
    }

    const clusters = [theme]
    for (let i = 0; i <= 9; i++) {
      clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
    }
    clusters.push(shadeColor(theme, 0.1))
    return clusters
  }

}

export default Tinymce
</script>

<style scoped lang="scss">
  .tinymce-container {
    position: relative;
  }
  .tinymce-container>>>.mce-fullscreen {
    z-index: 10000;
  }
  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }
  .editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
    /*z-index: 2005;*/
  }
  .fullscreen .editor-custom-btn-container {
    z-index: 10000;
    position: fixed;
  }
  .editor-upload-btn {
    display: inline-block;
  }
</style>