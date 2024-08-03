import ApiService from '../services/api.service'
import { ACTION_LOADING } from './LOADING.module'

export const GET_MACHINE = 'GET_MACHINE'
export const SET_MACHINE = 'SET_MACHINE'
export const ACTION_MACHINE = 'ACTION_MACHINE'

export const GET_MACHINE_TREESELECT = 'GET_MACHINE_TREESELECT'

const state = {
    MACHINE_DATA: [],
}

const getters = {
    GET_MACHINE(state) {
        return state.MACHINE_DATA
    },
    GET_MACHINE_TREESELECT(state) {
        return state.MACHINE_DATA.map((machine) => {
            return {
                id: machine.id,
                label: machine.name,
            }
        })
    },
}

const mutations = {
    SET_MACHINE(state, payload) {
        state.MACHINE_DATA = payload
    },
}

const actions = {
    async ACTION_MACHINE({ commit, dispatch }, params) {
        try {
            ApiService.setHeader()
            dispatch(ACTION_LOADING, true)
            const { data } = await ApiService.query('machine/', params)
            dispatch(ACTION_LOADING, false)
            commit(SET_MACHINE, data.data)
        } catch (error) {
            dispatch(ACTION_LOADING, false)
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