import ApiService from '../services/api.service'

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
    async ACTION_GAUGE({ commit }, params) {
        try {
            ApiService.setHeader()
<<<<<<< HEAD
            dispatch(ACTION_LOADING, true)
            const { data } = await ApiService.query('gauge/', params)
            dispatch(ACTION_LOADING, false)
=======
            const { data } = await ApiService.query('gauges/', params)

>>>>>>> parent of 932d0c5 (handling all error will comming popup message error)
            commit(SET_GAUGE, data.data)
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