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
      <CButton v-if="hasLoadedData" color="secondary" @click="remove">
        Delete
      </CButton>
      <CButton color="success" @click="submit">
        {{ title }}
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import Treeselect from "@zanmato/vue3-treeselect";
import {
  ACTION_LINE,
  GET_LINE_SELECT
} from '@/store/modules/LINE.module'
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "ModalFormMstGaugeComponent",
  components: {
    Treeselect
  },
  props: {
    loadedData: Object,
    visible: Boolean
  },
  data() {
    return {
      isLoading: false,
      form: {
        id: '',
        line_id: '',
        name: '',
        code: '',
        description: ''
      },
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters([GET_LINE_SELECT]),
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
    loadedData(newValue, oldValue) {
      if(oldValue !== newValue) {
        this.form = {
          ...newValue
        }
      }
    }
  },
  methods: {
    ...mapActions([ACTION_LINE]),
    submit() {
      this.isLoading = true;
      if (this.hasLoadedData) {
        this.edit();
      } else {
        this.save();
      }
      this.isLoading = false;
    },
    save() {

    },
    edit() {

    },
    remove() {

    },
    closeModal() {
      if (!this.isLoading) {
        this.$emit('on-close', true)
      }
    }
  }
}
</script>
