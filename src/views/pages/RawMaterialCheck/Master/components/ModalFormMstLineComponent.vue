<template>
  <CModal class="w-100" scrollable size="md" :visible="visible" backdrop="static" @close="closeModal">
    <CModalHeader>
      <CModalTitle>{{ title }}</CModalTitle>
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
      <CButton color="secondary" @click="closeModal()">
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
import {mapActions} from "vuex";
import {performHttpRequest} from "@/utils/RequestUtils";

const defaultArgs = {
  id: '',
  name: '',
  code: '',
  description: ''
}

export default {
  name: "ModalFormMstLineComponent",
  props: {
    lineData: Object,
    visible: Boolean
  },
  data() {
    return {
      isLoading: false,
      form: defaultArgs,
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
    visible(newValue) {
      if (newValue) {
        if (this.lineData) {
          this.form = {
            ...this.lineData
          }
        } else {
          this.form = {
            ...defaultArgs
          }
        }
      }
    },
  },
  methods: {
    ...
      mapActions([ACTION_ADD_LINE, ACTION_EDIT_LINE, ACTION_REMOVE_LINE]),
    submit() {
      performHttpRequest(async () => {
        this.isLoading = true;
        if (this.hasLoadedLine) {
          await this.ACTION_EDIT_LINE(this.form)
        } else {
          await this.ACTION_ADD_LINE(this.form);
        }
        this.isLoading = false;
        this.closeModal()
      })
    }
    ,
    remove() {
      performHttpRequest(async () => {
        this.isLoading = true;
        await this.ACTION_REMOVE_LINE(this.lineData);
        this.closeModal();
        this.isLoading = false;
      })
    }
    ,
    closeModal() {
      this.$emit('on-close', true)
    }
  }
}
</script>
