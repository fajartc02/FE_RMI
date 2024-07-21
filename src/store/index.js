import { createStore } from 'vuex'
import QRModule from './modules/QR.module'
import LOADINGModule from './modules/LOADING.module'
import AUTHModule from './modules/AUTH.module'

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
    AUTHModule,
    LOADINGModule,

    QRModule,
  },
})
