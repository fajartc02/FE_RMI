<template>
  <div class="mb-3">
    <template v-if="!GET_QR_SAMPLE.tableInternalVendor && !GET_QR_SAMPLE.headers">
      <DataNotFound />
    </template>
    <template v-if="sampleCodeSuggested.length > 0">
      <treeselect v-model="form.sampleCode" :options="sampleCodeSuggested" :clearable="true"
        placeholder="Silahkan lihat data dibawah ini, saya khawatir anda salah memasukan sample code" />
      <p class="text-muted">* Silahkan lakukan pengecekan di mesin terlebih dahulu apabila data diatas tidak ditemukan
      </p>
    </template>

    <table v-else-if="GET_QR_SAMPLE.tableInternalVendor" class="table table-bordered table-striped">
      <thead>
        <tr>
          <th style="min-width: 100px;">K-Mold</th>
          <th style="min-width: 100px;">Tamago</th>
          <th v-for="label in GET_QR_SAMPLE.tableInternalVendor.cols" :key="label">{{ label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td v-for="row in GET_QR_SAMPLE.tableInternalVendor.standards" :key="row">{{ row }}</td>
        </tr>
        <tr v-for="(header, idxRow) in GET_QR_SAMPLE.tableInternalVendor.values.headers" :key="header">
          <KMoldTamago @emit-kmold-tamago="onChangeKMoldTamago" :lotNo="header.lotNo" />
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
          <template v-for="(value) in GET_QR_SAMPLE.tableInternalVendor.values?.values[idxRow]" :key="value">
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
import KMoldTamago from './KMoldTamago.vue';

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
      sampleCodeSuggested: [],
      input: {
        lotNo: null,
        kMold: null,
        tamago: null
      },
      containerInput: []
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
    },
    onChangeKMoldTamago(data) {
      // console.log(data);

      this.input.lotNo = data.lotNo
      this.input.tamago = data.tamago ? +data.tamago : null
      this.input.kMold = data.kMold ? +data.kMold : null

      let idxAvailable = this.containerInput.findIndex(item => item.lotNo == this.input.lotNo)
      // console.log(idxAvailable);
      if (idxAvailable != -1) {
        this.containerInput[idxAvailable] = this.input
      } else {
        this.containerInput.push(this.input)
      }
      this.$emit('emit-container-input', this.containerInput)
      this.input = {
        lotNo: null,
        kMold: null,
        tamago: null
      }
    },
  },
  components: {
    DataNotFound,
    Treeselect,
    KMoldTamago
  }
}
</script>
