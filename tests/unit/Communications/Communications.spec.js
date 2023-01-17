import { shallowMount } from '@vue/test-utils'
import Communication from '@/views/Communications.vue'
import Statement from '@/components/Communications/Details/Statements.vue'
import Vuex from 'vuex'
import i18n from '@/plugins/i18n.js'
import Vuetify from 'vuetify'
import Vue from 'vue'

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

  const store = new Vuex.Store({
    modules: {
      accounts: {
        namespaced: true,
        getters: {
          getById: (state) => (type, id) => ({
            accountNumber: '0000011'
          })
        }
      },
      communications: {
        namespaced: true,
        state: {
          communications: []
        }
      },
      views: {
        namespaced: true,
        actions: {
          communicationList: jest.fn()
        }
      }
    }
  })

  it('render Statements.vue', async () => {
    const wrapper = shallowMount(Communication, {
      i18n,
      store,
      vuetify
    })
    wrapper.setData({ selectedCommunication: { type: 'statement' } })
    await Vue.nextTick()
    expect(wrapper.findComponent(Statement).exists()).toBeTruthy()
  })

  it('select communication contain a communication to pass it', () => {
    const wrapper = shallowMount(Communication, { i18n, store, vuetify })
    const communication = {
      name: 'communication name',
      description: 'communication description',
      type: 'statements',
      entityType: 'savings',
      entityId: '11'
    }
    wrapper.vm.selectCommunication(communication)
    expect(wrapper.vm.selectedCommunication).toEqual({ ...communication, accountNumber: '0000011' })
  })

  it('return false when has no communications', () => {
    const wrapper = shallowMount(Communication, {
      i18n,
      store,
      vuetify
    })
    expect(wrapper.vm.hasCommunications).toBeFalsy()
  })
})
