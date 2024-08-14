const NG_INGOT_CHECK_VENDOR = {
    message: 'success',
    data: {
        elementOutOfRanged: [{
                elementId: 1,
                elementName: 'si',
                elementValue: 0,
                max: 1,
                min: 0,
                adjustmentFormula: {
                    avg: 11.25, // average per element batas atas & bawah
                    budomari: 75, // per element constant
                    weightMolten: 3000, // per element constant
                    result: 22, // result calculation
                },
            },
            {
                elementId: 2,
                elementName: 'cu',
                elementValue: 0,
                max: 1,
                min: 0,
                adjustmentFormula: {
                    budomari: 75,
                    weightMolten: 3000,
                    result: 22,
                },
            },
        ],
        reportLink: 'link-disini',
    },
    code: 0,
}

export default NG_INGOT_CHECK_VENDOR