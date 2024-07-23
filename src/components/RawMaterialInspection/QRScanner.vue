<template>
  <LoadingComponent />
  <QrcodeStream @error="onError" @detect="onDetect" @camera-on="onCameraReady" />
</template>

<script>
import { ACTION_QR_SAMPLE } from '@/store/modules/QR.module'
import { QrcodeStream } from 'vue-qrcode-reader'
import LoadingComponent from '@/components/RawMaterialInspection/LoadingComponent.vue'

export default {
  name: 'QRScanner',
  data() {
    return {
      result: null,
      form: {
        sampleCode: null,
        data: null
      }
    }
  },
  components: {
    QrcodeStream,
    LoadingComponent
  },
  methods: {
    async onDetect(detectedCodes) {
      const rawValue = detectedCodes[0].rawValue.split('\n')
      const sampleCode = rawValue[1].split(';')[0]
      this.form.sampleCode = sampleCode
      this.form.data = detectedCodes[0].rawValue
      await this.$store.dispatch(ACTION_QR_SAMPLE, this.form)
    },
    onCameraReady() {
      console.log('camera ready')
    },
    onError(error) {
      console.log('error', error)
    }
  },
}
</script>
