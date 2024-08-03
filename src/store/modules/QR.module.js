import ApiService from '../services/api.service'

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
    async ACTION_QR_SAMPLE({ commit }, QR_SAMPLEData = null) {
        try {
            await ApiService.setHeader()
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
        } catch (error) {
            // console.log(error.response.data.status.message)
            throw error.response.data.status.message
        }
    },
    ACTION_RESET_QR_SAMPLE({ commit }) {
        commit(SET_QR_SAMPLE, {
            headers: null,
            tablePureVendor: null,
            tableInternalVendor: null,
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}