<template>
  <CModal class="w-100" scrollable fullscreen :visible="visible" backdrop="static" @close="closeModal">
    <CommonModalHeaderComponent :title="title" />
    <CModalBody>
      <div class="mb-3">
        <label class="form-label">Vendor</label>
        <Treeselect v-model="loadedVendor" :options="GET_VENDOR_SELECT" :clearable="true" placeholder="Select Vendor"
          :disabled="hasLoadedData" @select="onSelectVendor" @deselect="onDeselectVendor" />
      </div>
      <div class="mb-3">
        <label class="form-label">Line</label>
        <Treeselect v-model="loadedLine" :options="GET_LINE_SELECT" :clearable="true"
          :disabled="selectedVendor === null || hasLoadedData" placeholder="Select Line" @select="onSelectLine"
          @deselect="onDeselectLine" />
      </div>
      <div class="mb-3">
        <label class="form-label">In Charge</label>
        <Treeselect v-model="loadedIncharge" :options="GET_SYSTEM_SELECT" :clearable="true"
          :disabled="selectedLine === null || hasLoadedData" placeholder="Select In Charge" @select="onSelectInCharge"
          @deselect="onDeselectInCharge" />
      </div>
      <div class="mb-3">
        <label class="form-label">Ingot Element</label>
        <Treeselect v-model="selectedElements" :options="GET_INGOT_SELECT"
          :disabled="selectedInCharge === null || hasLoadedData" :multiple="true" :close-on-select="true"
          @select="onSelectElement" @deselect="onDeselectElement" />
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
                  <td>{{ element.elementName }}</td>
                  <td>{{ element.vendorName }}</td>
                  <td>{{ element.lineName }}</td>
                  <td style="width: 30%;">
                    <Treeselect v-model="element.inCharge" :options="GET_SYSTEM_SELECT" :clearable="true" />
                  </td>
                  <td>
                    <input class="form-control" type="number" min="0" v-model="element.min"
                      @input="decideWarningLimit(element, true, false)">
                  </td>
                  <td>
                    <input class="form-control" type="number" min="0" v-model="element.max"
                      @input="decideWarningLimit(element, false, true)">
                  </td>
                  <td>
                    <input class="form-control" type="number" min="0" v-model="element.warningLimit"
                      @input="decideWarningLimit(element, true, true)">
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
    <CommonFooterActionComponent :submit-title="title" :has-loaded-data="hasLoadedData" @on-close="closeModal"
      @on-submit="submit" @on-delete="remove" />
  </CModal>
  <ModalConfirm title="Delete?" @confirm="onConfirmDelete" />
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
import { performHttpRequest } from "@/utils/RequestUtils";
import { mapActions, mapGetters } from "vuex";
import commonUtils from "@/utils/CommonUtils";

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
      loadedLine: null,
      loadedVendor: null,
      loadedIncharge: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.getLine();
        this.getVendor();
        this.getInCharge();
        this.getElements();
      }, 300);
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
        if (this.hasLoadedData) {
          console.log('loaded data', this.loadedData);
          this.loadedVendor = this.loadedData.vendorId;
          this.loadedLine = this.loadedData.lineId;
          this.loadedIncharge = this.loadedData.inCharge;
          this.selectedElements = [this.loadedData.elementId];
          this.elementData = [
            {
              elementId: this.loadedData?.elementId,
              elementName: this.loadedData?.element,
              vendorId: this.loadedData?.vendorId,
              vendorName: this.loadedData?.vendor,
              lineId: this.loadedData?.lineId,
              lineName: this.loadedData?.line,
              inCharge: this.loadedData?.inCharge,
              min: this.loadedData?.min,
              max: this.loadedData?.max,
              warningLimit: this.loadedData?.warningLimit,
              minWarning: this.loadedData?.min * (this.loadedData?.warningLimit / 100),
              maxWarning: this.loadedData?.max * (this.loadedData?.warningLimit / 100),
            }
          ];
          console.log('element data', this.loadedData);
          //this.elementData = this.GET_INGOT_SELECT.filter(el => this.selectedElements?.includes(el.id));
        } else {
          this.selectedVendor = null;
          this.selectedLine = null;
          this.selectedInCharge = null;
          this.selectedElements = null;
          this.elementData = [];
        }
      }
    },
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
        elementId: data.id,
        elementName: data.label,
        vendorId: this.selectedVendor?.id,
        vendorName: this.selectedVendor?.label,
        lineId: this.selectedLine?.id,
        lineName: this.selectedLine?.label,
        inCharge: this.selectedInCharge?.id,
        min: 0,
        max: 0,
        warningLimit: 0,
        minWarning: 0,
        maxWarning: 0,
      };

      const copyElement = [...(this.elementData ?? [])];
      const existingIndex = copyElement.findIndex((element) => (element.elementName === newElement.elementName));
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
      const existingIndex = copyElement.findIndex((element) => (element.elementId === data.id));
      if (existingIndex > -1) {
        copyElement.splice(existingIndex, 1);
      }

      this.elementData = copyElement;
    },
    decideWarningLimit(element, isMin, isMax) {
      return commonUtils.decideElementStandardWarningLimit(
        this.elementData,
        element,
        isMin,
        isMax
      );
    },
    submit() {
      performHttpRequest(async () => {
        this.isLoading = true;
        const payload = {
          id: this.loadedData?.id,
          ...this.elementData[0]
        };

        if (this.hasLoadedData) {
          await this.ACTION_EDIT_STANDARD_INGOT(payload)
        } else {
          await this.ACTION_ADD_STANDARD_INGOT(payload)
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
      if (!this.hasLoadedData) {
        return;
      }
      performHttpRequest(async () => {
        this.isLoading = true;
        await this.ACTION_REMOVE_STANDARD_INGOT(this.loadedData.id)
        this.isLoading = false;
        this.closeModal()
      });
    },
  }
}
</script>
