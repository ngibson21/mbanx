import { shallowMount } from '@vue/test-utils'
import InputCheckbox from '@/components/Shared/Form/Elements/InputCheckbox.vue'
import i18n from '@/plugins/i18n.js'

describe.skip('InputCheckbox.vue', () => {
  it('has value', () => {
    const wrapper = shallowMount(InputCheckbox, {
      i18n,
      sync: false,
      propsData: {
        value: true
      }
    })
    expect(wrapper.props('value')).toBeTruthy()
  })

  it('should not return hint', () => {
    const wrapper = shallowMount(InputCheckbox, {
      i18n,
      sync: false
    })
    expect(wrapper.vm.persistHint).toBeFalsy()
  })

  it('should return hint', () => {
    const wrapper = shallowMount(InputCheckbox, {
      sync: false,
      mocks: {
        $t: () => 'This is a hint!'
      },
      propsData: {
        hint: 'This is a hint!'
      }
    })
    expect(wrapper.vm.persistHint).toBeTruthy()
  })
})
