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
            <TableIngotInternal :message="'Data not available'" />
          </div>
          <div v-if="GET_QR_SAMPLE.tableIntVendor || GET_SAMPLE_CODE" class="card-body overflow-auto p-2">
            <KMoldTamago @emit-kmold-tamago="onChangeKMoldTamago" />
          </div>
          <div v-if="GET_QR_SAMPLE.tableIntVendor || GET_SAMPLE_CODE" class="card-footer d-flex justify-content-evenly">
            <CButton style="width: 250px;" color="success" @click="submitCheckSampleIngot">Save</CButton>
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
import { ACTION_QR_SAMPLE, GET_QR_SAMPLE } from '@/store/modules/QR.module';
import TableIngotInternal from '@/components/RawMaterialInspection/TableIngotInternal.vue';
import KMoldTamago from '@/components/RawMaterialInspection/KMoldTamago.vue';
import { IS_LOADING, } from '@/store/modules/LOADING.module';
import { mapGetters } from 'vuex';
import { ACTION_ADD_SAMPLE_CODE, GET_SAMPLE_CODE } from '@/store/modules/SAMPLE_CODE.module';

import HeaderIngotCheckInternal from '@/components/RawMaterialInspection/HeaderIngotCheckInternal.vue';

export default {
  name: 'InspectionIngotInternal',
  data() {
    return {
      form: {
        header: null,
        values: null
      },
      displaySampleCode: '',
      input: {
        kMold: null,
        tamago: null,
        prevSampleCode: null,
      }
    }
  },
  computed: {
    ...mapGetters([IS_LOADING, GET_QR_SAMPLE, GET_SAMPLE_CODE]),
  },
  methods: {
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
      this.input.prevSampleCode = sampleCode
    },
    async submitCheckSampleIngot() {
      try {
        if (this.GET_QR_SAMPLE.headers.sampleId) this.input.sampleCode = this.GET_QR_SAMPLE.headers.sampleId
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
    KMoldTamago,
    HeaderIngotCheckInternal
  },
  mounted() {
    this.$store.dispatch(ACTION_QR_SAMPLE)
  }
}
</script>
