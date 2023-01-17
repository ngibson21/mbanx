import { mount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import store from '@/store/index.js'
import AccountSelectionPanel from '@/components/Transfers/Sender/AccountSelectionPanel.vue'

describe('Components.Transfers.Sender.AccountSelectionPanel', () => {
  const accountSelectionPanelWrapper = mount(AccountSelectionPanel, {
    sync: false,
    i18n,
    store
  })

  it('render list of accounts', () => {
    expect(accountSelectionPanelWrapper.find('div').exists).toBeTruthy()
  })

  it('should change value accountSelectionPanelWrapper.vm.selectedAccount', () => {
    const account = { accountNumber: '000000011' }
    accountSelectionPanelWrapper.vm.selectAccount(account)

    expect(accountSelectionPanelWrapper.vm.selectedAccount).toEqual({ debitorNumber: '000000011', debtor: account })
  })

  it('should called saveRecipient and setCompleteStep', async () => {
    const account = { accountNumber: '000000011' }
    await accountSelectionPanelWrapper.vm.selectAccount(account)
    accountSelectionPanelWrapper.vm.saveAccountSelection()

    expect(store.dispatch('transfers/saveRecipient', { data: accountSelectionPanelWrapper.vmselectedAccount, to: 'TransferType' }))
      .toBeTruthy()

    expect(store.dispatch('transfers/setCompleteStep', { step: 'debitAccountInfo' })).toBeTruthy()
  })
})
