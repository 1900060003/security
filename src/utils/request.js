import Vue from 'vue'
import axios from 'axios'
import { Notification, Loading, MessageBox } from 'element-ui'
import i18n from '@/languages'
import router from '@/router'
import Cookies from 'vue-cookies'
import qs from 'qs'



const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000
})

const request = function(url, method, data, responseType) {
  return service({
    url,
    method,
    params: method === 'get' ? data : undefined,
    data: method === 'post' ? data : undefined,
    responseType
  })
}

let needLoadingRequestCount = 0

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) {
    return
  }
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

let loading

function startLoading() {
  loading = Loading.service({
    text: i18n.t('loading'),
    lock: true,
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {
  loading.close()
}

// request拦截器
service.interceptors.request.use(config => {
  MessageBox.alert(i18n.t('test'), i18n.t('action.title.warning'), {
    confirmButtonText: i18n.t('action.btn.confirm')
  })
  return
  showFullScreenLoading()
  config.headers.common.Authorization = Cookies.get('auth_token')
  return config
}, error => {
  Promise.reject(error)
})


// respone拦截器
service.interceptors.response.use(
  response => {
    Cookies.set('auth_token', response.config.headers.Authorization)
    tryHideFullScreenLoading()
    if (response.data.statusCode !== 200) {
      Notification({
        message: response.data.message,
        iconClass: 'el-icon-circle-close',
        duration: 5000,
        showClose: false
      })
    } else {
      return response.data
    }
  },
  error => {
    tryHideFullScreenLoading()
    Notification({
      message: error.message,
      iconClass: 'el-icon-circle-close',
      duration: 5000,
      showClose: false
    })
    return Promise.reject(error.message)
  }
)

export default request
