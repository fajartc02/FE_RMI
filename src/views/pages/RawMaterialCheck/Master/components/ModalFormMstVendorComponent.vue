<template>
  <CModal class="w-100" scrollable size="md" :visible="visible" backdrop="static" @close="closeModal">
    <CommonModalHeaderComponent :title="title"/>
    <CommonMstFormComponent
      :name="form.name"
      :code="form.code"
      :description="form.description"
    >
      <template #default>
        <CFormInput
          v-model="form.phone"
          type="text"
          label="Phone"
          class="mb-3"
        />
        <CFormInput
          v-model="form.address"
          type="text"
          label="Address"
          class="mb-3"
        />
      </template>
    </CommonMstFormComponent>
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
  ACTION_ADD_VENDOR,
  ACTION_EDIT_VENDOR,
  ACTION_REMOVE_VENDOR
} from '@/store/modules/VENDOR.module'
import CommonFooterActionComponent
  from "@/views/pages/RawMaterialCheck/Master/components/CommonModalFooterActionComponent.vue";
import CommonModalHeaderComponent
  from "@/views/pages/RawMaterialCheck/Master/components/CommonModalHeaderComponent.vue";
import CommonMstFormComponent from "@/views/pages/RawMaterialCheck/Master/components/CommonModalBodyFormComponent.vue";

export default {
  name: "ModalFormMstVendorComponent",
  components: {
    CommonMstFormComponent,
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
        name: '',
        code: '',
        description: '',
        phone: '',
        address: ''
      },
    }
  },
  computed: {
    title() {
      if (this.hasLoadedData) {
        return "Edit Vendor";
      }

      return "Add Vendor";
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
