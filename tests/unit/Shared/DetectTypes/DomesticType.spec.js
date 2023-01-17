import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import DomesticType from '@/components/Shared/DetectTypes/DomesticType.vue'

describe('DomesticType.vue', () => {
  it('render Recipient full name ', () => {
    const wrapper = shallowMount(DomesticType, {
      sync: false,
      i18n,
      propsData: {
        parentFormData: {},
        focusedField: 'fullName',
        allowCharacterSet: () => {},
        validateCharactersField: () => { }
      }
    })

    expect(wrapper.html()).toContain('Recipient full name')
  })
})
