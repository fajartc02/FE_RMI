import ApiService from '../services/api.service'
import {ACTION_LOADING} from './LOADING.module'
import {ACTION_SET_META} from "@/store/modules/META.module";
import commonUtils from "@/utils/CommonUtils";

export const GET_TBL_STANDARD_SAND = 'GET_TBL_STANDARD_SAND';

export const SET_TBL_STANDARD_SAND = 'SET_TBL_STANDARD_SAND';

export const ACTION_TBL_STANDARD_SAND = 'ACTION_TBL_STANDARD_SAND';

export const ACTION_ADD_STANDARD_SAND = 'ACTION_ADD_STANDARD_SAND';

export const ACTION_EDIT_STANDARD_SAND = 'ACTION_EDIT_STANDARD_SAND';

export const ACTION_REMOVE_STANDARD_SAND = 'ACTION_REMOVE_STANDARD_SAND';


const state = {
  STANDARD_SAND_DATA: [],
  TBL_STANDARD_SAND_DATA: {
    data: null,
    meta: {
      itemsPerPage: 10,
      totalData: 1,
      currentPage: 1,
    },
  }
}

const getters = {
  GET_TBL_STANDARD_SAND: (state) => (state.TBL_STANDARD_SAND_DATA)
}

const mutations = {
  SET_TBL_STANDARD_SAND(state, payload) {
    state.TBL_STANDARD_SAND_DATA = payload
  },
}

const actions = {
  async ACTION_TBL_STANDARD_SAND({commit, dispatch}, filter) {
    try {
      dispatch(ACTION_LOADING, true)

      const fetch = async () => {
        ApiService.setHeader()
        console.log('ACTION_TBL_STANDARD_SAND', 'filter', filter);
        const {data} = await ApiService.query('sand-standard', filter)
        console.log('ACTION_TBL_STANDARD_SAND', 'data', data);
        const pagination = data.meta.pagination
        pagination ? dispatch(ACTION_SET_META, pagination) : null
        dispatch(ACTION_LOADING, false)
        commit(SET_TBL_STANDARD_SAND, data)
      }

      if (commonUtils.isMock()) {
        setTimeout(() => {
          fetch();
        }, 3000);
      } else {
        await fetch();
      }


    } catch (e) {
      dispatch(ACTION_LOADING, false)
      console.error('ACTION_TBL_STANDARD_SAND', 'ERROR', e)
      throw e;
    }
  },
  async ACTION_ADD_STANDARD_SAND({commit, dispatch, state}, params) {
    try {
      delete params.id;
      ApiService.setHeader();
      const {data} = await ApiService.post('sand-standard', params);
      console.log('ACTION_ADD_STANDARD_SAND', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_STANDARD_SAND_DATA);
        const loadedSTANDARD_SAND = [...cloneTbl.data];
        loadedSTANDARD_SAND.push(params);
        cloneTbl.data = loadedSTANDARD_SAND;
        commit(SET_TBL_STANDARD_SAND, cloneTbl);
      } else {
        dispatch(ACTION_TBL_STANDARD_SAND);
      }

    } catch (e) {
      console.error('ACTION_ADD_STANDARD_SAND', 'ERROR', e);
    }
  },
  async ACTION_EDIT_STANDARD_SAND({commit, dispatch}, STANDARD_SANDData) {
    try {
      ApiService.setHeader()
      const {data} = await ApiService.put(`sand-standard/${STANDARD_SANDData.id}`, STANDARD_SANDData)
      console.log('ACTION_EDIT_STANDARD_SAND', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_STANDARD_SAND_DATA);
        const loadedSTANDARD_SAND = [...cloneTbl.data];
        const updatedIndex = loadedSTANDARD_SAND.findIndex((STANDARD_SAND) => STANDARD_SAND.id === STANDARD_SANDData.id);
        loadedSTANDARD_SAND[updatedIndex] = STANDARD_SANDData
        cloneTbl.data = loadedSTANDARD_SAND;
        commit(SET_TBL_STANDARD_SAND, cloneTbl)
      } else {
        dispatch(ACTION_TBL_STANDARD_SAND);
      }

    } catch (e) {
      console.error('ACTION_EDIT_STANDARD_SAND', 'ERROR', e);
      throw e;
    }
  },
  async ACTION_REMOVE_STANDARD_SAND({commit, dispatch}, STANDARD_SANDData) {
    try {
      ApiService.setHeader()
      const {data} = await ApiService.delete(`sand-standard/${STANDARD_SANDData.id}`)
      console.log('ACTION_REMOVE_STANDARD_SAND', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_STANDARD_SAND_DATA);
        let loadedSTANDARD_SAND = [...cloneTbl.data];
        loadedSTANDARD_SAND = loadedSTANDARD_SAND.filter((STANDARD_SAND) => STANDARD_SAND.id !== STANDARD_SANDData.id);
        cloneTbl.data = loadedSTANDARD_SAND;
        commit(SET_TBL_STANDARD_SAND, loadedSTANDARD_SAND)
      } else {
        dispatch(ACTION_TBL_STANDARD_SAND);
      }
    } catch (e) {
      console.error('ACTION_REMOVE_STANDARD_SAND', 'ERROR', e);
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
