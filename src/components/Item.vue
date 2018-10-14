<template>
  <div>
    <BugSvg/>BUG need dymanic SVG
    <span slot='title'>{(title)}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import BugSvg from './../svg/bug.svg'

@Component({
  name: 'Item'
  })
class Item extends Vue {

  @Prop({ default: '' })
  public icon!: string

  @Prop({ default: '' })
  public title!: string
  
  render(h, context) {
    const { icon, title } = context.props
    const vnodes: any[] = []
    return vnodes
  }

}

export default Item
</script>

<style scoped lang="scss">

</style>

