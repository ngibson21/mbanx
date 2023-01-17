import lazyLoad from '@/utils/lazyLoad.js'

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: lazyLoad('views/Dashboard')
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: lazyLoad('views/Accounts/List')
  },
  {
    path: '/accounts/loan/:id',
    name: 'loanAccount',
    component: lazyLoad('views/Accounts/Loan')
  },
  {
    path: '/accounts/current/:id',
    name: 'currentAccount',
    component: lazyLoad('views/Accounts/Current')
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: lazyLoad('views/Transactions')
  },
  {
    path: '/transfers/new',
    name: 'newTransfer',
    component: lazyLoad('views/Transfers/New')
  },
  {
    path: '/communications',
    name: 'communications',
    component: lazyLoad('views/Communications')
  },
  {
    path: '/cards',
    name: 'cards',
    component: lazyLoad('views/Cards')
  },
  {
    path: '/settings',
    name: 'settings',
    component: lazyLoad('views/Settings')
  },
  {
    path: '/recipients',
    name: 'recipients',
    component: lazyLoad('views/Recipients')
  }
]

export default routes.map(route => {
  const meta = {
    public: false
  }
  return { ...route, meta }
})
