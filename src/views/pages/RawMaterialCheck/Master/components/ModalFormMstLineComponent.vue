<template>
  <CModal class="w-100" scrollable size="md" :visible="visible" backdrop="static" @close="closeModal">
    <CModalHeader>
      <CModalTitle>{{title}}</CModalTitle>
    </CModalHeader>
    <CModalBody>
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
      <CButton v-if="hasLoadedLine" color="secondary" @click="remove">
        Delete
      </CButton>
      <CButton color="success" @click="submit">
        {{ title }}
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import {
  ACTION_LINE,
  GET_LINE,
  ACTION_ADD_LINE,
  ACTION_EDIT_LINE,
  ACTION_REMOVE_LINE
} from '@/store/modules/LINE.module'
export default {
  name: "ModalFormMstLineComponent",
  props: {
    lineData: Object,
    visible: Boolean
  },
  data() {
    return {
      isLoading: false,
      form: {
        id: '',
        name: '',
        code: '',
        description: ''
      },
    }
  },
  computed: {
    title() {
      if (this.hasLoadedLine) {
        return "Edit Line";
      }

      return "Add line";
    },
    hasLoadedLine() {
      return this.lineData && this.lineData.id;
    }
  },
  watch: {
    lineData(newValue, oldValue) {
      if(oldValue !== newValue) {
        this.form = {
          ...newValue
        }
      }
    }
  },
  methods: {
    submit() {
      this.isLoading = true;
      if (this.hasLoadedLine) {
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
    remove(){

    },
    closeModal() {
      if (!this.isLoading) {
        this.$emit('on-close', true)
      }
    }
  }
}
</script>
