<template>
  <div class="home">
    <img alt="Vue logo" src="./../assets/logo.png">
    <Table :data="users" :labels="labels"></Table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Table from './../components/Table.vue' // @ is an alias to /src

@Component({
  components: {
  Table
  }
  })
class Home extends Vue {
  users: Array<Object> = [{
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

  labels: Array<string> = ['日期', '姓名', '地址'];
  created () {
  }
}

export default Home
</script>
