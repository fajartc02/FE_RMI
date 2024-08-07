<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <HeaderComp title="Ingot Inspection (Internal)" />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <div class="card" style="z-index: 2;">
          <div class="card-body p-1">
            <HeaderIngotCheckInternal @emit-sample-code="onChangeSampleCode" />
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-1">
      <div class="col-12">
        <div v-if="!IS_LOADING" class="card" style="z-index: 1;">
          <div class="card-body overflow-auto p-2">
            <h6>Sample Ingot Internal</h6>
            <TableIngotInternal @emit-sample-code="onChangeSampleCode" @emit-container-input="onChangeContainerInput"
              :message="'Data not available'" />
          </div>

          <div v-if="GET_QR_SAMPLE.tableInternalVendor || GET_SAMPLE_CODE"
            class="card-footer d-flex justify-content-evenly">
            <CButton v-if="isKmoldTamagoFill && !isSubmited" style="width: 250px;" color="success"
              @click="submitCheckSampleIngot">
              Save</CButton>
            <CButton v-else-if="isSubmited" style="width: 250px;" color="success" disabled="true">Submitted
            </CButton>
            <CButton v-else style="width: 250px;" color="danger" disabled="true">Please fill all input</CButton>
            <CButton style="width: 250px;" color="secondary" @click="goToPreviousScreen">Cancel</CButton>
          </div>
        </div>
        <div class="card">
          <LoadingComponent class="mt-4" />
        </div>
      </div>
    </div>
  </div>
  <!-- <QRScanner FormTitle="Ingot" :FormData="forms" @outputData="scanner" /> -->
</template>

<script>
// import QRScanner from '@/components/RawMaterialInspection/QRScanner.vue'
import HeaderComp from '@/components/RawMaterialInspection/HeaderComp.vue'
import LoadingComponent from '@/components/RawMaterialInspection/LoadingComponent.vue';
import { ACTION_QR_SAMPLE, ACTION_RESET_QR_SAMPLE, GET_QR_SAMPLE } from '@/store/modules/QR.module';
import TableIngotInternal from '@/components/RawMaterialInspection/TableIngotInternal.vue';

import { IS_LOADING, } from '@/store/modules/LOADING.module';
import { mapGetters } from 'vuex';
import { ACTION_ADD_SAMPLE_CODE, ACTION_SAMPLE_CODE, GET_SAMPLE_CODE } from '@/store/modules/SAMPLE_CODE.module';

import HeaderIngotCheckInternal from '@/components/RawMaterialInspection/HeaderIngotCheckInternal.vue';
import { ACTION_RESET_SAMPLE_INGOT } from '@/store/modules/SAMPLE_INGOT.module';

export default {
  name: 'InspectionIngotInternal',
  data() {
    return {
      form: {
        header: null,
        values: null
      },
      containerInput: [],
      displaySampleCode: '',
      input: {
        sampleCode: null,
        values: []
      },
      prevSampleCode: null,
      isSubmited: false,
    }
  },
  computed: {
    ...mapGetters([IS_LOADING, GET_QR_SAMPLE, GET_SAMPLE_CODE]),
    isKmoldTamagoFill() {
      return this.input.values.filter(item => item.kMold == null || item.tamago == null).length == 0
    }
  },
  methods: {
    onChangeContainerInput(data) {
      this.input.values = data
    },
    cancelScanned() {
      this.form = {
        header: null,
        values: null
      }
      this.displaySampleCode = ''
    },
    onChangeKMoldTamago(data) {
      this.input.tamago = data.tamago
      this.input.kMold = data.kMold
    },
    onChangeSampleCode(sampleCode) {
      this.prevSampleCode = sampleCode
    },
    async submitCheckSampleIngot() {
      try {
        this.isSubmited = true
        this.input.sampleCode = this.prevSampleCode
        await this.$store.dispatch(ACTION_ADD_SAMPLE_CODE, this.input)
        this.$swal('Success', 'Success add sample', 'success')
      } catch (error) {
        this.$swal('Success', 'Error add sample code', 'success')
        alert(JSON.stringify(error))
      }
    }
  },
  components: {
    // QRScanner,
    HeaderComp,
    LoadingComponent,
    TableIngotInternal,
    HeaderIngotCheckInternal
  },
  async mounted() {
    await this.$store.dispatch(ACTION_RESET_SAMPLE_INGOT)
    await this.$store.dispatch(ACTION_RESET_QR_SAMPLE)
  }
}
</script>
