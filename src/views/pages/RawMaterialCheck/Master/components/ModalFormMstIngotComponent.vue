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
          v-model="form.unit"
          type="text"
          label="Unit"
          class="mb-3"
        />
        <CFormInput
          v-model="form.atomicNumber"
          type="text"
          label="Atomic Number"
          class="mb-3"
          @keypress="$event.key.match(/^[\d]$/) ? '' : $event.preventDefault()"
        />
        <CFormInput
          v-model="form.budomari"
          type="text"
          label="Budomary Number"
          class="mb-3"
          @keypress="$event.key.match(/^[\d]$/) ? '' : $event.preventDefault()"
        />
        <CFormInput
          v-model="form.weightMolten"
          type="text"
          label="Weight Molten"
          class="mb-3"
          @keypress="$event.key.match(/^[\d]$/) ? '' : $event.preventDefault()"
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
import CommonMstFormComponent from "@/views/pages/RawMaterialCheck/Master/components/CommonModalBodyFormComponent.vue";
import CommonFooterActionComponent
  from "@/views/pages/RawMaterialCheck/Master/components/CommonModalFooterActionComponent.vue";
import CommonModalHeaderComponent
  from "@/views/pages/RawMaterialCheck/Master/components/CommonModalHeaderComponent.vue";
import {
  ACTION_ADD_INGOT,
  ACTION_EDIT_INGOT,
  ACTION_REMOVE_INGOT
} from "@/store/modules/INGOT.module";
import {performHttpRequest} from "@/utils/RequestUtils";
import {mapActions} from "vuex";

const defaultArgs = {
  id: '',
  name: '',
  code: '',
  description: '',
  unit: '',
  atomicNumber: '',
  budomari: '',
  weightMolten: '',
};

export default {
  name: "ModalFormMstIngotComponent",
  components: {
    CommonModalHeaderComponent,
    CommonFooterActionComponent,
    CommonMstFormComponent
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
        return "Edit Ingot";
      }

      return "Add Ingot";
    },
    hasLoadedData() {
      return this.loadedData && this.loadedData.id;
    },
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

        console.log('form', this.form)
      }
    },
  },
  methods: {
    ...mapActions({
      ACTION_ADD_INGOT,
      ACTION_EDIT_INGOT,
      ACTION_REMOVE_INGOT
    }),
    submit() {
      performHttpRequest(async () => {
        this.isLoading = true;
        if (this.hasLoadedData) {
          await this.ACTION_EDIT_INGOT(this.form)
        } else {
          await this.ACTION_ADD_INGOT(this.form)
        }

        this.isLoading = false;
        this.closeModal()
      })
    },
    remove() {
      performHttpRequest(async () => {
        this.isLoading = true;
        await this.ACTION_REMOVE_INGOT(this.form)
        this.isLoading = false;
        this.closeModal()
      })
    },
    closeModal() {
      this.$emit('on-close', true)
    }
  }
}
</script>

