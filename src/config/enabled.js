// get the config from the backend
// list with the enabled components
const features = {
  kinetic: [
    'login',
    'otp',
    'dashboard',
    'accounts',
    'currentAccount',
    'loanAccount',
    'newTransfer',
    'transactions',
    'communications',
    'cards',
    'settings',
    'recipients'
  ]
}

const client = process.env.VUE_APP_CLIENT

const enabled = (client = '') => {
  if (!client) {
    // everything is enabled?
    return false
  }

  if (!features[client]) {
    // nothing enabled?
    return false
  }

  return features[client]
}

export default enabled(client)
