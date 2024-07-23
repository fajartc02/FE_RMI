<template>
  <div class="card p-2">
    <div class="d-flex align-items-center">
      <h5>{{ title }}</h5>
    </div>
  </div>
</template>
<script>
export default {
  name: "HeaderComp",
  props: {
    title: {
      type: String,
      default: () => {
        return "Not Defined";
      }
    }
  }
}
</script>
