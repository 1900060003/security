import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import i18n from './languages'
import ElementUI from 'element-ui'
import Enum from 'vue-enum'
import enums from './utils/enums'
import cookies from 'vue-cookies'
import 'normalize.css'
import animated from 'animate.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/global.scss'

Vue.config.productionTip = false

Vue.use(cookies)
Vue.use(animated)
Vue.use(Enum, enums)

Vue.use(ElementUI, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.prototype.$http = axios
Vue.prototype.$base_api = process.env.VUE_APP_BASE_API
Vue.prototype.$cookies = cookies
Vue.prototype.$cookies.config('2h')

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

document.title = i18n.t('servername')
