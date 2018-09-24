<template>
  <Table v-bind:data="__rows"></Table>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Table } from 'element-ui'

@Component({
  components: {
  Table: Table
  },
  props: ['rows']
  })
class ETable extends Vue {
  @Prop()
  rows!: Array<Object>
  // Typescript, must declare property of Class before we use this.data.
  // You only can use `data` or `props` in one time.
  // `data` means the property in porperty of Typescript.
  created () {
    console.log('rows', this.rows)
  }

  // get Class.method , computed method in Vue via Typescript
  public get __rows (): Array<Object> {
    return this.rows
  }

  public set __rows (rows: Array<Object>) {
    this.rows = rows
  }
}

export default ETable
</script>

<style scoped lang="scss">
</style>
