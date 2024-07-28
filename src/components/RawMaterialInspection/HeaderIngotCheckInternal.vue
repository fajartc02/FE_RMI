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
          <template v-for="gauge in gaugeOpts" :key="gauge.gaugeId">
            <button v-if="gauge.isSelected" class="btn btn-primary m-1" @click="changeGaugeSelected(gauge.gaugeId)">{{
              gauge.gaugeName
              }}</button>
            <button v-else class="btn btn-outline-primary m-1" @click="changeGaugeSelected(gauge.gaugeId)">{{
              gauge.gaugeName }}</button>
          </template>
        </div>
      </div>
      <div class="col-12 col-lg-9">
        <div class="d-flex justify-content-start align-items-center">
          <treeselect v-if="isSampleVisible" v-model="filter.sampleCode" :options="sampleCodeSuggested"
            :clearable="true" placeholder="Silahkan pilih sample code" />
        </div>
      </div>
    </div>
  </template>
</template>
<script>
import { ACTION_SAMPLE_CODE_SUGGESTED, GET_SAMPLE_CODE_SUGGESTED } from '@/store/modules/SAMPLE_CODE.module';
import { ACTION_GAUGE, GET_GAUGE } from '@/store/modules/GAUGE.module'

import Treeselect from '@zanmato/vue3-treeselect'
import "@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css";

import { mapGetters } from 'vuex';
import { ACTION_SAMPLE_INGOT } from '@/store/modules/SAMPLE_INGOT.module';
import { ACTION_LOADING } from '@/store/modules/LOADING.module';

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
      sampleCodeSuggested: [],
      btnOpts: [
        {
          label: 'Get Sample',
          isActive: false,
          isSampleVisible: false
        },
        {
          label: 'Resample',
          isActive: false,
          isSampleVisible: true
        }
      ],
      gaugeOpts: []
    }
  },
  methods: {
    changeBtnSample(i) {
      this.gaugeOpts.forEach((gauge) => {
        gauge.isSelected = false
      })
      this.btnOpts.forEach((btn, index) => {
        if (index === i) {
          btn.isActive = true
        } else {
          btn.isActive = false
        }
      })
    },
    changeGaugeSelected(gaugeId) {
      this.gaugeOpts.forEach((gauge) => {
        console.log(gauge.gaugeId, gaugeId);
        if (gauge.gaugeId === gaugeId) {
          gauge.isSelected = true
        } else {
          gauge.isSelected = false
        }
      })
    },
    async getSampleIngot() {
      try {
        await this.$store.dispatch(ACTION_SAMPLE_INGOT, this.filter)
      } catch (error) {
        this.errorHandler(error)
      }
    },
    errorHandler(error) {
      console.log(error);
      this.$swal('Error', error, 'error')
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
    GET_SAMPLE_CODE_SUGGESTED: function () {
      if (this.GET_SAMPLE_CODE_SUGGESTED) {
        this.sampleCodeSuggested = this.GET_SAMPLE_CODE_SUGGESTED
      }
    },
    'filter.sampleCode': async function () {
      if (this.filter.sampleCode) {
        this.$emit('emit-sample-code', this.filter.sampleCode)
        await this.getSampleIngot()
      }
    },
    selectedGaugeId: async function () {
      if (this.selectedGaugeId && this.isSampleVisible) {
        await this.$store.dispatch(ACTION_LOADING, true)
        await this.$store.dispatch(ACTION_SAMPLE_CODE_SUGGESTED, this.selectedGaugeId)
        await this.$store.dispatch(ACTION_LOADING, false)
      } else {
        await this.$store.dispatch(ACTION_LOADING, true)
        await this.getSampleIngot()
        await this.$store.dispatch(ACTION_LOADING, false)
      }
    },
  },
  computed: {
    ...mapGetters([GET_SAMPLE_CODE_SUGGESTED, GET_GAUGE]),
    isBtnActive() {
      return this.btnOpts.some((btn) => btn.isActive)
    },
    isSampleVisible() {
      return this.btnOpts.some((btn) => btn.isActive && btn.isSampleVisible) && this.selectedGaugeId
    },
    selectedGaugeId() {
      return this.gaugeOpts.find((gauge) => gauge.isSelected)?.gaugeId
    },
  },
  async mounted() {

  }
}
</script>
