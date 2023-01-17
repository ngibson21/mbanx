import { shallowMount, createLocalVue } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import CurrentAccountList from '@/components/Accounts/Lists/Current.vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes/index.js'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({ routes })

describe('components.Accounts.Lists.Current', () => {
  const store = new Vuex.Store({
    modules: {
      accounts: {
        namespaced: true,
        getters: {
          getAvailableBalance: () => () => {
            return 123
          }
        }
      }
    }
  })

  const wrapper = shallowMount(CurrentAccountList, {
    localVue,
    i18n,
    router,
    store,
    propsData: {
      activeCurrentAccounts: [
        {
          id: '01',
          accountNumber: '000000001',
          product: {
            name: 'Current'
          },
          currency: {
            name: 'US dollar',
            code: 'USD'
          },
          status: {
            acitve: true
          },
          summary: { accountBalance: 0 }
        }
      ]
    }
  })

  it('should render accounts', () => {
    expect(wrapper.find('div').exists()).toBeTruthy()
  })

  it('should push account to new route', async () => {
    const account = { id: '01' }

    await wrapper.vm.showDetails(account)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$route.name).toBe('currentAccount')
  })
})
