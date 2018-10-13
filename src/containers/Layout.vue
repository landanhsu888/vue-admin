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
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeHandlerMixin],
  })
class Layout extends Vue {
 
  public get sidebar() {
    return this.$store.state.app.sidebar
  }

  public get device() {
    return this.$store.state.app.device
  }

  public get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === 'mobile'
    }
  }

  public handleClickOutside() {
    this.$store.dispatch('closeSideBar', { withoutAnimation: false })
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