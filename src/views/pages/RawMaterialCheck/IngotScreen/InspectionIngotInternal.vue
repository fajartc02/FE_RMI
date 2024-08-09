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
            <HeaderIngotCheckInternal @emit-sample-code="onChangeSampleCode" @emit-change-gaugeId="onChangeGaugeId"
              @emit-btn-active="onChangeBtnResample" />
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-1">
      <div class="col-12">
        <template v-if="sampleCodeSuggested.length > 0 && isCodeNotValid">
          <label>Select Valid Sample Code:</label>
          <treeselect v-model="selectedValidSampleCode" :options="sampleCodeSuggested" :clearable="true"
            placeholder="Silahkan pilih sample code" />
        </template>
        <div v-if="!IS_LOADING" class="card my-2" style="z-index: 1;">
          <div class="card-body overflow-auto p-2">
            <h6>Sample Ingot Internal</h6>
            <h5 v-if="GET_QR_SAMPLE.tableInternalVendor || GET_SAMPLE_CODE">Sample Code: {{
              GET_QR_SAMPLE.headers?.sampleCode }}</h5>
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
import { ACTION_RESET_QR_SAMPLE, GET_QR_SAMPLE } from '@/store/modules/QR.module';
import TableIngotInternal from '@/components/RawMaterialInspection/TableIngotInternal.vue';

import { IS_LOADING, } from '@/store/modules/LOADING.module';
import { mapGetters } from 'vuex';
import { ACTION_ADD_SAMPLE_CODE, GET_SAMPLE_CODE, GET_SAMPLE_CODE_SUGGESTED_TREESELECT, ACTION_SAMPLE_CODE_SUGGESTED } from '@/store/modules/SAMPLE_CODE.module';

import HeaderIngotCheckInternal from '@/components/RawMaterialInspection/HeaderIngotCheckInternal.vue';
import { ACTION_RESET_SAMPLE_INGOT, ACTION_SAMPLE_INGOT } from '@/store/modules/SAMPLE_INGOT.module';

import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();

import Treeselect from '@zanmato/vue3-treeselect'
import "@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css";

export default {
  name: 'InspectionIngotInternal',
  data() {
    return {
      form: {
        header: null,
        values: null
      },
      selectedValidSampleCode: null,
      selectedGaugeId: null,
      containerInput: [],
      displaySampleCode: '',
      input: {
        sampleCode: null,
        values: []
      },
      prevSampleCode: null,
      isSubmited: false,
      isCodeNotValid: false,
      sampleCodeSuggested: [],
    }
  },
  watch: {
    GET_QR_SAMPLE: {
      handler() {
        if (this.GET_QR_SAMPLE.headers) {
          $toast.success('Sample Code: ' + this.GET_QR_SAMPLE.headers.sampleCode + ' (klik di sini apabila tidak sesuai!)', {
            type: 'info',
            position: 'top-right',
            duration: 10000,
            onClick: async () => {
              this.isCodeNotValid = true
              await this.$store.dispatch(ACTION_SAMPLE_CODE_SUGGESTED, {
                gaugeId: this.selectedGaugeId,
                incharge: 'INTERNAL'
              })
              this.selectedValidSampleCode = null
              await this.$store.dispatch(ACTION_RESET_SAMPLE_INGOT)
              await this.$store.dispatch(ACTION_RESET_QR_SAMPLE)
              this.sampleCodeSuggested = this.GET_SAMPLE_CODE_SUGGESTED_TREESELECT
            }
          })
        }
      },
      deep: true
    },
    async selectedValidSampleCode() {
      await this.$store.dispatch(ACTION_RESET_SAMPLE_INGOT)
      await this.$store.dispatch(ACTION_RESET_QR_SAMPLE)
      if (this.selectedValidSampleCode) {
        this.input.sampleCode = this.selectedValidSampleCode
        await this.$store.dispatch(ACTION_SAMPLE_INGOT, { gaugeId: this.selectedGaugeId, filter: { sampleId: this.selectedValidSampleCode } })
      }
    }
  },
  computed: {
    ...mapGetters([IS_LOADING, GET_QR_SAMPLE, GET_SAMPLE_CODE, GET_SAMPLE_CODE_SUGGESTED_TREESELECT]),
    isKmoldTamagoFill() {
      return this.input.values.filter(item => item.kMold == null || item.tamago == null).length == 0
    }
  },
  methods: {
    onChangeBtnResample(isBtnChange) {
      if (isBtnChange) {
        this.$store.dispatch(ACTION_RESET_QR_SAMPLE)
        this.isCodeNotValid = false
        $toast.clear()
      }
    },
    onChangeGaugeId(gaugeId) {
      this.selectedGaugeId = gaugeId
    },
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
    HeaderIngotCheckInternal,
    Treeselect
  },
  async mounted() {
    await this.$store.dispatch(ACTION_RESET_SAMPLE_INGOT)
    await this.$store.dispatch(ACTION_RESET_QR_SAMPLE)
  }
}
</script>
