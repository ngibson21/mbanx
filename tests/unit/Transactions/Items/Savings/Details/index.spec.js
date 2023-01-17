import { createLocalVue, shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Transfer from '@/components/Transactions/Items/Savings/Details/Transfer.vue'
import Charge from '@/components/Transactions/Items/Savings/Details/Charge.vue'
import Other from '@/components/Transactions/Items/Savings/Details/Other.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Components.Transactions.Items.Savings.Details.index.vue', () => {
  const wrapperTransfer = shallowMount(Transfer, {
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

  const wrapperCharge = shallowMount(Charge, {
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

  const wrapperOther = shallowMount(Charge, {
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
        typeOf: null,
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

  it('should render Transfer component', async () => {
    expect(wrapperTransfer.find(Transfer).exists()).toBe(true)
  })

  it('should render Charge component', async () => {
    expect(wrapperCharge.find(Charge).exists()).toBe(true)
  })

  it('should render Charge component', async () => {
    expect(wrapperOther.find(Other).exists()).toBe(true)
  })
})
