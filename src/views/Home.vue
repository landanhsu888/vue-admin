<template>
  <div class="home">
    <img alt="Vue logo" src="./../assets/logo.png" v-on:click="onInsert">
    <Table :data="users" :labels="labels"></Table>
    --{{count}}--
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import Table from './../components/Table.vue' // @ is an alias to /src

@Component({
  components: {
  Table
  }
  })
class Home extends Vue {
  public users: Array<Object> = [{
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }, {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }, {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }];

  public labels: Array<string> = ['日期', '姓名', '地址'];
  created (): void {
  }

  public onInsert (): void {
    this.$store.commit('increment', 2)
  }
  public get doneTodosCount (): number {
    return this.$store.getters.doneTodosCount
  }

  public get count (): number {
    return this.$store.state.count
  }
}

export default Home
</script>
