<template>
  <CModal class="w-100" scrollable size="md" :visible="visible" backdrop="static" @close="closeModal">
    <CModalHeader>
      <CModalTitle>{{ title }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="mb-3">
        <label class="form-label">Line</label>
        <Treeselect v-model="form.line_id" :options="GET_LINE_SELECT" :clearable="true"/>
      </div>
      <div class="mb-3">
        <label class="form-label">Material Type</label>
        <Treeselect key="material" v-model="form.materialType" :options="GET_SYSTEM_TREESELECT" :clearable="true"/>
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
      <CButton v-if="hasLoadedMesin" color="primary" @click="remove">
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
import {
  ACTION_LINE,
  GET_LINE_SELECT
} from '@/store/modules/LINE.module'
import {
  ACTION_ADD_MACHINE,
  ACTION_EDIT_MACHINE,
  ACTION_REMOVE_MACHINE
} from "@/store/modules/MACHINE.module";
import {
  ACTION_SYSTEM,
  GET_SYSTEM_SELECT
} from "@/store/modules/SYSTEM.module";
import {mapActions, mapGetters} from 'vuex';
import {performHttpRequest} from "@/utils/RequestUtils";
import Treeselect from "@zanmato/vue3-treeselect";
import ModalConfirm from "@/components/RawMaterialInspection/ModalConfirm.vue";

const defaultArgs = {
  id: '',
  lineId: '',
  name: '',
  code: '',
  description: '',
  materialType: ''
};

export default {
  name: "ModalFormMstMesinComponent",
  components: {
    ModalConfirm,
    Treeselect
  },
  props: {
    mesinData: Object,
    visible: Boolean
  },
  data() {
    return {
      isLoading: false,
      form: defaultArgs,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.ACTION_SYSTEM({
        type: 'material'
      });
    });
  },
  computed: {
    ...mapGetters([GET_LINE_SELECT, GET_SYSTEM_SELECT]),
    title() {
      if (this.hasLoadedMesin) {
        return "Edit Mesin";
      }

      return "Add Mesin";
    },
    hasLoadedMesin() {
      return this.mesinData && this.mesinData.id;
    },
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        if (this.mesinData) {
          this.form = {
            ...this.mesinData
          };
        } else {
          this.form = {
            ...defaultArgs
          };
        }
      }
    },
    GET_SYSTEM_TREESELECT(newValue) {
      console.log('new value', newValue)
    }
  },
  methods: {
    ...mapActions([
      ACTION_LINE,
      ACTION_ADD_MACHINE,
      ACTION_EDIT_MACHINE,
      ACTION_REMOVE_MACHINE,
      ACTION_SYSTEM
    ]),
    submit() {
      performHttpRequest(async () => {
        this.isLoading = true;
        if (this.hasLoadedMesin) {
          await this.ACTION_EDIT_MACHINE(this.form);
        } else {
          await this.ACTION_ADD_MACHINE(this.form);
        }
        this.isLoading = false;
        this.closeModal()
      });
    },
    remove() {
      this.$store.dispatch('MODALS/open', 'DialogKonfirmasi')
    },
    closeModal() {
      this.$emit('on-close', true)
    },
    onConfirmDelete() {
      performHttpRequest(async () => {
        this.isLoading = true;
        await this.ACTION_REMOVE_MACHINE(this.form);
        this.isLoading = false;
        this.closeModal()
      });
    }
  }
}
</script>
