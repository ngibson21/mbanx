import { mount } from '@vue/test-utils'
import InputSelect from '@/components/Shared/Form/Elements/InputSelect.vue'
import i18n from '@/plugins/i18n.js'
import Vuetify from 'vuetify'
import en from '@/lang/en/index.js'

describe('InputSelect.vue', () => {
  const vuetify = new Vuetify({
    mocks: {
      $vuetify: {
        lang: {
          locales: { en },
          current: 'en'
        }
      }
    }
  })
  const wrapper = mount(InputSelect, {
    i18n,
    sync: false,
    vuetify,
    propsData: {
      value: 'test'
    }
  })

  it('has value', () => {
    expect(wrapper.props('value')).toBe('test')
  })

  it('should not return hint', () => {
    expect(wrapper.vm.persistHint).toBeFalsy()
  })

  it('should return hint', () => {
    const wrapper = mount(InputSelect, {
      i18n,
      sync: false,
      vuetify,
      propsData: {
        hint: 'This is a hint!'
      }
    })
    expect(wrapper.vm.persistHint).toBeTruthy()
  })
})
