import { shallowMount } from '@vue/test-utils'
import store from '@/store/index.js'
import Notification from '@/views/Notifications.vue'
import Vuetify from 'vuetify'
import Vue from 'vue'

describe('Toggle Notifications', () => {
  const vuetify = new Vuetify({
    mocks: {
      $vuetify: {
        breakpoint: {
          xsOnly: true
        }
      }
    }
  })

  it('should show message', async () => {
    const wrapper = shallowMount(Notification, {
      store,
      vuetify
    })
    wrapper.setData({ show: true, message: 'Test' })
    await Vue.nextTick()
    expect(wrapper.html()).toContain('Test')
  })
})
