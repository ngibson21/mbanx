import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import store from '@/store/index.js'
import Search from '@/components/Transfers/Steps/Search/Index.vue'
import SearchInput from '@/components/Transfers/Steps/Search/SearchInput.vue'
import RecentTransfer from '@/components/Transfers/Steps/Search/RecentTransfer.vue'
import Recipients from '@/components/Transfers/Steps/Search/Recipients.vue'

describe('Components.Transfers.Steps.Search', () => {
  const wrapper = shallowMount(Search, {
    store,
    i18n
  })

  it('should be able to render search page', () => {
    expect(wrapper.findComponent(SearchInput).exists()).toBeTruthy()
    expect(wrapper.findComponent(RecentTransfer).exists()).toBeTruthy()
    expect(wrapper.findComponent(Recipients).exists()).toBeTruthy()
  })

  it('should be initail transfer', () => {
    const recipient = {
      creditor: {
        name: 'Billy The Bingy',
        identifier: 'SWIFT://123121/000000011'
      }
    }

    wrapper.vm.initialTransfer(recipient)
    expect(store.state.transfers.newTransfer).toEqual({
      amount: '',
      fullName: 'Billy The Bingy',
      remainingBalance: '',
      subject: '',
      paymentType: {
        value: 'ACH'
      },
      creditor: {
        accountNo: '000000011',
        sortCode: '123121'
      }
    })
  })
})
