<template>
  <Table v-bind:data="data"></Table>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Table } from 'element-ui'

@Component({
  components: {
  Table: Table
  },
  props: {
    data: Array
  }
  })
class ETable extends Vue {
  data: Array<Object> = [] // Typescript, must declare property of Class
  constructor () {
    super()
    console.log(this.data)
  }
}

export default ETable
</script>

<style scoped lang="scss">
</style>
