import { shallowMount } from '@vue/test-utils'
import Cards from '@/components/Dashboard/Cards/Index.vue'
import i18n from '@/plugins/i18n.js'
import Detail from '@/components/Dashboard/Cards/Detail.vue'

describe('components.Dashboard.Cards', () => {
  const wrapper = shallowMount(Cards, {
    i18n,
    propsData: {
      cards: [
        {
          holder: 'Jeff',
          number: '0192 0213 0123 1023',
          type: 'visa',
          balance: 123,
          currency: 'USD'
        }
      ]
    }
  })

  it('should render cards list', () => {
    expect(wrapper.findComponent(Detail).exists()).toBeTruthy()
  })
})
