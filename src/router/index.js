import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'
import routes from './routes/index.js'
import enabledComponents from '@/config/enabled.js'
import { clearLocalStorage } from '@/utils/helpers.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      meta: {
        public: false
      }
    }
  ].concat(routes),
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const clientName = process.env.VUE_APP_CLIENT

  if (clientName) {
    document.title = `${clientName.charAt(0).toUpperCase() + clientName.slice(1)} Web Banking`
  }

  const authenticated = store.state.user.authenticated
  const required2FA = store.state.user.required2FA
  const isPasswordExpired = store.state.user.isPasswordExpired
  const onlyLoggedOut = to.matched.some(record => record.meta.onlyLoggedOut)
  const isPublic = to.matched.some(record => record.meta.public)

  if (enabledComponents && !enabledComponents.includes(to.name)) return next(false)

  if (!isPublic && !authenticated) {
    return next('/login')
  }

  if (to.name === 'login' && from.name === 'otp') {
    clearLocalStorage()
    sessionStorage.clear()
  }

  if (to.name === 'otp' && !required2FA) {
    return next('/login')
  }

  if (to.name === 'resetPassword' && !isPasswordExpired) {
    return next('/login')
  }

  if (authenticated && onlyLoggedOut) {
    return next('/')
  }

  if (!hasQueryParams(to) && hasQueryParams(from)) {
    return next({ name: to.name, query: from.query, params: to.params })
  }

  next()
})

function hasQueryParams (route) {
  return !!route.query.tenantIdentifier
}

export default router
