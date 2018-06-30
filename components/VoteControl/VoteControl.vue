<script>
  export default {
    props: ['comment'],
    data () {
      return {
        voteWeight: 100
      }
    },
    methods: {
      addVoteToQueue () {
        let vote = {
          type: 'vote',
          author: this.comment.author,
          title: this.comment.rootTitle,
          url: this.comment.url,
          permlink: this.comment.permlink,
          vote: this.voteWeight,
          created: Date.now(),
          attempts: 0
        }
        this.$store.commit('addPendingAction', vote)
      },
      changeVoteWeight (value) {
        this.setVoteWeight(this.voteWeight += value)
      },
      setVoteWeight (value) {
        this.voteWeight = value
        this.voteWeight = this.voteWeight > 100 ? 100 : this.voteWeight
        this.voteWeight = this.voteWeight < -100 ? -100 : this.voteWeight
      }
    }
  }
</script>

<template src="./template.html"></template>
<style src="./style.sass" lang="sass"></style>