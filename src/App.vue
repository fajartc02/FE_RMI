<template>
  <router-view />
</template>

<script>
import { ACTION_LOGIN } from '@/store/modules/AUTH.module'
import ApiService from './store/services/api.service';
export default {
  name: 'App',
  mounted() {
    try {
      this.$store.dispatch(ACTION_LOGIN)
    } catch (error) {
      this.$swal('Error', error, 'error')
    }
  }
}
</script>
