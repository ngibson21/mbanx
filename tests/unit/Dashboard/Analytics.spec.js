import { shallowMount } from '@vue/test-utils'
import Analytics from '@/components/Dashboard/Analytics.vue'
import Chart from '@/components/Dashboard/SplineChart.vue'
import i18n from '@/plugins/i18n.js'
import store from '@/store/index.js'

// TODO: think about passing props to the Intro Card
// to make it better testable
describe('Intro.vue', () => {
  it('should render an Intro card', () => {
    const introCard = shallowMount(Analytics, {
      i18n,
      store,
      mocks: {
        $vuetify: { breakpoint: { xsOnly: true } }
      }
    })
    // expect chart
    expect(introCard.findComponent(Chart).exists()).toBeTruthy()
  })
})
