<template>
  <label>Sample:</label>
  <div class="d-flex justify-content-start align-items-center">
    <template v-for="(btn, i) in btnOpts" :key="btn">
      <button v-if="btn.isActive" class="btn btn-primary m-1" @click="changeBtnSample(i)">{{
        btn.label
      }}</button>
      <button v-else class="btn btn-outline-primary m-1" @click="changeBtnSample(i)">{{
        btn.label
      }}</button>
    </template>
  </div>
  <template v-if="isBtnActive">
    <label>Gauge:</label>
    <div class="row">
      <div class="col-12 col-lg-3">
        <div class="d-flex justify-content-start align-items-center">
          <template v-for="gauge in gaugeOpts" :key="gauge.id">
            <button v-if="gauge.isSelected" class="btn btn-primary m-1" @click="changeGaugeSelected(gauge.id)">{{
              gauge.name
              }}</button>
            <button v-else class="btn btn-outline-primary m-1" @click="changeGaugeSelected(gauge.id)">{{
              gauge.name }}</button>
          </template>
        </div>
      </div>
      <div class="col-12 col-lg-9">
        <div class="d-flex justify-content-start align-items-center">
          <treeselect v-if="isSampleVisible && selectedGaugeId" v-model="filter.sampleCode"
            :options="sampleCodeSuggested" :clearable="true" placeholder="Silahkan pilih sample code" />
        </div>
      </div>
    </div>
  </template>
</template>
<script>
import { ACTION_SAMPLE_CODE_SUGGESTED, GET_SAMPLE_CODE_SUGGESTED_TREESELECT } from '@/store/modules/SAMPLE_CODE.module';
import { ACTION_GAUGE, GET_GAUGE } from '@/store/modules/GAUGE.module'

import Treeselect from '@zanmato/vue3-treeselect'
import "@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css";

import { mapGetters } from 'vuex';
import { ACTION_RESET_SAMPLE_INGOT, ACTION_SAMPLE_INGOT } from '@/store/modules/SAMPLE_INGOT.module';
import { ACTION_LOADING } from '@/store/modules/LOADING.module';
import { ACTION_RESET_QR_SAMPLE } from '@/store/modules/QR.module';

export default {
  name: 'HeaderIngotCheckInternal',
  data() {
    return {
      filter: {
        sampleCode: null,
        incharge: 'INTERNAL'
      },
      filterGauge: {
        materialCategory: 'INGOT',
        isAuto: true
      },
      queryGetSuggested: {
        gaugeId: null,
        incharge: 'INTERNAL'
      },
      sampleCodeSuggested: [],
      btnOpts: [
        {
          label: 'Get Sample',
          isActive: false,
          isSampleVisible: false
        },
        {
          label: 'Revisi',
          isActive: false,
          isSampleVisible: true
        }
      ],
      gaugeOpts: []
    }
  },
  methods: {
    changeBtnSample(i) {
      this.$store.dispatch(ACTION_RESET_QR_SAMPLE)
      this.$store.dispatch(ACTION_RESET_SAMPLE_INGOT)
      this.gaugeOpts.forEach((gauge) => {
        gauge.isSelected = false
      })
      this.btnOpts.forEach((btn, index) => {
        if (index === i) {
          btn.isActive = true
          this.$emit('emit-btn-active', btn.label)
        } else {
          btn.isActive = false
        }
      })
    },
    changeGaugeSelected(id) {
      this.queryGetSuggested.gaugeId = id
      this.gaugeOpts.forEach((gauge) => {
        if (gauge.id === id) {
          gauge.isSelected = true
        } else {
          gauge.isSelected = false
        }
      })
      if (!this.isSampleVisible) {
        return this.getSampleIngot(id, true)
      }
      this.$store.dispatch(ACTION_RESET_QR_SAMPLE)
      this.$store.dispatch(ACTION_RESET_SAMPLE_INGOT)
    },
    async getSampleIngot(gaugeId = null, getLastData = false) {
      try {
        // shimadzu get Last Id
        if (this.filter.sampleCode) {
          gaugeId = this.filter.sampleCode
        }
        let response = await this.$store.dispatch(ACTION_SAMPLE_INGOT, { gaugeId, getLastData })


        if (!response.headers) {
          this.$store.dispatch(ACTION_LOADING, false)
          let sampleId = response[0].id

          await this.$store.dispatch(ACTION_SAMPLE_INGOT, { gaugeId: sampleId, getLastData: false })
        }

      } catch (error) {
        this.errorHandler(error)
      }
    },
    errorHandler(error) {
      console.log(error);
      this.$swal('Error', `${error}`, 'error')
    }
  },
  components: {
    Treeselect
  },
  watch: {
    isBtnActive: function () {
      if (this.isBtnActive) {
        this.$store.dispatch(ACTION_GAUGE, this.filterGauge)
      }
    },
    GET_GAUGE: function () {
      if (this.GET_GAUGE) {
        this.gaugeOpts = this.GET_GAUGE
      }
    },
    GET_SAMPLE_CODE_SUGGESTED_TREESELECT: function () {
      if (this.GET_SAMPLE_CODE_SUGGESTED_TREESELECT) {
        this.sampleCodeSuggested = this.GET_SAMPLE_CODE_SUGGESTED_TREESELECT
      }
    },
    'filter.sampleCode': async function () {
      if (this.filter.sampleCode) {
        this.$emit('emit-sample-code', this.filter.sampleCode)
        await this.getSampleIngot(this.selectedGaugeId)
      }
    },
    'queryGetSuggested.gaugeId': async function () {
      if (this.queryGetSuggested.gaugeId) {
        this.$emit('emit-change-gaugeId', this.queryGetSuggested.gaugeId)
      }
    },
    selectedGaugeId: async function () {
      this.filter.sampleCode = null
      if (this.selectedGaugeId && this.isSampleVisible) {
        await this.$store.dispatch(ACTION_LOADING, true)
        await this.$store.dispatch(ACTION_SAMPLE_CODE_SUGGESTED, {
          gaugeId: this.selectedGaugeId,
          incharge: 'INTERNAL'
        })
        await this.$store.dispatch(ACTION_RESET_QR_SAMPLE)
        await this.$store.dispatch(ACTION_RESET_SAMPLE_INGOT)
        await this.$store.dispatch(ACTION_LOADING, false)
      }
    },
  },
  computed: {
    ...mapGetters([GET_SAMPLE_CODE_SUGGESTED_TREESELECT, GET_GAUGE]),
    isBtnActive() {
      return this.btnOpts.some((btn) => btn.isActive)
    },
    isSampleVisible() {
      return this.btnOpts.some((btn) => btn.isActive && btn.isSampleVisible)
    },
    selectedGaugeId() {
      return this.gaugeOpts.find((gauge) => gauge.isSelected)?.id
    },
  },
  async mounted() {
    this.$store.dispatch(ACTION_RESET_QR_SAMPLE)
    this.$store.dispatch(ACTION_RESET_SAMPLE_INGOT)
  }
}
</script>
