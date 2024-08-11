<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h3>Dashboard</h3>
        <FilterComponentVue :fieldsInput="fieldsInput" />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12 my-1">
        <CAccordion :active-item-key="1">
          <CAccordionItem :item-key="1">
            <CAccordionHeader>
              Grafik Internal
            </CAccordionHeader>
            <CAccordionBody>
              <h6>{{ 'Nama Parameter' }} ({{ 'Internal' }})</h6>
              <div class="card">
                <div class="card-body p-0">
                  <ChartParameterVue />
                </div>
              </div>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </div>
      <div class="col-12 my-1">
        <CAccordion :active-item-key="1">
          <CAccordionItem :item-key="1">
            <CAccordionHeader>
              Grafik Vendor
            </CAccordionHeader>
            <CAccordionBody>
              <h6>{{ 'Nama Parameter' }} ({{ 'Vendor' }})</h6>
              <div class="card">
                <div class="card-body p-0">
                  <ChartParameterVue />
                </div>
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
import moment from 'moment'

export default {
  name: 'Dashboard',
  data() {
    return {
      fieldsInput: [
        InputModel('Start Date', 'date', 'Select Date', moment().startOf('month').format('YYYY-MM-DD'), null, null, false, 'lineId'),
        InputModel('Start Date', 'date', 'Select Date', moment().endOf('month').format('YYYY-MM-DD'), null, null, false, 'lineId'),
        InputModel('Line', 'treeselect', 'Select Line', null, null, null, false, 'lineId'),
        InputModel('Machine', 'treeselect', 'Select Machine', null, null, null, false, 'machineId'),
        InputModel('Parameter', 'treeselect', 'Select Parameter', null, null, null, false, 'machineId'),
        InputModel('In Charge', 'option', 'Select Incharge', null, [{ id: 'VENDOR', label: 'VENDOR' }, { id: 'INTERNAL', label: 'INTERNAL' }], null, false),
      ]
    }
  },
  computed: {
    ...mapGetters([GET_LINE_TREESELECT]),
  },
  methods: {
    ...mapActions([ACTION_LINE]),
    async getLines() {
      await this.ACTION_LINE({ page: 1, line: null })
    }
  },
  components: {
    FilterComponentVue,
    ChartParameterVue
  },
  mounted() {
    this.getLines()
  }
}
</script>
