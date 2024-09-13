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
  ACTION_MACHINE,
  GET_MACHINE_TREESELECT
} from "@/store/modules/MACHINE.module";
import {
  ACTION_SET_META,
  GET_META
} from "@/store/modules/META.module";
import {constructError} from "@/utils/ResponseUtils";
import moment from "moment";

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
          'Name',
          'text',
          'Search Name',
          null,
          null,
          null,
          false,
          'name'
        ),
        InputModel(
          'Machine',
          'treeselect',
          'Select Machine',
          null,
          [],
          null,
          true,
          'machineId'
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
          this.ACTION_MACHINE();
        } catch (e) {
        }
      }, 300);
    });
  },
  computed: {
    ...mapGetters([
      GET_TBL_STANDARD_INGOT,
      GET_META,
      GET_MACHINE_TREESELECT
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
    GET_MACHINE_TREESELECT(newValue, oldValue) {
      if(newValue !== oldValue) {
        let idxMachineInput = this.filters.findIndex(x => x.title == 'Machine');
        this.filters
          .splice(
            idxMachineInput,
            1,
            InputModel(
              'Machine',
              'treeselect',
              'Select Machine',
              'NONE',
              newValue,
              null,
              false,
              'machineId'
            )
          );
      }
    },
  },
  methods: {
    ...mapActions([
      ACTION_TBL_STANDARD_INGOT,
      ACTION_MACHINE,
      ACTION_SET_META
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

  }
}
</script>
