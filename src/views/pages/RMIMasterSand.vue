<template>
    <CCol lg="12">
      <CardSearch SearchTitle="Sand" @dataSend="paramsData" :SearchData="search"/>
    </CCol>
    <Table CardTitle="Master Sand" :labels="columns" :items="items"/>
</template>

<script>
import Table from '../../components/Table.vue'
import CardSearch from '../../components/CardSearch.vue'
import api from '../../apis/CommonAPI'

export default {
  name: 'RMIMasterSand',
  data() {
    return {
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

      paramsString: '',

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

      search: [
        {
          label: 'Sand Name',
          placeholder: 'Input Name',
          value: '',
          type: 'Text',
          params: 'sand_name'
        },
        {
          label: 'Sand Type',
          placeholder: 'Input Type',
          value: '',
          type: 'Select',
          params: 'sand_type'
        },

      ]
    }
  },

  methods: {
    async getSand(){

    },

    paramsData(params) {
      this.paramsString = params
      console.log(this.paramsString)
    },
  },

  components: {
    Table,
    CardSearch
  }
}
</script>
