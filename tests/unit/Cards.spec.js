import { shallowMount, createLocalVue } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import CardsView from '@/views/Cards.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import CardsList from '@/components/Cards/List.vue'
import Details from '@/components/Cards/Details/Index.vue'
import Security from '@/components/Cards/Securities.vue'
import Limits from '@/components/Cards/Limits/Index.vue'
import RegionSelection from '@/components/Cards/Region/Index.vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes/index.js'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

const router = new VueRouter({ routes })
describe('views.Cards.Index.vue', () => {
  const vuetify = new Vuetify({
    mocks: {
      $vuetify: {}
    }
  })

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
      ]
    },
    actions: {
      'views/cardsList': jest.fn()
    }
  })

  const wrapper = shallowMount(CardsView, {
    i18n,
    store,
    vuetify,
    localVue,
    router
  })

  it('should render cards list', () => {
    expect(wrapper.findComponent(CardsList).exists()).toBeTruthy()
  })

  it('should render card details', () => {
    expect(wrapper.findComponent(Details).exists()).toBeTruthy()
  })

  it('should render card security', () => {
    expect(wrapper.findComponent(Security).exists()).toBeTruthy()
  })

  it('should render card limit', () => {
    expect(wrapper.findComponent(Limits).exists()).toBeTruthy()
  })

  it('should render card region', () => {
    expect(wrapper.findComponent(RegionSelection).exists()).toBeTruthy()
  })

  it('should change card', () => {
    const card = {
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
    wrapper.vm.changeCard(card.id)
    expect(wrapper.vm.selectedCard).toEqual(card)
  })
})
