import { mount } from '@vue/test-utils'
import InputPhoneNumber from '@/components/Shared/Form/Elements/InputPhoneNumber.vue'
import i18n from '@/plugins/i18n.js'

describe('InputPhoneNumber.vue', () => {
  const wrapper = mount(InputPhoneNumber, {
    i18n,
    sync: false,
    propsData: {
      value: '123'
    }
  })

  it('has value', () => {
    expect(wrapper.props('value')).toBe('123')
  })
})
