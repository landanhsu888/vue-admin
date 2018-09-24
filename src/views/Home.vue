<template>
  <div class="home">
    <img alt="Vue logo" src="./../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <Button icon="el-icon-search" type="danger" circle></Button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './../components/HelloWorld.vue' // @ is an alias to /src
import Button from './../components/Button.vue' // @ is an alias to /src

@Component({
  components: {
  HelloWorld,
  Button
  }
  })
export default class Home extends Vue {
}
</script>
