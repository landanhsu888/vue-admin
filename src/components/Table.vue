<template>
  <el-table :data="tdata">
    <el-table-column prop="date" label="日期">
    </el-table-column>
    <el-table-column prop="name" label="姓名">
    </el-table-column>
    <el-table-column prop="address" label="地址">
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  props: ['rows']
  })
class ETable extends Vue {
  @Prop({
  })
  rows: Array<Object> = this.rows
  // Typescript, must declare property of Class before we use this.data.
  // You only can use `data` or `props` in one time.
  // `data` means the property in porperty of Typescript.
  created () {
    console.log(this.rows)
  }
  // get Class.method , computed method in Vue via Typescript
  public get tdata (): Array<Object> {
    return this.rows
  }

  public set tdata (rows: Array<Object>) {
    this.tdata = rows
  }
}

export default ETable
</script>

<style scoped lang="scss">
</style>
