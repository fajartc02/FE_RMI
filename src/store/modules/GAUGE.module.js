import ApiService from '../services/api.service'
import {ACTION_LOADING} from './LOADING.module'
import {ACTION_SET_META} from "@/store/modules/META.module";
import commonUtils from "@/utils/CommonUtils";

export const GET_GAUGE = 'GET_GAUGE'
export const GET_TBL_GAUGE = 'GET_TBL_GAUGE'
export const SET_GAUGE = 'SET_GAUGE'
export const SET_TBL_GAUGE = 'SET_TBL_GAUGE'
export const ACTION_GAUGE = 'ACTION_GAUGE'
export const ACTION_TBL_GAUGE = 'ACTION_TBL_GAUGE'
export const ACTION_ADD_GAUGE = 'ACTION_ADD_GAUGE';
export const ACTION_EDIT_GAUGE = 'ACTION_EDIT_GAUGE';
export const ACTION_REMOVE_GAUGE = 'ACTION_REMOVE_GAUGE';

const state = {
  GAUGE_DATA: [],
  TBL_GAUGE_DATA: {
    data: null,
    meta: {
      itemsPerPage: 10,
      totalData: 1,
      currentPage: 1,
    },
  }
}

const getters = {
  GET_GAUGE(state) {
    if (state) {
      return state.GAUGE_DATA.map((gauge) => {
        return {
          ...gauge,
          id: gauge.id,
          label: gauge.name,
          isSelected: false,
        }
      })
    } else {
      return []
    }
  },
  GET_TBL_GAUGE: (state) => (state.TBL_GAUGE_DATA),
}

const mutations = {
  SET_GAUGE(state, payload) {
    state.GAUGE_DATA = payload
  },
  SET_TBL_GAUGE(state, payload) {
    state.TBL_GAUGE_DATA = payload
  },
}

const actions = {
  async ACTION_GAUGE({commit, dispatch}, params) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const {data} = await ApiService.query('gauge/', params)
      dispatch(ACTION_LOADING, false)
      commit(SET_GAUGE, data.data)
    } catch (error) {
      console.error(error)
      dispatch(ACTION_LOADING, false)
      return error
    }
  },
  async ACTION_TBL_GAUGE({commit, dispatch}, filter) {
    try {
      dispatch(ACTION_LOADING, true)

      const fetch = async () => {
        ApiService.setHeader()
        console.log('ACTION_TBL_GAUGE', 'filter', filter);
        const {data} = await ApiService.query('gauge/list', filter)
        console.log('ACTION_TBL_GAUGE', 'data', data);
        const pagination = data.meta.pagination
        pagination ? dispatch(ACTION_SET_META, pagination) : null
        dispatch(ACTION_LOADING, false)
        commit(SET_TBL_GAUGE, data)
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
  async ACTION_ADD_GAUGE({commit, dispatch, state}, params) {
    try {
      ApiService.setHeader();
      dispatch(ACTION_LOADING, true);
      const {data} = await ApiService.query('gauge/add', params);
      console.log('ACTION_ADD_GAUGE', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_GAUGE_DATA);
        const loadedGAUGE = [...cloneTbl.data];
        loadedGAUGE.push(params);
        cloneTbl.data = loadedGAUGE;
        commit(SET_TBL_GAUGE, cloneTbl);
      } else {
        dispatch(ACTION_TBL_GAUGE);
      }

    } catch (e) {
      console.error('ACTION_ADD_GAUGE', 'ERROR', e);
    } finally {
      dispatch(ACTION_LOADING, false);
    }
  },
  async ACTION_EDIT_GAUGE({commit, dispatch}, GAUGEData) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const {data} = await ApiService.query('gauge/edit', GAUGEData)
      console.log('ACTION_EDIT_GAUGE', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_GAUGE_DATA);
        const loadedGAUGE = [...cloneTbl.data];
        const updatedIndex = loadedGAUGE.findIndex((GAUGE) => GAUGE.id === GAUGEData.id);
        loadedGAUGE[updatedIndex] = GAUGEData
        cloneTbl.data = loadedGAUGE;
        commit(SET_TBL_GAUGE, cloneTbl)
      } else {
        dispatch(ACTION_TBL_GAUGE);
      }

    } catch (e) {
      console.error('ACTION_EDIT_GAUGE', 'ERROR', e);
    } finally {
      dispatch(ACTION_LOADING, false)
    }
  },
  async ACTION_REMOVE_GAUGE({commit, dispatch}, GAUGEData) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const {data} = await ApiService.query('GAUGE/delete', GAUGEData)
      console.log('on delete GAUGE', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_GAUGE_DATA);
        let loadedGAUGE = [...cloneTbl.data];
        loadedGAUGE = loadedGAUGE.filter((GAUGE) => GAUGE.id !== GAUGEData.id);
        cloneTbl.data = loadedGAUGE;
        commit(SET_TBL_GAUGE, loadedGAUGE)
      } else {
        dispatch(ACTION_TBL_GAUGE);
      }
    } catch (error) {
      console.error(error)
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
