<template>
  <div class="card">
    <div class="card-body">
      <h5 class="text-center text-muted">{{ message }}</h5>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InitActionNotice',
  props: {
    message: {
      type: String,
      default: 'Data Not Found'
    }
  }
}
</script>
