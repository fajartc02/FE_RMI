import './set-public-path'
import {h, createApp} from 'vue'
import singleSpaVue from 'single-spa-vue'

import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import {iconsSet as icons} from '@/assets/icons'
import VueSweetalert2 from 'vue-sweetalert2'
import vSelect from 'vue-select'
import './styles/sweetalert2.css'
import 'vue-select/dist/vue-select.css'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'
import ApiService from './store/services/api.service'
import MockService from './store/mocks/mock.service'
import VueApexCharts from 'vue3-apexcharts'
import commonUtils from "@/utils/CommonUtils";

if (process.env.VUE_APP_STANDALONE_SINGLE_SPA === 'true') {
  require('@/components/StandAloneStyle.vue')
} else {
  require('@/components/SingleSpaStyle.vue')
}

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {})
    },
  },
  handleInstance(app) {
    ApiService.init()
    if (commonUtils.isMock()) {
      MockService.init()
    }

    app.use(router)
    app.use(store)
    app.use(CoreuiVue)
    app.provide('icons', icons)
    app.use(VueSweetalert2)
    app.component('CIcon', CIcon)
    app.component('v-select', vSelect)
    app.use(HighchartsVue, {
      highcharts: Highcharts,
    })
    app.use(VCalendar, {})
    app.use(VueApexCharts)
  },
})

export const bootstrap = vueLifecycles.bootstrap
export const mount = vueLifecycles.mount
export const unmount = vueLifecycles.unmount
