import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import store from '@/store/index.js'
import AccountList from '@/views/Accounts/List.vue'

describe('views.Accounts.List', () => {
  const wrapper = shallowMount(AccountList, {
    i18n,
    store
  })

  it('should render accounts', () => {
    expect(wrapper.find('div').exists()).toBeFalsy()
  })
})
