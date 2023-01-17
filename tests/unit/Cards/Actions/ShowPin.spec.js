import { shallowMount, createLocalVue } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import ShowPin from '@/components/Cards/Actions/ShowPin.vue'
import ItemTemplate from '@/components/Cards/Actions/Templates/Button.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('components.Cards.Details.Actions.Activate.vue', () => {
  const actions = {
    'cards/updateStatus': jest.fn()
  }
  const store = new Vuex.Store({
    actions
  })

  it('should render template', () => {
    const wrapper = shallowMount(ShowPin, {
      localVue,
      store,
      i18n,
      propsData: { card: { id: 1 } }
    })
    expect(wrapper.findComponent(ItemTemplate).exists()).toBeTruthy()
  })
})
