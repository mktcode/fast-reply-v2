import axios from 'axios'
import steem from 'steem'
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
          await dispatch('updateVP')
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
  },
  updateVP ({ commit, state }) {
    if (state.user) {
      steem.api.getAccounts([state.user.account.name], function (err, response) {
        if (!err) {
          let secondsago = (new Date() - new Date(response[0].last_vote_time + 'Z')) / 1000
          let vpow = response[0].voting_power + (10000 * secondsago / 432000)
          vpow = Math.min(vpow / 100, 100).toFixed(2)
          commit('updateVP', vpow)
        }
      })
    }
  },
}