<script>
  import marked from 'marked'

  export default {
    props: ['comment'],
    computed: {
      date () {
        let date = new Date(this.comment.created)
        let minutes = date.getMinutes();
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' - ' + date.getHours() + ':' + (minutes < 10 ? '0' + minutes : minutes)
      },
      body () {
        let html = marked(this.comment.body)

        let regex = /(<([^>]+)>)/ig
        let preview = html.replace(regex, '')

        return preview.slice(0, 200)
      },
      activeClass () {
        return this.comment === this.$store.state.activeComment ? 'active' : ''
      }
    }
  }
</script>

<template src="./template.html"></template>
<style src="./style.sass" lang="sass"></style>