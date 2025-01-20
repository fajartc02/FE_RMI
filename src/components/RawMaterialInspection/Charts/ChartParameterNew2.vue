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
        colors: ['#00E396', '#624119', '#001396', '#134396', '#007bff'],
        chart: {
          id: 'vuechart-example'
        },
        labels: [],
        xaxis: {
          categories: [],
          labels: {
            formatter: function (val) {
              return new Date(val).getDate();
            }
          },
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: [0, 0, 1, 1, 1, 1, 1, 0, 0],
          colors: ['#000'],
          strokeWidth: 0,
        },
        // annotations: {
        //   yaxis: [
        //     {
        //       y: 0,
        //       y2: 3,
        //       borderColor: '#000',
        //       fillColor: '#FEB019',
        //       opacity: 0.2,
        //       label: {
        //         borderColor: '#333',
        //         style: {
        //           fontSize: '10px',
        //           color: '#333',
        //           background: '#FEB019',
        //         },
        //         text: 'Y-axis range',
        //       }
        //     }
        //   ]
        //   // yaxis: [
        //   //   {
        //   //     y: 5,
        //   //     y2: 3,
        //   //     borderColor: '#000',
        //   //     fillColor: '#FEB019',
        //   //     opacity: 0.2,
        //   //     label: {
        //   //       borderColor: '#333',
        //   //       style: {
        //   //         fontSize: '10px',
        //   //         color: '#333',
        //   //         background: '#FEB019',
        //   //       },
        //   //       text: 'Y-axis range',
        //   //     }
        //   //   }
        //   // ],
        //   // points: [
        //   //   {
        //   //     x: 1735689600000,
        //   //     y: 10,
        //   //     label: {
        //   //       borderColor: '#775DD0',
        //   //       offsetY: 0,
        //   //       style: {
        //   //         color: '#fff',
        //   //         background: '#775DD0',
        //   //       },
        //   //       text: 'Annotation Test'
        //   //     }
        //   //   },
        //   // ]
        // },
        stroke: {
          width: 1
        },
      },
      series: [],
      filterChart: {}
    }
  },
  computed: {
    ...mapGetters([GET_GRAPH])
  },
  methods: {
    ...mapActions([ACTION_GRAPH, ACTION_GRAPH_SAND]),
    async getGraph() {
      try {
        this.filterChart = {
          ...this.filters,
          inCharge: this.inCharge,
          elementId: this.elementId
        }
        if (this.elementId != 'NONE') {
          if (this.element == 'INGOT') {
            const data = await this.ACTION_GRAPH(this.filterChart)
            console.log('data: ', data);
            if (data.length > 0) {
              this.chartOptions = {
                colors: this.colors,
                chart: {
                  id: 'vuechart-example'
                },
                labels: [],
                xaxis: {
                  categories: [],
                  labels: {
                    formatter: function (val) {
                      return new Date(val).getDate();
                    }
                  },
                },
                dataLabels: {
                  enabled: false
                },
                markers: {
                  size: [0, 0, 1, 1, 1, 1, 1, 0, 0],
                  colors: ['#000'],
                  strokeWidth: 0,
                },
                annotations: {
                  yaxis: [
                    {
                      y: data[0].lowerLimit,
                      y2: data[0].warningLowLimit,
                      borderColor: '#000',
                      fillColor: '#FEB019',
                      opacity: 0.2,
                      label: {
                        borderColor: '#333',
                        style: {
                          fontSize: '10px',
                          color: '#333',
                          background: '#FEB019',
                        },
                        text: 'Warning Low Limit',
                      }
                    },
                    {
                      y: data[0].lowerLimit,
                      y2: data[0].lowerLimit - 0.00001,
                      borderColor: '#000',
                      fillColor: '#FF4560',
                      opacity: 0.2,
                      label: {
                        borderColor: '#333',
                        style: {
                          fontSize: '10px',
                          color: '#333',
                          background: '#FF4560',
                        },
                        text: 'Lower Limit',
                      }
                    },
                    {
                      y: data[0].upperLimit,
                      y2: data[0].upperLimit + 0.00001,
                      borderColor: '#000',
                      fillColor: '#FF4560',
                      opacity: 0.2,
                      label: {
                        borderColor: '#333',
                        style: {
                          fontSize: '10px',
                          color: '#333',
                          background: '#FF4560',
                        },
                        text: 'Upper Limit',
                      }
                    },
                    {
                      y: data[0].warningHighLimit,
                      y2: data[0].upperLimit + 0.000001,
                      borderColor: '#000',
                      fillColor: '#FEB019',
                      opacity: 0.2,
                      label: {
                        borderColor: '#333',
                        style: {
                          fontSize: '10px',
                          color: '#333',
                          background: '#FEB019',
                        },
                        text: 'Warning Up Limit',
                      }
                    },
                  ],
                  // points: [
                  // {
                  //   x: 1735689600000,
                  //   y: 10,
                  //   label: {
                  //     borderColor: '#775DD0',
                  //     offsetY: 0,
                  //     style: {
                  //       color: '#fff',
                  //       background: '#775DD0',
                  //     },
                  //     text: 'Annotation Test'
                  //   }
                  // },
                  // ]
                },
                stroke: {
                  width: 1
                },
              }
              this.series = data
              console.log('series: ', data)

              if (data.series.length === 9) {
                this.colors = ['#00E396', '#624119', '#001396', '#134396', '#007bff']
                this.dashArray = [5, 5, 0, 0, 0, 0, 0, 5, 5]
                this.markers = [0, 0, 2, 2, 2, 2, 2, 0, 0]
              } else if (data.series.length === 6) {
                this.colors = ['#00E396', '#007bff']
                this.dashArray = [5, 5, 0, 0, 5, 5]
                this.markers = [0, 0, 2, 2, 0, 0]
              } else {
                this.colors = ['#00E396']
                this.dashArray = [5, 5, 0, 5, 5]
                this.markers = [0, 0, 2, 0, 0]
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
        // this.$swal('Error', JSON.stringify(error), 'error')
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
    },
    element: {
      type: String,
      default: 'INGOT'
    }
  },
  mounted() {
    this.getGraph()
  }
}
</script>
