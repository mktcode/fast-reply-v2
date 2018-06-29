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
      return store.dispatch('login', accessToken)
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
    $('[data-toggle="tooltip"]').tooltip({trigger : 'hover'});
    $('.filter-menuitem').tooltip({trigger : 'hover'});
  }
}
</script>

<template src="./index.html"></template>
<style src="./index.sass" lang="sass"></style>
