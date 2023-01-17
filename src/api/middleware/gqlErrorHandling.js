import EventBus from '@/utils/eventBus.js'
import i18n from '@/plugins/i18n.js'

export default (instance) => {
  instance.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.code === 'ECONNABORTED') {
        EventBus.$emit('notify-with-message', i18n.t('apiResponses.errors.failedToConnect'))
      }
      throw error
    }
  )
}
