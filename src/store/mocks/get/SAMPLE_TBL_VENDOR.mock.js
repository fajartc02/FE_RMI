const SAMPLE_TBL_VENDOR = {
  status: {
    code: 0,
    message: 'OK',
  },
  data: [
    {
      id: '9999bcbb-0e8a-4695-8f80-caaf0a057dff',
      no: 1,
      name: 'PT. Suka Maju',
      code: 'SUKAMAJU01',
      description: 'PT pengolahan ingot',
      phone: '0123456789',
      address : 'Jl. Pagi'
    },
    {
      id: '0e8a-4695-8f80-caaf0a057dff',
      no: 2,
      name: 'PT. Suka Mndur',
      code: 'SUKAMNDR01',
      description: 'PT pengolahan sand',
      phone: '0123456789',
      address : 'Jl. Siang'
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

export default SAMPLE_TBL_VENDOR
