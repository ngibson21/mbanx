import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import ShowDetails from '@/components/Cards/Actions/ShowDetails.vue'
import ItemTemplate from '@/components/Cards/Actions/Templates/Button.vue'

describe('components.Cards.Details.Actions.Activate.vue', () => {
  it('should render template', () => {
    const wrapper = shallowMount(ShowDetails, {
      i18n,
      propsData: { card: { id: 1 } }
    })
    expect(wrapper.findComponent(ItemTemplate).exists()).toBeTruthy()
  })
})
