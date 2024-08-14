<template>
  <div id="chart">
    <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
<script>
import { ACTION_GRAPH, GET_GRAPH } from '@/store/modules/GRAPH.module';
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';

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
          }],
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
            formatter: function (val, opts) {
              console.log('opts');
              console.log(opts);
              return (val).toFixed(2)
            }
          }
        }
      },
      series: [],
      filterChart: {}
    }
  },
  computed: {
    ...mapGetters([GET_GRAPH])
  },
  methods: {
    ...mapActions([ACTION_GRAPH]),
    async getGraph() {
      try {
        this.filterChart = {
          ...this.filters,
          inCharge: this.inCharge,
          elementId: this.elementId
        }
        if (this.elementId != 'NONE') {
          const { data } = await this.ACTION_GRAPH(this.filterChart)

          if (data) {
            this.series = data.series
            this.chartOptions = {
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
                  text: data.units
                },
              },
              annotations: data.annotations,
              xaxis: {
                type: 'datetime'
              },
              legend: {
                show: false
              },
              tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                  console.log('seriesIndex, dataPointIndex');
                  console.log(seriesIndex, dataPointIndex);
                  return `<div class="card">
    <div class="card-header">
      <b>${moment(w.globals.seriesX[seriesIndex][dataPointIndex]).format('YYYY-MM-DD HH:mm:ss')}</b>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-auto">
          ${data.sampleCodes[dataPointIndex]}
        </div>
        <div class="col-auto">:</div>
        <div class="col-auto">
          <b>${series[seriesIndex][dataPointIndex].toFixed(2)}</b>
        </div>
        <div class="col-auto">${data.units}</div></div>
      </div>
    </div>
  </div>`
                  // return '<div class="card">' +
                  //   '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
                  //   '</div>'
                },
                shared: false,
                y: {
                  formatter: function (val, opts) {
                    console.log('opts, Y');
                    console.log(opts);
                    return (val).toFixed(2)
                  }
                },
                // z: {
                //   formatter: function (val, opts) {
                //     console.log('opts, Z');
                //     console.log(opts);
                //     return (val).toFixed(2)
                //   }
                // }
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
        this.$swal('Error', JSON.stringify(error), 'error')
      }
    }
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        this.filterChart = this.filters
        this.getGraph()
      }
    },
    GET_GRAPH() {
      console.log(this.GET_GRAPH);

    }
  },
  props: {
    elementId: {
      type: String,
      required: true
    },
    inCharge: {
      type: String,
      required: true
    },
    filters: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.getGraph()
  }
}
</script>
