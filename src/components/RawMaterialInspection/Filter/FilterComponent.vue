<template>
  <div class="card p-2" style="z-index: 1">
    <CRow class="align-items-start">
      <CCol class="mt-1" v-for="(field, i) in fieldsInput" :key="i" :md="field.size ? field.size : 3" sm="12">
        <template v-if="field.type !== 'option' && field.type !== 'treeselect' && field.type !== 'textarea'">
          <template v-if="field.type === 'date'">
            <CFormInput v-model="field.value" :type="field.type" :label="field.title" :placeholder="field.placeholder"
              :max="currentDate" :disabled="field.disabled" />
          </template>
          <template v-else>
            <CFormInput v-model="field.value" :type="field.type" :label="field.title" :placeholder="field.placeholder"
              :disabled="field.disabled" />
          </template>

        </template>
        <template v-else>
          <CFormTextarea v-if="field.type === 'textarea'" v-model="field.value" :label="field.title"
            :placeholder="field.placeholder" :disabled="field.disabled">
          </CFormTextarea>
          <CFormSelect v-model="field.value" v-else-if="field.type === 'option'" :label="field.title"
            :disabled="field.disabled">
            <option v-for="option in field.options" :key="option" :value="option.id">{{ option.label }}</option>
          </CFormSelect>
          <div v-else-if="field.type === 'treeselect'">
            <label class="form-label">{{ field.title }}</label>
            <Treeselect v-model="field.value" :options="field.options" :clearable="true" :disabled="field.disabled" />
          </div>
        </template>
      </CCol>
    </CRow>
  </div>
</template>
<script>

import FN_CASE_CONVERTER from '@/functions/FN_CASE_CONVERTER';
import { ACTION_LOADING } from '@/store/modules/LOADING.module';
import { GET_META } from '@/store/modules/META.module';
import Treeselect from '@zanmato/vue3-treeselect'
import "@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css";
import moment from 'moment-timezone';
import { mapGetters } from 'vuex';

export default {
  name: 'FilterComponent',
  data() {
    return {
      form: {},
      currentDate: moment().format('YYYY-MM-DD'),
      timeOutDelayFetch: null
    }
  },
  computed: {
    ...mapGetters([GET_META])
  },
  watch: {
    fieldsInput: {
      deep: true,
      handler: function (oldValue, newValue) {
        // if (oldValue != newValue) {
        // if (this.fieldsInput.length > 0) {
        this.form = {
          take: 20,
          page: 1
        }
        clearTimeout(this.timeOutDelayFetch);
        for (let i = 0; i < this.fieldsInput.length; i++) {
          const input = this.fieldsInput[i]
          const isValidDate = moment(input.value, 'YYYY-MM-DD', true).isValid();
          let label = input.title === input.id
          let key = FN_CASE_CONVERTER.titleToCamelCase(input.title)

          if (isValidDate) {
            if (key === 'startDate') {
              this.form[label ? key : input.id] = moment(input.value).hour(0).minute(0).second(0).add(7, 'hours').unix()
            } else {
              this.form[label ? key : input.id] = moment(input.value).hour(23).minute(59).second(59).unix()
            }
          } else {
            if (input.value != 'NONE' && input.value)
              this.form[label ? key : input.id] = input.value
          }
        }
        this.form = {
          ...this.form,
          take: this.GET_META.take,
          page: this.GET_META.page,
        }
        if (this.isDisabledPagination) {
          delete this.form.page
          delete this.form.take
        }

        // }
        if (!this.timeOutDelayFetch) {
          this.$emit('emit-filter', this.form)
        } else {
          this.$store.dispatch(ACTION_LOADING, true)
          console.log('CHANGES FIELDS INPUT!');
          this.timeOutDelayFetch = setTimeout(() => {
            this.$emit('emit-filter', this.form)
            this.$store.dispatch(ACTION_LOADING, false)
          }, 2000)
        }

        // } else {
        //   this.$emit('emit-filter', this.form)
        // }

      }
    },
    'GET_META.page': function (oldValue, newValue) {
      if (oldValue !== newValue) {
        this.form = {
          ...this.form,
          take: this.GET_META.take,
          page: this.GET_META.page,
        }
        if (this.isDisabledPagination) {
          delete this.form.page
          delete this.form.take
        }
        this.$emit('emit-filter', this.form)
      }
    },
    'GET_META.take': function (oldValue, newValue) {
      if (oldValue !== newValue) {
        this.form = {
          ...this.form,
          take: this.GET_META.take,
          page: this.GET_META.page,
        }
        if (this.isDisabledPagination) {
          delete this.form.page
          delete this.form.take
        }
        this.$emit('emit-filter', this.form)
      }
    },
  },
  props: {
    fieldsInput: {
      type: Array,
      default: () => [
        {
          title: 'Start Date',
          type: 'date',
          placeholder: 'input date',
          value: moment().format('YYYY-MM-DD'),
          size: 3,
          disabled: false
        },
        {
          title: 'End Date',
          type: 'date',
          placeholder: 'input date',
          value: moment().format('YYYY-MM-DD'),
          size: null,
          disabled: false
        },
        {
          title: 'Textarea',
          type: 'textarea',
          placeholder: 'input text area',
          value: '',
          size: null,
          disabled: false
        },
        {
          title: 'Line',
          type: 'option',
          placeholder: 'Select Option',
          value: null,
          options: [
            {
              id: 1,
              label: 'Line 1',
            },
            {
              id: 2,
              label: 'Line 2',
            }
          ],
          size: null,
          disabled: false
        },
        {
          title: 'Sample Code',
          type: 'treeselect',
          placeholder: 'choose your sample Code',
          value: null,
          options: [
            {
              id: 1,
              label: 'Code 1',
            },
            {
              id: 2,
              label: 'Code 2',
            }
          ],
          size: 6,
          disabled: false
        },
      ]
    },
    isDisabledPagination: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Treeselect
  },
}
</script>
<style>
.vue3-treeselect--disabled .vue3-treeselect__control {
  height: 30.2px;
  background-color: #EAEAEA !important;
}

.vue3-treeselect__control {
  height: 30.2px;
}
</style>
