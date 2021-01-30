<template>
  <div :class="['air-chart', {'is-library': chart_hasLibrary}, chart_customCls]">
    <template v-if="chart_hasLibrary">
      <div><i class="el-icon-s-data"></i>{{$t('attributes.chart')}}</div>
    </template>
    <template v-else-if="chart_customize">
      <div style="height: 100%; position: relative;">
        <el-avatar>{{$t('attributes.chartType.' + this.chart_chartType)}}</el-avatar>
        <!-- <i class="el-icon-s-data" style="font-size: 1rem; position: absolute; top: calc(50% - .5rem); left: calc(50% - .5rem);"></i> -->
      </div>
    </template>
    <template v-else>
      <div class="chart" ref="chart"></div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'air-chart',
  customizationSize: {
    width: 4,
    height: 4,
    maxWidth: Infinity,
    maxHeight: Infinity,
    minWidth: 4,
    minHeight: 4
  },
  data() {
    return {
      myChart: null,
      layout: null,
      chart_hasLibrary: this.hasLibrary,
      chart_customize: this.hasCustomize,
      chart_customCls: '',
      chart_chartType: null
    }
  },
  computed: {},
  props: {
    hasLibrary: {
      type: Boolean,
      default: false
    },
    hasCustomize: {
      type: Boolean,
      default: false
    },
    attributes: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    chart_chartType() {
      if (this.layout) {
        this.layout.attributes.chartType = this.chart_chartType
        if (!this.hasLibrary && !this.chart_customize && this.chart_chartType) {
          setTimeout(e => {
            this.run()
          }, 1000)
        }
      }
    },
    attributes() {
      this.chart_chartType = this.attributes.chartType
    }
  },
  components: {},
  methods: {
    setChartType(e) {
      this.chart_chartType = e
    },
    getCustomizationConfig(layout) {
      this.layout = layout
      this.layout.attributes = {
        chartType: this.chart_chartType
      }
      return [{
        name: this.$t('attributes.chartType.main'),
        type: 'select',
        option: [{
          text: this.$t('attributes.chartType.line'),
          value: 'line'
        }, {
          text: this.$t('attributes.chartType.pie'),
          value: 'pie'
        }, {
          text: this.$t('attributes.chartType.column'),
          value: 'column'
        }, {
          text: this.$t('attributes.chartType.geography'),
          value: 'geography'
        }],
        value: this.chart_chartType,
        fn: this.setChartType
      }]
    },
    run() {
      this.myChart = this.$echarts.init(this.$refs.chart)
      if (this.chart_chartType === 'line') {
        this.runLine()
      } else if (this.chart_chartType === 'pie') {
        this.runPie()
      } else if (this.chart_chartType === 'column') {
        this.runColumn()
      } else if (this.chart_chartType === 'geography') {
        this.runGeography()
      }
    },
    runLine() {
      this.myChart.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }]
      })
    },
    runPie() {
      this.myChart.setOption({
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true
        },
        series: [{
          type: 'pie',
          radius: [10, 60],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 4
          },
          data: [
            { value: 40, name: 'rose 1' },
            { value: 38, name: 'rose 2' },
            { value: 32, name: 'rose 3' },
            { value: 30, name: 'rose 4' }
          ]
        }]
      })
    },
    runColumn() {
      this.myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }]
      })
    },
    runGeography() {
      this.myChart.setOption({
        title: {
          left: 'center',
          textStyle: {
            color: '#909399',
            fontSize: 18
          }
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function(params) {
            var value = params.value || 0
            return params.name + ': ' + value.toLocaleString()
          }
        },
        visualMap: {
          left: 'right',
          min: 0,
          max: 1000,
          inRange: {
            color: ['#E6A23C', '#F56C6C']
          },
          text: ['High', 'Low'],
          calculable: true
        },
        series: [{
          type: 'map',
          roam: false,
          map: 'china',
          emphasis: {
            label: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#ddecfd',
              borderColor: '#303133'
            },
            emphasis: {
              areaColor: '#aacffb'
            }
          },
          textFixed: {
            Alaska: [20, -20]
          },
          data: []
        }]
      })
    }
  },
  mounted() {
    if (this.attributes) {
      this.chart_chartType = this.attributes.chartType
    }
    if (!this.hasLibrary && !this.chart_customize && this.chart_chartType) {
      setTimeout(e => {
        this.run()
      }, 1000)
    }
  }
}

</script>
<style lang="scss" scoped>
.air-chart {
  line-height: .8rem;
  font-size: .24rem;
  text-align: center;
  background: rgba(255, 255, 255, .5);
  height: 100%;

  &.is-library {
    font-size: .32rem;
    text-align: left;

    i {
      margin-right: 10px;
    }

    &:hover {
      background: #292f4c;
      color: #ffffff;
    }
  }

  &:not(.is-library) {
    &::v-deep {
      .chart {
        height: 100%;
        width: 100%;
      }

      .chart>div {
        margin: 0 auto !important;
      }
    }

    .el-avatar {
      width: 1rem;
      height: 1rem;
      line-height: 1rem;
      position: absolute;
      top: calc(50% - .5rem);
      left: calc(50% - .5rem);
    }
  }
}

</style>
