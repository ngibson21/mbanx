import { mount } from '@vue/test-utils'
import FormCreator from '@/components/Shared/Form/Builder/Index.vue'
import i18n from '@/plugins/i18n.js'

describe('FormCreator.vue', () => {
  const wrapper = mount(FormCreator, {
    i18n,
    propsData: {
      value: {},
      schema: [
        {
          name: 'firstName',
          label: 'components.registration.personalInformation.fields.firstName.label',
          element: 'InputText',
          rules: [
            'required'
          ]
        },
        {
          name: 'lastName',
          label: 'components.registration.customerCreation.fields.lastName.label',
          element: 'InputText',
          rules: [
            'required'
          ]
        }
      ],
      formErrors: {
        firstName: null,
        lastName: null
      }
    }
  })

  it('should validate return false when it is not valid', () => {
    expect(wrapper.vm.validate()).toBeFalsy()
  })

  it('should validate return true when it valid', () => {
    wrapper.vm.$refs.form.validate = jest.fn().mockReturnValue(true)
    expect(wrapper.vm.validate()).toBeTruthy()
  })

  it('should update form', () => {
    wrapper.vm.updateForm()
    expect(wrapper.vm.$emit('input')).toBeTruthy()
  })
})
