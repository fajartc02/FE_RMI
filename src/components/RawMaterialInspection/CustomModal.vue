<template>
  <div>
    <transition
      name="fade"
      appear>
      <div
        v-if="isOpen"
        class="modal-overlay"
        @click.self="handleOverlay()"></div>
    </transition>
    <transition
      name="nested"
      appear>
      <div
        v-if="isOpen"
        class="modal-content"
        :class="classContent"
        role="dialog"
        :style="`max-width: ${calculateMaxWidth}; min-width: ${calculateMinWidth}`">
        <div
          v-if="showCloseIcon"
          class="close-icon"
          @click="close()">
          <b-icon
            icon="x"
            font-scale="2n"></b-icon>
        </div>
        <slot :close="close"></slot>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'CustomModal',
  props: {
    name: {
      type: String,
      required: true
    },
    maxWidth: {
      type: [Number, String],
      default: 40
    },
    minWidth: {
      type: [Number, String],
      default: 30
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    showCloseIcon: {
      type: Boolean,
      default: true
    },
    classContent: {
      type: String,
      default: ''
    },
    isFullHeight: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    isActive() {
      return this.$store.getters['MODALS/active'] === this.name
    },
    isOpen() {
      return this.$store.getters['MODALS/allOpen'].includes(this.name)
    },
    maxWidthCalc() {
      if (this.maxWidth < this.minWidth) {
        return this.minWidth
      }

      return this.maxWidth
    },
    calculateMaxWidth() {
      if (typeof this.maxWidth === 'string') {
        return this.maxWidth
      }

      return `${this.maxWidthCalc}rem`
    },
    calculateMinWidth() {
      if (typeof this.minWidth === 'string') {
        return this.minWidth
      }

      return `${this.minWidth}rem`
    }
  },
  methods: {
    close() {
      this.$store.dispatch('MODALS/close', this.name)
    },
    handleOverlay() {
      if (this.dismissible) {
        this.close()
      }
    }
  },
  beforeUnmount() {
    if (this.isOpen) this.close()
  }
}
</script>
<style scoped>
.close-icon {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px 15px;
  cursor: pointer;
}

.modal-overlay {
  content: '';
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background: #2c3e50;
  opacity: 0.6;
  cursor: pointer;
}

.modal-content {
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  width: fit-content;
  height: fit-content;
  padding: 2rem;
  border-radius: 1rem;
  /*box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);*/
  background: transparent;
  z-index: 9999;
  transform: none;
}

/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition:
    transform 0.4s cubic-bezier(0.5, 0, 0.5, 1),
    opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}

.nested-enter-active, .nested-leave-active {
  transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}
/* delay enter of nested element */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  /*
  	Hack around a Chrome 96 bug in handling nested opacity transitions.
    This is not needed in other browsers or Chrome 99+ where the bug
    has been fixed.
  */
  opacity: 0.001;
}
</style>
