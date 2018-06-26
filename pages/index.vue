<script>
import Navbar from '~/components/Navbar/Navbar'
import NavbarBottom from '~/components/NavbarBottom/NavbarBottom'

export default {
  components: {
    Navbar,
    NavbarBottom
  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip({trigger : 'hover'});
    $('.filter-menuitem').tooltip({trigger : 'hover'});
  }
}
</script>

<template src="./index.html"></template>
<style src="./index.sass" lang="sass"></style>
