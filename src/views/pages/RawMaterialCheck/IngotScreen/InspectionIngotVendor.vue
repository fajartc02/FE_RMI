<template>
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

              <ModalStandardIngot />
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
              <template v-if="GET_QR_SAMPLE.tableIntVendor || GET_SAMPLE_CODE">
                <CButton style="width: 250px;" color="success" @click="submitCheckSampleIngot">Save</CButton>
                <!-- :disabled="!isKmoldTamagoFill" -->
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
import { ACTION_QR_SAMPLE, GET_QR_SAMPLE } from '@/store/modules/QR.module';
import TableVendorIngot from '@/components/RawMaterialInspection/TableVendorIngot.vue';
import TableVendorIngotInternal from '@/components/RawMaterialInspection/TableVendorIngotInternal.vue';
// import KMoldTamago from '@/components/RawMaterialInspection/KMoldTamago.vue';
import { IS_LOADING, ACTION_LOADING } from '@/store/modules/LOADING.module';
import { mapGetters } from 'vuex';
import { ACTION_ADD_SAMPLE_CODE, GET_SAMPLE_CODE } from '@/store/modules/SAMPLE_CODE.module';

import ModalStandardIngot from '@/components/RawMaterialInspection/Modal/ModalStandardIngot.vue';

export default {
  name: 'InspectionVendorIngot',
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
      }
    }
  },
  computed: {
    ...mapGetters([IS_LOADING, GET_QR_SAMPLE, GET_SAMPLE_CODE]),
    // isKmoldTamagoFill() {
    //   return this.input.kMold && this.input.tamago
    // }
  },
  methods: {
    onChangeContainerInput(data) {
      this.input.values = data
    },
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
                // const reg = new RegExp('^[0-9]+$');

                // if (reg.test(value)) {
                //   value = Number(value)
                // }
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
              // const reg = new RegExp('^[0-9]+$');

              // if (reg.test(value)) {
              //   value = Number(value)
              // }
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
        this.$swal('Error', error, 'error')
        this.$store.dispatch(ACTION_LOADING, false)
        return error
      }
    },
    // onChangeKMoldTamago(data) {
    //   this.input.tamago = data.tamago
    //   this.input.kMold = data.kMold
    // },
    onChangeSampleCode(sampleCode) {
      this.input.sampleCode = sampleCode
    },
    async submitCheckSampleIngot() {
      try {
        // condition for sample ID spectro match or not
        if (this.GET_QR_SAMPLE.headers.sampleId) this.input.sampleCode = this.GET_QR_SAMPLE.headers.sampleId
        console.log(this.input);
        await this.$store.dispatch(ACTION_ADD_SAMPLE_CODE, this.input)
        this.$swal('Success', 'Add sample success', 'success')
        this.$router.push('/inspection/ingot/internal')
      } catch (error) {
        alert(JSON.stringify(error))
      }
    }
  },
  components: {
    // QRScanner,
    HeaderComp,
    LoadingComponent,
    TableVendorIngot,
    TableVendorIngotInternal,
    ModalStandardIngot
    // KMoldTamago
  },
  mounted() {
    document.getElementById('qr-input').focus();

    // FOR MOCK
    // if (this.displaySampleCode) {
    //   let scannedData = this.displaySampleCode
    //   this.form.data = this.displaySampleCode
    //   this.displaySampleCode = scannedData?.split('|')[1]?.split(';')[0]
    //   this.$store.dispatch(ACTION_QR_SAMPLE, this.form)
    // }
  }
}
</script>
