import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Vuex from 'vuex'
import TransferDetailsPanel from '@/components/Transfers/Receiver/TransferDetailsPanel.vue'
import InputCurrency from '@/components/Shared/Form/Elements/InputCurrency.vue'

describe('Components.Transfers.Receiver.TransferDetailsPanel', () => {
  const actions = {
    saveRecipient: jest.fn(),
    updateRecipient: jest.fn()
  }

  const application = {
    namespaced: true,
    state: {
      settings: {
        general: { mainCurrency: 'USD' }
      }
    }
  }

  const transfers = {
    namespaced: true,
    actions,
    getters: {
      getTransfer: () => () => ({ currency: 'USD' })
    }
  }

  const accounts = {
    namespaced: true,
    state: {
      savingsAccounts: [{ accountNumber: '000000011' }]
    }
  }

  let store = new Vuex.Store({ modules: { application, transfers, accounts } })

  const wrapper = shallowMount(TransferDetailsPanel, {
    sync: false,
    i18n,
    store
  })

  it('should be able to render recipient from', () => {
    expect(wrapper.findComponent(InputCurrency).exists()).toBeTruthy()
  })

  it('does not create transfer', () => {
    wrapper.vm.$refs.transferDetailsForm.validate = jest.fn().mockReturnValue(false)
    wrapper.vm.saveTransfer()

    expect(actions.saveRecipient).not.toHaveBeenCalled()
  })

  it('does not update recipient', () => {
    wrapper.vm.$refs.transferDetailsForm.validate = jest.fn().mockReturnValue(false)
    wrapper.vm.updateTransfer()

    expect(actions.updateRecipient).not.toHaveBeenCalled()
  })

  it('create transfer', () => {
    wrapper.vm.$refs.transferDetailsForm.validate = jest.fn().mockReturnValue(true)
    wrapper.vm.saveTransfer()

    expect(wrapper.vm.$refs.transferDetailsForm.validate()).toBeTruthy()
    expect(store.dispatch('transfers/saveRecipient', {
      data: {
        currency: 'USD',
        amount: '100',
        subject: ''
      },
      to: 'AccountSelection'
    }
    )).toBeTruthy()
  })

  it('update transfer', () => {
    wrapper.vm.updateTransfer()

    expect(store.dispatch('transfers/updateRecipient', {
      data: {
        currency: 'USD',
        amount: '100',
        subject: ''
      },
      type: 'transferDetails'
    })).toBeTruthy()
  })

  it('has validation on required field', () => {
    expect(wrapper.vm.rules.required('')).toEqual(wrapper.vm.$t('components.transfers.new.form.requiredRule'))
  })

  it('has validation on character limit field', () => {
    const value = 'Testing validation on character limit field showing error text that cannot be longer than one handred and twenty characters'

    expect(wrapper.vm.rules.limitChar(value)).toEqual(wrapper.vm.$t('components.transfers.new.form.limitChar'))
  })

  it('has validation on minimun value field', () => {
    wrapper.setData({ recipientDetails: { amount: 0 } })

    expect(wrapper.vm.rules.minValue()).toEqual(wrapper.vm.$t('components.transfers.new.form.minValue'))
  })

  it('process to account selection step when it has 2 or more savings accounts', () => {
    const accounts = {
      namespaced: true,
      state: {
        savingsAccounts: [{ accountNumber: '000000011' }, { accountNumber: '000000012' }]
      }
    }
    store = new Vuex.Store({
      actions,
      modules: {
        application,
        transfers,
        accounts
      }
    })
    const wrapper = shallowMount(TransferDetailsPanel, {
      sync: false,
      i18n,
      store
    })
    wrapper.vm.$refs.transferDetailsForm.validate = jest.fn().mockReturnValue(true)
    wrapper.vm.saveTransfer()
    expect(actions.saveRecipient).toHaveBeenCalled()
  })
})
