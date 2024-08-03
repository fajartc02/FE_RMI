export const IS_LOADING = 'IS_LOADING'
export const SET_LOADING = 'SET_LOADING'
export const ACTION_LOADING = 'ACTION_LOADING'

const state = {
    IS_LOADING: false,
}

const getters = {
    IS_LOADING(state) {
        return state.IS_LOADING
    },
}

const mutations = {
    SET_LOADING(state, payload) {
        state.IS_LOADING = payload
    },
}

const actions = {
    async ACTION_LOADING({ commit }, payload) {
        try {
            commit(SET_LOADING, payload)
        } catch (error) {
            console.error(error)
            throw error
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}