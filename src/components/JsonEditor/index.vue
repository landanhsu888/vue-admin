<template>
  <div class="json-editor">
    <textarea ref="textarea"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
// require('script-loader!jsonlint')
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

@Component({
  name: 'JsonEditor',
  })
class JsonEditor extends Vue {
  @Prop()
  public value!: any

  public jsonEditor: any

  @Watch('value')
  valueHandler (value: any) {
    const editor_value = this.jsonEditor.getValue()
    if (value !== editor_value) {
      this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
    }
  }

  mounted () {
    let textarea: any = this.$refs.textarea
    this.jsonEditor = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      mode: 'application/json',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      lint: true
    })

    this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
    this.jsonEditor.on('change', (cm: any) => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
    })
  }

  getValue () {
    return this.jsonEditor.getValue()
  }
}

export default JsonEditor
</script>

<style scoped lang="scss">
  .json-editor{
    height: 100%;
    position: relative;
  }
  .json-editor >>> .CodeMirror {
    height: auto;
    min-height: 300px;
  }
  .json-editor >>> .CodeMirror-scroll{
    min-height: 300px;
  }
  .json-editor >>> .cm-s-rubyblue span.cm-string {
    color: #F08047;
  }
</style>
