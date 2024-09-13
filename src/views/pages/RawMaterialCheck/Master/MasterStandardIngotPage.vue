<template>
  <div id="mst-standard-ingot">
    <CommonDataTableComponent
      tag="Standard Ingot"
      @on-add="onAdd"
      @on-data-selected="onDataSelected"
      @on-filter="onChangeFilter"
      :filters="filters"
      :dataTbl="dataTbl"
    >
      <template #modal>
        <ModalFormMstStandardIngotComponent
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
import ModalFormMstStandardIngotComponent
  from "@/views/pages/RawMaterialCheck/Master/components/ModalFormMstStandardIngotComponent.vue";
import {mapActions, mapGetters} from 'vuex';
import {
  GET_TBL_STANDARD_INGOT,
  ACTION_TBL_STANDARD_INGOT
} from "@/store/modules/STANDARD_INGOT.module";
import {
  ACTION_SET_META,
  GET_META
} from "@/store/modules/META.module";
import {constructError} from "@/utils/ResponseUtils";
import moment from "moment";
import {
  ACTION_LINE,
  GET_LINE_TREESELECT
} from "@/store/modules/LINE.module";
import {
  ACTION_VENDOR,
  GET_VENDOR_TREESELECT
} from "@/store/modules/VENDOR.module";
import {
  ACTION_INGOT,
  GET_INGOT_TREESELECT
} from "@/store/modules/INGOT.module";

export default {
  name: "MasterElementStandardIngotPage",
  components: {
    ModalFormMstStandardIngotComponent,
    CommonDataTableComponent,
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
          'NONE',
          GET_LINE_TREESELECT,
          null,
          false,
          'lineId'
        ),
        InputModel(
          'Vendor',
          'treeselect',
          'Select Vendor',
          'NONE',
          GET_VENDOR_TREESELECT,
          null,
          false,
          'vendorId'
        ),
        InputModel(
          'Element',
          'treeselect',
          'Select Element',
          'NONE',
          GET_INGOT_TREESELECT,
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

        this.getTable();

        try {
          this.ACTION_LINE();
        } catch (e) {
        }

        try {
          this.ACTION_VENDOR();
        } catch (e) {
        }

        try {
          this.ACTION_INGOT();
        } catch (e) {
        }
      }, 300);
    });
  },
  computed: {
    ...mapGetters([
      GET_TBL_STANDARD_INGOT,
      GET_META,
      GET_LINE_TREESELECT,
      GET_VENDOR_TREESELECT,
      GET_INGOT_TREESELECT
    ]),
    dataTbl() {
      return this.GET_TBL_STANDARD_INGOT
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
        this.ACTION_TBL_STANDARD_INGOT(this.pagination);
      }
    },
    GET_LINE_TREESELECT(newVal, oldVal) {
      let idx = this.filters.findIndex(x => x.id === 'lineId');
      this.remapFilter(idx, {
        ...this.filters[idx],
        options: this.GET_LINE_TREESELECT,
      });
    },
    GET_VENDOR_TREESELECT(newVal, oldVal) {
      let idx = this.filters.findIndex(x => x.id === 'vendorId');
      this.remapFilter(idx, {
        ...this.filters[idx],
        options: this.GET_VENDOR_TREESELECT,
      });
    },
    GET_INGOT_TREESELECT(newVal, oldVal) {
      let idx = this.filters.findIndex(x => x.id === 'elementId');
      this.remapFilter(idx, {
        ...this.filters[idx],
        options: this.GET_INGOT_TREESELECT,
      });
    }
  },
  methods: {
    ...mapActions([
      ACTION_TBL_STANDARD_INGOT,
      ACTION_SET_META,
      ACTION_LINE,
      ACTION_VENDOR,
      ACTION_INGOT
    ]),
    getTable(filter = {}) {
      try {
        this.ACTION_TBL_STANDARD_INGOT({
          ...filter,
          ...this.pagination
        });
      } catch (e) {
        this.$swal('Error', `Something wrong, please try again<br>Detail Error: ${constructError(e)} `, 'error')
      }
    },
    async onChangeFilter(filter) {
      this.getTable(filter)
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
