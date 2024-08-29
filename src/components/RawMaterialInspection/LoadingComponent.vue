<template>
  <div v-if="IS_LOADING" class="d-flex flex-column justify-content-center align-items-center h-100 card" >
    <div class="spinner-border" role="status">
    </div>
    <div class="row mt-3">
      <strong>Loading ...</strong>
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
