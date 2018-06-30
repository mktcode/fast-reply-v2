import axios from 'axios'
import steem from 'steem'
import { sc2api, sc2utils } from './sc2'

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
  executePendingAction ({ commit, state }, action) {
    switch (action.type) {
      case 'comment': {
        sc2utils.comment(state.user.account.name, action.author, action.permlink, action.body, action.created)
          .then(() => commit('deletePendingAction', action))
          .catch(err => {
            console.log('Error SC2 during comment: ', err.error_description)
            console.log('Failed action: ', action)
            commit('failedAttempt', action)
          })
        break
      }
      case 'vote': {
        sc2utils.vote(state.user.account.name, action.author, action.permlink, action.vote)
          .then(() => commit('deletePendingAction', action))
          .catch(err => {
            commit('failedAttempt', action)
            if (err.error_description === 'itr->vote_percent != o.weight: You have already voted in a similar way.') {
              // already been processed, remove this action from pending
              commit('deletePendingAction', action)
            } else {
              console.log('Failed action: ', action)
              console.log('Error SC2 during vote: ', err.error_description)
              commit('failedAttempt', action)
            }
          })
        break
      }
    }
  },
  /** Execute next action if scheduler is enabled **/
  executeNextPendingActionOfType ({ dispatch, state }, type) {
    if (state.isSchedulerRunning) {
      // find next pending action of requested type, if any
      let next = state.pending
        .filter(action => action.type === type)
        // Abandon the action after 5 failed attempts
        .filter(action => action.attempts < 3)
        // If candidates are available, take the first one
        .shift()
      if (next) {
        // Execute it
        dispatch('executePendingAction', next)
      }
    }
  },
}