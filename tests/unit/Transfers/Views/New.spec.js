import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import router from '@/router/index.js'
import NewTransfer from '@/views/Transfers/New.vue'
import store from '@/store/index.js'
import SearchList from '@/components/Transfers/Steps/Search/Index.vue'
import TransferPanels from '@/components/Transfers/Panels/Index.vue'
import SenderDetailsPanel from '@/components/Transfers/Sender/SenderDetailsPanel.vue'
import SuccessPage from '@/components/Transfers/Steps/Success.vue'

describe('Components.Transfers.New.NewTransfer', () => {
  const shallowMountOpt = {
    sync: false,
    i18n,
    router,
    data () {
      return {
        recipient: {}
      }
    }
  }

  const recipient = {
    recipient: {
      fullName: 'jon snow',
      currency: 'USD',
      email: ''
    }
  }

  it('should render new transfer with SearchList', () => {
    const wrapper = shallowMount(NewTransfer, { ...shallowMountOpt, store: { ...store, state: { transfers: { transferStep: 'SearchList' } } } })
    wrapper.setData(recipient)

    expect(wrapper.findAllComponents(SearchList)).toBeTruthy()
  })

  it('should render new transfer with TransferPanels on step CreditDetails', () => {
    const wrapper = shallowMount(NewTransfer, { ...shallowMountOpt, store: { ...store, state: { transfers: { transferStep: 'CreditDetails' } } } })
    wrapper.setData(recipient)

    expect(wrapper.findAllComponents(TransferPanels)).toBeTruthy()
  })

  it('should render new transfer with TransferPanels on step TransferDetails', () => {
    const wrapper = shallowMount(NewTransfer, { ...shallowMountOpt, store: { ...store, state: { transfers: { transferStep: 'TransferDetails' } } } })
    wrapper.setData(recipient)

    expect(wrapper.findAllComponents(TransferPanels)).toBeTruthy()
  })

  it('should render new transfer with TransferPanels on step TransferType', () => {
    const wrapper = shallowMount(NewTransfer, { ...shallowMountOpt, store: { ...store, state: { transfers: { transferStep: 'TransferType' } } } })
    wrapper.setData(recipient)

    expect(wrapper.findAllComponents(TransferPanels)).toBeTruthy()
  })

  it('should render new transfer with TransferPanels on step SummaryPage', () => {
    const wrapper = shallowMount(NewTransfer, { ...shallowMountOpt, store: { ...store, state: { transfers: { transferStep: 'SummaryPage' } } } })
    wrapper.setData(recipient)

    expect(wrapper.findAllComponents(TransferPanels)).toBeTruthy()
  })

  it('should render new transfer with SenderDetailsPanel on step SummaryPage', () => {
    const wrapper = shallowMount(NewTransfer, { ...shallowMountOpt, store: { ...store, state: { transfers: { transferStep: 'AccountSelection' } } } })
    wrapper.setData(recipient)

    expect(wrapper.findAllComponents(SenderDetailsPanel)).toBeTruthy()
  })

  it('should render new transfer with SuccessPage', () => {
    const wrapper = shallowMount(NewTransfer, { ...shallowMountOpt, store: { ...store, state: { transfers: { transferStep: 'SuccessPage' } } } })
    wrapper.setData(recipient)

    expect(wrapper.findAllComponents(SuccessPage)).toBeTruthy()
  })

  it('should be exit new transfer page', () => {
    const wrapper = shallowMount(NewTransfer, { ...shallowMountOpt, store })

    expect(store.dispatch('transfers/discardTransfer')).toBeTruthy()
    wrapper.destroy()
  })
})
