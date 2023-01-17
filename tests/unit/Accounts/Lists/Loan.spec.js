import { shallowMount, createLocalVue } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Loan from '@/components/Accounts/Lists/Loan.vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes/index.js'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({ routes })

describe('components.Accounts.Lists.Loan', () => {
  const wrapper = shallowMount(Loan, {
    i18n,
    router,
    propsData: {
      activeLoanAccounts: [
        {
          id: '01',
          accountNumber: '000000011',
          accountBalance: '11',
          productDetail: {
            currency: {
              code: 'USD'
            }
          },
          product: {
            name: 'Income Generating Loan'
          },
          approvedOnDate: 'Mar 28, 2019',
          summary: {
            totalOutstanding: '1233'
          }
        }
      ]
    }
  })

  it('should render accounts', () => {
    expect(wrapper.find('div').exists()).toBeFalsy()
  })

  it('should push account to new route', async () => {
    const account = { id: '01' }
    await wrapper.vm.showDetails(account)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$route.name).toBe('loanAccount')
  })
})
