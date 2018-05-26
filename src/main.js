import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/id'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission_role' // permission control
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
// import { Tweet, Timeline } from 'vue-tweet-embed'
// infinit
import InfiniteLoading from 'vue-infinite-loading'
// fb connect
import FBSignInButton from 'vue-facebook-signin-button'
// google connect
import GSignInButton from 'vue-google-signin-button'
// vue event calendar
// import 'vue-event-calendar/dist/style.css' // ^1.1.10, CSS has been extracted as one file, so you can easily update it.
import '@/styles/event-calendar.scss' // global css
import vueEventCalendar from 'vue-event-calendar'

// Cropppa
import Croppa from 'vue-croppa'
// vue anality
import VueAnalytics from 'vue-analytics'
// vue head
import VueHead from 'vue-head'
// lazy
import VueLazyload from 'vue-lazyload'

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
    return moment.utc(String(value)).format('DD MMMM YYYY HH:mm:ss')
  }
})
Vue.filter('formatDateOnly', function(value) {
  if (value) {
    return moment.utc(String(value)).format('DD MMMM YYYY')
  }
})
Vue.filter('formatUTC', function(value) {
  if (value) {
    return moment(String(value)).add(-7, 'hours').format()
  }
})
Vue.config.productionTip = false
// Vue.component('v-tweet', Tweet)
// Vue.component('v-timeline', Timeline)
Vue.component('infinite-loading', InfiniteLoading)
Vue.use(FBSignInButton)
Vue.use(GSignInButton)
Vue.use(vueEventCalendar, { locale: 'en' }) // locale can be 'zh','en','es','pt-br','ja','ko','fr','it','ru','de','vi','ua'
Vue.use(Croppa, { componentName: 'my-image-cropper' })
Vue.use(VueAnalytics, {
  id: 'UA-118969342-1',
  router
})
Vue.use(VueHead)

Vue.use(VueLazyload)

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
  js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.12&appId=1957770944535094&autoLogAppEvents=1'
  fjs.parentNode.insertBefore(js, fjs)
}(document, 'script', 'facebook-jssdk'))
window.fbAsyncInit = function() {
  window.FB.init({
    appId: '1957770944535094',
    cookie: true, // enable cookies to allow the server to access the session
    xfbml: true, // parse social plugins on this page
    version: 'v2.8' // use graph api version 2.8
  })
}

// 1957770944535094 bbb v3
