import Vue from 'vue'
import VueStorage from 'vue-ls'

Vue.use(VueStorage)

export default {
  goLeft (state) {
    state.visibleSide = 'left'
  },
  goRight (state) {
    state.visibleSide = 'right'
  },
  login (state, user) {
    state.user = user ? user : null

  },
  logout (state) {
    state.user = null
  },
  updateComments (state, comments) {
    state.comments = comments ? comments.data.comments : null
  },
  selectComment (state, commentId) {
    state.activeComment = state.comments[state.comments.findIndex(comment => comment.id === commentId)]
  },
  timer (state, timer) {
    // remove previous interval, if set
    if (state.timers[timer]) {
      clearInterval(state.timers[timer.name])
      state.timers[timer] = null
    }

    // add new timer
    if (timer.value) {
      state.timers[timer.name] = timer.value
    }
  },
  updateVP (state, vp) {
    state.vp = vp
  },
  /** Managing pending actions **/
  addPendingAction (state, action) {
    state.pending.push(action)
    Vue.ls.set('pending', state.pending)
  },
  deletePendingAction (state, action) {
    state.pending = state.pending.filter(a => a !== action)
    Vue.ls.set('pending', state.pending)
  },
  failedAttempt (state, action) {
    // Search for action in state
    let failedAction = state.pending.find(item => item === action)
    if (failedAction) {
      // if found, increase attempts counter
      failedAction.attempts++
    }
  },
  isSchedulerRunning (state, value) {
    state.isSchedulerRunning = value
    Vue.ls.set('running', state.isSchedulerRunning)
  },
  failedAttempt (state, action) {
    // Search for action in state
    let failedAction = state.pending.find(item => item === action)
    if (failedAction) {
      // if found, increase attempts counter
      failedAction.attempts++
    }
  }
}