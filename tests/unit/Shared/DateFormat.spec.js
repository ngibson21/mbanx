import { shallowMount } from '@vue/test-utils'
import DateFormat from '@/components/Shared/DateFormat.vue'
import i18n from '@/plugins/i18n.js'

describe('DateFormat.vue', () => {
  const wrapper = shallowMount(DateFormat, {
    i18n,
    propsData: {
      date: '2019-07-26T04:26:04.000+0000',
      exactDate: false
    }
  })

  it('should contain span tag', () => {
    expect(wrapper.html()).toContain('span')
  })

  it('should return today as a word', () => {
    const today = new Date()
    wrapper.setProps({ date: today })
    expect(wrapper.vm.formattedDate).toBe('Today')
  })

  it('should return yesterday as a word', () => {
    const yesterday = new Date(Date.now() - 864e5)
    wrapper.setProps({ date: yesterday })
    expect(wrapper.vm.formattedDate).toBe('Yesterday')
  })

  it('should return exact date', () => {
    wrapper.setProps({ exactDate: true })
    expect(wrapper.vm.formattedDate).toBe(i18n.d(new Date(Date.now() - 864e5), 'short'))
  })
})
