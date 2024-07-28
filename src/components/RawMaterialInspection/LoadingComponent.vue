<template>
  <div v-if="IS_LOADING" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
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
