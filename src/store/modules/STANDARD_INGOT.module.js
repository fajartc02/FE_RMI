import ApiService from '../services/api.service'
import {ACTION_LOADING} from './LOADING.module'
import {ACTION_SET_META} from "@/store/modules/META.module";
import commonUtils from "@/utils/CommonUtils";

export const GET_TBL_STANDARD_INGOT = 'GET_TBL_STANDARD_INGOT';

export const SET_TBL_STANDARD_INGOT = 'SET_TBL_STANDARD_INGOT';

export const ACTION_TBL_STANDARD_INGOT = 'ACTION_TBL_STANDARD_INGOT';

export const ACTION_ADD_STANDARD_INGOT = 'ACTION_ADD_STANDARD_INGOT';

export const ACTION_EDIT_STANDARD_INGOT = 'ACTION_EDIT_STANDARD_INGOT';

export const ACTION_REMOVE_STANDARD_INGOT = 'ACTION_REMOVE_STANDARD_INGOT';


const state = {
  STANDARD_INGOT_DATA: [],
  TBL_STANDARD_INGOT_DATA: {
    data: null,
    meta: {
      itemsPerPage: 10,
      totalData: 1,
      currentPage: 1,
    },
  }
}

const getters = {
  GET_TBL_STANDARD_INGOT: (state) => (state.TBL_STANDARD_INGOT_DATA)
}

const mutations = {
  SET_TBL_STANDARD_INGOT(state, payload) {
    state.TBL_STANDARD_INGOT_DATA = payload
  },
}

const actions = {
  async ACTION_TBL_STANDARD_INGOT({commit, dispatch}, filter) {
    try {
      dispatch(ACTION_LOADING, true)

      const fetch = async () => {
        ApiService.setHeader()
        console.log('ACTION_TBL_STANDARD_INGOT', 'filter', filter);
        const {data} = await ApiService.query('ingot-standard', filter)
        console.log('ACTION_TBL_STANDARD_INGOT', 'data', data);
        const pagination = data.meta.pagination
        pagination ? dispatch(ACTION_SET_META, pagination) : null
        dispatch(ACTION_LOADING, false)

        const remapData = data.data.map((item) => {
          return {
            ...item,
            element: item.element?.name ? item.element?.name : item.element,
            vendor: item.vendor?.name ? item.vendor?.name : item.vendor,
            line: item.line?.name ? item.line?.name : item.line
          }
        });

        commit(SET_TBL_STANDARD_INGOT, {
          ...data,
          data: remapData
        });
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
  async ACTION_ADD_STANDARD_INGOT({commit, dispatch, state}, params) {
    try {
      delete params.id;
      delete params.minWarning;
      delete params.maxWarning;
      commonUtils.removeAllKeyWithSpecifyKey(params, 'name');

      ApiService.setHeader();
      dispatch(ACTION_LOADING, true);
      const {data} = await ApiService.post('ingot-standard', params);
      console.log('ACTION_ADD_STANDARD_INGOT', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_STANDARD_INGOT_DATA);
        const loadedSTANDARD_INGOT = [...cloneTbl.data];
        loadedSTANDARD_INGOT.push(params);
        cloneTbl.data = loadedSTANDARD_INGOT;
        commit(SET_TBL_STANDARD_INGOT, cloneTbl);
      } else {
        dispatch(ACTION_TBL_STANDARD_INGOT);
      }

    } catch (e) {
      console.error('ACTION_ADD_STANDARD_INGOT', 'ERROR', e);
    } finally {
      dispatch(ACTION_LOADING, false);
    }
  },
  async ACTION_EDIT_STANDARD_INGOT({commit, dispatch}, STANDARD_INGOTData) {
    try {
      const id = STANDARD_INGOTData.id;
      delete STANDARD_INGOTData.id;
      delete STANDARD_INGOTData.minWarning;
      delete STANDARD_INGOTData.maxWarning;
      commonUtils.removeAllKeyWithSpecifyKey(STANDARD_INGOTData, 'name');

      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const {data} = await ApiService.put(`ingot-standard/${id}`, STANDARD_INGOTData)
      console.log('ACTION_EDIT_STANDARD_INGOT', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_STANDARD_INGOT_DATA);
        const loadedSTANDARD_INGOT = [...cloneTbl.data];
        const updatedIndex = loadedSTANDARD_INGOT.findIndex((STANDARD_INGOT) => STANDARD_INGOT.id === STANDARD_INGOTData.id);
        loadedSTANDARD_INGOT[updatedIndex] = STANDARD_INGOTData
        cloneTbl.data = loadedSTANDARD_INGOT;
        commit(SET_TBL_STANDARD_INGOT, cloneTbl)
      } else {
        dispatch(ACTION_TBL_STANDARD_INGOT);
      }

    } catch (e) {
      console.error('ACTION_EDIT_STANDARD_INGOT', 'ERROR', e);
      throw e;
    }
  },
  async ACTION_REMOVE_STANDARD_INGOT({commit, dispatch}, STANDARD_INGOTData) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const {data} = await ApiService.delete(`ingot-standard/${STANDARD_INGOTData.id}`)
      console.log('ACTION_REMOVE_STANDARD_INGOT', 'data', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_STANDARD_INGOT_DATA);
        let loadedSTANDARD_INGOT = [...cloneTbl.data];
        loadedSTANDARD_INGOT = loadedSTANDARD_INGOT.filter((STANDARD_INGOT) => STANDARD_INGOT.id !== STANDARD_INGOTData.id);
        cloneTbl.data = loadedSTANDARD_INGOT;
        commit(SET_TBL_STANDARD_INGOT, loadedSTANDARD_INGOT)
      } else {
        dispatch(ACTION_TBL_STANDARD_INGOT);
      }
    } catch (e) {
      console.error('ACTION_REMOVE_STANDARD_INGOT', 'ERROR', e);
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
