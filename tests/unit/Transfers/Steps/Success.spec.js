import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import i18n from '@/plugins/i18n.js'
import Success from '@/components/Transfers/Steps/Success.vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes/index.js'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter({ routes })

describe('Components.Transfers.Steps.Success', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        transfers: {
          namespaced: true,
          getters: {
            getTransfer: () => {
              return {
                amount: '100',
                subject: 'bar',
                currency: 'USD',
                debtor: {
                  currency: {
                    code: 'USD'
                  },
                  accountNumber: '00000001',
                  accountBalance: 100
                }
              }
            }
          },
          actions: {
            discardTransfer: jest.fn()
          }
        }
      }
    })
  })

  it('should be able to render recipient from', () => {
    const wrapper = shallowMount(Success, {
      localVue,
      i18n,
      store
    })
    expect(wrapper.find('div').exists()).toBeTruthy()
  })

  it('should be exit transfer', () => {
    const wrapper = shallowMount(Success, {
      localVue,
      i18n,
      store,
      router
    })
    wrapper.vm.goToDashboard()
    expect(store.dispatch(
      'transfers/discardTransfer'
    )).toBeTruthy()
  })
})
