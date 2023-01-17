import { mount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import NoData from '@/components/Transactions/Items/NoData.vue'

describe('Components.Transactions.Items.NoData.vue', () => {
  it('should display "No transactions data"', () => {
    const wrapper = mount(NoData, {
      i18n
    })
    expect(wrapper.html()).toContain('No transactions data')
  })
})
