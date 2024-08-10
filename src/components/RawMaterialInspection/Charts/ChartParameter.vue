<template>
  <div id="chart">
    <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
<script>
export default {
  name: "ChartParameter",
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
        },
        title: {
          show: false
        },
        fill: {
          type: 'solid',
          colors: ['transparent'],
        },
        stroke: {
          dashArray: [4, 4, 0, 4, 4],
        },
        colors: ['#FF4560', '#FEB019', '#00E396', '#FEB019', '#FF4560'],
        yaxis: {
          labels: {
            formatter: function (val) {
              return (val).toFixed(2);
            },
          },
          title: {
            text: '<satuan nya apa>'
          },
        },
        annotations: {
          points: [{
            x: new Date(1538784600000),
            y: 2,
            label: {
              borderColor: '#FF4560',
              style: {
                color: '#fff',
                background: '#FF4560',
              },
              text: 'Annotation 1',
            }
          },],
        },
        xaxis: {
          type: 'datetime',
        },
        legend: {
          show: false
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return (val).toFixed(2)
            }
          }
        }
      },
      series: [{
        name: 'lower-limit',
        data: [
          {
            x: new Date(1538778600000),
            y: 0
          },
          {
            x: new Date(1538782000000),
            y: 0
          },
          {
            x: new Date(1538784600000),
            y: 0
          },
          {
            x: new Date(1538787200000),
            y: 0
          },
          {
            x: new Date(1538789800000),
            y: 0
          },
          {
            x: new Date(1538792400000),
            y: 0
          },
          {
            x: new Date(1538795000000),
            y: 0
          },
          {
            x: new Date(1538797600000),
            y: 0
          },
        ]
      }, {
        name: 'Warning (LL)',
        data: [
          {
            x: new Date(1538778600000),
            y: 0.2
          },
          {
            x: new Date(1538782000000),
            y: 0.2
          },
          {
            x: new Date(1538784600000),
            y: 0.2
          },
          {
            x: new Date(1538787200000),
            y: 0.2
          },
          {
            x: new Date(1538789800000),
            y: 0.2
          },
          {
            x: new Date(1538792400000),
            y: 0.2
          },
          {
            x: new Date(1538795000000),
            y: 0.2
          },
          {
            x: new Date(1538797600000),
            y: 0.2
          },
        ]
      }, {
        name: 'parameter-label',
        data: [
          {
            x: new Date(1538778600000),
            y: Math.random()
          },
          {
            x: new Date(1538782000000),
            y: Math.random()
          },
          {
            x: new Date(1538784600000),
            y: Math.random()
          },
          {
            x: new Date(1538787200000),
            y: Math.random()
          },
          {
            x: new Date(1538789800000),
            y: Math.random()
          },
          {
            x: new Date(1538792400000),
            y: Math.random()
          },
          {
            x: new Date(1538795000000),
            y: Math.random()
          },
          {
            x: new Date(1538797600000),
            y: Math.random()
          },
        ]
      },
      {
        name: 'Warning (UL)',
        data: [
          {
            x: new Date(1538778600000),
            y: 1.8
          },
          {
            x: new Date(1538782000000),
            y: 1.8
          },
          {
            x: new Date(1538784600000),
            y: 1.8
          },
          {
            x: new Date(1538787200000),
            y: 1.8
          },
          {
            x: new Date(1538789800000),
            y: 1.8
          },
          {
            x: new Date(1538792400000),
            y: 1.8
          },
          {
            x: new Date(1538795000000),
            y: 1.8
          },
          {
            x: new Date(1538797600000),
            y: 1.8
          },
        ]
      },
      {
        name: 'Upper Limit',
        data: [
          {
            x: new Date(1538778600000),
            y: 2
          },
          {
            x: new Date(1538782000000),
            y: 2
          },
          {
            x: new Date(1538784600000),
            y: 2
          },
          {
            x: new Date(1538787200000),
            y: 2
          },
          {
            x: new Date(1538789800000),
            y: 2
          },
          {
            x: new Date(1538792400000),
            y: 2
          },
          {
            x: new Date(1538795000000),
            y: 2
          },
          {
            x: new Date(1538797600000),
            y: 2
          },
        ]
      }]
    }
  },
}
</script>
