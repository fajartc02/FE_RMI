import moment from 'moment'

export const GET_META = 'GET_META'
export const SET_META = 'SET_META'
export const ACTION_SET_META = 'ACTION_SET_META'

const state = {
    META_DATA: {
        page: 1,
        take: 20,
        itemCount: 5,
        pageCount: 4,
        hasPreviousPage: false,
        hasNextPage: false,
        timestamp: moment().format('YYYY-MM-DD'),
    },
}

const getters = {
    GET_META(state) {
        return state.META_DATA
    },
}

const mutations = {
    SET_META(state, payload) {
        state.META_DATA = {
                ...state.META_DATA,
                ...payload,
            }
            // console.log('metaData', metaData)
    },
}

const actions = {
    async ACTION_SET_META({ commit }, metaData) {
        try {
            commit(SET_META, metaData)
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
