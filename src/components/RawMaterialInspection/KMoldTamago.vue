<template>
  <th>
    <CFormInput v-model="form.kMold" type="number" placeholder="Input K-Mold" />
  </th>
  <th>
    <CFormInput v-model="form.tamago" type="number" placeholder="Input Tamago" />
  </th>
</template>

<script>
export default {
  name: 'KMoldTamago',
  data() {
    return {
      form: {
        lotNo: null,
        kMold: null,
        tamago: null
      }
    }
  },
  watch: {
    form: {
      handler() {
        // console.log(this.form);

        this.$emit('emit-kmold-tamago', this.form)
      },
      deep: true
    }
  },
  props: {
    lotNo: {
      type: String,
      default: null
    }
  },
  mounted() {
    if (this.lotNo) {
      this.form.lotNo = this.lotNo
      this.$emit('emit-kmold-tamago', this.form)
    }
  }
}
</script>
