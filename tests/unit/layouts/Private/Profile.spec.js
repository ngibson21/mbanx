import { shallowMount } from '@vue/test-utils'
import Profile from '@/layouts/Private/Toolbar/Profile.vue'
import i18n from '@/plugins/i18n.js'
import store from '@/store/index.js'
import Vuetify from 'vuetify'

describe('Profile.vue', () => {
  const wrapper = shallowMount(Profile, {
    i18n,
    store,
    vuetify: new Vuetify({
      mocks: {
        $vuetify: {
          breakpoint: {
            xsOnly: false,
            smAndUp: true
          }
        }
      }
    })
  })

  it('should contain div tag', () => {
    expect(wrapper.find('div').exists()).toBeFalsy()
    expect(wrapper.vm.xsOnly).toBeFalsy()
    expect(wrapper.vm.smAndUp).toBeTruthy()
  })

  it('should change theme', () => {
    expect(store.dispatch('localSettings/changeTheme')).toBeTruthy()
    expect(store.state.localSettings.darkMode).toBeTruthy()
  })
})
