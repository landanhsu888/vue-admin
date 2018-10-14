<template>
  <div class="home">
    <img alt="Vue logo" src="./../assets/logo.png" v-on:click="onInsert">
    {{ "s tom" | capitalize }}
    <Table :data="members" :labels="labels"></Table>
    <BackToTop></BackToTop>
    <UploadExcel></UploadExcel>
    <Hamburger v-bind:toggleClick="onInsert"></Hamburger>
    <SizeSelect></SizeSelect>
    ---
    <Bug :class="'svg-icon'"></Bug>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  }
  })
class Redirect extends Vue {

}

export default Redirect
</script>
