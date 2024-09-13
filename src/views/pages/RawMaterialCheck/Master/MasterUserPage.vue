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
          @on-close="onClose"/>
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
import {
  ACTION_SET_META,
  GET_META
} from "@/store/modules/META.module";
import moment from "moment";

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
          'nameOrEmail'
        ),
      ],
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.ACTION_SET_META({
          page: 1,
          take: 20,
          itemCount: 5,
          pageCount: 1,
          hasPreviousPage: false,
          hasNextPage: false,
          timestamp: moment().format('YYYY-MM-DD'),
        });
        this.ACTION_TBL_USER(this.pagination);
      }, 300);
    });
  },
  computed: {
    ...mapGetters([GET_TBL_USER, GET_META]),
    dataTbl() {
      return this.GET_TBL_USER
    },
    pagination() {
      return {
        page: this.GET_META.page,
        take: this.GET_META.take
      };
    },
  },
  watch: {
    GET_META(newValue, oldValue) {
      if (newValue.page !== oldValue.page || newValue.take !== oldValue.take) {
        this.ACTION_TBL_USER(this.pagination);
      }
    },
  },
  methods: {
    ...mapActions([ACTION_TBL_USER, ACTION_SET_META]),
    async onChangeFilter(filter) {
      this.ACTION_TBL_USER({
        ...filter,
        ...this.pagination
      });
    },
    onDataSelected(data) {
      this.selectedRow = data;
      this.visibleForm = true;
    },
    onAdd() {
      this.selectedRow = null;
      this.visibleForm = true;
    },
    onClose() {
      setTimeout(() => {
        this.visibleForm = false
      }, 300);
    }
  }
}
</script>
