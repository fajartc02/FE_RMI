<template>

  <CCard class="mb-3">
    <CCardHeader>
      <CCardTitle>
        {{ CardTitle }}
      </CCardTitle>
    </CCardHeader>

    <CCardBody>
      <CTable :columns="columns" :items="items" />
    </CCardBody>

    <CCardFooter>

    </CCardFooter>
  </CCard>
</template>

<script>
import { CCardTitle, CNavGroupItems } from '@coreui/vue';

export default {
  name: 'Table',

  computed: {

  },

  methods: {

  },

  props: {
    CardTitle: String,
    labels: Array,
    items: Array,
    condition: Boolean
  }
}
</script>
