<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <internationalSvg class="svg-icon language"/>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import internationalSvg from './../svg/international.svg'

@Component({
  name: 'LangSelect'
  })
class LangSelect extends Vue {

  @Prop({ default: 'Header'})
  public headerText!: string

  @Prop({ default: {} })
  public options!: object

  @Prop({ default: [] })
  public list!: [any]

  public get language (): string {
    return this.$store.getters.language
  }

  handleSetLanguage(lang: any) {
    this.$i18n.locale = lang
    this.$store.dispatch('setLanguage', lang)
    this.$message({
      message: 'Switch Language Success',
      type: 'success'
    })
  }
}

export default LangSelect
</script>

<style scoped lang="scss">
  .international-icon {
    font-size: 20px;
    cursor: pointer;
    vertical-align: -5px!important;
  }
</style>
