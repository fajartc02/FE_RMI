<template>
  <div id="mst-vendor">
    <CommonDataTableComponent
      tag="Vendor"
      @on-add="onAdd"
      @on-data-selected="onDataSelected"
      @on-filter="onChangeFilter"
      :filters="filters"
      :dataTbl="dataTbl"
    >
      <template #modal>
        <ModalFormMstVendorComponent
          :loaded-data="selectedRow"
          :visible="visibleForm"
          @on-close="visibleForm = false"/>
      </template>
    </CommonDataTableComponent>
  </div>
</template>

<script>
import ModalFormMstVendorComponent
  from "@/views/pages/RawMaterialCheck/Master/components/ModalFormMstVendorComponent.vue";
import CommonDataTableComponent from "@/views/pages/RawMaterialCheck/Master/components/CommonDataTableComponent.vue";
import InputModel from "@/components/RawMaterialInspection/Filter/InputModel";
import {mapActions, mapGetters} from 'vuex';
import {GET_TBL_VENDOR, ACTION_TBL_VENDOR} from "@/store/modules/VENDOR.module";

export default {
  name: "MasterVendorPage",
  components: {
    ModalFormMstVendorComponent,
    CommonDataTableComponent,
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
    this.ACTION_TBL_VENDOR()
  },
  computed: {
    ...mapGetters([GET_TBL_VENDOR]),
    dataTbl() {
      return this.GET_TBL_VENDOR
    }
  },
  methods: {
    ...mapActions([ACTION_TBL_VENDOR]),
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
