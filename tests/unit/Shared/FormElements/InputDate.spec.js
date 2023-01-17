import { mount } from '@vue/test-utils'
import InputDate from '@/components/Shared/Form/Elements/InputDate.vue'
import i18n from '@/plugins/i18n.js'
import Vuetify from 'vuetify'

describe('InputDate.vue', () => {
  const vuetify = new Vuetify({
    mocks: {
      $vuetify: {
        theme: {
          dark: {
            background: '#404248'
          },
          light: {
            background: '#fafafa'
          }
        }
      }
    }
  })
  const wrapper = mount(InputDate, {
    i18n,
    sync: false,
    vuetify,
    propsData: {
      value: '2019-02',
      type: 'date'
    }
  })

  it('has value', () => {
    expect(wrapper.props('value')).toBe('2019-02')
  })

  it('should return type of date', () => {
    expect(wrapper.vm.type).toEqual('date')
  })
})
