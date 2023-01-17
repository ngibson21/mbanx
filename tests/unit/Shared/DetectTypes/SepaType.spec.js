import { mount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import SepaType from '@/components/Shared/DetectTypes/SepaType.vue'

describe.skip('SepaType.vue', () => {
  it('render Nickname', () => {
    const wrapper = mount(SepaType, {
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
