import moment from 'moment'
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

      // Step 1: Extract group keys (LP1, LP2, etc.)
      const groupKeys = data.data.sampleCodes.map(code => code.split("-")[2]);

      // Step 2: Group the data based on `groupKeys`
      const groupedData = {};
      const lowerLimit = Number((data.data.series[0].data[0].y).toFixed(2));
      const warningLowLimit = Number((data.data.series[1].data[0].y).toFixed(2));
      const warningHighLimit = Number((data.data.series[2].data[0].y).toFixed(2));
      const upperLimit = Number((data.data.series[3].data[0].y).toFixed(2));
      const lowerData = data.data.series.splice(0, 2); // Remove the first series (which is the sum of all series)
      // remove array from length - 2
      const upperData = data.data.series.splice(data.data.series.length - 2, 2); // Remove the last series (which is the sum of all series)
      data.data.series[0].data.forEach((point, index) => {
        const groupKey = groupKeys[index];
        if (!groupedData[groupKey]) {
          groupedData[groupKey] = [];
        }
        groupedData[groupKey].push(point);
      });

      // Step 3: Format the grouped data into the desired output format
      const outputSeries = Object.entries(groupedData).map(([groupKey, data]) => ({
        name: groupKey,
        series: data
      }));

      // Function to group by day and ensure all days in the month are included
      function groupByDayAndEnsureAllDays(data) {
        return data.map(item => {
          const grouped = {};

          // Group the data by day
          item.series.forEach(entry => {
            const date = new Date(entry.x);
            const day = date.toISOString().split('T')[0];  // "YYYY-MM-DD"

            if (!grouped[day]) {
              grouped[day] = { totalY: 0, count: 0 };
            }

            grouped[day].totalY += entry.y;
            grouped[day].count += 1;
          });

          // Get the first and last day of the month
          const startDate = new Date(Math.max(...item.series.map(d => d.x)));
          const endDate = new Date(Math.max(...item.series.map(d => d.x)));

          // Set the date to the first of the month
          startDate.setDate(1);
          startDate.setHours(0, 0, 0, 0);  // Set to the start of the day
          endDate.setMonth(endDate.getMonth() + 1);  // Move to the next month
          endDate.setDate(0);  // Set to the last day of the month
          endDate.setHours(23, 59, 59, 999);  // Set to the end of the day
          // Generate all the days of the month (1st to last day)
          const allDays = [];
          for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            allDays.push(moment(d).format('YYYY-MM-DD'));  // "YYYY-MM-DD"
          }

          // Ensure that each day in the month is included, and set y = 0 for missing days

          const newData = allDays.map(day => {
            const avgY = grouped[day] ? Number((grouped[day].totalY / grouped[day].count).toFixed(2)) : 0;
            return { x: new Date(day).getTime(), y: avgY ? avgY : 0 };
          });

          return { name: item.name, data: [...newData], };
        });
      }

      // Call the function
      const waitMapData = await groupByDayAndEnsureAllDays(outputSeries)
      const groupedDataDay = [
        // { name: 'Upper Limit', data: [waitMapData[0].data.map(d => ({ x: d.x, y: upperLimit }))[0]] },
        // { name: 'Warning High Limit', data: [waitMapData[0].data.map(d => ({ x: d.x, y: warningHighLimit }))[0]] },
        ...waitMapData,
        // { name: 'Warning Low Limit', data: [waitMapData[0].data.map(d => ({ x: d.x, y: warningLowLimit }))[0]] },
        // { name: 'Lower Limit', data: [waitMapData[0].data.map(d => ({ x: d.x, y: lowerLimit }))[0]] }
      ];
      console.log(groupedDataDay)
      const dataWithDays = groupedDataDay.map(item => {
        return {
          ...item,
          allDay: item.data.map(d => d.x),
          lowerLimit,
          warningLowLimit: lowerLimit !== 0 ? warningLowLimit : 0,
          warningHighLimit: upperLimit !== 0 ? warningHighLimit : 0,
          upperLimit,
        }
      })
      console.log(JSON.stringify(dataWithDays, null, 2));
      return dataWithDays
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
