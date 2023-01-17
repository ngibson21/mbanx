import { shallowMount } from '@vue/test-utils'
import Transactions from '@/views/Transactions.vue'
import AccountSelection from '@/components/Transactions/AccountSelection.vue'
import List from '@/components/Transactions/List.vue'
import i18n from '@/plugins/i18n.js'
import store from '@/store/index.js'
import Vue from 'vue'
import Vuetify from 'vuetify'

describe('Transactions.vue', () => {
  const vuetify = new Vuetify({
    mocks: {
      $vuetify: {
        breakpoint: {
          xsOnly: true
        }
      }
    }
  })

  const wrapper = shallowMount(Transactions, {
    i18n,
    store,
    vuetify
  })

  it('should not render AccountSeletction', async () => {
    const wrapperInner = shallowMount(Transactions, {
      i18n,
      store,
      computed: {
        savingAccounts () { return Array(1) }
      }
    })
    await Vue.nextTick()
    expect(wrapperInner.findComponent(AccountSelection).exists()).toBeFalsy()
  })

  it('should render AccountSelection', async () => {
    const wrapperInner = shallowMount(Transactions, {
      i18n,
      store,
      vuetify,
      computed: {
        savingAccounts () { return Array(3) }
      }
    })
    await Vue.nextTick()
    expect(wrapperInner.findComponent(AccountSelection).exists()).toBeTruthy()
  })

  it('should not show transaction list when no selectedAccount', async () => {
    wrapper.setData({ selectedAccounts: [] })
    await Vue.nextTick()
    expect(wrapper.html()).toContain(i18n.messages.en.components.transactions.list.noSelectAcc)
  })

  it('should render Transaction list when has selectedAccount', async () => {
    wrapper.setData({ selectedAccounts: [11] })
    await Vue.nextTick()
    expect(wrapper.findComponent(List).exists()).toBeTruthy()
  })

  it('should be set selected account before destroy', () => {
    expect(store.dispatch(
      'application/setSelectedAccount', wrapper.vm.selectedAccounts
    )).toBeTruthy()
    wrapper.destroy()
  })
})
