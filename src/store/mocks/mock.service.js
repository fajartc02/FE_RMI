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
import SAMPLE_TBL_LINE from '@/store/mocks/get/SAMPLE_TBL_LINE.mock'
import SAMPLE_TBL_MACHINE from '@/store/mocks/get/SAMPLE_TBL_MACHINE.mock'
import ELEMENT_SAND_DETAIL from './get/ELEMENT_SAND_DETAIL'
import SAMPLE_TBL_GAUGE from '@/store/mocks/get/SAMPLE_TBL_GAUGE.mock'
import SAMPLE_TBL_SHIFT from '@/store/mocks/get/SAMPLE_TBL_SHIFT.mock'
import SAMPLE_TBL_STANDARD_SAND from '@/store/mocks/get/SAMPLE_TBL_STANDARD_SAND.mock'
import SAMPLE_TBL_STANDARD_INGOT from '@/store/mocks/get/SAMPLE_TBL_STANDARD_INGOT.mock'
import SAMPLE_TBL_SYSTEM from '@/store/mocks/get/SAMPLE_TBL_SYSTEM.mock'
import SAMPLE_TBL_USER from '@/store/mocks/get/SAMPLE_TBL_USER.mock'
import SAMPLE_TBL_VENDOR from '@/store/mocks/get/SAMPLE_TBL_VENDOR.mock'

// mock testing user accounts
const users = [{
  password: 'Toyota@123',
  username: 'fajar@example.com',
  access_token: '123',
},]

function route(path = '') {
  return typeof path === 'string'
    ? new RegExp(path.replace(/:\w+/g, '[^/]+'))
    : path
}

const gauges = GAUGES_MOCK

/**
 *
 * @param mock {MockAdapter}
 */
const mstLineMock = (mock) => {
  mock.onGet('line').reply(200, {
    data: SAMPLE_TBL_LINE.data,
    meta: SAMPLE_TBL_LINE.meta,
  })

  mock.onPost('line').reply((data) => {
    console.log('mock', 'line', data)
    return [
      200,
      {
        data: {
          message: 'line added',
          data: null,
        },
      },
    ]
  })

  mock.onPut(new RegExp(`line/*`)).reply((data) => {
    console.log('mock', 'line', data)
    return [
      200,
      {
        data: {
          message: 'line edited',
          data: null,
        },
      },
    ]
  })

  mock.onDelete(new RegExp(`line/*`)).reply((data) => {
    console.log('mock', 'line', data)
    return [
      200,
      {
        data: {
          message: 'line delete',
          data: null,
        },
      },
    ]
  })
}

/**
 *
 * @param mock {MockAdapter}
 */
const mstMachineMock = (mock) => {
  mock.onGet(new RegExp(`machine/*`)).reply(200, {
    data: SAMPLE_TBL_MACHINE.data,
    meta: SAMPLE_TBL_MACHINE.meta,
  })

  mock.onPost('machine').reply((data) => {
    console.log('mock', 'machine', data)
    return [
      200,
      {
        data: {
          message: 'machine added',
          data: null,
        },
      },
    ]
  })

  mock.onPut(new RegExp(`machine/*`)).reply((data) => {
    console.log('mock', 'machine', data)
    return [
      200,
      {
        data: {
          message: 'machine edited',
          data: null,
        },
      },
    ]
  })

  mock.onDelete(new RegExp(`machine/*`)).reply((data) => {
    console.log('mock', 'machine', data)
    return [
      200,
      {
        data: {
          message: 'machine deleted',
          data: null,
        },
      },
    ]
  })
}

const mstGaugeMock = (mock) => {
  mock.onGet(new RegExp('gauge/*')).reply(200, {
    data: SAMPLE_TBL_GAUGE.data,
    meta: SAMPLE_TBL_GAUGE.meta,
  })

  mock.onPost('gauge').reply((data) => {
    console.log('mock', 'gauge', data)
    return [
      200,
      {
        data: {
          message: 'gauge added',
          data: null,
        },
      },
    ]
  })

  mock.onPut(new RegExp(`gauge/*`)).reply((data) => {
    console.log('mock', 'gauge', data)
    return [
      200,
      {
        data: {
          message: 'gauge edited',
          data: null,
        },
      },
    ]
  })

  mock.onDelete(new RegExp(`gauge/*`)).reply((data) => {
    console.log('mock', 'gauge', data)
    return [
      200,
      {
        data: {
          message: 'gauge deleted',
          data: null,
        },
      },
    ]
  })
}

const mstShiftMock = (mock) => {
  const url = new RegExp(`shift/*`);
  mock.onGet(url).reply(200, {
    data: SAMPLE_TBL_SHIFT.data,
    meta: SAMPLE_TBL_SHIFT.meta,
  })

  mock.onPost('shift').reply((data) => {
    console.log('mock', 'shift', data)
    return [
      200,
      {
        data: {
          message: 'shift added',
          data: null,
        },
      },
    ]
  })

  mock.onPut(url).reply((data) => {
    console.log('mock', 'shift', data)
    return [
      200,
      {
        data: {
          message: 'shift edited',
          data: null,
        },
      },
    ]
  })

  mock.onDelete(url).reply((data) => {
    console.log('mock', 'shift', data)
    return [
      200,
      {
        data: {
          message: 'shift deleted',
          data: null,
        },
      },
    ]
  })
}

const mstStandardIngotMock = (mock) => {
  const url = new RegExp(`ingot-standard/*`);
  mock.onGet(url).reply(200, {
    data: SAMPLE_TBL_STANDARD_INGOT.data,
    meta: SAMPLE_TBL_STANDARD_INGOT.meta,
  })

  mock.onPost('ingot-standard').reply((data) => {
    console.log('mock', 'ingot-standard', data)
    return [
      200,
      {
        data: {
          message: 'ingot-standard added',
          data: null,
        },
      },
    ]
  })

  mock.onPut(url).reply((data) => {
    console.log('mock', 'ingot-standard', data)
    return [
      200,
      {
        data: {
          message: 'ingot-standard edited',
          data: null,
        },
      },
    ]
  })

  mock.onDelete(url).reply((data) => {
    console.log('mock', 'ingot-standard', data)
    return [
      200,
      {
        data: {
          message: 'ingot-standard deleted',
          data: null,
        },
      },
    ]
  })
}

const mstStandardSandMock = (mock) => {
  const url = new RegExp(`sand-standard/*`);
  mock.onGet(url).reply(200, {
    data: SAMPLE_TBL_STANDARD_SAND.data,
    meta: SAMPLE_TBL_STANDARD_SAND.meta,
  })

  mock.onPost('sand-standard').reply((data) => {
    console.log('mock', 'sand-standard', data)
    return [
      200,
      {
        data: {
          message: 'sand-standard added',
          data: null,
        },
      },
    ]
  })

  mock.onPut(url).reply((data) => {
    console.log('mock', 'sand-standard', data)
    return [
      200,
      {
        data: {
          message: 'sand-standard edited',
          data: null,
        },
      },
    ]
  })

  mock.onDelete(url).reply((data) => {
    console.log('mock', 'sand-standard', data)
    return [
      200,
      {
        data: {
          message: 'sand-standard deleted',
          data: null,
        },
      },
    ]
  })
}

const mstSystemMock = (mock) => {
  const url = new RegExp(`system/*`);
  mock.onGet(url).reply(200, {
    data: SAMPLE_TBL_SYSTEM.data,
    meta: SAMPLE_TBL_SYSTEM.meta,
  })

  mock.onPost('system').reply((data) => {
    console.log('mock', 'system', data)
    return [
      200,
      {
        data: {
          message: 'system added',
          data: null,
        },
      },
    ]
  })

  mock.onPut(url).reply((data) => {
    console.log('mock', 'system', data)
    return [
      200,
      {
        data: {
          message: 'system edited',
          data: null,
        },
      },
    ]
  })

  mock.onDelete(url).reply((data) => {
    console.log('mock', 'system', data)
    return [
      200,
      {
        data: {
          message: 'system deleted',
          data: null,
        },
      },
    ]
  })
}

const mstUserMock = (mock) => {
  const url = new RegExp(`user/*`);
  mock.onGet(url).reply(200, {
    data: SAMPLE_TBL_USER.data,
    meta: SAMPLE_TBL_USER.meta,
  })

  mock.onPost('user').reply((data) => {
    console.log('mock', 'user', data)
    return [
      200,
      {
        data: {
          message: 'user added',
          data: null,
        },
      },
    ]
  })

  mock.onPut(url).reply((data) => {
    console.log('mock', 'user', data)
    return [
      200,
      {
        data: {
          message: 'user edited',
          data: null,
        },
      },
    ]
  })

  mock.onDelete(url).reply((data) => {
    console.log('mock', 'user', data)
    return [
      200,
      {
        data: {
          message: 'user deleted',
          data: null,
        },
      },
    ]
  })
}

const mstVendorMock = (mock) => {
  const url = new RegExp(`vendor/*`);
  mock.onGet(url).reply(200, {
    data: SAMPLE_TBL_VENDOR.data,
    meta: SAMPLE_TBL_VENDOR.meta,
  })

  mock.onPost('vendor').reply((data) => {
    console.log('mock', 'vendor', data)
    return [
      200,
      {
        data: {
          message: 'vendor added',
          data: null,
        },
      },
    ]
  })

  mock.onPut(url).reply((data) => {
    console.log('mock', 'vendor', data)
    return [
      200,
      {
        data: {
          message: 'vendor edited',
          data: null,
        },
      },
    ]
  })

  mock.onDelete(url).reply((data) => {
    console.log('mock', 'vendor', data)
    return [
      200,
      {
        data: {
          message: 'vendor deleted',
          data: null,
        },
      },
    ]
  })
}

const MockService = {
  init() {
    // This sets the mock adapter on the default instance
    var mock = new MockAdapter(axios, {delayResponses: 5000})

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
        return [200, {data: found}]
      }
      return [404, {errors: ['The login detail is incorrect']}]
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
      return [401, {errors: ['Invalid authentication']}]
    })

    mock.onPost('sample-sand').reply(201, {
      status: {
        message: 'OK',
        code: 0,
      },
    })

    mock
      .onGet('machine/', {
        params: {lineId: '4e53b6be-9593-456e-905e-b4f071490cdd'},
      })
      .reply(200, {data: MACHINES_MOCK})

    mock
      .onGet('machine/', {
        params: {lineId: '9fe67a31-8715-4961-a9ff-930ff7ef416a'},
      })
      .reply(200, {data: MACHINES_DC_MOCK})

    mock
      .onGet('machine/', {
        params: {materialCategory: 'SAND'},
      })
      .reply(200, {data: MACHINES_SAND_MOCK})

    mock.onGet('line').reply(200, {data: LINES_MOCK})
    mock.onGet('shift/').reply(200, {data: SHIFT_MOCK})

    // IF GaugeID not passing
    mock.onGet('shimadzu/').reply(200, {data: SAMPLE_CODE_SUGGESTED_MOCK})

    mock.onGet('sand-element').reply(200, {data: ELEMENT_SAND_MOCK})
    mock.onGet('ingot-element').reply(200, {data: ELEMENTS_MOCK})
    // mock.onGet('element').reply(200, { data: ELEMENTS_MOCK })

    mock
      .onGet('graph/ingot', {
        startDate: 1722470400,
        endDate: 1725148799,
        inCharge: 'INTERNAL',
        elementId: '9999bcbb-0e8a-4695-8f80-1000',
      })
      .reply(200, {data: CHART_PARAMETER_MOCK})

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
      .reply(200, {data: RES_REQ_QUERY_SHIMADZU_MOCK.data})

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
      .reply(200, {data: RES_REQ_QUERY_SHIMADZU_MOCK})

    // sample-sand/1
    mock
      .onGet('shimadzu', {
        params: {
          gaugeId: '8de4e9ca-f854-4380-9aa0-8f1d6d440202',
          inCharge: 'INTERNAL',
        },
      })
      .reply(200, {data: SAMPLE_CODE_SUGGESTED_PARAMS2_MOCK})

    mock
      .onGet('shimadzu/9999bcbb-0e8a-4695-8f80-caaf0a057dff', {
        // params: {
        //     sampleId: '9999bcbb-0e8a-4695-8f80-0000',
        //     incharge: 'INTERNAL',
        // },
      })
      .reply(200, {data: SAMPLE_INGOT_INTERNAL_MOCK})
    mock
      .onGet('shimadzu/5afbfaa9-5154-11ef-aae2-0242ac120002')
      .reply(200, {data: SAMPLE_INGOT_INTERNAL_MOCK})
    mock.onGet('gauge/').reply(200, {data: gauges})
    // shimadzu/9999bcbb-0e8a-4695-8f80-0000
    mock
      .onGet('shimadzu/9999bcbb-0e8a-4695-8f80-0000')
      .reply(200, {data: SAMPLE_INGOT_INTERNAL_MOCK})

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
      .reply(201, {data: SCANNED_RESULT_EMPTY_MOCK})
    // if data internal found
    // .reply(200, { data: SCANNED_RESULT_MOCK })

    mock
      .onGet('sample-ingot/1')
      .reply(200, {data: SCANNED_CODE_SUGGESTED_MOCK})

    mock.onPut('shimadzu/9999bcbb-0e8a-4695-8f80-0000').reply((data) => {
      console.log('MOCKS')
      console.log(data.data)
      // return [201, OK_INGOT_CHECK_VENDOR]
      return [201, NG_INGOT_CHECK_VENDOR]
    })

    mock
      .onPut('/shimadzu/9999bcbb-0e8a-4695-8f80-0000/adjustment')
      // if data internal not found
      .reply(201, {data: 'success'})

    mock.onGet('sample-ingot/historical').reply(200, {
      data: SAMPLE_INGOT_HISORICALS_MOCK.data,
      meta: SAMPLE_INGOT_HISORICALS_MOCK.meta,
    })
    // .reply(200, { data: SAMPLE_INGOT_HISORICALS_EMPTY_MOCK })

    mock
      .onGet('shimadzu/c31c4192-c127-4ace-b805-bbb00987788a')
      .reply(200, {data: SCANNED_RESULT_MOCK})
    // shimadzu/9999bcbb-0e8a-4695-8f80-0000
    // .reply(200, { data: SAMPLE_INGOT_INTERNAL_MOCK })
    mock
      .onGet('shimadzu/9999bcbb-0e8a-4695-8f80-0000')
      .reply(200, {data: SCANNED_RESULT_MOCK})

    mock
      .onGet('sample-sand/historical', {
        params: {
          take: 20,
          page: 1,
          startDate: 1725148800,
          endDate: 1725667199,
        },
      })
      .reply(200, {...SAMPLE_SAND_HISTORICALS_MOCK})

    mock
      .onGet('sample-sand/c31c4192-c127-4ace-b805-bbb00987788a')
      .reply(200, {data: ELEMENT_SAND_DETAIL})

    mstLineMock(mock)
    mstMachineMock(mock)
    mstGaugeMock(mock)
    mstShiftMock(mock)
    mstStandardIngotMock(mock)
    mstStandardSandMock(mock)
    mstSystemMock(mock)
    mstUserMock(mock)
    mstVendorMock(mock)
  },
}

export default MockService
