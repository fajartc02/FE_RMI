<template>
  <CModal class="w-100" scrollable size="md" :visible="visible" backdrop="static" @close="closeModal">
    <CommonModalHeaderComponent :title="title" />
    <CModalBody>
      <CFormInput
        v-model="form.type"
        type="text"
        label="Name"
        class="mb-3"
      />
      <CFormInput
        v-model="form.value"
        type="text"
        label="Value"
        class="mb-3"
      />
      <CFormInput
       v-model="form.code"
        type="text"
        label="Code"
        class="mb-3"
        disabled
      />
      <CFormInput
        v-model="form.description"
        type="text"
        label="Description"
        class="mb-3"
      />
    </CModalBody>
    <CommonFooterActionComponent
      :submit-title="title"
      :has-loaded-data="hasLoadedData"
      @on-close="closeModal"
      @on-submit="submit"
      @on-delete="remove"
    />
  </CModal>
</template>

<script>
import {
  ACTION_ADD_SYSTEM,
  ACTION_EDIT_SYSTEM,
  ACTION_REMOVE_SYSTEM
} from '@/store/modules/SYSTEM.module'
import CommonFooterActionComponent
  from "@/views/pages/RawMaterialCheck/Master/components/CommonModalFooterActionComponent.vue";
import CommonModalHeaderComponent
  from "@/views/pages/RawMaterialCheck/Master/components/CommonModalHeaderComponent.vue";

export default {
  name: "ModalFormMstSystemComponent",
  components: {
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
      form: {
        id: '',
        type: '',
        value: '',
        code: '',
        description: ''
      },
    }
  },
  computed: {
    title() {
      if (this.hasLoadedData) {
        return "Edit System";
      }

      return "Add System";
    },
    hasLoadedData() {
      return this.loadedData && this.loadedData.id;
    }
  },
  watch: {
    loadedData(newValue, oldValue) {
      if (oldValue !== newValue) {
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
