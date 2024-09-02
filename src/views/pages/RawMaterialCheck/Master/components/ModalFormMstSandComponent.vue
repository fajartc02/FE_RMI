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
          v-model="form.elementIndex"
          type="text"
          label="Element Index"
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
  ACTION_ADD_SAND,
  ACTION_EDIT_SAND,
  ACTION_REMOVE_SAND
} from '@/store/modules/SAND.module'
import {performHttpRequest} from "@/utils/RequestUtils";
import {mapActions} from "vuex";

const defaultArgs = {
  id: '',
  name: '',
  code: '',
  description: '',
  unit: '',
  elementIndex: ''
};

export default {
  name: "ModalFormMstSandComponent",
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
        return "Edit Sand";
      }

      return "Add Sand";
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
      }
    },
  },
  methods: {
    ...mapActions({
      ACTION_ADD_SAND,
      ACTION_EDIT_SAND,
      ACTION_REMOVE_SAND
    }),
    submit() {
      performHttpRequest(async () => {
        this.isLoading = true;
        if (this.hasLoadedData) {
          await this.ACTION_EDIT_SAND(this.form)
        } else {
          await this.ACTION_ADD_SAND(this.form)
        }

        this.isLoading = false;
        this.closeModal()
      })
    },
    remove() {
      performHttpRequest(async () => {
        this.isLoading = true;
        await this.ACTION_REMOVE_SAND(this.form)
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

