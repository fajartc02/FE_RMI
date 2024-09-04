<template>
  <CModal class="w-100" scrollable size="md" :visible="visible" backdrop="static" @close="closeModal">
    <CommonModalHeaderComponent :title="title"/>
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
import {performHttpRequest} from "@/utils/RequestUtils";
import {mapActions} from "vuex";

const defaultArgs = {
  id: '',
  type: '',
  value: '',
  description: ''
};

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
      form: defaultArgs,
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
    visible(newValue) {
      if (newValue) {
        if (this.hasLoadedData) {
          this.form = {
            ...this.loadedData
          };
        } else {
          this.form = {
            ...defaultArgs
          };
        }
      }
    }
  },
  methods: {
    ...mapActions([ACTION_ADD_SYSTEM, ACTION_EDIT_SYSTEM, ACTION_REMOVE_SYSTEM]),
    submit() {
      performHttpRequest(async () => {
        this.isLoading = true;
        if (this.hasLoadedData) {
          await this.ACTION_EDIT_SYSTEM(this.form);
        } else {
          await this.ACTION_ADD_SYSTEM(this.form);
        }
        this.isLoading = false;
        this.closeModal();
      });
    },
    remove() {
      performHttpRequest(async () => {
        this.isLoading = true;
        await this.ACTION_REMOVE_SYSTEM(this.form);
        this.isLoading = false;
        this.closeModal();
      });
    },
    closeModal() {
      this.$emit('on-close', true)
    }
  }
}
</script>
