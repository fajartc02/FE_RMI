<template>
  <CModal class="w-100" scrollable size="md" :visible="visible" backdrop="static" @close="closeModal">
    <CommonModalHeaderComponent :title="title"/>
    <CommonMstFormComponent
      v-model:name="form.name"
      v-model:code="form.code"
      v-model:description="form.description"
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
  <ModalConfirm
    title="Delete?"
    @confirm="onConfirmDelete"/>
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
import {mapActions} from "vuex";
import {performHttpRequest} from "@/utils/RequestUtils";
import ModalConfirm from "@/components/RawMaterialInspection/ModalConfirm.vue";

const defaultArgs = {
  id: '',
  name: '',
  code: '',
  description: '',
  phone: '',
  address: ''
};

export default {
  name: "ModalFormMstVendorComponent",
  components: {
    ModalConfirm,
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
      form: defaultArgs,
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
    ...mapActions([ACTION_ADD_VENDOR, ACTION_EDIT_VENDOR, ACTION_REMOVE_VENDOR]),
    submit() {
      performHttpRequest(async () => {
        this.isLoading = true;
        if (this.hasLoadedData) {
          await this.ACTION_EDIT_VENDOR(this.form)
        } else {
          await this.ACTION_ADD_VENDOR(this.form)
        }
        this.isLoading = false;
        this.closeModal();
      });
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
        await this.ACTION_REMOVE_VENDOR(this.form)
        this.isLoading = false;
        this.closeModal();
      });
    }
  }
}
</script>
