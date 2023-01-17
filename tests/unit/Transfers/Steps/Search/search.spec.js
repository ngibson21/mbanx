import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import Search from '@/components/Transfers/Steps/Search/SearchInput.vue'
import store from '@/store/index.js'
import * as transfer from '@/api/views/transfers.js'
describe('Components.Transfers.Steps.Search', () => {
  const wrapper = shallowMount(Search, {
    store,
    i18n
  })

  it('should search for transfer', async () => {
    transfer.getTransfers = jest.fn().mockResolvedValue({ data: { data: [{ creditor: { name: 'John Views' } }] } })
    await wrapper.setData({ search: 'John' })
    wrapper.setData({ entries: [{ creditor: { name: 'John Views' } }] })
    expect(wrapper.vm.items).toEqual([{ creditor: { name: 'John Views' }, keywords: 'John Views undefined' }])
  })
})
