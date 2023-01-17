import { mount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import EmailType from '@/components/Shared/DetectTypes/EmailType.vue'

describe('EmailType.vue', () => {
  it('render Nickname', () => {
    const wrapper = mount(EmailType, {
      sync: false,
      i18n,
      propsData: {
        parentFormData: {},
        focusedField: 'nickname'
      }
    })
    expect(wrapper.html()).toContain('Nickname')
  })
})
