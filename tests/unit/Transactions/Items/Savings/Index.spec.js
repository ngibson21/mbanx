import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Index from '@/components/Transactions/Items/Savings/Index.vue'
import Amount from '@/components/Transactions/Items/Amount.vue'
import Subject from '@/components/Transactions/Items/Savings/Subject.vue'
import DateFormat from '@/components/Shared/DateFormat.vue'
import Details from '@/components/Transactions/Items/Savings/Details'

const mountWithProps = (propsData) => {
  const wrapper = shallowMount(Index, {
    i18n,
    propsData
  })
  return wrapper
}

const transaction = (() => {
  let id = 0
  return () => {
    id += 1
    return {
      id: id,
      account: {
        id: 11, accountNumber: '000000011', currency: { code: 'USD' }
      },
      amount: 234234,
      createdAt: '2019-10-11T07:37:08Z',
      typeOf: 2,
      paymentDetail: {
        reference: null,
        creditor: {
          name: 'Test',
          identifier: null
        },
        debtor: {
          name: 'Tipputhynhean Saman',
          identifier: 'id:11'
        }
      }
    }
  }
})()

describe('Components.Transactions.Savings.Index.vue', () => {
  it('should display components', () => {
    const wrapper = mountWithProps({
      items: [transaction(), transaction(), transaction()]
    })
    expect(wrapper.findComponent(Amount).exists()).toBeTruthy()
    expect(wrapper.findComponent(Subject).exists()).toBeTruthy()
    expect(wrapper.findComponent(DateFormat).exists()).toBeTruthy()
    expect(wrapper.findComponent(Details).exists()).toBeTruthy()
  })
})
