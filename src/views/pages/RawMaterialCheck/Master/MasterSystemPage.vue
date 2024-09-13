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
          @on-close="onClose"/>
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
import {
  ACTION_SET_META,
  GET_META
} from "@/store/modules/META.module";
import moment from "moment";

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
          'name'
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
        this.ACTION_TBL_SYSTEM(this.pagination)
      }, 300);
    });
  },
  computed: {
    ...mapGetters([GET_TBL_SYSTEM, GET_META]),
    dataTbl() {
      return this.GET_TBL_SYSTEM
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
        this.ACTION_TBL_SYSTEM(this.pagination);
      }
    },
  },
  methods: {
    ...mapActions([ACTION_TBL_SYSTEM, ACTION_SET_META]),
    async onChangeFilter(filter) {
      this.ACTION_TBL_SYSTEM({
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
