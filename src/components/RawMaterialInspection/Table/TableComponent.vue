<template>
  <CTable v-if="dataTable.data" class="text-center" striped bordered hover>
    <CTableHead>
      <CTableRow>
        <template v-for="(label, index) in Object.keys(dataTable.data[0])">
          <CTableHeaderCell v-if="label != 'id'" :key="index" scope="col">
            {{ convertCase(label) }}
          </CTableHeaderCell>
        </template>
        <CTableHeaderCell>Action</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(item, index) in dataTable.data" :key="index">
        <template v-for="(value, key, idxChild) in item" :key="idxChild">
          <CTableDataCell v-if="key != 'id'"
            :class="`${value === 'OK' ? 'text-success' : value === 'NG' ? 'text-danger' : value === 'RECHECK' ? 'text-warning' : ''}`">
            {{ value }}
          </CTableDataCell>
        </template>
        <CTableDataCell>
          <button class="btn btn-sm btn-primary" @click="handleAction(item)">Details >></button>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
  <PaginationComponent v-if="dataTable.data" :itemCount="meta.itemCount" :page="meta.page" :take="meta.take" />
  <DataNotFound v-else />
</template>

<script>
import FN_CASE_CONVERTER from '@/functions/FN_CASE_CONVERTER';
import PaginationComponent from '../Pagination/PaginationComponent.vue';
import DataNotFound from '@/components/RawMaterialInspection/EmptyDataHandler/DataNotFound.vue';

export default {
  name: 'TableComponent',
  data() {
    return {
      meta: {
        itemCount: 1,
        page: 1,
        take: 25
      }
    }
  },
  computed: {
    getKeys: function () {
      return Object.keys(this.dataTable.data[0]);
    }
  },
  watch: {
    meta: {
      deep: true,
      handler() {
        this.$emit('emit-page', this.meta)
      }
    }
  },
  props: {
    filters: {
      type: Array,
      required: true
    },
    dataTable: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleAction(item) {
      console.log('Action button clicked for:', item);
      this.$emit('emit-data', item)
    },
    convertCase(str) {
      return FN_CASE_CONVERTER.camelToTitleCase(str);
    },
  },
  components: {
    PaginationComponent,
    DataNotFound
  }
}
</script>
