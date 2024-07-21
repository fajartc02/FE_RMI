<template>
  <CCard class="mb-3">
    <CCardHeader>
      <CCardTitle>
        Scan {{ FormTitle }}
      </CCardTitle>
    </CCardHeader>

    <CCardBody>
      <CRow>
        <!-- <CForm> -->
        <CCol v-for="(Form, i) in Data" :key="i">
          <CFormInput :label="Form.label" :type="Form.type" :placeholder="Form.placeholder" v-model="Form.value" />
        </CCol>
        <!-- </CForm> -->
      </CRow>
    </CCardBody>

    <CCardFooter>
      <CButton color="success" @click="Form()">Upload</CButton>
    </CCardFooter>
  </CCard>
</template>

<script>
import { CButton } from '@coreui/vue';


export default {
  name: 'Form',

  data() {
    return {
      Data: this.FormData,
    }
  },

  methods: {
    Form() {
      let key = null
      for (let i = 0; i < this.Data.length; i++) {
        if (this.Data[i].value != '') {
          if (key != null) {
            params += '&' + this.Data[i].key + '=' + this.Data[i].value
          } else {
            key = this.Data[i].key + '=' + this.Data[i].value
          }
        }
      }
      console.log(key);
      this.$emit('outputData', key)
    },
  },

  props: {
    FormTitle: String,
    FormData: Array
  }
}

</script>
