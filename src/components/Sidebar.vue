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
      <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import SidebarItem from './SidebarItem.vue'

@Component({
  name: 'Navbar',
  components: {
    SidebarItem
  }
  })
class Navbar extends Vue {

  public get permission_routers () {
    return !this.$store.getters.permission_routers
  }

  public get sidebar (): any {
    return !this.$store.getters.sidebar
  }

  public get isCollapse () {
    return !this.sidebar.opened
  }
}

export default Navbar

</script>

<style scoped lang="scss">

</style>
