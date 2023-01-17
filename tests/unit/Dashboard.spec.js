import { shallowMount } from '@vue/test-utils'
import Dashboard from '@/views/Dashboard.vue'
import i18n from '@/plugins/i18n.js'
import store from '@/store/index.js'
import Vuetify from 'vuetify'

describe('Dashboard.vue', () => {
  // let vuetify = new Vuetify({
  //   mocks: {
  //     $vuetify: {
  //       breakpoint: {
  //         mdAndUp: true
  //       }
  //     }
  //   }
  // })
  const wrapper = shallowMount(Dashboard, {
    i18n,
    store,
    vuetify: new Vuetify({
      mocks: {
        $vuetify: {
          breakpoint: {
            smAndDown: true
          }
        }
      }
    })
  })

  it('has fab that redirect to newTransfer', () => {
    expect(wrapper.vm.page.fab).toEqual({ name: 'newTransfer' })
  })

  it('has fab that will not redirect to newTransfer', () => {
    const wrapper = shallowMount(Dashboard, {
      i18n,
      store,
      mocks: {
        $appConfig: {
          enabled: (newTransfer) => false
        }
      },
      vuetify: new Vuetify({
        mocks: {
          $vuetify: {
            breakpoint: {
              smAndDown: true
            }
          }
        }
      })
    })
    expect(wrapper.vm.page.fab).toEqual({})
  })
})
