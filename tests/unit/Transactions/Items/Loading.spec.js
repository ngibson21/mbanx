import { mount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import ItemsLoading from '@/components/Transactions/Items/Loading.vue'

describe('Components.Transactions.Items.Loading.vue', () => {
  it('should display loading text', () => {
    const wrapper = mount(ItemsLoading, {
      i18n
    })
    expect(wrapper.html()).toContain('Loading transactions...')
  })
})
