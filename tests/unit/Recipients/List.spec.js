import { shallowMount, createLocalVue } from '@vue/test-utils'
import List from '@/components/Recipients/List.vue'
import i18n from '@/plugins/i18n.js'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuex)
const vuetify = new Vuetify({
  mocks: {
    $vuetify: {
      breakpoint: {
        smAndUp: true
      }
    }
  }
})

describe('Dashboard.vue', () => {
  const actions = {
    'views/recipientList': jest.fn()
  }

  const store = new Vuex.Store({
    actions
  })

  const wrapper = shallowMount(List, {
    localVue,
    i18n,
    store,
    vuetify
  })

  it('should render data iterator stub', () => {
    expect(wrapper.find('v-data-table-stub').exists()).toBeTruthy()
  })

  it('should update recipient', () => {
    wrapper.vm.updateRecipient()
    expect(actions['views/recipientList']).toBeCalled()
  })
})
