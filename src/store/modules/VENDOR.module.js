import ApiService from '../services/api.service'
import {ACTION_LOADING} from './LOADING.module'
import {ACTION_SET_META} from "@/store/modules/META.module";
import commonUtils from "@/utils/CommonUtils";

export const GET_TBL_VENDOR = 'GET_TBL_VENDOR';

export const SET_TBL_VENDOR = 'SET_TBL_VENDOR';

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
  GET_TBL_VENDOR: (state) => (state.TBL_VENDOR_DATA)
}

const mutations = {
  SET_TBL_VENDOR(state, payload) {
    state.TBL_VENDOR_DATA = payload
  },
}

const actions = {
  async ACTION_TBL_VENDOR({commit, dispatch}, filter) {
    try {
      dispatch(ACTION_LOADING, true)

      const fetch = async () => {
        ApiService.setHeader()
        console.log('ACTION_TBL_VENDOR', 'filter', filter);
        const {data} = await ApiService.query('vendor/list', filter)
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
    }
  },
  async ACTION_ADD_VENDOR({commit, dispatch, state}, params) {
    try {
      ApiService.setHeader();
      dispatch(ACTION_LOADING, true);
      const {data} = await ApiService.query('vendor/add', params);
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
    } finally {
      dispatch(ACTION_LOADING, false);
    }
  },
  async ACTION_EDIT_VENDOR({commit, dispatch}, VENDORData) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const {data} = await ApiService.query('vendor/edit', VENDORData)
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
    } finally {
      dispatch(ACTION_LOADING, false)
    }
  },
  async ACTION_REMOVE_VENDOR({commit, dispatch}, VENDORData) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const {data} = await ApiService.query('vendor/delete', VENDORData)
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
    } catch (error) {
      console.error('ACTION_REMOVE_VENDOR', 'ERROR', e);
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
