import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    permissions: [],
    menus: []
  },
  mutations: {},
  actions: {
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
    menus: state => state.menus
  }
})
