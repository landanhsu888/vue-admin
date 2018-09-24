<template>
  <div class="home">
    <img alt="Vue logo" src="./../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <Table v-bind:data="users"></Table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './../components/HelloWorld.vue' // @ is an alias to /src
import Button from './../components/Button.vue' // @ is an alias to /src
import Table from './../components/Table.vue' // @ is an alias to /src

@Component({
  components: {
  HelloWorld,
  Button
  },
  data: function () {
  return {
  users: [{
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
  }]
  }
  }
  })
export default class Home extends Vue {
}
</script>
