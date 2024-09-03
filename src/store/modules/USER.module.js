import ApiService from '../services/api.service'
import {ACTION_LOADING} from './LOADING.module'
import {ACTION_SET_META} from "@/store/modules/META.module";
import commonUtils from "@/utils/CommonUtils";

export const GET_TBL_USER = 'GET_TBL_USER';

export const SET_TBL_USER = 'SET_TBL_USER';

export const ACTION_TBL_USER = 'ACTION_TBL_USER';

export const ACTION_ADD_USER = 'ACTION_ADD_USER';

export const ACTION_EDIT_USER = 'ACTION_EDIT_USER';

export const ACTION_REMOVE_USER = 'ACTION_REMOVE_USER';


const state = {
  USER_DATA: [],
  TBL_USER_DATA: {
    data: null,
    meta: {
      itemsPerPage: 10,
      totalData: 1,
      currentPage: 1,
    },
  }
}

const getters = {
  GET_TBL_USER: (state) => (state.TBL_USER_DATA)
}

const mutations = {
  SET_TBL_USER(state, payload) {
    state.TBL_USER_DATA = payload
  },
}

const actions = {
  async ACTION_TBL_USER({commit, dispatch}, filter) {
    try {
      dispatch(ACTION_LOADING, true)

      const fetch = async () => {
        ApiService.setHeader()
        console.log('ACTION_TBL_USER', 'filter', filter);
        const {data} = await ApiService.query('user', filter)
        console.log('ACTION_TBL_USER', 'data', data);
        const pagination = data.meta.pagination
        pagination ? dispatch(ACTION_SET_META, pagination) : null
        dispatch(ACTION_LOADING, false)
        commit(SET_TBL_USER, data)
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
      console.error('ACTION_TBL_USER', 'ERROR', error)
      throw error;
    }
  },
  async ACTION_ADD_USER({commit, dispatch, state}, params) {
    try {
      delete params.id;
      ApiService.setHeader();
      const {data} = await ApiService.post('user', params);
      console.log('ACTION_ADD_USER', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_USER_DATA);
        const loadedUSER = [...cloneTbl.data];
        loadedUSER.push(params);
        cloneTbl.data = loadedUSER;
        commit(SET_TBL_USER, cloneTbl);
      } else {
        dispatch(ACTION_TBL_USER);
      }

    } catch (e) {
      console.error('ACTION_ADD_USER', 'ERROR', e);
      throw e;
    }
  },
  async ACTION_EDIT_USER({commit, dispatch}, USERData) {
    try {
      ApiService.setHeader()
      const {data} = await ApiService.put(`user/${USERData.id}`, USERData)
      console.log('ACTION_EDIT_USER', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_USER_DATA);
        const loadedUSER = [...cloneTbl.data];
        const updatedIndex = loadedUSER.findIndex((USER) => USER.id === USERData.id);
        loadedUSER[updatedIndex] = USERData
        cloneTbl.data = loadedUSER;
        commit(SET_TBL_USER, cloneTbl)
      } else {
        dispatch(ACTION_TBL_USER);
      }

    } catch (e) {
      console.error('ACTION_EDIT_USER', 'ERROR', e);
      throw e;
    }
  },
  async ACTION_REMOVE_USER({commit, dispatch}, USERData) {
    try {
      ApiService.setHeader()
      const {data} = await ApiService.delete(`user/${USERData.id}`)
      console.log('ACTION_REMOVE_USER', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_USER_DATA);
        let loadedUSER = [...cloneTbl.data];
        loadedUSER = loadedUSER.filter((USER) => USER.id !== USERData.id);
        cloneTbl.data = loadedUSER;
        commit(SET_TBL_USER, loadedUSER)
      } else {
        dispatch(ACTION_TBL_USER);
      }
    } catch (e) {
      console.error('ACTION_REMOVE_USER', 'ERROR', e);
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
