const SAMPLE_TBL_GAUGE = {
  status: {
    code: 0,
    message: 'OK',
  },
  data: [
    {
      no: 1,
      id: '9999bcbb-0e8a-4695-8f80-caaf0a057dff',
      line_id: '4e53b6be-9593-456e-905e-b4f071490cdd',
      line_nm: 'LPDC',
      name: 'Shimadzu 1',
      code: 'SHIMADZU-1',
      description: 'Shimadzu 1',
    },
    {
      no: 2,
      id: '8de4e9ca-f854-4380-9aa0-8f1d6d440202',
      line_id: '9fe67a31-8715-4961-a9ff-930ff7ef416a',
      line_nm: 'HPDC',
      name: 'Shimadzu 2',
      code: 'SHIMADZU-2',
      description: 'Shimadzu 2',
    },
  ],
  meta: {
    pagination: {
      // page: 1,
      take: 20,
      itemCount: 22,
      pageCount: 2,
      hasPreviousPage: false,
      hasNextPage: false,
    },
    timestamp: '2024-08-07T12:38:46.696Z',
  },
}

export default SAMPLE_TBL_GAUGE
