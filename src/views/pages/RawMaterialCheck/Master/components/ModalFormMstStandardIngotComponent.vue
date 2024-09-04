<template>
  <CModal class="w-100" scrollable fullscreen :visible="visible" backdrop="static" @close="closeModal">
    <CommonModalHeaderComponent :title="title"/>
    <CModalBody>
      <div class="mb-3">
        <label class="form-label">Vendor</label>
        <Treeselect
          :options="GET_VENDOR_SELECT"
          :clearable="true"
          placeholder="Select Vendor"
          @select="onSelectVendor"
          @deselect="onDeselectVendor"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Line</label>
        <Treeselect
          :options="GET_LINE_SELECT"
          :clearable="true"
          :disabled="selectedVendor === null"
          placeholder="Select Line"
          @select="onSelectLine"
          @deselect="onDeselectLine"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">In Charge</label>
        <Treeselect
          :options="GET_SYSTEM_SELECT"
          :clearable="true"
          :disabled="selectedLine === null"
          placeholder="Select In Charge"
          @select="onSelectInCharge"
          @deselect="onDeselectInCharge"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Ingot Element</label>
        <Treeselect
          v-model="selectedElements"
          :options="GET_INGOT_SELECT"
          :disabled="selectedInCharge === null"
          :multiple="true"
          :close-on-select="true"
          @select="onSelectElement"
          @deselect="onDeselectElement"
        />
      </div>
      <div class="mb-3">
        <div class="row">
          <div class="col-md-12 col-lg-12">
            <table class="table table-bordered table-striped text-center">
              <thead>
              <tr>
                <th>Name</th>
                <th>Vendor Name</th>
                <th>Line Name</th>
                <th>In Charge</th>
                <th>Min</th>
                <th>Max</th>
                <th>Warning Limit</th>
                <th>Min +</th>
                <th>Max -</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="elementData?.length === 0">
                <td colspan="9" class="text-center">Please select ingot element</td>
              </tr>
              <tr v-else v-for="(element, i) in elementData" :key="i">
                <td>{{ element.name }}</td>
                <td>{{ element.vendorName }}</td>
                <td>{{ element.lineName }}</td>
                <td style="width: 30%;">
                  <Treeselect
                    v-model="element.inCharge"
                    :options="GET_SYSTEM_SELECT"
                    :clearable="true"
                  />
                </td>
                <td>
                  <input class="form-control" type="number" min="0" v-model="element.min">
                </td>
                <td>
                  <input class="form-control" type="number" min="0" v-model="element.max">
                </td>
                <td>
                  <input class="form-control" type="number" min="0" v-model="element.warningLimit">
                </td>
                <td>{{ element.minWarning }}</td>
                <td>{{ element.maxWarning }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CModalBody>
    <CommonFooterActionComponent
      :submit-title="title"
      :has-loaded-data="hasLoadedData"
      @on-close="closeModal"
      @on-submit="submit"
      @on-delete="remove"
    />
  </CModal>
  <ModalConfirm
    title="Delete?"
    @confirm="onConfirmDelete"/>
</template>

<script>
import CommonFooterActionComponent
  from "@/views/pages/RawMaterialCheck/Master/components/CommonModalFooterActionComponent.vue";
import CommonModalHeaderComponent
  from "@/views/pages/RawMaterialCheck/Master/components/CommonModalHeaderComponent.vue";
import ModalConfirm from "@/components/RawMaterialInspection/ModalConfirm.vue";
import Treeselect from "@zanmato/vue3-treeselect";
import {
  ACTION_ADD_STANDARD_INGOT,
  ACTION_EDIT_STANDARD_INGOT,
  ACTION_REMOVE_STANDARD_INGOT
} from '@/store/modules/STANDARD_INGOT.module'
import {
  GET_LINE_SELECT,
  ACTION_LINE
} from "@/store/modules/LINE.module";
import {
  GET_VENDOR_SELECT,
  ACTION_VENDOR
} from "@/store/modules/VENDOR.module";
import {
  GET_SYSTEM_SELECT,
  ACTION_SYSTEM,
  SYSTEM_TYPE
} from "@/store/modules/SYSTEM.module";
import {
  GET_INGOT_SELECT,
  ACTION_INGOT
} from "@/store/modules/INGOT.module";
import {performHttpRequest} from "@/utils/RequestUtils";
import {mapActions, mapGetters} from "vuex";

const emptyElement =  {
  name: '',
  vendorName: null,
  lineName: '',
  inCharge: null,
  min: 0,
  max: 0,
  warningLimit: 0,
  minWarning: 0,
  maxWarning: 0,
};

export default {
  name: "ModalFormMstStandardIngotComponent",
  components: {
    Treeselect,
    ModalConfirm,
    CommonModalHeaderComponent,
    CommonFooterActionComponent,
  },
  props: {
    loadedData: Object,
    visible: Boolean
  },
  data() {
    return {
      isLoading: false,
      selectedVendor: null,
      selectedLine: null,
      selectedInCharge: null,
      selectedElements: null,
      elementData: [],
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.getLine();
        this.getVendor();
        this.getInCharge();
        this.getElements();
      }, 500);
    });
  },
  computed: {
    ...mapGetters([
      GET_LINE_SELECT,
      GET_VENDOR_SELECT,
      GET_SYSTEM_SELECT,
      GET_INGOT_SELECT
    ]),
    title() {
      if (this.hasLoadedData) {
        return "Edit Standard Ingot";
      }

      return "Add Standard Ingot";
    },
    hasLoadedData() {
      return this.loadedData && this.loadedData.id;
    },
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        /* if (this.hasLoadedData) {
           this.form = {
             ...this.loadedData
           }
         } else {
           this.form = {
             ...defaultArgs
           }
         }*/
      }
    },
    selectedElements(newValue) {

    }
  },
  methods: {
    ...mapActions({
      ACTION_ADD_STANDARD_INGOT,
      ACTION_EDIT_STANDARD_INGOT,
      ACTION_REMOVE_STANDARD_INGOT,
      ACTION_LINE,
      ACTION_VENDOR,
      ACTION_SYSTEM,
      ACTION_INGOT,
    }),
    getVendor() {
      performHttpRequest(async () => {
        await this.ACTION_VENDOR();
      });
    },
    getLine() {
      performHttpRequest(async () => {
        await this.ACTION_LINE();
      });
    },
    getInCharge() {
      performHttpRequest(async () => {
        await this.ACTION_SYSTEM({
          type: SYSTEM_TYPE.INCHARGE_TYPE
        });
      });
    },
    getElements() {
      performHttpRequest(async () => {
        await this.ACTION_INGOT();
      });
    },
    onSelectVendor(data) {
      this.selectedVendor = data;
    },
    onDeselectVendor(data) {
      this.selectedVendor = null;
    },
    onSelectLine(data) {
      this.selectedLine = data;
    },
    onDeselectLine(data) {
      this.selectedLine = null;
    },
    onSelectInCharge(data) {
      this.selectedInCharge = data;
    },
    onDeselectInCharge(data) {
      this.selectedInCharge = null;
    },
    onSelectElement(data) {
      /*console.log('onSelectElement data', data);
      console.log('onSelectElement selectedElements', this.selectedElements);*/
      const newElement = {
        name: data.label,
        vendorName: this.selectedVendor?.label,
        lineName: this.selectedLine?.label,
        inCharge: this.selectedInCharge?.id,
        min: 0,
        max: 0,
        warningLimit: 0,
        minWarning: 0,
        maxWarning: 0,
      };

      const copyElement = [...(this.elementData ?? [])];
      const existingIndex = copyElement.findIndex((element) => (element.name === newElement.name));
      if (existingIndex > -1) {
        copyElement.splice(existingIndex, 1, newElement);
      } else {
        copyElement.push(newElement);
      }

      this.elementData = copyElement;
      console.log('elementData', this.elementData)
    },
    onDeselectElement(data) {
      /*console.log('onDeselectElement data', data);
      console.log('onDeselectElement selectedElements', this.selectedElements);*/

      const copyElement = [...(this.elementData ?? [])];
      const existingIndex = copyElement.findIndex((element) => (element.name === data.label));
      if (existingIndex > -1) {
        copyElement.splice(existingIndex, 1);
      }

      this.elementData = copyElement;
    },
    submit() {
      performHttpRequest(async () => {
        this.isLoading = true;
        if (this.hasLoadedData) {
          await this.ACTION_EDIT_STANDARD_INGOT(this.form)
        } else {
          await this.ACTION_ADD_STANDARD_INGOT(this.form)
        }

        this.isLoading = false;
        this.closeModal()
      })
    },
    remove() {
      this.$store.dispatch('MODALS/open', 'DialogKonfirmasi');
    },
    closeModal() {
      this.$emit('on-close', true)
    },
    onConfirmDelete() {
      performHttpRequest(async () => {
        this.isLoading = true;
        await this.ACTION_REMOVE_STANDARD_INGOT(this.form)
        this.isLoading = false;
        this.closeModal()
      });
    },
  }
}
</script>

