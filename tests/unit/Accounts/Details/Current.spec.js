import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Current from '@/components/Accounts/Details/Current.vue'
import Vuex from 'vuex'

describe('components.Accounts.Details.Current', () => {
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

  const wrapper = shallowMount(Current, {
    i18n,
    store,
    propsData: {
      account:
        {
          id: '01',
          accountNumber: '000000001',
          summary: {
            accountBalance: '407563.55'
          },
          currency: {
            code: 'USD'
          },
          client: {
            displayName: 'Web User1'
          },
          status: 300,
          product: {
            description: 'Current account'
          },
          approvedOnDate: 'Mar 28, 2019'
        }
    }
  })

  const html = wrapper.html()

  it('should render accountNumber', () => {
    expect(html).toContain('000000001')
  })

  it('should render accountBalance', () => {
    expect(html).toContain('$407,563.55')
  })
})
