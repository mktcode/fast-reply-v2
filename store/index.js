import Vuex from 'vuex'
import { sc2api } from './sc2'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const createStore = () => {
  return new Vuex.Store({
    state: {
      visibleSide: 'left',
      loginUrl: sc2api.getLoginURL(),
      user: null,
      vp: null,
      comments: [],
      activeComment: null
    },
    getters,
    mutations,
    actions
  })
}

export default createStore