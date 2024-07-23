<template>
  <router-view />
</template>

<script>
import { ACTION_LOGIN } from '@/store/modules/AUTH.module'
export default {
  name: 'App',
  mounted() {
    this.$store.dispatch(ACTION_LOGIN)
  }
}
</script>

<!--
<style lang="scss">
// Import Main styles for this application
//@import 'styles/style';
@import 'styles/custom';
</style>
-->
