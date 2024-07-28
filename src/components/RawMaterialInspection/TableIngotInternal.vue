<template>
  <div class="mb-3">
    <template v-if="!GET_QR_SAMPLE.tableIntVendor && !GET_QR_SAMPLE.headers">
      <DataNotFound />
    </template>
    <template v-if="sampleCodeSuggested.length > 0">
      <treeselect v-model="form.sampleCode" :options="sampleCodeSuggested" :clearable="true"
        placeholder="Silahkan lihat data dibawah ini, saya khawatir anda salah memasukan sample code" />
      <p class="text-muted">* Silahkan lakukan pengecekan di mesin terlebih dahulu apabila data diatas tidak ditemukan
      </p>
    </template>

    <table v-else-if="GET_QR_SAMPLE.tableIntVendor" class="table table-bordered table-striped">
      <thead>
        <tr>
          <th v-for="label in GET_QR_SAMPLE.tableIntVendor.cols" :key="label">{{ label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="row in GET_QR_SAMPLE.tableIntVendor.standards" :key="row">{{ row }}</td>
        </tr>
        <tr v-for="(header, idxRow) in GET_QR_SAMPLE.tableIntVendor.values.headers" :key="header">
          <th>
            {{ header.productDate }}
          </th>
          <th>
            {{ header.lotNo }}
          </th>
          <th>
            {{ header.pieces }}
          </th>
          <th>
            {{ header.weight }}
          </th>
          <th>
            {{ header.color1 }}
          </th>
          <th>
            {{ header.color2 }}
          </th>
          <template v-for="(value) in GET_QR_SAMPLE.tableIntVendor.values.values[idxRow]" :key="value">
            <td :class="`text-center ${value.isOk ? 'text-success' : 'text-danger'}`">
              {{ value.value }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>


    <table v-if="GET_SAMPLE_CODE" class="table table-bordered table-striped">
      <thead>
        <tr>
          <th v-for="label in GET_SAMPLE_CODE.cols" :key="label">{{ label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="row in GET_SAMPLE_CODE.standards" :key="row">{{ row }}</td>
        </tr>
        <tr v-for="(header, idxRow) in GET_SAMPLE_CODE.values.headers" :key="header">
          <th>
            {{ header.productDate }}
          </th>
          <th>
            {{ header.lotNo }}
          </th>
          <th>
            {{ header.pieces }}
          </th>
          <th>
            {{ header.weight }}
          </th>
          <th>
            {{ header.color1 }}
          </th>
          <th>
            {{ header.color2 }}
          </th>
          <template v-for="(value) in GET_SAMPLE_CODE.values.values[idxRow]" :key="value">
            <td :class="`text-center ${value.isOk ? 'text-success' : 'text-danger'}`">
              {{ value.value }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { GET_QR_SAMPLE } from '@/store/modules/QR.module';
import { mapGetters } from 'vuex';

import DataNotFound from '@/components/RawMaterialInspection/EmptyDataHandler/DataNotFound.vue'
import InitActionNotice from '@/components/RawMaterialInspection/EmptyDataHandler/InitActionNotice.vue';

import Treeselect from '@zanmato/vue3-treeselect'
import "@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css";
import { ACTION_SAMPLE_CODE, GET_SAMPLE_CODE } from '@/store/modules/SAMPLE_CODE.module';

export default {
  name: 'TableIngotInternal',
  data() {
    return {
      form: {
        sampleCode: null
      },
      sampleCodeSuggested: []
    }
  },
  watch: {
    'form.sampleCode': function () {
      if (this.form.sampleCode) {
        this.fetchSampleCode()
        this.$emit('emit-sample-code', this.form.sampleCode)
      }
    }
  },
  computed: {
    ...mapGetters([GET_QR_SAMPLE, GET_SAMPLE_CODE])
  },
  props: {
    message: {
      type: String,
      default: 'Please Scan QR Code',
      required: false
    }
  },
  methods: {
    async fetchSampleCode() {
      try {
        await this.$store.dispatch(ACTION_SAMPLE_CODE, this.form)
      } catch (error) {
        console.log(error);
        alert(JSON.stringify(error));
      }
    }
  },
  components: {
    DataNotFound,
    InitActionNotice,
    Treeselect
  }
}
</script>
