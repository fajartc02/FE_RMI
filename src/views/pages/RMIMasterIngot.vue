<template>
  <Table CardTitle="Master Ingot" :labels="columns" :items="items"/>
</template>

<script>
import Table from '../../components/Table.vue'
import api from '../../apis/CommonAPI'

export default {
  name: 'RMIMasterIngot',
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
        ]
    }
  },

  methods: {
    async getIngot(){
      items = api.get()
    }
  },

  components: {
    Table
  }
}
</script>
