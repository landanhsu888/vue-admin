<template>
  <div class="home">
    <img alt="Vue logo" src="./../assets/logo.png" v-on:click="onInsert">
    {{ "s tom" | capitalize }}
    <Table :data="members" :labels="labels"></Table>
    <BackToTop></BackToTop>
    <UploadExcel></UploadExcel>
    <Hamburger v-bind:toggleClick="onInsert"></Hamburger>
    <SizeSelect></SizeSelect>
<icon name="chameleon" :scale="20"></icon>
    <icon name="size" scale="20"></icon>
    ---
    <sss></sss>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import BackToTop from './../components/BackToTop.vue'
import UploadExcel from './../components/UploadExcel.vue'
import Hamburger from './../components/Hamburger.vue'
import SizeSelect from './../components/SizeSelect.vue'
import bug from './../svg/bug.svg'
import sss from './../svg/404.svg'
@Component({
  components: {
  BackToTop,
  UploadExcel,
  Hamburger,
  SizeSelect,
  sss
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
