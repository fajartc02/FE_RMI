<template>
  <div id="mst-shift">
    <div class="container-fluid">
      <TableAddComponent @on-click="onAdd" tag="Shift"/>
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
    <ModalFormMstShiftComponent :loaded-data="selectedRow" :visible="visibleForm" @on-close="visibleForm = false"/>
  </div>
</template>

<script>
import TableComponentVue from "@/components/RawMaterialInspection/Table/TableComponent.vue";
import PaginationComponent from "@/components/RawMaterialInspection/Pagination/PaginationComponent.vue";
import FilterComponentVue from "@/components/RawMaterialInspection/Filter/FilterComponent.vue";
import InputModel from "@/components/RawMaterialInspection/Filter/InputModel";
import TableAddComponent from "@/components/RawMaterialInspection/Table/TableAddComponent.vue";
import ModalFormMstShiftComponent
  from "@/views/pages/RawMaterialCheck/Master/components/ModalFormMstShiftComponent.vue";
import {mapActions, mapGetters} from 'vuex';
import {GET_TBL_SHIFT, ACTION_TBL_SHIFT} from "@/store/modules/SHIFT.module";

export default {
  name: "MasterShiftPage",
  components: {
    ModalFormMstShiftComponent,
    TableAddComponent,
    FilterComponentVue,
    PaginationComponent, TableComponentVue,
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
    this.ACTION_TBL_SHIFT()
  },
  computed: {
    ...mapGetters([GET_TBL_SHIFT]),
    dataTbl() {
      return this.GET_TBL_SHIFT
    }
  },
  methods: {
    ...mapActions([ACTION_TBL_SHIFT]),
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
