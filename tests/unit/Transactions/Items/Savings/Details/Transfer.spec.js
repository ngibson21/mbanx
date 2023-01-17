import { createLocalVue, shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Transfer from '@/components/Transactions/Items/Savings/Details/Transfer.vue'
import Amount from '@/components/Transactions/Items/Amount.vue'
import AccountNumber from '@/components/Shared/AccountNumber.vue'
import DateFormat from '@/components/Shared/DateFormat.vue'
import Subject from '@/components/Transactions/Items/Savings/Subject.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Components.Transactions.Items.Savings.Details.Transfer.vue', () => {
  const wrapper = shallowMount(Transfer, {
    i18n,
    localVue,
    propsData: {
      transaction: {
        id: 16,
        account: {
          id: 12,
          currency: {
            code: 'USD'
          },
          accountNumber: '000000012'
        },
        amount: 3.23,
        createdAt: '2020-12-16T03:08:22.598177Z',
        typeOf: 2,
        paymentDetail: {
          reference: 'Tesadf asdfa eadfa asefads faefadfawefa dfaeadf asweadsfa adsf',
          creditor: {
            name: 'Transfer Template',
            identifier: 'ACCOUNT:000000011',
            address: null,
            country: null,
            city: null,
            postalCode: null
          },
          debtor: {
            name: 'Alexa Smart',
            identifier: 'ACCOUNT:000000012',
            address: ['US', '150 Candlelight Drive', 'Pearland Texas 77581'],
            country: 'US',
            city: null,
            postalCode: null
          },
          paymentType: { name: 'INTERNAL' }
        },
        bookingDate: '2020-12-16'
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

  it('should render data subject', async () => {
    expect(wrapper.find(Subject).exists()).toBe(true)
  })

  it('should render payment type', async () => {
    expect(wrapper.html()).toContain('INTERNAL')
  })

  it('should render creditor name', async () => {
    expect(wrapper.html()).toContain('Transfer Template')
  })
})
