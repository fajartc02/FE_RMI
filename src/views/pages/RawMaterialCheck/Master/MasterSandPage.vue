<template>
  <div id="mst-line">
    <div class="container-fluid">
      <TableAddComponent @on-click="onAdd" tag="Sand"/>
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
    <ModalFormMstSandComponent :loaded-data="selectedRow" :visible="visibleForm" @on-close="onClose"/>
  </div>
</template>

<script>
import TableComponentVue from "@/components/RawMaterialInspection/Table/TableComponent.vue";
import PaginationComponent from "@/components/RawMaterialInspection/Pagination/PaginationComponent.vue";
import FilterComponentVue from "@/components/RawMaterialInspection/Filter/FilterComponent.vue";
import InputModel from "@/components/RawMaterialInspection/Filter/InputModel";
import TableAddComponent from "@/components/RawMaterialInspection/Table/TableAddComponent.vue";
import ModalFormMstSandComponent from "@/views/pages/RawMaterialCheck/Master/components/ModalFormMstSandComponent.vue";
import {mapActions, mapGetters} from 'vuex';
import {
  GET_TBL_SAND,
  ACTION_TBL_SAND
} from "@/store/modules/SAND.module";
import {
  GET_META
} from "@/store/modules/META.module";

export default {
  name: "MasterSand",
  components: {
    ModalFormMstSandComponent,
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
        this.ACTION_TBL_SAND();
      }, 300)
    });
  },
  computed: {
    ...mapGetters([GET_TBL_SAND, GET_META]),
    dataTbl() {
      return this.GET_TBL_SAND
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
        this.ACTION_TBL_SAND(this.pagination);
      }
    },
  },
  methods: {
    ...mapActions([ACTION_TBL_SAND]),
    async onChangeFilter(filter) {
      this.ACTION_TBL_SAND({
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
