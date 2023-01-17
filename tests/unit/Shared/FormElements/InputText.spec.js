import { mount } from '@vue/test-utils'
import InputText from '@/components/Shared/Form/Elements/InputText.vue'
import i18n from '@/plugins/i18n.js'

describe('InputText.vue', () => {
  const wrapper = mount(InputText, {
    i18n,
    sync: false,
    propsData: {
      value: 'Test'
    }
  })

  it('has value', () => {
    expect(wrapper.props('value')).toBe('Test')
  })
})
