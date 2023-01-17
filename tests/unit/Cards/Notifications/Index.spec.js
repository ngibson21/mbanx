import { shallowMount, createLocalVue } from '@vue/test-utils'
import CardNotifications from '@/components/Cards/Notifications/Index.vue'
import Notification from '@/components/Cards/Notifications/Notification.vue'
import i18n from '@/plugins/i18n.js'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Components.Cards.Notifications.Index.vue', () => {
  const store = new Vuex.Store({
    modules: {
      cards: {
        state: {
          items: [
            {
              id: 4,
              expiresOn: '2022-12-02',
              primaryAccountNumber: '12345678901234',
              status: 'INACTIVE',
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
              status: 'CREATED',
              embossedNames: ['Snow', 'John'],
              activatedAt: null,
              account: { id: 11, accountNumber: '000000011', summary: { accountBalance: 0 }, currency: { code: 'USD' } },
              product: { name: 'Bronze', network: 'VISA' },
              onlinePaymentEnabled: false,
              contactlessPaymentEnabled: false
            },
            {
              id: 6,
              expiresOn: '2022-12-02',
              primaryAccountNumber: '12345678901234',
              status: 'ORDERED',
              embossedNames: ['Snow', 'John'],
              activatedAt: null,
              account: { id: 11, accountNumber: '000000011', summary: { accountBalance: 0 }, currency: { code: 'USD' } },
              product: { name: 'Silver', network: 'VISA' },
              onlinePaymentEnabled: false,
              contactlessPaymentEnabled: false
            }
          ]
        }
      }
    }
  })

  const card = shallowMount(CardNotifications, {
    sync: false,
    i18n,
    store,
    localVue
  })

  it('should render list of notifications', () => {
    expect(card.find('.card-notifications-wrapper').exists()).toBeTruthy()
    expect(card.findAll('.card-notification-wrapper').length).toBe(3)
    expect(card.findComponent(Notification).exists()).toBeTruthy()
  })
})
