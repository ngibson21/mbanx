import { shallowMount } from '@vue/test-utils'
import BalanceCalculate from '@/components/Transfers/Misc/BalanceCalculate.vue'
import i18n from '@/plugins/i18n.js'
import Vuex from 'vuex'

describe('Components.Transfers.New.Form', () => {
  const store = new Vuex.Store({
    actions: {
      'transfers/saveRecipient': jest.fn(),
      'accounts/updateAccount': jest.fn(),
      'transactions/getNewTransactions': jest.fn()
    },
    modules: {
      transfers: {
        namespaced: true,
        getters: {
          getTransfer: () => () => ({
            currency: 'USD',
            amount: '100',
            debtor: {
              currency: {
                code: 'USD'
              },
              accountBalance: '213123'
            }
          })
        },
        state: {
          newTransfer: {
            currency: 'USD',
            amount: '100',
            debtor: {
              currency: {
                code: 'USD'
              },
              accountBalance: '213123'
            }
          }
        }
      },
      accounts: {
        namespaced: true,
        getters: {
          getById: (state) => (type, id) => ({
            summary: {
              accountBalance: '1000'
            },
            currency: {
              code: 'EUR'
            }
          }),
          getAvailableBalance: () => {
            return () => 100
          }
        }
      }
    }
  })

  it('calls subtractSameCurrency when recipient and account have the same currency', () => {
    const wrapper = shallowMount(BalanceCalculate, {
      i18n,
      store: {
        ...store,
        state: {
          transfers: {
            newTransfer: {
              debtor: {
                id: 11
              },
              currency: 'EUR'
            }
          }
        }
      }
    })
    expect(wrapper.vm.remainBalance).toBe(wrapper.vm.subtractSameCurrency())
  })

  it('should return reaminBalance', () => {
    const wrapper = shallowMount(BalanceCalculate, {
      i18n,
      store
    })
    expect(wrapper.vm.remainBalance).toBe(wrapper.vm.subtractDifferentCurrency())
  })

  it('should not return currency rate if we have the same currency', () => {
    const wrapper = shallowMount(BalanceCalculate, {
      i18n,
      store
    })
    expect(wrapper.vm.getRate()).toBeUndefined()
  })

  it('should not return currency rate if we have the same currency', () => {
    const wrapper = shallowMount(BalanceCalculate, {
      i18n,
      store
    })
    expect(wrapper.vm.getRate()).toBeUndefined()
  })

  it('should not exchange when it does not have exchange rate', () => {
    const wrapper = shallowMount(BalanceCalculate, {
      i18n,
      store
    })
    expect(wrapper.vm.exchange(666, 'USD', 'RIEL')).toBe(666)
  })

  it('should display rate when it has different currency', () => {
    const wrapper = shallowMount(BalanceCalculate, {
      i18n,
      store
    })
    expect(wrapper.vm.displayRate).toBe('1USD=0.8897EUR')
  })

  it('should display rate when it has different currency', () => {
    const wrapper = shallowMount(BalanceCalculate, {
      i18n,
      store: {
        ...store,
        state: {
          transfers: {
            newTransfer: {
              debtor: {
                id: 11
              },
              currency: 'RIEL'
            }
          }
        }
      }
    })
    expect(wrapper.vm.displayRate).toBeUndefined()
  })
})
