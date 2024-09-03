<template>
  <div id="mst-mesin">
    <div class="container-fluid">
      <TableAddComponent @on-click="onAdd" tag="Machine"/>
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
    <ModalFormMstMesinComponent :mesin-data="selectedRow" :visible="visibleForm" @on-close="onClose"/>
  </div>
</template>
<script>
import ModalFormMstMesinComponent
  from "@/views/pages/RawMaterialCheck/Master/components/ModalFormMstMesinComponent.vue";
import TableComponentVue from "@/components/RawMaterialInspection/Table/TableComponent.vue";
import PaginationComponent from "@/components/RawMaterialInspection/Pagination/PaginationComponent.vue";
import FilterComponentVue from "@/components/RawMaterialInspection/Filter/FilterComponent.vue";
import InputModel from "@/components/RawMaterialInspection/Filter/InputModel";
import TableAddComponent from "@/components/RawMaterialInspection/Table/TableAddComponent.vue";
import {ACTION_LINE, GET_LINE_TREESELECT} from "@/store/modules/LINE.module";
import {GET_TBL_MACHINE, ACTION_TBL_MACHINE} from "@/store/modules/MACHINE.module";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "MasterMesinPage",
  components: {
    FilterComponentVue,
    PaginationComponent,
    TableComponentVue,
    ModalFormMstMesinComponent,
    TableAddComponent
  },
  data() {
    return {
      selectedRow: null,
      visibleForm: false,
      filters: [
        InputModel(
          'Line',
          'treeselect',
          'Select Line',
          null,
          GET_LINE_TREESELECT,
          null,
          false,
          'lineId'
        ),
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
    this.$nextTick(() => {
      setTimeout(() => {
        this.ACTION_TBL_MACHINE();
        this.ACTION_LINE();
      }, 300)
    })
  },
  computed: {
    ...mapGetters([GET_TBL_MACHINE, GET_LINE_TREESELECT]),
    dataTbl() {
      return this.GET_TBL_MACHINE;
    }
  },
  methods: {
    ...mapActions([ACTION_LINE, ACTION_TBL_MACHINE]),
    async onChangeFilter(filter) {

    },
    onDataSelected(data) {
      this.selectedRow = data;
      this.visibleForm = true;
    },
    onAdd() {
      this.selectedRow = null;
      this.visibleForm = true;
    },
    onClose(hasAction) {
      this.visibleForm = false
      if (hasAction === true) {
        this.ACTION_TBL_MACHINE()
      }
    }
  }
}
</script>
