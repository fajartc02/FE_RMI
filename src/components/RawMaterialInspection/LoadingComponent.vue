<template>
  <div v-if="!IS_LOADING" class="spinner text-muted">
    Loading...
  </div>
</template>
<script>
import { IS_LOADING } from '@/store/modules/LOADING.module'
import { mapGetters } from 'vuex';
export default {
  name: 'Loading',
  computed: {
    ...mapGetters([IS_LOADING])
  }
}
</script>
<style></style>
