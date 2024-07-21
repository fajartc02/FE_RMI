<template>
  <CCard>
    <CCardHeader>
      <CCardTitle>
        Data Validation
      </CCardTitle>
    </CCardHeader>

    <CCardBody>

    </CCardBody>
    <CCardFooter>

    </CCardFooter>
  </CCard>
</template>

<script>
export default {
  name: 'CardValidator',

  data(){
    return{
      data: this.scannedData
    }
  },

  methods: {

  },

  props: {
    scannedData: String,

  }
}
</script>
