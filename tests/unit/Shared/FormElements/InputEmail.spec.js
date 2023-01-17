import { mount } from '@vue/test-utils'
import InputEmail from '@/components/Shared/Form/Elements/InputEmail.vue'
import i18n from '@/plugins/i18n.js'

describe('InputEmail.vue', () => {
  const wrapper = mount(InputEmail, {
    i18n,
    sync: false,
    propsData: {
      value: 'test@test.com'
    }
  })

  it('has value', () => {
    expect(wrapper.props('value')).toBe('test@test.com')
  })
})
