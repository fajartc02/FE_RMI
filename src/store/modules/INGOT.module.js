import ApiService from '../services/api.service'
import { ACTION_LOADING } from './LOADING.module'
import { ACTION_SET_META } from '@/store/modules/META.module'
import commonUtils from '@/utils/CommonUtils'
import { SET_LINE } from '@/store/modules/LINE.module'

export const GET_INGOT_SELECT = 'GET_INGOT_SELECT'
export const GET_INGOT_TREESELECT = 'GET_INGOT_TREESELECT'
export const GET_TBL_INGOT = 'GET_TBL_INGOT'
export const SET_TBL_INGOT = 'SET_TBL_INGOT'
export const SET_INGOT = 'SET_INGOT'
export const ACTION_INGOT = 'ACTION_INGOT'
export const ACTION_TBL_INGOT = 'ACTION_TBL_INGOT'
export const ACTION_ADD_INGOT = 'ACTION_ADD_INGOT'
export const ACTION_EDIT_INGOT = 'ACTION_EDIT_INGOT'
export const ACTION_REMOVE_INGOT = 'ACTION_REMOVE_INGOT'

const mappingPayload = (param) => {
  return {
    ...param,
    atomicNumber: parseInt(param.atomicNumber),
    budomari: parseInt(param.budomari),
    weightMolten: parseInt(param.weightMolten),
  }
}

const state = {
  INGOT_DATA: [],
  TBL_INGOT_DATA: {
    data: null,
    meta: {
      itemsPerPage: 10,
      totalData: 1,
      currentPage: 1,
    },
  },
}

const getters = {
  GET_TBL_INGOT: (state) => state.TBL_INGOT_DATA,
  GET_INGOT_SELECT(state) {
    return [
      ...(state.INGOT_DATA?.map((item) => {
        return {
          id: item.id,
          label: `${item.code}-${item.name}`,
        }
      }) ?? []),
    ]
  },
  GET_INGOT_TREESELECT(state) {
    const data = [
      ...(state.INGOT_DATA?.map((item) => {
        return {
          id: item.id,
          label: `${item.code}-${item.name}`,
        }
      }) ?? []),
    ]

    data.unshift({ id: 'NONE', label: 'All' })

    return data
  },
}

const mutations = {
  SET_TBL_INGOT(state, payload) {
    state.TBL_INGOT_DATA = payload
  },
  SET_INGOT(state, payload) {
    state.INGOT_DATA = payload
  },
}

const actions = {
  async ACTION_INGOT({ commit, dispatch }, filter = null) {
    try {
      ApiService.setHeader()
      const { data } = await ApiService.query(
        'ingot-element',
        filter || { take: 50 },
      )
      commit(SET_INGOT, data.data)
    } catch (error) {
      console.error('ACTION_INGOT', 'ERROR', error)
      throw error
    }
  },
  async ACTION_TBL_INGOT({ commit, dispatch }, filter) {
    try {
      dispatch(ACTION_LOADING, true)

      const fetch = async () => {
        ApiService.setHeader()
        console.log('ACTION_TBL_INGOT', 'filter', filter)
        const { data } = await ApiService.query('ingot-element', filter)
        console.log('ACTION_TBL_INGOT', 'data', data)
        const pagination = data.meta.pagination
        pagination ? dispatch(ACTION_SET_META, pagination) : null
        dispatch(ACTION_LOADING, false)
        commit(SET_TBL_INGOT, data)
      }

      if (commonUtils.isMock()) {
        setTimeout(() => {
          fetch()
        }, 3000)
      } else {
        await fetch()
      }
    } catch (error) {
      dispatch(ACTION_LOADING, false)
      console.error(error)
      return error
    }
  },
  async ACTION_ADD_INGOT({ commit, dispatch, state }, params) {
    try {
      delete params.id
      ApiService.setHeader()
      const { data } = await ApiService.post(
        'ingot-element',
        mappingPayload(params),
      )
      console.log('ACTION_ADD_INGOT', 'data', data)

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_INGOT_DATA)
        const loadedSHIFT = [...cloneTbl.data]
        loadedSHIFT.push(params)
        cloneTbl.data = loadedSHIFT
        commit(SET_TBL_INGOT, cloneTbl)
      } else {
        dispatch(ACTION_TBL_INGOT)
      }
    } catch (e) {
      console.error('ACTION_ADD_INGOT', 'ERROR', e)
      throw e
    }
  },
  async ACTION_EDIT_INGOT({ commit, dispatch }, ingotData) {
    try {
      ApiService.setHeader()
      const { data } = await ApiService.put(
        `ingot-element/${ingotData.id}`,
        mappingPayload(ingotData),
      )
      console.log('ACTION_EDIT_INGOT', 'data', data)

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_INGOT_DATA)
        const loadedSHIFT = [...cloneTbl.data]
        const updatedIndex = loadedSHIFT.findIndex(
          (SHIFT) => SHIFT.id === ingotData.id,
        )
        loadedSHIFT[updatedIndex] = ingotData
        cloneTbl.data = loadedSHIFT
        commit(SET_TBL_INGOT, cloneTbl)
      } else {
        dispatch(ACTION_TBL_INGOT)
      }
    } catch (e) {
      console.error('ACTION_EDIT_INGOT', 'ERROR', e)
      throw e
    }
  },
  async ACTION_REMOVE_INGOT({ commit, dispatch }, ingotData) {
    try {
      ApiService.setHeader()
      const { data } = await ApiService.delete(`ingot-element/${ingotData.id}`)
      console.log('ACTION_REMOVE_INGOT', data)

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_INGOT_DATA)
        let loadedSHIFT = [...cloneTbl.data]
        loadedSHIFT = loadedSHIFT.filter((SHIFT) => SHIFT.id !== ingotData.id)
        cloneTbl.data = loadedSHIFT
        commit(SET_TBL_INGOT, loadedSHIFT)
      } else {
        dispatch(ACTION_TBL_INGOT)
      }
    } catch (e) {
      console.error('ACTION_REMOVE_INGOT', 'ERROR', e)
      throw e
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
