import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Switcher from '@/components/Cards/Actions/Templates/Switch.vue'
import Vuex from 'vuex'

describe('components.Cards.Securities.Index.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      'cards/toggleContactlessPayments': jest.fn()
    }
    store = new Vuex.Store({
      actions,
      modules: {
        cards: {}
      }
    })
  })

  it('change security setting success', async () => {
    const wrapper = shallowMount(Switcher, {
      i18n,
      store,
      propsData: {
        card: {
          product: {
            network: 'VISA'
          },
          id: '1'
        }
      }
    })
    actions['cards/toggleContactlessPayments'].mockResolvedValue({
      data: { data: { UpdateCard: { id: 11, contactlessPaymentEnabled: true } } }
    })
    await wrapper.vm.changeSecuritySettings('cards/toggleContactlessPayments', false)
    expect(wrapper.vm.loading).toBeFalsy()
  })

  it('change security setting fail', async () => {
    const wrapper = shallowMount(Switcher, {
      i18n,
      store,
      propsData: {
        card: {
          product: {
            network: 'VISA'
          },
          id: '1'
        }
      }
    })
    actions['cards/toggleContactlessPayments'].mockRejectedValue(() => {
      throw new Error('error')
    })
    await wrapper.vm.changeSecuritySettings('cards/toggleContactlessPayments', true).catch(err => {
      expect(err).toEqual({ error: 'error' })
    })
  })
})
