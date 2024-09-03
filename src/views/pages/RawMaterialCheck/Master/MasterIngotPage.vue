<template>
  <div id="mst-line">
    <div class="container-fluid">
      <TableAddComponent @on-click="onAdd" tag="Ingot"/>
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
    <ModalFormMstIngotComponent :loaded-data="selectedRow" :visible="visibleForm" @on-close="onClose"/>
  </div>
</template>

<script>
import TableComponentVue from "@/components/RawMaterialInspection/Table/TableComponent.vue";
import PaginationComponent from "@/components/RawMaterialInspection/Pagination/PaginationComponent.vue";
import FilterComponentVue from "@/components/RawMaterialInspection/Filter/FilterComponent.vue";
import InputModel from "@/components/RawMaterialInspection/Filter/InputModel";
import TableAddComponent from "@/components/RawMaterialInspection/Table/TableAddComponent.vue";
import ModalFormMstIngotComponent
  from "@/views/pages/RawMaterialCheck/Master/components/ModalFormMstIngotComponent.vue";
import {mapActions, mapGetters} from 'vuex';
import {
  GET_TBL_INGOT,
  ACTION_TBL_INGOT
} from "@/store/modules/INGOT.module";

export default {
  name: "MasterIngotPage",
  components: {
    ModalFormMstIngotComponent,
    TableAddComponent,
    FilterComponentVue,
    PaginationComponent,
    TableComponentVue,
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
    this.$nextTick(() => {
      setTimeout(() => {
        this.ACTION_TBL_INGOT()
      }, 300)
    })
  },
  computed: {
    ...mapGetters([GET_TBL_INGOT]),
    dataTbl() {
      return this.GET_TBL_INGOT
    }
  },
  methods: {
    ...mapActions([ACTION_TBL_INGOT]),
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
        //this.ACTION_TBL_INGOT()
      }
    }
  }
}
</script>
