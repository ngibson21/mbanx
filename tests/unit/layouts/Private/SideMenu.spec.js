import { mount, createLocalVue } from '@vue/test-utils'
import SideMenu from '@/layouts/Private/SideMenu.vue'
import i18n from '@/plugins/i18n.js'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import routes from '@/router/routes/index.js'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({ routes })

describe('SideMenu.vue', () => {
  const vuetify = new Vuetify({
    mocks: {
      $vuetify: {
        breakpoint: {
          smAndDown: true
        }
      }
    }
  })

  const wrapper = mount(SideMenu, {
    i18n,
    router,
    vuetify,
    data () {
      return {
        navLinks: [
          {
            name: 'dashboard',
            icon: 'fal fa-hexagon',
            uri: 'dashboard'
          }
        ]
      }
    }
  })
  it('should contain the navlinks', () => {
    expect(wrapper.vm.navLinks).toEqual([{
      name: 'dashboard',
      icon: 'fal fa-hexagon',
      uri: 'dashboard'
    }])
    wrapper.setData({
      navLinks: [{
        name: 'accounts',
        icon: 'fal fa-clone',
        uri: 'accounts'
      }]
    })
    expect(wrapper.vm.navLinks).toEqual([{
      name: 'accounts',
      icon: 'fal fa-clone',
      uri: 'accounts'
    }])
  })
})
