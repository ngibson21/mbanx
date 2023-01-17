import { shallowMount, createLocalVue } from '@vue/test-utils'
import Statements from '@/components/Communications/Details/Statements.vue'
import i18n from '@/plugins/i18n.js'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

const localVue = createLocalVue()
const vuetify = new Vuetify({
  mocks: {
    $vuetify: {
      theme: {
        dark: {
          background: '#404248'
        },
        light: {
          background: '#fafafa'
        }
      }
    }
  }
})

describe('Statements.vue', () => {
  const propsData = {
    communication: {
      id: '2',
      type: 'statements',
      name: 'Statement title',
      content: 'test message',
      createdAt: '2012-04-23T18:25:43.511Z',
      status: 'inProcess',
      seen: false,
      description: 'Your February statement is ready',
      accountNumber: '0000011'
    }
  }

  const actions = {
    'communications/download': jest.fn()
  }
  const store = new Vuex.Store({
    actions
  })

  const wrapper = shallowMount(Statements, {
    i18n,
    propsData,
    store,
    vuetify,
    localVue
  })

  it('render message', () => {
    expect(wrapper.html()).toContain(propsData.communication.accountNumber)
    expect(wrapper.html()).toContain(propsData.communication.description)
  })

  it('should download document when click download', () => {
    wrapper.vm.download(2)
    expect(actions['communications/download'].mock.calls).toHaveLength(1)
  })
})
