import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default ({ app }) => {
  Vue.use(VueGtag, {
    config: { id: process.env.GA_ID }  // Use your actual Google Analytics ID here
  }, app.router)
}