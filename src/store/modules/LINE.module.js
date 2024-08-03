import ApiService from '../services/api.service'

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
    async ACTION_LINE({ commit }, params) {
        try {
            ApiService.setHeader()
<<<<<<< HEAD
            dispatch(ACTION_LOADING, true)
            const { data } = await ApiService.query('line', params)
=======
            const { data } = await ApiService.query('lines/', params)
            console.log(data)
>>>>>>> parent of 932d0c5 (handling all error will comming popup message error)
            commit(SET_LINE, data.data)
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