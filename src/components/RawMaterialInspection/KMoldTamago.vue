<template>
  <div class="row">
    <div class="col-lg-6 col-12">
      <CInputGroup class="input-prepend">
        <CInputGroupText>
          K-Mold
        </CInputGroupText>
        <CFormInput v-model="form.kMold" type="number" placeholder="Input K-Mold" />
      </CInputGroup>
    </div>
    <div class="col-lg-6 col-12">
      <CInputGroup class="input-prepend">
        <CInputGroupText>
          Tamago
        </CInputGroupText>
        <CFormInput v-model="form.tamago" type="number" placeholder="Input Tamago" />
      </CInputGroup>
    </div>
  </div>
</template>
<script>
export default {
  name: 'KMoldTamago',
  data() {
    return {
      form: {
        kMold: null,
        tamago: null
      }
    }
  },
  watch: {
    form: {
      handler() {
        this.$emit('emit-kmold-tamago', this.form)
      },
      deep: true
    }
  }
}
</script>
