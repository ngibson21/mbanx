import { shallowMount, createLocalVue } from '@vue/test-utils'
import Notification from '@/components/Cards/Notifications/Notification.vue'
import MiniCard from '@/components/Shared/CreditCard/Templates/Mini.vue'
import i18n from '@/plugins/i18n.js'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
const vuetify = new Vuetify({
  mocks: {
    $vuetify: {}
  }
})

describe('Components.Cards.Notifications.Notification.vue', () => {
  it('should render Notification card get ordered', () => {
    const notification = shallowMount(Notification, {
      localVue,
      i18n,
      vuetify,
      propsData: {
        card: {
          id: 4,
          status: 'CREATED',
          product: { name: 'Bronze' }
        }
      }
    })

    expect(notification.findComponent(MiniCard).exists()).toBeTruthy()
    expect(notification.find('.notification-message').text()).toMatch('Your Bronze order is being processed now. You will be notified when status of your order will change.')
  })

  it('should render Notification card ready to be activated', () => {
    const notification = shallowMount(Notification, {
      localVue,
      i18n,
      vuetify,
      propsData: {
        card: {
          id: 5,
          status: 'ORDERED',
          product: { name: 'Platinum' }
        }
      }
    })

    expect(notification.findComponent(MiniCard).exists()).toBeTruthy()
    expect(notification.find('.notification-message').text()).toMatch('Your new Platinum is ready to be activated. Once you will receive your card you can activate it and start using it.')
  })
})
