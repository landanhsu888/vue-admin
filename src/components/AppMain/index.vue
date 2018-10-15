<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppMain',
  components: {
  }
  })
class AppMain extends Vue {

  public get cachedViews () {
    return this.$store.state.tagsView.cachedViews
  }

  public get key () {
    return this.$route.fullPath
  }

}

export default AppMain

</script>

<style scoped lang="scss">

  .app-main {
    /*84 = navbar + tags-view = 50 +34 */
    min-height: calc(100vh - 84px);
    width: 100%;
    position: relative;
    overflow: hidden;
  }
</style>
