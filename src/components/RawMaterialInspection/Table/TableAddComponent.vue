<template>
  <div class="card p-2 mb-2">
    <div class="row">
      <div class="col-6">
        <CButton color="danger" class="text-white" @click="onClick">Add New {{ tag }}</CButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableAddComponent",
  props: {
    tag: String
  },
  methods: {
    onClick() {
      this.$emit("on-click")
    }
  }
}
</script>
