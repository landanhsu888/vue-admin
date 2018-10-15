<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in permissionRouters" :key="route.name" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import SidebarItem from '@/components/SidebarItem/index.vue'

@Component({
  name: 'Sidebar',
  components: {
  SidebarItem
  }
  })
class Sidebar extends Vue {
  public get permissionRouters () {
    return !this.$store.getters.permissionRouters
  }

  public get sidebar (): any {
    return !this.$store.getters.sidebar
  }

  public get isCollapse () {
    return !this.sidebar.opened
  }
}

export default Sidebar

</script>

<style scoped lang="scss">

</style>
