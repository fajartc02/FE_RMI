<template>
  <CRow>
    <CCol lg="12">
      <QRScanner FormTitle="Ingot" :FormData="forms" @outputData="scanner" />
    </CCol>
  </CRow>
  <CRow>
    <CCol v-if="is_data && is_valid">
      <Table CardTitle="Ingot" :labels="labels" :items="items" />
    </CCol>
    <CCol v-if="is_data && !is_valid">

    </CCol>
    <CCol v-if="!is_data">
      <CCard>
        <CCardBody>
          <CCardTitle>
            Please Scan Ingot Data
          </CCardTitle>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import QRScanner from '@/components/RawMaterialInspection/QRScanner.vue'
import Table from '@/components/Table.vue'


export default {
  name: 'RMIIngot',

  data() {
    return {
      is_data: false,
      is_valid: false,
      forms: [
        {
          key: 'ingot_id',
          label: 'Scan Barcode',
          type: 'text',
          placeholder: 'Ingot',
          value: ''
        }
      ],

      columns: [
        {
          key: 'id',
          label: '#',
          _props: { scope: 'col' },
        },
        {
          key: 'class',
          _props: { scope: 'col' },
        },
        {
          key: 'heading_1',
          label: 'Heading',
          _props: { scope: 'col' },
        },
        {
          key: 'heading_2',
          label: 'Heading',
          _props: { scope: 'col' },
        },
      ],

      items: [
        {
          id: 1,
          class: 'Mark',
          heading_1: 'Otto',
          heading_2: '@mdo',
          _cellProps: { id: { scope: 'row' } },
        },
        {
          id: 2,
          class: 'Jacob',
          heading_1: 'Thornton',
          heading_2: '@fat',
          _cellProps: { id: { scope: 'row' } },
        },
        {
          id: 3,
          class: 'Larry the Bird',
          heading_2: '@twitter',
          _cellProps: { id: { scope: 'row' }, class: { colSpan: 2 } },
        },
      ],

      scannedData: '',
    }
  },

  components: {
    QRScanner,
    Table,
  },

  methods: {
    scanner(data) {
      this.scannedData
      console.log(this.scannedData);

      if (this.scannedData === 2) {
        this.is_data = true
        this.is_valid = true
      }

      console.log(this.scannedData);
    }
  },

  watch: {
  }
}
</script>
