import ApiService from '../services/api.service'
import {ACTION_LOADING} from './LOADING.module'
import {ACTION_SET_META} from "@/store/modules/META.module";
import commonUtils from "@/utils/CommonUtils";
import {SET_SYSTEM} from "@/store/modules/SYSTEM.module";

export const GET_VENDOR_SELECT = 'GET_VENDOR_SELECT';
export const GET_VENDOR = 'GET_VENDOR';
export const GET_TBL_VENDOR = 'GET_TBL_VENDOR';
export const SET_VENDOR = 'SET_VENDOR';
export const SET_TBL_VENDOR = 'SET_TBL_VENDOR';
export const ACTION_VENDOR = 'ACTION_VENDOR';
export const ACTION_TBL_VENDOR = 'ACTION_TBL_VENDOR';

export const ACTION_ADD_VENDOR = 'ACTION_ADD_VENDOR';

export const ACTION_EDIT_VENDOR = 'ACTION_EDIT_VENDOR';

export const ACTION_REMOVE_VENDOR = 'ACTION_REMOVE_VENDOR';


const state = {
  VENDOR_DATA: [],
  TBL_VENDOR_DATA: {
    data: null,
    meta: {
      itemsPerPage: 10,
      totalData: 1,
      currentPage: 1,
    },
  }
}

const getters = {
  GET_TBL_VENDOR: (state) => (state.TBL_VENDOR_DATA),
  GET_VENDOR_SELECT(state) {
    const data = [
      ...(state.VENDOR_DATA?.map((item) => {
        return {
          id: item.id,
          label: item.name,
        }
      }) ?? [])
    ];

    console.log('data VENDOR', data)
    return data;
  }
}

const mutations = {
  SET_TBL_VENDOR(state, payload) {
    state.TBL_VENDOR_DATA = payload
  },
  SET_VENDOR(state, payload) {
    state.VENDOR_DATA = payload
  },
}

const actions = {
  async ACTION_VENDOR({commit, dispatch}, params) {
    try {
      ApiService.setHeader()
      const {data} = await ApiService.query('vendor', params)
      commit(SET_VENDOR, data.data)
    } catch (error) {
      console.error('ACTION_VENDOR', 'ERROR', error)
      throw error
    }
  },
  async ACTION_TBL_VENDOR({commit, dispatch}, filter) {
    try {
      dispatch(ACTION_LOADING, true)

      const fetch = async () => {
        ApiService.setHeader()
        console.log('ACTION_TBL_VENDOR', 'filter', filter);
        const {data} = await ApiService.query('vendor', filter)
        console.log('ACTION_TBL_VENDOR', 'data', data);
        const pagination = data.meta.pagination
        pagination ? dispatch(ACTION_SET_META, pagination) : null
        dispatch(ACTION_LOADING, false)
        commit(SET_TBL_VENDOR, data)
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
      console.error('ACTION_TBL_VENDOR', 'ERROR', error)
      throw error;
    }
  },
  async ACTION_ADD_VENDOR({commit, dispatch, state}, params) {
    try {
      delete params.id;
      ApiService.setHeader();
      const {data} = await ApiService.post('vendor', params);
      console.log('ACTION_ADD_VENDOR', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_VENDOR_DATA);
        const loadedVENDOR = [...cloneTbl.data];
        loadedVENDOR.push(params);
        cloneTbl.data = loadedVENDOR;
        commit(SET_TBL_VENDOR, cloneTbl);
      } else {
        dispatch(ACTION_TBL_VENDOR);
      }

    } catch (e) {
      console.error('ACTION_ADD_VENDOR', 'ERROR', e);
      throw e;
    }
  },
  async ACTION_EDIT_VENDOR({commit, dispatch}, VENDORData) {
    try {
      ApiService.setHeader()
      const {data} = await ApiService.put(`vendor/${VENDORData.id}`, VENDORData)
      console.log('ACTION_EDIT_VENDOR', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_VENDOR_DATA);
        const loadedVENDOR = [...cloneTbl.data];
        const updatedIndex = loadedVENDOR.findIndex((VENDOR) => VENDOR.id === VENDORData.id);
        loadedVENDOR[updatedIndex] = VENDORData
        cloneTbl.data = loadedVENDOR;
        commit(SET_TBL_VENDOR, cloneTbl)
      } else {
        dispatch(ACTION_TBL_VENDOR);
      }

    } catch (e) {
      console.error('ACTION_EDIT_VENDOR', 'ERROR', e);
      throw e;
    }
  },
  async ACTION_REMOVE_VENDOR({commit, dispatch}, VENDORData) {
    try {
      ApiService.setHeader()
      const {data} = await ApiService.delete(`vendor/${VENDORData.id}`)
      console.log('ACTION_REMOVE_VENDOR', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_VENDOR_DATA);
        let loadedVENDOR = [...cloneTbl.data];
        loadedVENDOR = loadedVENDOR.filter((VENDOR) => VENDOR.id !== VENDORData.id);
        cloneTbl.data = loadedVENDOR;
        commit(SET_TBL_VENDOR, loadedVENDOR)
      } else {
        dispatch(ACTION_TBL_VENDOR);
      }
    } catch (e) {
      console.error('ACTION_REMOVE_VENDOR', 'ERROR', e);
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
