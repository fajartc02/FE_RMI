import ApiService from '../services/api.service'
import {ACTION_LOADING} from './LOADING.module'
import {ACTION_SET_META} from "@/store/modules/META.module";
import commonUtils from "@/utils/CommonUtils";

export const GET_TBL_SYSTEM = 'GET_TBL_SYSTEM';

export const SET_TBL_SYSTEM = 'SET_TBL_SYSTEM';

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
  GET_TBL_SYSTEM: (state) => (state.TBL_SYSTEM_DATA)
}

const mutations = {
  SET_TBL_SYSTEM(state, payload) {
    state.TBL_SYSTEM_DATA = payload
  },
}

const actions = {
  async ACTION_TBL_SYSTEM({commit, dispatch}, filter) {
    try {
      dispatch(ACTION_LOADING, true)

      const fetch = async () => {
        ApiService.setHeader()
        console.log('ACTION_TBL_SYSTEM', 'filter', filter);
        const {data} = await ApiService.query('system/list', filter)
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
    }
  },
  async ACTION_ADD_SYSTEM({commit, dispatch, state}, params) {
    try {
      ApiService.setHeader();
      dispatch(ACTION_LOADING, true);
      const {data} = await ApiService.query('system/add', params);
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
    } finally {
      dispatch(ACTION_LOADING, false);
    }
  },
  async ACTION_EDIT_SYSTEM({commit, dispatch}, SYSTEMData) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const {data} = await ApiService.query('system/edit', SYSTEMData)
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
    } finally {
      dispatch(ACTION_LOADING, false)
    }
  },
  async ACTION_REMOVE_SYSTEM({commit, dispatch}, SYSTEMData) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const {data} = await ApiService.query('system/delete', SYSTEMData)
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
    } catch (error) {
      console.error('ACTION_REMOVE_SYSTEM', 'ERROR', e);
    } finally {
      dispatch(ACTION_LOADING, false)
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}