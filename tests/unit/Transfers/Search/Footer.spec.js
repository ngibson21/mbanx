import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Footer from '@/components/Transfers/Search/Footer.vue'
import store from '@/store/index.js'

describe('Components.Transfers.Search.Footer', () => {
  const wrapper = shallowMount(Footer, {
    store,
    i18n
  })

  it('should create new transfer', () => {
    wrapper.vm.newTransfer()
    expect(store.state.transfers.newTransfer).toEqual(
      {
        amount: '',
        fullName: '',
        remainingBalance: '',
        subject: '',
        paymentType: {
          value: 'ACH'
        }
      })
  })
})
