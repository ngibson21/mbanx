import EventBus from '@/utils/eventBus.js'
import i18n from '@/plugins/i18n.js'

const errorMessage = 'session_expired'

function tenantId (axios) {
  axios.interceptors.request.use(
    request => {
      const urlParams = new URLSearchParams(window.location.search)

      const tenantId = urlParams.get('tenantIdentifier') || process.env.VUE_APP_TENANT

      if (tenantId) {
        request.headers.tenantId = tenantId

        return request
      } else {
        throw new Error(errorMessage)
      }
    },
    error => {
      throw error
    }
  )
  axios.interceptors.response.use(
    response => response,
    async error => {
      if (error.message === errorMessage) {
        const store = await import('@/store/index.js')
        await store.default.dispatch('user/logout')
        EventBus.$emit('notify-with-message', i18n.t('apiResponses.errors.sessionExpired'), { flushQueue: true })
      }
      throw error
    }
  )
}

export default tenantId
