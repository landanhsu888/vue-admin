<template>
  <div class="home">
    <img alt="Vue logo" src="./../assets/logo.png" v-on:click="onInsert">
    <Table :data="members" :labels="labels"></Table>
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
  public labels: Array<string> = ['ID', '地址', '姓名'];
  created (): void {
    this.$store.dispatch('MEMBER_FIND')
  }

  public onInsert (): void {
    let member = {
      email: 'seven@gmail.com',
      name: 'Seven'
    }
    let members = [member]
    this.$store.dispatch('MEMBER_INSERT', members)
  }

  public get members (): number {
    return this.$store.state.members
  }
}

export default Home
</script>
