import ApiService from '../services/api.service'
import { ACTION_LOADING } from './LOADING.module'

export const GET_LINE = 'GET_LINE'
export const SET_LINE = 'SET_LINE'
export const ACTION_LINE = 'ACTION_LINE'

export const GET_LINE_TREESELECT = 'GET_LINE_TREESELECT'

const state = {
    LINE_DATA: [],
}

const getters = {
    GET_LINE(state) {
        return state.LINE_DATA
    },
    GET_LINE_TREESELECT(state) {
        return state.LINE_DATA.map((line) => {
            return {
                id: line.id,
                label: line.name,
            }
        })
    },
}

const mutations = {
    SET_LINE(state, payload) {
        state.LINE_DATA = payload
    },
}

const actions = {
    async ACTION_LINE({ commit, dispatch }, params) {
        try {
            ApiService.setHeader()
            dispatch(ACTION_LOADING, true)
            const { data } = await ApiService.query('lines/', params)
            commit(SET_LINE, data.data)
            dispatch(ACTION_LOADING, false)
        } catch (error) {
            dispatch(ACTION_LOADING, false)
            throw error.response.data.status.message
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}