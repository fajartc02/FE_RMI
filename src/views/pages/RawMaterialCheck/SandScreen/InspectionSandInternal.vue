<template>
  <div class="container-fluid">
    <CModal scrollable size="xl" :visible="modalShowJudg" backdrop="static" @close="() => { modalShowJudg = false }">
      <CModalHeader>
        <CModalTitle>Result Abnormal Parameter</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <template v-if="elementsOutOfRange.length > 0">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th class="text-center">No</th>
                <template v-for="(header, index) in Object.keys(elementsOutOfRange[0])" :key="index">
                  <th class="text-center" v-if="CONSTANT_COLUMN_VIEW.includes(header)">
                    {{ header }}
                  </th>
                </template>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(element, index) in elementsOutOfRange" :key="index">
                <td class="text-center">{{ index + 1 }}</td>
                <template v-for="(value, key) in element" :key="key">
                  <td
                    :class="`${key == 'name' ? 'text-left' : 'text-center'} ${key === 'value' ? element.textColor : ''}`"
                    v-if="CONSTANT_COLUMN_VIEW.includes(key)">
                    {{ key == 'warningLimit' ? `${value * 100}%` : value }}
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </template>
        <label class="form-label">Notes</label>
        <textarea v-model="notes" class="form-control" cols="30" rows="3"></textarea>
      </CModalBody>
      <CModalFooter class="d-flex justify-content-center align-items-center">
        <a :href="reportLink">
          <CButton color="warning">Download PDF</CButton>
        </a>
        <CButton color="success" @click="submitAbnormalSample()">Save Adjustment
        </CButton>
      </CModalFooter>
    </CModal>
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
        <template v-if="!IS_LOADING && isSandCheck && isFormReady">
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
                          {{ element.description || element.name }}
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
                          {{ element.value ? multipleElementIndex(element.value, element.elementIndex) : 0 }}
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
                          <th v-for="subElement in element?.elements" :key="subElement.id">{{ subElement.name }}<small
                              class="text-danger">*</small></th>
                        </tr>
                        <tr>
                          <th>Standard</th>
                          <th v-for="subElement in element?.elements" :key="subElement.id">{{ subElement.min }} ~ {{
                            subElement.max }}</th>
                        </tr>
                        <tr>
                          <th>{{ element.name }}</th>
                          <th v-for="subElement in element?.elements" :key="subElement.id">
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
          <div v-if="notes" class="card my-2 overflow-auto" style="z-index: 1;margin-bottom: 100px!important;">
            <div class="card-body p-1">
              <label class="form-label">Notes</label>
              <textarea v-model="notes" class="form-control" cols="30" rows="3"></textarea>
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
          <button v-if="isInputValid && !isSubmitted" class="btn btn-success text-light" @click="submitSandCheck"
            style="font-size: large; width: 30%;">
            Submit
          </button>
          <button v-else-if="isSubmitted" class="btn btn-success" disabled style="width: 30%;font-size: large;">
            Data Already Submitted
          </button>
          <button v-else class="btn btn-danger" disabled style="width: 30%;font-size: large;">
            Please Fill all input
          </button>
          <button v-if="!isSubmitted" class="btn btn-warning text-dark" @click="resetInput"
            style="font-size: large;width: 30%;">
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
import { ACTION_SAND_ELEMENT, GET_ELEMENT_INPUT } from '@/store/modules/ELEMENTS.module';
import { isNumber } from 'highcharts';
import STATUS_ELEMENT_CONSTANT from '@/constants/STATUS_ELEMENT_CONSTANT';
import { ACTION_SAMPLE_SAND, ACTION_SAMPLE_SAND_DETAIL, ADD_SAMPLE_SAND } from '@/store/modules/SAMPLE_SAND.module';
import SAND_COL_CONSTANT from '@/constants/SAND_COL_CONSTANT';

export default {
  name: 'InspectionSandInternal',
  data() {
    return {
      CONSTANT_COLUMN_VIEW: SAND_COL_CONSTANT,
      modalShowJudg: false,
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
      STATUS_ELEMENT_CONSTANT: STATUS_ELEMENT_CONSTANT,
      elementsOutOfRange: [],
      isHeaderNotEmpty: false,
      isElementNotEmpty: false,
      notes: null,
      objPayload: null,
      isSubmitted: false,
      isFormReady: false
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
            value: element.value || null,
            percentValue: element.percentValue || null,
            percentIndex: element.percentIndex || null
          }
        })
        this.GET_ELEMENT_INPUT.gfnElement.value = this.GET_ELEMENT_INPUT.gfnElement.value || null
        this.GET_ELEMENT_INPUT.dustElement.value = this.GET_ELEMENT_INPUT.dustElement.value || null

        this.gfnElement = this.GET_ELEMENT_INPUT.gfnElement
        this.dustElement = this.GET_ELEMENT_INPUT.dustElement
        this.natriumElements = this.GET_ELEMENT_INPUT.natriumElements.map(item => {
          return {
            ...item,
            elements: item?.elements?.map(element => {
              return {
                ...element,
                value: element.value || null
              }
            })
          }
        })
        this.isFormReady = true
      } else {
        this.isFormReady = false
      }
    },
    'meshElements': {
      handler: function () {
        this.data.elements = this.meshElements.map((element) => {
          if (element.value || element.value === 0) {
            element.value = parseFloat(element.value)
            element.percentIndex = this.multipleElementIndex(element.value, element.elementIndex)
          }
          return {
            id: element.id,
            percentValue: element.value * 2,
            value: element.value,
            min: element.min,
            max: element.max,
            warningLimit: element.warningLimit,
            elementIndex: element.elementIndex,
            percentIndex: element.percentIndex
          }
        })
      },
      deep: true
    },
    sumOfElementValue: function () {
      this.data.headers.totalPercIndex = Number(this.sumOfElementValue)
      this.data.headers.totalGfn = Number(this.calcGfn(this.sumOfElementValue))
    },
    isSandCheck: function () {
      if (this.isSandCheck) {
        this.ACTION_SHIFT()
        this.ACTION_MACHINE({ materialCategory: 'SAND' })
        this.checkDateInit()
        this.ACTION_SAND_ELEMENT()
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
        let sumEachParam = element.value ? this.multipleElementIndex(element.value, element.elementIndex) : 0
        sum += sumEachParam
      })

      return sum.toFixed(0)
    },
    isInputValid() {
      return this.data.headers.date &&
        this.data.headers.shiftId &&
        this.data.headers.machineId &&
        this.meshElements.filter(element => isNumber(element.value)).length == this.meshElements.length &&
        this.natriumElements.filter(element => element?.elements?.filter(item => isNumber(item.value)).length == element?.elements?.length).length == this.natriumElements.length &&
        isNumber(this.dustElement?.value ?? 0) &&
        isNumber(this.gfnElement?.value ?? 0)
    },
  },
  methods: {
    ...mapActions([ACTION_SHIFT, ACTION_MACHINE, ACTION_SAND_ELEMENT, ACTION_SAMPLE_SAND, ACTION_SAMPLE_SAND_DETAIL, ADD_SAMPLE_SAND]),
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
    multipleElementIndex(value, elementIndex, precision = 0) {
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
    async submitSandCheck() {
      if (this.isInputValid) {
        const objPayload = {
          headers: { ...this.data.headers },
          elements: {
            meshElements: this.meshElements.map((element) => {
              return {
                id: element.id,
                name: element.name,
                percentValue: Number(element.value) * 2,
                value: Number(element.value),
                min: element.min,
                max: element.max,
                warningLimit: element.warningLimit,
                elementIndex: element.elementIndex,
                percentIndex: element.percentIndex
              }
            }),
            natriumElements: this.natriumElements.map((elements) => {
              return {
                elements: elements?.elements?.map((item) => {
                  return {
                    parentId: elements.id,
                    parentName: elements.name,
                    id: item.id,
                    name: `${elements.name} - ${item.name}`,
                    value: Number(item.value),
                    min: item.min,
                    max: item.max,
                    warningLimit: item.warningLimit,
                  }
                })
              }
            }),
            dustElement: {
              id: this.dustElement.id,
              name: this.dustElement.name,
              value: Number(this.dustElement.value),
              min: this.dustElement.min,
              max: this.dustElement.max,
              warningLimit: this.dustElement.warningLimit,
            },
            gfnElement: {
              id: this.gfnElement.id,
              name: this.gfnElement.name,
              value: Number(this.gfnElement.value),
              min: this.gfnElement.min,
              max: this.gfnElement.max,
              warningLimit: this.gfnElement.warningLimit,
            }
          },
          notes: null
        }
        objPayload.elements.natriumElements = objPayload.elements.natriumElements.flat()
        let checkStandardElements = await this.checkElementStandard(objPayload.elements)
        const objPayloadFinal = {
          headers: { ...this.data.headers },
          elements: checkStandardElements.allElements
        }
        if (checkStandardElements.abnormalElements.length > 0) {
          this.modalShowJudg = true;
          this.elementsOutOfRange = checkStandardElements.abnormalElements;
          this.objPayload = objPayload;
          return;
        }

        // console.log(objPayloadFinal);

        const response = await this.ACTION_SAMPLE_SAND(objPayloadFinal)
        if (response) {
          this.$swal('Success', 'Add sample success, Pengecekan tidak ada abnormal', 'success')
          this.$router.push('/inspection/sand/historical')
        } else {
          this.$swal('Error', 'Internal Server Error', 'error')
        }
      }
    },
    async checkElementStandard(elements) {
      let containerElements = [];
      let containerElementsAbnormal = [];
      const meshElements = elements.meshElements
      const natriumElements = elements.natriumElements
      const dustElement = elements.dustElement
      const gfnElement = elements.gfnElement

      await meshElements.forEach((element, index) => {
        const gap = element.max - element.min
        const calcWarningLimitUpper = element.max - (gap * element.warningLimit)
        const calcWarningLimitLower = element.min + (gap * element.warningLimit)
        const isElementWarning =
          (element.value >= calcWarningLimitUpper && element.value <= element.max)
          || (element.value <= calcWarningLimitLower && element.value >= element.min)
        if (isElementWarning) {
          element.status = this.STATUS_ELEMENT_CONSTANT.WARNING.label
          element.textColor = this.STATUS_ELEMENT_CONSTANT.WARNING.textColor
          containerElements.push(element)
          containerElementsAbnormal.push(element)
        } else if (element.value > element.max || element.value < element.min) {
          element.status = this.STATUS_ELEMENT_CONSTANT.NG.label
          element.textColor = this.STATUS_ELEMENT_CONSTANT.NG.textColor
          containerElements.push(element)
          containerElementsAbnormal.push(element)
        } else {
          element.status = this.STATUS_ELEMENT_CONSTANT.OK.label
          element.textColor = this.STATUS_ELEMENT_CONSTANT.OK.textColor
          containerElements.push(element)
        }
      })

      const dustGap = dustElement.max - dustElement.min
      const calcDustWarningLimitUpper = dustElement.max - (dustGap * dustElement.warningLimit)
      const calcDustWarningLimitLower = dustElement.min + (dustGap * dustElement.warningLimit)

      const isElementDustWarning = (dustElement.value >= calcDustWarningLimitUpper && dustElement.value <= dustElement.max)
        || (dustElement.value <= calcDustWarningLimitLower && dustElement.value >= dustElement.min)

      if (isElementDustWarning) {
        dustElement.status = this.STATUS_ELEMENT_CONSTANT.WARNING.label
        dustElement.textColor = this.STATUS_ELEMENT_CONSTANT.WARNING.textColor
        containerElements.push(dustElement)
        containerElementsAbnormal.push(dustElement)
      } else if (dustElement.value > dustElement.max || dustElement.value < dustElement.min) {
        dustElement.status = this.STATUS_ELEMENT_CONSTANT.NG.label
        dustElement.textColor = this.STATUS_ELEMENT_CONSTANT.NG.textColor
        containerElements.push(dustElement)
        containerElementsAbnormal.push(dustElement)
      } else {
        dustElement.status = this.STATUS_ELEMENT_CONSTANT.OK.label
        dustElement.textColor = this.STATUS_ELEMENT_CONSTANT.OK.textColor
        containerElements.push(dustElement)
      }

      const gfnGap = gfnElement.max - gfnElement.min
      const calcGfnWarningLimitUpper = gfnElement.max - (gfnGap * gfnElement.warningLimit)
      const calcGfnWarningLimitLower = gfnElement.min + (gfnGap * gfnElement.warningLimit)
      const isElementGfnWarning = (gfnElement.value >= calcGfnWarningLimitUpper && gfnElement.value <= gfnElement.max)
        || (gfnElement.value <= calcGfnWarningLimitLower && gfnElement.value >= gfnElement.min)
      if (isElementGfnWarning) {
        gfnElement.status = this.STATUS_ELEMENT_CONSTANT.WARNING.label
        gfnElement.textColor = this.STATUS_ELEMENT_CONSTANT.WARNING.textColor
        containerElements.push(gfnElement)
        containerElementsAbnormal.push(gfnElement)
      } else if (gfnElement.value > gfnElement.max || gfnElement.value < gfnElement.min) {
        gfnElement.status = this.STATUS_ELEMENT_CONSTANT.NG.label
        gfnElement.textColor = this.STATUS_ELEMENT_CONSTANT.NG.textColor
        containerElements.push(gfnElement)
        containerElementsAbnormal.push(gfnElement)
      } else {
        gfnElement.status = this.STATUS_ELEMENT_CONSTANT.OK.label
        gfnElement.textColor = this.STATUS_ELEMENT_CONSTANT.OK.textColor
        containerElements.push(gfnElement)
      }

      await natriumElements.forEach((element, index) => {
        element?.elements?.forEach((subElement, index) => {
          const calcWarningLimitUpper = subElement.max - (subElement.max * subElement.warningLimit)
          const calcWarningLimitLower = subElement.min + (subElement.min * subElement.warningLimit)
          const isElementWarning =
            (subElement.value >= calcWarningLimitUpper && subElement.value <= subElement.max)
            || (subElement.value <= calcWarningLimitLower && subElement.value >= subElement.min)
          if (isElementWarning) {
            subElement.status = this.STATUS_ELEMENT_CONSTANT.WARNING.label
            subElement.textColor = this.STATUS_ELEMENT_CONSTANT.WARNING.textColor
            containerElements.push(subElement)
            containerElementsAbnormal.push(subElement)
          } else if (subElement.value > subElement.max || subElement.value < subElement.min) {
            subElement.status = this.STATUS_ELEMENT_CONSTANT.NG.label
            subElement.textColor = this.STATUS_ELEMENT_CONSTANT.NG.textColor
            containerElements.push(subElement)
            containerElementsAbnormal.push(subElement)
          } else {
            subElement.status = this.STATUS_ELEMENT_CONSTANT.OK.label
            subElement.textColor = this.STATUS_ELEMENT_CONSTANT.OK.textColor
            containerElements.push(subElement)
          }
        })
      })

      return {
        allElements: containerElements,
        abnormalElements: containerElementsAbnormal
      }

    },
    async submitAbnormalSample() {
      try {
        this.objPayload.notes = this.notes
        const response = await this.ACTION_SAMPLE_SAND(this.objPayload)

        this.objPayload = null
        if (response) {
          this.$swal('Success', 'Add sample success, Pengecekan dengan abnormal', 'success')
          this.$router.push('/inspection/sand/historical')
        } else {
          this.$swal('Error', 'Internal Server Error', 'error')
        }
      } catch (error) {
        this.$swal('Error', 'Internal Server Error', 'error')
      }
    },
    async getDetailSandCheck(id) {
      try {
        const response = await this.ACTION_SAMPLE_SAND_DETAIL(id)

        this.data.headers = response?.data?.headers ?? {}
        this.meshElements = response?.data?.elements?.meshElements ?? []
        this.natriumElements = response?.data?.elements?.natriumElements ?? []
        this.dustElement = response?.data?.elements?.dustElement ?? {}
        this.gfnElement = response?.data?.elements?.gfnElement ?? {}
        this.selectedShift(this.data.headers.shiftId)
        this.notes = response?.data?.notes ?? null
        this.isHeaderNotEmpty = response?.data?.headers != null
        this.isElementNotEmpty = response?.data?.elements?.length !== 0
      } catch (error) {
        this.$swal('Error', 'Internal Server Error', 'error')
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
    this.isNightCondition()
    if (this.$route.query.id) {
      this.isSubmitted = true
      this.isSandCheck = true
      this.getDetailSandCheck(this.$route.query.id)
    } else {
      this.ACTION_SAND_ELEMENT()
    }
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
