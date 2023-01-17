import { shallowMount } from '@vue/test-utils'
import Index from '@/views/Recipients.vue'
import List from '@/components/Recipients/List.vue'
import i18n from '@/plugins/i18n.js'

describe('Dashboard.vue', () => {
  const wrapper = shallowMount(Index, {
    i18n
  })

  it('should render list and details', () => {
    expect(wrapper.findComponent(List).exists()).toBeTruthy()
  })
})
