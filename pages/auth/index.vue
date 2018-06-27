<script>
  export default {
    created () {
      let params = this.$route.query
      let accessToken = params['access_token']
      let expiresIn = params['expires_in']

      if (accessToken && expiresIn) {
        let expiration = expiresIn * 1000 // expiration is in milliseconds
        this.$ls.set('access_token', accessToken, expiration)
      }
      this.$router.push('/')
    }
  }
</script>

<template src="./index.html"></template>
<style src="./index.sass" lang="sass"></style>