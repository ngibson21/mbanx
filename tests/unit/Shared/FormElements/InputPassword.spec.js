import { mount } from '@vue/test-utils'
import InputPassword from '@/components/Shared/Form/Elements/InputPassword.vue'
import i18n from '@/plugins/i18n.js'
import store from '@/store/index.js'

describe('InputPassword.vue', () => {
  const wrapper = mount(InputPassword, {
    i18n,
    sync: false,
    store
  })

  it('change visibility', () => {
    wrapper.findComponent({ name: 'v-icon' }).trigger('click')
    expect(wrapper.vm.$data.showPassword).toBeTruthy()
  })
})
