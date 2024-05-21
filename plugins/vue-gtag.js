import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default ({ app }) => {
  Vue.use(VueGtag, {
    config: { id: 'G-883Z07YHRP'}  // Use your actual Google Analytics ID here
  }, app.router)
}