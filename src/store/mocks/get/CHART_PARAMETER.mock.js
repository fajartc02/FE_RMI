const CHART_PARAMETER_MOCK = {
    status: {
        code: 0,
        message: 'OK',
    },
    data: {
        series: [{
                name: 'lower-limit',
                data: [{
                        x: new Date(1538778600000),
                        y: 0,
                    },
                    {
                        x: new Date(1538782000000),
                        y: 0,
                    },
                    {
                        x: new Date(1538784600000),
                        y: 0,
                    },
                    {
                        x: new Date(1538787200000),
                        y: 0,
                    },
                    {
                        x: new Date(1538789800000),
                        y: 0,
                    },
                    {
                        x: new Date(1538792400000),
                        y: 0,
                    },
                    {
                        x: new Date(1538795000000),
                        y: 0,
                    },
                    {
                        x: new Date(1538797600000),
                        y: 0,
                    },
                ],
            },
            {
                name: 'Warning (UL)',
                data: [{
                        x: new Date(1538778600000),
                        y: 0.2,
                    },
                    {
                        x: new Date(1538782000000),
                        y: 0.2,
                    },
                    {
                        x: new Date(1538784600000),
                        y: 0.2,
                    },
                    {
                        x: new Date(1538787200000),
                        y: 0.2,
                    },
                    {
                        x: new Date(1538789800000),
                        y: 0.2,
                    },
                    {
                        x: new Date(1538792400000),
                        y: 0.2,
                    },
                    {
                        x: new Date(1538795000000),
                        y: 0.2,
                    },
                    {
                        x: new Date(1538797600000),
                        y: 0.2,
                    },
                ],
            },
            {
                name: 'parameter-label',
                data: [{
                        x: new Date(1538778600000),
                        y: Math.random(),
                    },
                    {
                        x: new Date(1538782000000),
                        y: Math.random(),
                    },
                    {
                        x: new Date(1538784600000),
                        y: Math.random(),
                    },
                    {
                        x: new Date(1538787200000),
                        y: Math.random(),
                    },
                    {
                        x: new Date(1538789800000),
                        y: Math.random(),
                    },
                    {
                        x: new Date(1538792400000),
                        y: Math.random(),
                    },
                    {
                        x: new Date(1538795000000),
                        y: Math.random(),
                    },
                    {
                        x: new Date(1538797600000),
                        y: Math.random(),
                    },
                ],
            },
            {
                name: 'Warning (UL)',
                data: [{
                        x: new Date(1538778600000),
                        y: 1.8,
                    },
                    {
                        x: new Date(1538782000000),
                        y: 1.8,
                    },
                    {
                        x: new Date(1538784600000),
                        y: 1.8,
                    },
                    {
                        x: new Date(1538787200000),
                        y: 1.8,
                    },
                    {
                        x: new Date(1538789800000),
                        y: 1.8,
                    },
                    {
                        x: new Date(1538792400000),
                        y: 1.8,
                    },
                    {
                        x: new Date(1538795000000),
                        y: 1.8,
                    },
                    {
                        x: new Date(1538797600000),
                        y: 1.8,
                    },
                ],
            },
            {
                name: 'Upper Limit',
                data: [{
                        x: new Date(1538778600000),
                        y: 2,
                    },
                    {
                        x: new Date(1538782000000),
                        y: 2,
                    },
                    {
                        x: new Date(1538784600000),
                        y: 2,
                    },
                    {
                        x: new Date(1538787200000),
                        y: 2,
                    },
                    {
                        x: new Date(1538789800000),
                        y: 2,
                    },
                    {
                        x: new Date(1538792400000),
                        y: 2,
                    },
                    {
                        x: new Date(1538795000000),
                        y: 2,
                    },
                    {
                        x: new Date(1538797600000),
                        y: 2,
                    },
                ],
            },
        ],
        units: 'mm',
        annotations: {
            points: [{
                x: new Date(1538789800000).getTime(),
                y: 0.2,
                label: {
                    borderColor: '#FF4560',
                    style: {
                        color: '#fff',
                        background: '#FF4560',
                    },
                    text: 'Annotation 1',
                },
            }, ],
        },
    },
}

export default CHART_PARAMETER_MOCK