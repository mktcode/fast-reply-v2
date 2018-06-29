<script>
  import { sc2api } from '~/store/sc2'

  export default {
    mounted () {
      if (this.$route.query.hasOwnProperty('logout')) {
        const accessToken = this.$ls.get('access_token')
        if (accessToken) {
          this.$store.dispatch('logout')
          this.$ls.remove('access_token')
        }
      }
    }
  }
</script>

<template src="./index.html"></template>
<style src="./index.sass" lang="sass"></style>