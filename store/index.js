import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      visibleSide: 'left'
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