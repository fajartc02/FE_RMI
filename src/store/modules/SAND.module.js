import ApiService from '../services/api.service'
import { ACTION_LOADING } from './LOADING.module'
import { ACTION_SET_META } from '@/store/modules/META.module'
import commonUtils from '@/utils/CommonUtils'

export const GET_SAND_SELECT = 'GET_SAND_SELECT'
export const GET_SAND_TREESELECT = 'GET_SAND_TREESELECT'
export const GET_TBL_SAND = 'GET_TBL_SAND'
export const SET_TBL_SAND = 'SET_TBL_SAND'
export const SET_SAND = 'SET_SAND'
export const ACTION_SAND = 'ACTION_SAND'
export const ACTION_TBL_SAND = 'ACTION_TBL_SAND'
export const ACTION_ADD_SAND = 'ACTION_ADD_SAND'
export const ACTION_EDIT_SAND = 'ACTION_EDIT_SAND'
export const ACTION_REMOVE_SAND = 'ACTION_REMOVE_SAND'

const state = {
  SAND_DATA: [],
  TBL_SAND_DATA: {
    data: null,
    meta: {
      itemsPerPage: 10,
      totalData: 1,
      currentPage: 1,
    },
  },
}

const getters = {
  GET_TBL_SAND: (state) => state.TBL_SAND_DATA,
  GET_SAND_SELECT(state) {
    return [
      ...(state.SAND_DATA?.map((item) => {
        return {
          id: item.id,
          label: `${item.code}`,
        }
      }) ?? []),
    ]
  },
  GET_SAND_TREESELECT(state) {
    const data = [
      ...(state.SAND_DATA?.map((item) => {
        return {
          id: item.id,
          label: item.name,
        }
      }) ?? []),
    ]

    data.unshift({ id: 'NONE', label: 'All' })

    return data
  },
}

const mutations = {
  SET_TBL_SAND(state, payload) {
    state.TBL_SAND_DATA = payload
  },
  SET_SAND(state, payload) {
    state.SAND_DATA = payload
  },
}

const actions = {
  async ACTION_SAND({ commit, dispatch }, filter) {
    try {
      ApiService.setHeader()
      const { data } = await ApiService.query('sand-element', filter)
      commit(SET_SAND, data.data)
    } catch (error) {
      console.error('ACTION_SAND', 'ERROR', error)
      throw error
    }
  },
  async ACTION_TBL_SAND({ commit, dispatch }, filter) {
    try {
      dispatch(ACTION_LOADING, true)

      const fetch = async () => {
        ApiService.setHeader()
        console.log('ACTION_TBL_SAND', 'filter', filter)
        const { data } = await ApiService.query('sand-element', filter)
        console.log('ACTION_TBL_SAND', 'data', data)
        const pagination = data.meta.pagination
        pagination ? dispatch(ACTION_SET_META, pagination) : null
        dispatch(ACTION_LOADING, false)
        commit(SET_TBL_SAND, data)
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
  async ACTION_ADD_SAND({ commit, dispatch, state }, params) {
    try {
      delete params.id
      ApiService.setHeader()
      const { data } = await ApiService.post('sand-element', {
        ...params,
        elementIndex: parseInt(params.elementIndex),
      })
      console.log('ACTION_ADD_SAND', 'data', data)

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_SAND_DATA)
        const loadedSHIFT = [...cloneTbl.data]
        loadedSHIFT.push(params)
        cloneTbl.data = loadedSHIFT
        commit(SET_TBL_SAND, cloneTbl)
      } else {
        dispatch(ACTION_TBL_SAND)
      }
    } catch (e) {
      console.error('ACTION_ADD_SAND', 'ERROR', e)
      throw e
    }
  },
  async ACTION_EDIT_SAND({ commit, dispatch }, sandData) {
    try {
      ApiService.setHeader()
      const { data } = await ApiService.put(`sand-element/${sandData.id}`, {
        ...sandData,
        elementIndex: parseInt(sandData.elementIndex),
      })
      console.log('ACTION_EDIT_SAND', 'data', data)

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_SAND_DATA)
        const loadedSHIFT = [...cloneTbl.data]
        const updatedIndex = loadedSHIFT.findIndex(
          (SHIFT) => SHIFT.id === sandData.id,
        )
        loadedSHIFT[updatedIndex] = sandData
        cloneTbl.data = loadedSHIFT
        commit(SET_TBL_SAND, cloneTbl)
      } else {
        dispatch(ACTION_TBL_SAND)
      }
    } catch (e) {
      console.error('ACTION_EDIT_SAND', 'ERROR', e)
      throw e
    }
  },
  async ACTION_REMOVE_SAND({ commit, dispatch }, sandData) {
    try {
      ApiService.setHeader()
      const { data } = await ApiService.delete(`sand-element/${sandData.id}`)
      console.log('ACTION_REMOVE_SAND', data)

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_SAND_DATA)
        let loadedSHIFT = [...cloneTbl.data]
        loadedSHIFT = loadedSHIFT.filter((SHIFT) => SHIFT.id !== sandData.id)
        cloneTbl.data = loadedSHIFT
        commit(SET_TBL_SAND, loadedSHIFT)
      } else {
        dispatch(ACTION_TBL_SAND)
      }
    } catch (e) {
      console.error('ACTION_REMOVE_SAND', 'ERROR', e)
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
