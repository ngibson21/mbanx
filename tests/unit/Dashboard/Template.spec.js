import { shallowMount, createLocalVue } from '@vue/test-utils'
import CardTemplate from '@/components/Dashboard/CardTemplate.vue'
import i18n from '@/plugins/i18n.js'
import store from '@/store/index.js'
import VueRouter from 'vue-router'
import routes from '@/router/routes/index.js'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({ routes })

describe('Widget.vue', () => {
  it('render Dashboard Widget', () => {
    const wrapper = shallowMount(CardTemplate, {
      i18n,
      sync: false,
      router,
      store
    })

    expect(wrapper.findComponent(CardTemplate).exists()).toBeTruthy()
  })

  it('renders the title', () => {
    const propsData = {
      title: 'Accounts'
    }
    const wrapper = shallowMount(CardTemplate, {
      i18n,
      sync: false,
      router,
      store,
      propsData
    })

    expect(wrapper.props().title).toBe('Accounts')
  })

  it('push to new route', async () => {
    const wrapper = shallowMount(CardTemplate, {
      i18n,
      router,
      store
    })
    const path = 'accounts'
    await wrapper.vm.redirect(path)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$route.name).toBe('accounts')
  })
})
