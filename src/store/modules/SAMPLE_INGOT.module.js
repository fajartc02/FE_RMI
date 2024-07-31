import ApiService from '../services/api.service'
import { ACTION_LOADING } from './LOADING.module'
import { SET_QR_SAMPLE } from './QR.module'

export const GET_SAMPLE_INGOT = 'GET_SAMPLE_INGOT'
export const SET_SAMPLE_INGOT = 'SET_SAMPLE_INGOT'
export const ACTION_SAMPLE_INGOT = 'ACTION_SAMPLE_INGOT'

export const ACTION_RESET_SAMPLE_INGOT = 'ACTION_RESET_SAMPLE_INGOT'

const state = {
  SAMPLE_INGOT_DATA: {
    headers: null,
    tablePureVendor: null,
    tableIntVendor: null,
  },
}

const getters = {
  GET_SAMPLE_INGOT(state) {
    return state.SAMPLE_INGOT_DATA
  },
}

const mutations = {
  SET_SAMPLE_INGOT(state, payload) {
    state.SAMPLE_INGOT_DATA = payload
  },
}

const actions = {
  async ACTION_SAMPLE_INGOT({ commit, dispatch }, filter) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      console.log(filter)
      const { data } = await ApiService.query('sample-ingot/', filter)
      dispatch(ACTION_LOADING, false)
      commit(SET_QR_SAMPLE, data.data)
    } catch (error) {
      dispatch(ACTION_LOADING, false)
      console.error(error)
      return error
    }
  },
  ACTION_RESET_SAMPLE_INGOT({ commit }) {
    commit(SET_SAMPLE_INGOT, {
      headers: null,
      tablePureVendor: null,
      tableIntVendor: null,
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
