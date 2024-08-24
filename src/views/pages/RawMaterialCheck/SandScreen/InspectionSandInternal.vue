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
        <template v-if="!IS_LOADING && isSandCheck">
          <div class="card my-2 overflow-auto" style="z-index: 1;">
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
                        <td v-for="daytime in DAYTIME_CONSTANT" :key="daytime.idx"
                          :class="`${daytime.isActive ? 'bg-success text-white' : ''}`">{{ daytime.name
                          }}</td>
                        <td style="width: 200px;">
                          <i class="text-muted">{{ 'Hook data from 3rd Party' }}</i>
                          <!-- <treeselect v-model="data.headers.pic" :options="[]" :clearable="true"
                            placeholder="Pilih PIC" /> -->
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
          <div class="card my-2 overflow-auto" style="z-index: 1;">
            <div class="card-body p-1">
              <div class="row">
                <div class="col-12 col-lg-12">
                  <table class="table table-bordered table-striped text-center">
                    <thead>
                      <tr>
                        <th>MESH</th>
                        <th colspan="2">Berat (Gr)<small class="text-danger">*</small></th>
                        <th colspan="2">Berat (%)</th>
                        <th>Index</th>
                        <th>% X Index</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- this.data.values -->
                      <tr v-for="(element) in meshElements" :key="element.id">
                        <td>
                          {{ element.description }}
                        </td>
                        <td colspan="2" style="width: 200px">
                          <input class="form-control" type="number" min="0" v-model="element.value">
                        </td>
                        <td colspan="2" style="width: 200px">
                          {{ calcelementIndex(element.value, 1) }}
                        </td>
                        <td>
                          {{ element.elementIndex }}
                        </td>
                        <td>
                          {{ element.value ? multipleelementIndex(element.value, element.elementIndex) : 0 }}
                        </td>
                      </tr>
                      <tr>
                        <th>Total Original</th>
                        <th colspan="2">50</th>
                        <th>
                          Total Debu<small class="text-danger">*</small>
                        </th>
                        <td>
                          <input v-model="dustElement.value" type="number" class="form-control">
                        </td>
                        <th>Total</th>
                        <th>
                          {{ sumOfElementValue }}
                        </th>
                      </tr>
                      <tr>
                        <td class="bg-dark" rowspan="2" colspan="3"></td>
                        <th colspan="2">Total % X Index</th>
                        <th>GFN</th>
                        <th rowspan="2">
                          {{ calcGfn(sumOfElementValue) }}
                        </th>
                      </tr>
                      <tr>
                        <th colspan="2">100</th>
                        <th>90.0 (± 10)</th>
                      </tr>

                      <!-- Start -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="card my-2 overflow-auto" style="z-index: 1;">
            <div class="card-body p-1">
              <div class="row">
                <div class="col-12 col-lg-12">
                  <table class="table table-bordered table-striped text-center">
                    <thead>
                      <tr>
                        <th colspan="6">Data Natrium</th>
                      </tr>
                      <template v-for="(element) in natriumElements" :key="element.id">
                        <tr>
                          <th style="width: 100px">ITEM</th>
                          <th v-for="subElement in element.elements" :key="subElement.id">{{ subElement.name }}<small
                              class="text-danger">*</small></th>
                        </tr>
                        <tr>
                          <th>Standard</th>
                          <th v-for="subElement in element.elements" :key="subElement.id">{{ subElement.min }} ~ {{
                            subElement.max }}</th>
                        </tr>
                        <tr>
                          <th>{{ element.name }}</th>
                          <th v-for="subElement in element.elements" :key="subElement.id">
                            <input type="number" class="form-control" v-model="subElement.value">
                          </th>
                        </tr>
                      </template>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </template>
        <LoadingComponent v-else class="my-2" />
      </div>
    </div>
    <div v-if="isSandCheck" class="row">
      <div class="col-12 fixed-bottom">
        <div class="d-flex justify-content-evenly align-items-center p-4"
          style="background-color: rgba(255, 255, 255, 0.5);">
          <button v-if="isInputValid" class="btn btn-success text-light" @click="submitSandCheck"
            style="font-size: large; width: 30%;">
            Submit
          </button>
          <button v-else class="btn btn-danger" disabled style="width: 30%;font-size: large;">
            Please Fill all input
          </button>
          <button class="btn btn-warning text-dark" @click="resetInput" style="font-size: large;width: 30%;">
            Cancel
          </button>

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
import { ACTION_ELEMENT_QUERY, GET_ELEMENT_INPUT } from '@/store/modules/ELEMENTS.module';
import { isNumber } from 'highcharts';

export default {
  name: 'InspectionSandInternal',
  data() {
    return {
      isSandCheck: false,
      data: {
        headers: {
          date: moment().format('YYYY-MM-DD'),
          shiftId: null,
          isNight: false,
          pic: null,
          machineId: null,
          time: moment().format('HH:mm'),
          totalGfn: 0,
          totalPercIndex: 0,
        },
        elements: [],
        natriumElement: []
      },
      meshElements: [],
      gfnElement: null,
      dustElement: null,
      natriumElements: [],
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
    },
    GET_ELEMENT_INPUT: function () {
      if (this.GET_ELEMENT_INPUT) {
        this.meshElements = this.GET_ELEMENT_INPUT.meshElements.map((element) => {
          return {
            ...element,
            value: null,
            percentValue: null,
            percentIndex: null
          }
        })
        this.GET_ELEMENT_INPUT.gfnElement.value = null
        this.GET_ELEMENT_INPUT.dustElement.value = null

        this.gfnElement = this.GET_ELEMENT_INPUT.gfnElement
        this.dustElement = this.GET_ELEMENT_INPUT.dustElement
        this.natriumElements = this.GET_ELEMENT_INPUT.natriumElements.map(item => {
          return {
            ...item,
            elements: item.elements.map(element => {
              return {
                ...element,
                value: null
              }
            })
          }
        })
      }
    },
    'meshElements': {
      handler: function () {
        this.data.elements = this.meshElements.map((element) => {
          if (element.value || element.value === 0) {
            element.value = parseFloat(element.value)
            element.percentIndex = this.multipleelementIndex(element.value, element.elementIndex)
          }
          return {
            id: element.id,
            percentValue: element.value * 2,
            value: element.value,
            elementIndex: element.elementIndex,
            percentIndex: element.percentIndex
          }
        })
      },
      deep: true
    },
    sumOfElementValue: function () {
      this.data.headers.totalPercIndex = this.sumOfElementValue
      this.data.headers.totalGfn = this.calcGfn(this.sumOfElementValue)
    },
    isSandCheck: function () {
      if (this.isSandCheck) {
        this.ACTION_SHIFT()
        this.ACTION_MACHINE({ materialCategory: 'SAND' })
        this.checkDateInit()
        this.ACTION_ELEMENT_QUERY({ type: 'SAND' })
      }
    },
    'data.headers.time': function () {
      if (this.data.headers.time) {
        this.isNightCondition()
      }
    }
  },
  computed: {
    ...mapGetters([IS_LOADING, GET_SHIFT, GET_MACHINE, GET_ELEMENT_INPUT]),
    getDayDate() {
      return moment(this.data.headers.date).format('DD')
    },
    getMonthDate() {
      return moment(this.data.headers.date).format('MM')
    },
    getYearDate() {
      return moment(this.data.headers.date).format('YYYY')
    },
    sumOfElementValue() {
      let sum = 0
      this.meshElements.forEach((element) => {
        let sumEachParam = element.value ? this.multipleelementIndex(element.value, element.elementIndex) : 0
        sum += sumEachParam
      })

      return sum.toFixed(0)
    },
    isInputValid() {
      return this.data.headers.date &&
        this.data.headers.shiftId &&
        this.data.headers.machineId &&
        this.meshElements.filter(element => isNumber(element.value)).length == this.meshElements.length &&
        this.natriumElements.filter(element => element.elements.filter(item => isNumber(item.value)).length == element.elements.length).length == this.natriumElements.length &&
        isNumber(this.dustElement.value) &&
        isNumber(this.gfnElement.value)
    },
  },
  methods: {
    ...mapActions([ACTION_SHIFT, ACTION_MACHINE, ACTION_ELEMENT_QUERY]),
    selectedDay(dayIndex) {
      this.DAY_CONSTANT.forEach((day) => {
        day.isActive = day.idx === dayIndex ? true : false
      })
    },
    isNightCondition() {
      if (this.data.headers.time) {
        const startTime = moment(`${moment(this.data.headers.date).format('YYYY-MM-DD')} 06:00`)
        const endTime = moment(`${moment(this.data.headers.date).format('YYYY-MM-DD')} 20:00`)
        const currentTime = moment(`${moment(this.data.headers.date).format('YYYY-MM-DD')} ${this.data.headers.time}`)
        const isDay = currentTime.isAfter(startTime) && currentTime.isBefore(endTime)
        this.data.headers.isNight = !isDay
        this.DAYTIME_CONSTANT.forEach((time) => {
          if (time.isNight === this.data.headers.isNight) {
            time.isActive = true
          } else {
            time.isActive = false
          }
        })
      }
    },
    calcelementIndex(value, precision) {
      return (value * 2).toFixed(precision)
    },
    multipleelementIndex(value, elementIndex, precision = 0) {
      return +((value * 2).toFixed(1) * elementIndex).toFixed(precision)
    },
    calcGfn(value) {
      this.gfnElement.value = +(value / 100).toFixed(1)
      return (value / 100).toFixed(1)
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
      this.data.headers.time = moment().format('HH:mm')
    },
    resetInput() {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reset it!',
      })
        .then((result) => {
          if (result.isConfirmed) {
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
        })
    },
    submitSandCheck() {
      if (this.isInputValid) {
        const objPayload = {
          headers: { ...this.data.headers },
          elements: [
            {
              meshElements: this.meshElements.map((element) => {
                return {
                  id: element.id,
                  percentValue: element.value * 2,
                  value: element.value,
                  elementIndex: element.elementIndex,
                  percentIndex: element.percentIndex
                }
              }),
            },
            {
              natriumElements: this.natriumElements.map((element) => {
                return {
                  id: element.id,
                  elements: element.elements.map((item) => {
                    return {
                      id: item.id,
                      value: item.value,
                    }
                  })
                }
              })
            },
            {
              dustElement: {
                id: this.dustElement.id,
                value: this.dustElement.value
              }
            },
            {
              gfnElement: {
                id: this.gfnElement.id,
                value: this.gfnElement.value
              }
            },
          ]
        }
        console.log(objPayload);

      }
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
    this.ACTION_ELEMENT_QUERY({ type: 'SAND' })
    this.isNightCondition()
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
