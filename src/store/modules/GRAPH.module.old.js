import ApiService from '../services/api.service'
import { ACTION_LOADING } from './LOADING.module'

export const GET_GRAPH = 'GET_GRAPH'

export const SET_GRAPH = 'SET_GRAPH'
export const ACTION_GRAPH = 'ACTION_GRAPH'
export const ACTION_GRAPH_SAND = 'ACTION_GRAPH_SAND'

const state = {
  GRAPH_DATA: null,
}

const getters = {
  GET_GRAPH(state) {
    return state.GRAPH_DATA
  },
}

const mutations = {
  SET_GRAPH(state, payload) {
    state.GRAPH_DATA = payload
  },
}

const actions = {
  async ACTION_GRAPH({ commit, dispatch }, params) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const { data } = await ApiService.query('graph/ingot', params)
      dispatch(ACTION_LOADING, false)
      commit(SET_GRAPH, data.data)
      console.log('-------------------------------------------------')
      console.log(data)
      // Extract grouping keys (index 2 of split sampleCodes)
      const groupKeys = data.data.sampleCodes.map(code => `${code.split("-")[0]}-${code.split("-")[1]}-${code.split("-")[2]}`);

      // Group and calculate averages
      const groupedData = {};
      data.data.series.forEach(series => {
        series.data.forEach((point, index) => {
          const key = groupKeys[index];
          if (!groupedData[key]) {
            groupedData[key] = { x: [], ySum: 0, yCount: 0 };
          }
          groupedData[key].x.push(point.x);
          groupedData[key].ySum += point.y;
          groupedData[key].yCount += 1;
        });
      });

      // Compute average and format output
      const outputSeries = Object.keys(groupedData).map(key => {
        const group = groupedData[key];
        const avgY = group.ySum / group.yCount;
        return {
          key: key,
          machine: key.split('-')[2],
          data: group.x.map(xValue => ({ x: xValue, y: avgY }))
        };
      });

      const output = { series: outputSeries };

      console.log(JSON.stringify(output, null, 2));
      return data
    } catch (error) {
      console.error(error)
      dispatch(ACTION_LOADING, false)
      return error
    }
  },
  async ACTION_GRAPH_SAND({ commit, dispatch }, params) {
    try {
      ApiService.setHeader()
      dispatch(ACTION_LOADING, true)
      const { data } = await ApiService.query('graph/sand', params)
      dispatch(ACTION_LOADING, false)
      commit(SET_GRAPH, data.data)
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
      dispatch(ACTION_LOADING, false)
      return error
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
