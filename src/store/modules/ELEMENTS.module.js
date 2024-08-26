import ApiService from '../services/api.service'
import { ACTION_LOADING } from './LOADING.module'

export const GET_ELEMENT = 'GET_ELEMENT'
export const SET_ELEMENT = 'SET_ELEMENT'
export const ACTION_ELEMENT = 'ACTION_ELEMENT'

export const GET_ELEMENT_INPUT = 'GET_ELEMENT_INPUT'
export const SET_ELEMENT_INPUT = 'SET_ELEMENT_INPUT'
export const ACTION_ELEMENT_QUERY = 'ACTION_ELEMENT_QUERY'

const state = {
    ELEMENT_DATA: [],
}

const getters = {
    GET_ELEMENT(state) {
        state.ELEMENT_DATA.push({ id: 'NONE', name: 'All' })
        if (state.ELEMENT_DATA.length > 0) {
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
        return state.ELEMENT_DATA
    },
}

const mutations = {
    SET_ELEMENT(state, payload) {
        state.ELEMENT_DATA = payload
    },
    SET_ELEMENT_INPUT(state, payload) {
        state.ELEMENT_DATA = payload
    },
}

const actions = {
    async ACTION_ELEMENT({ commit, dispatch }, params) {
        try {
            ApiService.setHeader()
            dispatch(ACTION_LOADING, true)
            const { data } = await ApiService.get('element', params)
            dispatch(ACTION_LOADING, false)
            commit(SET_ELEMENT, data.data)
        } catch (error) {
            console.error(error)
            dispatch(ACTION_LOADING, false)
            return error
        }
    },
    async ACTION_ELEMENT_QUERY({ commit, dispatch }, params) {
        try {
            ApiService.setHeader()
            dispatch(ACTION_LOADING, true)
            const { data } = await ApiService.query('element', params)
            dispatch(ACTION_LOADING, false)
            commit(SET_ELEMENT_INPUT, data.data)
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
