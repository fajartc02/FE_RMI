import ApiService from '../services/api.service'
import { ACTION_LOADING } from './LOADING.module'
import { ACTION_SET_META } from './META.module'
import { SET_QR_SAMPLE } from './QR.module'

export const GET_SAMPLE_SAND = 'GET_SAMPLE_SAND'

export const SET_SAMPLE_SAND = 'SET_SAMPLE_SAND'

export const ACTION_SAMPLE_SAND = 'ACTION_SAMPLE_SAND'
export const ACTION_SAMPLE_SAND_HISTORICAL = 'ACTION_SAMPLE_SAND_HISTORICAL'
export const ACTION_SAMPLE_SAND_DETAIL = 'ACTION_SAMPLE_SAND_DETAIL'
export const ADD_SAMPLE_SAND = 'ADD_SAMPLE_SAND'

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
  async ACTION_SAMPLE_SAND({ commit, dispatch }, payload) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      let response = await ApiService.post('sample-sand', payload)
      console.log(response)

      dispatch(ACTION_LOADING, false)
      return response?.data?.status
    } catch (error) {
      dispatch(ACTION_LOADING, false)
      console.error(error)
      return error
    }
  },
  async ACTION_SAMPLE_SAND_HISTORICAL({ commit, dispatch }, params) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const { data } = await ApiService.query('sample-sand/historical', params)
      dispatch(ACTION_LOADING, false)
      console.log('ACTION_SAMPLE_SAND_HISTORICAL', 'data', data)

      commit(SET_SAMPLE_SAND, data.data || [])
      return true
    } catch (error) {
      dispatch(ACTION_LOADING, false)
      console.error(error)
      return error
    }
  },
  async ACTION_SAMPLE_SAND_DETAIL({ dispatch }, id) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const { data } = await ApiService.get('sample-sand', id)
      return data
    } catch (error) {
      return error
    }
  },
  async ADD_SAMPLE_SAND({ commit, dispatch }, payload) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const response = await ApiService.post('sample-sand', payload)
      dispatch(ACTION_LOADING, false)
      return response
    } catch (error) {
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
