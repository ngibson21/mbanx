import { shallowMount } from '@vue/test-utils'
import InputPin from '@/components/Shared/Form/Elements/InputPin.vue'
import i18n from '@/plugins/i18n.js'

describe('InputPin.vue', () => {
  const wrapper = shallowMount(InputPin, {
    i18n
  })

  it('should return pin not match', () => {
    wrapper.vm.pinNotMatch()
    expect(wrapper.vm.errorMessage).toBe(i18n.messages.en.components.shared.messages.pinNotMatch)
  })

  it('should change visiblity', () => {
    wrapper.vm.showPin = true
    wrapper.vm.changeVisibility()
    expect(wrapper.vm.showPin).toBeFalsy()
  })

  it('should return correct length', () => {
    expect(wrapper.vm.mask).toEqual('######')
  })

  it('should return correct length', () => {
    const wrapper = shallowMount(InputPin, {
      i18n,
      propsData: {
        length: 5
      }
    })
    expect(wrapper.vm.mask).toEqual('#####')
  })
})
