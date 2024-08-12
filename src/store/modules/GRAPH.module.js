import ApiService from '../services/api.service'
import { ACTION_LOADING } from './LOADING.module'

export const GET_GRAPH = 'GET_GRAPH'
export const SET_GRAPH = 'SET_GRAPH'
export const ACTION_GRAPH = 'ACTION_GRAPH'

const state = {
    GRAPH_DATA: null,
}

const getters = {
    GET_GRAPH(state) {
        return state.GRAPH_DATA
    },
}

const mutations = {
    SET_GRAPH(state, payload) {
        state.GRAPH_DATA = payload
    },
}

const actions = {
    async ACTION_GRAPH({ commit, dispatch }, params) {
        try {
            ApiService.setHeader()
            dispatch(ACTION_LOADING, true)
            const { data } = await ApiService.query('graph/ingot', params)
            dispatch(ACTION_LOADING, false)
            commit(SET_GRAPH, data.data)
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