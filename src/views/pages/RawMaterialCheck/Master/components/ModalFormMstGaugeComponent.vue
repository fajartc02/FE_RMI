<template>
  <CModal class="w-100" scrollable size="md" :visible="visible" backdrop="static" @close="closeModal">
    <CModalHeader>
      <CModalTitle>{{ title }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="mb-3">
        <label class="form-label">Line</label>
        <Treeselect v-model="form.lineId" :options="lines" :clearable="true"/>
      </div>
      <CFormInput
        v-model="form.name"
        type="text"
        label="Name"
        class="mb-3"
      />
      <CFormInput
        v-model="form.code"
        type="text"
        label="Code"
        class="mb-3"
      />
      <CFormInput
        v-model="form.description"
        type="text"
        label="Description"
        class="mb-3"
      />
    </CModalBody>
    <CModalFooter class="d-flex justify-content-center align-items-center">
      <CButton color="secondary" @click="closeModal">
        Close
      </CButton>
      <CButton v-if="hasLoadedData" color="primary" @click="remove">
        Delete
      </CButton>
      <CButton color="success" @click="submit">
        {{ title }}
      </CButton>
    </CModalFooter>
  </CModal>
  <ModalConfirm
    title="Delete?"
    @confirm="onConfirmDelete"/>
</template>

<script>
import Treeselect from "@zanmato/vue3-treeselect";
import {
  GET_LINE_SELECT
} from '@/store/modules/LINE.module'
import {
  ACTION_ADD_GAUGE,
  ACTION_EDIT_GAUGE,
  ACTION_REMOVE_GAUGE
} from "@/store/modules/GAUGE.module";
import {mapActions, mapGetters} from 'vuex';
import {performHttpRequest} from "@/utils/RequestUtils";
import ModalConfirm from "@/components/RawMaterialInspection/ModalConfirm.vue";

const defaultArgs = {
  id: '',
  lineId: '',
  name: '',
  code: '',
  description: ''
};

export default {
  name: "ModalFormMstGaugeComponent",
  components: {
    ModalConfirm,
    Treeselect
  },
  props: {
    loadedData: Object,
    visible: Boolean
  },
  data() {
    return {
      isLoading: false,
      form: defaultArgs,
    }
  },
  computed: {
    ...mapGetters([GET_LINE_SELECT]),
    lines(){
      return this.GET_LINE_SELECT
    },
    title() {
      if (this.hasLoadedData) {
        return "Edit Gauge";
      }

      return "Add Gauge";
    },
    hasLoadedData() {
      return this.loadedData && this.loadedData.id;
    }
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        if (this.hasLoadedData) {
          this.form = {
            ...this.loadedData
          }
        } else {
          this.form = {
            ...defaultArgs
          }
        }
      }
    }
  },
  methods: {
    ...mapActions([ACTION_ADD_GAUGE, ACTION_EDIT_GAUGE, ACTION_REMOVE_GAUGE]),
    submit() {
      performHttpRequest(async () => {
        this.isLoading = true;
        if (this.hasLoadedData) {
          await this[ACTION_EDIT_GAUGE](this.form);
        } else {
          await this[ACTION_ADD_GAUGE](this.form);
        }
        this.isLoading = false;
        this.closeModal();
      });
    },
    remove() {
      this.$store.dispatch('MODALS/open', 'DialogKonfirmasi')
    },
    closeModal() {
      this.$emit('on-close', true)
    },
    onConfirmDelete(){
      performHttpRequest(async () => {
        this.isLoading = true;
        await this.ACTION_REMOVE_GAUGE(this.form);
        this.isLoading = false;
        this.closeModal()
      })
    }
  }
}
</script>
