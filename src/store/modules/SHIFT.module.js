import ApiService from '../services/api.service'
import {ACTION_LOADING} from './LOADING.module'
import {ACTION_SET_META} from "@/store/modules/META.module";
import commonUtils from "@/utils/CommonUtils";

export const GET_SHIFT = 'GET_SHIFT';
export const GET_SHIFT_TREESELECT = 'GET_SHIFT_TREESELECT';
export const GET_TBL_SHIFT = 'GET_TBL_SHIFT';
export const SET_SHIFT = 'SET_SHIFT';
export const SET_TBL_SHIFT = 'SET_TBL_SHIFT';
export const ACTION_SHIFT = 'ACTION_SHIFT';
export const ACTION_TBL_SHIFT = 'ACTION_TBL_SHIFT';
export const ACTION_ADD_SHIFT = 'ACTION_ADD_SHIFT';
export const ACTION_EDIT_SHIFT = 'ACTION_EDIT_SHIFT';
export const ACTION_REMOVE_SHIFT = 'ACTION_REMOVE_SHIFT';


const state = {
  SHIFT_DATA: [],
  TBL_SHIFT_DATA: {
    data: null,
    meta: {
      itemsPerPage: 10,
      totalData: 1,
      currentPage: 1,
    },
  }
}

const getters = {
  GET_SHIFT(state) {
    return state.SHIFT_DATA
  },
  GET_SHIFT_TREESELECT(state) {
    if ((state.SHIFT_DATA ?? []).length === 0) {
      return [
        {id: 'NONE', name: 'All'},
      ];
    }
    state.SHIFT_DATA.push({id: 'NONE', name: 'All'})
    return state.SHIFT_DATA.map((shift) => {
      return {
        id: shift.id,
        label: shift.name,
      }
    })
  },
  GET_TBL_SHIFT: (state) => (state.TBL_SHIFT_DATA)
}

const mutations = {
  SET_SHIFT(state, payload) {
    state.SHIFT_DATA = payload
  },
  SET_TBL_SHIFT(state, payload) {
    state.TBL_SHIFT_DATA = payload
  },
}

const actions = {
  async ACTION_SHIFT({commit, dispatch}, params) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const {data} = await ApiService.get('shift')
      dispatch(ACTION_LOADING, false)
      commit(SET_SHIFT, data.data)
    } catch (error) {
      dispatch(ACTION_LOADING, false)
      console.error(error)
      return error
    }
  },
  async ACTION_TBL_SHIFT({commit, dispatch}, filter) {
    try {
      dispatch(ACTION_LOADING, true)

      const fetch = async () => {
        ApiService.setHeader()
        console.log('ACTION_TBL_SHIFT', 'filter', filter);
        const {data} = await ApiService.query('shift', filter)
        console.log('ACTION_TBL_SHIFT', 'data', data);
        const pagination = data.meta.pagination
        pagination ? dispatch(ACTION_SET_META, pagination) : null
        dispatch(ACTION_LOADING, false)
        commit(SET_TBL_SHIFT, data)
      }

      if (commonUtils.isMock()) {
        setTimeout(() => {
          fetch();
        }, 3000);
      } else {
        await fetch();
      }


    } catch (error) {
      dispatch(ACTION_LOADING, false)
      console.error(error)
      return error
    }
  },
  async ACTION_ADD_SHIFT({commit, dispatch, state}, params) {
    try {
      delete params.id;
      ApiService.setHeader();
      const {data} = await ApiService.post('shift', params);
      console.log('ACTION_ADD_SHIFT', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_SHIFT_DATA);
        const loadedSHIFT = [...cloneTbl.data];
        loadedSHIFT.push(params);
        cloneTbl.data = loadedSHIFT;
        commit(SET_TBL_SHIFT, cloneTbl);
      } else {
        dispatch(ACTION_TBL_SHIFT);
      }

    } catch (e) {
      console.error('ACTION_ADD_SHIFT', 'ERROR', e);
      throw e;
    }
  },
  async ACTION_EDIT_SHIFT({commit, dispatch}, SHIFTData) {
    try {
      const id = SHIFTData.id;
      delete SHIFTData.id;

      ApiService.setHeader()
      const {data} = await ApiService.put(`shift/${id}`, SHIFTData)
      console.log('ACTION_EDIT_SHIFT', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_SHIFT_DATA);
        const loadedSHIFT = [...cloneTbl.data];
        const updatedIndex = loadedSHIFT.findIndex((SHIFT) => SHIFT.id === SHIFTData.id);
        loadedSHIFT[updatedIndex] = SHIFTData
        cloneTbl.data = loadedSHIFT;
        commit(SET_TBL_SHIFT, cloneTbl)
      } else {
        dispatch(ACTION_TBL_SHIFT);
      }

    } catch (e) {
      console.error('ACTION_EDIT_SHIFT', 'ERROR', e);
      throw e;
    }
  },
  async ACTION_REMOVE_SHIFT({commit, dispatch}, SHIFTData) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const {data} = await ApiService.delete(`shift/${SHIFTData.id}`)
      console.log('ACTION_REMOVE_SHIFT', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_SHIFT_DATA);
        let loadedSHIFT = [...cloneTbl.data];
        loadedSHIFT = loadedSHIFT.filter((SHIFT) => SHIFT.id !== SHIFTData.id);
        cloneTbl.data = loadedSHIFT;
        commit(SET_TBL_SHIFT, loadedSHIFT)
      } else {
        dispatch(ACTION_TBL_SHIFT);
      }
    } catch (e) {
      console.error('ACTION_REMOVE_SHIFT', 'ERROR', e);
      throw e;
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
