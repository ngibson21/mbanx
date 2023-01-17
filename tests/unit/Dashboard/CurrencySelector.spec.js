import { mount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import CurrencySelector from '@/components/Dashboard/CurrencySelector.vue'
import store from '@/store/index.js'

describe('components.Shared.CurrencyButton.vue', () => {
  const wrapper = mount(CurrencySelector, {
    i18n,
    store,
    propsData: {
      balances: {
        USD: '1000',
        EUR: '1000'
      }
    }
  })

  it('should return active currency', () => {
    expect(wrapper.vm.activeCurrency).toBe('USD')
  })

  it('should be update active currency', () => {
    wrapper.vm.updateBalance('EUR')
    expect(wrapper.vm.activeCurrency).toBe('EUR')
  })
})
