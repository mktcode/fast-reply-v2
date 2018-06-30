import axios from 'axios'
import { sc2api } from './sc2'

export default {
  async login ({ state, dispatch, commit }, accessToken) {
    sc2api.setAccessToken(accessToken)

    return new Promise((resolve, reject) => {
      sc2api.me(async (err, user) => {
        if (err) reject(err);
        else {
          commit('login', user);
          await dispatch('updateComments')
          if (state.comments.length) {
            await commit('selectComment', state.comments[0].id)
          }
          resolve(user)
        }
      })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      sc2api.revokeToken((err) => {
        if (err) reject(err)
        else {
          commit('logout')
          resolve()
        }
      })
    })
  },
  async updateComments ({ commit, state }) {
    let user = state.user
    if (user) {
      const url = 'http://api.comprendre-steem.fr/getComments?username=' + user.account.name
      const comments = await axios.get(url)
      commit('updateComments', comments)
      if (state.comments.length) {
        await commit('selectComment', state.comments[0].id)
      }
    }
  }
}