import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Loan from '@/views/Accounts/Loan.vue'
import router from '@/router/index.js'
import Vuex from 'vuex'

describe('views.Accounts.Loan', () => {
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
          loanAccountDetails: jest.fn()
        }
      }
    }
  })

  it('should render accounts', () => {
    const wrapper = shallowMount(Loan, {
      i18n,
      store,
      router
    })
    expect(wrapper.find('div').exists()).toBeFalsy()
  })
})
