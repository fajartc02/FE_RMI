<template>
  <div id="mst-line">
    <div class="container-fluid">
      <TableAddComponent @on-click="onAdd" tag="Line"/>
      <div class="row">
        <div class="col-12">
          <FilterComponentVue :fieldsInput="filters" @emit-filter="onChangeFilter"/>
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-12">
          <div class="card p-2 overflow-auto mb-2">
            <TableComponentVue include-loading :dataTable="lineTbl" @emit-data="onDataSelected"/>
          </div>
          <PaginationComponent/>
        </div>
      </div>
    </div>
    <ModalFormMstLineComponent :line-data="selectedRow" :visible="visibleForm" @on-close="visibleForm = false"/>
  </div>
</template>

<script>
import ModalFormMstLineComponent from "@/views/pages/RawMaterialCheck/Master/components/ModalFormMstLineComponent.vue";
import TableComponentVue from "@/components/RawMaterialInspection/Table/TableComponent.vue";
import PaginationComponent from "@/components/RawMaterialInspection/Pagination/PaginationComponent.vue";
import FilterComponentVue from "@/components/RawMaterialInspection/Filter/FilterComponent.vue";
import InputModel from "@/components/RawMaterialInspection/Filter/InputModel";
import {mapActions, mapGetters} from 'vuex';
import {GET_TBL_LINE, ACTION_TBL_LINE} from "@/store/modules/LINE.module";
import TableAddComponent from "@/components/RawMaterialInspection/Table/TableAddComponent.vue";


export default {
  name: "MasterLinePage",
  components: {
    TableAddComponent,
    FilterComponentVue,
    PaginationComponent, TableComponentVue,
    ModalFormMstLineComponent
  },
  data() {
    return {
      selectedRow: null,
      visibleForm: false,
      filters: [
        InputModel(
          'Name',
          'text',
          'Search Name',
          null,
          null,
          null,
          false,
          'filterName'
        ),
      ],
    }
  },
  mounted() {
    this.ACTION_TBL_LINE()
  },
  computed: {
    ...mapGetters([GET_TBL_LINE]),
    lineTbl() {
      return this.GET_TBL_LINE
    }
  },
  methods: {
    ...mapActions([ACTION_TBL_LINE]),
    async onChangeFilter(filter) {

    },
    onDataSelected(data) {
      this.selectedRow = data;
      this.visibleForm = true;
    },
    onAdd() {
      this.selectedRow = null;
      this.visibleForm = true;
    }
  }
}
</script>
