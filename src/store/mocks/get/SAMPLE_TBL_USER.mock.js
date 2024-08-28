const SAMPLE_TBL_USER = {
  status: {
    code: 0,
    message: 'OK',
  },
  data: [
    {
      id: '9999bcbb-0e8a-4695-8f80-caaf0a057dff',
      no: 1,
      firstName: 'User 1',
      email: 'user@mail.com',
      password: '12345',
      isActive: true,
    },
    {
      id: '0e8a-4695-8f80-caaf0a057dff',
      no: 2,
      firstName: 'User 2',
      email: 'user@mail.com',
      password: '12345',
      isActive: false,
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

export default SAMPLE_TBL_USER
