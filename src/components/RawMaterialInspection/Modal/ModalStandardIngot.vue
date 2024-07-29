<template>
  <CButton @click="showModal = true" color="warning">
    <CIcon icon="cil-newspaper" />
  </CButton>
  <CModal scrollable size="xl" :visible="showModal" @close="() => { showModal = false }">
    <CModalHeader>
      <CModalTitle>Standard Ingot</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <img v-if="image != 'data:image/png;base64,'" :src="image" alt="Standard Ingot" />
    </CModalBody>
  </CModal>
</template>
<script>
import ApiService from '@/store/services/api.service'
export default {
  name: 'ModalStandardIngot',
  data() {
    return {
      showModal: false,
      image: 'data:image/png;base64,'
    }
  },
  async mounted() {
    try {
      const image = await ApiService.get('/image/standard')
      console.log(image);
      this.image += image.data.data.base64
    } catch (error) {
      this.$swal('Error', error, 'error')
    }
  }
}
</script>
