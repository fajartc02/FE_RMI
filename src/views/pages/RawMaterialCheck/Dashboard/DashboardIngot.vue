<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h3>Dashboard Ingot</h3>
        <FilterComponentVue :fieldsInput="fieldsInput" @emit-filter="onChangeFilter" :isDisabledPagination="true" />
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-6 card">
        <ChartParameterNew />
      </div>
      <div class="col-6 card">
        <ChartParameterNew2 />
      </div>
    </div> -->
    <div class="row mt-2">
      <div v-for="(incharge, i) in incharges" :key="i" class="col-12 my-1">
        <CAccordion :active-item-key="1">
          <CAccordionItem v-if="!this.filters?.inCharge || this.filters.inCharge == incharge.id" :item-key="1">
            <CAccordionHeader>
              Grafik {{ incharge.label }}
            </CAccordionHeader>
            <CAccordionBody class="p-1">
              <div class="row">
                <template v-for="element in GET_ELEMENT" :key="element.id">
                  <template v-if="!this.filters?.elementId || this.filters?.elementId == element.id">
                    <div v-if="incharge.id != 'NONE' && element.id != 'NONE'" class="col-12 col-lg-6 my-1">
                      <h6 v-if="this.filters.elementId == element.id">{{ element.label }} ({{ element.code }})</h6>
                      <h6 v-else-if="!this.filters?.elementId">{{ element.label }} ({{ element.code }})</h6>
                      <div class="card" v-if="!this.filters?.elementId">
                        <div class="card-body p-0">
                          <!-- <ChartParameterVue :inCharge="incharge.label" :elementId="element.id" :filters="filters"
                            :element="'INGOT'" /> -->
                          <ChartParameterNew2 :inCharge="incharge.label" :elementId="element.id" :filters="filters"
                            :element="'INGOT'" />
                        </div>
                      </div>
                      <template v-else>
                        <div v-if="this.filters.elementId == element.id" class="card">
                          <div class="card-body p-0">
                            <ChartParameterVue :inCharge="incharge.label" :elementId="element.id" :filters="filters"
                              :element="'INGOT'" />
                          </div>
                        </div>
                      </template>
                    </div>
                  </template>
                </template>
              </div>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </div>
    </div>
  </div>
</template>
<script>
import FilterComponentVue from '@/components/RawMaterialInspection/Filter/FilterComponent.vue'
import InputModel from '@/components/RawMaterialInspection/Filter/InputModel'
import { mapActions, mapGetters } from 'vuex'
import { ACTION_LINE, GET_LINE_TREESELECT } from '@/store/modules/LINE.module'
import ChartParameterVue from '@/components/RawMaterialInspection/Charts/ChartParameter.vue'
import ChartParameterNew from '@/components/RawMaterialInspection/Charts/ChartParameterNew.vue'
import ChartParameterNew2 from '@/components/RawMaterialInspection/Charts/ChartParameterNew2.vue'
import moment from 'moment'
import { ACTION_INGOT_ELEMENT, GET_ELEMENT } from '@/store/modules/ELEMENTS.module'
import { ACTION_MACHINE, GET_MACHINE_TREESELECT } from '@/store/modules/MACHINE.module'
import { ACTION_VENDOR, GET_VENDOR_SELECT } from '@/store/modules/VENDOR.module'

export default {
  name: 'DashboardIngot',
  data() {
    return {
      fieldsInput: [
        InputModel('Start Date', 'date', 'Select Date', moment().startOf('month').format('YYYY-MM-DD'), null, null, false),
        InputModel('End Date', 'date', 'Select Date', moment().endOf('month').format('YYYY-MM-DD'), null, null, false),
        InputModel('Line', 'treeselect', 'Select Line', 'NONE', [{ id: 'NONE', label: 'All' }], null, false, 'lineId'),
        InputModel('Machine', 'treeselect', 'Select Machine', 'NONE', [{ id: 'NONE', label: 'All' }], null, true, 'machineId'),
        InputModel('Element', 'treeselect', 'Select Element', null, [], null, false, 'elementId'),
        InputModel('In Charge', 'option', 'Select InCharge', 'NONE', [{ id: 'NONE', label: 'All' }, { id: 'VENDOR', label: 'VENDOR' }, { id: 'INTERNAL', label: 'INTERNAL' }], null, false),
      ],
      isLineSelected: false,
      selectedLineId: null,
      incharges: [
        { id: 'INTERNAL', label: 'INTERNAL' },
        { id: 'VENDOR', label: 'VENDOR' },
      ],
      filters: {}
    }
  },
  watch: {
    GET_LINE_TREESELECT: function () {
      let idxLineInput = this.fieldsInput.findIndex(x => x.title == 'Line');
      let setIdSelectedFirstLine = this.GET_LINE_TREESELECT[1]?.id || 'NONE'
      this.fieldsInput.splice(idxLineInput, 1, InputModel('Line', 'treeselect', 'Select Line', setIdSelectedFirstLine, this.GET_LINE_TREESELECT, null, false, 'lineId'))
    },
    GET_MACHINE_TREESELECT: function () {
      let idxMachineInput = this.fieldsInput.findIndex(x => x.title == 'Machine');
      let idxInchargeInput = this.fieldsInput.findIndex(x => x.title == 'In Charge');
      this.fieldsInput.splice(idxMachineInput, 1, InputModel('Machine', 'treeselect', 'Select Machine', 'NONE', [{ id: 'NONE', label: 'All' }, ...this.GET_MACHINE_TREESELECT], null, true, 'machineId'))
      this.fieldsInput.splice(idxInchargeInput, 1, InputModel('In Charge', 'option', 'Select In Charge', 'NONE', [{ id: 'NONE', label: 'All' }, { id: 'VENDOR', label: 'VENDOR' }, { id: 'INTERNAL', label: 'INTERNAL' }], null, false))
    },
    GET_ELEMENT: function () {
      let idxElementInput = this.fieldsInput.findIndex(x => x.title == 'Element');
      this.fieldsInput.splice(idxElementInput, 1, InputModel('Element', 'treeselect', 'Select Element', 'NONE', this.GET_ELEMENT, null, false, 'elementId'))
    },
    GET_VENDOR_SELECT: function () {
      console.log('this.GET_VENDOR_SELECT', this.GET_VENDOR_SELECT);

      let idxVendorInput = this.fieldsInput.findIndex(x => x.title == 'Vendor');
      this.fieldsInput.splice(idxVendorInput, 1, InputModel('Vendor', 'option', 'Select Vendor', 'NONE', this.GET_VENDOR_SELECT, null, false, 'vendorId'))
    },
    isLineSelected: function () {
      if (!this.isLineSelected) {
        let idxMachineInput = this.fieldsInput.findIndex(x => x.title == 'Machine');
        this.fieldsInput.splice(idxMachineInput, 1, InputModel('Machine', 'treeselect', 'Select Machine', 'NONE', [...this.GET_MACHINE_TREESELECT], null, true, 'machineId'))
      }
    },
    selectedLineId: function () {
      if (this.selectedLineId) {
        this.ACTION_MACHINE({ lineId: this.selectedLineId, materialCategory: 'INGOT' })
      }
    },
    'filters.incharge': function () {
      if (this.filters?.incharge && this.filters?.incharge === 'VENDOR') {
        this.ACTION_VENDOR({ take: 50 })
      }
    }
  },
  computed: {
    ...mapGetters([GET_LINE_TREESELECT, GET_ELEMENT, GET_MACHINE_TREESELECT, GET_VENDOR_SELECT]),
  },
  methods: {
    ...mapActions([ACTION_LINE, ACTION_INGOT_ELEMENT, ACTION_MACHINE, ACTION_VENDOR]),
    async getLines() {
      await this.ACTION_LINE()
    },
    onChangeFilter(filter) {
      this.isLineSelected = false
      if (filter.lineId && filter.lineId != 'NONE') {
        this.selectedLineId = filter.lineId
        this.isLineSelected = true
        // this.ACTION_MACHINE({ lineId: filter.lineId })
      }
      this.filters = filter
    }
  },
  components: {
    FilterComponentVue,
    ChartParameterVue,
    // ChartParameterNew,
    ChartParameterNew2,
  },
  async mounted() {
    // this.$router.go()
    await this.getLines()
    await this.ACTION_INGOT_ELEMENT({ take: 50 })

    this.fieldsInput.push(InputModel('Vendor', 'option', 'Select Vendor', 'NONE', [{ id: 'NONE', label: 'All' }], null, true, 'vendorId'))
  }
}
</script>

<style>
.accordion-body {
  padding: 5px;
}
</style>
