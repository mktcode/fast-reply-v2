<script>
  import marked from 'marked'

  import VoteControl from '~/components/VoteControl/VoteControl'

  export default {
    props: ['comment'],
    components: {
      VoteControl
    },
    computed: {
      date () {
        let date = new Date(this.comment.created)
        let minutes = date.getMinutes();
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' - ' + date.getHours() + ':' + (minutes < 10 ? '0' + minutes : minutes)
      },
      body () {
        return marked(this.comment.body)
      }
    }
  }
</script>

<template src="./template.html"></template>
<style src="./style.sass" lang="sass"></style>