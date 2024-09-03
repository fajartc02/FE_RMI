<template>
  <div id="mst-system">
    <CommonDataTableComponent
      tag="System"
      @on-add="onAdd"
      @on-data-selected="onDataSelected"
      @on-filter="onChangeFilter"
      :filters="filters"
      :dataTbl="dataTbl"
    >
      <template #modal>
        <ModalFormMstSystemComponent
          :loaded-data="selectedRow"
          :visible="visibleForm"
          @on-close="visibleForm = false"/>
      </template>
    </CommonDataTableComponent>
  </div>
</template>

<script>
import CommonDataTableComponent from "@/views/pages/RawMaterialCheck/Master/components/CommonDataTableComponent.vue";
import ModalFormMstSystemComponent
  from "@/views/pages/RawMaterialCheck/Master/components/ModalFormMstSystemComponent.vue";
import InputModel from "@/components/RawMaterialInspection/Filter/InputModel";
import {mapActions, mapGetters} from 'vuex';
import {GET_TBL_SYSTEM, ACTION_TBL_SYSTEM} from "@/store/modules/SYSTEM.module";

export default {
  name: "MasterSystemPage",
  components: {
    CommonDataTableComponent,
    ModalFormMstSystemComponent
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
        this.ACTION_TBL_SYSTEM()
      }, 300);
    });
  },
  computed: {
    ...mapGetters([GET_TBL_SYSTEM]),
    dataTbl() {
      return this.GET_TBL_SYSTEM
    }
  },
  methods: {
    ...mapActions([ACTION_TBL_SYSTEM]),
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
