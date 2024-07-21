<!--
 src\components\Search.vue

 how to use this component

 <Search :SearchTitle="SearchTitle" :SearchData="search"/>

 search: [
    {
      label: 'Label',
      type: 'text',
      placeholder: 'Placeholder',
      value: ''
    }
  ]

  -->

<template>
  <CCard class="mb-3">
    <CCardHeader>
      <CCardTitle>
        Search {{ SearchTitle }}
      </CCardTitle>
    </CCardHeader>

    <CCardBody>
      <CRow>
        <!-- <CForm> -->
          <CCol  v-for="(search, i) in Data" :key="i">
            <CFormInput :label="search.label" :type="search.type"  :placeholder="search.placeholder" v-model="search.value"/>
          </CCol>
        <!-- </CForm> -->
      </CRow>
    </CCardBody>

    <CCardFooter>
      <CButton color="success" @click="search()">Search</CButton>
    </CCardFooter>
  </CCard>
</template>

<script>
import { CButton } from '@coreui/vue';


export default {
  name: 'Search',

  data() {
    return {
      Data: this.SearchData,
    }
  },

  methods: {
    search() {
      let params = null
      for (let i = 0; i < this.Data.length; i++) {
        if(this.Data[i].value != ''){
          if(params != null){
            params += '&' + this.Data[i].params + '=' + this.Data[i].value
          }else{
            params = this.Data[i].params + '=' + this.Data[i].value
          }
        }
      }
      console.log(params);
      this.$emit('dataSend', params)
    },
  },

  props: {
    SearchTitle: String,
    SearchData: Array
  }
}

</script>
