<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <HeaderComp title="Sand Inspection (Internal)" />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-6">
        <div class="d-flex justify-content-between">
          <button :class="`btn wid-150 ${isSandCheck ? 'btn-primary' : 'btn-outline-primary'}`"
            @click="isSandCheck = true">Sand
            Check</button>
          <template v-if="isSandCheck">
            <input class="form-control form-control-sm mx-2" type="date" v-model="data.headers.date"
              :max="data.headers.date">
            <button :class="`btn btn-warning mx-2`" @click="resetInput">Reset</button>
          </template>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div v-if="!IS_LOADING && isSandCheck" class="card my-2" style="z-index: 1;">
          <div class="card-body p-1">
            <div class="row">
              <div class="col-12 col-lg-12">
                <table class="table table-bordered table-striped text-center">
                  <thead>
                    <!-- Start: Header 1 -->
                    <tr>
                      <th colspan="7">Hari</th>
                      <th colspan="2">Shift<small class="text-danger">*</small></th>
                      <th colspan="2">Waktu</th>
                      <th>PIC<small class="text-danger">*</small></th>
                    </tr>
                    <tr>
                      <td :class="`vertical-text text-center ${day.isActive ? 'bg-success text-white' : ''}`"
                        v-for="day in DAY_CONSTANT" :key="day.idx">
                        {{ day.name }}
                      </td>
                      <td :class="`pointer-cursor ${shift.isActive ? 'bg-success text-white' : ''}`"
                        v-for="shift in shiftData" :key="shift" @click="selectedShift(shift.id)">
                        <b class="m-0 p-0">{{ shift.name }}</b>
                      </td>
                      <td v-for="daytime in DAYTIME_CONSTANT" :key="daytime.idx">{{ daytime.name
                        }}</td>
                      <td style="width: 200px;">
                        <treeselect v-model="data.headers.pic" :options="sampleCodeSuggested" :clearable="true"
                          placeholder="Pilih PIC" />
                      </td>
                    </tr>
                    <!-- End: Header 1 -->
                    <!-- Start: Header 2 -->
                    <tr>
                      <th colspan="2">TGL</th>
                      <th colspan="2">BLN</th>
                      <th colspan="3">TAHUN</th>
                      <th colspan="4">Name Sample (Machine)<small class="text-danger">*</small></th>
                      <th>Jam<small class="text-danger">*</small></th>
                    </tr>
                    <tr>
                      <td colspan="2">
                        {{ getDayDate }}
                      </td>
                      <td colspan="2">
                        {{ getMonthDate }}
                      </td>
                      <td colspan="3">
                        {{ getYearDate }}
                      </td>
                      <td colspan="4">
                        <select class="form-select" v-model="data.headers.machineId">
                          <option disabled value=null>Pilih Machine</option>
                          <option v-for="machine in GET_MACHINE" :key="machine.id" :value="machine.id">
                            {{ machine.name }}
                          </option>
                        </select>
                      </td>
                      <td>
                        <input class="form-control" type="time" v-model="data.headers.time" :max="data.headers.time">
                      </td>
                    </tr>
                  </thead>
                </table>
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
import { mapActions, mapGetters } from 'vuex';

import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();

import Treeselect from '@zanmato/vue3-treeselect'
import "@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css";
import moment from 'moment';
import DAY_CONSTANT from '@/constants/DAY_CONSTANT'
import DAYTIME_CONSTANT from '@/constants/DAYTIME_CONSTANT'
import { ACTION_SHIFT, GET_SHIFT } from '@/store/modules/SHIFT.module';
import { ACTION_MACHINE, GET_MACHINE } from '@/store/modules/MACHINE.module';

export default {
  name: 'InspectionSandInternal',
  data() {
    return {
      isSandCheck: false,
      data: {
        headers: {
          date: moment().format('YYYY-MM-DD'),
          shiftId: null,
          isNight: null,
          pic: null,
          machineId: null,
          time: moment().format('HH:mm'),
        }
      },
      DAY_CONSTANT: DAY_CONSTANT,
      DAYTIME_CONSTANT: DAYTIME_CONSTANT,
      shiftData: [],
    }
  },
  watch: {
    GET_SHIFT: function () {
      if (this.GET_SHIFT.length > 0) {
        this.shiftData = this.GET_SHIFT.map((shift) => {
          return {
            ...shift,
            isActive: false
          }
        })
      }
    },
    'data.headers.date': function () {
      this.checkDateInit()
    }
  },
  computed: {
    ...mapGetters([IS_LOADING, GET_SHIFT, GET_MACHINE]),
    getDayDate() {
      return moment(this.data.headers.date).format('DD')
    },
    getMonthDate() {
      return moment(this.data.headers.date).format('MM')
    },
    getYearDate() {
      return moment(this.data.headers.date).format('YYYY')
    },
  },
  methods: {
    ...mapActions([ACTION_SHIFT, ACTION_MACHINE]),
    selectedDay(dayIdx) {
      this.DAY_CONSTANT.forEach((day) => {
        day.isActive = day.idx === dayIdx ? true : false
      })
    },
    selectedShift(shiftId) {
      this.shiftData.forEach((shift) => {
        shift.isActive = shift.id === shiftId ? true : false
        if (shift.isActive) {
          this.data.headers.shiftId = shift.id
        }
      })
    },
    checkDateInit() {
      this.selectedDay(moment(this.data.headers.date).day())
    },
    resetInput() {
      this.data = {
        headers: {
          date: moment().format('YYYY-MM-DD'),
          shiftId: null,
          isNight: null,
          pic: null,
          machineId: null,
          time: moment().format('HH:mm'),
        }
      }
      this.isSandCheck = false
      this.shiftData.forEach((shift) => {
        shift.isActive = false
      })
    }
  },
  components: {
    // QRScanner,
    HeaderComp,
    LoadingComponent,
    Treeselect
  },
  mounted() {
    this.ACTION_SHIFT()
    this.ACTION_MACHINE({ materialCategory: 'SAND' })
    this.checkDateInit()
  }
}
</script>

<style>
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: sideways;
  width: 20px;
}

.pointer-cursor {
  cursor: pointer;
}

.pointer-cursor:hover {
  cursor: pointer;
  background-color: #2DB75C;
  color: white;
}

.wid-150 {
  width: 150px;
}
</style>
