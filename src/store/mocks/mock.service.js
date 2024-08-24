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
import MACHINES_DC_MOCK from './get/MACHINES_DC.mock'
import RES_REQ_QUERY_SHIMADZU_MOCK from './get/RES_REQ_QUERY_SHIMADZU.mock'
import ELEMENTS_MOCK from './get/ELEMENT.mock'
import CHART_PARAMETER_MOCK from './get/CHART_PARAMETER.mock'
import SHIFT_MOCK from './get/SHIFT.mock'
import MACHINES_SAND_MOCK from './get/MACHINES_SAND.mock'
import ELEMENT_SAND_MOCK from './get/ELEMENT_SAND.mock'
import SAMPLE_SAND_HISTORICALS_MOCK from './get/SAMPLE_SAND_HISTORICALS.mock'

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

        mock
            .onGet('machine/', {
                params: { lineId: '4e53b6be-9593-456e-905e-b4f071490cdd' },
            })
            .reply(200, { data: MACHINES_MOCK })

        mock
            .onGet('machine/', {
                params: { lineId: '9fe67a31-8715-4961-a9ff-930ff7ef416a' },
            })
            .reply(200, { data: MACHINES_DC_MOCK })

        mock
            .onGet('machine/', {
                params: { materialCategory: 'SAND' },
            })
            .reply(200, { data: MACHINES_SAND_MOCK })

        mock.onGet('line').reply(200, { data: LINES_MOCK })
        mock.onGet('shift/').reply(200, { data: SHIFT_MOCK })

        // IF GaugeID not passing
        mock.onGet('shimadzu/').reply(200, { data: SAMPLE_CODE_SUGGESTED_MOCK })
        mock
            .onGet('element', {
                params: { type: 'SAND' },
            })
            .reply(200, { data: ELEMENT_SAND_MOCK })

        mock.onGet('element/').reply(200, { data: ELEMENTS_MOCK })
            // mock.onGet('element').reply(200, { data: ELEMENTS_MOCK })

        mock
            .onGet('graph/ingot', {
                startDate: 1722470400,
                endDate: 1725148799,
                inCharge: 'INTERNAL',
                elementId: '9999bcbb-0e8a-4695-8f80-1000',
            })
            .reply(200, { data: CHART_PARAMETER_MOCK })

        // FOR suggested from specific shimadzu
        mock
            .onGet('shimadzu', {
                params: {
                    gaugeId: '9999bcbb-0e8a-4695-8f80-caaf0a057dff',
                    take: 1,
                    page: 1,
                    orderDirection: 'DESC',
                    inCharge: 'INTERNAL',
                },
            })
            .reply(200, { data: RES_REQ_QUERY_SHIMADZU_MOCK.data })

        mock
            .onGet('shimadzu', {
                params: {
                    gaugeId: '8de4e9ca-f854-4380-9aa0-8f1d6d440202',
                    take: 1,
                    page: 1,
                    orderDirection: 'DESC',
                    inCharge: 'INTERNAL',
                },
            })
            .reply(200, { data: RES_REQ_QUERY_SHIMADZU_MOCK })

        mock
            .onGet('shimadzu', {
                params: {
                    gaugeId: '8de4e9ca-f854-4380-9aa0-8f1d6d440202',
                    inCharge: 'INTERNAL',
                },
            })
            .reply(200, { data: SAMPLE_CODE_SUGGESTED_PARAMS2_MOCK })

        mock
            .onGet('shimadzu/9999bcbb-0e8a-4695-8f80-caaf0a057dff', {
                // params: {
                //     sampleId: '9999bcbb-0e8a-4695-8f80-0000',
                //     incharge: 'INTERNAL',
                // },
            })
            .reply(200, { data: SAMPLE_INGOT_INTERNAL_MOCK })
        mock
            .onGet('shimadzu/5afbfaa9-5154-11ef-aae2-0242ac120002')
            .reply(200, { data: SAMPLE_INGOT_INTERNAL_MOCK })
        mock.onGet('gauge/').reply(200, { data: gauges })
            // shimadzu/9999bcbb-0e8a-4695-8f80-0000
        mock
            .onGet('shimadzu/9999bcbb-0e8a-4695-8f80-0000')
            .reply(200, { data: SAMPLE_INGOT_INTERNAL_MOCK })

        // mock
        //     .onGet('sample-ingot/', {
        //         params: {
        //             sampleCode: null,
        //             incharge: 'INTERNAL',
        //         },
        //     })
        //     .reply(200, { data: SAMPLE_INGOT_INTERNAL_MOCK })

        // mock
        //     .onGet('sample-ingot/', {
        //         params: {
        //             sampleCode: 1,
        //             incharge: 'INTERNAL',
        //         },
        //     })
        //     .reply(200, { data: SAMPLE_INGOT_INTERNAL_MOCK })

        mock
            .onPost('/sample-ingot')
            // if data internal not found
            .reply(201, { data: SCANNED_RESULT_EMPTY_MOCK })
            // if data internal found
            // .reply(200, { data: SCANNED_RESULT_MOCK })

        mock
            .onGet('sample-ingot/1')
            .reply(200, { data: SCANNED_CODE_SUGGESTED_MOCK })

        mock.onPut('shimadzu/9999bcbb-0e8a-4695-8f80-0000').reply((data) => {
            console.log('MOCKS')
            console.log(data.data)
                // return [201, OK_INGOT_CHECK_VENDOR]
            return [201, NG_INGOT_CHECK_VENDOR]
        })

        mock
            .onPut('/shimadzu/9999bcbb-0e8a-4695-8f80-0000/adjustment')
            // if data internal not found
            .reply(201, { data: 'success' })

        mock.onGet('sample-ingot/historical').reply(200, {
                data: SAMPLE_INGOT_HISORICALS_MOCK.data,
                meta: SAMPLE_INGOT_HISORICALS_MOCK.meta,
            })
            // .reply(200, { data: SAMPLE_INGOT_HISORICALS_EMPTY_MOCK })

        mock
            .onGet('shimadzu/c31c4192-c127-4ace-b805-bbb00987788a')
            .reply(200, { data: SCANNED_RESULT_MOCK })
            // shimadzu/9999bcbb-0e8a-4695-8f80-0000
            // .reply(200, { data: SAMPLE_INGOT_INTERNAL_MOCK })
        mock
            .onGet('shimadzu/9999bcbb-0e8a-4695-8f80-0000')
            .reply(200, { data: SCANNED_RESULT_MOCK })

        mock
            .onGet('sample-sand/historical', {
                params: {
                    take: 20,
                    page: 1,
                    startDate: 1722470400,
                    endDate: 1724630399,
                },
            })
            .reply(200, { data: SAMPLE_SAND_HISTORICALS_MOCK })
    },
}

export default MockService
