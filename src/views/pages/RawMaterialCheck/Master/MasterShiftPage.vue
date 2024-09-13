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
    <ModalFormMstShiftComponent :loaded-data="selectedRow" :visible="visibleForm" @on-close="onClose"/>
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
import {
  ACTION_SET_META,
  GET_META
} from "@/store/modules/META.module";
import moment from "moment";

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
        this.ACTION_TBL_SHIFT(this.pagination)
      }, 300);
    });
  },
  computed: {
    ...mapGetters([GET_TBL_SHIFT, GET_META]),
    dataTbl() {
      return this.GET_TBL_SHIFT
    },
    pagination() {
      return {
        page: this.GET_META.page,
        take: this.GET_META.take
      };
    }
  },
  watch: {
    GET_META(newValue, oldValue) {
      if (newValue.page !== oldValue.page || newValue.take !== oldValue.take) {
        this.ACTION_TBL_SHIFT(this.pagination);
      }
    },
  },
  methods: {
    ...mapActions([ACTION_TBL_SHIFT, ACTION_SET_META]),
    async onChangeFilter(filter) {
      this.ACTION_TBL_SHIFT({
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
