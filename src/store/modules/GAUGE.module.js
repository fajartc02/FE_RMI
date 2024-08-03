import ApiService from '../services/api.service'
import { ACTION_LOADING } from './LOADING.module'

export const GET_GAUGE = 'GET_GAUGE'
export const SET_GAUGE = 'SET_GAUGE'
export const ACTION_GAUGE = 'ACTION_GAUGE'

const state = {
    GAUGE_DATA: [],
}

const getters = {
    GET_GAUGE(state) {
        return state.GAUGE_DATA
    },
}

const mutations = {
    SET_GAUGE(state, payload) {
        state.GAUGE_DATA = payload
    },
}

const actions = {
    async ACTION_GAUGE({ commit, dispatch }, params) {
        try {
            ApiService.setHeader()
            dispatch(ACTION_LOADING, true)
            const { data } = await ApiService.query('gauge/', params)
            dispatch(ACTION_LOADING, false)
            commit(SET_GAUGE, data.data)
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