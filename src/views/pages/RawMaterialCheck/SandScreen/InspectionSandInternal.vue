<template>
  <CModal scrollable size="xl" :visible="modalShowJudg" backdrop="static" @close="() => { modalShowJudg = false }">
    <CModalHeader>
      <CModalTitle>Result Abnormal Parameter</CModalTitle>
    </CModalHeader>
    <CModalBody v-if="elementOutOfRanged.length > 0">
      <template v-for="(data, idx) in elementOutOfRanged" :key="data">
        <h6>Sample Code: {{ data.lotNo }}</h6>
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Element</th>
              <th>Min</th>
              <th>Max</th>
              <th>Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(element, i) in data.elements" :key="element">
              <td>{{ i + 1 }}</td>
              <td>{{ element.name }}</td>
              <td>{{ element.min }}</td>
              <td>{{ element.max }}</td>
              <td>{{ element.value }}</td>
              <td class="text-danger">NG</td>
            </tr>
          </tbody>
        </table>
      </template>
    </CModalBody>
    <CModalFooter class="d-flex justify-content-center align-items-center">
      <a :href="reportLink">
        <CButton color="warning">Download PDF</CButton>
      </a>
      <CButton color="success" @click="() => { $router.push('/inspection/ingot/historical'); modalShowJudg = false }">OK
      </CButton>
    </CModalFooter>
  </CModal>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <HeaderComp title="Sand Inspection (Internal)" />
      </div>
    </div>
    <div class="row mt-1">
      <div class="col-12">
        <div v-if="!IS_LOADING" class="card my-2" style="z-index: 1;">
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-lg-10">
                <h6>Sand Inspection</h6>
              </div>
              <div class="col-12 col-lg-2">
                <h6>Sand</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <LoadingComponent class="mt-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComp from '@/components/RawMaterialInspection/HeaderComp.vue'
import LoadingComponent from '@/components/RawMaterialInspection/LoadingComponent.vue';

import { IS_LOADING, } from '@/store/modules/LOADING.module';
import { mapGetters } from 'vuex';

import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();

import Treeselect from '@zanmato/vue3-treeselect'
import "@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css";

export default {
  name: 'InspectionSandInternal',
  data() {
    return {}
  },
  watch: {
  },
  computed: {
    ...mapGetters([IS_LOADING]),
    isKmoldTamagoFill() {
      return this.input.values.filter(item => item.kMold == null || item.tamago == null).length == 0
    }
  },
  methods: {},
  components: {
    // QRScanner,
    HeaderComp,
    LoadingComponent,
    Treeselect
  },
  async mounted() {
  }
}
</script>
