import ApiService from '../services/api.service'
import {ACTION_LOADING} from './LOADING.module'
import {ACTION_SET_META} from "@/store/modules/META.module";
import commonUtils from "@/utils/CommonUtils";

export const GET_MACHINE = 'GET_MACHINE'
export const GET_TBL_MACHINE = 'GET_TBL_MACHINE'
export const SET_MACHINE = 'SET_MACHINE'
export const SET_TBL_MACHINE = 'SET_TBL_MACHINE'
export const ACTION_MACHINE = 'ACTION_MACHINE'
export const ACTION_TBL_MACHINE = 'ACTION_TBL_MACHINE'
export const ACTION_ADD_MACHINE = "ACTION_ADD_MACHINE";
export const ACTION_EDIT_MACHINE = "ACTION_EDIT_MACHINE";
export const ACTION_REMOVE_MACHINE = "ACTION_REMOVE_MACHINE";
export const GET_MACHINE_TREESELECT = 'GET_MACHINE_TREESELECT'

const state = {
  MACHINE_DATA: [],
  TBL_MACHINE_DATA: {
    data: null,
    meta: {
      itemsPerPage: 10,
      totalData: 1,
      currentPage: 1,
    },
  }
}

const getters = {
  GET_MACHINE(state) {
    return state.MACHINE_DATA
  },
  GET_MACHINE_TREESELECT(state) {
    state.MACHINE_DATA.push({id: 'NONE', name: 'All'})
    return state.MACHINE_DATA.map((machine) => {
      return {
        id: machine.id,
        label: machine.name,
      }
    })
  },
  GET_TBL_MACHINE: state => (state.TBL_MACHINE_DATA),
}

const mutations = {
  SET_MACHINE(state, payload) {
    state.MACHINE_DATA = payload
  },
  SET_TBL_MACHINE(state, payload) {
    state.TBL_MACHINE_DATA = payload;
  },
}

const actions = {
  async ACTION_MACHINE({commit, dispatch}, params) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const {data} = await ApiService.query('machine/', params)
      dispatch(ACTION_LOADING, false)
      commit(SET_MACHINE, data.data)
      return
    } catch (error) {
      dispatch(ACTION_LOADING, false)
      console.error(error)
      return error
    }
  },
  async ACTION_TBL_MACHINE({commit, dispatch}, filter) {
    try {
      dispatch(ACTION_LOADING, true)

      const fetch = async () => {
        ApiService.setHeader()
        console.log('ACTION_TBL_MACHINE', 'filter', filter);
        const {data} = await ApiService.query('machine', filter)
        console.log('ACTION_TBL_MACHINE', 'data', data);
        const pagination = data.meta.pagination
        pagination ? dispatch(ACTION_SET_META, pagination) : null
        commit(SET_TBL_MACHINE, data)
      }

      if (commonUtils.isMock()) {
        setTimeout(async () => {
          await fetch();
          dispatch(ACTION_LOADING, false)
        }, 3000);
      } else {
        await fetch();
        dispatch(ACTION_LOADING, false)
      }

    } catch (e) {
      console.error('ACTION_TBL_MACHINE', 'error', e)
      dispatch(ACTION_LOADING, false)
    }
  },
  async ACTION_ADD_MACHINE({commit, dispatch, state}, params) {
    try {
      ApiService.setHeader()
      const {data} = await ApiService.post(`machine`, params);
      console.log('ACTION_ADD_MACHINE', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_MACHINE_DATA);
        const loaded = [...cloneTbl.data];
        loaded.push(params);
        cloneTbl.data = loaded;
        commit(SET_TBL_MACHINE, cloneTbl)
      } else {
        dispatch(ACTION_TBL_MACHINE);
      }
    } catch (e) {
      console.error('ACTION_ADD_MACHINE', 'error', e)
      throw e;
    }
  },
  async ACTION_EDIT_MACHINE({commit, dispatch, state}, machineData) {
    try {
      ApiService.setHeader()
      const {data} = await ApiService.put(`machine/${machineData.id}`, machineData);
      console.log('ACTION_EDIT_MACHINE', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_MACHINE_DATA);
        const loaded = [...cloneTbl.data];
        const updatedIndex = loaded.findIndex((line) => line.id === machineData.id);
        loaded[updatedIndex] = machineData
        cloneTbl.data = loaded;
        commit(SET_TBL_MACHINE, cloneTbl)
      } else {
        dispatch(ACTION_TBL_MACHINE);
      }
    } catch (e) {
      console.error('ACTION_EDIT_MACHINE', 'error', e)
      return e;
    }
  },
  async ACTION_REMOVE_MACHINE({commit, dispatch, state}, machineData) {
    try {
      ApiService.setHeader()
      const {data} = await ApiService.query('machine/delete', machineData);
      console.log('ACTION_REMOVE_MACHINE', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_MACHINE_DATA);
        let loaded = [...cloneTbl.data];
        loaded = loaded.filter((line) => line.id !== machineData.id);
        cloneTbl.data = loaded;
        commit(SET_TBL_MACHINE, cloneTbl)
      } else {
        dispatch(ACTION_TBL_MACHINE);
      }
    } catch (e) {
      console.error('ACTION_REMOVE_MACHINE', 'error', e)
      return e;
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
