/* eslint-disable camelcase */
import * as thisModule from '@/api/middleware/refreshToken.js' // We need to mock function refresh below in test unit
import { noAuth } from '@/api/request.js'
import EventBus from '@/utils/eventBus.js'
import i18n from '@/plugins/i18n.js'
import { transformRequest } from '@/utils/helpers.js'

export const refresh = (refreshToken) => {
  const request = noAuth()

  return request({
    baseURL: `${process.env.VUE_APP_API_URL}/oauth/token`,
    data: {
      refresh_token: refreshToken,
      client_id: process.env.VUE_APP_CLIENT_ID,
      client_secret: process.env.VUE_APP_CLIENT_SECRET,
      grant_type: 'refresh_token'
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: data => transformRequest(data)
  })
}

export default (instance) => {
  instance.interceptors.response.use(
    response => response,
    async error => {
      const store = await import('@/store/index.js')
      const { response = {}, config: sourceConfig } = error
      const refreshToken = sessionStorage.getItem('refresh_token')

      if (!refreshToken) return store.default.dispatch('user/logout')

      if (response?.data?.error === 'invalid_token') {
        try {
          const auth = await thisModule.refresh(refreshToken)

          Object.assign(sourceConfig.headers, {
            Authorization: `Bearer ${auth.data.access_token}`
          })
          Object.keys(auth.data).forEach(key => {
            sessionStorage.setItem(key, auth.data[key])
          })
          return instance.request(sourceConfig)
        } catch (err) {
          await store.default.dispatch('user/logout')
          EventBus.$emit('notify-with-message', i18n.t('apiResponses.errors.sessionExpired'), { flushQueue: true })
          throw err
        }
      }
      throw error // or forceLogout() ?
    }
  )
}
