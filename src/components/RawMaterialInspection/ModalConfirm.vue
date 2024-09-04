<template>
  <custom-modal
    :name="'DialogKonfirmasi' + dialogSuffix"
    :dismissible="false"
    min-width="200px"
    :max-width="calculateMaxWidth"
    :show-close-icon="false"
    classContent="p-0 br-10px bg-white">
    <div class="toolbar">
      <h4 class="text-white">{{ title }}</h4>
    </div>
    <div class="d-flex flex-column p-5">
      <div class="p-3">
        <h4 class="text-center">{{ message }}</h4>
      </div>
    </div>
    <div class="dialog-footer">
      <div class="d-flex justify-content-between p-3 br-0 gap-3">
        <button
          class="btn btn-secondary w-100"
          @click="close">
          {{ btnBackText }}
        </button>
        <button
          class="btn btn-primary w-100"
          @click="submit">
          {{ btnSubmitText }}
        </button>
      </div>
    </div>
  </custom-modal>
</template>
<script>
import CustomModal from "@/components/RawMaterialInspection/CustomModal.vue";

export default {
  name: 'ModalConfirm',
  props: {
    dialogSuffix: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'Confirmation'
    },
    btnSubmitText: {
      type: String,
      default: 'Confirm'
    },
    btnBackText: {
      type: String,
      default: 'Cancel'
    },
    message: {
      type: String,
      default: "Are you sure?"
    }
  },
  components: {
    CustomModal
  },
  data() {
    return {
      screenWidth: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.screenWidth = window.screen.width
    })
  },
  computed: {
    calculateMaxWidth() {
      if (this.screenWidth >= 500) {
        return '400px'
      }
      return `${this.screenWidth - 75}px`
    }
  },
  methods: {
    submit() {
      this.$emit('confirm', true)
      this.close()
    },
    close() {
      this.$store.dispatch('MODALS/close', 'DialogKonfirmasi' + this.dialogSuffix)
    }
  }
}
</script>

<style>
.toolbar {
  position: sticky !important;
  top: 0;
  /* padding-left: 16px !important; */
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
  background-color: #EB0A1E !important;
  color: #fff;
  padding: 20px 0 10px 0;
  z-index: 9999;
  height: 4rem;
  /* header mb-3 card shadow-card rounded-0 bg-primary text-white */
}

.toolbar>h4 {
  font-size: 20px !important;
  font-weight: 500 !important;
}

.toolbar>svg {
  position: absolute;
  font-weight: 800;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
</style>
