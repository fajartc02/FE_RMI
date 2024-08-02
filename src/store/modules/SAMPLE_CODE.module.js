import ApiService from '../services/api.service'

export const GET_SAMPLE_CODE = 'GET_SAMPLE_CODE'
export const SET_SAMPLE_CODE = 'SET_SAMPLE_CODE'
export const ACTION_SAMPLE_CODE = 'ACTION_SAMPLE_CODE'

export const ACTION_ADD_SAMPLE_CODE = 'ACTION_ADD_SAMPLE_CODE'

export const GET_SAMPLE_CODE_SUGGESTED = 'GET_SAMPLE_CODE_SUGGESTED'
export const SET_SAMPLE_CODE_SUGGESTED = 'SET_SAMPLE_CODE_SUGGESTED'
export const ACTION_SAMPLE_CODE_SUGGESTED = 'ACTION_SAMPLE_CODE_SUGGESTED'

const state = {
    SAMPLE_CODE_DATA: null,
    SAMPLE_CODE_SUGGESTED: [],
}

const getters = {
    GET_SAMPLE_CODE(state) {
        return state.SAMPLE_CODE_DATA
    },
    GET_SAMPLE_CODE_SUGGESTED(state) {
        return state.SAMPLE_CODE_SUGGESTED
    },
}

const mutations = {
    SET_SAMPLE_CODE(state, payload) {
        state.SAMPLE_CODE_DATA = payload
    },
    SET_SAMPLE_CODE_SUGGESTED(state, payload) {
        state.SAMPLE_CODE_SUGGESTED = payload
    },
}

const actions = {
    async ACTION_SAMPLE_CODE({ commit }, { sampleCode } = null) {
        try {
            ApiService.setHeader()
            if (!sampleCode) {
                commit(SET_SAMPLE_CODE, null)
            } else {
                const { data } = await ApiService.get(`shimadzu`, sampleCode)
                commit(SET_SAMPLE_CODE, data.data)
            }
        } catch (error) {
            console.log(error)
            return error
        }
    },
    async ACTION_ADD_SAMPLE_CODE({ commit }, SAMPLE_CODEData) {
        try {
            ApiService.setHeader()
            const idSample = SAMPLE_CODEData.sampleCode
            delete SAMPLE_CODEData.sampleCode
            const { data } = await ApiService.put(
                `sample-ingot/${idSample}`,
                SAMPLE_CODEData,
            )
            return data
        } catch (error) {
            console.error(error)
            return error
        }
    },
    async ACTION_SAMPLE_CODE_SUGGESTED({ commit }, gaugeId) {
        try {
            ApiService.setHeader()
            const { data } = await ApiService.get('shimadzu', gaugeId)
            commit(SET_SAMPLE_CODE_SUGGESTED, data.data)
        } catch (error) {
            console.error(error)
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