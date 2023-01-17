import Vue from 'vue'
import Vuetify from 'vuetify'
import AppConfig from '@/plugins/appConfig.js'
import enabledComponents from '@/config/enabled.js'
import i18n from '@/plugins/i18n.js'
import '@/plugins/cleave.js'
import 'cleave.js/dist/addons/cleave-phone.i18n'

Vue.use(AppConfig, {
  enabledComponents
})
Vue.use(Vuetify)

i18n.locale = 'en'
Vue.use(i18n)

global.Vue = Vue
global.Vuetify = Vuetify
global.scrollTo = jest.fn()
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

// Mount data-app element
const app = document.createElement('div')
app.setAttribute('data-app', true)
document.body.append(app)
