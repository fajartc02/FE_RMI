<template>
  <CModal class="w-100" scrollable size="md" :visible="visible" backdrop="static" @close="closeModal">
    <CommonModalHeaderComponent :title="title"/>
    <CModalBody>
      <CFormInput
        v-model="form.firstName"
        type="text"
        label="Firstname"
        class="mb-3"
      />
      <CFormInput
        v-model="form.lastName"
        type="text"
        label="Lastname"
        class="mb-3"
      />
      <CFormInput
        v-model="form.email"
        type="email"
        label="Email"
        class="mb-3"
      />
      <CFormInput
        v-model="form.password"
        type="password"
        label="Password"
        class="mb-3"
      />
      <CFormInput
        v-model="form.confirmationPassword"
        type="password"
        label="Confirmation Password"
        class="mb-3"
      />
      <div class="d-flex flex-column">
        <label class="form-label mb-2">
          Status
        </label>
        <div class="d-flex gap-2">
          <CFormCheck
            :button="{ color: 'success', variant: 'outline' }"
            type="radio"
            name="options-outlined"
            id="success-outlined"
            autocomplete="off"
            label="Active"
            value="true"
            :model-value="form.isActive"
          />
          <CFormCheck
            :button="{ color: 'danger', variant: 'outline' }"
            type="radio"
            name="options-outlined"
            id="danger-outlined"
            autocomplete="off"
            label="In-Active"
            value="false"
            :model-value="!form.isActive"
          />
        </div>
      </div>
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
  ACTION_ADD_USER,
  ACTION_EDIT_USER,
  ACTION_REMOVE_USER
} from '@/store/modules/USER.module'
import CommonFooterActionComponent
  from "@/views/pages/RawMaterialCheck/Master/components/CommonModalFooterActionComponent.vue";
import CommonModalHeaderComponent
  from "@/views/pages/RawMaterialCheck/Master/components/CommonModalHeaderComponent.vue";
import {performHttpRequest} from "@/utils/RequestUtils";
import {mapActions} from "vuex";

const defaultArgs = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmationPassword: '',
  isActive: false,
};

export default {
  name: "ModalFormMstUserComponent",
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
        return "Edit User";
      }

      return "Add User";
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
            ...this.loadedData,
            password: ''
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
    ...mapActions([ACTION_ADD_USER, ACTION_EDIT_USER, ACTION_REMOVE_USER]),
    submit() {
      performHttpRequest(async () => {
        this.isLoading = true;
        if (this.hasLoadedData) {
          await this.ACTION_EDIT_USER(this.form);
        } else {
          await this.ACTION_ADD_USER(this.form);
        }
        this.isLoading = false;
        this.closeModal();
      });
    },
    remove() {
      performHttpRequest(async () => {
        this.isLoading = true;
        await this.ACTION_REMOVE_USER(this.form);
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
