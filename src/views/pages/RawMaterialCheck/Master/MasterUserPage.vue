<template>
  <div id="mst-user">
    <CommonDataTableComponent
      tag="User"
      @on-add="onAdd"
      @on-data-selected="onDataSelected"
      @on-filter="onChangeFilter"
      :filters="filters"
      :dataTbl="dataTbl"
    >
      <template #modal>
        <ModalFormMstUserComponent
          :loaded-data="selectedRow"
          :visible="visibleForm"
          @on-close="visibleForm = false"/>
      </template>
    </CommonDataTableComponent>
  </div>
</template>

<script>
import ModalFormMstUserComponent from "@/views/pages/RawMaterialCheck/Master/components/ModalFormMstUserComponent.vue";
import CommonDataTableComponent from "@/views/pages/RawMaterialCheck/Master/components/CommonDataTableComponent.vue";
import InputModel from "@/components/RawMaterialInspection/Filter/InputModel";
import {mapActions, mapGetters} from 'vuex';
import {GET_TBL_USER, ACTION_TBL_USER} from "@/store/modules/USER.module";

export default {
  name: "MasterUserPage",
  components: {
    ModalFormMstUserComponent,
    CommonDataTableComponent,
  },
  data() {
    return {
      selectedRow: null,
      visibleForm: false,
      filters: [
        InputModel(
          'Name / Email',
          'text',
          'Search Name or Email',
          null,
          null,
          null,
          false,
          'filterNameOrEmail'
        ),
      ],
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.ACTION_TBL_USER();
      }, 300);
    });
  },
  computed: {
    ...mapGetters([GET_TBL_USER]),
    dataTbl() {
      return this.GET_TBL_USER
    }
  },
  methods: {
    ...mapActions([ACTION_TBL_USER]),
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
