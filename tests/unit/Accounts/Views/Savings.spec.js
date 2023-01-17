import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Current from '@/views/Accounts/Current.vue'
import router from '@/router/index.js'
import Vuex from 'vuex'

describe('views.Accounts.Current', () => {
  const store = new Vuex.Store({
    modules: {
      accounts: {
        namespaced: true,
        getters: {
          getById: () => () => {
            return {}
          }
        }
      },
      views: {
        namespaced: true,
        actions: {
          currentAccountDetails: jest.fn()
        }
      }
    }
  })

  const wrapper = shallowMount(Current, {
    i18n,
    store,
    router
  })

  it('should render accounts', () => {
    expect(wrapper.find('div').exists()).toBeFalsy()
  })
})
