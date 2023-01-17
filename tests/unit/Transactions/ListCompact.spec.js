import { shallowMount, createLocalVue } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import List from '@/components/Transactions/ListCompact.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Component.Transactions.List.vue', () => {
  let store
  const getters = {
    list: () => {
      return jest.fn()
    },
    holdTx: () => {
      return () => []
    }
  }

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        transactions: {
          namespaced: true,
          getters
        }
      }
    })
  })

  it('should render data iterator stub', () => {
    const wrapper = shallowMount(List, {
      sync: false,
      localVue,
      i18n,
      store,
      propsData: {
        accounts: [12, 13],
        type: 'savings'
      }
    })
    expect(wrapper.find('v-data-iterator-stub').exists()).toBeTruthy()
  })

  it('should update transaction when change account', () => {
    const transactions = jest.fn()
    const wrapper = shallowMount(List, {
      localVue,
      i18n,
      store,
      propsData: {
        accounts: [12],
        type: 'savings'
      },
      computed: {
        transactions
      }
    })
    wrapper.setProps({ accounts: [12, 13] })
    expect(transactions).toBeCalled()
  })
})
