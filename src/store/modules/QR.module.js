import ApiService from '../services/api.service'
import { SET_LOADING } from './LOADING.module'

export const GET_QR_SAMPLE = 'GET_QR_SAMPLE'
export const SET_QR_SAMPLE = 'SET_QR_SAMPLE'
export const ACTION_QR_SAMPLE = 'ACTION_QR_SAMPLE'

const state = {
  QR_SAMPLE_DATA: [],
}

const getters = {
  GET_QR_SAMPLE(state) {
    return state.QR_SAMPLE_DATA
  },
}

const mutations = {
  SET_QR_SAMPLE(state, payload) {
    state.QR_SAMPLE_DATA = payload
  },
}

const actions = {
  async ACTION_QR_SAMPLE({ commit }, QR_SAMPLEData) {
    try {
      commit(SET_LOADING, true)
      const response = await ApiService.post('sample-scanner', QR_SAMPLEData)
      commit(SET_QR_SAMPLE, response)
      commit(SET_LOADING, false)
    } catch (error) {
      console.error(error)
      return error
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
