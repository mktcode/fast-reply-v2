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
  }
}