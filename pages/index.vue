<script>
import Navbar from '~/components/Navbar/Navbar'
import NavbarBottom from '~/components/NavbarBottom/NavbarBottom'
import CommentList from '~/components/CommentList/CommentList'
import Details from '~/components/Details/Details'

export default {
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
