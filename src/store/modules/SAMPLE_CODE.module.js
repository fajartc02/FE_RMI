import ApiService from '../services/api.service'
import { ACTION_LOADING } from './LOADING.module'

export const GET_SAMPLE_CODE = 'GET_SAMPLE_CODE'
export const SET_SAMPLE_CODE = 'SET_SAMPLE_CODE'
export const ACTION_SAMPLE_CODE = 'ACTION_SAMPLE_CODE'

export const ACTION_ADD_SAMPLE_CODE = 'ACTION_ADD_SAMPLE_CODE'
export const ACTION_ADD_SAMPLE_ABNORMAL = 'ACTION_ADD_SAMPLE_ABNORMAL'

export const GET_SAMPLE_CODE_SUGGESTED = 'GET_SAMPLE_CODE_SUGGESTED'
export const GET_SAMPLE_CODE_SUGGESTED_TREESELECT =
  'GET_SAMPLE_CODE_SUGGESTED_TREESELECT'
export const SET_SAMPLE_CODE_SUGGESTED = 'SET_SAMPLE_CODE_SUGGESTED'
export const ACTION_SAMPLE_CODE_SUGGESTED = 'ACTION_SAMPLE_CODE_SUGGESTED'

const state = {
  SAMPLE_CODE_DATA: null,
  SAMPLE_CODE_SUGGESTED: [],
}

const getters = {
  GET_SAMPLE_CODE(state) {
    return state.SAMPLE_CODE_DATA
  },
  GET_SAMPLE_CODE_SUGGESTED(state) {
    return state.SAMPLE_CODE_SUGGESTED
  },
  GET_SAMPLE_CODE_SUGGESTED_TREESELECT(state) {
    return state.SAMPLE_CODE_SUGGESTED.map((item) => {
      return { id: item.id, label: item.sampleCode }
    })
  },
}

const mutations = {
  SET_SAMPLE_CODE(state, payload) {
    state.SAMPLE_CODE_DATA = payload
  },
  SET_SAMPLE_CODE_SUGGESTED(state, payload) {
    state.SAMPLE_CODE_SUGGESTED = payload
  },
}

const actions = {
  async ACTION_SAMPLE_CODE({ commit }, { sampleCode } = null) {
    try {
      ApiService.setHeader()
      if (!sampleCode) {
        commit(SET_SAMPLE_CODE, null)
      } else {
        const { data } = await ApiService.get(`shimadzu`, sampleCode)
        commit(SET_SAMPLE_CODE, data.data)
      }
    } catch (error) {
      console.log(error)
      return error
    }
  },
  async ACTION_ADD_SAMPLE_CODE({ commit }, SAMPLE_CODEData) {
    try {
      ApiService.setHeader()
      const idSample = SAMPLE_CODEData.sampleCode
      delete SAMPLE_CODEData.sampleCode
      const { data } = await ApiService.put(
        `shimadzu/${idSample}`,
        SAMPLE_CODEData,
      )
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  async ACTION_ADD_SAMPLE_ABNORMAL({ commit }, SAMPLE_CODEData) {
    try {
      ApiService.setHeader()
      const idSample = SAMPLE_CODEData.sampleCode
      delete SAMPLE_CODEData.sampleCode
      delete SAMPLE_CODEData.values
      const { data } = await ApiService.put(
        `shimadzu/${idSample}/adjustment`,
        SAMPLE_CODEData,
      )

      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  async ACTION_SAMPLE_CODE_SUGGESTED({ commit, dispatch }, params) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const { data } = await ApiService.query('shimadzu', params)
      console.log(data)

      commit(SET_SAMPLE_CODE_SUGGESTED, data.data)
      dispatch(ACTION_LOADING, false)
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
