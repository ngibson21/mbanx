import { shallowMount, createLocalVue } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Actions from '@/components/Cards/Details/Actions.vue'
import Activate from '@/components/Cards/Actions/Activate.vue'
import ShowPin from '@/components/Cards/Actions/ShowPin.vue'
import ShowDetails from '@/components/Cards/Actions/ShowDetails.vue'
import Freeze from '@/components/Cards/Actions/Freeze.vue'
import Replace from '@/components/Cards/Actions/Replace.vue'
import Block from '@/components/Cards/Actions/Block.vue'
import Vuetify from 'vuetify'
import Vue from 'vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('components.Cards.PIN.vue', () => {
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
      'cards/isFreezedOrOrdered': () => () => false
    }
  })
  const wrapper = shallowMount(Actions, {
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

  it('should render Activate, ShowPin, ShowDetails when card status INACTIVE', () => {
    expect(wrapper.findComponent(Activate).exists()).toBeTruthy()
    expect(wrapper.findComponent(ShowPin).exists()).toBeTruthy()
    expect(wrapper.findComponent(ShowDetails).exists()).toBeTruthy()
  })

  it('should render Freeze, ShowPin, ShowDetails when card status is ACTIVE', async () => {
    wrapper.setProps({
      card: { ...card, status: 'ACTIVE' }
    })
    await Vue.nextTick()
    expect(wrapper.findComponent(Freeze).exists()).toBeTruthy()
    expect(wrapper.findComponent(ShowPin).exists()).toBeTruthy()
    expect(wrapper.findComponent(ShowDetails).exists()).toBeTruthy()
  })

  it('should render Activate, Replace, Block when card status is SUSPENDED', async () => {
    wrapper.setProps({
      card: { ...card, status: 'SUSPENDED' }
    })
    await Vue.nextTick()
    expect(wrapper.findComponent(Activate).exists()).toBeTruthy()
    expect(wrapper.findComponent(Replace).exists()).toBeTruthy()
    expect(wrapper.findComponent(Block).exists()).toBeTruthy()
  })

  it('should not render anything, when card status is TERMINATED', async () => {
    wrapper.setProps({
      card: { ...card, status: 'TERMINATED' }
    })
    await Vue.nextTick()
    expect(wrapper.findComponent(Replace).exists()).toBeFalsy()
    expect(wrapper.findComponent(ShowDetails).exists()).toBeFalsy()
  })
})
