import { mount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Amount from '@/components/Transactions/Items/Amount.vue'

const mountWithProps = (propsData) => {
  const wrapper = mount(Amount, {
    i18n,
    propsData
  })
  return wrapper
}

const txTypeOf = (typeOf) => ({
  transaction: {
    account: {
      currency: {
        code: 'USD'
      }
    },
    amount: 111,
    typeOf
  },
  showColor: true
})

describe('Components.Transactions.Items.Amount.vue', () => {
  it('should display neutral style', () => {
    const wrapper = mountWithProps(txTypeOf(20))
    expect(wrapper.html()).toContain('transaction-neutral-amount')
  })

  it('should display positive style', () => {
    const positiveType = [1, 3, 8]
    positiveType.map(typeOf => {
      const wrapper = mountWithProps(txTypeOf(typeOf))
      expect(wrapper.html()).toContain('transaction-positive-amount')
    })
  })

  it('should display negative style', () => {
    const negativeType = []
    for (let i = 0; i < 20; i++) {
      if (i !== 1 && i !== 3 && i !== 8 && i !== 20) negativeType.push(i)
    }
    negativeType.map(typeOf => {
      const wrapper = mountWithProps(txTypeOf(typeOf))
      expect(wrapper.html()).toContain('transaction-negative-amount')
    })
  })
})
