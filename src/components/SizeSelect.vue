<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <sizeSvg class="svg-icon size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="size==='medium'" command="medium">Medium</el-dropdown-item>
      <el-dropdown-item :disabled="size==='small'" command="small">Small</el-dropdown-item>
      <el-dropdown-item :disabled="size==='mini'" command="mini">Mini</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import sizeSvg from './../svg/size.svg'

@Component({
  name: 'SizeSelect',
  })
class SizeSelect extends Vue {
  // computed
  public get size (): any {
    return this.$store.state.size
  }

  handleSetSize (this: any, size: any) {
    this.$ELEMENT.size = size
    this.$store.dispatch('setSize', size)
    this.refreshView()
    this.$message({
      message: 'Switch Size Success',
      type: 'success'
    })
  }

  refreshView () {
    // In order to make the cached page re-rendered
    this.$store.dispatch('delAllCachedViews', this.$route)

    const { fullPath } = this.$route

    this.$nextTick(() => {
      this.$router.replace({
        path: '/redirect' + fullPath
      })
    })
  }
}

export default SizeSelect
</script>

<style scoped lang="scss">
  .size-icon {
    font-size: 20px;
    cursor: pointer;
    vertical-align: -4px!important;
  }
</style>
