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
      },
      login (state, user) {
        state.user = user
      },
      logout (state) {
        state.user = null
      }
    },
    actions: {
      login ({ commit }, accessToken) {
        sc2api.setAccessToken(accessToken)

        return new Promise((resolve, reject) => {
          sc2api.me((err, user) => {
            if (err) reject(err);
            else {
              commit('login', user);
              resolve(user)
            }
          })
        })
      },
      logout ({ commit }) {
        sc2api.revokeToken((err) => {
          if (err) console.log(err)
          else commit('logout')
        })
      }
    }
  })
}

export default createStore