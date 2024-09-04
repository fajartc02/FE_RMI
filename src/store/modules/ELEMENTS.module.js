import ApiService from '../services/api.service'
import { ACTION_LOADING } from './LOADING.module'

export const GET_ELEMENT = 'GET_ELEMENT'
export const SET_ELEMENT = 'SET_ELEMENT'
// export const ACTION_ELEMENT = 'ACTION_ELEMENT'

export const GET_ELEMENT_INPUT = 'GET_ELEMENT_INPUT'
export const SET_ELEMENT_INPUT = 'SET_ELEMENT_INPUT'
// export const ACTION_ELEMENT_QUERY = 'ACTION_ELEMENT_QUERY'
export const ACTION_SAND_ELEMENT = 'ACTION_SAND_ELEMENT'
export const ACTION_SAND_ELEMENT_GRAPH = 'ACTION_SAND_ELEMENT_GRAPH'
export const ACTION_INGOT_ELEMENT = 'ACTION_INGOT_ELEMENT'

const state = {
  ELEMENT_DATA: [],
  ELEMENT_INPUT: [],
}

const getters = {
  GET_ELEMENT(state) {
    console.log('GET_ELEMENT_STORE', state.ELEMENT_DATA)
    state.ELEMENT_DATA.push({ id: 'NONE', name: 'All' })
    if (state.ELEMENT_DATA && state.ELEMENT_DATA.length > 0) {
      return state.ELEMENT_DATA.map((element) => {
        return {
          ...element,
          id: element.id,
          label: element.name,
          isSelected: false,
        }
      })
    } else {
      return []
    }
  },
  GET_ELEMENT_INPUT(state) {
    return state.ELEMENT_INPUT
  },
}

const mutations = {
  SET_ELEMENT(state, payload) {
    state.ELEMENT_DATA = payload
  },
  SET_ELEMENT_INPUT(state, payload) {
    state.ELEMENT_INPUT = payload
  },
}

const actions = {
  async ACTION_SAND_ELEMENT_GRAPH({ commit, dispatch }, params) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const { data } = await ApiService.query('sand-element', params)
      dispatch(ACTION_LOADING, false)

      let elements = []
      if (data.data) {
        for (const key in data.data) {
          const element = data.data[key]
          if (Array.isArray(element)) {
            for (const keyChild in element) {
              let value = element[keyChild]
              elements.push({ ...value })
            }
          } else {
            elements.push(element)
          }
        }
        commit(SET_ELEMENT, elements)
      } else {
        commit(SET_ELEMENT, [])
      }
    } catch (error) {
      console.error(error)
      dispatch(ACTION_LOADING, false)
      return error
    }
  },
  async ACTION_SAND_ELEMENT({ commit, dispatch }, params) {
    try {
      // commit(SET_ELEMENT_INPUT, [])
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const { data } = await ApiService.query('sand-element', params)
      dispatch(ACTION_LOADING, false)

      if (data.data) {
        commit(SET_ELEMENT_INPUT, data.data)
      } else {
        commit(SET_ELEMENT_INPUT, [])
      }
    } catch (error) {
      console.error(error)
      dispatch(ACTION_LOADING, false)
      return error
    }
  },
  async ACTION_INGOT_ELEMENT({ commit, dispatch }, params) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const { data } = await ApiService.query('ingot-element', params)
      dispatch(ACTION_LOADING, false)

      commit(SET_ELEMENT, data.data)
    } catch (error) {
      console.error(error)
      dispatch(ACTION_LOADING, false)
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
