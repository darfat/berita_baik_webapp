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
// i18n
import i18n from './lang' // Internationalization
// moment date
import moment from 'moment'
// tweet
import { Tweet, Timeline } from 'vue-tweet-embed'

Vue.use(ElementUI, { locale })
Vue.use(feather, 'v-icon')
Vue.use(VueYouTubeEmbed)
Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'id-ID',
  locales: {
    // you will need json-loader in webpack 1
    'id-ID': require('vue-timeago/locales/id-ID.json')
  },
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(SocialSharing)
Vue.component('fa-icon', Icon)
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD MMMM YYYY hh:mm')
  }
})
Vue.config.productionTip = false
Vue.component('v-tweet', Tweet)
Vue.component('v-timeline', Timeline)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
  // eslint-disable-next-line
})
// eslint-disable-next-line
var fbFeedHandler = (function (d, s, id) {
  // eslint-disable-next-line
  var js, fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) return
  js = d.createElement(s)
  js.id = id
  js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.12&appId=104551552924338&autoLogAppEvents=1'
  fjs.parentNode.insertBefore(js, fjs)
}(document, 'script', 'facebook-jssdk'))
