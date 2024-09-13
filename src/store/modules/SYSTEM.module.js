import ApiService from '../services/api.service'
import {ACTION_LOADING} from './LOADING.module'
import {ACTION_SET_META} from "@/store/modules/META.module";
import commonUtils from "@/utils/CommonUtils";

export const SYSTEM_TYPE = {
  INCHARGE_TYPE: 'INCHARGE_TYPE',
};

export const GET_SYSTEM_SELECT = "GET_SYSTEM_SELECT";
export const GET_TBL_SYSTEM = 'GET_TBL_SYSTEM';
export const SET_SYSTEM = 'SET_SYSTEM';
export const SET_TBL_SYSTEM = 'SET_TBL_SYSTEM';
export const ACTION_SYSTEM = 'ACTION_SYSTEM';
export const ACTION_TBL_SYSTEM = 'ACTION_TBL_SYSTEM';

export const ACTION_ADD_SYSTEM = 'ACTION_ADD_SYSTEM';

export const ACTION_EDIT_SYSTEM = 'ACTION_EDIT_SYSTEM';

export const ACTION_REMOVE_SYSTEM = 'ACTION_REMOVE_SYSTEM';


const state = {
  SYSTEM_DATA: [],
  TBL_SYSTEM_DATA: {
    data: null,
    meta: {
      itemsPerPage: 10,
      totalData: 1,
      currentPage: 1,
    },
  }
}

const getters = {
  GET_SYSTEM_SELECT(state) {
    const data = [...(state.SYSTEM_DATA?.map((item) => {
      return {
        id: item.value,
        label: item.value,
      }
    }) ?? [])];

    data.unshift({id: '', label: 'Select Value'});

    return data;
  },
  GET_TBL_SYSTEM(state) {
    return state.TBL_SYSTEM_DATA;
  },
}

const mutations = {
  SET_TBL_SYSTEM(state, payload) {
    state.TBL_SYSTEM_DATA = payload
  },
  SET_SYSTEM(state, payload) {
    state.SYSTEM_DATA = payload
  },
}

const actions = {
  async ACTION_SYSTEM({commit, dispatch}, params) {
    try {
      ApiService.setHeader()
      const {data} = await ApiService.query('system', params)
      commit(SET_SYSTEM, data.data)
    } catch (error) {
      console.error('ACTION_SYSTEM', 'ERROR', error);
      if (params?.type?.toLowerCase() === 'material') {
        commit(SET_SYSTEM, [
          {
            type: 'Sand001',
            value: 'Sand'
          },
          {
            type: 'Ingot001',
            value: 'Ingot'
          }
        ]);
      }
      //throw error
    }
  },
  async ACTION_TBL_SYSTEM({commit, dispatch}, filter) {
    try {
      dispatch(ACTION_LOADING, true);

      const fetch = async () => {
        ApiService.setHeader()
        console.log('ACTION_TBL_SYSTEM', 'filter', filter);
        const {data} = await ApiService.query('system', filter)
        console.log('ACTION_TBL_SYSTEM', 'data', data);
        const pagination = data.meta.pagination
        pagination ? dispatch(ACTION_SET_META, pagination) : null
        dispatch(ACTION_LOADING, false)
        commit(SET_TBL_SYSTEM, data)
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
      console.error('ACTION_TBL_SYSTEM', 'ERROR', error)
      throw error;
    }
  },
  async ACTION_ADD_SYSTEM({commit, dispatch, state}, params) {
    try {
      delete params.id;
      ApiService.setHeader();
      const {data} = await ApiService.post('system', params);
      console.log('ACTION_ADD_SYSTEM', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_SYSTEM_DATA);
        const loadedSYSTEM = [...cloneTbl.data];
        loadedSYSTEM.push(params);
        cloneTbl.data = loadedSYSTEM;
        commit(SET_TBL_SYSTEM, cloneTbl);
      } else {
        dispatch(ACTION_TBL_SYSTEM);
      }

    } catch (e) {
      console.error('ACTION_ADD_SYSTEM', 'ERROR', e);
      throw e;
    }
  },
  async ACTION_EDIT_SYSTEM({commit, dispatch}, SYSTEMData) {
    try {
      const id = SYSTEMData.id;
      delete SYSTEMData.id;

      ApiService.setHeader()
      const {data} = await ApiService.put(`system/${id}`, SYSTEMData)
      console.log('ACTION_EDIT_SYSTEM', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_SYSTEM_DATA);
        const loadedSYSTEM = [...cloneTbl.data];
        const updatedIndex = loadedSYSTEM.findIndex((SYSTEM) => SYSTEM.id === SYSTEMData.id);
        loadedSYSTEM[updatedIndex] = SYSTEMData
        cloneTbl.data = loadedSYSTEM;
        commit(SET_TBL_SYSTEM, cloneTbl)
      } else {
        dispatch(ACTION_TBL_SYSTEM);
      }

    } catch (e) {
      console.error('ACTION_EDIT_SYSTEM', 'ERROR', e);
      throw e;
    }
  },
  async ACTION_REMOVE_SYSTEM({commit, dispatch}, SYSTEMData) {
    try {
      ApiService.setHeader()
      const {data} = await ApiService.delete(`system/${SYSTEMData.id}`)
      console.log('ACTION_REMOVE_SYSTEM', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_SYSTEM_DATA);
        let loadedSYSTEM = [...cloneTbl.data];
        loadedSYSTEM = loadedSYSTEM.filter((SYSTEM) => SYSTEM.id !== SYSTEMData.id);
        cloneTbl.data = loadedSYSTEM;
        commit(SET_TBL_SYSTEM, loadedSYSTEM)
      } else {
        dispatch(ACTION_TBL_SYSTEM);
      }
    } catch (e) {
      console.error('ACTION_REMOVE_SYSTEM', 'ERROR', e);
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
