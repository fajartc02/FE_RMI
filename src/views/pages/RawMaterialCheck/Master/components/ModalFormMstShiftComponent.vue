<template>
  <CModal class="w-100" scrollable size="md" :visible="visible" backdrop="static" @close="closeModal">
    <CommonModalHeaderComponent :title="title" />
    <CommonMstFormComponent
      :name="form.name"
      :code="form.code"
      :description="form.description"
      :form="form"
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
import {
  ACTION_ADD_SHIFT,
  ACTION_EDIT_SHIFT,
  ACTION_REMOVE_SHIFT
} from '@/store/modules/SHIFT.module'
import CommonMstFormComponent from "@/views/pages/RawMaterialCheck/Master/components/CommonModalBodyFormComponent.vue";
import CommonFooterActionComponent
  from "@/views/pages/RawMaterialCheck/Master/components/CommonModalFooterActionComponent.vue";
import CommonModalHeaderComponent
  from "@/views/pages/RawMaterialCheck/Master/components/CommonModalHeaderComponent.vue";

export default {
  name: "ModalFormMstShiftComponent",
  components: {CommonModalHeaderComponent, CommonFooterActionComponent, CommonMstFormComponent},
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
        description: ''
      },
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
    loadedData(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.form = {
          ...newValue
        }
      }
    },
    form:{
      deep: true,
      handler(newValue, oldValue) {
        console.log('formvalue', newValue)
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
