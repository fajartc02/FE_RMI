<template>
  <CModal class="w-100" scrollable size="xl" :visible="modalShow" backdrop="static" @close="dismissModal">
    <CModalHeader>
      <CModalTitle>Details Ingot Check</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <!-- v-if="!IS_LOADING" -->
      <template v-if="GET_QR_SAMPLE.tableInternalVendor">
        <div class="card" style="height: 100%;">
          <div class="card-body p-2" style="height: 100%;">
            <h6>Sample Ingot Vendor (Vendor)</h6>
            <TableVendorIngot class="overflow-auto" />
          </div>
          <div class="card-body p-2 mb-4" style="z-index: 3;">
            <h6>Sample Ingot Vendor (Internal)</h6>
            <TableVendorIngotInternal class="overflow-auto" style="height: 100%;"
              @emit-sample-code="onChangeSampleCode" />
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
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <FilterComponentVue :fieldsInput="filters" @emit-filter="onChangeFilter" />
      </div>
    </div>
    <div class="row mt-1">
      <div class="col-12">
        <div class="card p-2">
          <TableComponentVue :dataTable="GET_SAMPLE_INGOT_HISTORICAL" @emit-data="onDataSelected" />
        </div>
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

import InputModel from '@/components/RawMaterialInspection/Filter/InputModel.js'
import { ACTION_LINE, GET_LINE_TREESELECT } from '@/store/modules/LINE.module';
import { ACTION_MACHINE, GET_MACHINE_TREESELECT } from '@/store/modules/MACHINE.module';

import { mapActions, mapGetters } from 'vuex';
import { ACTION_SAMPLE_INGOT_HISTORICAL, ACTION_SAMPLE_INGOT_HISTORICAL_DETAIL, GET_SAMPLE_INGOT_HISTORICAL } from '@/store/modules/SAMPLE_INGOT.module';
import { ACTION_RESET_QR_SAMPLE, GET_QR_SAMPLE } from '@/store/modules/QR.module';
import { GET_META } from '@/store/modules/META.module';
import moment from 'moment'

export default {
  name: "HistoricalIngotVendor",
  data() {
    return {
      modalShow: false,
      selectedData: null,
      filters: [
        InputModel('Start Date', 'date', 'input date', moment().hour(0).minute(0).second(0).format('YYYY-MM-DD'), 3, false),
        InputModel('End Date', 'date', 'input date', moment().hour(0).minute(0).second(0).format('YYYY-MM-DD'), 3, false),
        InputModel('Line', 'treeselect', 'Select Line', null, [], null, false, 'lineId'),
        InputModel('Machine', 'treeselect', 'Select Machine', null, [], null, true, 'machineId'),
        InputModel('In Charge', 'option', 'Select Incharge', null, [{ id: 'VENDOR', label: 'VENDOR' }, { id: 'INTERNAL', label: 'INTERNAL' }], null, false),
        InputModel('Status', 'option', 'Select Status', null, [{ id: 'OK', label: 'OK' }, { id: 'NG', label: 'NG' }, { id: 'RECHECK', label: 'RECHECK' }], null, false)
      ],
      isLineChanges: false,
    }
  },
  watch: {
    GET_LINE_TREESELECT: function () {
      let idxLineInput = this.filters.findIndex(x => x.title == 'Line');
      this.filters.splice(idxLineInput, 1, InputModel('Line', 'treeselect', 'Select Line', null, this.GET_LINE_TREESELECT, null, false, 'lineId'))
    },
    GET_MACHINE_TREESELECT: function () {
      let idxMachineInput = this.filters.findIndex(x => x.title == 'Machine');
      let idxInchargeInput = this.filters.findIndex(x => x.title == 'Incharge');
      let idxStatusInput = this.filters.findIndex(x => x.title == 'Status');
      this.filters.splice(idxMachineInput, 1, InputModel('Machine', 'treeselect', 'Select Machine', null, this.GET_MACHINE_TREESELECT, null, false, 'machineId'))
      this.filters.splice(idxInchargeInput, 1, InputModel('Incharge', 'option', 'Select Incharge', null, [{ id: 'VENDOR', label: 'VENDOR' }, { id: 'INTERNAL', label: 'INTERNAL' }], null, false))
      this.filters.splice(idxStatusInput, 1, InputModel('Status', 'option', 'Select Status', null, [{ id: 'OK', label: 'OK' }, { id: 'NG', label: 'NG' }, { id: 'RECHECK', label: 'RECHECK' }], null, false))
    },
    isLineChanges: function () {
      this.ACTION_MACHINE({ lineId: this.isLineChanges })
    }
  },
  computed: {
    ...mapGetters([GET_MACHINE_TREESELECT, GET_LINE_TREESELECT, GET_SAMPLE_INGOT_HISTORICAL, GET_QR_SAMPLE, GET_META])
  },
  methods: {
    ...mapActions([ACTION_LINE, ACTION_MACHINE, ACTION_SAMPLE_INGOT_HISTORICAL, ACTION_SAMPLE_INGOT_HISTORICAL_DETAIL, ACTION_RESET_QR_SAMPLE]),
    async onChangeFilter(filter) {
      console.log(filter);
      if (filter.lineId) {
        this.isLineChanges = filter.lineId
      }
      try {
        await this.ACTION_SAMPLE_INGOT_HISTORICAL(filter)
      } catch (error) {
        this.$swal('Error', error, 'error')
      }
    },
    async onDataSelected(data) {
      this.modalShow = true
      try {
        // GET: /sample-ingot/{sampleId}
        await this.ACTION_SAMPLE_INGOT_HISTORICAL_DETAIL(data.id)
      } catch (error) {
        this.$swal('Error', error, 'error')
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
    LoadingComponent
  },
  async mounted() {
    try {
      await this.ACTION_LINE({ page: 1, line: null })
    } catch (error) {
      this.$swal('Error', error, 'error')
    }

  }
}
</script>
