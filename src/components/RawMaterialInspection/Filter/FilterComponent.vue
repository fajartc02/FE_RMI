<template>
  <div class="card p-2" style="z-index: 1">
    <CRow class="align-items-start">
      <CCol class="mt-1" v-for="(field, i) in fieldsInput" :key="i" :md="field.size ? field.size : 3" sm="12">
        <template v-if="field.type !== 'option' && field.type !== 'treeselect' && field.type !== 'textarea'">
          <CFormInput v-model="field.value" :type="field.type" :label="field.title" :placeholder="field.placeholder"
            :disabled="field.disabled" />
        </template>
        <template v-else>
          <CFormTextarea v-if="field.type === 'textarea'" v-model="field.value" :label="field.title"
            :placeholder="field.placeholder" :disabled="field.disabled">
          </CFormTextarea>
          <CFormSelect v-model="field.value" v-else-if="field.type === 'option'" :label="field.title">
            <option selected value=null>{{ field.placeholder }}</option>
            <option v-for="option in field.options" :key="option" :value="option.id">{{ option.label }}</option>
          </CFormSelect>
          <div v-else-if="field.type === 'treeselect'">
            <label class="form-label">{{ field.title }}</label>
            <Treeselect v-model="field.value" :options="field.options" :clearable="true" />
          </div>
        </template>
      </CCol>
    </CRow>
  </div>
</template>
<script>

import FN_CASE_CONVERTER from '@/functions/FN_CASE_CONVERTER';
import { GET_META } from '@/store/modules/META.module';
import Treeselect from '@zanmato/vue3-treeselect'
import "@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css";
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  name: 'FilterComponent',
  data() {
    return {
      form: {}
    }
  },
  computed: {
    ...mapGetters([GET_META])
  },
  watch: {
    fieldsInput: {
      deep: true,
      handler: function () {
        if (this.fieldsInput.length > 0) {
          for (let i = 0; i < this.fieldsInput.length; i++) {
            const isValidDate = moment(this.fieldsInput[i].value, 'YYYY-MM-DD', true).isValid();
            let label = this.fieldsInput[i].title === this.fieldsInput[i].id
            if (isValidDate) {
              this.form[label ? FN_CASE_CONVERTER.titleToCamelCase(this.fieldsInput[i].title) : this.fieldsInput[i].id] = moment(this.fieldsInput[i].value).unix()
            } else {
              this.form[label ? FN_CASE_CONVERTER.titleToCamelCase(this.fieldsInput[i].title) : this.fieldsInput[i].id] = this.fieldsInput[i].value
            }
          }
          this.form = {
            ...this.form,
            take: this.GET_META.take,
            page: this.GET_META.page,
          }
          this.$emit('emit-filter', this.form)
        }
      }
    },
    form: {
      deep: true,
      handler: function () {
        console.log(this.form);
      }
    },
    'GET_META.page': function () {
      this.form = {
        ...this.form,
        take: this.GET_META.take,
        page: this.GET_META.page,
      }
      this.$emit('emit-filter', this.form)
    },
    'GET_META.take': function () {
      this.form = {
        ...this.form,
        take: this.GET_META.take,
        page: this.GET_META.page,
      }
      this.$emit('emit-filter', this.form)
    }
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
    }
  },
  components: {
    Treeselect
  }
}
</script>
<style>
.vue3-treeselect__control {
  height: 33.2px;
}
</style>
