import { mount, createLocalVue } from '@vue/test-utils'
import Accounts from '@/components/Dashboard/Accounts.vue'
import i18n from '@/plugins/i18n.js'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import routes from '@/router/routes/index.js'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({ routes })

describe('components.Dashboard.Accounts', () => {
  const vuetify = new Vuetify({
    mocks: {
      $vuetify: {
        breakpoint: {
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
          getAvailableBalance: () => () => {
            return 123
          }
        }
      }
    }
  })

  const wrapper = mount(Accounts, {
    i18n,
    store,
    router,
    vuetify,
    propsData: {
      accounts: [
        {
          id: 11,
          accountNumber: '000000011',
          summary: {},
          client: {},
          currency: { code: 'USD' },
          status: 300,
          approvedOnDate: '2019-05-27T00:00:00.000+0000',
          product: { name: 'Current' },
          accountBalance: 628.61
        },
        {
          id: 13,
          accountNumber: '000000013',
          summary: {},
          client: {},
          currency: { code: 'USD' },
          status: 300,
          approvedOnDate: '2019-05-27T00:00:00.000+0000',
          product: { name: 'Current' },
          accountBalance: 628.61
        }
      ]
    }
  })

  it('should display go back botton', () => {
    expect(wrapper.find('div').exists()).toBeTruthy()
  })

  it('should display two accounts', () => {
    expect(wrapper.html()).toContain('000000011')
    expect(wrapper.html()).toContain('000000013')
  })

  it('push to new route', async () => {
    const account = { id: '01' }
    await wrapper.vm.showDetails(account)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$route.name).toBe('currentAccount')
  })
})
