<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <div :class="className" :style="{top:stickyTop+'px',zIndex:zIndex,position:position,width:width,height:height+'px'}">
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'Sticky',
  })
class Sticky extends Vue {
  
  @Prop({ default: 0 })
  public stickyTop!: number

  @Prop({ default: 1 })
  public zIndex!: number

  @Prop({ default: '' })
  public className!: string
  
  // data
  public active: boolean = false
  public position: string = ''
  public width: any = void 0
  public height: any = void 0
  public isSticky: boolean = false


  public mounted() {
    this.height = this.$el.getBoundingClientRect().height
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleReize)
  }

  public activated() {
    this.handleScroll()
  }

  public destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleReize)
  }

  // method

  public sticky() {
    if (this.active) {
      return
    }
    this.position = 'fixed'
    this.active = true
    this.width = this.width + 'px'
    this.isSticky = true
  }

  public reset() {
    if (!this.active) {
      return
    }
    this.position = ''
    this.width = 'auto'
    this.active = false
    this.isSticky = false
  }

  public handleScroll() {
    this.width = this.$el.getBoundingClientRect().width
    const offsetTop = this.$el.getBoundingClientRect().top
    if (offsetTop < this.stickyTop) {
      this.sticky()
      return
    }
    this.reset()
  }

  public handleReize() {
    if (this.isSticky) {
      this.width = this.$el.getBoundingClientRect().width + 'px'
    }
  }
}

export default Sticky
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
