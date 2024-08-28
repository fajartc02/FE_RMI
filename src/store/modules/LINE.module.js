import ApiService from '../services/api.service'
import {ACTION_LOADING} from './LOADING.module'
import {ACTION_SET_META} from "@/store/modules/META.module";
import commonUtils from "@/utils/CommonUtils";

export const GET_LINE = 'GET_LINE'
export const GET_LINE_SELECT = 'GET_LINE_SELECT'
export const GET_TBL_LINE = 'GET_TBL_LINE'
export const SET_LINE = 'SET_LINE'
export const SET_TBL_LINE = 'SET_TBL_LINE'
export const ACTION_LINE = 'ACTION_LINE'
export const ACTION_TBL_LINE = 'ACTION_TBL_LINE'
export const ACTION_ADD_LINE = "ACTION_ADD_LINE";
export const ACTION_EDIT_LINE = "ACTION_EDIT_LINE";
export const ACTION_REMOVE_LINE = "ACTION_REMOVE_LINE";

export const GET_LINE_TREESELECT = 'GET_LINE_TREESELECT'

const state = {
  LINE_DATA: [],
  TBL_LINE_DATA: {
    data: null,
    meta: {
      itemsPerPage: 10,
      totalData: 1,
      currentPage: 1,
    },
  }
}

const getters = {
  GET_LINE(state) {
    return state.LINE_DATA
  },
  GET_LINE_SELECT(state) {
    state.LINE_DATA.unshift({id: '', name: 'Select Line'})
    return state.LINE_DATA.map((line) => {
      return {
        id: line.id,
        label: line.name,
      }
    })
  },
  GET_LINE_TREESELECT(state) {
    state.LINE_DATA.push({id: 'NONE', name: 'All'})
    return state.LINE_DATA.map((line) => {
      return {
        id: line.id,
        label: line.name,
      }
    })
  },
  GET_TBL_LINE: state => (state.TBL_LINE_DATA),
}

const mutations = {
  SET_LINE(state, payload) {
    state.LINE_DATA = payload
  },
  SET_TBL_LINE(state, payload) {
    state.TBL_LINE_DATA = payload
  },
}

const actions = {
  async ACTION_LINE({commit, dispatch}, params) {
    try {
      ApiService.setHeader()
      //dispatch(ACTION_LOADING, true)
      const {data} = await ApiService.query('line', params)
      //dispatch(ACTION_LOADING, false)
      commit(SET_LINE, data.data)
    } catch (error) {
      //dispatch(ACTION_LOADING, false)
      console.error(error)
      return error
    }
  },
  async ACTION_TBL_LINE({commit, dispatch}, filter) {
    try {
      dispatch(ACTION_LOADING, true)

      const fetch = async () => {
        ApiService.setHeader()
        console.log('ACTION_TBL_LINE', 'filter', filter);
        const {data} = await ApiService.query('line/list', filter)
        console.log('ACTION_TBL_LINE', 'data', data);
        const pagination = data.meta.pagination
        pagination ? dispatch(ACTION_SET_META, pagination) : null
        dispatch(ACTION_LOADING, false)
        commit(SET_TBL_LINE, data)
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
  async ACTION_ADD_LINE({commit, dispatch, state}, params) {
    try {
      ApiService.setHeader();
      dispatch(ACTION_LOADING, true);
      const {data} = await ApiService.query('line/add', params);
      console.log('on add line', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_LINE_DATA);
        const loadedLine = [...cloneTbl.data];
        loadedLine.push(params);
        cloneTbl.data = loadedLine;
        commit(SET_TBL_LINE, cloneTbl);
      } else {
        dispatch(ACTION_TBL_LINE);
      }

    } catch (e) {
      console.error('ACTION_ADD_LINE', 'ERROR', e);
    } finally {
      dispatch(ACTION_LOADING, false);
    }
  },
  async ACTION_EDIT_LINE({commit, dispatch}, lineData) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const {data} = await ApiService.query('line/edit', lineData)
      console.log('on edit line', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_LINE_DATA);
        const loadedLine = [...cloneTbl.data];
        const updatedIndex = loadedLine.findIndex((line) => line.id === lineData.id);
        loadedLine[updatedIndex] = lineData
        cloneTbl.data = loadedLine;
        commit(SET_TBL_LINE, cloneTbl)
      } else {
        dispatch(ACTION_TBL_LINE);
      }

    } catch (e) {
      console.error('ACTION_EDIT_LINE', 'ERROR', e);
    } finally {
      dispatch(ACTION_LOADING, false)
    }
  },
  async ACTION_REMOVE_LINE({commit, dispatch}, lineData) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const {data} = await ApiService.query('line/delete', lineData)
      console.log('on delete line', data);

      if (commonUtils.isMock()) {
        const cloneTbl = structuredClone(state.TBL_LINE_DATA);
        let loadedLine = [...cloneTbl.data];
        loadedLine = loadedLine.filter((line) => line.id !== lineData.id);
        cloneTbl.data = loadedLine;
        commit(SET_TBL_LINE, loadedLine)
      } else {
        dispatch(ACTION_TBL_LINE);
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
