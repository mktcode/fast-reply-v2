import Vue from 'vue'
import Storage from 'vue-ls'

Vue.use(Storage)

export default ({ app }, inject) => {
  // Set `i18n` instance on `app`
  // This way we can use it in middleware and pages `asyncData`/`fetch`
  app.ls = Vue.prototype.$ls;
}