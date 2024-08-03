import ApiService from '../services/api.service'
import { ACTION_LOADING } from './LOADING.module'
import { SET_QR_SAMPLE } from './QR.module'

export const GET_SAMPLE_INGOT = 'GET_SAMPLE_INGOT'
export const GET_SAMPLE_INGOT_HISTORICAL = 'GET_SAMPLE_INGOT_HISTORICAL'

export const SET_SAMPLE_INGOT = 'SET_SAMPLE_INGOT'
export const SET_SAMPLE_INGOT_HISTORICAL = 'SET_SAMPLE_INGOT_HISTORICAL'

export const ACTION_SAMPLE_INGOT = 'ACTION_SAMPLE_INGOT'
export const ACTION_RESET_SAMPLE_INGOT = 'ACTION_RESET_SAMPLE_INGOT'
export const ACTION_SAMPLE_INGOT_HISTORICAL = 'ACTION_SAMPLE_INGOT_HISTORICAL'
export const ACTION_SAMPLE_INGOT_HISTORICAL_DETAIL =
    'ACTION_SAMPLE_INGOT_HISTORICAL_DETAIL'

const state = {
    SAMPLE_INGOT_DATA: {
        headers: null,
        tablePureVendor: null,
        tableInternalVendor: null,
    },
    SAMPLE_INGOT_HISTORICAL: {
        data: null,
        meta: {
            itemsPerPage: 10,
            totalData: 1,
            currentPage: 1,
        },
    },
}

const getters = {
    GET_SAMPLE_INGOT(state) {
        return state.SAMPLE_INGOT_DATA
    },
    GET_SAMPLE_INGOT_HISTORICAL(state) {
        return state.SAMPLE_INGOT_HISTORICAL
    },
}

const mutations = {
    SET_SAMPLE_INGOT(state, payload) {
        state.SAMPLE_INGOT_DATA = payload
    },
    SET_SAMPLE_INGOT_HISTORICAL(state, payload) {
        state.SAMPLE_INGOT_HISTORICAL.data = payload.data
        state.SAMPLE_INGOT_HISTORICAL.meta = payload.meta
    },
}

const actions = {
    async ACTION_SAMPLE_INGOT({ commit, dispatch }, filter) {
        try {
            ApiService.setHeader()
            dispatch(ACTION_LOADING, true)
            const { data } = await ApiService.query('sample-ingot/', filter)
            dispatch(ACTION_LOADING, false)
            commit(SET_QR_SAMPLE, data.data)
        } catch (error) {
            dispatch(ACTION_LOADING, false)
            throw error.response.data.status.message
        }
    },
    ACTION_RESET_SAMPLE_INGOT({ commit, dispatch }) {
        dispatch(ACTION_LOADING, true)
        commit(SET_SAMPLE_INGOT, {
            headers: null,
            tablePureVendor: null,
            tableInternalVendor: null,
        })
        dispatch(ACTION_LOADING, false)
    },
    async ACTION_SAMPLE_INGOT_HISTORICAL({ commit, dispatch }, filter) {
        try {
            ApiService.setHeader()
            dispatch(ACTION_LOADING, true)
            const { data } = await ApiService.query('sample-ingot/historical', filter)
            dispatch(ACTION_LOADING, false)
            commit(SET_SAMPLE_INGOT_HISTORICAL, data)
        } catch (error) {
            dispatch(ACTION_LOADING, false)
            throw error.response.data.status.message
        }
    },
    async ACTION_SAMPLE_INGOT_HISTORICAL_DETAIL({ commit, dispatch }, sampleId) {
        try {
            ApiService.setHeader()
            dispatch(ACTION_LOADING, true)
            const { data } = await ApiService.get(`sample-ingot/historical`, sampleId)
            dispatch(ACTION_LOADING, false)
            commit(SET_QR_SAMPLE, data.data)
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