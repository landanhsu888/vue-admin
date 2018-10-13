<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <tags-view/>
      <app-main/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import Navbar from './../components/Navbar.vue'
import Sidebar from './../components/Sidervar.vue'
import AppMain from './../components/AppMain.vue'
import TagsView from './../components/TagsView.vue'

import ResizeHandlerMixin from './../mixins/ResizeHandler'

@Component({
    name: 'Layout'
  })
class Layout extends Vue {

  @Prop()
  public data!: any[] | object
  
  @Prop({ default: [] })
  public columns!: any[]

  @Prop()
  public evalFunc!: Function

  @Prop()
  public evalArgs!: any[]

  @Prop({ default: false })
  public expandAll!: boolean
  
  public get formatData() {
    let tmp
    if (!Array.isArray(this.data)) {
      tmp = [this.data]
    } else {
      tmp = this.data
    }
    const func = this.evalFunc || treeToArray
    const args = this.evalArgs ? [tmp, this.expandAll, ...this.evalArgs] : [tmp, this.expandAll]
    return func.apply(null, args)
  }

  public showRow (row: any) {
    const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
    row.row._show = show
    return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
  }
    // 切换下级是否展开
  public toggleExpanded (trIndex: any) {
    const record = this.formatData[trIndex]
    record._expanded = !record._expanded
  }
    // 图标显示
  public iconShow(index: number, record: any) {
    return (index === 0 && record.children && record.children.length > 0)
  }

}

export default Layout
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>