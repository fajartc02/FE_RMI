<template>
  <div id="mst-standard-ingot">
    <CommonDataTableComponent
      tag="Standard Sand"
      @on-add="onAdd"
      @on-data-selected="onDataSelected"
      @on-filter="onChangeFilter"
      :filters="filters"
      :dataTbl="dataTbl"
    >
      <template #modal>
        <ModalFormMstStandardSandComponent
          :loaded-data="selectedRow"
          :visible="visibleForm"
          @on-close="onClose"/>
      </template>
    </CommonDataTableComponent>
  </div>
</template>

<script>
import CommonDataTableComponent from "@/views/pages/RawMaterialCheck/Master/components/CommonDataTableComponent.vue";
import InputModel from "@/components/RawMaterialInspection/Filter/InputModel";
import ModalFormMstStandardSandComponent
  from "@/views/pages/RawMaterialCheck/Master/components/ModalFormMstStandardSandComponent.vue";
import {mapActions, mapGetters} from 'vuex';
import {
  ACTION_SET_META,
  GET_META
} from "@/store/modules/META.module";
import {
  GET_TBL_STANDARD_SAND,
  ACTION_TBL_STANDARD_SAND
} from "@/store/modules/STANDARD_SAND.module";
import {performHttpRequest} from "@/utils/RequestUtils";
import moment from "moment";
import {GET_INGOT_TREESELECT} from "@/store/modules/INGOT.module";
import {ACTION_SAND, GET_SAND_SELECT, GET_SAND_TREESELECT} from "@/store/modules/SAND.module";

export default {
  name: "MasterStandardSandPage",
  components: {
    ModalFormMstStandardSandComponent,
    CommonDataTableComponent,
  },
  data() {
    return {
      selectedRow: null,
      visibleForm: false,
      filters: [
        InputModel(
          'Element',
          'treeselect',
          'Select Element',
          null,
          GET_SAND_TREESELECT,
          null,
          false,
          'elementId'
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
        this.getTbl();

        try{
          this.ACTION_SAND();
        }catch (e){
        }
      }, 300);
    });
  },
  computed: {
    ...mapGetters([
      GET_TBL_STANDARD_SAND,
      GET_META,
      GET_SAND_TREESELECT
    ]),
    dataTbl() {
      return this.GET_TBL_STANDARD_SAND
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
        this.getTbl();
      }
    },
    GET_SAND_TREESELECT(newValue, oldValue) {
      let idx = this.filters.findIndex(x => x.id === 'elementId');
      this.remapFilter(idx, {
        ...this.filters[idx],
        options: this.GET_SAND_TREESELECT,
      });
    }
  },
  methods: {
    ...mapActions([
      ACTION_TBL_STANDARD_SAND,
      ACTION_SET_META,
      ACTION_SAND
    ]),
    getTbl(filter = {}) {
      performHttpRequest(async () => {
        await this.ACTION_TBL_STANDARD_SAND({
          ...filter,
          ...this.pagination,
        });
      });
    },
    async onChangeFilter(filter) {
      this.getTbl({
        ...filter
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
    },
    remapFilter(index, model) {
      this.filters.splice(
        index,
        1,
        model
      );
    }
  }
}
</script>
