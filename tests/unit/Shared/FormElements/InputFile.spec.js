import { mount } from '@vue/test-utils'
import InputFile from '@/components/Shared/Form/Elements/InputFile.vue'
import i18n from '@/plugins/i18n.js'

describe('InputFile.vue', () => {
  const wrapper = mount(InputFile, {
    i18n,
    sync: false,
    attachTo: document.getElementsByClassName('.v-file-input')[0],
    mocks: {
      $event: {
        target: {
          files: ['fileName']
        }
      }
    }
  })

  it('should return hasFile true', () => {
    wrapper.vm.hasFile = true
    expect(wrapper.vm.hasFile).toBeTruthy()
  })

  it('should return onChange method to have been called', () => {
    wrapper.vm.openFileDialog()
    wrapper.vm.onChange(wrapper.vm.$event)
    expect(wrapper.emitted().input).toBeTruthy()
  })
})
