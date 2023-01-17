import i18n from '@/plugins/i18n.js'

const regex = /^[a-z0-9\s/?:().,'+-]+$/i

const allowCharacterSet = (event) => {
  const key = String.fromCharCode(event.charCode || event.which)
  if (!regex.test(key)) {
    event.preventDefault()
    return false
  }
  return true
}

const validateCharactersField = (value) => {
  if (!value) return false
  return regex.test(value) || i18n.t('components.transfers.new.specialCharactersAllow')
}

export {
  allowCharacterSet,
  validateCharactersField
}
