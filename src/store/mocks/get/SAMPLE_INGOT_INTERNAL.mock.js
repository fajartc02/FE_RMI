const SAMPLE_INGOT_INTERNAL_MOCK = {
  headers: {
    sampleId: 1,
    sampleCode: 'AC2C-DAII-240709-9334',
    shippingDate: '2024-09-13',
    materialName: 'AC2C',
  },
  tablePureVendor: null,
  tableInternalVendor: {
    id: '9999bcbb-0e8a-4695-8f80-0000',
    cols: [
      'Product Date',
      'Lot No',
      'pieces',
      'Weight',
      'Color 1',
      'Color 2',
      'Cu',
      'Si',
      'Mg',
      'Zn',
      'Fe',
      'Mn',
      'Ni',
      'Ti',
      'Pb',
      'Sn',
      'Cr',
      'Bi',
      'Ca',
      'P',
    ],
    standards: [
      'Standard',
      '',
      '',
      '',
      '',
      '',
      '2.50/3.50',
      '2.50/3.50',
      '2.50/3.50',
      '2.50/3.50',
      '2.50/3.50',
      '2.50/3.50',
      '2.50/3.50',
      '2.50/3.50',
      '2.50/3.50',
      '2.50/3.50',
      '2.50/3.50',
      '2.50/3.50',
      '2.50/3.50',
      '2.50/3.50',
    ],
    values: {
      headers: [
        {
          productDate: '2024-09-13',
          lotNo: 'AC2C-DAII-240709-9334-1',
          pieces: 150,
          weight: 2100,
          color1: '',
          color2: '',
        },
        {
          productDate: '2024-09-13',
          lotNo: 'AC2C-DAII-240709-9334-2',
          pieces: 150,
          weight: 2110,
          color1: '',
          color2: '',
        },
      ],
      values: [
        [
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: false,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
        ],
        [
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: false,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
          {
            value: Math.random().toFixed(2),
            isOk: true,
          },
        ],
      ],
    },
  },
  sampleCodeSuggested: null,
}

export default SAMPLE_INGOT_INTERNAL_MOCK
