import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import feather from 'vue-icon'
import VueYouTubeEmbed from 'vue-youtube-embed'
import VueTimeago from 'vue-timeago'
var SocialSharing = require('vue-social-sharing')

// vue awesome
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.use(ElementUI, { locale })
Vue.use(feather, 'v-icon')
Vue.use(VueYouTubeEmbed)
Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'id-ID',
  locales: {
    // you will need json-loader in webpack 1
    'id-ID': require('vue-timeago/locales/id-ID.json')
  }
})
Vue.use(SocialSharing)
Vue.component('fa-icon', Icon)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

