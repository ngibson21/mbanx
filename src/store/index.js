import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules/index.js'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules,
  strict: debug,
  plugins: [vuexLocal.plugin]
})
