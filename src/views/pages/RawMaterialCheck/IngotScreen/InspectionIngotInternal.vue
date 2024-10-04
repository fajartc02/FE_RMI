<template>
  <CModal scrollable size="xl" :visible="modalShowJudg" backdrop="static" @close="() => { modalShowJudg = false }">
    <CModalHeader>
      <CModalTitle>Result Abnormal Parameter</CModalTitle>
    </CModalHeader>
    <CModalBody v-if="elementOutOfRanged.length > 0">
      <template v-for="(data, idx) in elementOutOfRanged" :key="data">
        <h6>Sample Code: {{ data.lotNo }}</h6>
        <table class="table table-bordered table-striped text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Element</th>
              <th>Min</th>
              <th>Max</th>
              <th>Value</th>
              <th>Status</th>
              <th>Adjustment</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(element, i) in data.elements" :key="element">
              <td>{{ i + 1 }}</td>
              <td>{{ element.name }}</td>
              <td>{{ element.min }}</td>
              <td>{{ element.max }}</td>
              <td>{{ element.value }}</td>
              <td class="text-danger">NG</td>
              <td class="text-center">
                <div v-if="element.adjustmentFormula?.adjustmentValue" class="row">
                  <div class="col-4 text-center">
                    {{ element.adjustmentFormula.avg }}
                  </div>
                  <div class="col-4 text-center">
                    X
                  </div>
                  <div class="col-4 text-center">
                    {{ element.adjustmentFormula.weightMolten }}
                  </div>
                </div>
                <div v-if="element.adjustmentFormula?.adjustmentValue"
                  class="row d-flex justify-content-center align-items-center">
                  <div class="col-12 text-center">
                    <hr class="m-1">
                    {{ element.adjustmentFormula.budomari }}
                  </div>
                </div>
              </td>
              <td>
                <div v-if="element.adjustmentFormula?.adjustmentValue" class="row">
                  <div class="col-5 text-center">
                    <input class="form-control" type="number" min="0"
                      v-model="element.adjustmentFormula.adjustmentValue">
                  </div>
                  <div class="col-2 text-center">
                    <h6>Kg</h6>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <label class="form-label">Notes</label>
      <textarea class="form-control" cols="30" rows="3" v-model="notes"></textarea>
    </CModalBody>
    <CModalFooter class="d-flex justify-content-center align-items-center">
      <a :href="reportLink">
        <CButton color="warning">Download PDF</CButton>
      </a>
      <CButton color="success" @click="submitAbnormalSample()">Save Adjustment
      </CButton>
    </CModalFooter>
  </CModal>
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
            <h5 v-if="GET_QR_SAMPLE?.tableInternalVendor || GET_SAMPLE_CODE">Sample Code: {{
              GET_QR_SAMPLE?.headers?.sampleCode }}</h5>
            <TableIngotInternal @emit-sample-code="onChangeSampleCode" @emit-container-input="onChangeContainerInput"
              :message="'Data not available'" />

          </div>

          <div v-if="GET_QR_SAMPLE?.tableInternalVendor || GET_SAMPLE_CODE"
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
import { ACTION_ADD_SAMPLE_CODE, GET_SAMPLE_CODE, GET_SAMPLE_CODE_SUGGESTED_TREESELECT, ACTION_SAMPLE_CODE_SUGGESTED, ACTION_ADD_SAMPLE_ABNORMAL } from '@/store/modules/SAMPLE_CODE.module';

import HeaderIngotCheckInternal from '@/components/RawMaterialInspection/HeaderIngotCheckInternal.vue';
import { ACTION_RESET_SAMPLE_INGOT, ACTION_SAMPLE_INGOT, ACTION_SAMPLE_INGOT_HISTORICAL_DETAIL } from '@/store/modules/SAMPLE_INGOT.module';

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
      reportLink: null,
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
      elementOutOfRanged: [],
      modalShowJudg: false,
      notes: null
    }
  },
  watch: {
    GET_QR_SAMPLE: {
      handler() {
        if (this?.GET_QR_SAMPLE?.headers) {
          $toast.success('Sample Code: ' + this?.GET_QR_SAMPLE?.headers.sampleCode + ' (klik di sini apabila tidak sesuai!)', {
            type: 'info',
            position: 'top-right',
            duration: 10000,
            onClick: async () => {
              this.isCodeNotValid = true
              await this.$store.dispatch(ACTION_SAMPLE_CODE_SUGGESTED, {
                gaugeId: this.selectedGaugeId,
                inCharge: 'INTERNAL'
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
        await this.$store.dispatch(ACTION_SAMPLE_INGOT_HISTORICAL_DETAIL, this.selectedValidSampleCode)
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
        this.selectedValidSampleCode = null
        this.$store.dispatch(ACTION_RESET_QR_SAMPLE)
        this.isCodeNotValid = false
        $toast.clear()
      }
    },
    onChangeGaugeId(gaugeId) {
      this.selectedValidSampleCode = null
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
        this.input.sampleCode = this.prevSampleCode ? this.prevSampleCode : this?.GET_QR_SAMPLE?.tableInternalVendor?.id

        const response = await this.$store.dispatch(ACTION_ADD_SAMPLE_CODE, this.input)
        this.isSubmited = true
        console.log(response);

        let state = this.conditionJudgmentIngotCheck(response)
        if (state) {
          this.$router.push('/inspection/ingot/historical')
          this.$swal('Success', 'Add sample success, Pengecekan tidak ada abnormal', 'success')
        }
      } catch (error) {
        this.$swal('Error', 'Error add sample code', 'error')
      }
    },
    conditionJudgmentIngotCheck({ data }) {
      try {
        if (data) {
          this.elementOutOfRanged = data.values
          console.log('data.values', data.values);

          console.log(this.elementOutOfRanged);
          // const uniqueData = this.elementOutOfRanged.elements.filter((value, index, self) => index === self.findIndex((item) => item.id === value.id))
          // console.log('uniqueData', uniqueData);
          // this.elementOutOfRanged.elements = uniqueData
          // this.elementOutOfRanged = this.elementOutOfRanged
          this.reportLink = data.reportLink
          this.modalShowJudg = true
          return false
        }
        return true
      } catch (error) {
        console.log(error);

        this.$swal('Error', 'Internal Server Error', 'error')
      }
    },
    async submitAbnormalSample() {
      try {
        this.input.sampleCode = this.prevSampleCode ? this.prevSampleCode : this?.GET_QR_SAMPLE?.tableInternalVendor?.id
        // this.input.values = this.elementOutOfRanged
        let mapAdjValues = this.elementOutOfRanged[0].elements.map(item => {
          console.log(item);
          if (item?.adjustmentFormula?.adjustmentValue) {
            return {
              id: item.id,
              adjustmentValue: item?.adjustmentFormula?.adjustmentValue
            }
          }
        })

        let abnormalObj = {
          elements: await mapAdjValues.filter(item => item),
          notes: this.notes,
          sampleCode: this.input.sampleCode
        }

        this.input.elements = mapAdjValues
        this.input.notes = this.notes
        const response = await this.$store.dispatch(ACTION_ADD_SAMPLE_ABNORMAL, abnormalObj)
        this.$router.push('/inspection/ingot/historical')
        this.modalShowJudg = false

      } catch (error) {
        console.log(error);
        this.$swal('Error', 'Internal Server Error', 'error')
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
