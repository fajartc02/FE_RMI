<template>
  <CModal scrollable size="xl" :visible="modalShowJudg" backdrop="static" @close="() => { modalShowJudg = false }">
    <CModalHeader>
      <CModalTitle>Result Abnormal Parameter</CModalTitle>
    </CModalHeader>
    <CModalBody v-if="elementOutOfRanged.length > 0">
      <template v-for="(data, idx) in elementOutOfRanged" :key="data">
        <h6>Sample Code: {{ data.lotNo }}</h6>
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Element</th>
              <th>Min</th>
              <th>Max</th>
              <th>Value</th>
              <th>Status</th>
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
            </tr>
          </tbody>
        </table>
      </template>
    </CModalBody>
    <CModalFooter class="d-flex justify-content-center align-items-center">
      <a :href="report">
        <CButton color="warning">Download PDF</CButton>
      </a>
      <CButton color="success" @click="() => { $router.push('/inspection/ingot/internal'); modalShowJudg = false }">OK
      </CButton>
    </CModalFooter>
  </CModal>
  <CModal scrollable size="xl" :visible="modalShowStd" @close="() => { modalShowStd = false }">
    <CModalHeader>
      <CModalTitle>Standard Ingot</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <img :src="imageStd" alt="Standard Ingot" width="100%" height="500" />
    </CModalBody>
  </CModal>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <HeaderComp title="Ingot Inspection (Vendor)" />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <div class="card">
          <div class="card-body p-1">
            <div class="d-flex justify-content-evenly align-items-center">
              <CInputGroup class="input-prepend">
                <CInputGroupText>
                  <CIcon icon="cil-qr-code" />
                </CInputGroupText>
                <CFormInput id="qr-input" type="text" placeholder="Scan your QR" v-model="displaySampleCode"
                  @change="doneScanned" />
                <CButton v-if="displaySampleCode" color="info" @click="cancelScanned">
                  <CIcon icon="cil-x" />
                </CButton>
              </CInputGroup>
              <CButton @click="modalShowStd = true" color="warning">
                <CIcon icon="cil-newspaper" />
              </CButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-1">
      <div class="col-12 mb-4">
        <template v-if="!IS_LOADING">
          <div class="card" style="height: 100%;">
            <div class="card-body p-2" style="height: 100%;">
              <h6>Sample Ingot Vendor (Std Vendor)</h6>
              <TableVendorIngot class="overflow-auto" />
            </div>
            <div class="card-body p-2 mb-4" style="z-index: 3;">
              <h6>Sample Ingot Vendor (Internal)</h6>
              <TableVendorIngotInternal class="overflow-auto" style="height: 100%;"
                @emit-sample-code="onChangeSampleCode" @emit-container-input="onChangeContainerInput" />
            </div>
            <div class="card-footer d-flex justify-content-evenly">
              <template v-if="GET_QR_SAMPLE.tableInternalVendor || GET_SAMPLE_CODE">

                <CButton v-if="isKmoldTamagoFill && !isSubmited" style="width: 250px;" color="success"
                  @click="submitCheckSampleIngot">
                  Save</CButton>
                <CButton v-else-if="isSubmited" style="width: 250px;" color="success" disabled="true">Submitted
                </CButton>
                <CButton v-else style="width: 250px;" color="danger" disabled="true">Please fill all input</CButton>
                <CButton style="width: 250px;" color="secondary" @click="goToPreviousScreen">Cancel</CButton>
              </template>
            </div>
          </div>
        </template>
        <div class="card" v-if="IS_LOADING">
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
import TableVendorIngot from '@/components/RawMaterialInspection/TableVendorIngot.vue';
import TableVendorIngotInternal from '@/components/RawMaterialInspection/TableVendorIngotInternal.vue';
// import KMoldTamago from '@/components/RawMaterialInspection/KMoldTamago.vue';
import { IS_LOADING, ACTION_LOADING } from '@/store/modules/LOADING.module';
import { mapGetters } from 'vuex';
import { ACTION_ADD_SAMPLE_CODE, GET_SAMPLE_CODE } from '@/store/modules/SAMPLE_CODE.module';
import { ACTION_RESET_SAMPLE_INGOT } from '@/store/modules/SAMPLE_INGOT.module';
import { CModalFooter } from '@coreui/vue';
import STD_BASE64 from '@/assets/images/STD.base64';

export default {
  name: 'InspectionVendorIngot',
  data() {
    return {
      modalShowStd: false,
      report: null,
      modalShowJudg: false,
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
      elementOutOfRanged: [],
      imageStd: STD_BASE64,
      isSubmited: false,
    }
  },
  computed: {
    ...mapGetters([IS_LOADING, GET_QR_SAMPLE, GET_SAMPLE_CODE]),
    isKmoldTamagoFill() {
      // this.input.values
      return this.input.values.filter(item => item.kMold == null || item.tamago == null).length == 0
    }
  },
  methods: {
    focusToggle(status = true) {
      this.is_focus = status
      if (this.is_focus) {
        document.getElementById('qr-input').onblur = function () { this.focus() };
        document.getElementById('qr-input').focus();
      } else {
        document.getElementById('qr-input').onblur = function () { };
        document.getElementById('qr-input').focus({ focusVisible: false });
        document.getElementById('qr-input').value = ''
      }
    },
    cancelScanned() {
      this.focusToggle(false)
      this.form = {
        header: null,
        values: null
      }
      this.displaySampleCode = ''
    },
    async doneScanned() {
      try {
        this.$store.dispatch(ACTION_LOADING, true)
        let scannedData = this.displaySampleCode
        let parentRawData = scannedData?.split('|')
        let headerData = {}
        let containerSampleValue = []
        let containerSampleKey = []
        for (let i = 0; i < parentRawData.length; i++) {
          let childRawData = parentRawData[i]?.split(';')
          // 0: column
          // 1: header value
          if (i == 0) {
            for (let j = 0; j < childRawData.length; j++) {
              const col = childRawData[j];
              let value = parentRawData[1]?.split(';')[j]
              if (col != '') {
                let convertSnakeToCammel1 = col.toLowerCase().replace(/[-_][a-z]/g, (group) => group.slice(-1).toUpperCase());
                headerData[`${convertSnakeToCammel1}`] = value
              }
            }
          }
          // 3: col name
          if (i == 3) {
            for (let j = 0; j < childRawData.length; j++) {
              const colNmValue = childRawData[j];
              if (colNmValue != '') containerSampleKey.push(colNmValue)
            }
          }

          // >= 4 : values
          if (i >= 4) {
            let objValue = {}
            for (let j = 0; j < containerSampleKey.length; j++) {
              let value = childRawData[j];
              const convertSnakeToCammel = containerSampleKey[j].toLowerCase().replace(/[-_][a-z]/g, (group) => group.slice(-1).toUpperCase());
              objValue[`${convertSnakeToCammel}`] = value
            }
            containerSampleValue.push(objValue)
          }
        }
        this.form.header = headerData
        this.form.values = containerSampleValue
        await this.$store.dispatch(ACTION_QR_SAMPLE, this.form)
        this.displaySampleCode = this.form.header?.sample_code
        this.$store.dispatch(ACTION_LOADING, false)
      } catch (error) {
        console.log(error)
        if (error.toUpperCase().includes('DUPLICATE')) {
          this.$swal.fire({
            title: "Sample Code sudah pernah ada, apakah anda ingin melakukan resample?",
            showDenyButton: true,
            confirmButtonText: "Ya",
            denyButtonText: `Tidak`
          }).then(async (result) => {
            if (result.isConfirmed) {
              this.$swal("Saved!", "", "success");
              this.form.header.sampleCodeParent = this.form.header.sampleCode
              console.log(this.form);
              await this.$store.dispatch(ACTION_QR_SAMPLE, this.form)
            }
          });
          this.$store.dispatch(ACTION_LOADING, false)
          return
        }

        this.$swal('Error', error, 'error')
        this.$store.dispatch(ACTION_LOADING, false)
        return error
      }
    },
    onChangeSampleCode(sampleCode) {
      this.input.sampleCode = sampleCode
    },
    onChangeContainerInput(data) {
      this.input.values = data
    },
    async submitCheckSampleIngot() {
      try {
        // condition for sample ID spectro match or not
        if (this.GET_QR_SAMPLE.headers.sampleId) this.input.sampleCode = this.GET_QR_SAMPLE.headers.sampleId
        const response = await this.$store.dispatch(ACTION_ADD_SAMPLE_CODE, this.input)
        this.isSubmited = true
        this.conditionJudgmentIngotCheck(response)
      } catch (error) {
        this.$swal('Error', 'Internal Server Error', 'error')
      }
    },
    conditionJudgmentIngotCheck({ data }) {
      try {
        if (data) {
          this.elementOutOfRanged = data.values
          this.report = data.report
          this.modalShowJudg = true
          return
        }
        this.$router.push('/inspection/ingot/internal')
        this.$swal('Success', 'Add sample success, Pengecekan tidak ada abnormal', 'success')
      } catch (error) {
        this.$swal('Error', 'Internal Server Error', 'error')
      }
    }
  },
  components: {
    HeaderComp,
    LoadingComponent,
    TableVendorIngot,
    TableVendorIngotInternal,
  },
  async mounted() {
    await this.$store.dispatch(ACTION_RESET_SAMPLE_INGOT)
    await this.$store.dispatch(ACTION_RESET_QR_SAMPLE)
    document.getElementById('qr-input').focus();
  }
}
</script>
