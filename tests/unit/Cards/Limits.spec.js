import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import store from '@/store/index.js'
import Limits from '@/components/Cards/Limits/Index.vue'

describe.skip('components.Cards.Limits.vue', () => {
  const propsData = {
    card: {
      id: store.state.cards[0].id,
      type: 'amex',
      title: 'Ariv.al Bank',
      balance: '10000',
      currency: 'USD',
      limits: {
        daily: 0,
        monthly: 0,
        atm: 0
      },
      maxLimits: {
        dailyMax: 500,
        monthlyMax: 1000,
        atmMax: 700
      }
    }
  }

  it('should render limits', () => {
    const card = shallowMount(Limits, {
      sync: false,
      i18n,
      propsData,
      store
    })
    expect(card.props().card.limits.daily).toBe(0)
    expect(card.props().card.maxLimits.dailyMax).toBe(500)
  })

  it('should commit data to card limit', () => {
    const card = shallowMount(Limits, {
      i18n,
      store,
      propsData
    })
    const type = 'atm'
    card.vm.setLimits(0, type)
    expect(store.state.cards[0].limits[type]).toEqual(0)
  })

  it('should not excess limit', () => {
    const card = shallowMount(Limits, {
      i18n,
      store,
      propsData
    })
    card.vm.updateAmount = jest.fn()
    expect(card.vm.excessAmount(999999, 'atm')).toBeTruthy()
    expect(card.vm.updateAmount).not.toHaveBeenCalled()
  })

  it('should not update when excess limit', () => {
    const card = shallowMount(Limits, {
      i18n,
      store,
      propsData
    })
    card.vm.updateAmount = jest.fn()
    card.vm.setLimits(9999, 'atm')
    expect(card.vm.updateAmount).not.toHaveBeenCalled()
  })
})
