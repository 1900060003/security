import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'vue-cookies'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    permissions: [],
    menus: [],
    viewsLayout: sessionStorage.getItem('viewsLayout') ? JSON.parse(sessionStorage.getItem('viewsLayout')) : [{ x: 0, y: 0, w: 12, h: 2, i: 0, minW: 3, minH: 1, maxW: null, maxH: null, componentName: 'AirLabel', moved: false, attributes: { text: '安全监管', labelAlign: 'AC', fontSize: 24 } }, { x: 0, y: 1, w: 4, h: 4, i: 1, minW: 4, minH: 4, maxW: null, maxH: null, componentName: 'AirChart', moved: false, attributes: { chartType: 'line' } }, { x: 4, y: 1, w: 4, h: 4, i: 2, minW: 4, minH: 4, maxW: null, maxH: null, componentName: 'AirChart', moved: false, attributes: { chartType: 'pie' } }, { x: 0, y: 5, w: 12, h: 7, i: 3, minW: 4, minH: 4, maxW: null, maxH: null, componentName: 'AirChart', moved: false, attributes: { chartType: 'geography' } }, { x: 8, y: 1, w: 4, h: 4, i: 4, minW: 4, minH: 4, maxW: null, maxH: null, componentName: 'AirChart', moved: false, attributes: { chartType: 'column' } }]
  },
  mutations: {
    SET_VIEW_LAYOUT: (state, data) => {
      state.viewsLayout = data
      sessionStorage.setItem('viewsLayout', JSON.stringify(data))
    }
  },
  actions: {
    clearUser({ commit, state }) {
      Cookies.remove('auth_token')
      state.user = null
      state.permissions = []
      state.menus = []
    },
    getUser({ commit, state }) {
      state.user = {
        name: 'Test'
      }
      state.menus = [{
        path: 'system',
        children: [{
          path: 'user'
        }, {
          path: 'role'
        }, {
          path: 'parameter'
        }, {
          path: 'menu'
        }, {
          path: 'information'
        }]
      }, {
        path: 'basic',
        children: [{
          path: 'basicInformation'
        }, {
          path: 'documentation'
        }, {
          path: 'expertLibrary'
        }, {
          path: 'keyOrganization'
        }, {
          path: 'normLibrary'
        }, {
          path: 'organization'
        }, {
          path: 'ratingRules'
        }]
      }, {
        path: 'selfInspection',
        children: [{
          path: 'task'
        }, {
          path: 'distribution'
        }, {
          path: 'secondaryDistribution'
        }, {
          path: 'receive'
        }, {
          path: 'track'
        }]
      }, {
        path: 'onSite',
        children: [{
          path: 'task'
        }, {
          path: 'distribution'
        }, {
          path: 'receive'
        }, {
          path: 'track'
        }]
      }, {
        path: 'analysis'
      }]
    }
  },
  modules: {},
  getters: {
    user: state => state.user,
    permissions: state => state.permissions,
    menus: state => state.menus,
    viewsLayout: state => state.viewsLayout
  }
})
