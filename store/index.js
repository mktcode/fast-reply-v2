import Vue from 'vue'
import Vuex from 'vuex'
import VueStorage from 'vue-ls'

import { sc2api } from './sc2'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(VueStorage)

const createStore = () => {
  let defaultConfig = {
    version: 0.2,
    ignoreList: {comments: [], users: []},
    vote: 100,
    sort: {field: 'created', inverted: false}
  }

  return new Vuex.Store({
    state: {
      visibleSide: 'left',
      loginUrl: sc2api.getLoginURL(),
      user: null,
      vp: null,
      comments: [],
      activeComment: null,
      timers: {},
      isSchedulerRunning: Vue.ls.get('running', true),
      pending: Vue.ls.get('pending', []),
      config: Vue.ls.get('config', defaultConfig)
    },
    getters,
    mutations,
    actions
  })
}

export default createStore