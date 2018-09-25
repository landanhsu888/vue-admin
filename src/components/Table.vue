<template>
  <el-table :data="tdata">
    <el-table-column :prop="'address'" v-for="(lebal, key) in labels" :label="lebal" :key="key">
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  props: ['data', 'labels', 'props']
  })
class ETable extends Vue {
  @Prop()
  data: Array<Object> = this.data
  @Prop()
  props: Array<string> = this.props
  @Prop()
  labels: Array<string> = this.labels
  // Typescript, must declare property of Class before we use this.data.
  // You only can use `data` or `props` in one time.
  // `data` means the property in porperty of Typescript.
  created () {
  }
  // get Class.method , computed method in Vue via Typescript
  public get tprops (): Array<string> {
    return Object.keys(this.data[0] || {})
  }
  public set tprops (props: Array<string>) {
    this.props = props
  }
  // get Class.method , computed method in Vue via Typescript
  public get tdata (): Array<Object> {
    return this.data
  }

  public set tdata (data: Array<Object>) {
    this.data = data
  }
}

export default ETable
</script>

<style scoped lang="scss">
</style>
