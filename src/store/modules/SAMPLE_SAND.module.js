import ApiService from '../services/api.service'
import { ACTION_LOADING } from './LOADING.module'
import { ACTION_SET_META } from './META.module'
import { SET_QR_SAMPLE } from './QR.module'

export const GET_SAMPLE_SAND = 'GET_SAMPLE_SAND'

export const SET_SAMPLE_SAND = 'SET_SAMPLE_SAND'

export const ACTION_SAMPLE_SAND = 'ACTION_SAMPLE_SAND'

const state = {
  SAMPLE_SAND_DATA: [],
}

const getters = {
  GET_SAMPLE_SAND(state) {
    return state.SAMPLE_SAND_DATA
  },
}

const mutations = {
  SET_SAMPLE_SAND(state, payload) {
    state.SAMPLE_SAND_DATA = payload
  },
}

const actions = {
  async ACTION_SAMPLE_SAND({ commit, dispatch }, params) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const { data } = await ApiService.query('sample-sand/historical', params)
      commit(SET_SAMPLE_SAND, data?.data || [])
      dispatch(ACTION_LOADING, false)
    } catch (error) {
      dispatch(ACTION_LOADING, false)
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
