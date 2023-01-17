import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Vuex from 'vuex'
import Current from '@/components/Accounts/Headers/Current.vue'
import Vuetify from 'vuetify'

describe('components.Accounts.Current', () => {
  const store = new Vuex.Store({
    modules: {
      accounts: {
        namespaced: true,
        getters: {
          getAvailableBalance: () => () => {
            return 123
          }
        }
      }
    }
  })

  const vuetify = new Vuetify({
    mocks: {
      $vuetify: {
        breakpoint: {
          smAndDown: true
        }
      }
    }
  })
  const wrapper = shallowMount(Current, {
    i18n,
    store,
    vuetify,
    propsData: {
      account:
      {
        id: '01',
        accountNumber: '000000001',
        product: {
          name: 'Current'
        },
        currency: {
          name: 'US dollar',
          code: 'USD'
        },
        status: {
          acitve: true
        },
        summary: {
          accountBalance: 407563.55
        }
      }
    }
  })
  it('should render accounts', () => {
    expect(wrapper.find('div').exists).toBeTruthy()
  })
})
