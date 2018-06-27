<script>
import Navbar from '~/components/Navbar/Navbar'
import NavbarBottom from '~/components/NavbarBottom/NavbarBottom'
import CommentList from '~/components/CommentList/CommentList'
import Details from '~/components/Details/Details'

import { sc2api } from '~/store/sc2'

export default {
  async fetch ({ app, store, redirect }) {
    const accessToken = app.ls.get('access_token')
    console.log(accessToken);
    if (accessToken) {
      sc2api.setAccessToken(accessToken)
      store.state.user = await sc2api.me().catch(err => console.log(err))
    }
    if (!store.state.user) {
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
