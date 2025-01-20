<template>
  <div id="chart">
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
<script>
import { ACTION_GRAPH, GET_GRAPH, ACTION_GRAPH_SAND } from '@/store/modules/GRAPH.module';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "ChartParameter",
  data() {
    return {
      chartOptions: {
        colors: ['#FF4560', '#FEB019', '#00E396', '#007bff', '#FEB019', '#FF4560'],
        chart: {
          id: 'vuechart-example'
        },
        stroke: {
          width: 2
        },
        xaxis: {
          categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        },
        anotations: {
          yaxis: [
            {
              y: 10,
              borderColor: '#00E396',
              label: {
                borderColor: '#00E396',
                style: {
                  color: '#fff',
                  background: '#00E396'
                },
                text: 'Y-axis annotation on 8800'
              }
            }
          ]
        }
      },
      series: [
        {
          name: 'Upper',
          data: [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
        },
        {
          name: 'W Upper',
          data: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        },
        {
          name: 'KMold-DC1',
          data: [3, 8, Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10),],
        },
        {
          name: 'KMold-DC2',
          data: [3, 8, Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() * 10),],
        },
        {
          name: 'W Lower',
          data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          name: 'Lower',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
      filterChart: {}
    }
  },
  computed: {
    ...mapGetters([GET_GRAPH])
  },
  methods: {
    ...mapActions([ACTION_GRAPH, ACTION_GRAPH_SAND]),
    //   async getGraph() {
    //     try {
    //       this.filterChart = {
    //         ...this.filters,
    //         inCharge: this.inCharge,
    //         elementId: this.elementId
    //       }
    //       console.log('filterChart', this.filterChart);

    //       if (this.elementId != 'NONE') {
    //         if (this.element == 'INGOT') {
    //           const { data } = await this.ACTION_GRAPH(this.filterChart)

    //           if (data) {
    //             this.series = data.series
    //             if (data.series.length === 6) {
    //               this.colors = ['#FF4560', '#FEB019', '#00E396', '#007bff', '#FEB019', '#FF4560']
    //               this.dashArray = [5, 5, 0, 0, 5, 5]
    //               this.markers = [0, 0, 2, 2, 0, 0]
    //             } else {
    //               this.colors = ['#FF4560', '#FEB019', '#00E396', '#FEB019', '#FF4560']
    //               this.dashArray = [5, 5, 0, 5, 5]
    //               this.markers = [0, 0, 2, 0, 0]
    //             }
    //             // data.series.length === 6 ? this.colors = ['#FF4560', '#FEB019', '#00E396', '#007bff', '#FEB019', '#FF4560'] : this.colors = ['#FF4560', '#FEB019', '#00E396', '#FEB019', '#FF4560']
    //             // data.series.length === 6 ? this.dashArray = [4, 4, 0, 0, 4, 4] : this.dashArray = [4, 4, 0, 4, 4]
    //             this.chartOptions = {
    //               chart: {
    //                 type: 'area',
    //                 stacked: false,
    //                 height: 350,
    //                 zoom: {
    //                   type: 'x',
    //                   enabled: true,
    //                   autoScaleYaxis: true
    //                 },
    //                 toolbar: {
    //                   autoSelected: 'zoom'
    //                 }
    //               },
    //               dataLabels: {
    //                 enabled: false
    //               },
    //               markers: {
    //                 size: this.markers,
    //                 strokeColors: '#000',
    //               },
    //               title: {
    //                 show: false
    //               },
    //               colors: this.colors,
    //               fill: {
    //                 type: 'solid',
    //                 colors: ['transparent'],
    //               },
    //               stroke: {
    //                 dashArray: this.dashArray,
    //               },
    //               colors: this.colors,
    //               yaxis: {
    //                 labels: {
    //                   formatter: function (val) {
    //                     return (val).toFixed(2);
    //                   },
    //                 },
    //                 title: {
    //                   text: data.units
    //                 },
    //               },
    //               annotations: data.annotations,
    //               xaxis: {
    //                 type: 'datetime'
    //               },
    //               legend: {
    //                 show: true,
    //                 position: 'bottom',
    //               },
    //               tooltip: {
    //                 custom: function ({ series, seriesIndex, dataPointIndex, w }) {
    //                   // console.log('seriesIndex, dataPointIndex');
    //                   // console.log(seriesIndex, dataPointIndex);
    //                   return `<div class="card">
    //   <div class="card-header">
    //     <b>${moment(w.globals.seriesX[seriesIndex][dataPointIndex]).format('YYYY-MM-DD HH:mm:ss')}</b>
    //   </div>
    //   <div class="card-body">
    //     <div class="row">
    //       <div class="col-auto">
    //         ${data.sampleCodes[dataPointIndex]}
    //       </div>
    //       <div class="col-auto">:</div>
    //       <div class="col-auto">
    //         <b>${series[seriesIndex][dataPointIndex].toFixed(2)}</b>
    //       </div>
    //       <div class="col-auto">${data.units || '%'}</div></div>
    //     </div>
    //   </div>
    // </div>`
    //                   // return '<div class="card">' +
    //                   //   '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
    //                   //   '</div>'
    //                 },
    //                 shared: false,
    //                 y: {
    //                   formatter: function (val, opts) {
    //                     // console.log('opts, Y');
    //                     // console.log(opts);
    //                     return (val).toFixed(2)
    //                   }
    //                 },
    //                 // z: {
    //                 //   formatter: function (val, opts) {
    //                 //     console.log('opts, Z');
    //                 //     console.log(opts);
    //                 //     return (val).toFixed(2)
    //                 //   }
    //                 // }
    //               }
    //             }
    //           }
    //         } else {
    //           const { data } = await this.ACTION_GRAPH_SAND(this.filterChart)
    //           if (data) {
    //             this.series = data.series
    //             if (data.series.length === 6) {
    //               this.colors = ['#FF4560', '#FEB019', '#00E396', '#007bff', '#FEB019', '#FF4560']
    //               this.dashArray = [5, 5, 0, 0, 5, 5]
    //               this.markers = [0, 0, 2, 2, 0, 0]
    //             } else {
    //               this.colors = ['#FF4560', '#FEB019', '#00E396', '#FEB019', '#FF4560']
    //               this.dashArray = [5, 5, 0, 5, 5]
    //               this.markers = [0, 0, 2, 0, 0]
    //             }

    //             this.chartOptions = {
    //               chart: {
    //                 type: 'area',
    //                 stacked: false,
    //                 height: 350,
    //                 zoom: {
    //                   type: 'x',
    //                   enabled: true,
    //                   autoScaleYaxis: true
    //                 },
    //                 toolbar: {
    //                   autoSelected: 'zoom'
    //                 }
    //               },
    //               dataLabels: {
    //                 enabled: false
    //               },
    //               markers: {
    //                 size: this.markers,
    //                 strokeColors: '#000',
    //               },
    //               title: {
    //                 show: false
    //               },
    //               fill: {
    //                 type: 'solid',
    //                 colors: ['transparent'],
    //               },
    //               stroke: {
    //                 dashArray: this.dashArray,
    //               },
    //               colors: this.colors,
    //               yaxis: {
    //                 labels: {
    //                   formatter: function (val) {
    //                     return (val).toFixed(2);
    //                   },
    //                 },
    //                 title: {
    //                   text: data.units
    //                 },
    //               },
    //               annotations: data.annotations,
    //               xaxis: {
    //                 type: 'datetime'
    //               },
    //               legend: {
    //                 show: true,
    //                 position: 'bottom',
    //               },
    //               tooltip: {
    //                 custom: function ({ series, seriesIndex, dataPointIndex, w }) {
    //                   // console.log('seriesIndex, dataPointIndex');
    //                   // console.log(seriesIndex, dataPointIndex);
    //                   return `<div class="card">
    //   <div class="card-header">
    //     <b>${moment(w.globals.seriesX[seriesIndex][dataPointIndex]).format('YYYY-MM-DD HH:mm:ss')}</b>
    //   </div>
    //   <div class="card-body">
    //     <div class="row">
    //       <div class="col-auto">
    //         ${data.sampleCodes[dataPointIndex]}
    //       </div>
    //       <div class="col-auto">:</div>
    //       <div class="col-auto">
    //         <b>${series[seriesIndex][dataPointIndex].toFixed(2)}</b>
    //       </div>
    //       <div class="col-auto">${data.units}</div></div>
    //     </div>
    //   </div>
    // </div>`
    //                   // return '<div class="card">' +
    //                   //   '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
    //                   //   '</div>'
    //                 },
    //                 shared: false,
    //                 y: {
    //                   formatter: function (val, opts) {
    //                     // console.log('opts, Y');
    //                     // console.log(opts);
    //                     return (val).toFixed(2)
    //                   }
    //                 },
    //                 // z: {
    //                 //   formatter: function (val, opts) {
    //                 //     console.log('opts, Z');
    //                 //     console.log(opts);
    //                 //     return (val).toFixed(2)
    //                 //   }
    //                 // }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     } catch (error) {
    //       console.log(error);
    //       this.$swal('Error', JSON.stringify(error), 'error')
    //     }
    //   }
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        this.filterChart = this.filters
        this.getGraph()
      }
    },
  },
  mounted() {
    // this.getGraph()
  }
}
</script>
