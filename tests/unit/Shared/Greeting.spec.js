import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import store from '@/store/index.js'
import Greeting from '@/components/Shared/Greeting.vue'

describe('components.Shared.Greeting.vue', () => {
  const eveningDate = new Date('2017-10-25T20:41:20')
  const morningDate = new Date('2017-10-25T08:41:20')
  const afternoonDate = new Date('2017-10-25T15:41:20')
  const nightDate = new Date('2017-10-25T02:41:20')
  const invalidDate = new Date('2017-10-25T25:41:20')
  jest.spyOn(global, 'Date')
    .mockImplementationOnce(() => eveningDate)
    .mockImplementationOnce(() => morningDate)
    .mockImplementationOnce(() => afternoonDate)
    .mockImplementationOnce(() => nightDate)
    .mockImplementationOnce(() => invalidDate)

  it('should return evening', () => {
    const wrapper = shallowMount(Greeting, {
      i18n,
      store
    })
    expect(wrapper.vm.greeting).toBe('evening')
  })

  it('should return morning', () => {
    const wrapper = shallowMount(Greeting, {
      i18n,
      store
    })
    expect(wrapper.vm.greeting).toBe('morning')
  })

  it('should return afternoon', () => {
    const wrapper = shallowMount(Greeting, {
      i18n,
      store
    })
    expect(wrapper.vm.greeting).toBe('afternoon')
  })

  it('should return night', () => {
    const wrapper = shallowMount(Greeting, {
      i18n,
      store
    })
    expect(wrapper.vm.greeting).toBe('night')
  })

  it('should return whatTime', () => {
    const wrapper = shallowMount(Greeting, {
      i18n,
      store
    })
    expect(wrapper.vm.greeting).toBe('whatTime')
  })
})
