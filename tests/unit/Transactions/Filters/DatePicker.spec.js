import { shallowMount } from '@vue/test-utils'
import i18n from '@/plugins/i18n.js'
import DatePicker from '@/components/Transactions/Filters/DatePicker.vue'
import { hint } from '@/utils/localeDate.js'

describe('Component.Transactions.Filters.DatePicker.vue', () => {
  const wrapper = shallowMount(DatePicker, {
    i18n,
    propsData: {
      value: '',
      applyFilter: () => { }
    }
  })

  it('should be convert date to right format', () => {
    wrapper.vm.emitDate('2019-01-11')
    expect(wrapper.emitted().input).toBeTruthy()
  })

  it('should be allowed date in the past', () => {
    expect(wrapper.vm.selectableDates('2019-1-11')).toBeTruthy()
  })

  it('should input date by field', () => {
    const date = '2019-1-11'
    wrapper.vm.inputDate(date)
    expect(wrapper.vm.$props.value).toBe('')
  })

  it('should input invalid date', () => {
    const date = '123'
    wrapper.vm.inputDate(date)
    expect(wrapper.vm.$data.invalidFormat).toBe(`${i18n.t('components.transactions.searchFilters.invalidDateFormat')} ${hint}`)
  })

  it('should be allowed date range', () => {
    wrapper.setProps({ maxDate: '2019-11-22' })
    expect(wrapper.vm.validDateRange('2019-1-11')).toBeFalsy()
  })

  it('should be remove chip', () => {
    wrapper.vm.onRemoveChip()
    expect(wrapper.vm.$props.value).toBe('')
  })
})
