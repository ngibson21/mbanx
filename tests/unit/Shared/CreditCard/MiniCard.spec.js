import { mount, createLocalVue } from '@vue/test-utils'
import MiniCard from '@/components/Shared/CreditCard/Templates/Mini.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuetify)

const vuetify = new Vuetify()

describe('Components.Shared.CreditCard.MiniCard.vue', () => {
  it('should not render mini card product network without any props pass', () => {
    const miniCard = mount(MiniCard)

    expect(miniCard.find('.product-network-image').exists()).toBeFalsy()
  })

  it('should not render mini card product network with prop productNetwork empty', () => {
    const miniCard = mount(MiniCard, {
      propsData: {
        network: ''
      }
    })

    expect(miniCard.find('.product-network-image').exists()).toBeFalsy()
  })

  it('should render mini card product network', () => {
    const miniCard = mount(MiniCard, {
      vuetify,
      propsData: {
        network: 'mastercard'
      }
    })
    expect(miniCard.find('.product-network-image').exists()).toBeTruthy()
  })
})
