<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">

    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <a :href="onlyOneChild.path" target="_blank" @click="clickLink(onlyOneChild.path,$event)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||item.meta.icon" :title="generateTitle(onlyOneChild.meta.title)" />
        </el-menu-item>
      </a>
    </template>

    <el-submenu v-else :index="item.name||item.path">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="generateTitle(item.meta.title)" />
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu" />

        <a v-else :href="child.path" :key="child.name" target="_blank" @click="clickLink(child.path,$event)">
          <el-menu-item :index="resolvePath(child.path)">
            <item v-if="child.meta" :icon="child.meta.icon" :title="generateTitle(child.meta.title)" />
          </el-menu-item>
        </a>
      </template>
    </el-submenu>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import path from 'path'
import { generateTitle } from '@/utils/i18n'
import { validateURL } from '@/utils/validate'

import Item from '@/components/Item/index.vue'

@Component({
  name: 'SidebarItem',
  components: {
  Item
  }
  })
class SidebarItem extends Vue {

  @Prop()
  public item!: object

  @Prop({ default: false })
  public isNest!: boolean

  @Prop({ default: '' })
  public basePath!: string

  public onlyOneChild: any = null

  public hasOneShowingChild (children, parent) {
    const showingChildren = children.filter(item => {
      if (item.hidden) {
        return false
      } else {
        // Temp set(will be used if only has one showing child)
        this.onlyOneChild = item
        return true
      }
    })

    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length === 1) {
      return true
    }

    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
      this.onlyOneChild = {
        ...parent,
        path: '',
        noShowingChildren: true
      }
      return true
    }

    return false
  }

  public resolvePath (routePath) {
    return path.resolve(this.basePath, routePath)
  }

  public isExternalLink (routePath) {
    return validateURL(routePath)
  }

  public clickLink (routePath, e) {
    if (!this.isExternalLink(routePath)) {
      e.preventDefault()
      const path = this.resolvePath(routePath)
      this.$router.push(path)
    }
  }

  public generateTitle (arg) {
    return generateTitle(arg)
  }
}

export default SidebarItem

</script>

<style scoped lang="scss">

</style>
