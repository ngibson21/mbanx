import { shallowMount, createLocalVue } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Details from '@/components/Cards/Details/Index.vue'
import Card from '@/components/Shared/CreditCard/Templates/Full.vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('components.Cards.Details.vue', () => {
  const card = {
    id: 4,
    expiresOn: '2022-12-02',
    primaryAccountNumber: '12345678901234',
    status: 'INACTIVE',
    embossedNames: ['Snow', 'John'],
    activatedAt: null,
    account: {
      id: 11,
      accountNumber: '000000011',
      summary: { accountBalance: 0 },
      currency: { code: 'USD' },
      product: { name: 'VS' }
    },
    product: { name: 'Bronze', network: 'VISA' },
    onlinePaymentEnabled: false,
    contactlessPaymentEnabled: false
  }

  const store = new Vuex.Store({
    getters: {
      'accounts/getById': () => () => {
        return card.account
      },
      'accounts/getAvailableBalance': () => () => 1000,
      'cards/isFreezedOrOrdered': () => () => false,
      'cards/hasExpired': () => () => false
    }
  })

  const wrapper = shallowMount(Details, {
    i18n,
    localVue,
    propsData: {
      card
    },
    store,
    vuetify: new Vuetify({
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndUp: true
          }
        }
      }
    })
  })

  it('should render Card', () => {
    expect(wrapper.findComponent(Card).exists()).toBeTruthy()
  })
})
