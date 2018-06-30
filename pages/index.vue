<script>
import Navbar from '~/components/Navbar/Navbar'
import NavbarBottom from '~/components/NavbarBottom/NavbarBottom'
import CommentList from '~/components/CommentList/CommentList'
import Details from '~/components/Details/Details'

import { sc2api } from '~/store/sc2'

export default {
  async fetch ({ app, store, redirect }) {
    const accessToken = app.ls.get('access_token')
    if (accessToken) {
      await store.dispatch('login', accessToken)
    } else {
      return redirect('/login')
    }
  },
  components: {
    Navbar,
    NavbarBottom,
    CommentList,
    Details
  },
  mounted() {
    // enable tooltips
    $('[data-toggle="tooltip"]').tooltip({trigger : 'hover'});
    $('.filter-menuitem').tooltip({trigger : 'hover'});

    // start update/broadcast intervals
    const SECOND = 1000

    // refresh VP every minute
    let vpTimer = setInterval(this.$store.dispatch, 60 * SECOND, 'updateVP')
    this.$store.commit('timer', {name: 'updateVP', value: vpTimer})

    // execute a pending vote every 5 seconds
    let voteTimer = setInterval(this.$store.dispatch, 5 * SECOND, 'executeNextPendingActionOfType', 'vote')
    this.$store.commit('timer', {name: 'executeNextPendingVote', value: voteTimer})
  }
}
</script>

<template src="./index.html"></template>
<style src="./index.sass" lang="sass"></style>
