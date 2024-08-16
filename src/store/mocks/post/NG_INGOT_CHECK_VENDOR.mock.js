const NG_INGOT_CHECK_VENDOR = {
  message: 'success',
  data: {
    lotNo: 'AC2C-DAII-240709-9334',
    values: [
      {
        lotNo: 'AC2C-DAII-240709-9334',
        elements: [
          {
            elementId: 1,
            name: 'si',
            value: 0,
            max: 1,
            min: 0,
            adjustmentFormula: {
              avg: 11.25, // average per element batas atas & bawah
              budomari: 75, // per element constant
              weightMolten: 3000, // per element constant
              adjustmentValue: 22, // adjustmentValue calculation
            },
          },
          {
            elementId: 2,
            name: 'cu',
            value: 0,
            max: 1,
            min: 0,
            adjustmentFormula: {
              avg: 11.25, // average per element batas atas & bawah
              budomari: 75, // per element constant
              weightMolten: 3000, // per element constant
              adjustmentValue: 22, // adjustmentValue calculation
            },
          },
        ],
      },
    ],
    reportLink: 'link-disini',
  },
  code: 0,
}

export default NG_INGOT_CHECK_VENDOR
