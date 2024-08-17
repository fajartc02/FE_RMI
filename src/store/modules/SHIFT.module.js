import ApiService from '../services/api.service'
import { ACTION_LOADING } from './LOADING.module'

export const GET_SHIFT = 'GET_SHIFT'
export const SET_SHIFT = 'SET_SHIFT'
export const ACTION_SHIFT = 'ACTION_SHIFT'

export const GET_SHIFT_TREESELECT = 'GET_SHIFT_TREESELECT'

const state = {
  SHIFT_DATA: [],
}

const getters = {
  GET_SHIFT(state) {
    return state.SHIFT_DATA
  },
  GET_SHIFT_TREESELECT(state) {
    // state.SHIFT_DATA.push({ id: 'NONE', name: 'All' })
    return state.SHIFT_DATA.map((shift) => {
      return {
        id: shift.id,
        label: shift.name,
      }
    })
  },
}

const mutations = {
  SET_SHIFT(state, payload) {
    state.SHIFT_DATA = payload
  },
}

const actions = {
  async ACTION_SHIFT({ commit, dispatch }, params) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const { data } = await ApiService.get('shift')
      dispatch(ACTION_LOADING, false)
      commit(SET_SHIFT, data.data)
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
