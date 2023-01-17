import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import router from '@/router/index.js'
import AccountTransactions from '@/components/Accounts/Transactions/Current.vue'
import AccountNumber from '@/components/Shared/AccountNumber.vue'

describe('components.Accounts.AccountTransactions', () => {
  const wrapper = shallowMount(AccountTransactions, {
    i18n,
    router,
    propsData: {
      account:
        {
          id: '01',
          accountNumber: '000000001',
          product: {
            name: 'Savings'
          },
          currency: {
            name: 'US dollar',
            code: 'USD'
          },
          status: {
            acitve: true
          },
          accountBalance: 12
        },
      accountType: 'Loan'
    }
  })
  it('should get account number', () => {
    expect(wrapper.findComponent(AccountNumber).exists()).toBeFalsy()
  })
})
