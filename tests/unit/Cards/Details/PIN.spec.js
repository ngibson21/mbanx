import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import PIN from '@/components/Cards/Details/PIN.vue'

describe('components.Cards.PIN.vue', () => {
  const wrapper = shallowMount(PIN, {
    i18n,
    propsData: {
      pin: '1234',
      network: 'VISA'
    }
  })

  it('should render PIN value', () => {
    expect(wrapper.html()).toContain('1234')
  })
})
