import { mount, createLocalVue } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import CardsList from '@/components/Cards/List.vue'
import MiniCard from '@/components/Shared/CreditCard/Templates/Mini.vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes/index.js'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

const router = new VueRouter({ routes })

describe('Components.Cards.List.vue', () => {
  const store = new Vuex.Store({
    getters: {
      'cards/list': () => [
        {
          id: 4,
          expiresOn: '2022-12-02',
          primaryAccountNumber: '12345678901234',
          status: 'ACTIVE',
          embossedNames: ['Snow', 'John'],
          activatedAt: null,
          account: { id: 11, accountNumber: '000000011', summary: { accountBalance: 0 }, currency: { code: 'USD' } },
          product: { name: 'Bronze', network: 'VISA' },
          onlinePaymentEnabled: false,
          contactlessPaymentEnabled: false
        },
        {
          id: 5,
          expiresOn: '2022-12-02',
          primaryAccountNumber: '12345678901234',
          status: 'ACTIVE',
          embossedNames: ['Snow', 'John'],
          activatedAt: null,
          account: { id: 11, accountNumber: '000000011', summary: { accountBalance: 0 }, currency: { code: 'USD' } },
          product: { name: 'Bronze', network: 'VISA' },
          onlinePaymentEnabled: false,
          contactlessPaymentEnabled: false
        }
      ],
      'accounts/getAvailableBalance': () => () => 1000,
      'cards/isFreezedOrOrdered': () => () => true,
      'cards/hasExpired': () => () => true
    }
  })

  it('should render list of cards', () => {
    const card = mount(CardsList, {
      sync: false,
      i18n,
      store,
      router,
      localVue
    })

    expect(card.find('div').exists()).toBeTruthy()
    expect(card.findComponent(MiniCard).exists()).toBeTruthy()
  })
})
