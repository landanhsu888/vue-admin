<template>
  <Button v-bind:icon="icon" v-bind:type="type" v-bind:circle="circle"></Button>
  <!-- Use Button instead of el-button when we use import -->
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Button } from 'element-ui'

@Component({
  components: {
  Button: Button
  },
  props: {
  icon: String,
  type: String,
  circle: Boolean
  }
  })
class _Button extends Vue {
}

export default _Button
</script>

<style scoped lang="scss">
</style>
