import Chart from './src/index'

/* istanbul ignore next */
Chart.install = function(Vue) {
  Vue.component(Chart.name, Chart)
}

export default Chart
