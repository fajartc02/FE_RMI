const SAMPLE_TBL_SYSTEM = {
  status: {
    code: 0,
    message: 'OK',
  },
  data: [
    {
      id: '9999bcbb-0e8a-4695-8f80-caaf0a057dff',
      no: 1,
      type: 'Type 1',
      value: 'Type Unit 1',
      code: 'TYPE001',
      description: 'Type Sample 1',
    },
    {
      id: '9999bcbb-0e8a-4695-caaf0a057dff',
      no: 2,
      type: 'Type 2',
      value: 'Type Unit 2',
      code: 'TYPE002',
      description: 'Type Sample 2',
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

export default SAMPLE_TBL_SYSTEM
