<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
    <slot/>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

const padding = 15 // tag's padding

@Component({
  name: 'ScrollPane',
  })
class ScrollPane extends Vue {
  public left: number = 0
  // data

  // method

  public handleScroll (e: any) {
    // TODO
    let scrollContainer: any = this.$refs.scrollContainer
    const eventDelta = e.wheelDelta || -e.deltaY * 40
    const $scrollWrapper = scrollContainer.$refs.wrap
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
  }

  public moveToTarget ($target: any) {
    // TODO
    let scrollContainer: any = this.$refs.scrollContainer
    const $container = scrollContainer.$el
    const $containerWidth = $container.offsetWidth
    const $scrollWrapper = scrollContainer.$refs.wrap
    const $targetLeft = $target.offsetLeft
    const $targetWidth = $target.offsetWidth
    if ($targetLeft > $containerWidth) {
      // tag in the right
      $scrollWrapper.scrollLeft = $targetLeft - $containerWidth + $targetWidth + padding
    } else {
      // tag in the left
      $scrollWrapper.scrollLeft = $targetLeft - padding
    }
  }
}

export default ScrollPane
</script>

<style scoped lang="scss">
  .scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
    /deep/ {
      .el-scrollbar__bar {
        bottom: 0px;
      }
      .el-scrollbar__wrap {
        height: 49px;
      }
    }
  }
</style>
