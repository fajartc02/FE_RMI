import {createStore} from 'vuex'
import QRModule from './modules/QR.module'
import LOADINGModule from './modules/LOADING.module'
import AUTHModule from './modules/AUTH.module'
import SAMPLE_CODEModule from './modules/SAMPLE_CODE.module'
import GAUGEModule from './modules/GAUGE.module'
import SAMPLE_INGOTModule from './modules/SAMPLE_INGOT.module'

import MACHINEModule from './modules/MACHINE.module'
import LINEModule from './modules/LINE.module'
import METAModule from './modules/META.module'
import ELEMENTSModule from './modules/ELEMENTS.module'
import GRAPHModule from './modules/GRAPH.module'
import SHIFTModule from './modules/SHIFT.module'
import SAMPLE_SANDModule from './modules/SAMPLE_SAND.module'
import STANDARD_INGOTModule from "./modules/STANDARD_INGOT.module";
import STANDARD_SANDModule from "./modules/STANDARD_SAND.module";
import SYSTEMModule from "./modules/SYSTEM.module";
import USERModule from "./modules/USER.module";
import VENDORModule from "./modules/VENDOR.module";
import SANDModule from "@/store/modules/SAND.module";
import INGOTModule from "@/store/modules/INGOT.module";
import MODALS from "@/store/modules/MODALS.module";

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
  modules: {
    METAModule,
    AUTHModule,
    LOADINGModule,

    MACHINEModule,
    LINEModule,
    SHIFTModule,

    QRModule,
    SAMPLE_CODEModule,
    GAUGEModule,
    SAMPLE_INGOTModule,
    ELEMENTSModule,
    GRAPHModule,
    SAMPLE_SANDModule,
    STANDARD_INGOTModule,
    STANDARD_SANDModule,
    SYSTEMModule,
    USERModule,
    VENDORModule,
    SANDModule,
    INGOTModule,
    MODALS
  },
})
