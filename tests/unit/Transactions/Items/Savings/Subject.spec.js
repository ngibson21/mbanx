import { mount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import ItemsSubject from '@/components/Transactions/Items/Savings/Subject.vue'

const mountWithProps = (propsData) => {
  const wrapper = mount(ItemsSubject, {
    i18n,
    propsData
  })
  return wrapper
}

const propsData = (typeOf, paymentDetail) => ({
  transaction: {
    id: 87,
    account: {
      id: 12,
      accountNumber: '000000012',
      currency: { code: 'USD' }
    },
    amount: 1,
    createdAt: '2019-06-21T06:58:56.000+0000',
    typeOf,
    paymentDetail
  }
})

describe('Components.Transactions.Savings.Subject.vue', () => {
  it('should display deposit', () => {
    let wrapper = mountWithProps(propsData(1, null))
    expect(wrapper.html()).toContain('Deposit')
    wrapper = mountWithProps(propsData(1, {
      reference: null
    }))
    expect(wrapper.html()).toContain('Deposit')
  })

  it('should display "My Subject"', () => {
    const wrapper = mountWithProps(propsData(1,
      {
        reference: 'My Subject'
      }
    ))
    expect(wrapper.html()).toContain('My Subject')
  })

  it('should display "Transfer between account"', () => {
    const wrapper = mountWithProps(propsData(1,
      {
        reference: ''
      }
    ))
    expect(wrapper.html()).toContain('Transfer between account')
  })
})
