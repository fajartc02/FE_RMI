<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <HeaderComp title="Ingot Inspection" />
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
                <CFormInput id="qr-input" type="text" placeholder="Scan your QR" v-model="displaySampleCode" />
                <CButton v-if="displaySampleCode" color="info" @click="cancelScanned">
                  <CIcon icon="cil-x" />
                </CButton>
              </CInputGroup>

              <CButton @click="focusToggle()" color="warning">
                <CIcon icon="cil-newspaper" />
              </CButton>

            </div>
            <div class="row mt-2">
              <div class="col-12">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-1">
      <div class="col-12">
        <div class="card">
          <div class="card-body overflow-auto p-2">
            <h6>Result Ingot (Vendor)</h6>
            <TableVendorIngotInternal />
          </div>
          <div class="card-body overflow-auto p-2">
            <h6>Result Ingot (Internal)</h6>
            <TableVendorIngotInternal />
          </div>
          <div class="card-body overflow-auto p-2">
            <KMoldTamago />
          </div>
          <div class="card-footer d-flex justify-content-evenly">
            <CButton style="width: 250px;" color="success" @click="goToNextScreen">Save</CButton>
            <CButton style="width: 250px;" color="secondary" @click="goToPreviousScreen">Cancel</CButton>
          </div>
        </div>
      </div>
    </div>
  </div>
  <LoadingComponent class="mt-4" />
  <!-- <QRScanner FormTitle="Ingot" :FormData="forms" @outputData="scanner" /> -->
</template>

<script>
// import QRScanner from '@/components/RawMaterialInspection/QRScanner.vue'
import HeaderComp from '@/components/RawMaterialInspection/HeaderComp.vue'
import LoadingComponent from '@/components/RawMaterialInspection/LoadingComponent.vue';
import SCANNED_DATA_MOCK from '@/mocks/SCANNED_DATA.mock'
import { ACTION_QR_SAMPLE } from '@/store/modules/QR.module';
import TableVendorIngot from '@/components/RawMaterialInspection/TableVendorIngot.vue';
import TableVendorIngotInternal from '@/components/RawMaterialInspection/TableVendorIngotInternal.vue';
import KMoldTamago from '@/components/RawMaterialInspection/KMoldTamago.vue';

export default {
  name: 'IngotInspection',
  data() {
    return {
      form: {
        data: null,
        sampleCode: null
      },
      displaySampleCode: SCANNED_DATA_MOCK.data
    }
  },
  watch: {
    'displaySampleCode': function () {
      // Start::FOR MOCK
      this.displaySampleCode = SCANNED_DATA_MOCK.data
      // End::FOR MOCK
      if (this.displaySampleCode) {
        let scannedData = this.displaySampleCode
        this.form.sampleCode = this.parsedSampleCode
        this.form.data = this.displaySampleCode
        this.displaySampleCode = scannedData?.split('\n')[1]?.split(';')[0]
        this.$store.dispatch(ACTION_QR_SAMPLE, this.form)
      }
    }
  },
  computed: {
    parsedSampleCode() {
      console.log(this.displaySampleCode.split('\n'));
      return this.displaySampleCode?.split('\n')[1]?.split(';')[0]
    },
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
        data: null,
        sampleCode: null
      }
    }
  },
  components: {
    // QRScanner,
    HeaderComp,
    LoadingComponent,
    TableVendorIngot,
    TableVendorIngotInternal,
    KMoldTamago
  },
  mounted() {
    // this.focusToggle()
    document.getElementById('qr-input').focus();
    this.$store.dispatch(ACTION_QR_SAMPLE, this.form)
    // FOR MOCK
    if (this.displaySampleCode) {
      let scannedData = this.displaySampleCode
      this.form.sampleCode = this.parsedSampleCode
      this.form.data = this.displaySampleCode
      this.displaySampleCode = scannedData?.split('\n')[1]?.split(';')[0]
      this.$store.dispatch(ACTION_QR_SAMPLE, this.form)
    }
  }
}
</script>
