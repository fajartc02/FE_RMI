import ApiService from '../services/api.service'
import { ACTION_LOADING } from './LOADING.module'

export const GET_QR_SAMPLE = 'GET_QR_SAMPLE'
export const SET_QR_SAMPLE = 'SET_QR_SAMPLE'
export const ACTION_QR_SAMPLE = 'ACTION_QR_SAMPLE'

export const ACTION_RESET_QR_SAMPLE = 'ACTION_RESET_QR_SAMPLE'

const state = {
    QR_SAMPLE_DATA: {
        headers: null,
        tablePureVendor: null,
        tableInternalVendor: null,
    },
}

const getters = {
    GET_QR_SAMPLE(state) {
        return state.QR_SAMPLE_DATA
    },
}

const mutations = {
    SET_QR_SAMPLE(state, payload) {
        state.QR_SAMPLE_DATA = payload
    },
}

const actions = {
    async ACTION_QR_SAMPLE({ commit, dispatch }, QR_SAMPLEData = null) {
        try {
            ApiService.setHeader()
            dispatch(ACTION_LOADING, true)
            if (QR_SAMPLEData) {
                const { data } = await ApiService.post('sample-ingot', QR_SAMPLEData)
                commit(SET_QR_SAMPLE, data.data)
            } else {
                commit(SET_QR_SAMPLE, {
                    headers: null,
                    tablePureVendor: null,
                    tableInternalVendor: null,
                })
            }
            dispatch(ACTION_LOADING, false)
        } catch (error) {
            dispatch(ACTION_LOADING, false)
            throw error.response.data.status.message
        }
    },
    ACTION_RESET_QR_SAMPLE({ commit, dispatch }) {
        dispatch(ACTION_LOADING, true)
        commit(SET_QR_SAMPLE, {
            headers: null,
            tablePureVendor: null,
            tableInternalVendor: null,
        })
        dispatch(ACTION_LOADING, false)
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}