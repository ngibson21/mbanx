import { mount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Template from '@/components/Accounts/Details/Template.vue'
import Vuetify from 'vuetify'

describe('components.Accounts.Details.Template', () => {
  const wrapper = mount(Template, {
    i18n,
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

  it('should render account details', () => {
    expect(wrapper.find('div').exists()).toBeTruthy()
  })
})
