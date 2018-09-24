<template>
  <el-table :data="data">
    <el-table-column
      prop="date"
      label="日期">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Table } from 'element-ui'

@Component({
  components: {
  Table: Table
  },
  props: ['rows'],
  data: function () {
  return {
  __rows: []
  }
  }
  })
class ETable extends Vue {
  vdata:Array<any> = [{
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    }]

  // Typescript, must declare property of Class before we use this.data.
  // You only can use `data` or `props` in one time.
  // `data` means the property in porperty of Typescript.
  created () {
  }
  // get Class.method , computed method in Vue via Typescript
  public get data (): Array<Object> {
    return this.vdata
  }

  public set data (data: Array<Object>) {
    this.vdata = data
  }
}

export default ETable
</script>

<style scoped lang="scss">
</style>
