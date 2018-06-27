import Vuex from 'vuex'
import { sc2api } from './sc2'

const createStore = () => {
  return new Vuex.Store({
    state: {
      visibleSide: 'left',
      loginUrl: sc2api.getLoginURL(),
      user: null,
      vp: null
    },
    mutations: {
      goLeft (state) {
        state.visibleSide = 'left'
      },
      goRight (state) {
        state.visibleSide = 'right'
      }
    }
  })
}

export default createStore