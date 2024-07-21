<template>
  <LoadingComponent />
  <QrcodeStream @error="onError" @detect="onDetect" @camera-on="onCameraReady" />
</template>

<script>
import { ACTION_QR_SAMPLE } from '@/store/modules/QR.module'
import { QrcodeStream } from 'vue-qrcode-reader'
import LoadingComponent from '@/components/RawMaterialInspection/LoadingComponent.vue'
import { ACTION_LOGIN } from '@/store/modules/AUTH.module'

export default {
  name: 'QRScanner',
  data() {
    return {
      result: null,
      form: {
        sample_code: null,
        data: null
      }
    }
  },
  components: {
    QrcodeStream,
    LoadingComponent
  },
  methods: {
    onDetect(detectedCodes) {
      console.log(detectedCodes)
      const rawValue = detectedCodes[0].rawValue.split('\n')
      const sampleCode = rawValue[1].split(';')[0]
      this.form.sample_code = sampleCode
      this.form.data = rawValue
      this.$store.dispatch(ACTION_QR_SAMPLE, this.form)
    },
    onCameraReady() {
      console.log('camera ready')
    },
    onError(error) {
      console.log('error', error)
    }
  },
  mounted() {
    this.$store.dispatch(ACTION_LOGIN)
  }
}
</script>
