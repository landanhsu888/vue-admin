<template>
  <Button icon="el-icon-search" circle></Button>
  <!-- Use Button instead of el-button when we use import -->
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Button } from 'element-ui'

@Component({
  components: {
  Button: Button
  }
  })
class _Button extends Vue {
}

export default _Button
</script>

<style scoped lang="scss">
</style>
