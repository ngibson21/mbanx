import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import TransferPanels from '@/components/Transfers/Panels/Index.vue'
import LayoutTemplate from '@/components/Transfers/Misc/LayoutTemplate.vue'
import RecipientDetailsPanel from '@/components/Transfers/Receiver/RecipientDetailsPanel.vue'
import RecipientDetailsPanelPreview from '@/components/Transfers/Receiver/RecipientDetailsPanelPreview.vue'
import TransferDetailsPanel from '@/components/Transfers/Receiver/TransferDetailsPanel.vue'
import TransferDetailsPanelPreview from '@/components/Transfers/Receiver/TransferDetailsPanelPreview.vue'
import SummaryPanel from '@/components/Transfers/Summary'

describe('Components.Transfers.Panels', () => {
  it('should render initial components', () => {
    const transferPanelsWrapper = shallowMount(TransferPanels, {
      i18n,
      store: {
        state: {
          transfers: {
            transferStep: 'CreditDetails',
            isCompletedStep: {
              recipientAccountInfo: false,
              transferAccountInfo: false,
              debitAccountInfo: false,
              transferTypeInfo: false
            }
          }
        }
      }
    })

    expect(transferPanelsWrapper.findComponent(LayoutTemplate).exists()).toBeTruthy()
    expect(transferPanelsWrapper.find('v-expansion-panels-stub').exists).toBeTruthy()
    expect(transferPanelsWrapper.find('v-expansion-panels-stub').attributes('value')).toEqual('0')
    expect(transferPanelsWrapper.findAll('v-expansion-panel-stub').length).toEqual(4)
    expect(transferPanelsWrapper.vm.completedStep).toEqual({
      recipientAccountInfo: false,
      transferAccountInfo: false,
      debitAccountInfo: false,
      transferTypeInfo: false
    })
  })

  it('should expand RecipientDetailsPanel', () => {
    const transferPanelsWrapper = shallowMount(TransferPanels, {
      i18n,
      store: {
        state: {
          transfers: {
            transferStep: 'CreditDetails',
            isCompletedStep: {
              recipientAccountInfo: false,
              transferAccountInfo: false,
              debitAccountInfo: false,
              transferTypeInfo: false
            }
          }
        }
      }
    })

    expect(transferPanelsWrapper.vm.expandStep).toEqual(0)
    expect(transferPanelsWrapper.find('section#recipient-details-panel-preview').element.style.display).toEqual('none')
    expect(transferPanelsWrapper.find('v-expansion-panels-stub').attributes('value')).toEqual('0')
    expect(transferPanelsWrapper.findComponent(RecipientDetailsPanel).exists()).toBeTruthy()
    expect(transferPanelsWrapper.findComponent(RecipientDetailsPanelPreview).exists()).toBeTruthy()
  })

  it('should expand TransferDetailsPanel', () => {
    const transferPanelsWrapper = shallowMount(TransferPanels, {
      i18n,
      store: {
        state: {
          transfers: {
            transferStep: 'TransferDetails',
            isCompletedStep: {
              recipientAccountInfo: true,
              transferAccountInfo: false,
              debitAccountInfo: false,
              transferTypeInfo: false
            }
          }
        }
      }
    })

    expect(transferPanelsWrapper.vm.expandStep).toEqual(1)
    expect(transferPanelsWrapper.find('section#transfer-details-panel-preview').element.style.display).toEqual('none')
    expect(transferPanelsWrapper.find('v-expansion-panels-stub').attributes('value')).toEqual('1')
    expect(transferPanelsWrapper.findComponent(TransferDetailsPanel).exists()).toBeTruthy()
    expect(transferPanelsWrapper.findComponent(TransferDetailsPanelPreview).exists()).toBeTruthy()
  })

  it('should expand SummaryPanel', () => {
    const transferPanelsWrapper = shallowMount(TransferPanels, {
      i18n,
      store: {
        state: {
          transfers: {
            transferStep: 'SummaryPage',
            isCompletedStep: {
              recipientAccountInfo: true,
              transferAccountInfo: true,
              debitAccountInfo: true,
              transferTypeInfo: true
            }
          }
        }
      }
    })

    expect(transferPanelsWrapper.vm.expandStep).toEqual(3)
    expect(transferPanelsWrapper.find('v-expansion-panels-stub').attributes('value')).toEqual('3')
    expect(transferPanelsWrapper.findComponent(SummaryPanel).exists()).toBeTruthy()
  })
})
