import { shallowMount, createLocalVue } from '@vue/test-utils'
import BottomMenu from '@/layouts/Private/BottomMenu.vue'
import i18n from '@/plugins/i18n.js'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import routes from '@/router/routes/index.js'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({ routes })

describe('BottomMenu.vue', () => {
  const vuetify = new Vuetify({
    mocks: {
      $vuetify: {}
    }
  })
  const wrapper = shallowMount(BottomMenu, {
    router,
    i18n,
    vuetify
  })

  const html = wrapper.html()

  if (wrapper.vm.$appConfig.enabled('home')) {
    it('should render home', () => {
      expect(html).toContain(i18n.messages.en.components.menu.home)
    })
  }

  if (wrapper.vm.$appConfig.enabled('transfers')) {
    it('should render new transfer', () => {
      expect(html).toContain(i18n.messages.en.components.menu.transfer)
    })
  }
})
