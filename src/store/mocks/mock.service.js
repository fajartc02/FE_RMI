import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import SCANNED_RESULT_EMPTY_MOCK from './post/SCANNED_RESULT_EMPTY.mock'
import SCANNED_RESULT_MOCK from './post/SCANNED_RESULT.mock'
import SCANNED_CODE_SUGGESTED_MOCK from './get/SCANNED_CODE_SUGGESTED.mock'
import SAMPLE_CODE_SUGGESTED_MOCK from './get/SAMPLE_CODE_SUGGESTED.mock'
import SAMPLE_INGOT_INTERNAL_MOCK from './get/SAMPLE_INGOT_INTERNAL.mock'

import GAUGES_MOCK from './get/GAUGE.mock'
import RESPONSE_INGOT_CHECK_MOCK from './put/RESPONSE_INGOT_CHECK.mock'
import SAMPLE_CODE_SUGGESTED_PARAMS_MOCK from './get/SAMPLE_CODE_SUGGESTED_PARAMS.mock'
import SAMPLE_CODE_SUGGESTED_PARAMS2_MOCK from './get/SAMPLE_CODE_SUGGESTED_PARAMS2.mock'
import OK_INGOT_CHECK_VENDOR from './post/OK_INGOT_CHECK_VENDOR.mock'
import NG_INGOT_CHECK_VENDOR from './post/NG_INGOT_CHECK_VENDOR.mock'
import MACHINES_MOCK from './get/MACHINES.mock'
import LINES_MOCK from './get/LINES.mock'
import SAMPLE_INGOT_HISORICALS_MOCK from './get/SAMPLE_INGOT_HISTORICALS.mock'
import SAMPLE_INGOT_HISORICALS_EMPTY_MOCK from './get/SAMPLE_INGOT_HISTORICALS_EMPTY.mock'

// mock testing user accounts
const users = [{
    password: 'Toyota@123',
    username: 'fajar@example.com',
    access_token: '123',
}, ]

const gauges = GAUGES_MOCK

const MockService = {
    init() {
        // This sets the mock adapter on the default instance
        var mock = new MockAdapter(axios, { delayResponses: 5000 })

        // mock login request
        mock.onPost('/auth/login').reply((data) => {
            const credential = JSON.parse(data.data)
            const found = users.find((user) => {
                return (
                    credential.username === user.username &&
                    credential.password === user.password
                )
            })
            if (found) {
                return [200, { data: found }]
            }
            return [404, { errors: ['The login detail is incorrect'] }]
        })

        // mock to verify authentication
        mock.onGet(/\/verify\/?/).reply((data) => {
            const token = data.headers.Authorization.replace('Token ', '')
            if (token !== 'undefined') {
                const found = users.find((user) => {
                    return token === user.token
                })
                return [200, found]
            }
            return [401, { errors: ['Invalid authentication'] }]
        })

        // IF GaugeID not passing
        mock.onGet('shimadzu/').reply(200, { data: SAMPLE_CODE_SUGGESTED_MOCK })
            // ELSE GaugeId passed
        mock.onGet('shimadzu/1').reply(200, { data: SAMPLE_INGOT_INTERNAL_MOCK })
            // .reply(200, { data: SAMPLE_CODE_SUGGESTED_PARAMS_MOCK })
        mock.onGet('shimadzu/2').reply(200, { data: SAMPLE_INGOT_INTERNAL_MOCK })

        mock.onGet('gauges/').reply(200, { data: gauges })

        mock.onGet('machines/').reply(200, { data: MACHINES_MOCK })
        mock.onGet('lines/').reply(200, { data: LINES_MOCK })

        mock
            .onGet('sample-ingot/', {
                params: {
                    sampleCode: null,
                    incharge: 'INTERNAL',
                },
            })
            .reply(200, { data: SAMPLE_INGOT_INTERNAL_MOCK })

        mock
            .onGet('sample-ingot/', {
                params: {
                    sampleCode: 1,
                    incharge: 'INTERNAL',
                },
            })
            .reply(200, { data: SAMPLE_INGOT_INTERNAL_MOCK })

        mock
            .onPost('/sample-ingot')
            // if data internal not found
            .reply(200, { data: SCANNED_RESULT_EMPTY_MOCK })
            // if data internal found
            // .reply(200, { data: SCANNED_RESULT_MOCK })

        mock
            .onGet('sample-ingot/1')
            .reply(200, { data: SCANNED_CODE_SUGGESTED_MOCK })

        mock.onPut('/shimadzu/1').reply((data) => {
            console.log('MOCKS')
            console.log(data.data)
                // return [201, { data: OK_INGOT_CHECK_VENDOR }]
            return [201, { data: NG_INGOT_CHECK_VENDOR.data }]
        })

        mock.onGet('sample-ingot/historical').reply(200, {
                data: SAMPLE_INGOT_HISORICALS_MOCK.data,
                meta: SAMPLE_INGOT_HISORICALS_MOCK.meta,
            })
            // .reply(200, { data: SAMPLE_INGOT_HISORICALS_EMPTY_MOCK })

        mock
            .onGet('sample-ingot/historical/1')
            .reply(200, { data: SCANNED_RESULT_MOCK })
            // .reply(200, { data: SAMPLE_INGOT_INTERNAL_MOCK })
    },
}

export default MockService