import { mount, createLocalVue } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import AccountSelection from '@/components/Transactions/AccountSelection.vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('components.Accounts.Selection', () => {
  const store = new Vuex.Store({
    modules: {
      accounts: {
        namespaced: true,
        state: {},
        getters: {
          list: () => {
            return () => [
              {
                id: 11,
                accountNumber: '000000011',
                currency: {
                  code: 'USD'
                },
                product: { name: 'Not Voluntary savings', shortName: 'VS' },
                summary: {
                  accountBalance: 407563.55
                },
                status: 300
              }
            ]
          },
          getAvailableBalance: () => {
            return () => 100
          }
        }
      }
    }
  })

  const wrapper = mount(AccountSelection, {
    localVue,
    i18n,
    store,
    vuetify: new Vuetify({
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndDown: true
          }
        }
      }
    }),
    propsData: {
      selectedAccounts: [11],
      txLoading: false
    }
  })

  it('should render account', () => {
    expect(wrapper.html()).toContain('Not Voluntary savings')
  })

  it('should not update selectedAccount while loading is true', () => {
    wrapper.setProps({ txLoading: true })
    wrapper.vm.updatedSelectedAccounts([{ id: 12 }])
    expect(wrapper.vm.selectedAccounts).toEqual([11])
  })

  it('should update selectedAccount while loading is false', () => {
    wrapper.setProps({ txLoading: false })
    wrapper.vm.updatedSelectedAccounts([{ id: 12 }])
    expect(wrapper.vm.selectedAccounts).toEqual([11, 12])
  })

  it('should remove selectedAccount if id already exist', () => {
    wrapper.vm.updatedSelectedAccounts([{ id: 12 }])
    expect(wrapper.emitted()['updated-selected-accounts'][1]).toEqual([[11]])
  })
})
