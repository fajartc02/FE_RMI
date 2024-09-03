<template>
  <CModal class="w-100" scrollable size="md" :visible="visible" backdrop="static" @close="closeModal">
    <CommonModalHeaderComponent :title="title"/>
    <CommonMstFormComponent
      v-model:name="form.name"
      v-model:code="form.code"
      v-model:description="form.description"
    />
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
  ACTION_ADD_SHIFT,
  ACTION_EDIT_SHIFT,
  ACTION_REMOVE_SHIFT
} from '@/store/modules/SHIFT.module'
import {performHttpRequest} from "@/utils/RequestUtils";
import {mapActions} from "vuex";

const defaultArgs = {
  id: '',
  name: '',
  code: '',
  description: ''
};

export default {
  name: "ModalFormMstShiftComponent",
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
        return "Edit Shift";
      }

      return "Add Shift";
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
      ACTION_ADD_SHIFT,
      ACTION_EDIT_SHIFT,
      ACTION_REMOVE_SHIFT
    }),
    submit() {
      performHttpRequest(async () => {
        this.isLoading = true;
        if (this.hasLoadedData) {
          await this.ACTION_EDIT_SHIFT(this.form)
        } else {
          await this.ACTION_ADD_SHIFT(this.form)
        }

        this.isLoading = false;
        this.closeModal()
      })
    },
    remove() {
      performHttpRequest(async () => {
        this.isLoading = true;
        await this.ACTION_REMOVE_SHIFT(this.form)
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
