import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import router from '@/router/index.js'
import AccountTransactions from '@/components/Accounts/Transactions/Loan.vue'

describe('components.Accounts.LoansAccountTransactions', () => {
  const wrapper = shallowMount(AccountTransactions, {
    i18n,
    router,
    propsData: {
      account: {
        transactions: []
      }
    }
  })
  it('should render loan transaction', () => {
    expect(wrapper.find('div').exists()).toBeTruthy()
  })
})
