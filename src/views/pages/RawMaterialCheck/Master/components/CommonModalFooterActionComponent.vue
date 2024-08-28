<template>
  <CModalFooter class="d-flex justify-content-center align-items-center">
    <CButton color="secondary" @click="() => $emit('on-close')">
      Close
    </CButton>
    <CButton v-if="hasLoadedData" color="secondary" @click="() => $emit('on-delete')">
      Delete
    </CButton>
    <CButton color="success" @click="() => $emit('on-submit')">
      {{ submitTitle }}
    </CButton>
  </CModalFooter>
</template>
<script>
export default {
  name: "CommonFooterActionComponent",
  props: {
    submitTitle: {
      type: String,
      default: "Submit"
    },
    hasLoadedData: Boolean
  }
}
</script>
