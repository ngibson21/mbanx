
import { mount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Vuex from 'vuex'
import RecipientDetailsPanelPreview from '@/components/Transfers/Receiver/RecipientDetailsPanelPreview.vue'

describe('Components.Transfers.Receiver.RecipientDetailsPanelPreview', () => {
  const actions = {
    editPanel: jest.fn()
  }
  const wrapper = mount(RecipientDetailsPanelPreview, {
    sync: false,
    i18n,
    store: new Vuex.Store({
      modules: {
        transfers: {
          namespaced: true,
          actions,
          state: {
            isEdit: false
          },
          getters: {
            getTransfer: () => ({
              fullName: 'Tony Stack',
              creditor: {
                accountNo: '000000088',
                sortCode: 'ABC123'
              }
            })
          }
        }
      }
    })
  })

  it('render complete components', () => {
    expect(wrapper.find('.v-avatar').exists()).toBeTruthy()
    expect(wrapper.find('.v-btn').exists()).toBeTruthy()

    expect(wrapper.find('.label-name').exists()).toBeTruthy()
    expect(wrapper.find('.label-name').text()).toEqual('Tony Stack')

    expect(wrapper.find('.label-account').exists()).toBeTruthy()
    expect(wrapper.find('.label-account').text()).toEqual('000000088 ABC123')
  })

  it('should call editPanel', () => {
    wrapper.vm.toggleEditRecipient()
    expect(actions.editPanel).toHaveBeenCalled()
  })
})
