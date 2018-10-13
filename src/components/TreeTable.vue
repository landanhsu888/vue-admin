<template>
  <el-table :data="formatData" :row-style="showRow" v-bind="$attrs">
    <el-table-column v-if="columns.length===0" width="150">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
        {{ scope.$index }}
      </template>
    </el-table-column>
    <el-table-column v-for="(column, index) in columns" v-else :key="column.value" :label="column.text" :width="column.width">
      <template slot-scope="scope">
        <!-- Todo -->
        <!-- eslint-disable-next-line vue/no-confusing-v-for-v-if -->
        <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
        {{ scope.row[column.value] }}
      </template>
    </el-table-column>
    <slot/>
  </el-table>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import treeToArray from './../utils/treeToArray'

@Component({
    name: 'TreeTable'
  })
class TreeTable extends Vue {

  @Prop()
  public data!: any[] | object
  
  @Prop({ default: [] })
  public columns!: any[]

  @Prop()
  public evalFunc!: Function

  @Prop()
  public evalArgs!: any[]

  @Prop({ default: false })
  public expandAll!: boolean
  
  public get formatData() {
    let tmp
    if (!Array.isArray(this.data)) {
      tmp = [this.data]
    } else {
      tmp = this.data
    }
    const func = this.evalFunc || treeToArray
    const args = this.evalArgs ? [tmp, this.expandAll, ...this.evalArgs] : [tmp, this.expandAll]
    return func.apply(null, args)
  }

  public showRow (row: any) {
    const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
    row.row._show = show
    return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
  }
    // 切换下级是否展开
  public toggleExpanded (trIndex: any) {
    const record = this.formatData[trIndex]
    record._expanded = !record._expanded
  }
    // 图标显示
  public iconShow(index: number, record: any) {
    return (index === 0 && record.children && record.children.length > 0)
  }

}

export default TreeTable
</script>

<style scoped lang="scss">
  @keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }

  $color-blue: #2196F3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: ""
    }
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }
</style>