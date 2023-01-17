import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import App from '@/App.vue'
import i18n from '@/plugins/i18n.js'
import store from '@/store/index.js'

const localVue = createLocalVue()

describe('App.vue', () => {
  const vuetify = new Vuetify({
    mocks: {
      $vuetify: {
        theme: {
          dark: {
            background: '#404248'
          },
          light: {
            background: '#fafafa'
          }
        }
      }
    }
  })

  it('should render app', () => {
    window.load = () => {
      const wrapper = mount(App, {
        localVue,
        vuetify,
        i18n,
        store
      })
      const app = wrapper.find('#app')
      expect(app.is('div')).toBeTruthy()
    }
  })
})
