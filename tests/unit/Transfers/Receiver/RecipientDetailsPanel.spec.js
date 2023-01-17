import { mount, createLocalVue } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import RecipientDetailsPanel from '@/components/Transfers/Receiver/RecipientDetailsPanel.vue'
import TransferFormType from '@/components/Shared/DetectTypes/TransferFormType.vue'

describe('Components.Transfers.Receiver.RecipientDetailsPanel', () => {
  const localVue = createLocalVue()
  const actions = {
    'transfers/saveRecipient': jest.fn(),
    'transfers/updateRecipient': jest.fn(),
    'transfers/setCompleteStep': jest.fn()
  }

  const store = new Vuex.Store({
    actions,
    modules: {
      transfers: {
        namespaced: true,
        state: {
          newTransfer: {
            currency: 'USD',
            amount: '100',
            debtor: {
              currency: {
                code: 'USD'
              },
              accountBalance: '213123'
            },
            creditor: {
              country: 'US'
            }
          }
        }
      }
    }
  })

  const recipientDetailsPanelWrapper = mount(RecipientDetailsPanel, {
    sync: false,
    store,
    i18n,
    localVue,
    vuetify: new Vuetify()
  })

  it('should fired form-type-changed method', async () => {
    const transferFormTypeWrapper = recipientDetailsPanelWrapper.findComponent(TransferFormType)

    transferFormTypeWrapper.vm.$emit('form-type-changed', {
      formData: {
        fullName: 'Tony Stack',
        creditor: {
          accountNo: '000000088',
          sortCode: 'ABC123'
        }
      }
    })

    await recipientDetailsPanelWrapper.vm.$nextTick()

    const { formData } = recipientDetailsPanelWrapper.vm

    expect(formData.fullName).toEqual('Tony Stack')
    expect(formData.creditor.accountNo).toEqual('000000088')
    expect(formData.creditor.sortCode).toEqual('ABC123')
  })

  it('should return true for validateRecipientAddress when formData.creditor.country is US', () => {
    expect(recipientDetailsPanelWrapper.vm.formCreditorAddress.country).toEqual('US')
    expect(recipientDetailsPanelWrapper.vm.validateRecipientAddress()).toBeTruthy()
  })

  it('should return Required for validateRecipientAddress when formData.creditor.country is KH', async () => {
    await recipientDetailsPanelWrapper.setData({ formCreditorAddress: { country: 'KH' } })

    expect(recipientDetailsPanelWrapper.vm.formCreditorAddress.country).toEqual('KH')
    expect(recipientDetailsPanelWrapper.vm.validateRecipientAddress())
      .toEqual(recipientDetailsPanelWrapper.vm.$t('components.transfers.creation.required'))
  })

  it('should not show address form', () => {
    expect(recipientDetailsPanelWrapper.find('#address-form').exists()).toBeFalsy()
  })

  it('should show address form', async () => {
    const btnToggleAddress = recipientDetailsPanelWrapper.find('#btn-toggle-address')
    await btnToggleAddress.trigger('click')

    expect(recipientDetailsPanelWrapper.find('#address-form').exists()).toBeTruthy()
    expect(recipientDetailsPanelWrapper.vm.isShowAddress).toBeTruthy()
  })

  it('should not call saveRecipient', () => {
    recipientDetailsPanelWrapper.vm.$refs.recipientDetailsForm.validate = jest.fn().mockReturnValue(false)
    recipientDetailsPanelWrapper.vm.saveRecipient()
    expect(actions['transfers/saveRecipient']).not.toHaveBeenCalled()
  })

  it('should not call saveRecipient', () => {
    recipientDetailsPanelWrapper.vm.$refs.recipientDetailsForm.validate = jest.fn().mockReturnValue(false)
    recipientDetailsPanelWrapper.vm.saveRecipient()
    expect(actions['transfers/saveRecipient']).not.toHaveBeenCalled()
  })

  it('should not call updateRecipient', () => {
    recipientDetailsPanelWrapper.vm.updateRecipient()
    expect(actions['transfers/updateRecipient']).not.toHaveBeenCalled()
  })

  it('should save recipient', () => {
    recipientDetailsPanelWrapper.vm.$refs.recipientDetailsForm.validate = jest.fn().mockReturnValue(true)
    recipientDetailsPanelWrapper.vm.saveRecipient()
    expect(actions['transfers/saveRecipient']).toHaveBeenCalled()
    expect(actions['transfers/setCompleteStep']).toHaveBeenCalled()
  })
  it('should update recipient', () => {
    recipientDetailsPanelWrapper.vm.updateRecipient()
    expect(store.dispatch('transfers/updateRecipient', {})).toBeTruthy()
  })
})
