import { shallowMount, createLocalVue } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import i18n from '@/plugins/i18n.js'
import VueRouter from 'vue-router'
import routes from '@/router/routes/index.js'
import store from '@/store/index.js'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({ routes })

describe('Login.vue', () => {
  const wrapper = shallowMount(Login, {
    sync: false,
    router,
    store,
    i18n
  })

  it('renders the welcome message', () => {
    expect(wrapper.html()).toContain(i18n.messages.en.views.login.welcomeMessage)
  })

  it('render the sign in button', () => {
    expect(wrapper.html()).toContain(i18n.messages.en.views.login.form.buttons.signIn)
  })
})
