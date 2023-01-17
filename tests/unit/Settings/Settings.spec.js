import { shallowMount } from '@vue/test-utils'
import Settings from '@/views/Settings.vue'
import i18n from '@/plugins/i18n.js'

describe('Settings.vue', () => {
  const wrapper = shallowMount(Settings, {
    sync: false,
    i18n
  })

  it('renders the tabs', () => {
    expect(wrapper.html()).toContain(i18n.messages.en.views.settings.tabs.security)
  })
})
