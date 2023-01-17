import { createLocalVue, shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Charge from '@/components/Transactions/Items/Savings/Details/Charge.vue'
import Amount from '@/components/Transactions/Items/Amount.vue'
import AccountNumber from '@/components/Shared/AccountNumber.vue'
import DateFormat from '@/components/Shared/DateFormat.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Components.Transactions.Items.Savings.Details.Charge.vue', () => {
  const wrapper = shallowMount(Charge, {
    i18n,
    localVue,
    propsData: {
      transaction: {
        id: 24,
        account: {
          id: 12,
          currency: {
            code: 'USD'
          },
          accountNumber: '000000012'
        },
        amount: 5.000000,
        createdAt: '2020-12-08T07:53:37.759307Z',
        typeOf: 7,
        paymentDetail: null,
        bookingDate: '2020-12-08'
      }
    },
    data () {
      return {
        isLoading: true,
        showDetail: false
      }
    },
    store: new Vuex.Store({
      actions: {
        'views/transactionDetails': jest.fn()
      }
    })
  })

  it('should render data account number', async () => {
    expect(wrapper.find(AccountNumber).exists()).toBe(true)
  })

  it('should render data amount ', async () => {
    expect(wrapper.find(Amount).exists()).toBe(true)
  })

  it('should render data date format', async () => {
    expect(wrapper.find(DateFormat).exists()).toBe(true)
  })

  it('should render payment type', async () => {
    expect(wrapper.html()).not.toContain('INTERNAL')
  })

  it('should render creditor name', async () => {
    expect(wrapper.html()).not.toContain('Transfer Template')
  })
})
