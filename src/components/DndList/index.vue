<template>
  <div class="dndList">
    <div :style="{width:width1}" class="dndList-list">
      <h3>{{ list1Title }}</h3>
      <draggable :list="list1" :options="{group:'article'}" class="dragArea">
        <div v-for="element in list1" :key="element.id" class="list-complete-item">
          <div class="list-complete-item-handle">[{{ element.author }}] {{ element.title }}</div>
          <div style="position:absolute;right:0px;">
            <span style="float: right ;margin-top: -20px;margin-right:5px;" @click="deleteEle(element)">
              <i style="color:#ff4949" class="el-icon-delete"/>
            </span>
          </div>
        </div>
      </draggable>
    </div>
    <div :style="{width:width2}" class="dndList-list">
      <h3>{{ list2Title }}</h3>
      <draggable :list="filterList2" :options="{group:'article'}" class="dragArea">
        <div v-for="element in filterList2" :key="element.id" class="list-complete-item">
          <div class="list-complete-item-handle2" @click="pushEle(element)"> [{{ element.author }}] {{ element.title }}</div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import draggable from 'vuedraggable'

@Component({
  name: 'DndList',
  components: {
  draggable
  }
  })
class DndList extends Vue {

  @Prop({ default: [] })
  public list1!: [any]
  @Prop({ default: [] })
  public list2!: [any]
  @Prop({ default: 'list1' })
  public list1Title!: string
  @Prop({ default: 'list2' })
  public list2Title!: string
  @Prop({ default: '48%' })
  public width1!: string
  @Prop({ default: '48%' })
  public width2!: string

  // computed
  public get filterList2 (): any {
    return this.list2.filter(v => {
      if (this.isNotInList1(v)) {
        return v
      }
      return false
    })
  }

  // The method of Vue lifecycle

  // method
  isNotInList1(v: any) {
    return this.list1.every(k => v.id !== k.id)
  }

  isNotInList2(v: any) {
    return this.list2.every(k => v.id !== k.id)
  }

  deleteEle(ele: any) {
    for (const item of this.list1) {
      if (item.id === ele.id) {
        const index = this.list1.indexOf(item)
        this.list1.splice(index, 1)
        break
      }
    }
    if (this.isNotInList2(ele)) {
      this.list2.unshift(ele)
    }
  }

  pushEle(ele: any) {
    this.list1.push(ele)
  }
}

export default DndList
</script>

<style scoped lang="scss">
  .dndList {
    background: #fff;
    padding-bottom: 40px;
    &:after {
      content: "";
      display: table;
      clear: both;
    }
    .dndList-list {
      float: left;
      padding-bottom: 30px;
      &:first-of-type {
        margin-right: 2%;
      }
      .dragArea {
        margin-top: 15px;
        min-height: 50px;
        padding-bottom: 30px;
      }
    }
  }

  .list-complete-item {
    cursor: pointer;
    position: relative;
    font-size: 14px;
    padding: 5px 12px;
    margin-top: 4px;
    border: 1px solid #bfcbd9;
    transition: all 1s;
  }

  .list-complete-item-handle {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 50px;
  }

  .list-complete-item-handle2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 20px;
  }

  .list-complete-item.sortable-chosen {
    background: #4AB7BD;
  }

  .list-complete-item.sortable-ghost {
    background: #30B08F;
  }

  .list-complete-enter,
  .list-complete-leave-active {
    opacity: 0;
  }
</style>
