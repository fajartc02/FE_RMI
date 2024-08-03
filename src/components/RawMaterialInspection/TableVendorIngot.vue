<template>
  <div class="mb-3">
    <!-- v-else-if="!GET_QR_SAMPLE?.tablePureVendor" -->
    <template v-if="!GET_QR_SAMPLE.tablePureVendor && GET_QR_SAMPLE.tableInternalVendor">
      <DataNotFound />
    </template>

    <table v-else-if="GET_QR_SAMPLE.tablePureVendor" class="table table-bordered table-striped">
      <thead>
        <tr>
          <th v-for="label in GET_QR_SAMPLE.tablePureVendor.cols" :key="label">{{ label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="row in GET_QR_SAMPLE.tablePureVendor.standards" :key="row">{{ row }}</td>
        </tr>
        <tr v-for="(header, idxRow) in GET_QR_SAMPLE.tablePureVendor.values.headers" :key="header">
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
          <template v-for="(value) in GET_QR_SAMPLE.tablePureVendor.values?.values[idxRow]" :key="value">
            <td :class="`text-center ${value.isOk ? 'text-success' : 'text-danger'}`">
              {{ value.value }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>

    <InitActionNotice v-else :message="'Please Scan QR Code'" />
  </div>
</template>
<script>
import SCANNED_RESULT from '@/store/mocks/post/SCANNED_RESULT.mock';
import { GET_QR_SAMPLE } from '@/store/modules/QR.module';
import { mapGetters } from 'vuex';

import DataNotFound from '@/components/RawMaterialInspection/EmptyDataHandler/DataNotFound.vue'
import InitActionNotice from '@/components/RawMaterialInspection/EmptyDataHandler/InitActionNotice.vue';

import { ACTION_SAMPLE_CODE } from '@/store/modules/SAMPLE_CODE.module';

export default {
  name: 'TableVendorIngot',
  data() {
    return {
      form: {
        sampleCode: null
      }
    }
  },
  computed: {
    ...mapGetters([GET_QR_SAMPLE])
  },
  methods: {
    async getSampleCode() {
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
  }
}
</script>
