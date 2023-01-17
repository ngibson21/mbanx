import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Loan from '@/components/Accounts/Details/Loan.vue'

describe('components.Accounts.Details.Loans', () => {
  const wrapper = shallowMount(Loan, {
    i18n,
    propsData: {
      account:
      {
        id: '01',
        accountNumber: '000000011',
        productDetail: {
          currency: {
            code: 'USD'
          }
        },
        charges: [{
          penaltyCharge: false
        }],
        product: {
          name: 'Income Generating Loan'
        },
        actualDisbursementDate: 'Mar 28, 2019',
        actualMaturityDate: 'Mar 28, 2019',
        summary: {
          totalFeeChargesCharged: '1233'
        }
      }
    }
  })

  const html = wrapper.html()

  it('should render date', () => {
    expect(html).toContain('Mar 28, 2019')
  })
})
