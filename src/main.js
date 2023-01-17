import Vue from 'vue'
import Vidle from 'v-idle'
import App from '@/App.vue'
import vuetify from './plugins/vuetify.js'
import i18n from '@/plugins/i18n.js'
import AppConfig from '@/plugins/appConfig.js'
import router from '@/router/index.js'
import store from '@/store/index.js'
import enabledComponents from '@/config/enabled.js'
import EventBus from '@/utils/eventBus.js'
import '@/styles/main.css'
// pwa manifest. Import this before service-workers
import '@/manifest.js'
// pwa service-workers
import '@/registerServiceWorker.js'
import '@/plugins/cleave.js'

import 'cleave.js/dist/addons/cleave-phone.i18n'

Vue.use(Vidle)
Vue.use(AppConfig, {
  enabledComponents
})

i18n.locale = store.state.user.locale

// global event bus
Vue.prototype.$bus = EventBus

Vue.config.productionTip = false

// only needed because of invalid cert on localhost
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

window.app = new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
