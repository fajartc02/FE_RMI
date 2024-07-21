import axios from 'axios'

process.env.VUE_APP_STANDALONE_SINGLE_SPA == 'true' ? 
            localStorage.setItem('id_token', process.env.VUE_APP_TKN)
            : console.log('STANDALONE_SINGLE_SPA FALSE')

export default {
    async getCommon(url, params, callback) {
        const request = await axios
            .get(process.env.VUE_APP_API_URL + `/api/common${url}${params}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.id_token,
                },
            })
            .then((response) => {
                if (callback) {
                    return callback(response, null)
                }
                return response
            })
            .catch((error) => {
                if (callback) {
                    return callback(error.response, error)
                }
                return error
            })
        return request
    },

    async get(url, params, callback) {
        // process.env.VUE_APP_STANDALONE_SINGLE_SPA == 'true' ? 
        //     localStorage.setItem('id_token', process.env.VUE_APP_TKN)
        //     : console.log('STANDALONE_SINGLE_SPA FALSE')

        let config = {
            headers: { 
                Authorization: 'Bearer ' + localStorage.id_token,
            },
        }

        let detailUrl = url
        if(params == '?'){
            detailUrl = process.env.VUE_APP_API_URL + `${url}`
        }else{
            detailUrl = process.env.VUE_APP_API_URL + `${url}/search${params}`
        }
        console.log('DATA URL', detailUrl)
        console.log('DATA CONFIG', config)
        const request = axios
            .get(detailUrl, config)
            .then((response) => {
                if (callback) {
                    return callback(response, null)
                }
                return response
            })
            .catch((error) => {
                if (callback) {
                    return callback(error.response, error)
                }
                return error
            })
        return request
    },

    async post(url, params, callback) {
        const request = await axios
            .post(process.env.VUE_APP_API_URL + `${url}`, params, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.id_token,
                },
            })
            .then((response) => {
                if (callback) {
                    return callback(response, null)
                }
                return response
            })
            .catch((error) => {
                if (callback) {
                    return callback(error.response, error)
                }
                return error
            })
        return request
    },

    async put(url, id, params, callback) {
        const request = await axios
            .put(process.env.VUE_APP_API_URL + `${url}/edit/${id}`, params, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.id_token,
                },
            })
            .then((response) => {
                if (callback) {
                    return callback(response, null)
                }
                return response
            })
            .catch((error) => {
                if (callback) {
                    return callback(error.response, error)
                }
                return error
            })
        return request
    },
    
    async delete(url, id, callback) {
        const request = await axios
            .delete(process.env.VUE_APP_API_URL + `${url}/delete/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.id_token,
                },
            })
            .then((response) => {
                if (callback) {
                    return callback(response, null)
                }
                return response
            })
            .catch((error) => {
                if (callback) {
                    return callback(error.response, error)
                }
                return error
            })
        return request
    },
    
}