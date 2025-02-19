import axios from 'axios'
import JwtService from './jwt.service'

/**
 * Service to call HTTP request via Axios
 */
const ApiService = {
  init() {
    axios.defaults.baseURL = 'http://10.70.20.51:3000/'
    //  axios.defaults.baseURL = 'http://mt-system.id:3222/'
  },

  // /**
  //  * Set the default HTTP request headers
  //  */
  setHeader() {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${JwtService.getToken()}`
  },

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  query(resource, params = null) {
    console.log('GET-QUERY: ', resource, params)

    return axios.get(`${resource}`, { params }).catch((error) => {
      throw new Error(`[KT] ApiService ${error}`)
    })
  },

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  get(resource, slug = '') {
    // console.log(axios)
    console.log(`GET: ${resource}/${slug}`)

    return axios.get(`${resource}/${slug}`).catch((error) => {
      console.log(error)
      throw new Error(`[KT] ApiService ${error}`)
    })
  },

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  post(resource, params) {
    console.log('POST: ', resource, params)

    return axios.post(`${resource}`, params)
  },

  /**
   * Send the UPDATE HTTP request
   * @param resource
   * @param slug
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  update(resource, slug, params) {
    console.log('UPDATE: ', `${resource}/${slug}`, params)

    return axios.put(`${resource}/${slug}`, params)
  },

  /**
   * Send the PUT HTTP request
   * @param resource
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  put(resource, params) {
    console.log('PUT: ', resource, params)
    return axios.put(`${resource}`, params)
  },

  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  delete(resource) {
    console.log('DELETE: ', resource)
    return axios.delete(resource).catch((error) => {
      // console.log(error);
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },
}

export default ApiService
