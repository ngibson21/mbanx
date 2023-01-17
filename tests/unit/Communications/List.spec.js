import { shallowMount, createLocalVue } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import List from '@/components/Communications/List.vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
const localVue = createLocalVue()

describe('Communication.vue', () => {
  const vuetify = new Vuetify({
    mocks: {
      $vuetify: {
        breakpoint: {
          mdAndUp: false,
          smAndDown: true
        }
      }
    }
  })

  const state = {
    communications: {
      displayCommunications: [
        {
          name: 'potato',
          type: 'statement',
          createdDate: new Date()
        }
      ],
      pagination: {
        page: 1,
        totalItems: 5
      },
      communications: []
    }
  }

  const actions = {
    'communications/setCommunications': jest.fn(),
    'communications/get': jest.fn()
  }

  const store = new Vuex.Store({
    state,
    actions
  })

  const wrapper = shallowMount(List, {
    i18n,
    vuetify,
    localVue,
    store,
    propsData: {
      selectedCommunication: {}
    }
  })

  it('render attach_file icon', () => {
    expect(wrapper.vm.communicationIcon('statement')).toBe('attach_file')
  })

  it('select first message', () => {
    wrapper.vm.selectFirstMessage()
    expect(wrapper.emitted('select-communication')).toBeTruthy()
  })
})
