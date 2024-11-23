<template>
  <CModal class="w-100" scrollable size="xl" :visible="modalShow" backdrop="static" @close="dismissModal">
    <CModalHeader>
      <div class="row align-items-center">
        <CModalTitle class="col-auto">Details Ingot Check</CModalTitle>
        <CModalTitle class="col-auto">
          <a :href="'#'">
            <CButton color="warning">Download Report</CButton>
          </a>
        </CModalTitle>
      </div>
    </CModalHeader>
    <CModalBody>
      <!-- v-if="!IS_LOADING" -->
      <template v-if="GET_QR_SAMPLE.tableInternalVendor || GET_QR_SAMPLE.tablePureVendor">
        <div class="card" style="height: 100%;">
          <div v-if="GET_QR_SAMPLE.tablePureVendor" class="card-body p-2" style="height: 100%;">
            <h6>Sample Ingot (Vendor)</h6>
            <TableVendorIngot class="overflow-auto" :isInputTamagoKmold="false" />
          </div>
          <div v-if="GET_QR_SAMPLE.tableInternalVendor" class="card-body p-2 mb-4 overflow-auto" style="z-index: 3;">
            <h6>Sample Ingot (Internal)</h6>
            <TableVendorIngotInternal class="overflow-auto" style="height: 100%;" @emit-sample-code="onChangeSampleCode"
              :isInputTamagoKmold="false" />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="card" style="height: 100%;">
          <data-not-found :message="'Data not available'" />
        </div>
      </template>
    </CModalBody>
  </CModal>
  <CModal class="w-100" scrollable size="xl" :visible="showModalIncompleted" backdrop="static" @close="() => {
    showModalIncompleted = false
    sampleCodeIncompleted = []
  }">
    <CModalHeader>
      <div class="row align-items-center">
        <CModalTitle class="col-auto">Sample Code Not Completed Check</CModalTitle>
      </div>
    </CModalHeader>
    <CModalBody>
      <table class="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>No</th>
            <th>Sample Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-if="sampleCodeIncompleted.length > 0">
          <tr v-for="(sample, idx) in sampleCodeIncompleted" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ sample?.sampleCode }}</td>
            <td>
              <button class="btn btn-primary"
                @click="$router.push(`/inspection/ingot/internal?sampleCode=${sample?.id}`)">Check!</button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="3">
              <data-not-found :message="'Data not available'" />
            </td>
          </tr>
        </tbody>
      </table>
    </CModalBody>
  </CModal>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <FilterComponentVue :fieldsInput="filters" @emit-filter="onChangeFilter" />
      </div>
    </div>
    <h4 class="text-muted my-3">Sample Code Not Completed Check:</h4>
    <div class="row mt-1">
      <div v-for="gauge in gauges" :key="gauge.id" class="col-6">
        <div class="card">
          <div class="card-body">
            <h6>{{ gauge.code }}</h6>
            <h1>
              {{ gauge.total }}
            </h1>
            <small style="color: blue;text-decoration: underline;cursor: pointer;" @click="() => {
              showModalIncompleted = true
              sampleCodeIncompleted = gauge.data
            }">Click Here !</small>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-1">
      <div class="col-12">
        <div class="card p-2 overflow-auto mb-2">
          <TableComponentVue :dataTable="GET_SAMPLE_INGOT_HISTORICAL" @emit-data="onDataSelected" />
        </div>
        <PaginationComponent />
      </div>
    </div>
  </div>
  <LoadingComponent />
</template>
<script>
import FilterComponentVue from '@/components/RawMaterialInspection/Filter/FilterComponent.vue'
import TableComponentVue from '@/components/RawMaterialInspection/Table/TableComponent.vue';
import TableVendorIngot from '@/components/RawMaterialInspection/TableVendorIngot.vue';
import TableVendorIngotInternal from '@/components/RawMaterialInspection/TableVendorIngotInternal.vue';
import DataNotFound from '@/components/RawMaterialInspection/EmptyDataHandler/DataNotFound.vue';
import LoadingComponent from '@/components/RawMaterialInspection/LoadingComponent.vue';
import PaginationComponent from '@/components/RawMaterialInspection/Pagination/PaginationComponent.vue';

import InputModel from '@/components/RawMaterialInspection/Filter/InputModel.js'
import { ACTION_LINE, GET_LINE_TREESELECT } from '@/store/modules/LINE.module';
import { ACTION_MACHINE, GET_MACHINE_TREESELECT } from '@/store/modules/MACHINE.module';

import { mapActions, mapGetters } from 'vuex';
import { ACTION_SAMPLE_INGOT_HISTORICAL, ACTION_SAMPLE_INGOT_HISTORICAL_DETAIL, GET_SAMPLE_INGOT_HISTORICAL, ACT_SAMP_INGOT_VEN_HIS_DET, ACTION_SHIMADZU_INCOMPLETED } from '@/store/modules/SAMPLE_INGOT.module';
import { ACTION_RESET_QR_SAMPLE, GET_QR_SAMPLE } from '@/store/modules/QR.module';
import { GET_META } from '@/store/modules/META.module';
import moment from 'moment'
import STATUS_CONSTANT from '@/constants/STATUS_CONSTANT';
import { ACTION_GAUGE } from '@/store/modules/GAUGE.module';

export default {
  name: "HistoricalIngotVendor",
  data() {
    return {
      modalShow: false,
      selectedData: null,
      filters: [
        InputModel('Start Date', 'date', 'input date', moment().startOf('month').hour(0).minute(0).second(0).format('YYYY-MM-DD'), 3, false),
        InputModel('End Date', 'date', 'input date', moment().hour(0).minute(0).second(0).format('YYYY-MM-DD'), 3, false),
        InputModel('Line', 'treeselect', 'Select Line', null, [], null, false, 'lineId'),
        InputModel('Machine', 'treeselect', 'Select Machine', null, [], null, true, 'machineId'),
        InputModel('In Charge', 'option', 'Select Incharge', null, [{ id: 'NONE', label: 'All' }, { id: 'VENDOR', label: 'VENDOR' }, { id: 'INTERNAL', label: 'INTERNAL' }], null, false),
        InputModel('Status', 'option', 'Select Status', null, STATUS_CONSTANT, null, false),
        InputModel('Sample Code', 'text', 'AC2C-XXXX-XXXX', null, null, null, false, 'sampleCode'),
      ],
      isLineChanges: false,
      selectedIncharge: null,
      isLineSelected: false,
      gauges: [],
      sampleCodeIncompleted: [],
      showModalIncompleted: false,
    }
  },
  watch: {
    GET_LINE_TREESELECT: function () {
      let idxLineInput = this.filters.findIndex(x => x.title == 'Line');
      this.filters.splice(idxLineInput, 1, InputModel('Line', 'treeselect', 'Select Line', 'NONE', this.GET_LINE_TREESELECT, null, false, 'lineId'))
    },
    GET_MACHINE_TREESELECT: function () {
      let idxMachineInput = this.filters.findIndex(x => x.title == 'Machine');
      let idxInchargeInput = this.filters.findIndex(x => x.title == 'Incharge');
      let idxStatusInput = this.filters.findIndex(x => x.title == 'Status');
      this.filters.splice(idxMachineInput, 1, InputModel('Machine', 'treeselect', 'Select Machine', 'NONE', this.GET_MACHINE_TREESELECT, null, false, 'machineId'))
      this.filters.splice(idxInchargeInput, 1, InputModel('Incharge', 'option', 'Select Incharge', 'NONE', [{ id: 'NONE', label: 'All' }, { id: 'VENDOR', label: 'VENDOR' }, { id: 'INTERNAL', label: 'INTERNAL' }], null, false))
      this.filters.splice(idxStatusInput, 1, InputModel('Status', 'option', 'Select Status', 'NONE', [{ id: 'NONE', label: 'All' }, { id: 'OK', label: 'OK' }, { id: 'NG', label: 'NG' }, { id: 'REVISION', label: 'REVISION' }], null, false))
    },
    isLineChanges: function () {
      this.ACTION_MACHINE({ lineId: this.isLineChanges, materialCategory: 'INGOT' })
    },
    isLineSelected: function () {
      if (!this.isLineSelected) {
        let idxMachineInput = this.filters.findIndex(x => x.title == 'Machine');
        this.filters.splice(idxMachineInput, 1, InputModel('Machine', 'treeselect', 'Select Machine', 'NONE', [], null, true, 'machineId'))
      }
    }
  },
  computed: {
    ...mapGetters([GET_MACHINE_TREESELECT, GET_LINE_TREESELECT, GET_SAMPLE_INGOT_HISTORICAL, GET_QR_SAMPLE, GET_META]),

  },
  methods: {
    ...mapActions([ACTION_LINE, ACTION_MACHINE, ACTION_SAMPLE_INGOT_HISTORICAL, ACTION_SAMPLE_INGOT_HISTORICAL_DETAIL, ACTION_RESET_QR_SAMPLE, ACT_SAMP_INGOT_VEN_HIS_DET, ACTION_GAUGE, ACTION_SHIMADZU_INCOMPLETED]),
    async onChangeFilter(filter) {
      this.isLineSelected = false
      if (filter.lineId) {
        this.isLineChanges = filter.lineId
        this.isLineSelected = true
      }
      try {
        this.selectedIncharge = filter.inCharge
        await this.ACTION_SAMPLE_INGOT_HISTORICAL(filter)
      } catch (error) {
        console.log(error);
        this.$swal('Error', 'Internal Server Error', 'error')
      }
    },
    async getGauge() {
      try {
        const gauges = await this.ACTION_GAUGE({ orderDirection: 'ASC', orderField: 'code' })

        const waitGaugesData = await gauges.map(async gauge => {
          const sampleCode = await this.getSampleInCompleted(gauge.id)

          return {
            id: gauge.id,
            code: gauge.code,
            total: sampleCode.length,
            data: sampleCode
          }
        })
        this.gauges = await Promise.all(waitGaugesData)
      } catch (error) {
        console.log(error)
      }
    },
    async getSampleInCompleted(gaugeId) {
      try {
        const incompletedSampleCode = await this.ACTION_SHIMADZU_INCOMPLETED({ gaugeId, inCompleted: true, take: 1000 })
        return incompletedSampleCode || []
      } catch (error) {
        console.log(error)
      }
    },
    async onDataSelected(data) {
      this.modalShow = true
      try {
        /// Vendor
        /// GET: /sample-ingot/{sampleId}
        /// Internal
        /// GET: /shimadzu/{sampleId}

        if (`${this.selectedIncharge ? this.selectedIncharge : data.inCharge}`.toUpperCase() == 'INTERNAL') {
          await this.ACTION_SAMPLE_INGOT_HISTORICAL_DETAIL(data.id)
        } else if (`${this.selectedIncharge ? this.selectedIncharge : data.inCharge}`.toUpperCase() == 'VENDOR') {
          await this.ACT_SAMP_INGOT_VEN_HIS_DET(data.id)
        } else if (`${this.selectedIncharge ? this.selectedIncharge : data.inCharge}`.toUpperCase() == 'VENDOR_INTERNAL') {
          await this.ACT_SAMP_INGOT_VEN_HIS_DET(data.id)
        }
      } catch (error) {
        console.log(error);
        this.$swal('Error', 'Internal Server Error', 'error')
      }
    },
    dismissModal() {
      this.modalShow = false
      this.ACTION_RESET_QR_SAMPLE()
    }
  },
  components: {
    FilterComponentVue,
    TableComponentVue,
    TableVendorIngot,
    TableVendorIngotInternal,
    DataNotFound,
    LoadingComponent,
    PaginationComponent
  },
  async mounted() {
    this.getGauge()
    try {
      setTimeout(() => {
        this.ACTION_LINE({ page: 1, line: null })

      }, 1000)
    } catch (error) {
      this.$swal('Error', error, 'error')
    }

  }
}
</script>
