<template>
  <div class="container-fluid">
    <TableAddComponent @on-click="onAdd" :tag="tag"/>
    <div class="row">
      <div class="col-12">
        <FilterComponentVue :fieldsInput="filters" @emit-filter="onChangeFilter"/>
      </div>
    </div>
    <div class="row mt-1">
      <div class="col-12">
        <div class="card p-2 overflow-auto mb-2">
          <TableComponentVue include-loading :dataTable="dataTbl" @emit-data="onDataSelected"/>
        </div>
        <PaginationComponent/>
      </div>
    </div>
  </div>
  <slot name="modal"></slot>
</template>

<script>
import TableComponentVue from "@/components/RawMaterialInspection/Table/TableComponent.vue";
import PaginationComponent from "@/components/RawMaterialInspection/Pagination/PaginationComponent.vue";
import FilterComponentVue from "@/components/RawMaterialInspection/Filter/FilterComponent.vue";
import TableAddComponent from "@/components/RawMaterialInspection/Table/TableAddComponent.vue";

export default {
  name: "CommonDataTableComponent",
  components: {
    TableAddComponent,
    FilterComponentVue,
    PaginationComponent, TableComponentVue,
  },
  props: {
    tag: String,
    filters: Array,
    dataTbl: Array,
  },
  methods: {
    async onChangeFilter(filter) {
      this.$emit('on-filter', filter)
    },
    onDataSelected(data) {
      this.$emit('on-data-selected', data)
    },
    onAdd() {
      this.$emit('on-add')
    }
  }
}
</script>
