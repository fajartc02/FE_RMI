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
        <h6>Grafik - Nama Parameter (Internal)</h6>
        <div class="card">
          <div class="card-body p-0">
            <ChartParameterVue />
          </div>
        </div>
      </div>
      <div class="col-12 my-1">
        <h6>Grafik - Nama Parameter (Internal)</h6>
        <div class="card">
          <div class="card-body p-0">
            <ChartParameterVue />
          </div>
        </div>
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

export default {
  name: 'Dashboard',
  data() {
    return {
      fieldsInput: [InputModel('Line', 'treeselect', 'Select Line', null, this.GET_LINE_TREESELECT, null, false, 'lineId'),]
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
