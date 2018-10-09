<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"/>
  </svg>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'SvgIcon',
  })
class SvgIcon extends Vue {
  // method
  @Prop()
  public iconClass!: string

  @Prop({ default: '' })
  public className!: string

  public get iconName (): string {
    return `#icon-${this.iconClass}`
  }

  public get svgClass (): string {
    if (this.className) {
      return 'svg-icon ' + this.className
    }
    return 'svg-icon'
  }
}

export default SvgIcon
</script>

<style scoped lang="scss">
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
