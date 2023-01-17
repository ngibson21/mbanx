import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import store from '@/store/index.js'
import Loan from '@/components/Accounts/Headers/Loan.vue'
import Vuetify from 'vuetify'

describe('components.Accounts.Loan', () => {
  const vuetify = new Vuetify({
    mocks: {
      $vuetify: {
        breakpoint: {
          smAndDown: true
        }
      }
    }
  })
  const wrapper = shallowMount(Loan, {
    i18n,
    store,
    vuetify,
    propsData: {
      account: {
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
  it('should render accounts', () => {
    expect(wrapper.find('div').exists()).toBeTruthy()
  })
})
