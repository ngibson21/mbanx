import { mount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import TransferDetailsPanelPreview from '@/components/Transfers/Receiver/TransferDetailsPanelPreview.vue'
import Vuex from 'vuex'

describe('Components.Transfers.Receiver.TransferDetailsPanelPreview', () => {
  const actions = {
    editPanel: jest.fn()
  }
  const store = new Vuex.Store({
    modules: {
      transfers: {
        namespaced: true,
        actions,
        state: {
          newTransfer: {
            currency: 'USD',
            amount: 100,
            subject: 'Testing TransferDetailsPanelPreview'
          }
        }
      }
    }
  })

  const wrapper = mount(TransferDetailsPanelPreview, { i18n, store })

  it('render recipient details and preview', () => {
    expect(wrapper.find('.v-btn').exists()).toBeTruthy()

    expect(wrapper.find('.label-amount').exists()).toBeTruthy()
    expect(wrapper.find('.label-amount').text()).toEqual(wrapper.vm.$n(100, { key: 'currency', currency: 'USD' }))

    expect(wrapper.find('.label-subject').exists()).toBeTruthy()
    expect(wrapper.find('.label-subject').text()).toEqual('Testing TransferDetailsPanelPreview')
  })

  it('should call editPanel', () => {
    wrapper.vm.toggleEditDetails()
    expect(actions.editPanel).toHaveBeenCalled()
  })
})
