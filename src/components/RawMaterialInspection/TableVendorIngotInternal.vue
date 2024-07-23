<template>
  <div class="mb-3">
    <table v-if="scannedResult" class="table table-bordered table-striped">
      <thead>
        <tr>
          <th v-for="label in scannedResult.tableIntVendor.cols" :key="label">{{ label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="row in scannedResult.tableIntVendor.standards" :key="row">{{ row }}</td>
        </tr>
        <tr v-for="(header, idxRow) in scannedResult.tableIntVendor.values.headers" :key="header">
          <th>
            {{ header.product_date }}
          </th>
          <th>
            {{ header.lot_no }}
          </th>
          <th>
            {{ header.pcs }}
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
          <template v-for="(value) in scannedResult.tableIntVendor.values.values[idxRow]" :key="value">
            <td :class="`text-center ${value.is_ok ? 'text-success' : 'text-danger'}`">
              {{ value.value }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import SCANNED_RESULT from '@/mocks/SCANNED_RESULT.mock';
export default {
  name: 'TableVendorIngotInternal',
  data() {
    return {
      scannedResult: SCANNED_RESULT
    }
  }
}
</script>
