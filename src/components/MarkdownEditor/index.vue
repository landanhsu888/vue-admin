<template>
  <div :style="{height:height+'px',zIndex:zIndex}" class="simplemde-container">
    <textarea :id="id"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import 'font-awesome/css/font-awesome.min.css'
import 'simplemde/dist/simplemde.min.css'
import SimpleMDE from 'simplemde'

@Component({
  name: 'MarkdownEditor'
  })
class MarkdownEditor extends Vue {
  @Prop({ default: '' })
  public value!: string

  @Prop({ default: 'markdown-editor-' + +new Date() })
  public id!: string

  @Prop({ default: false })
  public autofocus!: boolean

  @Prop({ default: '' })
  public placeholder!: string

  @Prop({ default: 150 })
  public height!: number

  @Prop({ default: 10 })
  public zIndex!: number

  @Prop({ default: [] })
  public toolbar!: [any]

  public simplemde: any = null
  public hasChange: boolean = false

  @Watch ('value')
  public valueHandler (val: any) {
    if (val === this.simplemde.value() && !this.hasChange) {
      return void 0
    }
    this.simplemde.value(val)
  }

  mounted () {
    let ele: any = document.getElementById(this.id)
    this.simplemde = new SimpleMDE({
      element: ele,
      autoDownloadFontAwesome: false,
      autofocus: this.autofocus,
      toolbar: this.toolbar.length > 0 ? this.toolbar : undefined,
      spellChecker: false,
      insertTexts: {
        link: ['[', ']( )']
      },
      // hideIcons: ['guide', 'heading', 'quote', 'image', 'preview', 'side-by-side', 'fullscreen'],
      placeholder: this.placeholder
    })
    if (this.value) {
      this.simplemde.value(this.value)
    }
    this.simplemde.codemirror.on('change', () => {
      if (this.hasChange) {
        this.hasChange = true
      }
      this.$emit('input', this.simplemde.value())
    })
  }

  destroyed () {
    this.simplemde.toTextArea()
    this.simplemde = null
  }
}

export default MarkdownEditor
</script>

<style scoped lang="scss">
  .simplemde-container>>>.CodeMirror {
    min-height: 150px;
    line-height: 20px;
  }

  .simplemde-container>>>.CodeMirror-scroll {
    min-height: 150px;
  }

  .simplemde-container>>>.CodeMirror-code {
    padding-bottom: 40px;
  }

  .simplemde-container>>>.editor-statusbar {
    display: none;
  }

  .simplemde-container>>>.CodeMirror .CodeMirror-code .cm-link {
    color: #1890ff;
  }

  .simplemde-container>>>.CodeMirror .CodeMirror-code .cm-string.cm-url {
    color: #2d3b4d;
  }

  .simplemde-container>>>.CodeMirror .CodeMirror-code .cm-formatting-link-string.cm-url {
    padding: 0 2px;
    color: #E61E1E;
  }
  .simplemde-container >>> .editor-toolbar.fullscreen,
  .simplemde-container >>> .CodeMirror-fullscreen {
    z-index: 1003;
  }
</style>
