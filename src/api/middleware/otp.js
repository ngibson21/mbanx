import axios from 'axios'
import EventBus from '@/utils/eventBus.js'

export default (instance) => {
  instance.defaults.adapter = async (config) => {
    config.adapter = require('axios/lib/adapters/xhr.js')

    const store = await import('@/store/index.js')
    const otpOperations = store.default.state.user.details?.getAuthorizationDetail?.otpProtectedOperations || []
    const operation = otpOperations.find(resource => config?.data?.includes(resource))

    if (operation) {
      return new Promise((resolve, reject) => {
        EventBus.$emit('show-otp', operation, config)
        EventBus.$on('pass-otp', res => {
          resolve(res)
        })
        EventBus.$on('fail-otp', err => {
          reject(err || new Error('canceled-otp'))
        })
      })
    } else {
      return axios(config)
    }
  }
}
