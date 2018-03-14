import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import editorial from './modules/editorial'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    editorial
  },
  getters
})

export default store
