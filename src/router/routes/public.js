import lazyLoad from '@/utils/lazyLoad.js'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: lazyLoad('views/Login')
  },
  {
    path: '/otp',
    name: 'otp',
    component: lazyLoad('views/Otp')
  },
  {
    path: '/request-forgot-password',
    name: 'requestForgotPassword',
    component: lazyLoad('views/ResetPassword/Request')
  },
  {
    path: '/reset-password/:token',
    name: 'forgotPassword',
    component: lazyLoad('views/ResetPassword/PasswordChange')
  },
  {
    path: '/reset-password',
    name: 'resetPassword',
    component: lazyLoad('views/ResetPassword/ResetExpiredPassword')
  },
  {
    path: '/registration',
    name: 'registration',
    component: lazyLoad('views/Registration')
  }
]

export default routes.map(route => {
  const meta = {
    public: true,
    onlyLoggedOut: true
  }
  return { ...route, meta }
})
