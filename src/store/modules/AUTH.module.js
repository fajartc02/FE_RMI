import ApiService from '../services/api.service'
import jwtService from '../services/jwt.service'

export const GET_LOGIN = 'GET_LOGIN'
export const SET_LOGIN = 'SET_LOGIN'
export const ACTION_LOGIN = 'ACTION_LOGIN'

const state = {
  LOGIN_DATA: [],
}

const getters = {
  GET_LOGIN(state) {
    return state.LOGIN_DATA
  },
}

const mutations = {
  SET_LOGIN(state, payload) {
    state.LOGIN_DATA = payload
  },
}

const actions = {
  async ACTION_LOGIN({ commit }, LOGINData = null) {
    try {
      LOGINData = LOGINData
        ? LOGINData
        : {
            username: 'john.doe@example.com',
            password: 'P@ssw0rdAPP!',
          }

      const response = await ApiService.post('auth/login', LOGINData)
      console.log(response)
      jwtService.saveToken(response.data.token)
    } catch (error) {
      console.error(error)
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
