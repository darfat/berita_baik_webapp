import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementIdLocale from 'element-ui/lib/locale/lang/id'// element-ui lang
import enLocale from './en'
import idLocale from './id'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  id: {
    ...idLocale,
    ...elementIdLocale
  }
}

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'id', // set locale
  messages // set locale messages
})

export default i18n
