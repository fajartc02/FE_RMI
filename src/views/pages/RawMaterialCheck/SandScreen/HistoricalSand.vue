<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <FilterComponentVue :fieldsInput="filters" @emit-filter="onChangeFilter" />
      </div>
    </div>
    <div class="row mt-1">
      <div class="col-12">
        <div class="card p-2 overflow-auto mb-2">
          <TableComponentVue :dataTable="GET_SAMPLE_SAND" @emit-data="onDataSelected" />
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
import LoadingComponent from '@/components/RawMaterialInspection/LoadingComponent.vue';
import PaginationComponent from '@/components/RawMaterialInspection/Pagination/PaginationComponent.vue';

import InputModel from '@/components/RawMaterialInspection/Filter/InputModel.js'
import { ACTION_LINE, GET_LINE_TREESELECT } from '@/store/modules/LINE.module';
import { ACTION_MACHINE, GET_MACHINE_TREESELECT } from '@/store/modules/MACHINE.module';
import { GET_SAMPLE_SAND, ACTION_SAMPLE_SAND_HISTORICAL } from '@/store/modules/SAMPLE_SAND.module'

import { mapActions, mapGetters } from 'vuex';
import { GET_META } from '@/store/modules/META.module';
import moment from 'moment'
import { ACTION_SHIFT, GET_SHIFT_TREESELECT } from '@/store/modules/SHIFT.module';

export default {
  name: "HistoricalSand",
  data() {
    return {
      modalShow: false,
      selectedData: null,
      filters: [
        InputModel('Start Date', 'date', 'input date', moment().startOf('month').hour(0).minute(0).second(0).format('YYYY-MM-DD'), 3, false),
        InputModel('End Date', 'date', 'input date', moment().hour(0).minute(0).second(0).format('YYYY-MM-DD'), 3, false),
        InputModel('Line', 'treeselect', 'Select Line', null, [], null, false, 'lineId'),
        InputModel('Machine', 'treeselect', 'Select Machine', null, [], null, true, 'machineId'),
        InputModel('Shift', 'treeselect', 'Select Shift', null, [], null, false, 'shiftId'),
        InputModel('Status', 'option', 'Select Status', null, [{ id: 'NONE', label: 'All' }, { id: 'OK', label: 'OK' }, { id: 'NG', label: 'NG' }, { id: 'RECHECK', label: 'RECHECK' }], null, false)
      ],
      isLineChanges: false,
      isLineSelected: false
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
      this.filters.splice(idxStatusInput, 1, InputModel('Status', 'option', 'Select Status', 'NONE', [{ id: 'NONE', label: 'All' }, { id: 'OK', label: 'OK' }, { id: 'NG', label: 'NG' }, { id: 'RECHECK', label: 'RECHECK' }], null, false))
    },
    GET_SHIFT_TREESELECT: function () {
      let idxShiftInput = this.filters.findIndex(x => x.title == 'Shift');
      this.filters.splice(idxShiftInput, 1, InputModel('Shift', 'treeselect', 'Select Shift', 'NONE', this.GET_SHIFT_TREESELECT, null, false, 'shiftId'))
    },
    isLineChanges: function () {
      this.ACTION_MACHINE({ lineId: this.isLineChanges })
      // this.ACTION_MACHINE({ materialCategory: 'SAND' })
    },
    isLineSelected: function () {
      if (!this.isLineSelected) {
        let idxMachineInput = this.filters.findIndex(x => x.title == 'Machine');
        this.filters.splice(idxMachineInput, 1, InputModel('Machine', 'treeselect', 'Select Machine', 'NONE', [], null, true, 'machineId'))
      }
    },
  },
  computed: {
    ...mapGetters([GET_MACHINE_TREESELECT, GET_LINE_TREESELECT, GET_META, GET_SAMPLE_SAND, GET_SHIFT_TREESELECT]),
  },
  methods: {
    ...mapActions([ACTION_LINE, ACTION_MACHINE, ACTION_SAMPLE_SAND_HISTORICAL, ACTION_MACHINE, ACTION_SHIFT]),
    async onChangeFilter(filter) {
      this.isLineSelected = false
      if (filter.lineId) {
        this.isLineChanges = filter.lineId
        this.isLineSelected = true
      }
      try {
        this.selectedIncharge = filter.inCharge
        await this.ACTION_SAMPLE_SAND_HISTORICAL(filter)
      } catch (error) {
        console.log(error);
        this.$swal('Error', 'Internal Server Error', 'error')
      }
    },
    async onDataSelected(data) {
      this.$router.push('/inspection/sand/internal?id=' + data.id)
    },
    dismissModal() {
      this.modalShow = false
    }
  },
  components: {
    FilterComponentVue,
    TableComponentVue,
    LoadingComponent,
    PaginationComponent
  },
  async mounted() {
    try {
      setTimeout(() => {
        this.ACTION_LINE({ page: 1, line: null })
        this.ACTION_SHIFT()
      }, 1000)
    } catch (error) {
      this.$swal('Error', error, 'error')
    }

  }
}
</script>
