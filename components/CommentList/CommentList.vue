<script>
  import { mapGetters } from 'vuex'
  import Comment from '~/components/Comment/Comment'

  export default {
    components: {
      Comment
    },
    computed: {
      ...mapGetters(['comments'])
    }
  }
</script>

<template src="./template.html"></template>
<style src="./style.sass" lang="sass"></style>