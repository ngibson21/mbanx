import { mount } from '@vue/test-utils'
import WelcomeUser from '@/components/Dashboard/WelcomeUser.vue'
import i18n from '@/plugins/i18n.js'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('components.Dashboard.WelcomeUser', () => {
  const vuetify = new Vuetify({
    mocks: {
      $vuetify: {
        breakpoint: {
          xsOnly: true
        }
      }
    }
  })

  const store = new Vuex.Store({
    modules: {
      user: {
        namespaced: true,
        state: {
          appUser: {
            firstName: 'Jackie',
            lastName: 'Chan'
          }
        },
        getters: {
          fullName: state => `${state.appUser.firstName} ${state.appUser.lastName}`

        }
      }
    }
  })

  const wrapper = mount(WelcomeUser, {
    i18n,
    store,
    vuetify
  })

  it('should display welcome user', () => {
    expect(wrapper.find('div').exists()).toBeTruthy()
  })

  it('should display fullName', () => {
    expect(wrapper.vm.fullName).toEqual('Jackie Chan')
  })
})
