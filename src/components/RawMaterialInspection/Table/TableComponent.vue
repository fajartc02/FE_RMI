<template>
  <div class="position-relative">
    <CTable v-if="dataTable?.data && dataTable?.data.length > 0" class="text-center" striped bordered hover>
      <CTableHead>
        <CTableRow>
          <template v-for="(label, index) in Object.keys(dataTable?.data[0])">
            <CTableHeaderCell v-if="label != 'id' && !label.toLowerCase().includes('id')" :key="index" scope="col"
              :style="`${convertCase(label) === 'Standard' ? 'min-width: 300px;' : ''}`">
              {{ convertCase(label) }}
            </CTableHeaderCell>
          </template>
          <CTableHeaderCell>Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="(item, index) in dataTable?.data" :key="index + 1">
          <template v-for="(value, key, idxChild) in item" :key="idxChild + 2">
            <CTableDataCell v-if="key != 'id' && !key.toLowerCase().includes('id')"
              :class="`${value === 'OK' ? 'text-success' : value === 'NG' ? 'text-danger' : `${value}`.includes('REVISION') || `${value}`.includes('WARNING') ? 'text-warning' : ''}`">
              {{ typeof value === 'object' ? value?.name : typeof value === 'boolean' ? (value ? '✔️' : '') : value }}
            </CTableDataCell>
          </template>
          <CTableDataCell>
            <button class="btn btn-sm btn-primary" @click="handleAction(item)">Details >></button>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
    <DataNotFound v-else-if="includeLoading || !IS_LOADING" />
    <div v-if="includeLoading && IS_LOADING" style="height: 5rem;">
      <div class="position-absolute top-10 bottom-0 left-0 right-0 w-100 h-100">
        <LoadingComponent />
      </div>
    </div>
  </div>
</template>

<script>
import FN_CASE_CONVERTER from '@/functions/FN_CASE_CONVERTER';
import DataNotFound from '@/components/RawMaterialInspection/EmptyDataHandler/DataNotFound.vue';
import LoadingComponent from "@/components/RawMaterialInspection/LoadingComponent.vue";
import { IS_LOADING } from '@/store/modules/LOADING.module'
import { mapGetters } from "vuex";

export default {
  name: 'TableComponent',
  computed: {
    ...mapGetters([IS_LOADING]),
    getKeys: function () {
      return Object.keys(this.dataTable?.data[0]);
    }
  },
  props: {
    dataTable: {
      type: Array,
      required: true
    },
    includeLoading: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    handleAction(item) {
      this.$emit('emit-data', item)
    },
    convertCase(str) {
      return FN_CASE_CONVERTER.camelToTitleCase(str);
    },
  },
  components: {
    LoadingComponent,
    DataNotFound
  }
}
</script>
