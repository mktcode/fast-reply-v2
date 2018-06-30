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
  }
}