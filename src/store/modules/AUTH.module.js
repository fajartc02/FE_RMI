import ApiService from '../services/api.service'
import jwtService from '../services/jwt.service'

export const GET_LOGIN = 'GET_LOGIN'
export const SET_LOGIN = 'SET_LOGIN'
export const ACTION_LOGIN = 'ACTION_LOGIN'

const state = {
  LOGIN_DATA: localStorage.getItem('id_token') || null,
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
// MODEL: HG6145D2
const actions = {
  async ACTION_LOGIN({ commit }, LOGINData = null) {
    try {
      LOGINData = LOGINData
        ? LOGINData
        : {
            username: 'john.doe@example.com',
            password: 'P@ssw0rdAPP!',
          }

      const { data } = await ApiService.post('auth/login', LOGINData)
      console.log(data)
      jwtService.saveToken(data.data.access_token)
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
