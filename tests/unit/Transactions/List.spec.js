import { shallowMount, createLocalVue } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import List from '@/components/Transactions/List.vue'
import Vuex from 'vuex'
import Vue from 'vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Component.Transactions.List.vue', () => {
  let store
  let actions

  beforeEach(() => {
    actions = {
      transactionList: jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        transactions: {
          namespaced: true,
          state: {},
          getters: {
            list: () => {
              return () => []
            },
            holdTx: () => {
              return () => []
            }
          },
          actions
        },
        accounts: {
          namespaced: true,
          getters: {
            list: () => {
              return () => []
            }
          }
        },
        views: {
          namespaced: true,
          actions
        }
      }
    })
  })

  it('should render data iterator stub', () => {
    const wrapper = shallowMount(List, {
      localVue,
      i18n,
      store,
      propsData: {
        accounts: [12, 13]
      }
    })
    expect(wrapper.find('v-data-iterator-stub').exists()).toBeTruthy()
  })

  it('should dispatch action when change account', async () => {
    const wrapper = shallowMount(List, {
      localVue,
      i18n,
      store,
      propsData: {
        accounts: [12]
      }
    })
    wrapper.setProps({ accounts: [12, 13] })
    await Vue.nextTick()
    expect(actions.transactionList).toBeCalled()
  })

  it('should display filtered items', async () => {
    const wrapper = shallowMount(List, {
      localVue,
      i18n,
      store,
      propsData: {
        accounts: [12]
      }
    })
    wrapper.setData({ filteredItems: [] })
    await Vue.nextTick()
    expect(wrapper.vm.displayItems).toEqual({
      items: [],
      totalItems: 0
    })
  })
})
