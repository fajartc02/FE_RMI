const SCANNED_RESULT_MOCK = {
  headers: {
    sampleCode: 'AC2C-DAII-240709-9334',
    shippingDate: '2024-09-13',
    materialName: 'AC2C',
  },
  tablePureVendor: {
    cols: [
      'Product Date',
      'Lot No',
      'Pcs',
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
          product_date: '2024-09-13',
          lot_no: 'AC2C-DAII-240709-9334-1',
          pcs: 150,
          weight: 2100,
          color1: '',
          color2: '',
        },
        {
          product_date: '2024-09-13',
          lot_no: 'AC2C-DAII-240709-9334-2',
          pcs: 150,
          weight: 2110,
          color1: '',
          color2: '',
        },
      ],
      values: [
        [
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: false,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
        ],
        [
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: false,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
        ],
      ],
    },
  },
  tableIntVendor: {
    cols: [
      'Product Date',
      'Lot No',
      'Pcs',
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
          product_date: '2024-09-13',
          lot_no: 'AC2C-DAII-240709-9334-1',
          pcs: 150,
          weight: 2100,
          color1: '',
          color2: '',
        },
        {
          product_date: '2024-09-13',
          lot_no: 'AC2C-DAII-240709-9334-2',
          pcs: 150,
          weight: 2110,
          color1: '',
          color2: '',
        },
      ],
      values: [
        [
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: false,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
        ],
        [
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: false,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
          {
            value: Math.random().toFixed(2),
            is_ok: true,
          },
        ],
      ],
    },
  },
}

export default SCANNED_RESULT_MOCK
